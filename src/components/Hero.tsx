'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Language } from '@/types';
import { siteMeta } from '@/data/content';
import {
  Building2,
  FolderGit2,
  CalendarCheck2,
  Users2,
  Gem,
  SendHorizontal,
  Flame,
  Maximize2,
  HeartHandshake,
  Sparkles
} from 'lucide-react';

interface HeroProps {
  lang: Language;
  onDonateClick: () => void;
  onOpenLogoMeaning: () => void;
}

export const Hero: React.FC<HeroProps> = ({ lang, onDonateClick, onOpenLogoMeaning }) => {
  const [isZoomed, setIsZoomed] = useState(false);

  const mainButtons = [
    {
      id: 'about',
      href: '#about',
      num: '1',
      icon: <Building2 size={22} />,
      titleUa: 'Наша компанія',
      subtitleUa: 'Хто ми та засновник',
      titleDe: 'Unsere Organisation',
      subtitleDe: 'Wer wir sind & Gründer',
      color: '#D4AF37',
    },
    {
      id: 'projects',
      href: '#projects',
      num: '2',
      icon: <FolderGit2 size={22} />,
      titleUa: 'Наші проекти',
      subtitleUa: 'Фото та звіти',
      titleDe: 'Unsere Projekte',
      subtitleDe: 'Fotos & Rechenschaftsberichte',
      color: '#F7E19A',
    },
    {
      id: 'events',
      href: '#events',
      num: '3',
      icon: <CalendarCheck2 size={22} />,
      titleUa: 'Афіша проектів',
      subtitleUa: 'Події та заходи у Відні',
      titleDe: 'Affiche & Termine',
      subtitleDe: 'Veranstaltungskalender Wien',
      color: '#ED2939',
    },
    {
      id: 'partners',
      href: '#partners',
      num: '4',
      icon: <Users2 size={22} />,
      titleUa: 'Наші партнери',
      subtitleUa: 'Організації та спільноти',
      titleDe: 'Unsere Partner',
      subtitleDe: 'Gemeinschaften & Bündnisse',
      color: '#D4AF37',
    },
    {
      id: 'sponsors',
      href: '#sponsors',
      num: '5',
      icon: <Gem size={22} />,
      titleUa: 'Наші спонсори',
      subtitleUa: 'Меценати та підтримка',
      titleDe: 'Unsere Förderer',
      subtitleDe: 'Mäzene & Spendenfonds',
      color: '#F7E19A',
    },
    {
      id: 'contact',
      href: '#contact',
      num: '6',
      icon: <SendHorizontal size={22} />,
      titleUa: 'Контакти та соцмережі',
      subtitleUa: 'Банер зв\'язку у Відні',
      titleDe: 'Kontakt & Netzwerke',
      subtitleDe: 'Wien Adresse & Soziale Medien',
      color: '#ED2939',
    },
  ];

  return (
    <section id="hero" style={{ padding: '36px 0 54px', position: 'relative' }}>
      <div className="section-container">
        
        {/* Top welcome tagline */}
        <div style={{ textAlign: 'center', marginBottom: '22px' }}>
          {/* Official Logo Badge */}
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '14px'
          }}>
            <div style={{
              width: '84px',
              height: '84px',
              position: 'relative',
              borderRadius: '50%',
              overflow: 'hidden',
              border: '2.5px solid rgba(212, 175, 55, 0.9)',
              boxShadow: '0 0 25px rgba(212, 175, 55, 0.45)',
              background: '#240409'
            }}>
              <Image
                src="/images/logo.jpg"
                alt="Offizielles Logo Hoffnung & Würde"
                fill
                style={{ objectFit: 'cover' }}
                priority
              />
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginBottom: '12px', flexWrap: 'wrap' }}>
            <span className="gold-badge">
              <Sparkles size={14} />
              {lang === 'ua' ? 'Офіційний сайт-візитка фонду' : 'Offizielle Stiftungspräsenz'}
            </span>
            <span style={{
              background: 'rgba(237, 41, 57, 0.15)',
              border: '1px solid rgba(237, 41, 57, 0.4)',
              color: '#FF9494',
              fontSize: '0.8rem',
              fontWeight: 600,
              padding: '6px 12px',
              borderRadius: '999px'
            }}>
              🇦🇹 Wien · ZVR: {siteMeta.zvr}
            </span>
          </div>

          <h1 style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(1.8rem, 3.8vw, 3rem)',
            fontWeight: 800,
            lineHeight: 1.2,
            letterSpacing: '0.02em',
            marginBottom: '10px'
          }}>
            {lang === 'ua' ? siteMeta.nameUa : siteMeta.nameDe}
          </h1>

          <p style={{
            fontFamily: 'var(--font-playfair)',
            fontSize: 'clamp(1rem, 2vw, 1.25rem)',
            color: 'var(--color-gold-400)',
            fontStyle: 'italic',
            letterSpacing: '0.04em'
          }}>
            «{lang === 'ua' ? siteMeta.mottoUa : siteMeta.mottoDe}»
          </p>
        </div>

        {/* Panoramic Banner Container (User's Exact Uploaded Image) */}
        <div style={{
          position: 'relative',
          borderRadius: '20px',
          overflow: 'hidden',
          border: '2px solid rgba(212, 175, 55, 0.55)',
          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.8), 0 0 30px rgba(212, 175, 55, 0.2)',
          background: '#240409',
          marginBottom: '32px'
        }}>
          {/* Austrian Flag Top Accent Line */}
          <div style={{
            height: '4px',
            width: '100%',
            background: 'linear-gradient(90deg, #ED2939 0%, #ED2939 35%, #FFFFFF 35%, #FFFFFF 65%, #ED2939 65%, #ED2939 100%)'
          }} />

          {/* Main Panorama Image */}
          <div 
            style={{
              position: 'relative',
              width: '100%',
              aspectRatio: '2.7 / 1',
              minHeight: '260px',
              cursor: 'pointer'
            }}
            onClick={() => setIsZoomed(true)}
            title={lang === 'ua' ? 'Натисніть для збільшення банера' : 'Klicken zum Vergrößern des Banners'}
          >
            <Image
              src="/images/hero-main.jpg"
              alt="Wohltätigkeitsstiftung Hoffnung und Würde - Michael Kosik, Wien"
              fill
              style={{ objectFit: 'cover' }}
              priority
              quality={100}
            />

            {/* Subtle Zoom Hint in bottom corner */}
            <div style={{
              position: 'absolute',
              bottom: '14px',
              right: '16px',
              background: 'rgba(26, 4, 8, 0.75)',
              backdropFilter: 'blur(8px)',
              border: '1px solid rgba(212, 175, 55, 0.4)',
              color: 'var(--color-gold-300)',
              padding: '6px 12px',
              borderRadius: '8px',
              fontSize: '0.78rem',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}>
              <Maximize2 size={13} />
              <span>{lang === 'ua' ? 'Збільшити банер' : 'Vollbild'}</span>
            </div>
          </div>

          {/* Bottom Austrian Ribbon Accent */}
          <div style={{
            height: '4px',
            width: '100%',
            background: 'linear-gradient(90deg, #ED2939 0%, #ED2939 35%, #FFFFFF 35%, #FFFFFF 65%, #ED2939 65%, #ED2939 100%)'
          }} />
        </div>

        {/* Featured Banner Action: Symbolism of the Logo */}
        <div style={{
          background: 'linear-gradient(90deg, rgba(82, 11, 23, 0.7) 0%, rgba(38, 7, 13, 0.9) 50%, rgba(82, 11, 23, 0.7) 100%)',
          border: '1px solid rgba(212, 175, 55, 0.45)',
          borderRadius: '16px',
          padding: '16px 24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '16px',
          boxShadow: '0 8px 30px rgba(0, 0, 0, 0.4)',
          marginBottom: '36px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div style={{
              width: '52px',
              height: '52px',
              borderRadius: '50%',
              overflow: 'hidden',
              position: 'relative',
              border: '2px solid rgba(212, 175, 55, 0.85)',
              boxShadow: '0 0 15px rgba(212, 175, 55, 0.4)',
              background: '#240409',
              flexShrink: 0
            }}>
              <Image src="/images/logo.jpg" alt="Logo" fill style={{ objectFit: 'cover' }} />
            </div>
            <div>
              <div style={{
                fontFamily: 'var(--font-serif)',
                fontWeight: 700,
                color: 'var(--color-gold-300)',
                fontSize: '1.05rem',
                letterSpacing: '0.03em'
              }}>
                {lang === 'ua' ? 'Символ надії: Значення логотипу та Фенікса' : 'Symbol der Hoffnung: Bedeutung des Logos & Phönix'}
              </div>
              <div style={{ fontSize: '0.86rem', color: 'var(--color-text-muted)', fontStyle: 'italic' }}>
                «{lang === 'ua' ? siteMeta.logoInterpretationUa : siteMeta.logoInterpretationDe}»
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '10px' }}>
            <button
              onClick={onOpenLogoMeaning}
              className="btn-outline-gold"
              style={{ padding: '9px 18px', fontSize: '0.86rem' }}
            >
              <Flame size={15} />
              <span>{lang === 'ua' ? 'Розкрити значення' : 'Bedeutung ansehen'}</span>
            </button>
            <button
              onClick={onDonateClick}
              className="btn-gold"
              style={{ padding: '9px 18px', fontSize: '0.86rem' }}
            >
              <HeartHandshake size={15} />
              <span>{lang === 'ua' ? 'Підтримати фонд' : 'Jetzt spenden'}</span>
            </button>
          </div>
        </div>

        {/* The 6 Core Section Navigation Buttons requested by user */}
        <div style={{ marginBottom: '18px', textAlign: 'center' }}>
          <h2 style={{
            fontFamily: 'var(--font-serif)',
            fontSize: '1.45rem',
            color: 'var(--color-gold-400)',
            letterSpacing: '0.04em',
            marginBottom: '6px'
          }}>
            {lang === 'ua' ? 'Розділи нашого сайту-візитки' : 'Hauptbereiche unserer Visitenkarten-Präsenz'}
          </h2>
          <p style={{ fontSize: '0.92rem', color: 'var(--color-text-muted)' }}>
            {lang === 'ua' 
              ? 'Оберіть потрібний розділ для швидкого переходу та ознайомлення:' 
              : 'Wählen Sie einen Bereich für den direkten Übergang:'}
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: '16px',
        }}>
          {mainButtons.map((btn) => (
            <a
              key={btn.id}
              href={btn.href}
              className="card-glass"
              style={{
                padding: '22px 18px',
                textAlign: 'center',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                textDecoration: 'none',
                position: 'relative',
                background: 'rgba(38, 7, 13, 0.88)',
                borderColor: 'rgba(212, 175, 55, 0.3)'
              }}
            >
              {/* Badge Number */}
              <div style={{
                position: 'absolute',
                top: '10px',
                right: '12px',
                width: '22px',
                height: '22px',
                borderRadius: '50%',
                background: 'rgba(212, 175, 55, 0.15)',
                border: '1px solid rgba(212, 175, 55, 0.4)',
                fontSize: '0.72rem',
                fontWeight: 700,
                color: 'var(--color-gold-400)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                {btn.num}
              </div>

              {/* Icon */}
              <div style={{
                width: '48px',
                height: '48px',
                borderRadius: '12px',
                background: 'rgba(82, 11, 23, 0.65)',
                border: '1px solid rgba(212, 175, 55, 0.45)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--color-gold-300)',
                marginBottom: '14px',
                boxShadow: '0 4px 15px rgba(0, 0, 0, 0.4)'
              }}>
                {btn.icon}
              </div>

              {/* Title */}
              <div style={{
                fontFamily: 'var(--font-serif)',
                fontWeight: 700,
                fontSize: '0.98rem',
                color: '#FFFFFF',
                marginBottom: '4px',
                lineHeight: 1.3
              }}>
                {lang === 'ua' ? btn.titleUa : btn.titleDe}
              </div>

              {/* Subtitle */}
              <div style={{
                fontSize: '0.78rem',
                color: 'var(--color-text-muted)',
                lineHeight: 1.35
              }}>
                {lang === 'ua' ? btn.subtitleUa : btn.subtitleDe}
              </div>
            </a>
          ))}
        </div>

      </div>

      {/* Fullscreen Lightbox Modal for Banner */}
      {isZoomed && (
        <div
          onClick={() => setIsZoomed(false)}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            background: 'rgba(10, 1, 3, 0.95)',
            backdropFilter: 'blur(16px)',
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '24px',
            cursor: 'zoom-out'
          }}
        >
          <div style={{
            position: 'relative',
            maxWidth: '1200px',
            width: '100%',
            aspectRatio: '2.7 / 1',
            borderRadius: '16px',
            overflow: 'hidden',
            border: '2px solid rgba(212, 175, 55, 0.8)',
            boxShadow: '0 0 50px rgba(212, 175, 55, 0.3)'
          }}>
            <Image
              src="/images/hero-main.jpg"
              alt="Hoffnung und Würde Banner"
              fill
              style={{ objectFit: 'contain' }}
            />
          </div>
        </div>
      )}
    </section>
  );
};
