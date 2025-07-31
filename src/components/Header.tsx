// src/components/Header.tsx
import { useEffect, useState } from 'react';
import headerStyles from './Header.module.css';

const Header: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(prev => !prev);

  // メニュー開閉に応じてスクロールを制御
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden'; // スクロール無効化
    } else {
      document.body.style.overflow = ''; // スクロール復元
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  return (
    <header className={`flex ${headerStyles.header}`}>
    <h1><a href="/">Azur Web Design</a></h1>
    <div onClick={toggleMenu} className={`${headerStyles.hamburger} ${menuOpen ? headerStyles.active : ''}`}>
      <span></span>
      <span></span>
      <span></span>
    </div>
    <nav className={`${headerStyles.headerNav} ${menuOpen ? headerStyles.active : ''}`}>
      <ul>
        <li><a href="/">HOME</a></li>
        <li><a href="/about">ABOUT</a></li>
        <li><a href="/service">SERVICE</a></li>
        <li><a href="/works">WORKS</a></li>
        <li><a href="/#contact">CONTACT</a></li>
      </ul>
    </nav>
  </header>
  );
};

export default Header;
