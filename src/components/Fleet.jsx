import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Truck, Eye, X, ShieldCheck, ArrowRight } from 'lucide-react';
import { FLEET_LIST, COMPANY_INFO } from '../data/constants';

export default function Fleet({ onSelectUnit }) {
  const [selectedTruck, setSelectedTruck] = useState(null);

  return (
    <section id="fleet" className="fleet-section section-py">
      <div className="container">
        {/* Section Header */}
        <motion.div 
          className="section-header"
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6 }}
        >
          <div className="section-tag">
            <span>Operational Assets</span>
          </div>
          <h2 className="section-title">
            Our Heavy-Duty <span>18-Wheel Fleet</span>
          </h2>
          <p className="section-subtitle">
            {COMPANY_INFO.name} operates a dedicated fleet of heavy-duty 18-wheel rigs, purpose-allocated for continuous construction haulage, dependable material turnaround, and rigorous jobsite demands.
          </p>
        </motion.div>

        {/* Fleet Capacity Banner (No specific quantity mentioned) */}
        <motion.div 
          className="fleet-highlight-bar"
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="fleet-highlight-text">
            <span className="fleet-highlight-badge">Multi-Axle Fleet</span>
            <div>
              <strong style={{ display: 'block', color: '#FFFFFF', fontSize: '1.05rem' }}>
                Dedicated 18-Wheel Heavy Rig Capacity
              </strong>
              <span style={{ fontSize: '0.85rem', color: '#94A3B8' }}>
                Directly dispatched commercial rigs ready for active project assignment and site deployment.
              </span>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
            <span className="section-tag" style={{ margin: 0, background: 'rgba(16, 185, 129, 0.15)', borderColor: 'rgba(16, 185, 129, 0.3)', color: '#34D399' }}>
              <ShieldCheck size={14} /> Active Site Dispatch
            </span>
          </div>
        </motion.div>

        {/* Fleet Grid with Framer Motion Stagger */}
        <div className="fleet-grid">
          {FLEET_LIST.map((truck, idx) => (
            <motion.div 
              key={truck.id} 
              className="fleet-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              whileHover={{ y: -7, transition: { duration: 0.2 } }}
            >
              <div className="fleet-img-wrapper">
                <img 
                  src={truck.image} 
                  alt={`${truck.unitNumber} - ${truck.role}`}
                  loading="lazy"
                />
                <div className="fleet-unit-badge">{truck.unitNumber}</div>
                <div className="fleet-status-pill">
                  <span className="fleet-status-dot" />
                  <span>{truck.status}</span>
                </div>
              </div>

              <div className="fleet-card-body">
                <span className="fleet-role-tag">{truck.configuration}</span>
                <h3 className="fleet-card-title">{truck.role}</h3>
                <p className="fleet-card-desc">{truck.description}</p>

                <div className="fleet-features-list">
                  <span className="fleet-feature-tag">18 Wheels</span>
                  <span className="fleet-feature-tag">Heavy Duty Rig</span>
                  <span className="fleet-feature-tag">Site Ingress Ready</span>
                </div>

                <div style={{ marginTop: 'auto', paddingTop: '1rem', borderTop: '1px solid rgba(255, 255, 255, 0.06)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <button
                    type="button"
                    className="btn btn-secondary btn-sm"
                    onClick={() => setSelectedTruck(truck)}
                  >
                    <Eye size={14} />
                    <span>Quick View</span>
                  </button>

                  <button
                    type="button"
                    className="btn btn-primary btn-sm"
                    onClick={() => onSelectUnit(truck.unitNumber)}
                  >
                    <span>Book Truck</span>
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Quick View Truck Modal with AnimatePresence */}
      <AnimatePresence>
        {selectedTruck && (
          <div className="modal-backdrop" onClick={() => setSelectedTruck(null)}>
            <motion.div 
              className="modal-content-card" 
              onClick={(e) => e.stopPropagation()}
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 20 }}
              transition={{ duration: 0.25 }}
            >
              <div className="modal-header">
                <div>
                  <span className="section-tag" style={{ margin: 0, padding: '0.2rem 0.6rem' }}>
                    {selectedTruck.configuration}
                  </span>
                  <h3 className="modal-title" style={{ marginTop: '0.35rem' }}>
                    {selectedTruck.unitNumber} — {selectedTruck.role}
                  </h3>
                </div>
                <button 
                  type="button" 
                  className="modal-close-btn"
                  onClick={() => setSelectedTruck(null)}
                  aria-label="Close modal"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="modal-body">
                <div style={{ borderRadius: '8px', overflow: 'hidden', height: '260px', marginBottom: '1.25rem' }}>
                  <img 
                    src={selectedTruck.image} 
                    alt={selectedTruck.unitNumber}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>

                <p style={{ color: '#CBD5E1', fontSize: '0.95rem', lineHeight: '1.6', marginBottom: '1.25rem' }}>
                  {selectedTruck.description}
                </p>

                <div style={{ background: '#0E1116', padding: '1rem', borderRadius: '8px', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
                  <div style={{ fontSize: '0.8rem', textTransform: 'uppercase', color: '#94A3B8', fontWeight: 700, marginBottom: '0.5rem' }}>
                    Operational Overview
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', fontSize: '0.88rem' }}>
                    <div><strong style={{ color: '#F8FAFC' }}>Fleet Unit:</strong> <span style={{ color: '#F59E0B' }}>{selectedTruck.unitNumber}</span></div>
                    <div><strong style={{ color: '#F8FAFC' }}>Chassis:</strong> 18-Wheel Commercial</div>
                    <div><strong style={{ color: '#F8FAFC' }}>Service Scope:</strong> Construction Logistics</div>
                    <div><strong style={{ color: '#F8FAFC' }}>Availability:</strong> Scheduled Dispatch</div>
                  </div>
                </div>
              </div>

              <div className="modal-footer">
                <button 
                  type="button" 
                  className="btn btn-secondary btn-sm"
                  onClick={() => setSelectedTruck(null)}
                >
                  Close
                </button>
                <button
                  type="button"
                  className="btn btn-primary btn-sm"
                  onClick={() => {
                    const unit = selectedTruck.unitNumber;
                    setSelectedTruck(null);
                    onSelectUnit(unit);
                  }}
                >
                  Request Quote For {selectedTruck.unitNumber}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
