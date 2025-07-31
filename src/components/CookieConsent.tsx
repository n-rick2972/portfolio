// src/components/CookieConsent.tsx
import { useEffect, useState } from 'react';

type Props = {
  onAccept: () => void;
  onReject: () => void;
};

const STORAGE_KEY = 'cookie_consent';

const CookieConsent: React.FC<Props> = ({ onAccept, onReject }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    console.log('CookieConsent mounted, stored:', localStorage.getItem(STORAGE_KEY));
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
    <div style={overlayStyle}>
      <div style={boxStyle}>
        <p style={{ margin: 0 }}>
          当サイトではサイト解析のために Google Analytics を使っています。クッキーの利用に同意しますか？
        </p>
        <div style={{ marginTop: 12, display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          <button onClick={accept} style={buttonPrimary}>
            同意する
          </button>
          <button onClick={reject} style={buttonSecondary}>
            拒否する
          </button>
        </div>
      </div>
    </div>
  );
};

// 簡易スタイル（必要なら CSS Modules に移せます）
const overlayStyle: React.CSSProperties = {
  position: 'fixed',
  inset: 0,
  background: 'rgba(10,18,42,0.9)',
  display: 'flex',
  alignItems: 'flex-end',
  justifyContent: 'center',
  padding: '1rem',
  zIndex: 1000,
};

const boxStyle: React.CSSProperties = {
  background: '#fff',
  borderRadius: 12,
  padding: '1rem 1.25rem',
  maxWidth: 500,
  width: '100%',
  boxShadow: '0 10px 40px rgba(0,0,0,0.2)',
  display: 'flex',
  flexDirection: 'column',
  gap: 8,
};

const buttonPrimary: React.CSSProperties = {
  padding: '0.6em 1em',
  background: '#007bbb',
  color: '#fff',
  border: 'none',
  borderRadius: 6,
  cursor: 'pointer',
};

const buttonSecondary: React.CSSProperties = {
  padding: '0.6em 1em',
  background: '#f0f0f0',
  color: '#333',
  border: 'none',
  borderRadius: 6,
  cursor: 'pointer',
};

export const getConsent = () => localStorage.getItem(STORAGE_KEY); // 'accepted' | 'rejected' | null

export default CookieConsent;
