// src/components/layout/TrustMarquee.tsx
import React from 'react';
import { useLanguage } from '../../hooks/useLanguage';
import { trustLogos } from '../../data/trustLogos';
import { Award } from 'lucide-react';

export const TrustMarquee: React.FC = () => {
  const { t, lang } = useLanguage();

  return (
    <section className="bg-[var(--surface)] py-8 border-b-2 border-[var(--border)] overflow-hidden marquee-container select-none">
      <div className="max-w-7xl mx-auto px-4 mb-4 text-center">
        <span className="font-heading text-xs sm:text-sm font-bold uppercase tracking-wider text-[var(--muted)] inline-flex items-center gap-1.5">
          <Award className="w-4 h-4 text-[var(--primary)]" />
          {t.trustMarquee.heading}
        </span>
      </div>

      <div className="flex whitespace-nowrap animate-trust py-1">
        {/* Duplicate 3 times for continuous seamless scrolling */}
        {[0, 1, 2].map((loopIdx) => (
          <div key={loopIdx} className="flex items-center gap-4 sm:gap-6 px-3 shrink-0">
            {trustLogos.map((item) => (
              <div
                key={`${loopIdx}-${item.id}`}
                className="bg-white rounded-full px-5 py-2.5 border-2 border-[var(--border)] hard-shadow-sm flex items-center gap-3 transition-transform hover:-translate-y-1"
              >
                {/* Clinic Icon Badge */}
                <div className="w-6 h-6 rounded-full bg-[var(--tint-strong)] flex items-center justify-center text-[var(--deep)] font-bold text-xs shrink-0">
                  +
                </div>
                <div className="flex flex-col">
                  <span className="font-heading text-sm font-bold text-[var(--ink)] leading-tight">
                    {item.name[lang]}
                  </span>
                  <span className="text-[10px] text-[var(--muted)] font-medium">
                    {item.specialty[lang]}
                  </span>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
};
