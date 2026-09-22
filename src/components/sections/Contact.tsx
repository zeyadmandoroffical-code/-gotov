// src/components/sections/Contact.tsx
import React, { useState } from 'react';
import { useLanguage } from '../../hooks/useLanguage';
import { WHATSAPP_NUMBER } from '../../data/config';
import { Button } from '../ui/Button';
import { MessageCircle, Send, CheckCircle2, Shield, Clock } from 'lucide-react';

export const Contact: React.FC = () => {
  const { t, lang } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    specialty: 'dermatology',
    whatsapp: '',
    budget: 'growth',
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const selectedSpecialtyObj = t.contact.specialtiesList.find(
      (s) => s.value === formData.specialty
    );
    const selectedBudgetObj = t.contact.budgetList.find(
      (b) => b.value === formData.budget
    );

    const specialtyName = selectedSpecialtyObj ? selectedSpecialtyObj.label : formData.specialty;
    const budgetName = selectedBudgetObj ? selectedBudgetObj.label : formData.budget;

    const messageText =
      lang === 'ar'
        ? `مرحباً Go2Viral!\nأرغب في الحصول على تحليل تسويقي مجاني لعيادتي:\n\n` +
          `• الاسم واللقب: ${formData.name}\n` +
          `• التخصص الطبي: ${specialtyName}\n` +
          `• رقم الواتساب: ${formData.whatsapp}\n` +
          `• الميزانية الشهرية المقترحة: ${budgetName}`
        : `Hello Go2Viral team!\nI would like to request a free clinic marketing audit:\n\n` +
          `• Name & Title: ${formData.name}\n` +
          `• Medical Specialty: ${specialtyName}\n` +
          `• WhatsApp: ${formData.whatsapp}\n` +
          `• Monthly Budget: ${budgetName}`;

    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(messageText)}`;
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  const directWhatsappLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    lang === 'ar'
      ? 'مرحباً جو تو فايرال! حابب أعرف أكتر عن خدمات تسويق الأطباء والعيادات.'
      : 'Hello Go2Viral! I would like to learn more about clinic marketing services.'
  )}`;

  return (
    <section id="contact" className="py-20 sm:py-28 bg-[var(--surface)] border-t-2 border-[var(--border)] relative">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Heading, Promise, Direct WhatsApp Button (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-2 bg-white text-[var(--deep)] font-heading text-xs sm:text-sm font-bold px-4 py-1.5 rounded-full border-2 border-[var(--border)] hard-shadow-sm">
              <Clock className="w-4 h-4 text-[var(--primary)]" />
              <span>{lang === 'ar' ? 'رد سريع خلال 24 ساعة' : 'Fast 24-Hour Response'}</span>
            </div>

            <h2 className="section-h2 font-heading font-extrabold text-[var(--deep)] leading-tight">
              {t.contact.h2}
            </h2>

            <p className="text-base sm:text-lg text-[var(--muted)] body-text leading-relaxed">
              {t.contact.sub}
            </p>

            <div className="pt-4 space-y-4">
              <Button
                asAnchor
                href={directWhatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                variant="primary"
                size="lg"
                className="w-full sm:w-auto flex items-center justify-center gap-2.5 text-base"
              >
                <MessageCircle className="w-5 h-5 fill-current" />
                <span>{t.contact.directWhatsapp}</span>
              </Button>

              <p className="text-xs text-[var(--muted)] flex items-center gap-2">
                <Shield className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>{t.contact.promise}</span>
              </p>
            </div>

            {/* Quick Benefits Checklist */}
            <div className="bg-white p-6 rounded-2xl border-2 border-[var(--border)] hard-shadow-sm space-y-3 pt-4">
              <div className="flex items-center gap-2 text-sm font-bold text-[var(--deep)]">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>{lang === 'ar' ? 'تحليل رقمي دقيق لإعلانات المنافسين' : 'Competitor Ad Performance Audit'}</span>
              </div>
              <div className="flex items-center gap-2 text-sm font-bold text-[var(--deep)]">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>{lang === 'ar' ? 'توصيات واضحة لزيادة حجوزات الكشوفات' : 'Actionable Appointment Conversion Plan'}</span>
              </div>
              <div className="flex items-center gap-2 text-sm font-bold text-[var(--deep)]">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>{lang === 'ar' ? 'متوافق 100% مع السياسات الطبية' : '100% Platform Health-Policy Safe'}</span>
              </div>
            </div>
          </div>

          {/* Right Column: White Card Form (7 cols) */}
          <div className="lg:col-span-7">
            <form
              onSubmit={handleSubmit}
              className="bg-white p-6 sm:p-10 rounded-3xl border-2 border-[var(--border)] hard-shadow-lg space-y-6"
            >
              <div className="border-b-2 border-[var(--border)]/15 pb-4 mb-6">
                <h3 className="font-heading font-extrabold text-xl sm:text-2xl text-[var(--deep)]">
                  {t.contact.formTitle}
                </h3>
                <p className="text-xs text-[var(--muted)] mt-1">
                  {lang === 'ar' ? 'املأ البيانات وسيتم تحويلك مباشرة لمحادثة واتساب' : 'Submit details to open a direct WhatsApp chat'}
                </p>
              </div>

              {/* Doctor Name Field */}
              <div>
                <label className="block font-heading font-bold text-sm text-[var(--ink)] mb-2">
                  {t.contact.fields.name} <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder={t.contact.fields.namePlaceholder}
                  className="w-full px-4 py-3.5 rounded-xl border-2 border-[var(--border)] bg-[var(--surface)] text-[var(--ink)] font-medium text-sm focus:bg-white focus:ring-0 outline-none transition-colors"
                />
              </div>

              {/* Specialty Select Field */}
              <div>
                <label className="block font-heading font-bold text-sm text-[var(--ink)] mb-2">
                  {t.contact.fields.specialty} <span className="text-red-500">*</span>
                </label>
                <select
                  name="specialty"
                  required
                  value={formData.specialty}
                  onChange={(e) => setFormData({ ...formData, specialty: e.target.value })}
                  className="w-full px-4 py-3.5 rounded-xl border-2 border-[var(--border)] bg-[var(--surface)] text-[var(--ink)] font-medium text-sm focus:bg-white focus:ring-0 outline-none transition-colors cursor-pointer"
                >
                  {t.contact.specialtiesList.map((item) => (
                    <option key={item.value} value={item.value}>
                      {item.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* WhatsApp Number Field */}
              <div>
                <label className="block font-heading font-bold text-sm text-[var(--ink)] mb-2">
                  {t.contact.fields.whatsapp} <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  name="whatsapp"
                  required
                  dir="ltr"
                  value={formData.whatsapp}
                  onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                  placeholder={t.contact.fields.whatsappPlaceholder}
                  className="w-full px-4 py-3.5 rounded-xl border-2 border-[var(--border)] bg-[var(--surface)] text-[var(--ink)] font-medium text-sm focus:bg-white focus:ring-0 outline-none transition-colors"
                />
              </div>

              {/* Budget Select Field */}
              <div>
                <label className="block font-heading font-bold text-sm text-[var(--ink)] mb-2">
                  {t.contact.fields.budget}
                </label>
                <select
                  name="budget"
                  value={formData.budget}
                  onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                  className="w-full px-4 py-3.5 rounded-xl border-2 border-[var(--border)] bg-[var(--surface)] text-[var(--ink)] font-medium text-sm focus:bg-white focus:ring-0 outline-none transition-colors cursor-pointer"
                >
                  {t.contact.budgetList.map((item) => (
                    <option key={item.value} value={item.value}>
                      {item.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-4 px-6 bg-[var(--primary)] text-white font-heading font-extrabold text-lg sm:text-xl rounded-2xl border-2 border-[var(--border)] hard-shadow pressable-btn flex items-center justify-center gap-2 mt-4"
              >
                <Send className="w-5 h-5 rtl:-scale-x-100" />
                <span>{t.contact.fields.submit}</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
