'use client';

import React, { useState } from 'react';
import { Language } from '@/types';
import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { LogoMeaning } from '@/components/LogoMeaning';
import { AboutSection } from '@/components/AboutSection';
import { ProjectsSection } from '@/components/ProjectsSection';
import { EventsSection } from '@/components/EventsSection';
import { PartnersSection } from '@/components/PartnersSection';
import { SponsorsSection } from '@/components/SponsorsSection';
import { ContactBanner } from '@/components/ContactBanner';
import { Footer } from '@/components/Footer';

export default function Home() {
  const [lang, setLang] = useState<Language>('ua');

  const toggleLanguage = () => {
    setLang((prev) => (prev === 'ua' ? 'de' : 'ua'));
  };

  const handleDonateClick = () => {
    const sponsorsElem = document.getElementById('sponsors');
    if (sponsorsElem) {
      sponsorsElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenLogoMeaning = () => {
    const logoElem = document.getElementById('logo-meaning');
    if (logoElem) {
      logoElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <main style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Multilingual Sticky Header with Austrian Badge */}
      <Header
        lang={lang}
        onToggleLang={toggleLanguage}
        onDonateClick={handleDonateClick}
      />

      {/* Main Page with User's Uploaded Banner & 6 Quick Navigation Buttons */}
      <Hero
        lang={lang}
        onDonateClick={handleDonateClick}
        onOpenLogoMeaning={handleOpenLogoMeaning}
      />

      {/* Special Feature: Meaning of the Phoenix Logo ("ПОМНИ ОБ ЭТОМ") */}
      <LogoMeaning lang={lang} />

      {/* Section 1: Наша компанія (Хто ми) / Unsere Organisation */}
      <AboutSection lang={lang} />

      {/* Section 2: Наші проекти (Фото, звіт) / Unsere Projekte */}
      <ProjectsSection lang={lang} />

      {/* Section 3: Афіша наших проектів / Affiche der Projekte */}
      <EventsSection lang={lang} />

      {/* Section 4: Наші партнери / Unsere Partner */}
      <PartnersSection lang={lang} />

      {/* Section 5: Наші спонсори / Unsere Förderer */}
      <SponsorsSection lang={lang} />

      {/* Section 6: Контакти компанії та соцмережі (Банер) / Kontakt & Soziale Netzwerke */}
      <ContactBanner lang={lang} />

      {/* Austrian Foundation Footer */}
      <Footer lang={lang} />
    </main>
  );
}
