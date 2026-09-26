'use client';

import React from 'react';
import Image from 'next/image';
import { Language } from '@/types';
import { siteMeta } from '@/data/content';
import { Heart, Shield } from 'lucide-react';

interface FooterProps {
  lang: Language;
}

export const Footer: React.FC<FooterProps> = ({ lang }) => {
  return (
    <footer style={{
      background: '#0D0103',
      borderTop: '1px solid rgba(212, 175, 55, 0.3)',
      padding: '48px 0 30px',
      position: 'relative'
    }}>
      {/* Top Austrian Flag Ribbon */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '3px',
        background: 'linear-gradient(90deg, #ED2939 0%, #ED2939 35%, #FFFFFF 35%, #FFFFFF 65%, #ED2939 65%, #ED2939 100%)'
      }} />

      <div className="section-container">
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '24px',
          paddingBottom: '32px',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)'
        }}>
          {/* Logo & Brand Info */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div style={{
              width: '48px',
              height: '48px',
              position: 'relative',
              borderRadius: '50%',
              overflow: 'hidden',
              border: '1.5px solid rgba(212, 175, 55, 0.8)',
              background: '#240409',
              flexShrink: 0
            }}>
              <Image src="/images/logo.jpg" alt="Logo" fill style={{ objectFit: 'cover' }} />
            </div>
            <div>
              <div style={{ fontFamily: 'var(--font-serif)', fontWeight: 800, fontSize: '1.15rem' }}>
                <span className="gold-text">HOFFNUNG & WÜRDE</span>
              </div>
              <div style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)' }}>
                {lang === 'ua' ? 'Благодійний фонд · Відень, Австрія' : 'Wohltätigkeitsstiftung · Wien, Österreich'}
              </div>
            </div>
          </div>

          {/* Quick Legal Austrian Registration */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            background: 'rgba(212, 175, 55, 0.08)',
            border: '1px solid rgba(212, 175, 55, 0.25)',
            padding: '8px 16px',
            borderRadius: '20px',
            fontSize: '0.8rem',
            color: 'var(--color-gold-300)'
          }}>
            <Shield size={14} color="var(--color-gold-400)" />
            <span>Zentrales Vereinsregister: <strong>ZVR 1984068166</strong></span>
          </div>
        </div>

        {/* Bottom copyright row */}
        <div style={{
          paddingTop: '24px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '16px',
          fontSize: '0.82rem',
          color: 'var(--color-text-muted)'
        }}>
          <div>
            © {new Date().getFullYear()} {siteMeta.nameDe}. {lang === 'ua' ? 'Всі права захищено.' : 'Alle Rechte vorbehalten.'}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span>{lang === 'ua' ? 'Засновник:' : 'Gründer:'}</span>
            <strong style={{ color: 'var(--color-gold-300)' }}>{siteMeta.founder}</strong>
            <span style={{ margin: '0 4px', opacity: 0.4 }}>•</span>
            <span style={{ fontStyle: 'italic', color: 'var(--color-gold-400)' }}>
              «{lang === 'ua' ? siteMeta.callToActionUa : siteMeta.callToActionDe}»
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
