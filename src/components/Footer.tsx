// src/components/Footer.tsx
import footerStyles from './Footer.module.css';

const Footer: React.FC = () => {
  return (
    <footer>
  <div className={`wrapper flex ${footerStyles.footerContent}`}>
    <figure className={'pc'}>
      <img src="/images/footer_image.png" alt="おおつきなつみ" />
    </figure>
    <div className={footerStyles.footerText}>
      <p>OTSUKI NATSUMI</p>
      <p>
        おおつき なつみ。Webデザイナー、コーダー。<br />
        独学、スクールを経てフリーランスWebデザイナーとして独立。<br />
        クライアントに寄り添い、ユーザーに真っ直ぐ届くデザインを目指しています。
      </p>
      <ul className={`flex ${footerStyles.snsLinkList}`}>
        <li className={footerStyles.snsLink}>
          <a href="https://www.instagram.com/azur_web_design/" target="_blank" rel="noopener noreferrer">
        <img src="/images/instagram.svg" alt="Instagramへのリンク"/>
        </a>
        </li>
        <li className={footerStyles.snsLink}>
          <a href="https://github.com/n-rick2972" target="_blank" rel="noopener noreferrer">
          <img src="/images/github.png" alt="GitHubへのリンク"/>
          </a>
          </li>
		<li className={footerStyles.snsLink}>
      <a href="https://codepen.io/n-rick2972" target="_blank" rel="noopener noreferrer">
      <img src="/images/icon_codepen.svg" alt="CodePenへのリンク"/>
      </a>
      </li>
      </ul>
    </div>
  </div>
 <div className={`wrapper ${footerStyles.thanks}`}>
    <p>portrait shooting by <a href="https://www.instagram.com/t.u.photographs/" target="_blank" rel="noopener noreferrer">Teppei Ueda</a></p>
 </div>
  <div className={footerStyles.copy}>
    <p>©<span id="year"></span> Azur Web Design</p>
  </div>
</footer>
  );
};

export default Footer;


