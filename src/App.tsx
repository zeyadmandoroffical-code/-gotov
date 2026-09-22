import React from 'react';
import { MotionConfig, AnimatePresence, motion } from 'motion/react';
import { LanguageProvider, useLanguage } from './hooks/useLanguage';
import { Ticker } from './components/layout/Ticker';
import { Navbar } from './components/layout/Navbar';
import { TrustMarquee } from './components/layout/TrustMarquee';
import { Footer } from './components/layout/Footer';
import { Hero } from './components/sections/Hero';
import { Services } from './components/sections/Services';
import { WorkLanding } from './components/sections/WorkLanding';
import { WorkVideos } from './components/sections/WorkVideos';
import { Results } from './components/sections/Results';
import { Process } from './components/sections/Process';
import { WhyUs } from './components/sections/WhyUs';
import { DoctorStory } from './components/sections/DoctorStory';
import { Testimonials } from './components/sections/Testimonials';
import { Contact } from './components/sections/Contact';

const AppContent: React.FC = () => {
  const { lang } = useLanguage();

  return (
    <div className="min-h-screen flex flex-col bg-[var(--background)] text-[var(--ink)] antialiased selection:bg-[var(--tint-strong)] selection:text-[var(--deep)]">
      {/* Ticker Bar (40px, --deep background, white text) */}
      <Ticker />

      {/* Sticky Navbar (84px, white, 2px border) */}
      <Navbar />

      {/* Main Content with 0.2s opacity fade on language change */}
      <AnimatePresence mode="wait">
        <motion.main
          key={lang}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="flex-1 flex flex-col"
        >
          {/* 1. Hero Section with Wavy Edge */}
          <Hero />

          {/* 2. Trust Marquee of 8 Clinic & Doctor Logo Chips */}
          <TrustMarquee />

          {/* 3. Services: 4 Chunky Cards */}
          <Services />

          {/* 4. Work: Landing Pages with Hover-Scroll & Lightbox */}
          <WorkLanding />

          {/* 5. Work: Videos with 16:9 Showreel & 9:16 Reel Wall */}
          <WorkVideos />

          {/* 6. Results: --deep Section with Count-Ups & SVG Line Chart */}
          <Results />

          {/* 7. Process: 4 Numbered Steps on --surface with Scroll Progress */}
          <Process />

          {/* 8. Why Go2Viral: 3 Coloured Rounded Panels */}
          <WhyUs />

          {/* 9. Doctor Story: Rotated Polaroid Photo & Handwritten Caption */}
          <DoctorStory />

          {/* 10. Testimonials: 3 Speech-Bubble Cards with Tails */}
          <Testimonials />

          {/* 11. Contact: Split Layout with Direct WhatsApp & Link-Builder Form */}
          <Contact />
        </motion.main>
      </AnimatePresence>

      {/* Footer with Giant GO2VIRAL Wordmark */}
      <Footer />
    </div>
  );
};

export default function App() {
  return (
    <LanguageProvider>
      <MotionConfig reducedMotion="user">
        <AppContent />
      </MotionConfig>
    </LanguageProvider>
  );
}
