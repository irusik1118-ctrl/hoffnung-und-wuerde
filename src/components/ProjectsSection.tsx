'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Language, ProjectItem } from '@/types';
import { initialProjects } from '@/data/content';
import {
  FolderGit2,
  MapPin,
  Calendar,
  Sparkles,
  PlusCircle,
  FileCheck2,
  ExternalLink,
  X,
  Camera,
  Layers
} from 'lucide-react';

interface ProjectsSectionProps {
  lang: Language;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({ lang }) => {
  const [projects, setProjects] = useState<ProjectItem[]>(initialProjects);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeReportModal, setActiveReportModal] = useState<ProjectItem | null>(null);
  const [showAddProjectModal, setShowAddProjectModal] = useState(false);

  // New project state
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState('Kinder und Jugendliche');
  const [newLocation, setNewLocation] = useState('Wien');
  const [newDesc, setNewDesc] = useState('');

  const categories = [
    { id: 'all', labelUa: 'Всі проекти', labelDe: 'Alle Projekte' },
    { id: 'kinder', labelUa: 'Діти та молодь', labelDe: 'Kinder & Jugend' },
    { id: 'senioren', labelUa: 'Люди похилого віку', labelDe: 'Senioren' },
    { id: 'hilfe', labelUa: 'Гуманітарна допомога', labelDe: 'Humanitäre Hilfe' },
  ];

  const filteredProjects = projects.filter((p) => {
    if (selectedCategory === 'all') return true;
    if (selectedCategory === 'kinder') return p.categoryDe.includes('Kinder');
    if (selectedCategory === 'senioren') return p.categoryDe.includes('Senioren');
    if (selectedCategory === 'hilfe') return p.categoryDe.includes('Humanitäre');
    return true;
  });

  const handleCreateProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const newProject: ProjectItem = {
      id: `proj-${Date.now()}`,
      titleUa: newTitle,
      titleDe: newTitle,
      categoryUa: newCategory,
      categoryDe: newCategory,
      location: newLocation,
      date: '2026',
      image: '/images/hero.jpg',
      descriptionUa: newDesc,
      descriptionDe: newDesc,
      reportStats: [
        { labelUa: 'Охоплено людей', labelDe: 'Begünstigte', value: '100+' },
        { labelUa: 'Звіт опубліковано', labelDe: 'Bericht verifiziert', value: '100%' },
      ],
      completed: false,
    };

