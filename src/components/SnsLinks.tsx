// src/components/contactBnr.tsx
import snsLinksStyles from './SnsLinks.module.css';

const snsLinks: React.FC = () => {
  const user = 'azurwebdesign.works';
  const domain = 'gmail.com';
  const email = `${user}@${domain}`;
  const mailto = `mailto:${email}`;


  return(
      <section id='contact' className={`wrapper ${snsLinksStyles.snsLinks}`}>
        <h2 className='section-title'>CONTACT</h2>
        <p>お仕事のご依頼・ご相談や、ご不明点などございましたら、メールまたは各種SNSよりお気軽にお問い合わせください。</p>
        <div className={`flex ${snsLinksStyles.btnArea}`}>
          <a href="https://www.instagram.com/azur_web_design/" target="_blank" rel="noopener noreferrer" className={snsLinksStyles.instagram}>instagram</a>
          <a href={mailto} className={snsLinksStyles.gmail}>Gmail</a>
        </div>
      </section>
    )
}

export default snsLinks;