// src/components/sections/WorkLanding.tsx
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useLanguage } from '../../hooks/useLanguage';
import { landingPages, LandingPageItem } from '../../data/work';
import { ClinicDeviceFrame } from '../ui/ClinicDeviceFrame';
import { ClinicLandingRenderer } from '../work/ClinicLandingRenderer';
import { Button } from '../ui/Button';
import { 
  ExternalLink, 
  X, 
  Eye, 
  Sparkles, 
  Smartphone, 
  CheckCircle2, 
  ArrowUpRight,
  TrendingUp,
  ShieldCheck
} from 'lucide-react';

interface LandingCardProps {
  item: LandingPageItem;
  frameType?: 'phone' | 'browser';
  onSelect: (item: LandingPageItem) => void;
}

const LandingCard: React.FC<LandingCardProps> = ({ item, frameType = 'phone', onSelect }) => {
  const { lang } = useLanguage();
  const isAr = lang === 'ar';

  const getSlug = (id: string) => {
    if (id === 'lp-01') return 'dr-ibrahim.docera-app.vercel.app';
    if (id === 'lp-02') return 'dr-nourhan.docera-app.vercel.app';
    return 'dentamax-center.docera-app.vercel.app';
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.35 }}
      className="flex flex-col group"
    >
      {/* Device Frame with Live Interactive Iframe */}
      <div className="relative">
        <ClinicDeviceFrame
          frameType={frameType}
          url={getSlug(item.id)}
          isInteractive={true}
        >
          <ClinicLandingRenderer item={item} />
        </ClinicDeviceFrame>
      </div>

      {/* Meta info underneath */}
      <div className="mt-4 px-1 flex flex-col space-y-2">
        <div className="flex items-center justify-between gap-2">
          <h4 className="font-heading font-extrabold text-base sm:text-lg text-[var(--ink)] leading-tight truncate">
            {item.doctor[lang]}
          </h4>
          <span className="text-[10px] font-heading font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-md border border-emerald-200 shrink-0 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>{isAr ? 'موقع حي مباشر' : 'Live Demo'}</span>
          </span>
        </div>

        {/* Highlight Result Pill */}
        <div className="flex items-center gap-1.5 text-xs font-bold text-[var(--primary)]">
          <TrendingUp className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
          <span className="line-clamp-1">{item.result[lang]}</span>
        </div>

        {/* Sub headline summary */}
        <p className="text-[11px] text-[var(--muted)] line-clamp-1">
          {item.headline[lang]}
        </p>

        {/* Action Buttons Row */}
        <div className="pt-2 flex items-center gap-2">
          <button
            type="button"
            onClick={() => onSelect(item)}
            className="flex-1 py-2 px-3 rounded-xl bg-white hover:bg-[var(--tint)] text-[var(--deep)] border-2 border-[var(--border)] hard-shadow-sm text-xs font-heading font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
          >
            <Eye className="w-3.5 h-3.5 text-[var(--primary)]" />
            <span>{isAr ? 'تحليل الاستراتيجية والأرقام' : 'Strategy & Results'}</span>
          </button>

          <a
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-xl bg-[var(--tint-strong)] hover:bg-[var(--tint)] text-[var(--deep)] border-2 border-[var(--border)] hard-shadow-sm text-xs flex items-center justify-center transition-colors"
            title={isAr ? 'فتح الموقع في نافذة كاملة' : 'Open in full window'}
          >
            <ArrowUpRight className="w-4 h-4 text-[var(--deep)]" />
          </a>
        </div>
      </div>
    </motion.div>
  );
};

