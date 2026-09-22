// src/components/ui/PlaceholderLandingPage.tsx
// Rich simulation of a long medical landing page for hover-scroll demos
import React from 'react';
import { Calendar, PhoneCall, CheckCircle, Clock, Award, Star, UserCheck, ShieldCheck } from 'lucide-react';
import { LandingPageItem } from '../../data/work';
import { useLanguage } from '../../hooks/useLanguage';

interface PlaceholderLandingPageProps {
  item: LandingPageItem;
}

export const PlaceholderLandingPage: React.FC<PlaceholderLandingPageProps> = ({ item }) => {
  const { lang } = useLanguage();
  const doctorName = item.doctor[lang];
  const headline = item.headline[lang];

  return (
    <div className="w-full text-slate-800 bg-white select-none text-[11px] leading-snug">
      {/* Sample Watermark Pill */}
      <div className="sticky top-2 start-2 z-20 inline-block bg-[var(--deep)] text-white text-[10px] font-bold px-2 py-0.5 rounded shadow">
        Sample Landing Page
      </div>

      {/* Top Banner / Clinic Bar */}
      <div className="bg-[var(--deep)] text-white px-4 py-2 flex items-center justify-between text-[10px]">
        <span className="font-bold tracking-tight truncate">{doctorName}</span>
        <span className="flex items-center gap-1 bg-white/10 px-2 py-0.5 rounded text-[9px]">
          <Clock className="w-2.5 h-2.5 text-[var(--tint-strong)]" />
          {lang === 'ar' ? 'مواعيد اليوم متاحة' : 'Appointments Available Today'}
        </span>
      </div>

      {/* Hero section */}
      <div className="p-4 bg-gradient-to-b from-[var(--surface)] to-white border-b border-[var(--border)]/20">
        <div className="inline-block bg-[var(--tint-strong)] text-[var(--ink)] font-bold text-[9px] px-2 py-0.5 rounded-full mb-2">
          {item.specialty.toUpperCase()}
        </div>
        <h4 className="text-[13px] font-bold text-[var(--deep)] leading-tight mb-2">
          {headline}
        </h4>
        <p className="text-[10px] text-[var(--muted)] mb-3 leading-relaxed">
          {lang === 'ar'
            ? 'احجز كشفك الآن مع د. ' + doctorName + ' بأحدث الأجهزة والتقنيات الطبية المعتمدة.'
            : 'Book your consult today with ' + doctorName + ' using international medical protocols.'}
        </p>
        
        {/* Quick Booking CTA Box */}
        <div className="bg-white rounded-xl p-3 border border-[var(--border)] shadow-sm flex flex-col gap-1.5">
          <div className="flex items-center justify-between text-[10px] font-bold text-[var(--deep)]">
            <span className="flex items-center gap-1">
              <Calendar className="w-3 h-3 text-[var(--primary)]" />
              {lang === 'ar' ? 'حجز موعد كشف مباشر' : 'Fast-Track Appointment'}
            </span>
            <span className="text-[9px] text-emerald-600 font-bold">
              {lang === 'ar' ? 'مؤكد 100%' : 'Instant Confirm'}
            </span>
          </div>
          <div className="w-full bg-[var(--primary)] text-white text-center py-1.5 rounded-lg font-bold text-[10px] flex items-center justify-center gap-1 shadow-sm">
            <PhoneCall className="w-2.5 h-2.5" />
            {lang === 'ar' ? 'احجز عبر واتساب أو اتصال' : 'Schedule on WhatsApp'}
          </div>
        </div>
      </div>

      {/* Doctor Credentials & Trust Points */}
      <div className="p-4 bg-[var(--surface)] border-b border-[var(--border)]/20">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-10 h-10 rounded-full bg-[var(--tint-strong)] border border-[var(--border)] flex items-center justify-center shrink-0">
            <Award className="w-5 h-5 text-[var(--deep)]" />
          </div>
          <div>
            <div className="font-bold text-[11px] text-[var(--deep)]">{doctorName}</div>
            <div className="text-[9px] text-[var(--muted)]">
              {lang === 'ar' ? 'عضو الجمعية الدولية للتخصص · خبرة 12+ سنة' : 'Board Certified Specialist · 12+ Yrs Exp'}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <div className="bg-white p-2 rounded-lg border border-[var(--border)]/30 text-[9px] flex items-center gap-1.5">
            <CheckCircle className="w-3 h-3 text-emerald-600 shrink-0" />
            <span>{lang === 'ar' ? 'تشخيص دقيق' : 'Precision Care'}</span>
          </div>
          <div className="bg-white p-2 rounded-lg border border-[var(--border)]/30 text-[9px] flex items-center gap-1.5">
            <ShieldCheck className="w-3 h-3 text-[var(--primary)] shrink-0" />
            <span>{lang === 'ar' ? 'تعقيم معتمد' : 'Sterile Clinic'}</span>
          </div>
        </div>
      </div>

      {/* Services Grid on the landing page */}
      <div className="p-4 space-y-2 border-b border-[var(--border)]/20">
        <div className="text-[10px] font-bold text-[var(--deep)] uppercase tracking-wide">
          {lang === 'ar' ? 'الخدمات والإجراءات الطبية' : 'Clinic Treatments'}
        </div>
        {[1, 2, 3].map((idx) => (
          <div key={idx} className="p-2 bg-white rounded-lg border border-slate-200 flex items-center justify-between">
            <div>
              <div className="font-bold text-[10px] text-slate-800">
                {lang === 'ar' ? `جلسة علاجية رقم ${idx}` : `Treatment Protocol ${idx}`}
              </div>
              <div className="text-[8px] text-slate-500">
                {lang === 'ar' ? 'فحص شامل وخطة علاجية واضحة' : 'Includes complete diagnostic scan'}
              </div>
            </div>
            <span className="text-[9px] font-bold text-[var(--primary)] bg-[var(--tint)] px-2 py-0.5 rounded">
              {lang === 'ar' ? 'تفاصيل' : 'Details'}
            </span>
          </div>
        ))}
      </div>

      {/* Reviews snippet */}
      <div className="p-4 bg-[var(--surface)] border-b border-[var(--border)]/20">
        <div className="flex items-center gap-1 mb-2">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="w-2.5 h-2.5 fill-amber-400 text-amber-400" />
          ))}
          <span className="text-[9px] font-bold text-slate-700 ms-1">4.9 / 5.0 (240+ reviews)</span>
        </div>
        <p className="text-[9px] italic text-slate-600 bg-white p-2.5 rounded-lg border border-slate-200">
          {lang === 'ar'
            ? '«تجربة كشف ممتازة وراحة تامة، دقة في المواعيد واهتمام فائق بالتفاصيل.»'
            : '"Flawless patient experience from the initial booking to full recovery."'}
        </p>
      </div>

      {/* Bottom Sticky Booking Bar */}
      <div className="p-4 bg-[var(--deep)] text-white text-center">
        <div className="text-[11px] font-bold mb-1">
          {lang === 'ar' ? 'جاهز لحجز كشفك الآن؟' : 'Ready to confirm your consult?'}
        </div>
        <div className="inline-flex items-center justify-center gap-1.5 bg-[var(--tint-strong)] text-[var(--ink)] font-bold px-4 py-1.5 rounded-lg text-[10px] shadow">
          <UserCheck className="w-3 h-3 text-[var(--deep)]" />
          {lang === 'ar' ? 'تواصل مع منسق المواعيد' : 'Message Clinic Coordinator'}
        </div>
        <div className="text-[8px] text-white/60 mt-2">
          {lang === 'ar' ? 'مواعيد الاستشارة: السبت إلى الخميس 12 م - 9 م' : 'Clinic Hours: Sat - Thu 12 PM - 9 PM'}
        </div>
      </div>
    </div>
  );
};
