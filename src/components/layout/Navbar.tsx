// src/components/layout/Navbar.tsx
import React, { useState, useEffect } from 'react';
import { Menu, X, Globe, PhoneCall } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useLanguage } from '../../hooks/useLanguage';
import { LOGO_PATH } from '../../data/config';
import { Button } from '../ui/Button';

export const Navbar: React.FC = () => {
  const { t, lang, isRTL, toggleLanguage } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Close mobile menu on resize or Esc
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileMenuOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const navLinks = [
    { label: t.nav.services, href: '#services' },
    { label: t.nav.work, href: '#work' },
    { label: t.nav.results, href: '#results' },
    { label: t.nav.process, href: '#process' },
    { label: t.nav.whyUs, href: '#why-us' },
    { label: t.nav.contact, href: '#contact' },
  ];

  return (
    <header className="h-[84px] bg-white sticky top-0 z-40 border-b-2 border-[var(--border)] flex items-center px-4 sm:px-8 transition-colors">
      <div className="w-full max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Brand Logo (Start) */}
        <a
          href="#"
          className="flex items-center group shrink-0 focus-visible:outline-none"
          aria-label="Go2Viral Home"
        >
          <img
            src={LOGO_PATH}
            alt="Go2Viral Logo"
            className="h-9 sm:h-10 w-auto object-contain transition-transform group-hover:scale-105"
            referrerPolicy="no-referrer"
          />
        </a>

        {/* Navigation Links (Centre - Desktop) */}
        <nav className="hidden lg:flex items-center gap-6 xl:gap-8" aria-label="Main Navigation">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-[15px] font-heading font-bold text-[var(--ink)] hover:text-[var(--primary)] transition-colors relative py-1"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Language Toggle + CTA (End - Desktop) */}
        <div className="hidden lg:flex items-center gap-3.5 shrink-0">
          {/* Language Toggle Button */}
          <button
            type="button"
            onClick={toggleLanguage}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border-2 border-[var(--border)] bg-[var(--surface)] hover:bg-[var(--tint)] text-[var(--ink)] font-heading text-sm font-bold hard-shadow-sm transition-transform active:translate-y-0.5"
            aria-label="Switch Language"
          >
            <Globe className="w-4 h-4 text-[var(--primary)]" />
            <span>{t.nav.langToggle}</span>
          </button>

          {/* Primary CTA Button */}
          <Button
            asAnchor
            href="#contact"
            variant="primary"
            size="md"
            className="flex items-center gap-2"
          >
            <PhoneCall className="w-4 h-4" />
            <span>{t.nav.cta}</span>
          </Button>
        </div>

        {/* Mobile Header Actions (Mobile & Tablet) */}
        <div className="flex lg:hidden items-center gap-2.5">
          {/* Language Toggle */}
          <button
            type="button"
            onClick={toggleLanguage}
            className="px-2.5 py-1 rounded-lg border-2 border-[var(--border)] bg-[var(--surface)] text-[var(--ink)] font-heading text-xs font-bold hard-shadow-sm"
            aria-label="Switch Language"
          >
            {t.nav.langToggle}
          </button>

          {/* Mobile Menu Toggle Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="w-11 h-11 rounded-xl bg-[var(--primary)] text-white border-2 border-[var(--border)] hard-shadow-sm flex items-center justify-center pressable-btn"
            aria-label={mobileMenuOpen ? t.nav.menuClose : t.nav.menuOpen}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay with Circular Clip-Path Animation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{
              clipPath: isRTL
                ? 'circle(0% at 40px 40px)'
                : 'circle(0% at calc(100% - 40px) 40px)',
              opacity: 0.8,
            }}
            animate={{
              clipPath: isRTL
                ? 'circle(150% at 40px 40px)'
                : 'circle(150% at calc(100% - 40px) 40px)',
              opacity: 1,
            }}
            exit={{
              clipPath: isRTL
                ? 'circle(0% at 40px 40px)'
                : 'circle(0% at calc(100% - 40px) 40px)',
              opacity: 0,
            }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 bg-[var(--deep)] text-white z-50 flex flex-col p-6 sm:p-10 lg:hidden overflow-y-auto"
          >
            {/* Top Bar inside mobile menu */}
            <div className="flex items-center justify-between pb-6 border-b border-white/20">
              <div className="bg-white rounded-full px-3.5 py-2 border-2 border-[var(--border)] hard-shadow">
                <img
                  src={LOGO_PATH}
                  alt="Go2Viral"
                  className="h-7 w-auto object-contain"
                  referrerPolicy="no-referrer"
                />
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={toggleLanguage}
                  className="px-3 py-1 rounded-xl border-2 border-white/40 bg-white/10 text-white font-heading text-sm font-bold"
                >
                  {t.nav.langToggle}
                </button>
                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-10 h-10 rounded-xl bg-white text-[var(--deep)] border-2 border-[var(--border)] flex items-center justify-center hard-shadow"
                  aria-label={t.nav.menuClose}
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>

            {/* Mobile Nav Links with stagger animation */}
            <div className="flex-1 flex flex-col justify-center py-10 space-y-6">
              {navLinks.map((link, idx) => (
                <motion.div
                  key={link.href}
                  initial={{ y: 40, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.15 + idx * 0.06, duration: 0.4 }}
                >
                  <a
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="block text-3xl sm:text-4xl font-heading font-extrabold text-white hover:text-[var(--tint-strong)] transition-colors"
                  >
                    {link.label}
                  </a>
                </motion.div>
              ))}
            </div>

            {/* Mobile Menu CTA */}
            <div className="pt-6 border-t border-white/20 flex flex-col gap-3">
              <Button
                asAnchor
                href="#contact"
                variant="white"
                size="lg"
                className="w-full text-center"
                onClick={() => setMobileMenuOpen(false)}
              >
                {t.nav.cta}
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
