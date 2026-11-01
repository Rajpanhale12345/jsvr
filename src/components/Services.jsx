import React from 'react';
import { motion } from 'framer-motion';
import { Truck, Mountain, Layers, Compass, ShieldAlert, CalendarCheck, ArrowRight } from 'lucide-react';
import { SERVICES_LIST, COMPANY_INFO } from '../data/constants';

const iconMap = {
  Truck: Truck,
  Mountain: Mountain,
  Layers: Layers,
  Compass: Compass,
  ShieldAlert: ShieldAlert,
  CalendarCheck: CalendarCheck
};

export default function Services({ onSelectService }) {
  return (
    <section id="services" className="services-section section-py">
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
            <span>Specialized Capabilities</span>
          </div>
          <h2 className="section-title">
            Transportation & <span>Haulage Services</span>
          </h2>
          <p className="section-subtitle">
            Engineered around {COMPANY_INFO.name}&apos;s dedicated heavy-duty 18-wheel fleet to provide uninterrupted material delivery, prompt turnaround cycles, and dependable logistics coordination across active construction projects.
          </p>
        </motion.div>

        {/* Services Grid with Staggered Framer Motion Animation */}
        <div className="services-grid">
          {SERVICES_LIST.map((service, index) => {
            const IconComponent = iconMap[service.icon] || Truck;
            return (
              <motion.article 
                key={service.id} 
                className="service-card"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                whileHover={{ y: -7, transition: { duration: 0.2 } }}
              >
                <div className="service-image-box">
                  <img 
                    src={service.image} 
                    alt={service.title} 
                    loading="lazy"
                    onError={(e) => {
                      e.target.src = "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1200&q=80";
                    }}
                  />
                  <div className="service-badge">{service.tag}</div>
                </div>

                <div className="service-body">
                  <div className="service-icon-wrap">
                    <IconComponent size={24} />
                  </div>

                  <h3 className="service-card-title">{service.title}</h3>
                  <p className="service-card-desc">{service.shortDesc}</p>

                  <button
                    type="button"
                    className="service-footer-cta"
                    onClick={() => onSelectService(service.title)}
                  >
                    <span>Request Haulage Quote</span>
                    <ArrowRight size={16} />
                  </button>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
