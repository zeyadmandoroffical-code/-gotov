// src/components/layout/Ticker.tsx
import React from 'react';
import { useLanguage } from '../../hooks/useLanguage';

export const Ticker: React.FC = () => {
  const { t } = useLanguage();
  const items = t.ticker.split('·').map((s) => s.trim()).filter(Boolean);

  return (
    <div
      className="h-10 bg-[var(--deep)] text-white overflow-hidden border-b-2 border-[var(--deep)] flex items-center marquee-container select-none z-30 relative"
      role="region"
      aria-label="Announcements"
    >
      <div className="flex whitespace-nowrap animate-ticker font-heading text-xs sm:text-sm tracking-wide font-bold uppercase">
        {/* Render 3 sets for smooth, gapless infinite CSS marquee loop */}
        {[0, 1, 2].map((loopIdx) => (
          <div key={loopIdx} className="flex items-center shrink-0">
            {items.map((item, idx) => (
              <span key={`${loopIdx}-${idx}`} className="inline-flex items-center px-4">
                <span>{item}</span>
                <span className="ms-4 text-[var(--tint-strong)] font-bold opacity-60">·</span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};
