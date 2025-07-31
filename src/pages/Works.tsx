import { useEffect, useMemo, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../Firebase/Firebase';
import { Link } from 'react-router-dom';
import worksStyles from './Works.module.css';
import SnsLinks from '../components/SnsLinks';
import { Helmet } from 'react-helmet-async';

type Work = {
  title: string;
  slug: string;
  client: string;
  url: string;
  url_text: string;
  description: string;
  images: string[];
  categories: string[];
};

type Props = {
  title: string;
};

const categories = ['All', 'direction', 'design', 'coding', 'WordPress'];

const Works: React.FC<Props> = ({ title })=> {
  const [works, setWorks] = useState<Work[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [loading, setLoading] = useState(true);
  const [fadeList, setFadeList] = useState(false);

  // Firestore から取得
  useEffect(() => {
    (async () => {
      const snap = await getDocs(collection(db, 'works'));
      const data = snap.docs.map(d => d.data() as Work & { id: string });
      const sorted = data.sort((a, b) => Number(b.id) - Number(a.id));
      setWorks(sorted);
      setLoading(false);
      // ローディング完了したらリストをフェードイン
      setTimeout(() => setFadeList(true), 50);
    })();
  }, []);

  // フィルタリング
  const filteredWorks = useMemo(
    () =>
      selectedCategory === 'All'
        ? works
        : works.filter(w => w.categories.includes(selectedCategory)),
    [works, selectedCategory]
  );

  // カテゴリー選択時にリストを再フェードイン
  useEffect(() => {
    if (!loading) {
      setFadeList(false);
      // 短いdelayをおいて再び true に
      setTimeout(() => setFadeList(true), 50);
    }
  }, [selectedCategory, loading]);

  return (
    <>
    <Helmet>
      <title>{`${title} | Azur Web Design`}</title>
      <meta
        name="description"
        content={`兵庫県姫路市在住のウェブデザイナー、Otsuki Natsumi(おおつき なつみ)のポートフォリオサイトです。ホームページ制作の他、名刺・チラシなどの広告材料のデザインも承っております。お気軽にご相談ください。${title}ページです。`}
      />
    </Helmet>
      <section className={`eyecatch ${worksStyles.works}`}>
        <h2>制作実績</h2>
        <p>WORKS</p>
      </section>

      <section className={`wrapper ${worksStyles.worksContents}`}>
        <div className={worksStyles.worksCategory}>
          <ul className="flex">
            {categories.map(cat => (
              <li
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={selectedCategory === cat ? worksStyles.active : ''}
              >
                {cat}
              </li>
            ))}
          </ul>
        </div>

        {loading ? (
          <p className={worksStyles.loading}>Loading...</p>
        ) : (
          <ul className={`flex ${worksStyles.worksList}`}>
            {filteredWorks.map((work, idx) => (
              <li
                key={work.slug}
                className={[
                  worksStyles.workItem,
                  fadeList ? worksStyles.fadeIn : ''
                ].join(' ')}
                style={
                  fadeList
                    ? { animationDelay: `${idx * 0.1}s` }
                    : undefined
                }
              >
                <Link to={`/works/${work.slug}`} className={worksStyles.hoverChange}>
                  <figure>
                    <img src={work.images[0]} alt={work.title} />
                  </figure>
                  <div className={`flex ${worksStyles.worksText}`}>
                    <p>{work.categories.join(' ')}</p>
                    <p>More...</p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>

      <SnsLinks />
    </>
  );
};

export default Works;
