import React, { useState, useEffect } from 'react';
import LandingPage from './pages/LandingPage';
import AdminPage from './pages/AdminPage';
import { ArrowLeft, AlertCircle } from 'lucide-react';

export default function App() {
  // Simple, robust client-side routing supporting both path and hash
  const getInitialRoute = () => {
    const path = window.location.pathname;
    const hash = window.location.hash;
    if (path === '/admin' || hash === '#/admin' || hash === '#admin') {
      return '/admin';
    }
    return '/';
  };

  const [currentRoute, setCurrentRoute] = useState(getInitialRoute);

  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname;
      const hash = window.location.hash;
      if (path === '/admin' || hash === '#/admin' || hash === '#admin') {
        setCurrentRoute('/admin');
      } else {
        setCurrentRoute('/');
      }
    };

    window.addEventListener('popstate', handlePopState);
    window.addEventListener('hashchange', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
      window.removeEventListener('hashchange', handlePopState);
    };
  }, []);

  const navigateTo = (route) => {
    setCurrentRoute(route);
    window.history.pushState({}, '', route);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (currentRoute === '/admin') {
    return <AdminPage onNavigate={navigateTo} />;
  }

  if (currentRoute === '/') {
    return <LandingPage onNavigate={navigateTo} />;
  }

  // 404 Fallback
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: '#0B0D10',
      color: '#FFFFFF',
      padding: '2rem',
      textAlign: 'center'
    }}>
      <div style={{ maxWidth: '480px' }}>
        <AlertCircle size={48} color="#F59E0B" style={{ margin: '0 auto 1.5rem' }} />
        <h1 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '0.75rem' }}>Page Not Found</h1>
        <p style={{ color: '#94A3B8', marginBottom: '2rem' }}>
          The requested page could not be located.
        </p>
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => navigateTo('/')}
        >
          <ArrowLeft size={16} />
          <span>Return to Homepage</span>
        </button>
      </div>
    </div>
  );
}
