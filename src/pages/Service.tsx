import { Helmet } from 'react-helmet-async';
import SnsLinks from '../components/SnsLinks';
import serviceStyles from './Service.module.css'


type Props = {
  title: string;
};

const Service: React.FC<Props> = ({ title })=> {
  return (
    <>
    <Helmet>
      <title>{`${title} | Azur Web Design`}</title>
      <meta
        name="description"
        content={`兵庫県姫路市在住のウェブデザイナー、Otsuki Natsumi(おおつき なつみ)のポートフォリオサイトです。ホームページ制作の他、名刺・チラシなどの広告材料のデザインも承っております。お気軽にご相談ください。${title}ページです。`}
      />
    </Helmet>
      {/* ページヘッダー */}
      <section className={`eyecatch ${serviceStyles.service}`}>
        <h2>サービス内容</h2>
        <p>SERVICE</p>
      </section>

      {/* Serviceセクション */}
      <section className={`wrapper ${serviceStyles.serviceContents}`}>
        <ul className={serviceStyles.serviceList}>
          <li className={`flex ${serviceStyles.serviceListItem}`}>
            <figure>
              <img src="/images/ico-wordpress.svg" alt="Webサイト制作" />
            </figure>
            <div className={serviceStyles.serviceListItemText}>
            <h3>Webサイト制作</h3>
            <p>
              WordPressを使って更新可能なWebサイトを制作します。<br />
              テンプレートファイルを一から制作し、オリジナルデザインのサイトを制作できます。
            </p>
            <p>
              WordPressを使った場合では、一般的なテンプレートタグを利用します。アップデートを想定し、コアファイルや管理画面の大幅な改修、既存テーマの利用には対応しておりません。<br />
              必要性を鑑み、他CMSやプログラムの使用をご提案することがあります。
            </p>
            </div>
          </li>
          <li className={serviceStyles.serviceListItem}>
            <figure>
              <img src="/images/ico-namecard.svg" alt="デザイン制作" />
            </figure>
            <div className={serviceStyles.serviceListItemText}>
            <h3>デザイン制作</h3>
            <p>
              名刺・ショップカード・チラシなどのデザインを制作します。紙媒体だけでなく、バナーやサムネイル画像などのデジタル媒体のデザインも承リます。
            </p>
            <p>
              名刺・チラシ・パンフレットなど、会社やお店で使う販促素材をデザインいたします。もちろん、一部だけでもお受けしています。<br />
              デジタル媒体では、バナーやサムネイルなども制作。アナログ・デジタルともに、クライアント様の販促ツールをトータルサポートいたします。
            </p>
            </div>
          </li>
          <li className={serviceStyles.serviceListItem}>
            <figure>
              <img src="/images/ico-circle.svg" alt="技術提供" />
            </figure>
            <div className={serviceStyles.serviceListItemText}>
            <h3>委託業務</h3>
            <p>
              Webサイト制作における技術リソースとしてご活用ください。サイトデザイン、HTML/CSSコーディング、WordPress実装など、部分的な作業も承っております。
            </p>
            <p>
              デザインのみ、コーディングのみ、CMS実装のみなど、外部デザイナー・コーダーとしての対応を承っております。詳しい対応内容はお気軽にお問合せください。<br />
              リソース不足を補うためのアウトソーシング先として、お力になれればと思います。
            </p>
            </div>
          </li>
        </ul>
      </section>

      {/* 制作フロー */}
      <section className={serviceStyles.flow}>
        <div className={`flex ${serviceStyles.flowTitle}`}>
          <h2 className='section-title'>FLOW</h2>
          <span></span>
          <p className='sub'>Web制作フロー</p>
        </div>
        <ul className={`wrapper flex ${serviceStyles.flowList}`}>
          <li className={serviceStyles.flowListItem}>
            <figure>
              <img src="/images/ico_plan.svg" alt="サイト設計" />
            </figure>
            <h3 className={serviceStyles.flowListItemTitle}>サイト設計</h3>
            <p>
              クライアント様のご要望やイメージ、伝えたい内容を丁寧にヒヤリングし、サイトマップやワイヤーフレームの設計、実際の運用方法を確認していきます。<br />
              クライアント様のお困りごとや課題・目標達成のための方策を丁寧に検討します。
            </p>
          </li>
          <li className={serviceStyles.arrow}><span></span></li>
          <li className={serviceStyles.flowListItem}>
            <figure>
              <img src="/images/ico_design.svg" alt="デザイン" />
            </figure>
            <h3 className={serviceStyles.flowListItemTitle}>デザイン</h3>
            <p>
              サイト設計で確認した内容をもとに、トップページ、各UI、下層ページのコンテンツなどをデザインします。<br />
              ご要望に合わせてクライアント様とデザイン過程を共有し、理想に近づけていきます。
            </p>
          </li>
          <li className={serviceStyles.arrow}><span></span></li>
          <li className={serviceStyles.flowListItem}>
            <figure>
              <img src="/images/ico_coding.svg" alt="コーディング" />
            </figure>
            <h3 className={serviceStyles.flowListItemTitle}>コーディング</h3>
            <p>
              HTML/CSS,JavaScript,WordPressに対応しています。アプリケーションを開発するまでのスキルはありません。<br />
              CSSのクラス名は原則BEM記法を採用しております。現状SCSSは採用しておりません。
            </p>
          </li>
        </ul>

      {/* 対応できないもの */}
      <div className={`wrapper ${serviceStyles.noService}`}>
        <h2 className={serviceStyles.noServiceTitle}>対応できないもの</h2>
        <div className={serviceStyles.noServiceWrapper}>
          <ul className={`flex ${serviceStyles.noServiceList}`}>
            <li className={serviceStyles.noServiceListItem}>
              <figure>
                <img
                  src="/images/ico_graph.svg"
                  alt="企画・マーケティング"
                />
              </figure>
              <h5 className={serviceStyles.noServiceListItemTitle}>企画・マーケティング</h5>
              <p>
                ブランドの方向性(ブランディング)や商品のマーケティング戦略などについて判断・アドバイスすることはできません。
              </p>
            </li>
            <li className={serviceStyles.noServiceListItem}>
              <figure>
                <img src="/images/ico_photo.svg" alt="写真素材の制作" />
              </figure>
              <h5 className={serviceStyles.noServiceListItemTitle}>写真素材の制作</h5>
              <p>
                Webサイト内で使用する写真素材は、原則クライアント様にご用意いただいております。コピーやテキストも同様です。
              </p>
            </li>
            <li className={serviceStyles.noServiceListItem}>
              <figure>
                <img
                  src="/images/ico_server.svg"
                  alt="サーバー構築・アプリ開発"
                />
              </figure>
              <h5 className={serviceStyles.noServiceListItemTitle}>
                サーバ構築・アプリ開発
              </h5>
              <p>
                システム開発や・サーバー構築などについて、実務レベルの知識を持っていないので対応できません。
              </p>
            </li>
          </ul>
          <img
            className={serviceStyles.noServiceArrow}
            src="/images/Ico_arrow-bottom.svg"
            alt="対応策"
          />
          <p className={serviceStyles.countermeasure}>
            他クリエイターや専門サービスをご紹介いたします。<br />お気軽にご相談ください。
          </p>
        </div>
      </div>

      </section>

      {/* Contactページへのバナー */}
      <SnsLinks/>
    </>
  );
};

export default Service;
