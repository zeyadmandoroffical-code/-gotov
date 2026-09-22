// src/data/testimonials.ts
// REPLACE WITH REAL DATA

export interface TestimonialItem {
  id: string;
  quote: {
    en: string;
    ar: string;
  };
  doctor: {
    en: string;
    ar: string;
  };
  specialty: {
    en: string;
    ar: string;
  };
  city: {
    en: string;
    ar: string;
  };
  styleVariant: 'tint-strong' | 'primary' | 'white';
}

export const testimonialsData: TestimonialItem[] = [
  {
    id: 't-1',
    quote: {
      en: "They understood my specialty in one call.",
      ar: "فهموا تخصصي من أول مكالمة وعارفين إزاي المريض بيفكر.",
    },
    doctor: {
      en: "Dr. Karim M.",
      ar: "د. كريم م.",
    },
    specialty: {
      en: "Dentist",
      ar: "طب وجراحة الأسنان",
    },
    city: {
      en: "Cairo",
      ar: "القاهرة",
    },
    styleVariant: 'tint-strong',
  },
  {
    id: 't-2',
    quote: {
      en: "Bookings doubled and the leads were actual patients.",
      ar: "الحجوزات ضعفت والعملاء كانوا مرضى فعلاً مستعدين للكشف.",
    },
    doctor: {
      en: "Dr. Laila H.",
      ar: "د. ليلى ح.",
    },
    specialty: {
      en: "Dermatology",
      ar: "جلدية وتجميل",
    },
    city: {
      en: "Giza",
      ar: "الجيزة",
    },
    styleVariant: 'primary',
  },
  {
    id: 't-3',
    quote: {
      en: "Finally an agency that respects medical ethics.",
      ar: "أخيراً وكالة بتحترم أخلاقيات المهنة الطبية وسياسات الإعلانات.",
    },
    doctor: {
      en: "Dr. Youssef N.",
      ar: "د. يوسف ن.",
    },
    specialty: {
      en: "Pediatrics",
      ar: "أطفال وحديثي الولادة",
    },
    city: {
      en: "Alexandria",
      ar: "الإسكندرية",
    },
    styleVariant: 'white',
  },
];
