// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import Service from './pages/Service';
import About from './pages/About';
import Works from './pages/Works';
import Detail from './pages/Detail';
import PostList from './admin/pages/PostList';
import Layout from './components/Layout';
import AdminLayout from './components/AdminLayout';
import Login from './admin/pages/Login';
import PrivateRoute from './components/PrivateRoute';
import PostNew from './admin/pages/PostNew';
import PostEdit from './admin/pages/PostEdit';

import './icons/fontawesome';

import usePageViews from './hooks/usePageViews'; // 正しいケースで
import CookieConsent from './components/CookieConsent';
import { loadGtag } from './lib/analytics';

const ScrollToTopOnNavigate: React.FC = () => {
  const location = useLocation();

  React.useEffect(() => {
    if (!location.hash) {
      if ('scrollRestoration' in history) {
        history.scrollRestoration = 'manual';
      }
      window.scrollTo({ top: 0, behavior: 'auto' });
    }
  }, [location.pathname, location.hash]);

  return null;
};

const BodyClassController: React.FC = () => {
  const location = useLocation();

  React.useEffect(() => {
    const path = location.pathname;
    const pathClass = path === '/' ? 'home' : path.slice(1).replace('/', '-');

    document.body.className = '';
    document.body.classList.add(pathClass);

    if (path.startsWith('/admin')) {
      document.body.classList.add('admin');
    }

    return () => {
      document.body.className = '';
    };
  }, [location]);

  return null;
};

const ScrollToHash: React.FC = () => {
  const location = useLocation();

  React.useEffect(() => {
    if (location.hash) {
      const target = document.getElementById(location.hash.substring(1));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [location]);

  return null;
};

const InnerApp: React.FC = () => {
  usePageViews(); // ← ここなら Router の内側なので safe

  const handleAccept = () => {
    loadGtag();
    if ((window as any).gtag) {
      (window as any).gtag('event', 'page_view', {
        page_path: window.location.pathname + window.location.search,
      });
    }
    console.log('accepted');
  };

  const handleReject = () => {
    console.log('rejected');
  };

  return (
    <>
      <BodyClassController />
      <ScrollToHash />
      <ScrollToTopOnNavigate />
      <CookieConsent onAccept={handleAccept} onReject={handleReject} />

      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/service" element={<Service title="SERVICE" />} />
          <Route path="/about" element={<About title="ABOUT" />} />
          <Route path="/works" element={<Works title="WORKS" />} />
          <Route path="/works/:slug" element={<Detail />} />
        </Route>

        <Route path="/admin/login" element={<Login />} />

        <Route
          element={
            <PrivateRoute>
              <AdminLayout />
            </PrivateRoute>
          }
        >
          <Route path="/admin/post" element={<PostList />} />
          <Route path="/admin/post/new" element={<PostNew />} />
          <Route path="/admin/post/edit/:slug" element={<PostEdit />} />
        </Route>
      </Routes>
    </>
  );
};

const App: React.FC = () => (
  <Router>
    <InnerApp />
  </Router>
);

export default App;
