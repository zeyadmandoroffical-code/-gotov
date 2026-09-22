// src/components/sections/DoctorStory.tsx
import React from 'react';
import { motion } from 'motion/react';
import { useLanguage } from '../../hooks/useLanguage';
import { Sticker } from '../ui/Sticker';
import { Camera, Play, CheckCircle2, Sparkles } from 'lucide-react';

export const DoctorStory: React.FC = () => {
  const { t, lang, dir } = useLanguage();

  return (
    <section className="py-20 sm:py-24 bg-[var(--surface)] border-y-2 border-[var(--border)] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left: Polaroid Photo rotated -3deg * dir */}
          <div className="lg:col-span-5 flex justify-center relative">
            <motion.div
              initial={{ rotate: 0, scale: 0.95 }}
              whileInView={{ rotate: -3 * dir, scale: 1 }}
              viewport={{ once: true }}
              transition={{ type: 'spring', stiffness: 220, damping: 20 }}
              className="relative bg-white p-4 pb-8 rounded-2xl border-2 border-[var(--border)] hard-shadow-lg max-w-[340px] sm:max-w-[380px] w-full"
            >
              {/* Photo Area (Doctor filming inside clinic) */}
              <div className="aspect-[4/3] rounded-xl overflow-hidden border border-[var(--border)] bg-gradient-to-br from-[#ece4fb] to-[#d9c9f7] relative flex flex-col items-center justify-center p-6 text-center">
                {/* Tripod and phone filming visual */}
                <div className="w-16 h-16 rounded-full bg-white text-[var(--deep)] border-2 border-[var(--border)] hard-shadow-sm flex items-center justify-center mb-3">
                  <Camera className="w-8 h-8 text-[var(--primary)]" />
                </div>
                <p className="font-heading font-extrabold text-sm text-[var(--deep)]">
                  {lang === 'ar' ? 'جلسة تصوير داخل العيادة' : 'On-Site Clinic Shoot'}
                </p>
                <span className="text-[11px] text-[var(--muted)] font-medium mt-1">
                  {lang === 'ar' ? 'تصوير محتوى طبي بدون مجهود' : 'Natural, Candid & Trust-Building'}
                </span>

                {/* Simulated recording red dot */}
                <div className="absolute top-3 end-3 flex items-center gap-1.5 bg-black/50 text-white text-[10px] font-mono px-2 py-0.5 rounded-full backdrop-blur-xs">
                  <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                  <span>REC</span>
                </div>
              </div>

              {/* Handwritten Caption with Lemonada font */}
              <div className="mt-4 text-center">
                <p className="font-hand font-bold text-base sm:text-lg text-[var(--deep)]">
                  {t.doctorStory.caption}
                </p>
              </div>

              {/* Overlapping Sticker */}
              <Sticker
                text={t.doctorStory.sticker}
                rotation={6}
                color="primary"
                className="absolute -bottom-4 -start-4 z-20"
              />
            </motion.div>
          </div>

          {/* Right: Story Text */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 bg-white text-[var(--deep)] font-heading text-xs sm:text-sm font-bold px-4 py-1.5 rounded-full border-2 border-[var(--border)] hard-shadow-sm">
              <Sparkles className="w-4 h-4 text-[var(--primary)]" />
              <span>{t.doctorStory.badge}</span>
            </div>

            <h3 className="section-h2 font-heading font-extrabold text-[var(--deep)] leading-tight">
              {lang === 'ar'
                ? 'من حساب هادئ.. لأجندة مواعيد ممتلئة بالكامل'
                : 'From a Quiet Social Page to a Fully Booked Clinic'}
            </h3>

            <p className="text-base sm:text-lg text-[var(--ink)] body-text leading-relaxed bg-white p-6 sm:p-8 rounded-3xl border-2 border-[var(--border)] hard-shadow">
              {t.doctorStory.story}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="flex items-center gap-2.5 text-sm font-bold text-[var(--deep)]">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                <span>{lang === 'ar' ? '40 فيديو قصير محترف' : '40 High-Yield Short Videos'}</span>
              </div>
              <div className="flex items-center gap-2.5 text-sm font-bold text-[var(--deep)]">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                <span>{lang === 'ar' ? 'صفحة حجز سريعة مخصصة' : 'High-Converting Booking Page'}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
