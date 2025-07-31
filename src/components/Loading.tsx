import { useEffect, useState } from 'react';
import './Loading.css';

const Loading = ({ onFinish }: { onFinish: () => void }) => {
  const [isFadeOut, setIsFadeOut] = useState(false);

  useEffect(() => {
    const rnd = (min: number, max: number) =>
      Math.floor(Math.random() * (max - min + 1) + min);

    const loadingEl = document.getElementById('particles');
    if (!loadingEl) return;

    loadingEl.innerHTML = '';

    const count = (window.innerWidth / 50) * 10;
    for (let i = 0; i <= count; i++) {
      const size = rnd(5, 25);
      const top = rnd(10, 95);
      const left = rnd(10, 95);
      const delay = rnd(0, 30) / 10;

      const span = document.createElement('span');
      span.className = 'particle';
      span.style.cssText = `
        top: ${top}%;
        left: ${left}%;
        width: ${size}px;
        height: ${size}px;
        animation-delay: ${delay}s;
      `;
      loadingEl.appendChild(span);
    }

    const timeout = setTimeout(() => {
      setIsFadeOut(true); // フェードアウト開始
    }, 1500);

    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    if (!isFadeOut) return;

    const fadeTimeout = setTimeout(() => {
      onFinish(); // 完全に非表示に
    }, 1000); // フェードアウト時間と合わせる

    return () => clearTimeout(fadeTimeout);
  }, [isFadeOut, onFinish]);

  return (
    <div id="loading" className={isFadeOut ? 'loaded' : ''}>
      <div className="textContainer">
        <p id="Text">Azur Web Design</p>
      </div>
      <div id="particles"></div>
    </div>
  );
};

export default Loading;
