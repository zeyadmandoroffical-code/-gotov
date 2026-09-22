// src/data/stats.ts
// REPLACE WITH REAL DATA

export interface StatItem {
  id: string;
  target: number;
  prefix?: string;
  suffix: string;
  label: {
    en: string;
    ar: string;
  };
  sampleTag: string;
}

export const statsData: StatItem[] = [
  {
    id: 'bookings-growth',
    target: 212,
    prefix: '+',
    suffix: '%',
    label: {
      en: 'bookings in 90 days',
      ar: 'حجوزات في 90 يوم',
    },
    sampleTag: '(sample)',
  },
  {
    id: 'cost-reduction',
    target: 48,
    prefix: '-',
    suffix: '%',
    label: {
      en: 'cost per booking',
      ar: 'تكلفة الحجز',
    },
    sampleTag: '(sample)',
  },
  {
    id: 'doctors-count',
    target: 35,
    suffix: '+',
    label: {
      en: 'doctors & clinics',
      ar: 'دكتور وعيادة',
    },
    sampleTag: '(sample)',
  },
  {
    id: 'video-views',
    target: 12,
    suffix: 'M+',
    label: {
      en: 'video views',
      ar: 'مشاهدة فيديو',
    },
    sampleTag: '(sample)',
  },
];

export interface ChartPoint {
  month: {
    en: string;
    ar: string;
  };
  bookings: number;
  costPerBooking: number;
}

export const caseStudyChart = [
  { month: { en: 'Month 1', ar: 'الشهر 1' }, bookings: 42, costPerBooking: 190 },
  { month: { en: 'Month 2', ar: 'الشهر 2' }, bookings: 88, costPerBooking: 135 },
  { month: { en: 'Month 3', ar: 'الشهر 3' }, bookings: 131, costPerBooking: 98 },
];
