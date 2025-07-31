import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { getRecentWorks } from '../Firebase/getRecentWorks';
import type { Work } from '../types';
import SnsLinks from '../components/SnsLinks';
import homeStyle from './Home.module.css';

// Swiper
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import Loading from '../components/Loading';

const Home: React.FC = () => {
  const [recentWorks, setRecentWorks] = useState<Work[]>([]);
  const [isSwiperActive, setIsSwiperActive] = useState<boolean>(false);
  const [showLoading, setShowLoading] = useState(true);

  useEffect(() => {
    getRecentWorks().then((data) => setRecentWorks(data as Work[]));
  }, []);

  // Swiper用リサイズ
  useEffect(() => {
    const handleResize = () => {
      const isWide = window.innerWidth > 520;
      setIsSwiperActive(isWide);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);


  return (
    <>
    <Helmet>
      <title>Azur Web Design</title>
      <meta
        name="description"
        content="兵庫県姫路市在住のウェブデザイナー、Otsuki Natsumi(おおつき なつみ)のポートフォリオサイトです。ホームページ制作の他、名刺・チラシなどの広告材料のデザインも承っております。お気軽にご相談ください。"
      />
    </Helmet>
    {showLoading && <Loading onFinish={() => setShowLoading(false)} />}

      {/* メインビジュアル */}
      <section className={homeStyle.mainVisual}>
        <div className={homeStyle.mainText}>
          <h2>つなぐ、とどける</h2>
          <p>Web designer OTSUKI NATSUMI</p>
          <p>Portfolio</p>
        </div>
      </section>

      {/* ABOUTセクション */}
      <section className={`wrapper ${homeStyle.about}`}>
        <div className={homeStyle.aboutText}>
          <h2 className='section-title'>ABOUT</h2>
          <h3>
            人と人とがつながり、想いが届く。<br />
            その瞬間に、出会いたいから。
          </h3>
          <p>
            大切なあなたの想いがまっすぐ届くように、きちんと伝わるデザインをご提案いたします。<br />
            企画・デザインからコーディング、CMSを使った運用まで、Web制作をトータルサポート。<br />
            まずはお気軽に、あなたのお話を聞かせてください。
          </p>
          <a href="/about" className='buttonMore'>
            More...
          </a>
        </div>
        <figure className={homeStyle.aboutFig1}>
          <img src="/images/watercolor-image.png" alt="青い水彩画" />
        </figure>
        <figure className={homeStyle.aboutFig2}>
          <img src="/images/Image.png" alt="おおつきなつみの写真" />
          <img src="/images/about-message.png" alt="I am telling you who I am and what I can do for you." />
        </figure>
      </section>

      {/* WORKSセクション */}
      <section className={`wrapper ${homeStyle.works}`}>
        <h3 className={`flex section-title ${homeStyle.worksTitle}`}>WORKS</h3>

        {isSwiperActive ? (
          <Swiper
          className="homeSwiper"
          modules={[Autoplay]}
          slidesPerView={3}
          spaceBetween={20}
          loop={recentWorks.length >= 6}
          centeredSlides={true}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
        >
            {recentWorks.map((work) => (
              <SwiperSlide key={work.slug}>
                <Link to={`/works/${work.slug}`} className={homeStyle.hoverChange}>
                  <figure>
                    <img src={work.images[0]} alt={work.title} />
                  </figure>
                  <ul className={`flex ${homeStyle.worksText}`}>
                    {work.categories.map((cat, i) => (
                      <li key={i}>{cat}</li>
                    ))}
                    <li className={homeStyle.worksMore}>More...</li>
                  </ul>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <ul className={`flex ${homeStyle.worksList}`}>
            {recentWorks.map((work) => (
              <li key={work.slug}>
                <Link to={`/works/${work.slug}`} className={homeStyle.hoverChange}>
                  <figure>
                    <img src={work.images[0]} alt={work.title} />
                  </figure>
                  <ul className={`flex ${homeStyle.worksText}`}>
                    {work.categories.map((cat, i) => (
                      <li key={i}>{cat}</li>
                    ))}
                    <li className={homeStyle.worksMore}>More...</li>
                  </ul>
                </Link>
              </li>
            ))}
          </ul>
        )}

        <Link to="/works" className="buttonView">View More</Link>
      </section>

      {/* SERVICEセクション */}
      <section className={homeStyle.service}>
        <div className='wrapper'>
          <h2 className='section-title'>SERVICE</h2>
          <ul className='flex'>
            <li>
              <figure>
                <img src="/images/ico-wordpress.svg" />
              </figure>
              <h3>Webサイト制作</h3>
              <p>
                WordPressを使って、更新可能なWebサイトを制作します。
                テンプレートファイルを一から制作するため、オリジナルデザインのサイトを制作できます。
              </p>
            </li>
            <li>
              <figure>
                <img src="/images/ico-namecard.svg"/>
              </figure>
              <h3>デザイン制作</h3>
              <p>
                名刺・ショップカード・チラシなどのデザインを制作します。
                紙媒体だけでなく、バナーやサムネイル画像などのデジタル媒体のデザインも承リます。
              </p>
            </li>
            <li>
              <figure>
                <img src="/images/ico-circle.svg" />
              </figure>
              <h3>委託業務</h3>
              <p>
                Webサイト制作における技術リソースとして、サイトデザイン、コーディング、WordPress実装など、部分的な作業も承っております。
              </p>
            </li>
          </ul>
          <a href="/service" className='buttonView'>View More</a>
        </div>
      </section>

      {/* Contactページへのバナー */}
      <SnsLinks/>
    </>
  );
};

export default Home;
