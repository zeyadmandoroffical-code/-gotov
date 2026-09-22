// src/components/sections/Testimonials.tsx
import React from 'react';
import { motion } from 'motion/react';
import { useLanguage } from '../../hooks/useLanguage';
import { testimonialsData } from '../../data/testimonials';
import { MessageSquareQuote, Quote } from 'lucide-react';

export const Testimonials: React.FC = () => {
  const { t, lang, dir } = useLanguage();

  const bubbleStyles = [
    {
      card: 'bg-[var(--tint-strong)] text-[var(--ink)]',
      quoteIcon: 'text-[var(--deep)]/30',
      tailFill: '#d9c9f7',
      docColor: 'text-[var(--deep)]',
      subColor: 'text-[var(--muted)]',
    },
    {
      card: 'bg-[var(--primary)] text-white',
      quoteIcon: 'text-white/30',
      tailFill: '#5428b3',
      docColor: 'text-white',
      subColor: 'text-[var(--tint-strong)]',
    },
    {
      card: 'bg-white text-[var(--ink)]',
      quoteIcon: 'text-[var(--primary)]/20',
      tailFill: '#ffffff',
      docColor: 'text-[var(--deep)]',
      subColor: 'text-[var(--muted)]',
    },
  ];

  return (
    <section className="py-20 sm:py-28 bg-[var(--background)] relative">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-1.5 bg-[var(--tint)] text-[var(--deep)] font-heading text-xs sm:text-sm font-bold px-4 py-1.5 rounded-full border-2 border-[var(--border)] hard-shadow-sm">
            <MessageSquareQuote className="w-4 h-4 text-[var(--primary)]" />
            <span>{t.testimonials.h2}</span>
          </div>

          <h2 className="section-h2 font-heading font-extrabold text-[var(--deep)]">
            {t.testimonials.h2}
          </h2>

          <p className="text-base sm:text-lg text-[var(--muted)] body-text">
            {t.testimonials.sub}{' '}
            <span className="text-xs text-[var(--muted)] font-mono block sm:inline">
              {t.testimonials.sampleNotice}
            </span>
          </p>
        </div>

        {/* 3 Speech-Bubble Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {testimonialsData.map((item, idx) => {
            const style = bubbleStyles[idx % bubbleStyles.length];
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: idx * 0.12 }}
                whileHover={{ y: -6 }}
                className="relative flex flex-col transition-transform"
              >
                {/* Speech Bubble Container */}
                <div
                  className={`${style.card} rounded-3xl p-8 border-2 border-[var(--border)] hard-shadow relative flex flex-col justify-between flex-1 min-h-[220px]`}
                >
                  <Quote className={`w-10 h-10 ${style.quoteIcon} mb-3`} />

                  <p className="font-heading font-bold text-lg sm:text-xl leading-relaxed mb-6">
                    "{item.quote[lang]}"
                  </p>

                  <div className="pt-4 border-t border-current/15">
                    <h4 className={`font-heading font-extrabold text-base ${style.docColor}`}>
                      {item.doctor[lang]}
                    </h4>
                    <p className={`text-xs font-medium ${style.subColor}`}>
                      {item.specialty[lang]} · {item.city[lang]}
                    </p>
                  </div>

                  {/* Speech Bubble Tail */}
                  <div
                    className="absolute -bottom-4 start-10 w-6 h-6 overflow-hidden pointer-events-none"
                    style={{ transform: `scaleX(${dir})` }}
                  >
                    <svg viewBox="0 0 24 24" className="w-6 h-6">
                      <polygon
                        points="0,0 24,0 0,24"
                        fill={style.tailFill}
                        stroke="var(--border)"
                        strokeWidth="3"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