export const WorkLanding: React.FC = () => {
  const { t, lang } = useLanguage();
  const isAr = lang === 'ar';
  const [activeTab, setActiveTab] = useState<string>('all');
  const [selectedItem, setSelectedItem] = useState<LandingPageItem | null>(null);

  // Tabs for the 3 real screens
  const tabs = [
    { key: 'all', label: isAr ? 'الكل (3 صفحات هبوط)' : 'All (3 Landing Pages)' },
    { key: 'lp-01', label: isAr ? 'د. ابراهيم الغرباوي' : 'Dr. Ibrahim El-Gharabawy' },
    { key: 'lp-02', label: isAr ? 'د. نورهان عاطف' : 'Dr. Nourhan Atef' },
    { key: 'lp-03', label: isAr ? 'مركز دينتاماكس' : 'Dentamax Center' },
  ];

  const filteredItems =
    activeTab === 'all'
      ? landingPages
      : landingPages.filter((lp) => lp.id === activeTab);

  // Close lightbox on Esc
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedItem(null);
    };
    if (selectedItem) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [selectedItem]);

  return (
    <section id="work" className="py-20 sm:py-28 bg-[var(--surface)] border-b-2 border-[var(--border)] relative">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-3.5">
          <div className="inline-flex items-center gap-1.5 bg-[var(--tint-strong)] text-[var(--deep)] font-heading text-xs sm:text-sm font-bold px-4 py-1.5 rounded-full border-2 border-[var(--border)] hard-shadow-sm">
            <Sparkles className="w-4 h-4 text-[var(--primary)]" />
            <span>{t.nav.work} · {isAr ? 'صفحات بتحوّل الضغطة لحجز' : 'High-Converting Landing Pages'}</span>
          </div>

          <h2 className="section-h2 font-heading font-extrabold text-[var(--deep)]">
            {t.workLanding.h2}
          </h2>

          <p className="text-base sm:text-lg text-[var(--muted)] body-text">
            {isAr
              ? 'صفحات هبوط طبية سريعة ومصممة خصيصًا لتحويل الزائر المتردد لمريض حاجز كشفه.'
              : 'Fast, mobile-first dental & medical landing pages engineered to turn ad clicks into booked clinic appointments.'}
          </p>
        </div>

        {/* Filter Bar Row */}
        <div className="flex justify-center mb-12">
          {/* Filter Tabs */}
          <div className="flex items-center overflow-x-auto no-scrollbar max-w-full p-1 bg-white rounded-2xl border-2 border-[var(--border)] hard-shadow-sm">
            {tabs.map((tab) => {
              const isActive = activeTab === tab.key;
              return (
                <button
                  key={tab.key}
                  type="button"
                  onClick={() => setActiveTab(tab.key)}
                  className={`relative px-3.5 sm:px-5 py-2 rounded-xl text-xs sm:text-sm font-heading font-bold transition-colors whitespace-nowrap select-none ${
                    isActive ? 'text-white' : 'text-[var(--ink)] hover:text-[var(--primary)]'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="tab-pill-landing"
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                      className="absolute inset-0 bg-[var(--primary)] rounded-xl border border-[var(--border)] shadow-sm"
                    />
                  )}
                  <span className="relative z-10">{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 3-Column Grid for the 3 cases */}
        <motion.div 
          layout 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 items-start max-w-6xl mx-auto"
        >
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item) => (
              <LandingCard 
                key={item.id} 
                item={item} 
                frameType="phone"
                onSelect={(selected) => setSelectedItem(selected)} 
              />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Interactive Hover Tip Note */}
        <div className="mt-12 text-center text-xs text-[var(--muted)] font-heading flex items-center justify-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>{isAr ? 'يمكنك التمرير والتفاعل المباشر داخل شاشة أي هاتف، أو فتح النموذج كاملاً من زر الرابط المباشر.' : 'Interact and scroll directly inside any phone frame, or open the full live deployment via the direct link button.'}</span>
        </div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 md:p-8">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setSelectedItem(null)}
              className="absolute inset-0 bg-[var(--deep)]/80 backdrop-blur-sm"
              aria-label="Close modal backdrop"
            />

            {/* Modal Panel */}
            <motion.div
              initial={{ scale: 0.94, y: 14, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.94, y: 14, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 260, damping: 24 }}
              className="relative z-10 w-full max-w-5xl max-h-[92vh] bg-white rounded-3xl border-2 border-[var(--border)] hard-shadow-lg flex flex-col overflow-hidden"
              role="dialog"
              aria-modal="true"
            >
              {/* Modal Header */}
              <div className="px-5 py-3.5 border-b-2 border-[var(--border)] bg-[var(--tint)] flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-emerald-500 shrink-0" />
                  <div>
                    <h3 className="font-heading font-extrabold text-base sm:text-lg text-[var(--deep)] leading-tight">
                      {selectedItem.doctor[lang]}
                    </h3>
                    <span className="text-xs text-[var(--muted)] font-medium">
                      {selectedItem.headline[lang]}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2.5">
                  {selectedItem.url && (
                    <Button
                      asAnchor
                      href={selectedItem.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      variant="primary"
                      size="sm"
                      className="hidden sm:flex items-center gap-1.5 text-xs py-1.5 px-3"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>{t.workLanding.visitLive}</span>
                    </Button>
                  )}
                  <button
                    type="button"
                    onClick={() => setSelectedItem(null)}
                    className="w-9 h-9 rounded-xl bg-white text-[var(--deep)] border-2 border-[var(--border)] flex items-center justify-center hard-shadow-sm pressable-btn"
                    aria-label={t.workLanding.close}
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Modal Body */}
              <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-[var(--surface)]">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                  {/* Left: Device Preview in Phone Frame (5 cols) */}
                  <div className="lg:col-span-5 flex flex-col items-center">
                    <div className="flex items-center gap-2 text-xs font-heading font-bold text-[var(--deep)] mb-3 self-start">
                      <Smartphone className="w-4 h-4 text-[var(--primary)]" />
                      <span>{isAr ? 'تصفح حي كامل داخل فريم الهاتف' : 'Live Interactive Mobile Frame'}</span>
                    </div>

                    <div className="w-full max-w-[320px] rounded-[36px] p-2 bg-zinc-950 border-2 border-[var(--border)] hard-shadow">
                      <div className="rounded-[28px] overflow-hidden border border-zinc-800 bg-white h-[520px] sm:h-[560px] relative">
                        <ClinicLandingRenderer item={selectedItem} />
                      </div>
                    </div>
                  </div>

                  {/* Right: Architecture & Results Analysis (7 cols) */}
                  <div className="lg:col-span-7 space-y-4">
                    <div className="flex items-center gap-2 text-xs font-heading font-bold text-[var(--deep)]">
                      <ShieldCheck className="w-4 h-4 text-emerald-600" />
                      <span>{isAr ? 'استراتيجية التحويل وراء هذا النموذج' : 'Conversion Strategy & Clinic Results'}</span>
                    </div>

                    {/* Result Card */}
                    <div className="bg-white p-4 rounded-2xl border-2 border-[var(--border)] hard-shadow-sm space-y-2">
                      <div className="text-xs text-[var(--muted)] font-bold">
                        {isAr ? 'النتيجة المحققة لعيادة الطبيب' : 'Measured Clinic Outcome'}
                      </div>
                      <div className="text-lg sm:text-xl font-heading font-extrabold text-[var(--primary)]">
                        {selectedItem.result[lang]}
                      </div>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        {isAr
                          ? 'تصميم الصفحة يعتمد على إزالة أي ارتباك لدى المريض، إبراز الاعتمادات الطبية فورًا، وتوفير مسار حجز سريع ومباشر عبر واتساب والاتصال.'
                          : 'Engineered to eliminate patient hesitation, highlight medical authority instantly, and provide frictionless one-tap booking via WhatsApp and phone.'}
                      </p>
                    </div>

                    {/* 3 Conversion Pillars */}
                    <div className="space-y-2">
                      <div className="p-3 bg-white rounded-xl border border-[var(--border)] flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <div>
                          <div className="font-heading font-bold text-xs text-[var(--deep)]">
                            {isAr ? 'تشخيص صريح قبل أي خطوة' : 'Clear upfront diagnosis'}
                          </div>
                          <div className="text-[11px] text-slate-500">
                            {isAr ? 'المريض يعرف بالضبط خطة العلاج وتفاصيل الجلسة الأولى قبل الحجز.' : 'Patients understand the exact procedure and step-by-step roadmap before scheduling.'}
                          </div>
                        </div>
                      </div>

                      <div className="p-3 bg-white rounded-xl border border-[var(--border)] flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                        <div>
                          <div className="font-heading font-bold text-xs text-[var(--deep)]">
                            {isAr ? 'إبراز التعقيم والأجهزة الرقمية' : 'Sterility & 3D digital imaging proof'}
                          </div>
                          <div className="text-[11px] text-slate-500">
                            {isAr ? 'صور وفيديوهات حقيقية للعيادة تعزز ثقة المرضى وتكسر حاجز الخوف.' : 'Authentic clinic visuals that reassure patients and dissolve fear of pain.'}
                          </div>
                        </div>
                      </div>

                      <div className="p-3 bg-white rounded-xl border border-[var(--border)] flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-purple-600 shrink-0 mt-0.5" />
                        <div>
                          <div className="font-heading font-bold text-xs text-[var(--deep)]">
                            {isAr ? 'زر واتساب عائم بدون تشتيت' : 'Direct floating WhatsApp coordination'}
                          </div>
                          <div className="text-[11px] text-slate-500">
                            {isAr ? 'ربط المريض مباشرة بمنسق المواعيد للإجابة عن الأسئلة وتثبيت الموعد.' : 'Instant connection to the clinic receptionist for swift calendar confirmation.'}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Mobile live link button */}
                    {selectedItem.url && (
                      <div className="pt-2">
                        <Button
                          asAnchor
                          href={selectedItem.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          variant="white"
                          size="md"
                          className="w-full justify-center flex items-center gap-2 text-xs"
                        >
                          <ExternalLink className="w-4 h-4" />
                          <span>{isAr ? 'فتح النسخة المباشرة على Vercel' : 'Open live deployment on Vercel'}</span>
                          <ArrowUpRight className="w-4 h-4" />
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="px-6 py-3.5 bg-white border-t-2 border-[var(--border)] flex items-center justify-between text-xs font-bold text-[var(--deep)]">
                <span>{selectedItem.doctor[lang]}</span>
                <span className="text-[var(--muted)] text-[11px]">
                  Go2Viral High-Conversion Medical Architecture
                </span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
