// src/hooks/usePageViews.ts
import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { loadGtag, pageview } from '../lib/analytics';
import { getConsent } from '../components/CookieConsent';

const usePageViews = () => {
  const location = useLocation();
  const hasInitializedRef = useRef(false);

  // ロケーションごとのページビュー送信（同意済みなら）
  useEffect(() => {
    const consent = getConsent();
    if (consent === 'accepted') {
      if (!hasInitializedRef.current) {
        loadGtag(); // 初回だけ gtag を読み込む
        hasInitializedRef.current = true;
      }
      pageview(location.pathname + location.search);
    }
    // consent がない／拒否なら何もしない
  }, [location]);
};

export default usePageViews;
