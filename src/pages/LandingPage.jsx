import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Services from '../components/Services';
import About from '../components/About';
import Contact from '../components/Contact';
import Footer from '../components/Footer';

export default function LandingPage({ onNavigate }) {
  const [selectedService, setSelectedService] = useState('');

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectService = (serviceTitle) => {
    setSelectedService(serviceTitle);
    scrollToSection('contact');
  };

  return (
    <div className="landing-page-wrapper">
      <Navbar activeRoute="/" onNavigate={onNavigate} />
      
      <main>
        <Hero onScrollTo={scrollToSection} onSelectService={handleSelectService} />
        <Services onSelectService={handleSelectService} />
        <About onContactClick={() => scrollToSection('contact')} />
        <Contact prefilledService={selectedService} />
      </main>

      <Footer onNavigate={onNavigate} onScrollTo={scrollToSection} />
    </div>
  );
}
