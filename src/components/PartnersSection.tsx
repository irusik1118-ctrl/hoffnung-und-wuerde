'use client';

import React, { useState } from 'react';
import { Language, PartnerItem } from '@/types';
import { initialPartners, siteMeta } from '@/data/content';
import { Users2, Handshake, ShieldCheck, PlusCircle, Check, X } from 'lucide-react';

interface PartnersSectionProps {
  lang: Language;
}

export const PartnersSection: React.FC<PartnersSectionProps> = ({ lang }) => {
  const [partners, setPartners] = useState<PartnerItem[]>(initialPartners);
  const [showModal, setShowModal] = useState(false);
  const [partnerName, setPartnerName] = useState('');
  const [partnerRole, setPartnerRole] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handlePartnerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!partnerName.trim()) return;

    const newPartner: PartnerItem = {
      id: `part-${Date.now()}`,
      name: partnerName,
      roleDe: partnerRole || 'Kooperationspartner in Wien',
      roleUa: partnerRole || 'Партнер співпраці у Відні',
      typeDe: 'Offizieller Partner',
      typeUa: 'Офіційний партнер',
      logoPlaceholder: '🤝 ' + partnerName.slice(0, 3).toUpperCase(),
    };

    setPartners([...partners, newPartner]);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setShowModal(false);
      setPartnerName('');
      setPartnerRole('');
    }, 1800);
  };

  return (
    <section id="partners" style={{ padding: '70px 0', position: 'relative' }}>
      <div className="section-container">
        
        {/* Section Header */}
        <div className="section-header">
          <div className="gold-badge">
            <Users2 size={14} />
            <span>{lang === 'ua' ? 'Розділ 4' : 'Abschnitt 4'}</span>
          </div>

          <h2 className="section-title">
            {lang === 'ua' ? 'Наші партнери' : 'Unsere Partner & Kooperationen'}
          </h2>

          <div className="section-divider">
            <div className="line"></div>
            <div className="diamond"></div>
            <div className="line"></div>
          </div>

          <p className="section-subtitle">
            {lang === 'ua'
              ? 'Разом ми сильніші. Ми співпрацюємо з австрійськими та міжнародними інституціями, соціальними службами та культурними центрами.'
              : 'Gemeinsam stark. Wir arbeiten eng mit Wiener und österreichischen Institutionen, Sozialdiensten und Bildungszentren zusammen.'}
          </p>
        </div>

        {/* Partners Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '20px',
          marginBottom: '32px'
        }}>
          {partners.map((partner) => (
            <div
              key={partner.id}
              className="card-glass"
              style={{
                padding: '24px',
                textAlign: 'center',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <div>
                {/* Logo Badge */}
                <div style={{
                  width: '74px',
                  height: '74px',
                  borderRadius: '16px',
                  background: 'rgba(82, 11, 23, 0.6)',
                  border: '2px solid rgba(212, 175, 55, 0.45)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.25rem',
                  fontWeight: 800,
                  color: 'var(--color-gold-300)',
                  margin: '0 auto 16px',
                  boxShadow: '0 6px 20px rgba(0, 0, 0, 0.4)'
                }}>
                  {partner.logoPlaceholder}
                </div>

                <div style={{
                  fontSize: '0.74rem',
                  color: 'var(--color-gold-400)',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.06em',
                  marginBottom: '6px'
                }}>
                  {lang === 'ua' ? partner.typeUa : partner.typeDe}
                </div>

                <h3 style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: '1.15rem',
                  color: '#FFFFFF',
                  marginBottom: '8px'
                }}>
                  {partner.name}
                </h3>

                <p style={{
                  fontSize: '0.86rem',
                  color: 'var(--color-text-muted)',
                  lineHeight: 1.5
                }}>
                  {lang === 'ua' ? partner.roleUa : partner.roleDe}
                </p>
              </div>

              <div style={{
                marginTop: '16px',
                paddingTop: '12px',
                borderTop: '1px solid rgba(255, 255, 255, 0.08)',
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px',
                fontSize: '0.76rem',
                color: 'var(--color-gold-400)'
              }}>
                <ShieldCheck size={13} />
                <span>{lang === 'ua' ? 'Офіційне партнерство' : 'Geprüfte Kooperation'}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Placeholder / Become Partner CTA */}
        <div className="card-glass" style={{
          background: 'rgba(30, 4, 10, 0.6)',
          borderStyle: 'dashed',
          borderColor: 'rgba(212, 175, 55, 0.4)',
          textAlign: 'center',
          padding: '30px'
        }}>
          <h4 style={{ fontFamily: 'var(--font-serif)', color: 'var(--color-gold-300)', fontSize: '1.2rem', marginBottom: '8px' }}>
            {lang === 'ua' ? '🤝 Запрошуємо нові організації до співпраці' : '🤝 Werden Sie Kooperationspartner'}
          </h4>
          <p style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)', maxWidth: '640px', margin: '0 auto 20px' }}>
            {lang === 'ua'
              ? 'Якщо ваша організація, бізнес чи фонд поділяє цінності надії та захисту людської гідності — приєднуйтесь до наших проектів.'
              : 'Wenn Ihre Organisation oder Ihr Unternehmen unsere Werte von Hoffnung und Menschenwürde teilt, freuen wir uns auf den gemeinsamen Dialog.'}
          </p>

          <button
            onClick={() => setShowModal(true)}
            className="btn-outline-gold"
            style={{ padding: '10px 22px' }}
          >
            <Handshake size={16} />
            <span>{lang === 'ua' ? '+ Подати заявку на партнерство' : '+ Partnerschaftsanfrage senden'}</span>
          </button>
        </div>

      </div>

      {/* Partner Modal */}
      {showModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          background: 'rgba(10, 1, 3, 0.88)',
          backdropFilter: 'blur(8px)',
          zIndex: 9999,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '20px'
        }}>
          <div className="card-glass" style={{ maxWidth: '480px', width: '100%', padding: '30px', position: 'relative' }}>
            <button
              onClick={() => setShowModal(false)}
              style={{ position: 'absolute', top: '16px', right: '16px', color: 'var(--color-gold-400)' }}
            >
              <X size={22} />
            </button>

            {submitted ? (
              <div style={{ textAlign: 'center', padding: '24px 0' }}>
                <Check size={40} color="#4CAF50" style={{ margin: '0 auto 12px' }} />
                <h3 style={{ fontFamily: 'var(--font-serif)', color: '#FFFFFF', marginBottom: '8px' }}>
                  {lang === 'ua' ? 'Заявку прийнято!' : 'Anfrage erhalten!'}
                </h3>
                <p style={{ fontSize: '0.9rem', color: 'var(--color-gold-300)' }}>
                  {lang === 'ua' ? 'Дякуємо! Ми зв\'яжемося з вами найближчим часом.' : 'Vielen Dank! Wir melden uns in Kürze bei Ihnen.'}
                </p>
              </div>
            ) : (
              <>
                <h3 style={{ fontFamily: 'var(--font-serif)', color: 'var(--color-gold-300)', marginBottom: '14px' }}>
                  {lang === 'ua' ? 'Стати партнером фонду' : 'Partner werden'}
                </h3>
                <form onSubmit={handlePartnerSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <input
                    type="text"
                    value={partnerName}
                    onChange={(e) => setPartnerName(e.target.value)}
                    placeholder={lang === 'ua' ? 'Назва організації / компанії' : 'Name der Organisation'}
                    style={{
                      width: '100%',
                      padding: '10px',
                      borderRadius: '8px',
                      background: 'rgba(20, 2, 5, 0.9)',
                      border: '1px solid rgba(212, 175, 55, 0.4)',
                      color: '#FFFFFF'
                    }}
                    required
                  />
                  <input
                    type="text"
                    value={partnerRole}
                    onChange={(e) => setPartnerRole(e.target.value)}
                    placeholder={lang === 'ua' ? 'Сфера співпраці (напр. освіта, логістика)' : 'Bereich der Zusammenarbeit'}
                    style={{
                      width: '100%',
                      padding: '10px',
                      borderRadius: '8px',
                      background: 'rgba(20, 2, 5, 0.9)',
                      border: '1px solid rgba(212, 175, 55, 0.4)',
                      color: '#FFFFFF'
                    }}
                  />
                  <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '10px' }}>
                    <button
                      type="button"
                      onClick={() => setShowModal(false)}
                      style={{ padding: '8px 16px', borderRadius: '8px', border: '1px solid rgba(255, 255, 255, 0.2)', color: '#AAA' }}
                    >
                      {lang === 'ua' ? 'Скасувати' : 'Abbrechen'}
                    </button>
                    <button type="submit" className="btn-gold" style={{ padding: '8px 18px' }}>
                      {lang === 'ua' ? 'Надіслати' : 'Senden'}
                    </button>
                  </div>
                </form>
              </>
            )}
          </div>
        </div>
      )}

    </section>
  );
};
