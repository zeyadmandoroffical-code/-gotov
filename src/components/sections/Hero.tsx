// src/components/sections/Hero.tsx
import React from 'react';
import { motion } from 'motion/react';
import { useLanguage } from '../../hooks/useLanguage';
import { Button } from '../ui/Button';
import { Sticker } from '../ui/Sticker';
import { Wave } from '../ui/Wave';
import { ShieldCheck, FileCheck, Film, Calendar, TrendingUp, Sparkles, Stethoscope, ArrowDown } from 'lucide-react';

export const Hero: React.FC = () => {
  const { t, lang, dir, isRTL } = useLanguage();

  // Word split for animated H1 without breaking Arabic joining
  // In Arabic, we split by whitespace words so each word remains intact and properly shaped
  const h1Words = [
    { text: t.hero.h1Line1, highlight: false },
    { text: t.hero.h1Line2, highlight: false },
    { text: t.hero.h1Line3, highlight: true },
  ];

  const proofIcons = [
    <ShieldCheck key="1" className="w-4 h-4 text-[var(--tint-strong)] shrink-0" />,
    <FileCheck key="2" className="w-4 h-4 text-[var(--tint-strong)] shrink-0" />,
    <Film key="3" className="w-4 h-4 text-[var(--tint-strong)] shrink-0" />,
  ];

  return (
    <section className="relative bg-[var(--primary)] text-white pt-10 sm:pt-16 pb-0 overflow-hidden">
      {/* Decorative background ambient circles */}
      <div className="absolute top-0 start-1/4 w-96 h-96 bg-[var(--deep)]/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-16 end-10 w-80 h-80 bg-[#7038e0]/30 rounded-full blur-2xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 pb-16 sm:pb-24 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Text Block (7 cols desktop) */}
          <div className="lg:col-span-7 flex flex-col items-start text-start space-y-6">
            {/* Pill Tag */}
            <div className="inline-flex items-center gap-2 bg-[var(--deep)] border-2 border-[var(--border)] px-3.5 py-1.5 rounded-full hard-shadow-sm">
              <Sparkles className="w-4 h-4 text-[var(--tint-strong)]" />
              <span className="font-heading text-xs sm:text-sm font-bold tracking-wide text-white">
                {lang === 'ar' ? 'الوكالة المتخصصة لنمو العيادات' : 'Specialized Clinic Growth Agency'}
              </span>
            </div>

            {/* H1 Split by words */}
            <h1 className="hero-h1 font-heading font-extrabold text-white">
              {h1Words.map((wordObj, i) => (
                <motion.span
                  key={`${lang}-${i}`}
                  initial={{ scale: 0.6, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{
                    type: 'spring',
                    stiffness: 300,
                    damping: 18,
                    delay: i * 0.08,
                  }}
                  className="block"
                >
                  {wordObj.highlight ? (
                    <span className="inline-block relative">
                      <span className="relative z-10 text-[var(--tint-strong)] underline decoration-[var(--tint-strong)]/60 decoration-wavy decoration-4 underline-offset-8">
                        {wordObj.text}
                      </span>
                    </span>
                  ) : (
                    wordObj.text
                  )}
                </motion.span>
              ))}
            </h1>

            {/* Subline */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.6 }}
              className="text-lg sm:text-xl text-white/90 max-w-xl body-text font-normal"
            >
              {t.hero.sub}
            </motion.p>

            {/* Call to action buttons */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="flex flex-wrap items-center gap-4 pt-2"
            >
              <Button
                asAnchor
                href="#contact"
                variant="white"
                size="lg"
                className="text-base sm:text-lg"
              >
                {t.hero.ctaPrimary}
              </Button>

              <Button
                asAnchor
                href="#work"
                variant="tint-strong"
                size="lg"
                className="text-base sm:text-lg flex items-center gap-2"
              >
                <span>{t.hero.ctaSecondary}</span>
                <ArrowDown className="w-4 h-4 rtl:-scale-x-100" />
              </Button>
            </motion.div>

            {/* Mini-proofs row */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.6 }}
              className="pt-4 flex flex-wrap items-center gap-y-2 gap-x-6 text-sm font-heading font-bold text-white/95"
            >
              {t.hero.proofs.map((proofText, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-[var(--deep)] border border-[var(--border)] flex items-center justify-center shrink-0">
                    {proofIcons[idx]}
                  </div>
                  <span>{proofText}</span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right Visual Block (5 cols desktop) */}
          <div className="lg:col-span-5 relative flex items-center justify-center mt-6 lg:mt-0">
            {/* Doctor Photo Frame with Entrance Animation */}
            <motion.div
              initial={{ rotate: -6 * dir, scale: 0.9, opacity: 0 }}
              animate={{ rotate: 0, scale: 1, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 200, damping: 20, delay: 0.2 }}
              className="relative w-full max-w-[380px] sm:max-w-[420px] aspect-[4/5] bg-gradient-to-b from-[#6b35db] to-[var(--deep)] rounded-[32px] border-2 border-[var(--border)] hard-shadow-lg overflow-hidden flex flex-col justify-end p-6"
            >
              {/* Doctor Medical Artwork & Stethoscope Backdrop */}
              <div
                className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center"
                aria-label={t.hero.doctorImageAlt}
                role="img"
              >
                {/* Radial glow */}
                <div className="absolute inset-0 bg-radial from-white/15 to-transparent pointer-events-none" />

                {/* Stethoscope silhouette and doctor graphic presentation */}
                <div className="w-32 h-32 rounded-full bg-white/10 border-2 border-white/20 flex items-center justify-center mb-4 backdrop-blur-sm shadow-inner">
                  <Stethoscope className="w-16 h-16 text-[var(--tint-strong)]" />
                </div>

                <div className="bg-white/15 backdrop-blur-md rounded-2xl px-5 py-3 border border-white/25 max-w-[280px]">
                  <p className="font-heading font-extrabold text-base text-white">
                    {lang === 'ar' ? 'عيادات متخصصة وأطباء' : 'Specialized Medical Clinics'}
                  </p>
                  <p className="text-xs text-white/80 font-medium mt-1">
                    {lang === 'ar'
                      ? 'تصوير احترافي وحملات مخصصة لجدولك الطبي'
                      : 'Compliant medical marketing & on-site clinic shoots'}
                  </p>
                </div>
              </div>

              {/* Doctor Namecard Plate at Bottom */}
              <div className="relative z-10 bg-white/95 backdrop-blur-sm rounded-2xl p-3.5 border-2 border-[var(--border)] hard-shadow-sm flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[var(--tint-strong)] border-2 border-[var(--border)] flex items-center justify-center font-heading font-extrabold text-[var(--deep)] text-sm shrink-0">
                    Dr.
                  </div>
                  <div>
                    <h4 className="font-heading font-extrabold text-sm text-[var(--deep)] leading-tight">
                      {lang === 'ar' ? 'د. أحمد خليل' : 'Dr. Ahmed Khalil'}
                    </h4>
                    <p className="text-[11px] text-[var(--muted)] font-bold">
                      {lang === 'ar' ? 'استشاري جلدية وتجميل' : 'Consultant Dermatologist'}
                    </p>
                  </div>
                </div>
                <span className="text-[10px] font-bold bg-emerald-100 text-emerald-800 px-2 py-1 rounded-md border border-emerald-300">
                  {lang === 'ar' ? 'مواعيد مكتملة' : 'Full Calendar'}
                </span>
              </div>
            </motion.div>

            {/* Sticker 1: Top start corner overlapping image */}
            <Sticker
              text={t.hero.stickers.doctorsOnly}
              rotation={-10}
              color="tint-strong"
              delay={0.6}
              className="absolute -top-5 -start-4 sm:-start-6 z-20"
            />

            {/* Sticker 2: Bottom end corner overlapping image */}
            <Sticker
              text={t.hero.stickers.bookingsNotLikes}
              rotation={8}
              color="white"
              starburst={false}
              delay={0.75}
              className="absolute -bottom-4 -end-4 sm:-end-6 z-20"
            />

            {/* Floating UI Chip 1: New Booking Notification */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: [0, -8, 0] }}
              transition={{
                opacity: { delay: 0.9, duration: 0.4 },
                y: {
                  delay: 1.0,
                  duration: 4,
                  repeat: Infinity,
                  ease: 'easeInOut',
                },
              }}
              className="absolute top-12 -end-2 sm:-end-8 z-20 bg-white text-[var(--ink)] rounded-2xl p-3 border-2 border-[var(--border)] hard-shadow max-w-[210px] select-none"
            >
              <div className="flex items-center gap-2 mb-1">
                <div className="w-6 h-6 rounded-full bg-emerald-100 border border-emerald-400 flex items-center justify-center">
                  <Calendar className="w-3.5 h-3.5 text-emerald-600" />
                </div>
                <div className="font-heading font-bold text-xs text-[var(--deep)]">
                  {t.hero.uiChips.booking.title}
                </div>
              </div>
              <p className="text-[11px] font-medium text-[var(--ink)] leading-snug">
                {t.hero.uiChips.booking.desc}
              </p>
              <span className="text-[9px] text-[var(--muted)] font-mono block mt-1">
                {t.hero.uiChips.booking.time}
              </span>
            </motion.div>

            {/* Floating UI Chip 2: Growth Pill */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: [0, -8, 0] }}
              transition={{
                opacity: { delay: 1.1, duration: 0.4 },
                y: {
                  delay: 2.2, // Offset by 1.2s as specified
                  duration: 4,
                  repeat: Infinity,
                  ease: 'easeInOut',
                },
              }}
              className="absolute bottom-16 -start-2 sm:-start-8 z-20 bg-white text-[var(--ink)] rounded-2xl px-4 py-2.5 border-2 border-[var(--border)] hard-shadow select-none flex items-center gap-3"
            >
              <div className="w-8 h-8 rounded-full bg-[var(--tint)] border border-[var(--border)] flex items-center justify-center shrink-0">
                <TrendingUp className="w-4 h-4 text-[var(--primary)]" />
              </div>
              <div className="flex flex-col">
                <span className="font-heading font-extrabold text-base text-[var(--primary)] leading-none" dir="ltr">
                  {t.hero.uiChips.growth.stat}
                </span>
                <span className="text-[10px] font-bold text-[var(--muted)]">
                  {t.hero.uiChips.growth.label} <span className="opacity-70">{t.hero.uiChips.growth.sampleBadge}</span>
                </span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Wavy bottom edge (Effect 3) transitioning into next section */}
      <Wave fillColor="var(--surface)" />
    </section>
  );
};
