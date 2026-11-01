import React from 'react';
import { ArrowUp, Mail, Shield } from 'lucide-react';
import { COMPANY_INFO, SERVICES_LIST } from '../data/constants';
import Logo from './Logo';

export default function Footer({ onNavigate, onScrollTo }) {
  const currentYear = new Date().getFullYear();

  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLinkClick = (sectionId) => {
    if (window.location.pathname !== '/') {
      onNavigate('/');
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const el = document.getElementById(sectionId);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="footer-wrapper">
      <div className="container">
        <div className="footer-grid">
          {/* Col 1: Brand & Overview */}
          <div>
            <div style={{ marginBottom: '1.25rem' }} onClick={handleScrollTop}>
              <Logo size="large" />
            </div>

            <p className="footer-text">
              Specialized construction logistics and material transportation backed by our dedicated heavy-duty 18-wheel commercial fleet. Direct site deliveries with zero compromise on safety or schedule.
            </p>

            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(255, 255, 255, 0.04)', padding: '0.45rem 0.85rem', borderRadius: '4px', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
              <Shield size={14} style={{ color: '#F59E0B' }} />
              <span style={{ fontSize: '0.78rem', color: '#CBD5E1' }}>18-Wheel Commercial Logistics</span>
            </div>
          </div>

          {/* Col 2: Quick Links (No Fleet link) */}
          <div>
            <h4 className="footer-col-title">Navigation</h4>
            <ul className="footer-links-list">
              <li>
                <button type="button" className="footer-link" onClick={() => handleLinkClick('hero')}>
                  Home
                </button>
              </li>
              <li>
                <button type="button" className="footer-link" onClick={() => handleLinkClick('services')}>
                  Work / Services
                </button>
              </li>
              <li>
                <button type="button" className="footer-link" onClick={() => handleLinkClick('about')}>
                  About Us
                </button>
              </li>
              <li>
                <button type="button" className="footer-link" onClick={() => handleLinkClick('contact')}>
                  Contact Us
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Services Overview */}
          <div>
            <h4 className="footer-col-title">Haulage Services</h4>
            <ul className="footer-links-list">
              {SERVICES_LIST.map((srv) => (
                <li key={srv.id}>
                  <button 
                    type="button" 
                    className="footer-link"
                    onClick={() => handleLinkClick('services')}
                  >
                    {srv.title}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Dispatch Communication (No address or phone number) */}
          <div>
            <h4 className="footer-col-title">Direct Communication</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.9rem', fontSize: '0.88rem', color: '#94A3B8' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem' }}>
                <Mail size={18} style={{ color: '#F59E0B', marginTop: '3px', flexShrink: 0 }} />
                <div>
                  <a 
                    href={`mailto:${COMPANY_INFO.email}`} 
                    style={{ color: '#FCD34D', textDecoration: 'none', fontWeight: 600, display: 'block', fontSize: '0.95rem' }}
                  >
                    {COMPANY_INFO.email}
                  </a>
                  <span style={{ fontSize: '0.8rem', color: '#94A3B8' }}>Official Dispatch & Quotes</span>
                </div>
              </div>

              <p style={{ fontSize: '0.82rem', lineHeight: '1.5', color: '#64748B', marginTop: '0.25rem' }}>
                Contract and project proposals are reviewed by our logistics coordinators. Submit project details through the online quote form for rapid response.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar with Dynamic Copyright & Back-to-Top */}
        <div className="footer-bottom-bar">
          <div className="footer-copy">
            © {currentYear} {COMPANY_INFO.name}. All rights reserved. Heavy-Duty Construction & 18-Wheel Trucking Logistics.
          </div>

          <button 
            type="button" 
            className="footer-back-to-top"
            onClick={handleScrollTop}
            aria-label="Back to top"
          >
            <span>Back to Top</span>
            <ArrowUp size={14} />
          </button>
        </div>
      </div>
    </footer>
  );
}
