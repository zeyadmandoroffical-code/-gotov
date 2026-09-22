// src/components/sections/Results.tsx
import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView, animate } from 'motion/react';
import { useLanguage } from '../../hooks/useLanguage';
import { statsData, caseStudyChart } from '../../data/stats';
import { Wave } from '../ui/Wave';
import { TrendingUp, Sparkles, Calendar, DollarSign } from 'lucide-react';

interface CountUpProps {
  target: number;
  prefix?: string;
  suffix?: string;
}

const CountUp: React.FC<CountUpProps> = ({ target, prefix = '', suffix = '' }) => {
  const [value, setValue] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  useEffect(() => {
    if (!isInView) return;
    const controls = animate(0, target, {
      duration: 1.6,
      ease: 'easeOut',
      onUpdate: (latest) => {
        setValue(Math.round(latest));
      },
    });
    return () => controls.stop();
  }, [isInView, target]);

  return (
    <span ref={ref} dir="ltr" className="inline-block font-heading font-extrabold">
      {prefix}
      {value}
      {suffix}
    </span>
  );
};

export const Results: React.FC = () => {
  const { t, lang } = useLanguage();
  const chartRef = useRef<HTMLDivElement>(null);
  const isChartInView = useInView(chartRef, { once: true, amount: 0.3 });

  // SVG Chart Dimensions
  const chartWidth = 500;
  const chartHeight = 220;
  const paddingX = 40;
  const paddingY = 30;

  // Normalize points for SVG path
  // Points: (Month 1: 42), (Month 2: 88), (Month 3: 131)
  const maxVal = 150;
  const points = caseStudyChart.map((pt, idx) => {
    const x = paddingX + (idx / (caseStudyChart.length - 1)) * (chartWidth - paddingX * 2);
    const y = chartHeight - paddingY - (pt.bookings / maxVal) * (chartHeight - paddingY * 2);
    return { x, y, pt };
  });

  // Smooth cubic Bezier or clean line path
  const linePath = `M ${points[0].x} ${points[0].y} Q ${(points[0].x + points[1].x) / 2} ${points[0].y}, ${points[1].x} ${points[1].y} T ${points[2].x} ${points[2].y}`;
  const areaPath = `${linePath} L ${points[2].x} ${chartHeight - paddingY} L ${points[0].x} ${chartHeight - paddingY} Z`;

  return (
    <section id="results" className="relative bg-[var(--deep)] text-white pt-0 pb-0 overflow-hidden">
      {/* Wavy top edge (Effect 3) */}
      <Wave fillColor="var(--background)" flip />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 py-16 sm:py-24 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-1.5 bg-white/10 text-[var(--tint-strong)] font-heading text-xs sm:text-sm font-bold px-4 py-1.5 rounded-full border border-white/20">
            <Sparkles className="w-4 h-4 text-[var(--tint-strong)]" />
            <span>{t.nav.results}</span>
          </div>

          <h2 className="section-h2 font-heading font-extrabold text-white">
            {t.results.h2}
          </h2>

          <p className="text-base sm:text-lg text-white/80 body-text">
            {t.results.sub}{' '}
            <span className="text-[var(--tint-strong)] text-sm font-medium">
              {t.results.sampleNotice}
            </span>
          </p>
        </div>

        {/* 4 White Stat Cards (Count-Up) */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-12">
          {statsData.map((stat, idx) => (
            <motion.div
              key={stat.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: idx * 0.08, duration: 0.5 }}
              whileHover={{ y: -6 }}
              className="bg-white text-[var(--deep)] rounded-3xl p-6 sm:p-7 border-2 border-[var(--border)] hard-shadow flex flex-col justify-between transition-transform"
            >
              <div className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[var(--primary)] mb-2">
                <CountUp
                  target={stat.target}
                  prefix={stat.prefix}
                  suffix={stat.suffix}
                />
              </div>

              <div className="flex flex-col">
                <span className="font-heading font-extrabold text-sm sm:text-base text-[var(--ink)] leading-snug">
                  {stat.label[lang]}
                </span>
                <span className="text-[10px] text-[var(--muted)] mt-1 font-mono">
                  {stat.sampleTag}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Big White Card: Animated Line Chart + Case Story */}
        <div
          ref={chartRef}
          className="bg-white text-[var(--ink)] rounded-3xl p-6 sm:p-10 border-2 border-[var(--border)] hard-shadow-lg"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left/Start: Animated SVG Line Chart (7 cols) */}
            <div className="lg:col-span-7 flex flex-col">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="font-heading font-extrabold text-xl sm:text-2xl text-[var(--deep)] leading-tight">
                    {t.results.chartTitle}
                  </h3>
                  <p className="text-xs text-[var(--muted)] font-medium">
                    {t.results.chartSubtitle}
                  </p>
                </div>

                <span className="text-xs font-bold bg-[var(--tint)] text-[var(--deep)] px-3 py-1 rounded-full border border-[var(--border)]">
                  +212% {lang === 'ar' ? 'نمو كلي' : 'Growth'}
                </span>
              </div>

              {/* Responsive SVG Chart */}
              <div className="w-full bg-[var(--surface)] rounded-2xl p-4 border border-[var(--border)]/20 relative overflow-hidden">
                <svg
                  viewBox={`0 0 ${chartWidth} ${chartHeight}`}
                  className="w-full h-auto overflow-visible"
                >
                  <defs>
                    <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#5428b3" stopOpacity="0.35" />
                      <stop offset="100%" stopColor="#5428b3" stopOpacity="0.0" />
                    </linearGradient>
                  </defs>

                  {/* Horizontal Guideline lines */}
                  {[40, 80, 120].map((level) => {
                    const y = chartHeight - paddingY - (level / maxVal) * (chartHeight - paddingY * 2);
                    return (
                      <g key={level}>
                        <line
                          x1={paddingX}
                          y1={y}
                          x2={chartWidth - paddingX}
                          y2={y}
                          stroke="#d9c9f7"
                          strokeDasharray="4 4"
                          strokeWidth="1.5"
                        />
                        <text
                          x={paddingX - 8}
                          y={y + 4}
                          textAnchor="end"
                          fontSize="10"
                          fill="#5b4d78"
                          fontFamily="sans-serif"
                        >
                          {level}
                        </text>
                      </g>
                    );
                  })}

                  {/* Area fill */}
                  <motion.path
                    d={areaPath}
                    fill="url(#chartGradient)"
                    initial={{ opacity: 0 }}
                    animate={isChartInView ? { opacity: 1 } : { opacity: 0 }}
                    transition={{ delay: 1.0, duration: 0.8 }}
                  />

                  {/* Line path with pathLength animation */}
                  <motion.path
                    d={linePath}
                    fill="none"
                    stroke="var(--primary)"
                    strokeWidth="4"
                    strokeLinecap="round"
                    initial={{ pathLength: 0 }}
                    animate={isChartInView ? { pathLength: 1 } : { pathLength: 0 }}
                    transition={{ duration: 1.4, ease: 'easeInOut' }}
                  />

                  {/* Data Points popping in */}
                  {points.map((p, i) => (
                    <g key={i}>
                      <motion.circle
                        cx={p.x}
                        cy={p.y}
                        r="7"
                        fill="white"
                        stroke="var(--deep)"
                        strokeWidth="3.5"
                        initial={{ scale: 0 }}
                        animate={isChartInView ? { scale: 1 } : { scale: 0 }}
                        transition={{
                          type: 'spring',
                          stiffness: 300,
                          damping: 18,
                          delay: 1.2 + i * 0.12,
                        }}
                      />
                      {/* Label badge above point */}
                      <motion.g
                        initial={{ opacity: 0, y: 10 }}
                        animate={isChartInView ? { opacity: 1, y: 0 } : { opacity: 0 }}
                        transition={{ delay: 1.4 + i * 0.12 }}
                      >
                        <rect
                          x={p.x - 22}
                          y={p.y - 30}
                          width="44"
                          height="20"
                          rx="6"
                          fill="var(--deep)"
                        />
                        <text
                          x={p.x}
                          y={p.y - 16}
                          textAnchor="middle"
                          fill="#ffffff"
                          fontSize="10"
                          fontWeight="bold"
                          fontFamily="sans-serif"
                        >
                          {p.pt.bookings}
                        </text>
                      </motion.g>

                      {/* Month label along bottom */}
                      <text
                        x={p.x}
                        y={chartHeight - 8}
                        textAnchor="middle"
                        fontSize="11"
                        fontWeight="bold"
                        fill="#1a0b36"
                      >
                        {p.pt.month[lang]}
                      </text>
                    </g>
                  ))}
                </svg>
              </div>
            </div>

            {/* Right/End: Case Story (5 cols) */}
            <div className="lg:col-span-5 space-y-5 bg-[var(--surface)] p-6 sm:p-8 rounded-2xl border-2 border-[var(--border)]">
              <div className="inline-flex items-center gap-2 bg-[var(--tint-strong)] px-3 py-1 rounded-full border border-[var(--border)] text-xs font-heading font-bold text-[var(--deep)]">
                <TrendingUp className="w-3.5 h-3.5" />
                <span>{lang === 'ar' ? 'دراسة حالة واقعية' : 'Clinic Case Study'}</span>
              </div>

              <h4 className="font-heading font-extrabold text-xl sm:text-2xl text-[var(--deep)] leading-tight">
                {lang === 'ar' ? 'من استفسارات عشوائية لجدول مواعيد مكتمل' : 'From Inquiries to a Fully Booked Calendar'}
              </h4>

              <p className="text-sm sm:text-base text-[var(--muted)] body-text leading-relaxed">
                {t.results.caseStory}
              </p>

              <div className="pt-4 border-t border-[var(--border)]/20 grid grid-cols-2 gap-4">
                <div className="bg-white p-3.5 rounded-xl border border-[var(--border)]/40">
                  <div className="flex items-center gap-1.5 text-xs text-[var(--muted)] font-bold mb-1">
                    <Calendar className="w-3.5 h-3.5 text-[var(--primary)]" />
                    <span>{lang === 'ar' ? 'المعدل الأسبوعي' : 'Weekly Rate'}</span>
                  </div>
                  <div className="text-lg font-heading font-extrabold text-[var(--deep)]">
                    32+ {lang === 'ar' ? 'كشف' : 'Consults'}
                  </div>
                </div>

                <div className="bg-white p-3.5 rounded-xl border border-[var(--border)]/40">
                  <div className="flex items-center gap-1.5 text-xs text-[var(--muted)] font-bold mb-1">
                    <DollarSign className="w-3.5 h-3.5 text-emerald-600" />
                    <span>{lang === 'ar' ? 'العائد على الإعلان' : 'ROAS'}</span>
                  </div>
                  <div className="text-lg font-heading font-extrabold text-emerald-700">
                    4.8x
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Wavy bottom edge (Effect 3) */}
      <Wave fillColor="var(--surface)" />
    </section>
  );
};
