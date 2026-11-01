import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowRight } from 'lucide-react';
import Logo from './Logo';

export default function Navbar({ activeRoute, onNavigate }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
      document.body.style.touchAction = 'none';
    } else {
      document.body.style.overflow = '';
      document.body.style.touchAction = '';
    }
    return () => {
      document.body.style.overflow = '';
      document.body.style.touchAction = '';
    };
  }, [mobileMenuOpen]);

  // Close menu on resize or Escape key
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 840 && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [mobileMenuOpen]);

  const handleNavClick = (sectionId) => {
    setMobileMenuOpen(false);
    if (activeRoute !== '/') {
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
    <>
      <motion.header 
        className={`navbar-wrapper ${scrolled ? 'scrolled' : ''}`}
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        <div className="container navbar-container">
          {/* JSVR Brand Logo */}
          <div 
            onClick={() => handleNavClick('hero')} 
            role="button" 
            tabIndex={0}
            className="navbar-logo-wrapper"
            onKeyDown={(e) => { if (e.key === 'Enter') handleNavClick('hero'); }}
            aria-label="JSVR Home"
          >
            <Logo />
          </div>

          {/* Desktop Nav Links */}
          <nav aria-label="Main Navigation">
            <ul className="nav-links">
              <li>
                <button 
                  type="button" 
                  className="nav-link" 
                  onClick={() => handleNavClick('hero')}
                >
                  Home
                </button>
              </li>
              <li>
                <button 
                  type="button" 
                  className="nav-link" 
                  onClick={() => handleNavClick('services')}
                >
                  Services
                </button>
              </li>
              <li>
                <button 
                  type="button" 
                  className="nav-link" 
                  onClick={() => handleNavClick('about')}
                >
                  About Us
                </button>
              </li>
              <li>
                <button 
                  type="button" 
                  className="nav-link" 
                  onClick={() => handleNavClick('contact')}
                >
                  Contact
                </button>
              </li>
            </ul>
          </nav>

          {/* Right Actions */}
          <div className="nav-actions">
            <motion.button 
              type="button" 
              className="btn btn-primary btn-sm"
              onClick={() => handleNavClick('contact')}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.98 }}
            >
              <span>Request Quote</span>
              <ArrowRight size={14} />
            </motion.button>
          </div>

          {/* Mobile Toggle Button */}
          <button 
            type="button"
            className="mobile-menu-btn" 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-nav-drawer"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Drawer */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div 
              id="mobile-nav-drawer"
              className="mobile-nav-drawer open"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
            >
              <div className="mobile-drawer-inner">
                <button type="button" className="nav-link" onClick={() => handleNavClick('hero')}>
                  <span>Home</span>
                  <ArrowRight size={16} className="mobile-drawer-chevron" />
                </button>
                <button type="button" className="nav-link" onClick={() => handleNavClick('services')}>
                  <span>Services</span>
                  <ArrowRight size={16} className="mobile-drawer-chevron" />
                </button>
                <button type="button" className="nav-link" onClick={() => handleNavClick('about')}>
                  <span>About Us</span>
                  <ArrowRight size={16} className="mobile-drawer-chevron" />
                </button>
                <button type="button" className="nav-link" onClick={() => handleNavClick('contact')}>
                  <span>Contact Us</span>
                  <ArrowRight size={16} className="mobile-drawer-chevron" />
                </button>

                <div className="mobile-drawer-cta-wrap">
                  <button
                    type="button"
                    className="btn btn-primary"
                    style={{ width: '100%', minHeight: '48px', justifyContent: 'center' }}
                    onClick={() => handleNavClick('contact')}
                  >
                    <span>Request a Quote</span>
                    <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* Backdrop overlay for mobile menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            className="mobile-nav-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setMobileMenuOpen(false)}
            aria-hidden="true"
          />
        )}
      </AnimatePresence>
    </>
  );
}
