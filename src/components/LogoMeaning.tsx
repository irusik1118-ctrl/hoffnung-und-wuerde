'use client';

import React from 'react';
import Image from 'next/image';
import { Language } from '@/types';
import { logoSymbols, siteMeta } from '@/data/content';
import { Sparkles, Flame, Shield, Award, Heart, Sun } from 'lucide-react';

interface LogoMeaningProps {
  lang: Language;
}

export const LogoMeaning: React.FC<LogoMeaningProps> = ({ lang }) => {
  return (
    <section id="logo-meaning" style={{ padding: '70px 0', position: 'relative' }}>
      <div className="section-container">
        
        {/* Section Header */}
        <div className="section-header">
          <div className="gold-badge">
            <Sparkles size={14} />
            <span>{lang === 'ua' ? 'Айдентика та філософія' : 'Identität & Philosophie'}</span>
          </div>

          <h2 className="section-title">
            {lang === 'ua' ? 'Значення логотипу «Hoffnung & Würde»' : 'Bedeutung des Logos «Hoffnung & Würde»'}
          </h2>

          <div className="section-divider">
            <div className="line"></div>
            <div className="diamond"></div>
            <div className="line"></div>
          </div>

          <p className="section-subtitle">
            {lang === 'ua'
              ? 'Кожен елемент нашого герба сповнений глибокого змісту турботи, свободи та віри в гідне майбутнє кожної людини.'
              : 'Jedes Element unseres Wappens trägt eine tiefe Botschaft der Fürsorge, Freiheit und des Glaubens an eine würdevolle Zukunft.'}
          </p>
        </div>

        {/* Central Heraldic Display & Core Motto */}
        <div className="card-glass" style={{
          marginBottom: '40px',
          background: 'linear-gradient(135deg, rgba(56, 7, 16, 0.95) 0%, rgba(22, 3, 6, 0.95) 100%)',
          borderColor: 'rgba(212, 175, 55, 0.55)',
          padding: '36px',
          display: 'grid',
          gridTemplateColumns: 'minmax(280px, 340px) 1fr',
          gap: '36px',
          alignItems: 'center'
        }}>
          {/* Emblem Image Container */}
          <div style={{ textAlign: 'center' }}>
            <div style={{
              width: '290px',
              height: '290px',
              position: 'relative',
              margin: '0 auto',
              borderRadius: '20px',
              overflow: 'hidden',
              border: '2px solid rgba(212, 175, 55, 0.85)',
              boxShadow: '0 0 35px rgba(212, 175, 55, 0.4)',
              background: '#200408'
            }}>
              <Image
                src="/images/logo.jpg"
                alt="Offizielles Logo der Stiftung Hoffnung & Würde"
                fill
                style={{ objectFit: 'contain' }}
                priority
              />
            </div>
            <div style={{
              marginTop: '14px',
              fontSize: '0.82rem',
              color: 'var(--color-gold-400)',
              fontWeight: 700,
              letterSpacing: '0.08em',
              textTransform: 'uppercase'
            }}>
              🇦🇹 Wien Österreich · ZVR 1984068166
            </div>
          </div>

          {/* Core Philosophy Text */}
          <div>
            <div style={{
              display: 'inline-block',
              background: 'rgba(237, 41, 57, 0.18)',
              border: '1px solid rgba(237, 41, 57, 0.4)',
              color: '#FFA2A2',
              fontSize: '0.82rem',
              fontWeight: 700,
              padding: '6px 14px',
              borderRadius: '999px',
              marginBottom: '16px'
            }}>
              {lang === 'ua' ? 'Головна ідея фонду' : 'Kerneitrag der Stiftung'}
            </div>

            <h3 style={{
              fontFamily: 'var(--font-serif)',
              fontSize: '1.8rem',
              color: '#FFFFFF',
              lineHeight: 1.3,
              marginBottom: '16px'
            }}>
              «{lang === 'ua' ? siteMeta.logoInterpretationUa : siteMeta.logoInterpretationDe}»
            </h3>

            <p style={{
              fontSize: '1.02rem',
              color: 'var(--color-text-muted)',
              lineHeight: 1.75,
              marginBottom: '18px'
            }}>
              {lang === 'ua' ? (
                <>
                  Німецькою мовою <strong>«Hoffnung & Würde»</strong> означає <strong>«Надія та Гідність»</strong>. 
                  Це відображає фундаментальну мету нашого фонду: допомагати людям не лише матеріально, 
                  а й повертати їм відчуття надії, підтримки та невід&apos;ємної людської гідності.
                </>
              ) : (
                <>
                  Auf Deutsch bedeutet <strong>«Hoffnung & Würde»</strong> die Rückkehr von Zuversicht und menschlicher Würde. 
                  Dies spiegelt das Kernanliegen unserer Stiftung wider: Menschen nicht nur materiell zu unterstützen, 
                  sondern ihnen neues Vertrauen, Halt und Würde zu schenken.
                </>
              )}
            </p>

            <div style={{
              background: 'rgba(212, 175, 55, 0.08)',
              borderLeft: '4px solid var(--color-gold-500)',
              padding: '12px 18px',
              borderRadius: '0 8px 8px 0',
              fontStyle: 'italic',
              fontSize: '0.94rem',
              color: 'var(--color-gold-300)'
            }}>
              {lang === 'ua'
                ? 'Фенікс символізує людей, які проходять через складні випробування та обставини, але завдяки підтримці спільноти отримують шанс на новий початок і щасливе майбутнє.'
                : 'Der Phönix steht für Menschen in schweren Lebenskrisen, die durch solidarische Begleitung die Kraft für einen Neuanfang und eine hoffnungsvolle Zukunft gewinnen.'}
            </div>
          </div>
        </div>

        {/* 5 Symbolic Elements Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '20px'
        }}>
          {logoSymbols.map((item, index) => (
            <div
              key={index}
              className="card-glass"
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                padding: '26px',
                borderTop: `3px solid ${item.color}`
              }}
            >
              <div>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  marginBottom: '14px'
                }}>
                  <span style={{ fontSize: '1.9rem', lineHeight: 1 }}>{item.icon}</span>
                  <h4 style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: '1.18rem',
                    fontWeight: 700,
                    color: '#FFFFFF'
                  }}>
                    {lang === 'ua' ? item.titleUa : item.titleDe}
                  </h4>
                </div>

                <p style={{
                  fontSize: '0.92rem',
                  color: 'var(--color-text-muted)',
                  lineHeight: 1.65
                }}>
                  {lang === 'ua' ? item.descUa : item.descDe}
                </p>
              </div>

              <div style={{
                marginTop: '18px',
                paddingTop: '12px',
                borderTop: '1px solid rgba(255, 255, 255, 0.08)',
                fontSize: '0.78rem',
                color: 'var(--color-gold-400)',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}>
                <Sparkles size={12} />
                <span>{lang === 'ua' ? 'Символ герба фонду' : 'Stiftungswappen-Symbol'}</span>
              </div>
            </div>
          ))}
        </div>

      </div>

      <style jsx>{`
        @media (max-width: 860px) {
          .card-glass {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
};
