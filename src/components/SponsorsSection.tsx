'use client';

import React, { useState } from 'react';
import { Language } from '@/types';
import { initialProjects, initialSponsors } from '@/data/content';
import { Gem, HeartHandshake, Landmark, Check, Copy, Shield } from 'lucide-react';

interface SponsorsSectionProps {
  lang: Language;
}

export const SponsorsSection: React.FC<SponsorsSectionProps> = ({ lang }) => {
  const [selectedAmount, setSelectedAmount] = useState<number>(50);
  const [customAmount, setCustomAmount] = useState<string>('');
  const [selectedProjectId, setSelectedProjectId] = useState(initialProjects[0]?.id ?? '');
  const [donationFrequency, setDonationFrequency] = useState<'once' | 'monthly'>('once');
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [checkoutError, setCheckoutError] = useState('');

  const amounts = [20, 50, 100, 250];
  const selectedProject = initialProjects.find((project) => project.id === selectedProjectId);

  const startCheckout = async () => {
    const amount = customAmount || String(selectedAmount);
    setIsSubmitting(true);
    setCheckoutError('');

    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount, projectId: selectedProjectId, frequency: donationFrequency, lang }),
      });
      const result = await response.json();

      if (!response.ok || typeof result.url !== 'string') {
        throw new Error(typeof result.error === 'string' ? result.error : 'Could not start secure Checkout.');
      }

      window.location.assign(result.url);
    } catch (error) {
      setCheckoutError(error instanceof Error ? error.message : 'Could not start secure Checkout.');
      setIsSubmitting(false);
    }
  };

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  return (
    <section id="sponsors" style={{ padding: '70px 0', position: 'relative' }}>
      <div className="section-container">
        
        {/* Section Header */}
        <div className="section-header">
          <div className="gold-badge">
            <Gem size={14} />
            <span>{lang === 'ua' ? 'Розділ 5' : 'Abschnitt 5'}</span>
          </div>

          <h2 className="section-title">
            {lang === 'ua' ? 'Наші спонсори та підтримка' : 'Unsere Förderer & Spenden'}
          </h2>

          <div className="section-divider">
            <div className="line"></div>
            <div className="diamond"></div>
            <div className="line"></div>
          </div>

          <p className="section-subtitle">
            {lang === 'ua'
              ? 'Щира вдячність меценатам, компаніям та небайдужим людям, завдяки яким ми повертаємо надію та гідність тим, хто цього найбільше потребує.'
              : 'Unser tiefster Dank gilt den Förderern, Unternehmen und privaten Spendern, die gemeinsam mit uns Menschen neue Zuversicht schenken.'}
          </p>
        </div>

        {/* Sponsor Tiers Showcase */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '24px',
          marginBottom: '40px'
        }}>
          {initialSponsors.map((tier) => (
            <div
              key={tier.id}
              className="card-glass"
              style={{
                borderTop: `4px solid ${tier.badgeColor}`,
                padding: '28px'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '18px' }}>
                <Gem size={20} color={tier.badgeColor} />
                <h3 style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: '1.25rem',
                  color: '#FFFFFF'
                }}>
                  {lang === 'ua' ? tier.nameUa : tier.nameDe}
                </h3>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                {tier.sponsors.map((sp, idx) => (
                  <div
                    key={idx}
                    style={{
                      background: 'rgba(20, 2, 5, 0.7)',
                      border: '1px solid rgba(212, 175, 55, 0.2)',
                      padding: '14px 18px',
                      borderRadius: '10px'
                    }}
                  >
                    <div style={{ fontWeight: 700, color: 'var(--color-gold-300)', fontSize: '0.98rem', marginBottom: '4px' }}>
                      {sp.name}
                    </div>
                    <div style={{ fontSize: '0.84rem', color: 'var(--color-text-muted)' }}>
                      {lang === 'ua' ? sp.noteUa : sp.noteDe}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Interactive Donation Box & Austrian Bank Transfer Details */}
        <div className="card-glass" style={{
          background: 'linear-gradient(135deg, rgba(56, 7, 16, 0.9) 0%, rgba(26, 4, 8, 0.95) 100%)',
          borderColor: 'rgba(212, 175, 55, 0.5)',
          padding: '36px',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '36px',
          alignItems: 'start'
        }}>
          {/* Left: Donation Amount Selector */}
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: 'var(--color-gold-400)', fontSize: '0.85rem', fontWeight: 700, marginBottom: '8px' }}>
              <HeartHandshake size={16} />
              <span>{lang === 'ua' ? 'Зробити внесок у майбутнє' : 'Ihre Unterstützung wirkt'}</span>
            </div>

            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', color: '#FFFFFF', marginBottom: '14px' }}>
              {lang === 'ua' ? 'Благодійний внесок' : 'Online-Spendenmodul'}
            </h3>

            {/* Frequency Toggle */}
            <div style={{
              display: 'flex',
              background: 'rgba(20, 2, 5, 0.8)',
              padding: '4px',
              borderRadius: '10px',
              border: '1px solid rgba(212, 175, 55, 0.3)',
              marginBottom: '20px'
            }}>
              <button
                type="button"
                onClick={() => setDonationFrequency('once')}
                style={{
                  flex: 1,
                  padding: '8px',
                  borderRadius: '8px',
                  fontSize: '0.86rem',
                  fontWeight: 600,
                  background: donationFrequency === 'once' ? 'var(--gold-gradient)' : 'transparent',
                  color: donationFrequency === 'once' ? '#1a0508' : '#FFF',
                  transition: 'all 0.2s'
                }}
              >
                {lang === 'ua' ? 'Разово' : 'Einmalig'}
              </button>
              <button
                type="button"
                onClick={() => setDonationFrequency('monthly')}
                style={{
                  flex: 1,
                  padding: '8px',
                  borderRadius: '8px',
                  fontSize: '0.86rem',
                  fontWeight: 600,
                  background: donationFrequency === 'monthly' ? 'var(--gold-gradient)' : 'transparent',
                  color: donationFrequency === 'monthly' ? '#1a0508' : '#FFF',
                  transition: 'all 0.2s'
                }}
              >
                {lang === 'ua' ? 'Щомісячно' : 'Monatlich'}
              </button>
            </div>

            <div style={{ marginBottom: '18px' }}>
              <label htmlFor="donation-project" style={{ display: 'block', color: 'var(--color-gold-400)', fontSize: '0.84rem', fontWeight: 600, marginBottom: 7 }}>
                {lang === 'ua' ? 'Напрямок пожертви' : 'Spendenzweck'}
              </label>
              <select
                id="donation-project"
                value={selectedProjectId}
                onChange={(event) => setSelectedProjectId(event.target.value)}
                style={{ width: '100%', padding: '11px 12px', borderRadius: 8, background: 'rgba(20, 2, 5, 0.9)', border: '1px solid rgba(212, 175, 55, 0.4)', color: '#FFFFFF', fontSize: '0.92rem' }}
              >
                {initialProjects.map((project) => (
                  <option key={project.id} value={project.id} style={{ background: '#240409' }}>
                    {lang === 'ua' ? project.titleUa : project.titleDe}
                  </option>
                ))}
              </select>
              {selectedProject && (
                <p style={{ color: 'var(--color-text-muted)', fontSize: '0.8rem', lineHeight: 1.5, marginTop: 7 }}>
                  {lang === 'ua' ? selectedProject.descriptionUa : selectedProject.descriptionDe}
                </p>
              )}
            </div>

            {/* Amount Pills */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px', marginBottom: '16px' }}>
              {amounts.map((amt) => (
                <button
                  key={amt}
                  type="button"
                  onClick={() => {
                    setSelectedAmount(amt);
                    setCustomAmount('');
                  }}
                  style={{
                    padding: '12px 8px',
                    borderRadius: '10px',
                    fontFamily: 'var(--font-serif)',
                    fontSize: '1.15rem',
                    fontWeight: 700,
                    border: selectedAmount === amt && !customAmount
                      ? '2px solid var(--color-gold-400)'
                      : '1px solid rgba(212, 175, 55, 0.3)',
                    background: selectedAmount === amt && !customAmount
                      ? 'rgba(212, 175, 55, 0.25)'
                      : 'rgba(20, 2, 5, 0.7)',
                    color: selectedAmount === amt && !customAmount ? 'var(--color-gold-300)' : '#FFF',
                    transition: 'all 0.2s'
                  }}
                >
                  €{amt}
                </button>
              ))}
            </div>

            {/* Custom amount */}
            <div style={{ marginBottom: '20px' }}>
              <input
                type="number"
                min="1"
                max="10000"
                step="0.01"
                inputMode="decimal"
                aria-label={lang === 'ua' ? 'Сума пожертви в євро' : 'Spendenbetrag in Euro'}
                value={customAmount}
                onChange={(e) => {
                  setCustomAmount(e.target.value);
                  setSelectedAmount(Number(e.target.value) || 0);
                }}
                placeholder={lang === 'ua' ? 'Інша сума (€)' : 'Anderer Betrag (€)'}
                style={{
                  width: '100%',
                  padding: '10px 14px',
                  borderRadius: '8px',
                  background: 'rgba(20, 2, 5, 0.9)',
                  border: '1px solid rgba(212, 175, 55, 0.4)',
                  color: '#FFFFFF',
                  fontSize: '0.95rem'
                }}
              />
            </div>

            {/* Impact Text */}
            <div style={{
              background: 'rgba(212, 175, 55, 0.1)',
              borderLeft: '3px solid var(--color-gold-500)',
              padding: '12px 16px',
              borderRadius: '0 8px 8px 0',
              fontSize: '0.86rem',
              color: 'var(--color-gold-300)',
              marginBottom: '20px'
            }}>
              {lang === 'ua'
                ? `Ваш внесок €${selectedAmount || 50} сприятиме реалізації вибраного проєкту.`
                : `Ihre Spende von €${selectedAmount || 50} unterstützt das ausgewählte Projekt.`}
            </div>

            {checkoutError && (
              <p role="alert" style={{ color: '#ffb7b7', fontSize: '0.86rem', marginBottom: 12 }}>
                {checkoutError}
              </p>
            )}

            <button
              type="button"
              onClick={startCheckout}
              disabled={isSubmitting || !selectedProjectId || !selectedAmount}
              aria-busy={isSubmitting}
              className="btn-gold"
              style={{ width: '100%', padding: '12px', opacity: isSubmitting ? 0.7 : 1 }}
            >
              <span>
                {isSubmitting
                  ? (lang === 'ua' ? 'Переходимо до захищеної оплати…' : 'Weiter zur sicheren Zahlung…')
                  : (lang === 'ua' ? `Пожертвувати €${selectedAmount || 50}` : `€${selectedAmount || 50} spenden`)}
              </span>
            </button>
          </div>

          {/* Right: Austrian Official Bank Account Details */}
          <div style={{
            background: 'rgba(20, 2, 5, 0.85)',
            border: '1px solid rgba(212, 175, 55, 0.4)',
            borderRadius: '14px',
            padding: '24px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
              <Landmark size={20} color="var(--color-gold-400)" />
              <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.2rem', color: '#FFFFFF' }}>
                {lang === 'ua' ? 'Офіційні реквізити в Австрії' : 'Offizielle Bankverbindung (Österreich)'}
              </h4>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', fontSize: '0.88rem' }}>
              <div>
                <span style={{ color: 'var(--color-gold-400)', fontSize: '0.76rem', textTransform: 'uppercase' }}>
                  {lang === 'ua' ? 'Отримувач платежу' : 'Empfänger'}
                </span>
                <div style={{ color: '#FFFFFF', fontWeight: 600 }}>Wohltätigkeitsstiftung «Hoffnung und Würde»</div>
              </div>

              <div>
                <span style={{ color: 'var(--color-gold-400)', fontSize: '0.76rem', textTransform: 'uppercase' }}>
                  {lang === 'ua' ? 'Банк' : 'Kreditinstitut'}
                </span>
                <div style={{ color: '#FFFFFF' }}>Erste Group Bank AG / Raiffeisen Wien</div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <span style={{ color: 'var(--color-gold-400)', fontSize: '0.76rem', textTransform: 'uppercase' }}>IBAN</span>
                  <div style={{ color: '#FFFFFF', fontFamily: 'monospace', fontSize: '0.95rem', fontWeight: 700 }}>
                    AT84 2011 1000 0198 4068
                  </div>
                </div>
                <button
                  onClick={() => copyToClipboard('AT842011100001984068', 'iban')}
                  style={{
                    padding: '6px 10px',
                    borderRadius: '6px',
                    border: '1px solid rgba(212, 175, 55, 0.4)',
                    color: 'var(--color-gold-300)',
                    fontSize: '0.75rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px'
                  }}
                >
                  {copiedField === 'iban' ? <Check size={14} color="#4CAF50" /> : <Copy size={14} />}
                  <span>{copiedField === 'iban' ? (lang === 'ua' ? 'Скопійовано' : 'Kopiert') : 'Copy'}</span>
                </button>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <span style={{ color: 'var(--color-gold-400)', fontSize: '0.76rem', textTransform: 'uppercase' }}>BIC / SWIFT</span>
                  <div style={{ color: '#FFFFFF', fontFamily: 'monospace', fontWeight: 700 }}>GIBAATWWXXX</div>
                </div>
                <button
                  onClick={() => copyToClipboard('GIBAATWWXXX', 'bic')}
                  style={{
                    padding: '6px 10px',
                    borderRadius: '6px',
                    border: '1px solid rgba(212, 175, 55, 0.4)',
                    color: 'var(--color-gold-300)',
                    fontSize: '0.75rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px'
                  }}
                >
                  {copiedField === 'bic' ? <Check size={14} color="#4CAF50" /> : <Copy size={14} />}
                  <span>{copiedField === 'bic' ? (lang === 'ua' ? 'Скопійовано' : 'Kopiert') : 'Copy'}</span>
                </button>
              </div>

              <div>
                <span style={{ color: 'var(--color-gold-400)', fontSize: '0.76rem', textTransform: 'uppercase' }}>
                  {lang === 'ua' ? 'Призначення платежу' : 'Verwendungszweck'}
                </span>
                <div style={{ color: '#FFFFFF', fontStyle: 'italic' }}>
                  {lang === 'ua' ? 'Благодійна пожертва (ZVR 1984068166)' : 'Spende Hoffnung und Würde (ZVR 1984068166)'}
                </div>
              </div>

              <div style={{
                marginTop: '10px',
                paddingTop: '12px',
                borderTop: '1px solid rgba(255, 255, 255, 0.1)',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                fontSize: '0.76rem',
                color: 'var(--color-text-muted)'
              }}>
                <Shield size={14} color="var(--color-gold-400)" />
                <span>
                  {lang === 'ua'
                    ? 'Австрійський реєстраційний номер: ZVR 1984068166. Пожертви підлягають податковому обліку.'
                    : 'Registriert im Zentralen Vereinsregister Österreich: ZVR 1984068166. Spenden steuerlich absetzbar.'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Empty placeholder card for Sponsors */}
        <div className="card-glass" style={{
          marginTop: '30px',
          background: 'rgba(30, 4, 10, 0.5)',
          borderStyle: 'dashed',
          borderColor: 'rgba(212, 175, 55, 0.35)',
          textAlign: 'center',
          padding: '24px'
        }}>
          <h4 style={{ fontFamily: 'var(--font-serif)', color: 'var(--color-gold-300)', fontSize: '1.1rem', marginBottom: '6px' }}>
            {lang === 'ua' ? '💎 Блок вдячності новим меценатам' : '💎 Platzhalter für neue Mäzene'}
          </h4>
          <p style={{ fontSize: '0.86rem', color: 'var(--color-text-muted)' }}>
            {lang === 'ua'
              ? 'Тут будуть розміщені подяки новим компаніям та благодійникам, які підтримують фонд.'
              : 'Hier werden künftige Unternehmensförderer und Mäzene mit Dankbarkeit genannt.'}
          </p>
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
