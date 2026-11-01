import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Send, Mail, Clock, CheckCircle2, AlertCircle, Loader2, ShieldCheck, FileText } from 'lucide-react';
import { COMPANY_INFO, SERVICES_LIST } from '../data/constants';
import { addEnquiry } from '../utils/storage';

export default function Contact({ prefilledService, prefilledUnit }) {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    serviceRequired: SERVICES_LIST[0].title,
    projectLocation: '',
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successInfo, setSuccessInfo] = useState(null);

  useEffect(() => {
    if (prefilledService) {
      setFormData(prev => ({ ...prev, serviceRequired: prefilledService }));
    }
  }, [prefilledService]);

  useEffect(() => {
    if (prefilledUnit) {
      setFormData(prev => ({
        ...prev,
        message: prev.message 
          ? `${prev.message}\n(Interested in booking ${prefilledUnit})`
          : `Interested in booking 18-wheel ${prefilledUnit} for upcoming project.`
      }));
    }
  }, [prefilledUnit]);

  const validate = () => {
    const errs = {};
    if (!formData.fullName.trim()) {
      errs.fullName = 'Full Name is required.';
    } else if (formData.fullName.trim().length < 2) {
      errs.fullName = 'Name must be at least 2 characters.';
    }

    if (!formData.phone.trim()) {
      errs.phone = 'Phone Number is required for dispatch coordination.';
    } else if (!/^[\d\s\+\-\(\)]{7,20}$/.test(formData.phone.trim())) {
      errs.phone = 'Please enter a valid telephone contact number.';
    }

    if (formData.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      errs.email = 'Please provide a valid email format, or leave blank.';
    }

    if (!formData.message.trim()) {
      errs.message = 'Please provide details of your haulage or material requirements.';
    } else if (formData.message.trim().length < 10) {
      errs.message = 'Please provide a brief description (minimum 10 characters).';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    setTimeout(() => {
      try {
        const savedItem = addEnquiry(formData);
        setIsSubmitting(false);
        setSuccessInfo({
          id: savedItem.id,
          name: savedItem.fullName
        });

        // Reset form
        setFormData({
          fullName: '',
          phone: '',
          email: '',
          serviceRequired: SERVICES_LIST[0].title,
          projectLocation: '',
          message: ''
        });
      } catch (err) {
        setIsSubmitting(false);
        setErrors({ general: 'Failed to record enquiry to local storage.' });
      }
    }, 600);
  };

  return (
    <section id="contact" className="contact-section section-py">
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
            <span>Direct Dispatch & Quotes</span>
          </div>
          <h2 className="section-title">
            Request a <span>Transportation Quote</span>
          </h2>
          <p className="section-subtitle">
            Connect directly with {COMPANY_INFO.name} for tender proposals, site haulage contracts, or dedicated aggregate transport assignments.
          </p>
        </motion.div>

        <div className="contact-layout">
          {/* Contact Details & Info Column (No address or phone number shown) */}
          <motion.div 
            className="contact-info-panel"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {/* Email Card with info@jsvr.in */}
            <div className="contact-item-card" style={{ borderColor: 'rgba(245, 158, 11, 0.4)' }}>
              <div className="contact-item-icon">
                <Mail size={22} />
              </div>
              <div>
                <div className="contact-item-label">Direct Logistics Email</div>
                <div className="contact-item-value" style={{ color: '#FCD34D' }}>
                  <a href={`mailto:${COMPANY_INFO.email}`} style={{ color: '#FCD34D', textDecoration: 'none' }}>
                    {COMPANY_INFO.email}
                  </a>
                </div>
                <div className="contact-item-sub">For project specifications, tender inquiries & fleet reservations</div>
              </div>
            </div>

            <div className="contact-item-card">
              <div className="contact-item-icon">
                <ShieldCheck size={22} />
              </div>
              <div>
                <div className="contact-item-label">Fleet Operations</div>
                <div className="contact-item-value">Multi-Axle 18-Wheel Units</div>
                <div className="contact-item-sub">Continuous duty capability for civil infrastructure and quarries</div>
              </div>
            </div>

            <div className="contact-item-card">
              <div className="contact-item-icon">
                <FileText size={22} />
              </div>
              <div>
                <div className="contact-item-label">Formal Proposals</div>
                <div className="contact-item-value">Custom Turnaround Scheduling</div>
                <div className="contact-item-sub">Submit your project details via the form for tailored pricing</div>
              </div>
            </div>

            <div className="contact-item-card">
              <div className="contact-item-icon">
                <Clock size={22} />
              </div>
              <div>
                <div className="contact-item-label">Dispatch Coordination</div>
                <div className="contact-item-value">Active Site Delivery Cycles</div>
                <div className="contact-item-sub">Early-morning loadouts coordinated with pouring schedules</div>
              </div>
            </div>
          </motion.div>

          {/* Form Column */}
          <motion.div 
            className="contact-form-panel"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 style={{ fontSize: '1.4rem', fontWeight: 700, marginBottom: '0.4rem', color: '#FFFFFF' }}>
              Submit Your Project Requirements
            </h3>
            <p style={{ color: '#94A3B8', fontSize: '0.88rem', marginBottom: '1.75rem' }}>
              Fill in your project details below to create an official haulage enquiry for {COMPANY_INFO.name}.
            </p>

            {/* Success Message Banner */}
            {successInfo && (
              <motion.div 
                className="form-success-banner"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                <CheckCircle2 size={24} style={{ flexShrink: 0, marginTop: '2px' }} />
                <div>
                  <strong style={{ display: 'block', fontSize: '1rem', color: '#FFFFFF' }}>
                    Enquiry Submitted Successfully!
                  </strong>
                  <p style={{ fontSize: '0.85rem', color: '#D1FAE5', marginTop: '0.2rem' }}>
                    Reference ID: <strong>{successInfo.id}</strong>. Thank you for reaching out. Our dispatch team will review your project requirements promptly.
                  </p>
                </div>
              </motion.div>
            )}

            {errors.general && (
              <div className="form-notice-box" style={{ background: 'rgba(239, 68, 68, 0.1)', borderColor: 'rgba(239, 68, 68, 0.4)', color: '#FCA5A5' }}>
                <AlertCircle size={18} />
                <span>{errors.general}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} noValidate>
              <div className="form-grid">
                {/* Full Name */}
                <div className="form-group">
                  <label htmlFor="fullName" className="form-label">
                    Full Name <span className="req">*</span>
                  </label>
                  <input
                    id="fullName"
                    name="fullName"
                    type="text"
                    className={`form-input ${errors.fullName ? 'has-error' : ''}`}
                    placeholder="e.g. John Miller"
                    value={formData.fullName}
                    onChange={handleChange}
                    disabled={isSubmitting}
                  />
                  {errors.fullName && <span className="form-error-msg">{errors.fullName}</span>}
                </div>

                {/* Phone Number */}
                <div className="form-group">
                  <label htmlFor="phone" className="form-label">
                    Your Phone Number <span className="req">*</span>
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    className={`form-input ${errors.phone ? 'has-error' : ''}`}
                    placeholder="e.g. +1 (555) 019-2834"
                    value={formData.phone}
                    onChange={handleChange}
                    disabled={isSubmitting}
                  />
                  {errors.phone && <span className="form-error-msg">{errors.phone}</span>}
                </div>

                {/* Email Address */}
                <div className="form-group">
                  <label htmlFor="email" className="form-label">
                    Email Address <span style={{ color: '#94A3B8', fontSize: '0.75rem', fontWeight: 400 }}>(Optional)</span>
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    className={`form-input ${errors.email ? 'has-error' : ''}`}
                    placeholder="e.g. jmiller@contractors.com"
                    value={formData.email}
                    onChange={handleChange}
                    disabled={isSubmitting}
                  />
                  {errors.email && <span className="form-error-msg">{errors.email}</span>}
                </div>

                {/* Service Required */}
                <div className="form-group">
                  <label htmlFor="serviceRequired" className="form-label">
                    Service Required <span className="req">*</span>
                  </label>
                  <select
                    id="serviceRequired"
                    name="serviceRequired"
                    className="form-select"
                    value={formData.serviceRequired}
                    onChange={handleChange}
                    disabled={isSubmitting}
                  >
                    {SERVICES_LIST.map((srv) => (
                      <option key={srv.id} value={srv.title}>
                        {srv.title}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Project Location */}
                <div className="form-group form-full">
                  <label htmlFor="projectLocation" className="form-label">
                    Project Location / Delivery Site <span style={{ color: '#94A3B8', fontSize: '0.75rem', fontWeight: 400 }}>(Optional)</span>
                  </label>
                  <input
                    id="projectLocation"
                    name="projectLocation"
                    type="text"
                    className="form-input"
                    placeholder="e.g. Expressway Expansion Project, Sector 7"
                    value={formData.projectLocation}
                    onChange={handleChange}
                    disabled={isSubmitting}
                  />
                </div>

                {/* Message / Requirements */}
                <div className="form-group form-full">
                  <label htmlFor="message" className="form-label">
                    Message / Project Requirements <span className="req">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows="4"
                    className={`form-textarea ${errors.message ? 'has-error' : ''}`}
                    placeholder="Please specify material type, estimated tonnage, haul route, timeline, or number of trucks required..."
                    value={formData.message}
                    onChange={handleChange}
                    disabled={isSubmitting}
                  />
                  {errors.message && <span className="form-error-msg">{errors.message}</span>}
                </div>
              </div>

              <motion.button
                type="submit"
                className="btn btn-primary"
                style={{ width: '100%', padding: '1rem' }}
                disabled={isSubmitting}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    <span>Recording Enquiry...</span>
                  </>
                ) : (
                  <>
                    <span>Submit Haulage Enquiry</span>
                    <Send size={16} />
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
