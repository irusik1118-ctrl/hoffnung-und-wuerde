'use client';

import React, { useState } from 'react';
import { Language, EventItem } from '@/types';
import { initialEvents } from '@/data/content';
import { CalendarCheck2, Clock, MapPin, Tag, PlusCircle, Check, X, CalendarPlus } from 'lucide-react';

interface EventsSectionProps {
  lang: Language;
}

export const EventsSection: React.FC<EventsSectionProps> = ({ lang }) => {
  const [events, setEvents] = useState<EventItem[]>(initialEvents);
  const [selectedEvent, setSelectedEvent] = useState<EventItem | null>(null);
  const [rsvpSuccess, setRsvpSuccess] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [showAddEventModal, setShowAddEventModal] = useState(false);

  // New Event
  const [newTitle, setNewTitle] = useState('');
  const [newDate, setNewDate] = useState('');
  const [newLocation, setNewLocation] = useState('Wien');
  const [newDesc, setNewDesc] = useState('');

  const handleRsvpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setRsvpSuccess(true);
    setTimeout(() => {
      setRsvpSuccess(false);
      setSelectedEvent(null);
      setName('');
      setEmail('');
    }, 2200);
  };

  const handleAddEvent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const newEv: EventItem = {
      id: `ev-${Date.now()}`,
      titleUa: newTitle,
      titleDe: newTitle,
      date: newDate || '2026',
      time: '18:00 Uhr',
      location: newLocation,
      categoryUa: 'Благодійний захід',
      categoryDe: 'Benefizveranstaltung',
      descriptionUa: newDesc,
      descriptionDe: newDesc,
      statusUa: 'Реєстрацію відкрито',
      statusDe: 'Anmeldung offen',
    };

    setEvents([...events, newEv]);
    setNewTitle('');
    setNewDate('');
    setNewDesc('');
    setShowAddEventModal(false);
  };

  return (
    <section id="events" style={{ padding: '70px 0', position: 'relative' }}>
      <div className="section-container">
        
        {/* Section Header */}
        <div className="section-header">
          <div className="gold-badge">
            <CalendarCheck2 size={14} />
            <span>{lang === 'ua' ? 'Розділ 3' : 'Abschnitt 3'}</span>
          </div>

          <h2 className="section-title">
            {lang === 'ua' ? 'Афіша наших проектів' : 'Affiche unserer Projekte & Termine'}
          </h2>

          <div className="section-divider">
            <div className="line"></div>
            <div className="diamond"></div>
            <div className="line"></div>
          </div>

          <p className="section-subtitle">
            {lang === 'ua'
              ? 'Майбутні благодійні зустрічі, творчі майстерні, гала-вечори та акції солідарності у Відні. Долучайтеся до нашої спільноти!'
              : 'Kommende Benefizkonzerte, Familienworkshops und Spendenaktionen in Wien. Seien Sie Teil unserer Gemeinschaft!'}
          </p>
        </div>

        {/* Action Bar */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '24px' }}>
          <button
            onClick={() => setShowAddEventModal(true)}
            className="btn-outline-gold"
            style={{ padding: '8px 16px', fontSize: '0.86rem' }}
          >
            <CalendarPlus size={15} />
            <span>{lang === 'ua' ? '+ Додати захід до афіші' : '+ Veranstaltung ankündigen'}</span>
          </button>
        </div>

        {/* Events Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '24px'
        }}>
          {events.map((ev) => (
            <div
              key={ev.id}
              className="card-glass"
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                padding: '28px',
                position: 'relative'
              }}
            >
              <div>
                {/* Date & Status Row */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                  <div style={{
                    background: 'rgba(212, 175, 55, 0.15)',
                    border: '1px solid rgba(212, 175, 55, 0.4)',
                    color: 'var(--color-gold-300)',
                    padding: '4px 12px',
                    borderRadius: '20px',
                    fontSize: '0.78rem',
                    fontWeight: 700
                  }}>
                    {ev.date}
                  </div>

                  <span style={{
                    background: 'rgba(237, 41, 57, 0.15)',
                    border: '1px solid rgba(237, 41, 57, 0.35)',
                    color: '#FFA2A2',
                    padding: '4px 10px',
                    borderRadius: '8px',
                    fontSize: '0.74rem',
                    fontWeight: 600
                  }}>
                    {lang === 'ua' ? ev.statusUa : ev.statusDe}
                  </span>
                </div>

                <h3 style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: '1.25rem',
                  color: '#FFFFFF',
                  marginBottom: '12px',
                  lineHeight: 1.3
                }}>
                  {lang === 'ua' ? ev.titleUa : ev.titleDe}
                </h3>

                {/* Location & Time */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: '16px', fontSize: '0.85rem', color: 'var(--color-gold-400)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <MapPin size={14} />
                    <span>{ev.location}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Clock size={14} />
                    <span>{ev.time}</span>
                  </div>
                </div>

                <p style={{
                  fontSize: '0.9rem',
                  color: 'var(--color-text-muted)',
                  lineHeight: 1.6,
                  marginBottom: '20px'
                }}>
                  {lang === 'ua' ? ev.descriptionUa : ev.descriptionDe}
                </p>
              </div>

              {/* Action Button */}
              <button
                onClick={() => setSelectedEvent(ev)}
                className="btn-gold"
                style={{ width: '100%', padding: '10px', fontSize: '0.88rem' }}
              >
                <span>{lang === 'ua' ? 'Взяти участь / Зареєструватися' : 'Teilnehmen / Anmelden'}</span>
              </button>
            </div>
          ))}
        </div>

        {/* Empty Placeholder Card */}
        <div className="card-glass" style={{
          marginTop: '30px',
          background: 'rgba(30, 4, 10, 0.5)',
          borderStyle: 'dashed',
          borderColor: 'rgba(212, 175, 55, 0.35)',
          textAlign: 'center',
          padding: '24px'
        }}>
          <h4 style={{ fontFamily: 'var(--font-serif)', color: 'var(--color-gold-300)', fontSize: '1.1rem', marginBottom: '6px' }}>
            {lang === 'ua' ? '📌 Готовий календарний блок для майбутніх анонсів' : '📌 Vorbereiteter Kalenderblock für weitere Termine'}
          </h4>
          <p style={{ fontSize: '0.86rem', color: 'var(--color-text-muted)' }}>
            {lang === 'ua'
              ? 'Тут будуть автоматично відображатися нові заплановані благодійні та культурні події фонду.'
              : 'Hier werden künftige Benefiz- und Kulturtermine der Stiftung laufend ergänzt.'}
          </p>
        </div>

      </div>

      {/* RSVP Modal */}
      {selectedEvent && (
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
              onClick={() => setSelectedEvent(null)}
              style={{ position: 'absolute', top: '16px', right: '16px', color: 'var(--color-gold-400)' }}
            >
              <X size={22} />
            </button>

            {rsvpSuccess ? (
              <div style={{ textAlign: 'center', padding: '24px 0' }}>
                <div style={{
                  width: '60px',
                  height: '60px',
                  borderRadius: '50%',
                  background: 'rgba(46, 125, 50, 0.2)',
                  border: '2px solid #4CAF50',
                  color: '#4CAF50',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 16px'
                }}>
                  <Check size={32} />
                </div>
                <h3 style={{ fontFamily: 'var(--font-serif)', color: '#FFFFFF', marginBottom: '8px' }}>
                  {lang === 'ua' ? 'Дякуємо за реєстрацію!' : 'Vielen Dank für Ihre Anmeldung!'}
                </h3>
                <p style={{ fontSize: '0.9rem', color: 'var(--color-gold-300)' }}>
                  {lang === 'ua'
                    ? 'Ми надіслали підтвердження та подробиці участі на вашу електронну адресу.'
                    : 'Wir haben Ihnen eine Bestätigung mit allen Details per E-Mail gesendet.'}
                </p>
              </div>
            ) : (
              <>
                <h3 style={{ fontFamily: 'var(--font-serif)', color: 'var(--color-gold-300)', marginBottom: '8px' }}>
                  {lang === 'ua' ? 'Реєстрація на захід' : 'Anmeldung zur Veranstaltung'}
                </h3>
                <p style={{ fontSize: '0.88rem', color: 'var(--color-text-muted)', marginBottom: '18px' }}>
                  {lang === 'ua' ? selectedEvent.titleUa : selectedEvent.titleDe} ({selectedEvent.date})
                </p>

                <form onSubmit={handleRsvpSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <div>
                    <label style={{ fontSize: '0.78rem', color: 'var(--color-gold-400)', display: 'block', marginBottom: '4px' }}>
                      {lang === 'ua' ? 'Ваше ім’я та прізвище' : 'Vollständiger Name'}
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder={lang === 'ua' ? 'Олександр або Марія' : 'Vorname Nachname'}
                      style={{
                        width: '100%',
                        padding: '10px 12px',
                        borderRadius: '8px',
                        background: 'rgba(20, 2, 5, 0.9)',
                        border: '1px solid rgba(212, 175, 55, 0.4)',
                        color: '#FFFFFF'
                      }}
                      required
                    />
                  </div>

                  <div>
                    <label style={{ fontSize: '0.78rem', color: 'var(--color-gold-400)', display: 'block', marginBottom: '4px' }}>
                      {lang === 'ua' ? 'Ваш Email' : 'E-Mail-Adresse'}
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="email@example.com"
                      style={{
                        width: '100%',
                        padding: '10px 12px',
                        borderRadius: '8px',
                        background: 'rgba(20, 2, 5, 0.9)',
                        border: '1px solid rgba(212, 175, 55, 0.4)',
                        color: '#FFFFFF'
                      }}
                      required
                    />
                  </div>

                  <button type="submit" className="btn-gold" style={{ marginTop: '10px', padding: '10px' }}>
                    {lang === 'ua' ? 'Підтвердити участь' : 'Teilnahme bestätigen'}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      )}

      {/* Add Event Modal */}
      {showAddEventModal && (
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
          <div className="card-glass" style={{ maxWidth: '480px', width: '100%', padding: '30px' }}>
            <h3 style={{ fontFamily: 'var(--font-serif)', color: 'var(--color-gold-300)', marginBottom: '14px' }}>
              {lang === 'ua' ? 'Додати подію до афіші' : 'Neue Veranstaltung eintragen'}
            </h3>
            <form onSubmit={handleAddEvent} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <input
                type="text"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                placeholder={lang === 'ua' ? 'Назва заходу' : 'Veranstaltungstitel'}
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
                value={newDate}
                onChange={(e) => setNewDate(e.target.value)}
                placeholder={lang === 'ua' ? 'Дата (напр. 15 Листопада 2026)' : 'Datum (z.B. 15. November 2026)'}
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
                value={newLocation}
                onChange={(e) => setNewLocation(e.target.value)}
                placeholder={lang === 'ua' ? 'Локація (Відень)' : 'Ort in Wien'}
                style={{
                  width: '100%',
                  padding: '10px',
                  borderRadius: '8px',
                  background: 'rgba(20, 2, 5, 0.9)',
                  border: '1px solid rgba(212, 175, 55, 0.4)',
                  color: '#FFFFFF'
                }}
              />
              <textarea
                value={newDesc}
                onChange={(e) => setNewDesc(e.target.value)}
                rows={3}
                placeholder={lang === 'ua' ? 'Короткий опис події...' : 'Kurzbeschreibung...'}
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
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '8px' }}>
                <button
                  type="button"
                  onClick={() => setShowAddEventModal(false)}
                  style={{ padding: '8px 16px', borderRadius: '8px', border: '1px solid rgba(255, 255, 255, 0.2)', color: '#AAA' }}
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

    </section>
  );
};
