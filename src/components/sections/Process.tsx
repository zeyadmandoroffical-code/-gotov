// src/components/sections/Process.tsx
import React, { useRef } from 'react';
import { motion, useScroll, useSpring } from 'motion/react';
import { useLanguage } from '../../hooks/useLanguage';
import { Search, Compass, Rocket, BarChart3, CheckCircle2 } from 'lucide-react';

export const Process: React.FC = () => {
  const { t } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 80%', 'end 60%'],
  });

  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 25 });

  const stepIcons = [
    <Search key="1" className="w-6 h-6 text-[var(--deep)]" />,
    <Compass key="2" className="w-6 h-6 text-[var(--deep)]" />,
    <Rocket key="3" className="w-6 h-6 text-[var(--deep)]" />,
    <BarChart3 key="4" className="w-6 h-6 text-[var(--deep)]" />,
  ];

  return (
    <section id="process" className="py-20 sm:py-28 bg-[var(--surface)] relative overflow-hidden">
      <div ref={containerRef} className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-block bg-[var(--tint-strong)] text-[var(--deep)] font-heading text-xs sm:text-sm font-bold px-4 py-1.5 rounded-full border-2 border-[var(--border)] hard-shadow-sm">
            {t.nav.process}
          </div>
          <h2 className="section-h2 font-heading font-extrabold text-[var(--deep)]">
            {t.process.h2}
          </h2>
          <p className="text-base sm:text-lg text-[var(--muted)] body-text">
            {t.process.sub}
          </p>
        </div>

        {/* Process Steps */}
        <div className="relative">
          {/* Desktop Connecting Line behind steps */}
          <div className="hidden lg:block absolute top-14 inset-x-12 h-1 bg-[var(--tint-strong)] z-0">
            <motion.div
              style={{ scaleX, transformOrigin: 'left' }}
              className="h-full bg-[var(--primary)]"
            />
          </div>

          {/* 4 Numbered Steps */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
            {t.process.steps.map((step, idx) => (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                whileHover={{ y: -6 }}
                className="bg-white rounded-3xl p-7 border-2 border-[var(--border)] hard-shadow flex flex-col justify-between transition-transform"
              >
                <div>
                  {/* Step Header: Circle with popping animation */}
                  <div className="flex items-center justify-between mb-6">
                    <motion.div
                      whileInView={{ scale: [0.5, 1.1, 1] }}
                      viewport={{ once: true }}
                      transition={{ type: 'spring', stiffness: 350, damping: 18, delay: idx * 0.15 }}
                      className="w-14 h-14 rounded-2xl bg-[var(--tint)] border-2 border-[var(--border)] hard-shadow-sm flex items-center justify-center font-heading font-extrabold text-xl text-[var(--deep)]"
                    >
                      {step.num}
                    </motion.div>

                    <div className="w-10 h-10 rounded-xl bg-[var(--surface)] border border-[var(--border)] flex items-center justify-center">
                      {stepIcons[idx]}
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="font-heading font-extrabold text-xl sm:text-2xl text-[var(--deep)] mb-3 leading-snug">
                    {step.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-[var(--muted)] body-text leading-relaxed">
                    {step.desc}
                  </p>
                </div>

                {/* Progress indicator */}
                <div className="pt-4 mt-6 border-t border-[var(--border)]/15 flex items-center gap-1.5 text-xs font-bold text-[var(--primary)]">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>{step.num === '04' ? 'متابعة مستمرة' : 'مرحلة أساسية'}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
