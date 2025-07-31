// src/pages/Detail.tsx
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

// Swiper
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

import detailStyle from './Detail.module.css';
import { db } from '../Firebase/Firebase';
import { getDocs, collection, query, orderBy } from 'firebase/firestore';
import type { Work } from '../types/';
import SnsLinks from '../components/SnsLinks';

const WorkDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [work, setWork] = useState<Work | null>(null);
  const [prevWork, setPrevWork] = useState<Work | null>(null);
  const [nextWork, setNextWork] = useState<Work | null>(null);

  useEffect(() => {
    const fetchWorksAndCurrent = async () => {
      const snap = await getDocs(query(collection(db, 'works'), orderBy('id', 'desc')));
      const worksList = snap.docs.map(d => d.data() as Work);

      const idx = worksList.findIndex(w => w.slug === slug);
      if (idx !== -1) {
        setWork(worksList[idx]);
        setPrevWork(worksList[idx + 1] || null);
        setNextWork(worksList[idx - 1] || null);
      }
    };
    fetchWorksAndCurrent();
  }, [slug]);

  if (!work) {
    return <p className={detailStyle.loading}>読み込み中...</p>;
  }

  // description 用に最初の100文字程度を抜粋
  const description = work.description.replace(/\n/g, ' ').slice(0, 100) + '…';

  return (
    <>
      <Helmet>
        <title>{`${work.title} - Works | Azur Web Design`}</title>
        <meta name="description" content={description} />
      </Helmet>

      <section className={`eyecatch ${detailStyle.detail}`}>
        <h2>制作実績</h2>
        <p>WORKS</p>
      </section>

      <section className={`wrapper flex ${detailStyle.contentsArea}`}>
        <Swiper
          className="detailSwiper"
          modules={[Autoplay, Pagination]}
          loop
          speed={300}
          slidesPerView={1}
          centeredSlides
          spaceBetween={20}
          pagination={{ el: '.customPagination', clickable: true }}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
        >
          {work.images.slice(1).map((img, i) => (
            <SwiperSlide key={i}>
              <figure className={detailStyle.swiperImg}>
                <img src={img} alt={`スクリーンショット${i + 2}`} />
              </figure>
            </SwiperSlide>
          ))}
          <div className="flex customPagination" />
        </Swiper>

        <div className={detailStyle.textArea}>
          <ul className={`flex ${detailStyle.categories}`}>
            {work.categories.map((cat, i) => (
              <li key={i}>
                <span>{cat}</span>
              </li>
            ))}
          </ul>
          <h2>{work.title}</h2>
          <p className={detailStyle.client}>client: {work.client}</p>
          {work.url && (
            <p>
              URL:{' '}
              <a
                href={work.url}
                target="_blank"
                rel="noopener noreferrer"
                className={detailStyle.url}
              >
                {work.url_text}
              </a>
            </p>
          )}
          <p className={detailStyle.commentary}>
            {work.description.split('\n').map((line, i) => (
              <React.Fragment key={i}>
                {line}
                <br />
              </React.Fragment>
            ))}
          </p>
        </div>
      </section>

      <div className={`flex ${detailStyle.pageNation}`}>
        {prevWork && (
          <Link to={`/works/${prevWork.slug}`} className={detailStyle.prev}>
            &lt;&lt; 前の実績へ
          </Link>
        )}
        <Link to="/works" className={detailStyle.center}>
          実績一覧へ
        </Link>
        {nextWork && (
          <Link to={`/works/${nextWork.slug}`} className={detailStyle.next}>
            次の実績へ &gt;&gt;
          </Link>
        )}
      </div>

      {/* Contactページへのバナー */}
      <SnsLinks />
    </>
  );
};

export default WorkDetail;
