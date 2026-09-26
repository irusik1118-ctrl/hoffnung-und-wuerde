'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Language } from '@/types';
import { siteMeta } from '@/data/content';
import { Building2, UserCheck, Heart, Shield, PlusCircle, CheckCircle2, Sparkles, BookOpen } from 'lucide-react';

interface AboutSectionProps {
  lang: Language;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ lang }) => {
  const [customInfo, setCustomInfo] = useState<string>('');
  const [showAddModal, setShowAddModal] = useState<boolean>(false);
  const [addedItems, setAddedItems] = useState<string[]>([]);

  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customInfo.trim()) return;
    setAddedItems([...addedItems, customInfo.trim()]);
    setCustomInfo('');
    setShowAddModal(false);
  };

  return (
    <section id="about" style={{ padding: '70px 0', position: 'relative' }}>
      <div className="section-container">
        
        {/* Section Header */}
        <div className="section-header">
          <div className="gold-badge">
            <Building2 size={14} />
            <span>{lang === 'ua' ? 'Розділ 1' : 'Abschnitt 1'}</span>
          </div>

          <h2 className="section-title">
            {lang === 'ua' ? 'Наша компанія (Хто ми)' : 'Unsere Organisation (Wer wir sind)'}
          </h2>

          <div className="section-divider">
            <div className="line"></div>
            <div className="diamond"></div>
            <div className="line"></div>
          </div>

          <p className="section-subtitle">
            {lang === 'ua'
              ? 'Благодійний фонд «Hoffnung & Würde» діє у Відні, Австрія. Ми об’єднуємо зусилля для підтримки дітей, молоді та літніх людей.'
              : 'Die Stiftung «Hoffnung & Würde» mit Sitz in Wien vereint Herz und Tatkraft zur Unterstützung von Kindern, Jugendlichen und Senioren.'}
          </p>
        </div>

        {/* Founder & Mission Spotlight */}
        <div className="card-glass" style={{
          marginBottom: '32px',
          borderColor: 'rgba(212, 175, 55, 0.45)',
          padding: '36px',
          display: 'grid',
          gridTemplateColumns: 'minmax(240px, 300px) 1fr',
          gap: '32px',
          alignItems: 'center'
        }}>
          {/* Founder Badge / Photo Box */}
          <div style={{
            position: 'relative',
            borderRadius: '16px',
            overflow: 'hidden',
            border: '2px solid rgba(212, 175, 55, 0.7)',
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.6)',
            background: 'linear-gradient(180deg, #380710 0%, #160205 100%)',
            textAlign: 'center',
            padding: '24px 16px'
          }}>
            <div style={{
              width: '110px',
              height: '110px',
              borderRadius: '50%',
              margin: '0 auto 16px',
              background: 'linear-gradient(135deg, #6B1120 0%, #D4AF37 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 0 20px rgba(212, 175, 55, 0.4)'
            }}>
              <UserCheck size={50} color="#FFFFFF" />
            </div>

            <h3 style={{
              fontFamily: 'var(--font-serif)',
              fontSize: '1.35rem',
              color: 'var(--color-gold-300)',
              marginBottom: '4px'
            }}>
              {siteMeta.founder}
            </h3>

            <div style={{
              fontSize: '0.82rem',
              color: '#FFFFFF',
              letterSpacing: '0.04em',
              textTransform: 'uppercase',
              opacity: 0.85,
              marginBottom: '12px'
            }}>
              {lang === 'ua' ? siteMeta.founderTitleUa : siteMeta.founderTitleDe}
            </div>

            <div style={{
              display: 'inline-block',
              background: 'rgba(212, 175, 55, 0.15)',
              border: '1px solid rgba(212, 175, 55, 0.4)',
              borderRadius: '6px',
              padding: '4px 10px',
              fontSize: '0.74rem',
              color: 'var(--color-gold-400)'
            }}>
              Wien · ZVR 1984068166
            </div>
          </div>

          {/* Mission & Organization Presentation */}
          <div>
            <div style={{
              display: 'inline-block',
              background: 'rgba(212, 175, 55, 0.12)',
              border: '1px solid rgba(212, 175, 55, 0.3)',
              color: 'var(--color-gold-400)',
              fontSize: '0.8rem',
              fontWeight: 700,
              padding: '4px 12px',
              borderRadius: '20px',
              marginBottom: '12px'
            }}>
              {lang === 'ua' ? 'Місія організації' : 'Stiftungsauftrag'}
            </div>

            <h3 style={{
              fontFamily: 'var(--font-serif)',
              fontSize: '1.6rem',
              color: '#FFFFFF',
              marginBottom: '16px',
              lineHeight: 1.3
            }}>
              {lang === 'ua'
                ? '«Для людей. З серцем. Заради кращого майбутнього.»'
                : '«Für Menschen. Mit Herz. Für eine bessere Zukunft.»'}
            </h3>

            <p style={{
              fontSize: '0.98rem',
              color: 'var(--color-text-muted)',
              lineHeight: 1.7,
              marginBottom: '16px'
            }}>
              {lang === 'ua' ? (
                <>
                  Благодійний фонд <strong>«Hoffnung und Würde»</strong> заснований з метою надання комплексної допомоги 
                  людям, які опинилися у важких життєвих обставинах. Ми переконані: кожна людина має право на захист, 
                  повагу, гідне життя та впевненість у завтрашньому дні.
                </>
              ) : (
                <>
                  Die Wohltätigkeitsstiftung <strong>«Hoffnung und Würde»</strong> wurde ins Leben gerufen, um Menschen 
                  in Notlagen eine verlässliche Stütze zu bieten. Wir stehen für den Schutz der Menschenwürde, 
                  Chancengleichheit für Kinder und gelebte Fürsorge für die ältere Generation.
                </>
              )}
            </p>

            {/* Core Values Bullets */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
              gap: '12px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--color-gold-300)', fontSize: '0.88rem' }}>
                <CheckCircle2 size={16} color="var(--color-gold-500)" />
                <span>{lang === 'ua' ? 'Надія та новий початок' : 'Hoffnung & Neuanfang'}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--color-gold-300)', fontSize: '0.88rem' }}>
                <CheckCircle2 size={16} color="var(--color-gold-500)" />
                <span>{lang === 'ua' ? 'Захист людської гідності' : 'Schutz der Menschenwürde'}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--color-gold-300)', fontSize: '0.88rem' }}>
                <CheckCircle2 size={16} color="var(--color-gold-500)" />
                <span>{lang === 'ua' ? '100% чесність та звітність' : 'Transparente Berichte'}</span>
              </div>
            </div>
          </div>
        </div>

        {/* 2 Main Foundation Directions (from the Banner) */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '24px',
          marginBottom: '32px'
        }}>
          {/* Direction 1: Kinder und Jugendliche */}
          <div className="card-glass" style={{ borderLeft: '4px solid #ED2939' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
              <div>
                <span style={{ fontSize: '0.76rem', color: 'var(--color-gold-400)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                  Schönbrunn · Wien
                </span>
                <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem', color: '#FFFFFF', marginTop: '4px' }}>
                  {lang === 'ua' ? 'Діти та молодь' : 'Kinder und Jugendliche'}
                </h4>
              </div>
              <span style={{ fontSize: '1.8rem' }}>🧒🎨</span>
            </div>

            <p style={{ fontStyle: 'italic', color: 'var(--color-gold-300)', fontSize: '0.92rem', marginBottom: '14px' }}>
              «{lang === 'ua' ? 'Діти сьогодні — сильніше майбутнє завтра!' : 'Kinder heute – eine stärkere Zukunft morgen!'}»
            </p>

            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>
              <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ color: 'var(--color-gold-400)' }}>•</span>
                <strong>{lang === 'ua' ? 'Освіта та рівні можливості' : 'Bildung und Chancen'}</strong>
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ color: 'var(--color-gold-400)' }}>•</span>
                <strong>{lang === 'ua' ? 'Розвиток та щасливе дитинство' : 'Entwicklung und glückliche Kindheit'}</strong>
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ color: 'var(--color-gold-400)' }}>•</span>
                <span>{lang === 'ua' ? 'Творчі майстерні, шкільне приладдя, психологічна підтримка' : 'Kreativworkshops, Schulmaterialien, soziale Betreuung'}</span>
              </li>
            </ul>
          </div>

          {/* Direction 2: Senioren und Hilfsbedürftige */}
          <div className="card-glass" style={{ borderLeft: '4px solid #D4AF37' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
              <div>
                <span style={{ fontSize: '0.76rem', color: 'var(--color-gold-400)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                  Prater · Wien
                </span>
                <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem', color: '#FFFFFF', marginTop: '4px' }}>
                  {lang === 'ua' ? 'Люди похилого віку та потребуючі' : 'Senioren und Hilfsbedürftige'}
                </h4>
              </div>
              <span style={{ fontSize: '1.8rem' }}>👵🏡</span>
            </div>

            <p style={{ fontStyle: 'italic', color: 'var(--color-gold-300)', fontSize: '0.92rem', marginBottom: '14px' }}>
              «{lang === 'ua' ? 'Турбота сьогодні — гідне завтра!' : 'Fürsorge heute – ein würdiges Morgen!'}»
            </p>

            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>
              <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ color: 'var(--color-gold-400)' }}>•</span>
                <strong>{lang === 'ua' ? 'Підтримка та опіка' : 'Unterstützung und Betreuung'}</strong>
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ color: 'var(--color-gold-400)' }}>•</span>
                <strong>{lang === 'ua' ? 'Повага заради гідного життя' : 'Respekt für ein würdiges Leben'}</strong>
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ color: 'var(--color-gold-400)' }}>•</span>
                <span>{lang === 'ua' ? 'Адресна допомога самотнім пенсіонерам, візити турботи' : 'Direkthilfe für alleinstehende Senioren, Lebensmittellieferungen'}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Clean Ready-to-fill Placeholders (as requested by user) */}
        <div className="card-glass" style={{
          background: 'rgba(30, 4, 10, 0.6)',
          borderStyle: 'dashed',
          borderColor: 'rgba(212, 175, 55, 0.4)',
          textAlign: 'center',
          padding: '30px'
        }}>
          <div style={{ maxWidth: '640px', margin: '0 auto' }}>
            <h4 style={{ fontFamily: 'var(--font-serif)', color: 'var(--color-gold-300)', fontSize: '1.2rem', marginBottom: '8px' }}>
              {lang === 'ua' ? '📝 Місце для додаткової інформації про компанію' : '📝 Platzhalter für weitere Unternehmensinformationen'}
            </h4>
            <p style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)', marginBottom: '18px' }}>
              {lang === 'ua'
                ? 'Цей блок підготовлений спеціально для розміщення вашої детальної історії, складу правління або статуту фонду.'
                : 'Dieser Bereich steht für zusätzliche Texte, das Stiftungsteam oder Satzungsdetails bereit.'}
            </p>

            {addedItems.length > 0 && (
              <div style={{ textAlign: 'left', marginBottom: '18px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {addedItems.map((text, idx) => (
                  <div key={idx} style={{
                    background: 'rgba(56, 7, 16, 0.8)',
                    border: '1px solid rgba(212, 175, 55, 0.3)',
                    padding: '12px 16px',
                    borderRadius: '8px',
                    color: '#FFFFFF',
                    fontSize: '0.92rem'
                  }}>
                    {text}
                  </div>
                ))}
              </div>
            )}

            <button
              onClick={() => setShowAddModal(true)}
              className="btn-outline-gold"
              style={{ fontSize: '0.88rem', padding: '10px 20px' }}
            >
              <PlusCircle size={16} />
              <span>{lang === 'ua' ? '+ Додати інформацію про компанію' : '+ Text/Absatz hinzufügen'}</span>
            </button>
          </div>
        </div>

      </div>

      {/* Modal to add info */}
      {showAddModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          background: 'rgba(10, 1, 3, 0.85)',
          backdropFilter: 'blur(8px)',
          zIndex: 9999,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '20px'
        }}>
          <div className="card-glass" style={{ maxWidth: '520px', width: '100%', padding: '30px' }}>
            <h3 style={{ fontFamily: 'var(--font-serif)', color: 'var(--color-gold-300)', marginBottom: '14px' }}>
              {lang === 'ua' ? 'Додати опис або новину' : 'Information hinzufügen'}
            </h3>
            <form onSubmit={handleAddItem}>
              <textarea
                value={customInfo}
                onChange={(e) => setCustomInfo(e.target.value)}
                placeholder={lang === 'ua' ? 'Введіть додатковий текст або опис напрямку фонду...' : 'Geben Sie zusätzliche Informationen ein...'}
                rows={5}
                style={{
                  width: '100%',
                  background: 'rgba(20, 2, 5, 0.9)',
                  border: '1px solid rgba(212, 175, 55, 0.4)',
                  borderRadius: '8px',
                  color: '#FFFFFF',
                  padding: '12px',
                  fontFamily: 'inherit',
                  fontSize: '0.92rem',
                  marginBottom: '16px',
                  resize: 'vertical'
                }}
                required
              />
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  style={{
                    padding: '8px 16px',
                    borderRadius: '8px',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    color: '#AAA'
                  }}
                >
                  {lang === 'ua' ? 'Скасувати' : 'Abbrechen'}
                </button>
                <button type="submit" className="btn-gold" style={{ padding: '8px 18px' }}>
                  {lang === 'ua' ? 'Зберегти' : 'Hinzufügen'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <style jsx>{`
        @media (max-width: 768px) {
          .card-glass {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
};
