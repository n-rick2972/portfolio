import { useEffect, useState } from 'react';
import cookieStyles from './Cookie.module.css';

type Props = {
  onAccept: () => void;
  onReject: () => void;
};

const STORAGE_KEY = 'cookie_consent';

const CookieConsent: React.FC<Props> = ({ onAccept, onReject }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      setVisible(true);
    }
  }, []);

  const accept = () => {
    localStorage.setItem(STORAGE_KEY, 'accepted');
    onAccept();
    setVisible(false);
  };

  const reject = () => {
    localStorage.setItem(STORAGE_KEY, 'rejected');
    onReject();
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className={cookieStyles.box}>
      <p className={cookieStyles.message}>
        当サイトではサイト解析のために Google Analytics を使っています。<br/>クッキーの利用に同意しますか？
      </p>
      <div className={cookieStyles.buttons}>
        <button onClick={accept} className={cookieStyles.primary} aria-label="同意する">
          同意する
        </button>
        <button onClick={reject} className={cookieStyles.secondary} aria-label="拒否する">
          拒否する
        </button>
      </div>
    </div>
  );
};

export const getConsent = () => localStorage.getItem(STORAGE_KEY); // 'accepted' | 'rejected' | null

export default CookieConsent;
