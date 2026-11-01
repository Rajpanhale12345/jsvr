import React from 'react';

export default function Logo({ size = 'default', showTagline = true }) {
  const isLarge = size === 'large';
  const isSmall = size === 'small';

  const badgeSize = isLarge ? 50 : isSmall ? 32 : 40;
  const fontSize = isLarge ? '1.75rem' : isSmall ? '1.1rem' : '1.35rem';
  const tagSize = isLarge ? '0.78rem' : isSmall ? '0.62rem' : '0.68rem';

  return (
    <div className={`jsvr-logo-container ${isLarge ? 'logo-large' : isSmall ? 'logo-small' : 'logo-default'}`} style={{ display: 'flex', alignItems: 'center', gap: isSmall ? '0.5rem' : '0.75rem', cursor: 'pointer' }}>
      {/* SVG Geometric Monogram Emblem for JSVR */}
      <svg 
        className="jsvr-logo-badge"
        width={badgeSize} 
        height={badgeSize} 
        viewBox="0 0 48 48" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        style={{ flexShrink: 0, filter: 'drop-shadow(0 2px 8px rgba(245, 158, 11, 0.35))' }}
      >
        <defs>
          <linearGradient id="jsvrGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FBBF24" />
            <stop offset="50%" stopColor="#F59E0B" />
            <stop offset="100%" stopColor="#D97706" />
          </linearGradient>
          <linearGradient id="darkBevel" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1E232B" />
            <stop offset="100%" stopColor="#0E1116" />
          </linearGradient>
        </defs>

        {/* Shield / Angular Hex Base */}
        <path
          d="M24 3L43 10V26C43 36 24 45 24 45C24 45 5 36 5 26V10L24 3Z"
          fill="url(#darkBevel)"
          stroke="url(#jsvrGrad)"
          strokeWidth="2.5"
          strokeLinejoin="round"
        />

        {/* Geometric Heavy Haul Tracks / Chevron Overlay */}
        <path
          d="M14 16L24 11L34 16L24 21L14 16Z"
          fill="url(#jsvrGrad)"
        />
        <path
          d="M14 24L24 19L34 24L24 29L14 24Z"
          fill="url(#jsvrGrad)"
          opacity="0.85"
        />
        <path
          d="M17 32L24 28.5L31 32L24 35.5L17 32Z"
          fill="url(#jsvrGrad)"
          opacity="0.7"
        />

        {/* Center Accent Core */}
        <circle cx="24" cy="20" r="2.5" fill="#0B0D10" />
      </svg>

      {/* Typography Brand Name */}
      <div className="jsvr-logo-text-col" style={{ display: 'flex', flexDirection: 'column', lineHeight: 1 }}>
        <div className="jsvr-brand-name" style={{ 
          fontFamily: "'Space Grotesk', sans-serif", 
          fontSize: fontSize, 
          fontWeight: 800, 
          letterSpacing: '-0.02em', 
          color: '#FFFFFF',
          display: 'flex',
          alignItems: 'baseline',
          gap: '2px'
        }}>
          JSVR<span style={{ color: '#F59E0B' }}>.</span>
        </div>
        {showTagline && (
          <span className="jsvr-tagline" style={{ 
            fontSize: tagSize, 
            fontWeight: 700, 
            letterSpacing: '0.12em', 
            textTransform: 'uppercase', 
            color: '#94A3B8',
            marginTop: '3px'
          }}>
            Heavy Logistics
          </span>
        )}
      </div>
    </div>
  );
}
