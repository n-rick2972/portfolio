// src/components/Layout.tsx
import { useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

const Layout = () => {
  const location = useLocation();
  const isHome = location.pathname === '/';
  const [isVisible, setIsVisible] = useState(isHome);

  useEffect(() => {
    if (!isHome) {
      setIsVisible(false);
      const timeout = setTimeout(() => {
        setIsVisible(true);
      }, 10); // 適用のため少し遅らせる

      return () => clearTimeout(timeout);
    } else {
      setIsVisible(true); // Homeは即表示
    }
  }, [location.pathname, isHome]);

  return (
    <>
      <Header />
       <div  className={isHome ? '' : `fade-page ${isVisible ? 'visible' : ''}`}>
      <main>
        <Outlet />
      </main>
      <Footer />
      </div>
    </>
  );
};

export default Layout;
