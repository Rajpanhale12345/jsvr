import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, ShieldCheck, Truck, ChevronRight, CheckCircle2 } from 'lucide-react';
import { COMPANY_INFO, SERVICES_LIST } from '../data/constants';

export default function Hero({ onScrollTo, onSelectService }) {
  const { scrollY } = useScroll();
  const bgY = useTransform(scrollY, [0, 600], [0, 140]);
  const heroCardY = useTransform(scrollY, [0, 600], [0, -30]);

  return (
    <section id="hero" className="hero-section">
      {/* Background Parallax Image Layer */}
      <motion.div 
        className="hero-bg-overlay"
        style={{ y: bgY }}
      />
      
      {/* Ambient Gradient Glows */}
      <div className="hero-ambient-glow-1" />
      <div className="hero-ambient-glow-2" />

      <div className="hero-grid-pattern" />

      <div className="container hero-content-container">
        <div className="hero-split-grid">
          
          {/* Left Column: Headlines & Interaction */}
          <motion.div 
            className="hero-text-col"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
          >
            {/* Live Dispatch Indicator */}
            <div className="hero-badge-pill">
              <span className="pulse-dot" />
              <span className="hero-badge-text">
                {COMPANY_INFO.name} • 18-WHEEL HEAVY TRANSPORT FLEET
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="hero-title">
              Powering Construction. <br />
              <span>Delivering Progress.</span>
            </h1>

            {/* Description */}
            <p className="hero-description">
              {COMPANY_INFO.name} operates high-capacity 18-wheel commercial rigs specialized in direct construction supply, quarry aggregate transit, and synchronized jobsite logistics. Built for heavy loads, continuous turnaround, and rigorous site access.
            </p>

            {/* Interactive Capability Chips */}
            <div className="hero-chips-wrap">
              <span className="hero-chips-label">
                Key Haulage Segments:
              </span>
              <div className="hero-chips-list">
                {SERVICES_LIST.slice(0, 4).map((srv) => (
                  <button
                    key={srv.id}
                    type="button"
                    className="hero-chip-btn"
                    onClick={() => onSelectService(srv.title)}
                  >
                    <span>{srv.title.split(' ')[0]}</span>
                    <ChevronRight size={12} />
                  </button>
                ))}
              </div>
            </div>

            {/* CTAs */}
            <div className="hero-actions">
              <motion.button 
                type="button" 
                className="btn btn-primary"
                onClick={() => onScrollTo('contact')}
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <span>Request a Quote</span>
                <ArrowRight size={18} />
              </motion.button>

              <motion.button 
                type="button" 
                className="btn btn-secondary"
                onClick={() => onScrollTo('services')}
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <span>Explore Services</span>
              </motion.button>
            </div>

            {/* Stats Row */}
            <div className="hero-stats-row">
              <div className="hero-stat-card">
                <div className="hero-stat-number">18-Wheel Fleet</div>
                <div className="hero-stat-label">Heavy Commercial Rigs</div>
              </div>

              <div className="hero-stat-card">
                <div className="hero-stat-number">Direct Dispatch</div>
                <div className="hero-stat-label">Quarry & Site Integration</div>
              </div>

              <div className="hero-stat-card">
                <div className="hero-stat-number">100% Focused</div>
                <div className="hero-stat-label">Active Construction Logistics</div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Visual Showcase Truck Card with Parallax Tilt */}
          <motion.div 
            className="hero-visual-col"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.15, ease: 'easeOut' }}
            style={{ y: heroCardY }}
          >
            {/* Visual Frame */}
            <div className="hero-truck-card">
              {/* Truck Photo */}
              <div className="hero-truck-image-box">
                <img 
                  src="https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&w=1200&q=80" 
                  alt="Heavy-duty 18-wheel construction logistics truck"
                  className="hero-truck-img"
                  onError={(e) => {
                    e.target.src = "https://images.unsplash.com/photo-1519003722824-194d4455a60c?auto=format&fit=crop&w=1200&q=80";
                  }}
                />
                <div className="hero-truck-gradient-overlay" />

                {/* Top Badge */}
                <div className="hero-truck-tag">
                  {COMPANY_INFO.name} HAULAGE RIG
                </div>

                {/* Top Right Live Pill */}
                <div className="hero-truck-status">
                  <span className="hero-truck-status-dot" />
                  <span>Jobsite Ready</span>
                </div>

                {/* Bottom Overlay Info */}
                <div className="hero-truck-overlay-bottom">
                  <div>
                    <span className="hero-truck-sub">
                      Multi-Axle Heavy Duty
                    </span>
                    <h3 className="hero-truck-heading">
                      Continuous Aggregate Transit
                    </h3>
                  </div>

                  <button
                    type="button"
                    className="hero-truck-book-btn"
                    onClick={() => onScrollTo('contact')}
                  >
                    <span>Book Rig</span>
                    <ArrowRight size={13} />
                  </button>
                </div>
              </div>

              {/* Bottom Feature Bar */}
              <div className="hero-feature-bar">
                <div className="hero-feature-item">
                  <ShieldCheck size={16} color="#F59E0B" />
                  <span>Engineered For Rough Haul Roads</span>
                </div>
                <div className="hero-feature-item">
                  <CheckCircle2 size={16} color="#10B981" />
                  <span>Synchronized Concrete & Crane Feeds</span>
                </div>
              </div>
            </div>

            {/* Floating Mini Operational Card */}
            <motion.div 
              className="hero-floating-badge"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <div className="hero-floating-icon">
                <Truck size={20} />
              </div>
              <div>
                <strong className="hero-floating-title">
                  18-Wheel Commercial Rigs
                </strong>
                <span className="hero-floating-sub">
                  Available for contracted projects
                </span>
              </div>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
