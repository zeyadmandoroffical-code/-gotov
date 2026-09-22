// src/data/trustLogos.ts
// 8 placeholder clinic/doctor logo chips for the trust marquee
// REPLACE WITH REAL DATA

export interface TrustLogoItem {
  id: string;
  name: {
    en: string;
    ar: string;
  };
  specialty: {
    en: string;
    ar: string;
  };
}

export const trustLogos: TrustLogoItem[] = [
  { id: 'c1', name: { en: 'Cairo Dental Studio', ar: 'عيادة كايرو دنتال' }, specialty: { en: 'Dental', ar: 'أسنان' } },
  { id: 'c2', name: { en: 'Dr. Youssef Derma', ar: 'د. يوسف للجلدية' }, specialty: { en: 'Dermatology', ar: 'جلدية' } },
  { id: 'c3', name: { en: 'Glow Aesthetics Clinic', ar: 'مركز جلو للتجميل' }, specialty: { en: 'Aesthetics', ar: 'تجميل' } },
  { id: 'c4', name: { en: 'Nile Kids Care Center', ar: 'مركز نايل كيدز' }, specialty: { en: 'Pediatrics', ar: 'أطفال' } },
  { id: 'c5', name: { en: 'Apex Fertility & IVF', ar: 'أيبكس للحقن المجهري' }, specialty: { en: 'IVF', ar: 'خصوبة' } },
  { id: 'c6', name: { en: 'Dr. Sherif Ortho', ar: 'د. شريف لجراحة العظام' }, specialty: { en: 'Orthopedics', ar: 'عظام' } },
  { id: 'c7', name: { en: 'Radiant Laser Clinic', ar: 'عيادات راديانت ليزر' }, specialty: { en: 'Laser', ar: 'ليزر' } },
  { id: 'c8', name: { en: 'Al-Safwa Eye Hospital', ar: 'مستشفى الصفوة للعيون' }, specialty: { en: 'Ophthalmology', ar: 'عيون' } },
];
