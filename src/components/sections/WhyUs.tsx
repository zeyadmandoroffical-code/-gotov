// src/components/sections/WhyUs.tsx
import React from 'react';
import { motion } from 'motion/react';
import { useLanguage } from '../../hooks/useLanguage';
import { Stethoscope, ShieldCheck, Target, HeartHandshake } from 'lucide-react';

export const WhyUs: React.FC = () => {
  const { t } = useLanguage();

  const icons = [
    <Stethoscope key="1" className="w-8 h-8 text-[var(--deep)] shrink-0" />,
    <ShieldCheck key="2" className="w-8 h-8 text-[var(--primary)] shrink-0" />,
    <Target key="3" className="w-8 h-8 text-[var(--deep)] shrink-0" />,
  ];

  // 3 coloured rounded panels as specified: tint, white, tint-strong
  const panelBg = [
    'bg-[var(--tint)] text-[var(--ink)]',
    'bg-white text-[var(--ink)]',
    'bg-[var(--tint-strong)] text-[var(--ink)]',
  ];

  return (
    <section id="why-us" className="py-20 sm:py-28 bg-[var(--background)] relative">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-1.5 bg-[var(--tint)] text-[var(--deep)] font-heading text-xs sm:text-sm font-bold px-4 py-1.5 rounded-full border-2 border-[var(--border)] hard-shadow-sm">
            <HeartHandshake className="w-4 h-4 text-[var(--primary)]" />
            <span>{t.nav.whyUs}</span>
          </div>

          <h2 className="section-h2 font-heading font-extrabold text-[var(--deep)]">
            {t.whyUs.h2}
          </h2>

          <p className="text-base sm:text-lg text-[var(--muted)] body-text">
            {t.whyUs.sub}
          </p>
        </div>

        {/* 3 Coloured Rounded Panels */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {t.whyUs.items.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              whileHover={{ y: -6 }}
              className={`${panelBg[idx]} rounded-3xl p-8 sm:p-9 border-2 border-[var(--border)] hard-shadow flex flex-col justify-between transition-transform`}
            >
              <div>
                <div className="w-16 h-16 rounded-2xl bg-white border-2 border-[var(--border)] hard-shadow-sm flex items-center justify-center mb-6">
                  {icons[idx]}
                </div>

                <h3 className="font-heading font-extrabold text-2xl text-[var(--deep)] mb-3 leading-snug">
                  {item.title}
                </h3>

                <p className="text-base text-[var(--muted)] body-text leading-relaxed">
                  {item.desc}
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-[var(--border)]/15 flex items-center gap-2 text-xs font-bold text-[var(--deep)]">
                <span className="w-2 h-2 rounded-full bg-[var(--primary)]" />
                <span>Go2Viral Medical Standard</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
