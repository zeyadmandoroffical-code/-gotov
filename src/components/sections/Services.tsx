// src/components/sections/Services.tsx
import React from 'react';
import { motion } from 'motion/react';
import { useLanguage } from '../../hooks/useLanguage';
import { UserCheck, Target, Layout, Video } from 'lucide-react';

export const Services: React.FC = () => {
  const { t } = useLanguage();

  const serviceIcons = [
    <UserCheck key="1" className="w-8 h-8 shrink-0" />,
    <Target key="2" className="w-8 h-8 shrink-0" />,
    <Layout key="3" className="w-8 h-8 shrink-0" />,
    <Video key="4" className="w-8 h-8 shrink-0" />,
  ];

  // 4 fills as specified: white, --tint, --primary, --deep
  const cardStyles = [
    {
      bg: 'bg-white text-[var(--ink)]',
      iconBg: 'bg-[var(--tint)] text-[var(--deep)]',
      tagBg: 'bg-[var(--surface)] text-[var(--ink)] border-[var(--border)]',
    },
    {
      bg: 'bg-[var(--tint)] text-[var(--ink)]',
      iconBg: 'bg-white text-[var(--primary)]',
      tagBg: 'bg-white text-[var(--ink)] border-[var(--border)]',
    },
    {
      bg: 'bg-[var(--primary)] text-white',
      iconBg: 'bg-white/20 text-white',
      tagBg: 'bg-white/20 text-white border-white/40',
    },
    {
      bg: 'bg-[var(--deep)] text-white',
      iconBg: 'bg-[var(--primary)] text-white',
      tagBg: 'bg-white/20 text-white border-white/30',
    },
  ];

  return (
    <section id="services" className="py-20 sm:py-24 bg-[var(--background)] relative">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-block bg-[var(--tint-strong)] text-[var(--deep)] font-heading text-xs sm:text-sm font-bold px-4 py-1.5 rounded-full border-2 border-[var(--border)] hard-shadow-sm">
            {t.nav.services}
          </div>
          <h2 className="section-h2 font-heading font-extrabold text-[var(--deep)]">
            {t.services.h2}
          </h2>
          <p className="text-base sm:text-lg text-[var(--muted)] body-text">
            {t.services.sub}
          </p>
        </div>

        {/* 4 Chunky Cards Grid (Mobile 2x2, Desktop 4 in a row) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {t.services.items.map((service, idx) => {
            const style = cardStyles[idx % cardStyles.length];
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                whileHover={{ y: -6 }}
                className={`${style.bg} rounded-3xl p-7 border-2 border-[var(--border)] hard-shadow flex flex-col justify-between transition-transform duration-200`}
              >
                <div>
                  {/* Icon */}
                  <div
                    className={`w-16 h-16 rounded-2xl ${style.iconBg} border-2 border-current/20 flex items-center justify-center mb-6 hard-shadow-sm`}
                  >
                    {serviceIcons[idx]}
                  </div>

                  {/* Title */}
                  <h3 className="font-heading font-extrabold text-xl sm:text-2xl mb-3 leading-snug">
                    {service.title}
                  </h3>

                  {/* Two-line description */}
                  <p className="text-sm opacity-90 leading-relaxed body-text mb-6">
                    {service.desc}
                  </p>
                </div>

                {/* Tag Chips */}
                <div className="flex flex-wrap gap-2 pt-4 border-t border-current/10">
                  {service.tags.map((tag, tagIdx) => (
                    <span
                      key={tagIdx}
                      className={`text-xs font-heading font-bold px-2.5 py-1 rounded-lg border ${style.tagBg}`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
