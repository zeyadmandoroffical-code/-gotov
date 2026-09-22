// src/data/work.ts
// REPLACE WITH REAL DATA

export type Specialty = 'dermatology' | 'dental' | 'aesthetics' | 'pediatrics' | 'ivf';

export interface LandingPageItem {
  id: string;
  doctor: {
    en: string;
    ar: string;
  };
  specialty: Specialty;
  desktop: string;
  mobile: string;
  url: string;
  result: {
    en: string;
    ar: string;
  };
  headline: {
    en: string;
    ar: string;
  };
  palette: {
    accent: string;
    bg: string;
  };
}

export const landingPages: LandingPageItem[] = [
  {
    id: 'lp-01',
    doctor: { en: 'Dr. Ibrahim El-Gharabawy', ar: 'د. ابراهيم الغرباوي' },
    specialty: 'dental',
    desktop: '/work/dr-ibrahim.jpg',
    mobile: '/work/dr-ibrahim-m.jpg',
    url: 'https://docera-app.vercel.app/demo-cutout/ar',
    result: { en: '+240% verified clinic bookings in 60 days', ar: '+240% حجوزات كشف مؤكدة خلال 60 يوم' },
    headline: { en: 'Dr. Ibrahim El-Gharabawy — Precision Dental Surgery', ar: 'د. ابراهيم الغرباوي — طب أسنان دقيق بإيد أمينة' },
    palette: { accent: '#1d4ed8', bg: '#eff6ff' },
  },
  {
    id: 'lp-02',
    doctor: { en: 'Dr. Nourhan Atef', ar: 'د. نورهان عاطف' },
    specialty: 'dental',
    desktop: '/work/dr-nourhan.jpg',
    mobile: '/work/dr-nourhan-m.jpg',
    url: 'https://docera-app.vercel.app/demo-strip/ar',
    result: { en: '1,200+ smiles treated & 3.8x cosmetic consultations', ar: 'أكثر من 1200 ابتسامة اتعالجت و3.8x استشارات' },
    headline: { en: 'A Smile That Deserves Real Care from the First Visit', ar: 'ابتسامة تستاهل عناية حقيقية من أول زيارة' },
    palette: { accent: '#db2777', bg: '#fdf2f8' },
  },
  {
    id: 'lp-03',
    doctor: { en: 'Dentamax Dental Center', ar: 'مركز دينتاماكس لطب الأسنان' },
    specialty: 'dental',
    desktop: '/work/dentamax.jpg',
    mobile: '/work/dentamax-m.jpg',
    url: 'https://docera-app.vercel.app/demo-lumen/ar',
    result: { en: '+310% monthly bookings across 6 specialized units', ar: '+310% حجوزات شهرية عبر 6 تخصصات علاجية' },
    headline: { en: 'Medicine Starts with Science, Healing Begins with Trust', ar: 'الطب بيبدأ بالعلم لكن الشفا الحقيقي بيبدأ بالثقة' },
    palette: { accent: '#0f172a', bg: '#f1f5f9' },
  },
];

export interface ReelItem {
  id: string;
  doctor: {
    en: string;
    ar: string;
  };
  type: 'personal-brand' | 'ad' | 'educational';
  src: string;
  poster: string;
  views: string;
  topic: {
    en: string;
    ar: string;
  };
}

export const reels: ReelItem[] = [
  {
    id: 'r-01',
    doctor: { en: 'Dr. Sara Dermatology', ar: 'د. سارة جلدية' },
    type: 'personal-brand',
    src: '/videos/r-01.mp4',
    poster: '/videos/r-01.jpg',
    views: '2.4M',
    topic: { en: 'Skin barrier myths busted', ar: 'أخطاء شائعة تدمر حاجز البشرة' },
  },
  {
    id: 'r-02',
    doctor: { en: 'Dr. Fady Dental', ar: 'د. فادي أسنان' },
    type: 'ad',
    src: '/videos/r-02.mp4',
    poster: '/videos/r-02.jpg',
    views: '1.8M',
    topic: { en: 'Invisible aligners offer', ar: 'عرض تقويم الأسنان الشفاف' },
  },
  {
    id: 'r-03',
    doctor: { en: 'Dr. Yasmine Aesthetics', ar: 'د. ياسمين تجميل' },
    type: 'educational',
    src: '/videos/r-03.mp4',
    poster: '/videos/r-03.jpg',
    views: '3.1M',
    topic: { en: 'Filler vs Botox in 30 sec', ar: 'الفرق بين الفيلر والبوتوكس في 30 ثانية' },
  },
  {
    id: 'r-04',
    doctor: { en: 'Dr. Sherif Pediatrics', ar: 'د. شريف أطفال' },
    type: 'personal-brand',
    src: '/videos/r-04.mp4',
    poster: '/videos/r-04.jpg',
    views: '940K',
    topic: { en: 'First newborn fever guide', ar: 'تصرف سريع مع سخونية الرضيع' },
  },
  {
    id: 'r-05',
    doctor: { en: 'Dr. Ahmed IVF Clinic', ar: 'د. أحمد خصوبة' },
    type: 'educational',
    src: '/videos/r-05.mp4',
    poster: '/videos/r-05.jpg',
    views: '1.5M',
    topic: { en: 'When to visit fertility specialist', ar: 'إمتى تلجأي لاستشاري الحقن المجهري' },
  },
  {
    id: 'r-06',
    doctor: { en: 'Dr. Maya Laser Care', ar: 'د. مايا ليزر' },
    type: 'ad',
    src: '/videos/r-06.mp4',
    poster: '/videos/r-06.jpg',
    views: '2.2M',
    topic: { en: 'Painless laser booking week', ar: 'أسبوع حجز جلسات الليزر بدون ألم' },
  },
  {
    id: 'r-07',
    doctor: { en: 'Dr. Omar Orthopedics', ar: 'د. عمر عظام' },
    type: 'educational',
    src: '/videos/r-07.mp4',
    poster: '/videos/r-07.jpg',
    views: '1.1M',
    topic: { en: 'Knee pain sitting posture test', ar: 'اختبار خشونة الركبة أثناء الجلوس' },
  },
  {
    id: 'r-08',
    doctor: { en: 'Dr. Salma Dental Studio', ar: 'د. سلمى أسنان' },
    type: 'personal-brand',
    src: '/videos/r-08.mp4',
    poster: '/videos/r-08.jpg',
    views: '4.6M',
    topic: { en: 'Day in my dental practice', ar: 'يوم في عيادة الأسنان وكواليس التعقيم' },
  },
];

export const showreel = {
  src: '/videos/showreel.mp4',
  poster: '/videos/showreel.jpg',
  title: {
    en: 'Go2Viral 2026 Doctor & Clinic Reel Wall',
    ar: 'شوريل جو تو فايرال لأطباء وعيادات 2026',
  },
};
