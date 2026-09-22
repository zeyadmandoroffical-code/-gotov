// src/components/layout/Footer.tsx
import React from 'react';
import { useLanguage } from '../../hooks/useLanguage';
import { LOGO_PATH } from '../../data/config';
import { ArrowUp, Instagram, Linkedin, MessageCircle } from 'lucide-react';

export const Footer: React.FC = () => {
  const { t } = useLanguage();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const footerLinks = [
    { label: t.footer.links.services, href: '#services' },
    { label: t.footer.links.work, href: '#work' },
    { label: t.footer.links.results, href: '#results' },
    { label: t.footer.links.process, href: '#process' },
    { label: t.footer.links.contact, href: '#contact' },
  ];

  return (
    <footer className="bg-[var(--deep)] text-white border-t-2 border-[var(--border)] overflow-hidden relative select-none">
      {/* Upper content */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 pt-16 pb-12">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 pb-12 border-b border-white/20">
          {/* Logo in white rounded pill as per spec */}
          <div className="flex flex-col gap-3">
            <div className="inline-block bg-white rounded-full px-4 py-2 border-2 border-[var(--border)] hard-shadow">
              <img
                src={LOGO_PATH}
                alt="Go2Viral"
                className="h-8 w-auto object-contain"
                referrerPolicy="no-referrer"
              />
            </div>
            <p className="text-white/80 text-sm max-w-sm font-medium">
              {t.footer.tagline}
            </p>
          </div>

          {/* Navigation Links */}
          <div className="flex flex-wrap gap-x-6 gap-y-3 font-heading font-bold text-sm sm:text-base">
            {footerLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-white/90 hover:text-[var(--tint-strong)] transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Socials & Back to top */}
          <div className="flex items-center gap-3">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-xl bg-white/10 hover:bg-white/20 border-2 border-white/30 flex items-center justify-center text-white transition-colors"
              aria-label={t.footer.links.instagram}
            >
              <Instagram className="w-5 h-5" />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-xl bg-white/10 hover:bg-white/20 border-2 border-white/30 flex items-center justify-center text-white transition-colors"
              aria-label={t.footer.links.linkedin}
            >
              <Linkedin className="w-5 h-5" />
            </a>
            <button
              onClick={scrollToTop}
              className="w-10 h-10 rounded-xl bg-white text-[var(--deep)] border-2 border-[var(--border)] hard-shadow-sm flex items-center justify-center pressable-btn"
              aria-label="Back to top"
            >
              <ArrowUp className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Giant wordmark GO2VIRAL at 18vw in Fredoka 700, always Latin */}
        <div className="py-8 sm:py-12 overflow-hidden text-center select-none" dir="ltr">
          <span
            className="block text-white font-extrabold tracking-tight leading-none pointer-events-none opacity-90"
            style={{
              fontFamily: "'Fredoka', sans-serif",
              fontSize: 'clamp(48px, 18vw, 240px)',
              letterSpacing: '-0.04em',
            }}
          >
            GO2VIRAL
          </span>
        </div>

        {/* Copyright notice */}
        <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-xs text-white/60 gap-4">
          <p>{t.footer.copyright}</p>
          <div className="flex items-center gap-2">
            <MessageCircle className="w-3.5 h-3.5 text-[var(--tint-strong)]" />
            <span>Marketing built specifically for doctors and clinics</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
