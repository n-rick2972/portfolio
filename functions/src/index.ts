/* eslint-disable @typescript-eslint/no-unused-vars */
// functions/src/index.ts
import { setGlobalOptions } from 'firebase-functions';
import { onDocumentWritten } from 'firebase-functions/v2/firestore';
import { onRequest } from 'firebase-functions/v2/https';
import * as admin from 'firebase-admin';

admin.initializeApp();
const db = admin.firestore();

// 課金/スパイク緩和（必要なら調整）
setGlobalOptions({ maxInstances: 5 });

// ==== 設定部分 ====
const SITE_BASE = 'https://azur-web-design.jp/';
const SITEMAP_URL = `${SITE_BASE}/sitemap.xml`;

// ドキュメントの型（必要なフィールドだけ）
type WorkDoc = {
  slug: string;
  updatedAt?: admin.firestore.Timestamp;
  // 他に公開フラグがあれば here に加える（例: published: boolean）
};

// 1. Firestore 変更時に Google に ping（通知）
export const notifyGoogleOnWorkChange = onDocumentWritten(
  'works/{slug}',
  async (event) => {
    try {
      // 単に ping する（sitemap.xml は rewrite で常に最新が出る想定）
      const pingUrl = `https://www.google.com/ping?sitemap=${encodeURIComponent(
        SITEMAP_URL
      )}`;
      const res = await fetch(pingUrl);
      if (!res.ok) {
        console.warn('Google sitemap ping failed:', await res.text());
      } else {
        console.log('Pinged Google for sitemap:', SITEMAP_URL);
      }
    } catch (err) {
      console.error('Failed to ping Google sitemap:', err);
    }
  }
);

// 2. sitemap.xml を返す HTTP エンドポイント
export const sitemap = onRequest(async (req, res) => {
  try {
    // 実績一覧を取得（必要なら公開済みフィルタを追加）
    const snapshot = await db
      .collection('works')
      .orderBy('updatedAt', 'desc')
      .get();

    const urls: string[] = [];

    // 固定ページ（必要なら追加）
    const nowIso = new Date().toISOString();
    urls.push(`
  <url>
    <loc>${SITE_BASE}/</loc>
    <lastmod>${nowIso}</lastmod>
  </url>`);

    // 各 work
    snapshot.docs.forEach((doc) => {
      const data = doc.data() as WorkDoc & { slug: string };
      const loc = `${SITE_BASE}/works/${encodeURIComponent(data.slug)}`;
      const lastmod = data.updatedAt
        ? data.updatedAt.toDate().toISOString()
        : undefined;
      urls.push(`
  <url>
    <loc>${loc}</loc>
    ${lastmod ? `<lastmod>${lastmod}</lastmod>` : ''}
  </url>`);
    });

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset
  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${urls.join('\n')}
</urlset>`;

    // レスポンス
    res.set('Content-Type', 'application/xml');
    // Search Engine 向けキャッシュ制御（短めにして常に新しいのを取りに来させる）
    res.set('Cache-Control', 'public, max-age=300, s-maxage=600');
    res.status(200).send(xml);
  } catch (err) {
    console.error('Failed to build sitemap:', err);
    res.status(500).send('Internal Server Error');
  }
});