    setProjects([newProject, ...projects]);
    setNewTitle('');
    setNewDesc('');
    setShowAddProjectModal(false);
  };

  return (
    <section id="projects" style={{ padding: '70px 0', position: 'relative' }}>
      <div className="section-container">
        
        {/* Section Header */}
        <div className="section-header">
          <div className="gold-badge">
            <FolderGit2 size={14} />
            <span>{lang === 'ua' ? 'Розділ 2' : 'Abschnitt 2'}</span>
          </div>

          <h2 className="section-title">
            {lang === 'ua' ? 'Наші проекти (Фото, звіт)' : 'Unsere Projekte (Fotobericht & Rechenschaft)'}
          </h2>

          <div className="section-divider">
            <div className="line"></div>
            <div className="diamond"></div>
            <div className="line"></div>
          </div>

          <p className="section-subtitle">
            {lang === 'ua'
              ? 'Прозорість та результативність кожної ініціативи. Ознайомтеся з фотозвітами та підсумками проведеної роботи у Відні та Австрії.'
              : 'Transparenz und spürbare Wirkung. Entdecken Sie Fotodokumentationen und Berichte unserer Hilfsprojekte in Wien und Österreich.'}
          </p>
        </div>

        {/* Filter Tabs & Add Button */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '14px',
          marginBottom: '32px'
        }}>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                style={{
                  padding: '8px 18px',
                  borderRadius: '20px',
                  fontSize: '0.86rem',
                  fontWeight: 600,
                  transition: 'all 0.2s ease',
                  border: selectedCategory === cat.id
                    ? '1px solid var(--color-gold-400)'
                    : '1px solid rgba(212, 175, 55, 0.25)',
                  background: selectedCategory === cat.id
                    ? 'rgba(212, 175, 55, 0.2)'
                    : 'rgba(38, 7, 13, 0.6)',
                  color: selectedCategory === cat.id ? 'var(--color-gold-300)' : 'var(--color-text-muted)',
                }}
              >
                {lang === 'ua' ? cat.labelUa : cat.labelDe}
              </button>
            ))}
          </div>

          <button
            onClick={() => setShowAddProjectModal(true)}
            className="btn-outline-gold"
            style={{ padding: '8px 16px', fontSize: '0.86rem' }}
          >
            <PlusCircle size={15} />
            <span>{lang === 'ua' ? '+ Додати новий проект / звіт' : '+ Neues Projekt / Bericht hinzufügen'}</span>
          </button>
        </div>

        {/* Projects Cards Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '26px'
        }}>
          {filteredProjects.map((project) => (
            <div key={project.id} className="card-glass" style={{
              padding: 0,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between'
            }}>
              <div>
                {/* Project Image */}
                <div style={{ position: 'relative', width: '100%', height: '220px', overflow: 'hidden' }}>
                  <Image
                    src={project.image}
                    alt={lang === 'ua' ? project.titleUa : project.titleDe}
                    fill
                    style={{ objectFit: 'cover' }}
                  />
                  <div style={{
                    position: 'absolute',
                    top: '12px',
                    left: '12px',
                    background: 'rgba(20, 2, 5, 0.85)',
                    backdropFilter: 'blur(8px)',
                    border: '1px solid rgba(212, 175, 55, 0.4)',
                    color: 'var(--color-gold-400)',
                    padding: '4px 10px',
                    borderRadius: '8px',
                    fontSize: '0.74rem',
                    fontWeight: 700
                  }}>
                    {lang === 'ua' ? project.categoryUa : project.categoryDe}
                  </div>

                  <div style={{
                    position: 'absolute',
                    bottom: '12px',
                    right: '12px',
                    background: 'rgba(20, 2, 5, 0.85)',
                    backdropFilter: 'blur(8px)',
                    color: '#FFFFFF',
                    padding: '4px 10px',
                    borderRadius: '8px',
                    fontSize: '0.74rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px'
                  }}>
                    <MapPin size={12} color="var(--color-gold-400)" />
                    <span>{project.location}</span>
                  </div>
                </div>

                {/* Project Body */}
                <div style={{ padding: '24px' }}>
                  <h3 style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: '1.24rem',
                    color: '#FFFFFF',
                    marginBottom: '10px',
                    lineHeight: 1.3
                  }}>
                    {lang === 'ua' ? project.titleUa : project.titleDe}
                  </h3>

                  <p style={{
                    fontSize: '0.9rem',
                    color: 'var(--color-text-muted)',
                    lineHeight: 1.6,
                    marginBottom: '20px'
                  }}>
                    {lang === 'ua' ? project.descriptionUa : project.descriptionDe}
                  </p>

                  {/* Impact Stats */}
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: `repeat(${project.reportStats.length}, 1fr)`,
                    gap: '8px',
                    padding: '12px',
                    background: 'rgba(20, 2, 5, 0.7)',
                    borderRadius: '10px',
                    border: '1px solid rgba(212, 175, 55, 0.15)',
                    marginBottom: '16px',
                    textAlign: 'center'
                  }}>
                    {project.reportStats.map((stat, sIdx) => (
                      <div key={sIdx}>
                        <div style={{
                          fontFamily: 'var(--font-serif)',
                          fontSize: '1.25rem',
                          fontWeight: 800,
                          color: 'var(--color-gold-300)'
                        }}>
                          {stat.value}
                        </div>
                        <div style={{
                          fontSize: '0.72rem',
                          color: 'var(--color-text-muted)',
                          marginTop: '2px'
                        }}>
                          {lang === 'ua' ? stat.labelUa : stat.labelDe}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Button: View Photo Report */}
              <div style={{ padding: '0 24px 24px' }}>
                <button
                  onClick={() => setActiveReportModal(project)}
                  className="btn-outline-gold"
                  style={{ width: '100%', padding: '10px', fontSize: '0.88rem' }}
                >
                  <Camera size={15} />
                  <span>{lang === 'ua' ? 'Дивитися фотозвіт проекту' : 'Vollständigen Fotobericht ansehen'}</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Empty Placeholder Card for User Content Entry */}
        <div className="card-glass" style={{
          marginTop: '30px',
          background: 'rgba(30, 4, 10, 0.5)',
          borderStyle: 'dashed',
          borderColor: 'rgba(212, 175, 55, 0.35)',
          textAlign: 'center',
          padding: '28px'
        }}>
          <h4 style={{ fontFamily: 'var(--font-serif)', color: 'var(--color-gold-300)', fontSize: '1.15rem', marginBottom: '8px' }}>
            {lang === 'ua' ? '📂 Резервний шаблон для додавання ваших проектів' : '📂 Platzhalter-Sektion für weitere Projekte'}
          </h4>
          <p style={{ fontSize: '0.88rem', color: 'var(--color-text-muted)', maxWidth: '600px', margin: '0 auto' }}>
            {lang === 'ua'
              ? 'Коли у вас з’являться нові фотографії, чеки або звіти, їх можна миттєво підключити сюди.'
              : 'Sobald neue Fotodokumentationen, Quittungen und Hilfsberichte vorliegen, können diese direkt hier eingepflegt werden.'}
          </p>
        </div>

      </div>

      {/* Full Photo Report Modal */}
      {activeReportModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          background: 'rgba(10, 1, 3, 0.88)',
          backdropFilter: 'blur(12px)',
          zIndex: 9999,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '24px'
        }}>
          <div className="card-glass" style={{
            maxWidth: '680px',
            width: '100%',
            maxHeight: '90vh',
            overflowY: 'auto',
            padding: '32px',
            position: 'relative'
          }}>
            <button
              onClick={() => setActiveReportModal(null)}
              style={{
                position: 'absolute',
                top: '18px',
                right: '18px',
                color: 'var(--color-gold-400)',
                padding: '6px'
              }}
            >
              <X size={24} />
            </button>

            <div className="gold-badge" style={{ marginBottom: '12px' }}>
              <FileCheck2 size={13} />
              <span>{lang === 'ua' ? 'Офіційний звіт фонду' : 'Offizieller Prüfbericht'}</span>
            </div>

            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.45rem', color: '#FFFFFF', marginBottom: '8px' }}>
              {lang === 'ua' ? activeReportModal.titleUa : activeReportModal.titleDe}
            </h3>

            <div style={{ display: 'flex', gap: '16px', fontSize: '0.84rem', color: 'var(--color-gold-400)', marginBottom: '20px' }}>
              <span>📍 {activeReportModal.location}</span>
              <span>📅 {activeReportModal.date}</span>
              <span>🏷️ {lang === 'ua' ? activeReportModal.categoryUa : activeReportModal.categoryDe}</span>
            </div>

            <div style={{ position: 'relative', width: '100%', height: '260px', borderRadius: '12px', overflow: 'hidden', marginBottom: '20px' }}>
              <Image
                src={activeReportModal.image}
                alt="Report Image"
                fill
                style={{ objectFit: 'cover' }}
              />
            </div>

            <h4 style={{ color: 'var(--color-gold-300)', marginBottom: '8px', fontSize: '1.05rem' }}>
              {lang === 'ua' ? 'Опис та досягнуті результати:' : 'Beschreibung und erzielte Ergebnisse:'}
            </h4>
            <p style={{ color: 'var(--color-text-muted)', fontSize: '0.94rem', lineHeight: 1.7, marginBottom: '20px' }}>
              {lang === 'ua' ? activeReportModal.descriptionUa : activeReportModal.descriptionDe}
            </p>

            <div style={{
              background: 'rgba(212, 175, 55, 0.1)',
              border: '1px solid rgba(212, 175, 55, 0.3)',
              borderRadius: '8px',
              padding: '16px',
              fontSize: '0.86rem',
              color: 'var(--color-gold-300)'
            }}>
              ✅ {lang === 'ua' 
                ? 'Фінансова звітність та фотоматеріали верифіковані згідно із законодавством Австрії (ZVR: 1984068166).' 
                : 'Finanzberichte und Fotobestätigungen sind gemäß österreichischem Vereinsgesetz ordnungsgemäß hinterlegt (ZVR: 1984068166).'}
            </div>
          </div>
        </div>
      )}

      {/* Add Project Modal */}
      {showAddProjectModal && (
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
          <div className="card-glass" style={{ maxWidth: '520px', width: '100%', padding: '30px' }}>
            <h3 style={{ fontFamily: 'var(--font-serif)', color: 'var(--color-gold-300)', marginBottom: '16px' }}>
              {lang === 'ua' ? 'Додати новий проект / фотозвіт' : 'Neues Projekt hinzufügen'}
            </h3>
            <form onSubmit={handleCreateProject} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <label style={{ fontSize: '0.8rem', color: 'var(--color-gold-400)', display: 'block', marginBottom: '4px' }}>
                  {lang === 'ua' ? 'Назва проекту' : 'Projekttitel'}
                </label>
                <input
                  type="text"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder={lang === 'ua' ? 'Наприклад: Допомога дітям Відня' : 'z.B. Hilfsprojekt Wien'}
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
                <label style={{ fontSize: '0.8rem', color: 'var(--color-gold-400)', display: 'block', marginBottom: '4px' }}>
                  {lang === 'ua' ? 'Категорія' : 'Kategorie'}
                </label>
                <select
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    borderRadius: '8px',
                    background: 'rgba(20, 2, 5, 0.9)',
                    border: '1px solid rgba(212, 175, 55, 0.4)',
                    color: '#FFFFFF'
                  }}
                >
                  <option value="Kinder und Jugendliche">Kinder und Jugendliche / Діти та молодь</option>
                  <option value="Senioren und Hilfsbedürftige">Senioren und Hilfsbedürftige / Люди похилого віку</option>
                  <option value="Humanitäre Hilfe">Humanitäre Hilfe / Гуманітарна допомога</option>
                </select>
              </div>

              <div>
                <label style={{ fontSize: '0.8rem', color: 'var(--color-gold-400)', display: 'block', marginBottom: '4px' }}>
                  {lang === 'ua' ? 'Місце (Місто, район)' : 'Ort'}
                </label>
                <input
                  type="text"
                  value={newLocation}
                  onChange={(e) => setNewLocation(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    borderRadius: '8px',
                    background: 'rgba(20, 2, 5, 0.9)',
                    border: '1px solid rgba(212, 175, 55, 0.4)',
                    color: '#FFFFFF'
                  }}
                />
              </div>

              <div>
                <label style={{ fontSize: '0.8rem', color: 'var(--color-gold-400)', display: 'block', marginBottom: '4px' }}>
                  {lang === 'ua' ? 'Короткий опис та результати' : 'Beschreibung'}
                </label>
                <textarea
                  value={newDesc}
                  onChange={(e) => setNewDesc(e.target.value)}
                  rows={3}
                  placeholder={lang === 'ua' ? 'Опишіть, кому і як було надано допомогу...' : 'Projektbeschreibung...'}
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

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '10px' }}>
                <button
                  type="button"
                  onClick={() => setShowAddProjectModal(false)}
                  style={{ padding: '8px 16px', borderRadius: '8px', border: '1px solid rgba(255, 255, 255, 0.2)', color: '#AAA' }}
                >
                  {lang === 'ua' ? 'Скасувати' : 'Abbrechen'}
                </button>
                <button type="submit" className="btn-gold" style={{ padding: '8px 18px' }}>
                  {lang === 'ua' ? 'Додати проект' : 'Projekt speichern'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </section>
  );
};
