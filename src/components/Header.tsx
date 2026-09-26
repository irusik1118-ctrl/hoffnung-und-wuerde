'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Language } from '@/types';
import { siteMeta } from '@/data/content';
import { Heart, Globe, Menu, X, PhoneCall } from 'lucide-react';

interface HeaderProps {
  lang: Language;
  onToggleLang: () => void;
  onDonateClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({ lang, onToggleLang, onDonateClick }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: '#about', labelUa: 'Про фонд', labelDe: 'Über uns' },
    { href: '#logo-meaning', labelUa: 'Символіка', labelDe: 'Symbolik' },
    { href: '#projects', labelUa: 'Проекти та звіти', labelDe: 'Projekte & Berichte' },
    { href: '#events', labelUa: 'Афіша', labelDe: 'Affiche' },
    { href: '#partners', labelUa: 'Партнери', labelDe: 'Partner' },
    { href: '#sponsors', labelUa: 'Спонсори', labelDe: 'Förderer' },
    { href: '#contact', labelUa: 'Контакти', labelDe: 'Kontakt' },
  ];

  return (
    <header style={{
      position: 'sticky',
      top: 0,
      zIndex: 100,
      background: 'rgba(26, 4, 8, 0.94)',
      backdropFilter: 'blur(16px)',
      borderBottom: '1px solid rgba(212, 175, 55, 0.25)',
      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.4)'
    }}>
      {/* Top micro-bar with Austrian affiliation */}
      <div style={{
        background: 'linear-gradient(90deg, #160205 0%, #30060E 50%, #160205 100%)',
        borderBottom: '1px solid rgba(212, 175, 55, 0.15)',
        padding: '4px 24px',
        fontSize: '0.78rem',
        color: 'var(--color-gold-400)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '8px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{
            display: 'inline-block',
            width: '18px',
            height: '11px',
            background: 'linear-gradient(to bottom, #ED2939 33%, #FFFFFF 33%, #FFFFFF 66%, #ED2939 66%)',
            borderRadius: '2px',
            boxShadow: '0 0 4px rgba(0,0,0,0.4)'
          }}></span>
          <span>Wien · Österreich · <strong>ZVR: 1984068166</strong></span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <span>{lang === 'ua' ? 'Засновник:' : 'Gründer:'} <strong>{siteMeta.founder}</strong></span>
          <span style={{ color: 'rgba(212, 175, 55, 0.5)' }}>|</span>
          <span style={{ fontStyle: 'italic' }}>«{lang === 'ua' ? siteMeta.triadUa : siteMeta.triadDe}»</span>
        </div>
      </div>

      {/* Main Header Row */}
      <div className="section-container" style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '12px 24px'
      }}>
        {/* Logo and Brand Title */}
        <a href="#hero" style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div style={{
            width: '52px',
            height: '52px',
            position: 'relative',
            borderRadius: '50%',
            overflow: 'hidden',
            border: '2px solid rgba(212, 175, 55, 0.8)',
            boxShadow: '0 0 15px rgba(212, 175, 55, 0.35)',
            background: '#240409',
            flexShrink: 0
          }}>
            <Image 
              src="/images/logo.jpg" 
              alt="Hoffnung & Würde Logo" 
              fill 
              style={{ objectFit: 'cover' }}
              priority
            />
          </div>
          <div>
            <div style={{
              fontFamily: 'var(--font-serif)',
              fontSize: '1.22rem',
              fontWeight: 800,
              letterSpacing: '0.04em',
              lineHeight: 1.15
            }}>
              <span className="gold-text">HOFFNUNG & WÜRDE</span>
            </div>
            <div style={{
              fontSize: '0.74rem',
              color: '#FFFFFF',
              letterSpacing: '0.05em',
              textTransform: 'uppercase',
              opacity: 0.9
            }}>
              {lang === 'ua' ? 'Благодійний фонд · Відень' : 'Wohltätigkeitsstiftung · Wien'}
            </div>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav style={{
          display: 'none',
          alignItems: 'center',
          gap: '22px'
        }} className="desktop-nav">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              style={{
                fontSize: '0.88rem',
                fontWeight: 500,
                color: 'var(--color-text-main)',
                letterSpacing: '0.02em',
                transition: 'color 0.2s ease',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--color-gold-400)')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--color-text-main)')}
            >
              {lang === 'ua' ? link.labelUa : link.labelDe}
            </a>
          ))}
        </nav>

        {/* Action Buttons: Language toggle + Donate */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          {/* Language Switcher */}
          <button
            onClick={onToggleLang}
            title={lang === 'ua' ? 'Змінити мову на німецьку' : 'Sprache auf Ukrainisch ändern'}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '7px 14px',
              borderRadius: '20px',
              border: '1px solid rgba(212, 175, 55, 0.45)',
              background: 'rgba(40, 8, 14, 0.6)',
              color: 'var(--color-gold-300)',
              fontSize: '0.85rem',
              fontWeight: 700,
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(212, 175, 55, 0.2)';
              e.currentTarget.style.borderColor = 'var(--color-gold-400)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(40, 8, 14, 0.6)';
              e.currentTarget.style.borderColor = 'rgba(212, 175, 55, 0.45)';
            }}
          >
            <Globe size={15} style={{ color: 'var(--color-gold-400)' }} />
            <span>{lang === 'ua' ? 'UA / DE' : 'DE / UA'}</span>
          </button>

          {/* Spenden / Donate CTA */}
          <button
            onClick={onDonateClick}
            className="btn-gold"
            style={{
              padding: '9px 18px',
              fontSize: '0.86rem',
              borderRadius: '10px'
            }}
          >
            <Heart size={16} fill="#1a0508" />
            <span>{lang === 'ua' ? 'Підтримати' : 'Spenden'}</span>
          </button>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            style={{
              display: 'none',
              padding: '8px',
              color: 'var(--color-gold-400)',
            }}
            className="mobile-toggle"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div style={{
          background: 'rgba(20, 2, 5, 0.98)',
          borderTop: '1px solid rgba(212, 175, 55, 0.3)',
          padding: '20px 24px',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px'
        }}>
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              style={{
                fontSize: '1.05rem',
                color: 'var(--color-text-main)',
                padding: '8px 0',
                borderBottom: '1px solid rgba(255, 255, 255, 0.05)'
              }}
            >
              {lang === 'ua' ? link.labelUa : link.labelDe}
            </a>
          ))}
          <div style={{ display: 'flex', gap: '12px', marginTop: '10px' }}>
            <button
              onClick={() => {
                onToggleLang();
                setMobileMenuOpen(false);
              }}
              style={{
                flex: 1,
                padding: '10px',
                borderRadius: '8px',
                border: '1px solid rgba(212, 175, 55, 0.4)',
                color: 'var(--color-gold-300)',
                fontWeight: 600
              }}
            >
              🌐 {lang === 'ua' ? 'Змінити на Deutsch' : 'Auf Ukrainisch wechseln'}
            </button>
          </div>
        </div>
      )}

      <style jsx>{`
        @media (min-width: 992px) {
          .desktop-nav {
            display: flex !important;
          }
        }
        @media (max-width: 991px) {
          .mobile-toggle {
            display: block !important;
          }
        }
      `}</style>
    </header>
  );
};
