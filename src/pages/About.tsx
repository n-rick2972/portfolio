import { Helmet } from 'react-helmet-async';
import SnsLinks from '../components/SnsLinks';
import aboutStyles from './About.module.css';

type Props = {
  title: string;
};

const About: React.FC<Props> = ({ title }) => {
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
      <section className={`eyecatch ${aboutStyles.about}`}>
        <h2>私のこと</h2>
        <p>ABOUT</p>
      </section>

      {/* Profileセクション */}
      <section className={`wrapper ${aboutStyles.profile}`}>
        <figure>
          <img src="/images/myphoto.png" alt="大槻夏海のポートレート写真" />
        </figure>
        <div className={aboutStyles.profileProfarea}>
          <h2>おおつき なつみ</h2>
          <p className={aboutStyles.ruby}>OTSUKI NATSUMI</p>
          <p>
            1994年7月29日生まれ、兵庫県姫路市在住。<br />
            趣味は寝ること、一人カラオケ、J-RPG。自称コーディングオタク。オムライスとお酒のつまみが好き。
          </p>
          <table>
            <tbody>
            <tr>
              <th>2018年</th>
              <td>
                所属するサークルのWebサイト制作をきっかけに、独学でWeb制作を始める
              </td>
            </tr>
            <tr>
              <th>2020年</th>
              <td>知人の会社のWebサイトを制作</td>
            </tr>
            <tr>
              <th>2022年</th>
              <td>
                デジタルハリウッドSTUDIO姫路にて、Webデザイナー講座、WordPress講座を修了
              </td>
            </tr>
            <tr>
              <th>2023-2024年</th>
              <td>転職活動・人脈づくり・スキルアップ・実績づくりなどに奔走</td>
            </tr>
            <tr>
              <th>2025年</th>
              <td>個人事業主として開業</td>
            </tr>
            </tbody>
          </table>
          <p>Tools : <br className='sp'/>Photoshop | Illustrator | XD | Figma<br/>Coding : <br className='sp'/>HTML | CSS | JavaScript | WordPress PHP</p>
        </div>
      </section>

      {/* メッセージセクション */}
      <section className={`wrapper flex ${aboutStyles.message}`}>
        <div className={aboutStyles.messageTextarea}>
          <h2>
            人と人とがつながり、想いが届く。 <br />その瞬間に、出会いたいから。
          </h2>
          <p>
            Web制作との出会いは、結構成り行きだったり。<br />
            当時フリーターだった私が一番暇だったから。<br />
            でもあの時出会えて本当によかったと心から思います。<br />
            学習を通じて様々な人と出会い、クライアント様との出会いを通じてユーザー、そして世界とつながる。<br
              className="_br mobile"
            />Webを通じた出会いやつながりが今の私を作っています。<br />
            人とつながる楽しさ、想いが届く喜び。<br />
            その瞬間に、出会ってほしいから。
          </p>
          <p className={aboutStyles.messageTextareaLastmessage}>
            一人一人の大切な想いを、まっすぐ届けるお手伝い。<br />
            私にぜひさせてください。
          </p>
        </div>
        <figure>
          <img className="pc" src="/images/myphoto2.png"/>
          <img
            className="sp"
            src="/images/myphoto2_mobile.png"/>
        </figure>
      </section>

      {/* 料金セクション */}
      <section className={`wrapper ${aboutStyles.pieces}`}>
        <h2 className='section-title'>PIECES of ME</h2>
        <h3>私を構成するあれこれ</h3>
        <div className={aboutStyles.hoverAct}>
          <figure className={aboutStyles.piecesImage}>
            <img src="/images/peaces.png" alt="私を構成するものたち" />
          </figure>
          <div className={aboutStyles.piecesHoverText}>
            <ul>
              <li>イタリアン食堂サンサーラのオムライス</li>
              <li>小説家・有川浩の小説</li>
              <li>コーヒーブレイクという名のおやつタイム</li>
              <li>デジタルハリウッドSTUDIO姫路</li>
              <li>サントリー プレミアムモルツ香るエール</li>
              <li>一人カラオケ</li>
              <li>美しい日本語</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Contactページへのバナー */}
      <SnsLinks/>
    </>
  );
};

export default About;
