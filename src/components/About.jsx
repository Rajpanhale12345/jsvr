import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Clock, Shield, Truck, CheckCircle2 } from 'lucide-react';
import { COMPANY_INFO } from '../data/constants';

export default function About({ onContactClick }) {
  return (
    <section id="about" className="about-section section-py">
      <div className="container">
        <div className="about-grid">
          {/* Visual Column with Framer Motion */}
          <motion.div 
            className="about-image-stack"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.7 }}
          >
            <img 
              src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1200&q=80" 
              alt="Heavy construction site and material transport logistics" 
              className="about-main-image"
              loading="lazy"
              onError={(e) => {
                e.target.src = "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1200&q=80";
              }}
            />
            <motion.div 
              className="about-floating-card"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <div className="about-floating-number">{COMPANY_INFO.name}</div>
              <div className="about-floating-label">Heavy Haulage & Site Logistics</div>
              <div style={{ marginTop: '0.5rem', fontSize: '0.78rem', color: '#94A3B8' }}>
                Dedicated multi-axle 18-wheel commercial fleet
              </div>
            </motion.div>
          </motion.div>

          {/* Narrative Column */}
          <motion.div 
            className="about-content"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.7 }}
          >
            <div className="section-tag">
              <span>Dependable Operations</span>
            </div>
            
            <h2 className="section-title">
              Built to Support <span>Active Jobsites</span>
            </h2>

            <p style={{ color: '#CBD5E1', fontSize: '1.05rem', lineHeight: '1.7', marginBottom: '1.25rem' }}>
              At {COMPANY_INFO.name}, our operation is built on one simple premise: modern construction projects cannot afford logistics bottlenecks. With a dedicated fleet of heavy-duty 18-wheel trucks, we provide focused transportation services tailored to contractors, quarry managers, and project superintendents.
            </p>

            <p style={{ color: '#94A3B8', fontSize: '0.95rem', lineHeight: '1.6', marginBottom: '1.5rem' }}>
              From initial excavation and bulk aggregate deliveries to continuous structural supplies, our drivers and dispatch team coordinate tightly with site managers to maintain prompt turnarounds, reduce staging congestion, and keep materials flowing smoothly.
            </p>

            {/* Core Pillars */}
            <div className="about-pillars">
              <div className="pillar-item">
                <Clock className="pillar-icon" size={20} />
                <div>
                  <h4 className="pillar-title">Timely Material Delivery</h4>
                  <p className="pillar-desc">Disciplined hauling schedules aligned with your concrete pours and crane operations.</p>
                </div>
              </div>

              <div className="pillar-item">
                <Truck className="pillar-icon" size={20} />
                <div>
                  <h4 className="pillar-title">Heavy-Duty Rigs</h4>
                  <p className="pillar-desc">Multi-axle commercial rigs engineered for high payload and continuous duty.</p>
                </div>
              </div>

              <div className="pillar-item">
                <Shield className="pillar-icon" size={20} />
                <div>
                  <h4 className="pillar-title">Dependable Transit</h4>
                  <p className="pillar-desc">Tough multi-axle trucks capable of navigating rugged access haul roads.</p>
                </div>
              </div>

              <div className="pillar-item">
                <CheckCircle2 className="pillar-icon" size={20} />
                <div>
                  <h4 className="pillar-title">Dedicated Support</h4>
                  <p className="pillar-desc">Clear communication with ground crews for safe, organized unloading.</p>
                </div>
              </div>
            </div>

            {/* Contact CTA */}
            <div>
              <motion.button
                type="button"
                className="btn btn-primary about-cta-btn"
                onClick={onContactClick}
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <span>Discuss Your Project Requirements</span>
                <ArrowRight size={16} />
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
