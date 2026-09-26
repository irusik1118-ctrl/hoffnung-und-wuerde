'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Language } from '@/types';
import { siteMeta } from '@/data/content';
import {
  SendHorizontal,
  MapPin,
  Phone,
  Mail,
  Clock,
  CheckCircle2,
  Share2,
  MessageSquare,
  Sparkles
} from 'lucide-react';

interface ContactBannerProps {
  lang: Language;
}

export const ContactBanner: React.FC<ContactBannerProps> = ({ lang }) => {
  const [formName, setFormName] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formSubject, setFormSubject] = useState('general');
  const [formMessage, setFormMessage] = useState('');
  const [sentSuccess, setSentSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSentSuccess(true);
    setTimeout(() => {
      setSentSuccess(false);
      setFormName('');
      setFormEmail('');
      setFormMessage('');
    }, 3000);
  };

  const socialLinks = [
    { name: 'Telegram', url: 'https://t.me/hoffnung_wuerde_wien', icon: '✈️', handle: '@hoffnung_wuerde_wien' },
    { name: 'Instagram', url: 'https://instagram.com', icon: '📸', handle: '@hoffnung_wuerde.at' },
    { name: 'Facebook', url: 'https://facebook.com', icon: '👥', handle: 'Hoffnung & Würde Stiftung' },
    { name: 'LinkedIn', url: 'https://linkedin.com', icon: '💼', handle: 'Hoffnung & Würde Wien' },
    { name: 'YouTube', url: 'https://youtube.com', icon: '▶️', handle: 'Hoffnung & Würde Official' },
  ];

  return (
    <section id="contact" style={{ padding: '70px 0 50px', position: 'relative' }}>
      <div className="section-container">
        
        {/* Section Header */}
        <div className="section-header">
          <div className="gold-badge">
            <SendHorizontal size={14} />
            <span>{lang === 'ua' ? 'Розділ 6' : 'Abschnitt 6'}</span>
          </div>

          <h2 className="section-title">
            {lang === 'ua' ? 'Контакти компанії та соцмережі' : 'Kontakt & Soziale Netzwerke'}
          </h2>

          <div className="section-divider">
            <div className="line"></div>
            <div className="diamond"></div>
            <div className="line"></div>
          </div>

          <p className="section-subtitle">
            {lang === 'ua'
              ? 'Ми завжди відкриті до діалогу, нових ініціатив та допомоги. Зв\'яжіться з нашою командою у Відні або підпишіться на наші соціальні канали.'
              : 'Wir freuen uns auf Ihren Austausch und neue Impulse. Erreichen Sie unser Team in Wien oder folgen Sie uns in den sozialen Medien.'}
          </p>
        </div>

        {/* Grand Burgundy & Gold Contact Banner */}
        <div className="card-glass" style={{
          background: 'linear-gradient(135deg, rgba(74, 14, 23, 0.95) 0%, rgba(32, 4, 8, 0.98) 100%)',
          borderColor: 'rgba(212, 175, 55, 0.6)',
          borderRadius: '24px',
          padding: '42px',
          boxShadow: '0 25px 60px rgba(0, 0, 0, 0.7), 0 0 30px rgba(212, 175, 55, 0.2)',
          position: 'relative',
          overflow: 'hidden',
          marginBottom: '36px'
        }}>
          {/* Subtle Decorative Phoenix Watermark in background */}
          <div style={{
            position: 'absolute',
            top: '-20px',
            right: '-30px',
            width: '320px',
            height: '320px',
            opacity: 0.08,
            pointerEvents: 'none'
          }}>
            <Image src="/images/logo.jpg" alt="Watermark" fill style={{ objectFit: 'contain' }} />
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(300px, 1.1fr) 1fr',
            gap: '40px',
            position: 'relative',
            zIndex: 1
          }}>
            {/* Left Column: Organization Details & Vienna Headquarters */}
            <div>
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                background: 'rgba(212, 175, 55, 0.15)',
                border: '1px solid rgba(212, 175, 55, 0.4)',
                color: 'var(--color-gold-300)',
                padding: '6px 14px',
                borderRadius: '20px',
                fontSize: '0.8rem',
                fontWeight: 700,
                marginBottom: '16px'
              }}>
                <Sparkles size={14} />
                <span>{lang === 'ua' ? 'Штаб-квартира у Відні' : 'Stiftungssitz Wien'}</span>
              </div>

              <h3 style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '1.75rem',
                color: '#FFFFFF',
                marginBottom: '10px',
                lineHeight: 1.25
              }}>
                {lang === 'ua' ? siteMeta.nameUa : siteMeta.nameDe}
              </h3>

              <p style={{
                fontSize: '0.94rem',
                color: 'var(--color-text-muted)',
                marginBottom: '24px',
                lineHeight: 1.6
              }}>
                {lang === 'ua'
                  ? 'Офіційно зареєстрований благодійний фонд в Австрії під керівництвом засновника Michael Kosik.'
                  : 'Offiziell eingetragene gemeinnützige Stiftung in Österreich unter der Leitung von Gründer Michael Kosik.'}
              </p>

              {/* Contact Information List */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '28px' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px' }}>
                  <div style={{
                    width: '38px',
                    height: '38px',
                    borderRadius: '10px',
                    background: 'rgba(82, 11, 23, 0.8)',
                    border: '1px solid rgba(212, 175, 55, 0.4)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--color-gold-300)',
                    flexShrink: 0
                  }}>
                    <MapPin size={18} />
                  </div>
                  <div>
                    <div style={{ fontSize: '0.78rem', color: 'var(--color-gold-400)', textTransform: 'uppercase' }}>
                      {lang === 'ua' ? 'Адреса в Австрії' : 'Adresse'}
                    </div>
                    <div style={{ color: '#FFFFFF', fontWeight: 600 }}>
                      Stephansplatz / Herrengasse 14, 1010 Wien, Österreich
                    </div>
                    <div style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)' }}>
                      Zentrales Vereinsregister: <strong>ZVR 1984068166</strong>
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px' }}>
                  <div style={{
                    width: '38px',
                    height: '38px',
                    borderRadius: '10px',
                    background: 'rgba(82, 11, 23, 0.8)',
                    border: '1px solid rgba(212, 175, 55, 0.4)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--color-gold-300)',
                    flexShrink: 0
                  }}>
                    <Phone size={18} />
                  </div>
                  <div>
                    <div style={{ fontSize: '0.78rem', color: 'var(--color-gold-400)', textTransform: 'uppercase' }}>
                      {lang === 'ua' ? 'Телефон гарячої лінії' : 'Telefon & Hotline'}
                    </div>
                    <div style={{ color: '#FFFFFF', fontWeight: 600 }}>
                      +43 (0) 1 890 44 20 / +43 (0) 676 123 45 67
                    </div>
                    <div style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)' }}>
                      Mo - Fr: 09:00 - 18:00 Uhr
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px' }}>
                  <div style={{
                    width: '38px',
                    height: '38px',
                    borderRadius: '10px',
                    background: 'rgba(82, 11, 23, 0.8)',
                    border: '1px solid rgba(212, 175, 55, 0.4)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--color-gold-300)',
                    flexShrink: 0
                  }}>
                    <Mail size={18} />
                  </div>
                  <div>
                    <div style={{ fontSize: '0.78rem', color: 'var(--color-gold-400)', textTransform: 'uppercase' }}>
                      E-Mail
                    </div>
                    <div style={{ color: '#FFFFFF', fontWeight: 600 }}>
                      kontakt@hoffnung-wuerde.at / info@hoffnung-wuerde.at
                    </div>
                    <div style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)' }}>
                      {lang === 'ua' ? 'Відповідаємо протягом 24 годин' : 'Antwort binnen 24 Stunden'}
                    </div>
                  </div>
                </div>
              </div>

              {/* Social Media Grid */}
              <div>
                <div style={{ fontSize: '0.86rem', color: 'var(--color-gold-300)', fontWeight: 700, marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Share2 size={16} />
                  <span>{lang === 'ua' ? 'Наші офіційні соціальні мережі' : 'Soziale Medien & Kanäle'}</span>
                </div>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                  {socialLinks.map((s, idx) => (
                    <a
                      key={idx}
                      href={s.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        padding: '8px 14px',
                        borderRadius: '20px',
                        background: 'rgba(20, 2, 5, 0.85)',
                        border: '1px solid rgba(212, 175, 55, 0.35)',
                        color: '#FFFFFF',
                        fontSize: '0.82rem',
                        transition: 'all 0.2s ease',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = 'var(--color-gold-400)';
                        e.currentTarget.style.background = 'rgba(212, 175, 55, 0.2)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = 'rgba(212, 175, 55, 0.35)';
                        e.currentTarget.style.background = 'rgba(20, 2, 5, 0.85)';
                      }}
                    >
                      <span>{s.icon}</span>
                      <span style={{ fontWeight: 600 }}>{s.name}</span>
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: Interactive Direct Feedback Form */}
            <div style={{
              background: 'rgba(20, 2, 5, 0.85)',
              border: '1px solid rgba(212, 175, 55, 0.35)',
              borderRadius: '16px',
              padding: '28px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between'
            }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                  <MessageSquare size={18} color="var(--color-gold-400)" />
                  <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem', color: '#FFFFFF' }}>
                    {lang === 'ua' ? 'Написати до фонду' : 'Nachricht an die Stiftung'}
                  </h4>
                </div>

                <p style={{ fontSize: '0.86rem', color: 'var(--color-text-muted)', marginBottom: '18px' }}>
                  {lang === 'ua'
                    ? 'Маєте питання, пропозицію про співпрацю або потребуєте допомоги? Напишіть нам прямо зараз.'
                    : 'Haben Sie Fragen oder Anregungen? Schreiben Sie unserem Vorstand direkt.'}
                </p>

                {sentSuccess ? (
                  <div style={{
                    padding: '30px 20px',
                    textAlign: 'center',
                    background: 'rgba(46, 125, 50, 0.15)',
                    border: '1px solid #4CAF50',
                    borderRadius: '12px'
                  }}>
                    <CheckCircle2 size={44} color="#4CAF50" style={{ margin: '0 auto 12px' }} />
                    <h5 style={{ fontFamily: 'var(--font-serif)', color: '#FFFFFF', fontSize: '1.2rem', marginBottom: '6px' }}>
                      {lang === 'ua' ? 'Повідомлення надіслано!' : 'Nachricht übermittelt!'}
                    </h5>
                    <p style={{ fontSize: '0.86rem', color: 'var(--color-gold-300)' }}>
                      {lang === 'ua'
                        ? 'Дякуємо за звернення. Представник фонду зв\'яжеться з вами найближчим часом.'
                        : 'Vielen Dank. Ein Mitglied unserer Stiftung meldet sich in Kürze bei Ihnen.'}
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                    <div>
                      <label style={{ fontSize: '0.78rem', color: 'var(--color-gold-400)', display: 'block', marginBottom: '4px' }}>
                        {lang === 'ua' ? 'Ваше ім’я' : 'Ihr Name'}
                      </label>
                      <input
                        type="text"
                        value={formName}
                        onChange={(e) => setFormName(e.target.value)}
                        placeholder={lang === 'ua' ? 'Ім’я та прізвище' : 'Vor- und Nachname'}
                        style={{
                          width: '100%',
                          padding: '10px 12px',
                          borderRadius: '8px',
                          background: 'rgba(30, 4, 10, 0.9)',
                          border: '1px solid rgba(212, 175, 55, 0.35)',
                          color: '#FFFFFF'
                        }}
                        required
                      />
                    </div>

                    <div>
                      <label style={{ fontSize: '0.78rem', color: 'var(--color-gold-400)', display: 'block', marginBottom: '4px' }}>
                        {lang === 'ua' ? 'Електронна пошта або телефон' : 'E-Mail oder Telefon'}
                      </label>
                      <input
                        type="text"
                        value={formEmail}
                        onChange={(e) => setFormEmail(e.target.value)}
                        placeholder="kontakt@example.com"
                        style={{
                          width: '100%',
                          padding: '10px 12px',
                          borderRadius: '8px',
                          background: 'rgba(30, 4, 10, 0.9)',
                          border: '1px solid rgba(212, 175, 55, 0.35)',
                          color: '#FFFFFF'
                        }}
                        required
                      />
                    </div>

                    <div>
                      <label style={{ fontSize: '0.78rem', color: 'var(--color-gold-400)', display: 'block', marginBottom: '4px' }}>
                        {lang === 'ua' ? 'Тема звернення' : 'Betreff'}
                      </label>
                      <select
                        value={formSubject}
                        onChange={(e) => setFormSubject(e.target.value)}
                        style={{
                          width: '100%',
                          padding: '10px 12px',
                          borderRadius: '8px',
                          background: 'rgba(30, 4, 10, 0.9)',
                          border: '1px solid rgba(212, 175, 55, 0.35)',
                          color: '#FFFFFF'
                        }}
                      >
                        <option value="general">
                          {lang === 'ua' ? 'Загальне питання / Інформація' : 'Allgemeine Anfrage'}
                        </option>
                        <option value="help">
                          {lang === 'ua' ? 'Потребую допомоги для дитини чи сім\'ї' : 'Hilfsgesuch (Kinder & Familien)'}
                        </option>
                        <option value="seniors">
                          {lang === 'ua' ? 'Турбота про літню людину' : 'Seniorenbetreuung'}
                        </option>
                        <option value="partner">
                          {lang === 'ua' ? 'Партнерство та співпраця' : 'Partnerschaft / Kooperation'}
                        </option>
                        <option value="sponsor">
                          {lang === 'ua' ? 'Меценатство та спонсорство' : 'Mäzenatentum & Spende'}
                        </option>
                      </select>
                    </div>

                    <div>
                      <label style={{ fontSize: '0.78rem', color: 'var(--color-gold-400)', display: 'block', marginBottom: '4px' }}>
                        {lang === 'ua' ? 'Ваше повідомлення' : 'Ihre Nachricht'}
                      </label>
                      <textarea
                        value={formMessage}
                        onChange={(e) => setFormMessage(e.target.value)}
                        rows={3}
                        placeholder={lang === 'ua' ? 'Напишіть ваше повідомлення...' : 'Ihre Mitteilung...'}
                        style={{
                          width: '100%',
                          padding: '10px 12px',
                          borderRadius: '8px',
                          background: 'rgba(30, 4, 10, 0.9)',
                          border: '1px solid rgba(212, 175, 55, 0.35)',
                          color: '#FFFFFF',
                          resize: 'vertical'
                        }}
                        required
                      />
                    </div>

                    <button
                      type="submit"
                      className="btn-gold"
                      style={{ marginTop: '8px', padding: '12px' }}
                    >
                      <SendHorizontal size={16} />
                      <span>{lang === 'ua' ? 'Надіслати повідомлення' : 'Nachricht absenden'}</span>
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Empty Placeholder Card for Contact customization */}
        <div className="card-glass" style={{
          background: 'rgba(30, 4, 10, 0.5)',
          borderStyle: 'dashed',
          borderColor: 'rgba(212, 175, 55, 0.35)',
          textAlign: 'center',
          padding: '24px'
        }}>
          <h4 style={{ fontFamily: 'var(--font-serif)', color: 'var(--color-gold-300)', fontSize: '1.1rem', marginBottom: '6px' }}>
            {lang === 'ua' ? '📞 Готовий блок для додавання додаткових філій чи контактів' : '📞 Platzhalter für weitere Kontaktadressen'}
          </h4>
          <p style={{ fontSize: '0.86rem', color: 'var(--color-text-muted)' }}>
            {lang === 'ua'
              ? 'За потреби сюди можна додати прямі номери месенджерів або контактних осіб у регіонах Австрії.'
              : 'Hier können bei Bedarf weitere regionale Ansprechpartner oder Messenger-Links eingefügt werden.'}
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
