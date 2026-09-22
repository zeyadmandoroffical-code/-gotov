// src/components/sections/WorkVideos.tsx
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useLanguage } from '../../hooks/useLanguage';
import { reels, showreel, ReelItem } from '../../data/work';
import { BrowserFrame } from '../ui/BrowserFrame';
import { PhoneFrame } from '../ui/PhoneFrame';
import { Sticker } from '../ui/Sticker';
import { Play, Pause, ChevronLeft, ChevronRight, X, Volume2, Film, Sparkles } from 'lucide-react';

interface ReelCardProps {
  reel: ReelItem;
  onSelect: (reel: ReelItem) => void;
  isActiveVideo: boolean;
  onActivate: (id: string) => void;
  onDeactivate: () => void;
}

const ReelCard: React.FC<ReelCardProps> = ({
  reel,
  onSelect,
  isActiveVideo,
  onActivate,
  onDeactivate,
}) => {
  const { lang, t } = useLanguage();
  const videoRef = useRef<HTMLVideoElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasError, setHasError] = useState(false);

  // Play/pause based on active state
  useEffect(() => {
    if (!videoRef.current) return;
    if (isActiveVideo) {
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => setIsPlaying(true))
          .catch(() => setIsPlaying(false));
      }
    } else {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
      setIsPlaying(false);
    }
  }, [isActiveVideo]);

  // Mobile intersection observer: play when >=60% in view
  useEffect(() => {
    const isMobile = window.innerWidth < 768;
    if (!isMobile || !cardRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.6) {
            onActivate(reel.id);
          } else if (!entry.isIntersecting && isActiveVideo) {
            onDeactivate();
          }
        });
      },
      { threshold: 0.6, rootMargin: '0px' }
    );

    observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, [reel.id, isActiveVideo, onActivate, onDeactivate]);

  const typeLabels = {
    'personal-brand': t.workVideos.types['personal-brand'],
    ad: t.workVideos.types.ad,
    educational: t.workVideos.types.educational,
  };

  return (
    <div
      ref={cardRef}
      className="shrink-0 w-[72vw] sm:w-[260px] snap-start select-none group cursor-pointer"
      onClick={() => onSelect(reel)}
      onMouseEnter={() => {
        if (window.innerWidth >= 768) onActivate(reel.id);
      }}
      onMouseLeave={() => {
        if (window.innerWidth >= 768) onDeactivate();
      }}
    >
      <PhoneFrame className="transition-transform group-hover:-translate-y-2">
        {/* Video or Fallback Poster */}
        {!hasError ? (
          <video
            ref={videoRef}
            src={reel.src}
            poster={reel.poster}
            muted
            loop
            playsInline
            preload="none"
            onError={() => setHasError(true)}
            className="w-full h-full object-cover"
          />
        ) : null}

        {/* Fallback Graphic Poster if no video file exists */}
        {hasError && (
          <div className="absolute inset-0 bg-gradient-to-b from-[#4d23a3] via-[#3a0788] to-[#1a0b36] p-5 flex flex-col justify-between text-white">
            {/* Top Badge */}
            <div className="flex items-center justify-between text-[11px] pt-4">
              <span className="bg-white/20 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/30 font-bold">
                {typeLabels[reel.type]}
              </span>
              <Film className="w-4 h-4 text-[var(--tint-strong)]" />
            </div>

            {/* Middle Play Icon & Doctor Info */}
            <div className="text-center my-auto space-y-3">
              <div className="w-14 h-14 rounded-full bg-white text-[var(--deep)] border-2 border-[var(--border)] mx-auto flex items-center justify-center hard-shadow-sm group-hover:scale-110 transition-transform">
                <Play className="w-6 h-6 fill-current ms-0.5" />
              </div>
              <p className="font-heading font-extrabold text-base leading-snug text-white px-2">
                {reel.topic[lang]}
              </p>
            </div>

            {/* Bottom Doctor Tag */}
            <div className="bg-black/40 backdrop-blur-md rounded-xl p-2.5 border border-white/10 text-start">
              <p className="text-xs font-heading font-bold text-[var(--tint-strong)]">
                {reel.doctor[lang]}
              </p>
              <p className="text-[10px] text-white/70">Go2Viral Medical Reel</p>
            </div>
          </div>
        )}

        {/* View Count Sticker at corner */}
        <div className="absolute top-4 end-3 z-20 pointer-events-none">
          <span className="bg-[var(--tint-strong)] text-[var(--ink)] border-2 border-[var(--border)] text-[11px] font-hand font-bold px-2 py-0.5 rounded-lg hard-shadow-sm flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-[var(--deep)]" />
            <span dir="ltr">{reel.views}</span> {t.workVideos.viewsSuffix}
          </span>
        </div>

        {/* Bottom meta strip overlay */}
        <div className="absolute bottom-0 inset-x-0 p-3 bg-gradient-to-t from-black/80 via-black/40 to-transparent text-white pointer-events-none">
          <p className="font-heading font-extrabold text-sm leading-tight text-white drop-shadow">
            {reel.doctor[lang]}
          </p>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-[10px] font-bold bg-white/20 backdrop-blur-xs px-2 py-0.5 rounded text-white">
              {typeLabels[reel.type]}
            </span>
          </div>
        </div>
      </PhoneFrame>
    </div>
  );
};

export const WorkVideos: React.FC = () => {
  const { t, lang, dir, isRTL } = useLanguage();
  const [activeVideoId, setActiveVideoId] = useState<string | null>(null);
  const [selectedVideo, setSelectedVideo] = useState<{
    src: string;
    title: string;
    views?: string;
  } | null>(null);

  const reelScrollRef = useRef<HTMLDivElement>(null);

  const scrollReels = (direction: 'prev' | 'next') => {
    if (!reelScrollRef.current) return;
    const cardWidth = 280;
    // Account for RTL direction
    const scrollAmount = direction === 'next' ? cardWidth : -cardWidth;
    const effectiveScroll = isRTL ? -scrollAmount : scrollAmount;
    reelScrollRef.current.scrollBy({ left: effectiveScroll, behavior: 'smooth' });
  };

  // Close video modal on Esc
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedVideo(null);
    };
    if (selectedVideo) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [selectedVideo]);

  return (
    <section className="py-20 sm:py-28 bg-[var(--background)] border-b-2 border-[var(--border)] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-4">
          <div className="inline-flex items-center gap-1.5 bg-[var(--tint)] text-[var(--deep)] font-heading text-xs sm:text-sm font-bold px-4 py-1.5 rounded-full border-2 border-[var(--border)] hard-shadow-sm">
            <Film className="w-4 h-4 text-[var(--primary)]" />
            <span>{t.nav.work} · {lang === 'ar' ? 'فيديو وريلز' : 'Video & Reels'}</span>
          </div>

          <h2 className="section-h2 font-heading font-extrabold text-[var(--deep)]">
            {t.workVideos.h2}
          </h2>

          <p className="text-base sm:text-lg text-[var(--muted)] body-text">
            {t.workVideos.sub}
          </p>
        </div>

        {/* Featured 16:9 Showreel Banner */}
        <div className="max-w-4xl mx-auto mb-20">
          <BrowserFrame url="showreel.go2viral.com">
            <div
              className="relative aspect-video bg-gradient-to-br from-[var(--deep)] via-[var(--primary)] to-[#2a0463] flex items-center justify-center cursor-pointer group select-none overflow-hidden"
              onClick={() =>
                setSelectedVideo({
                  src: showreel.src,
                  title: showreel.title[lang],
                })
              }
            >
              {/* Decorative studio visual elements */}
              <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px]" />

              <div className="relative z-10 flex flex-col items-center text-center p-6 space-y-4">
                {/* Big Play Button Sticker */}
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-white text-[var(--deep)] border-2 border-[var(--border)] flex items-center justify-center hard-shadow-lg group-hover:scale-110 transition-transform duration-200">
                  <Play className="w-9 h-9 sm:w-11 sm:h-11 fill-current ms-1 text-[var(--primary)]" />
                </div>

                <div className="space-y-1">
                  <span className="font-heading font-extrabold text-xl sm:text-2xl text-white block drop-shadow">
                    {t.workVideos.showreelLabel}
                  </span>
                  <span className="text-xs sm:text-sm font-bold text-[var(--tint-strong)]">
                    {showreel.title[lang]}
                  </span>
                </div>
              </div>

              {/* Overlapping Badge */}
              <div className="absolute top-4 start-4">
                <span className="bg-[var(--tint-strong)] text-[var(--ink)] font-hand font-bold text-xs px-3 py-1 rounded-xl border-2 border-[var(--border)] hard-shadow-sm">
                  {lang === 'ar' ? 'شوريل 2026' : 'Showreel 2026'}
                </span>
              </div>
            </div>
          </BrowserFrame>
        </div>

        {/* Reel Wall Controls Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h3 className="font-heading font-extrabold text-xl sm:text-2xl text-[var(--deep)]">
              {lang === 'ar' ? 'حائط الريلز الطبي' : 'Clinic Reel Wall'}
            </h3>
            <p className="text-xs sm:text-sm text-[var(--muted)]">
              {lang === 'ar' ? 'مرر الماوس لتشغيل الفيديو فوراً' : 'Hover to play preview · Click for audio'}
            </p>
          </div>

          {/* Navigation Arrows (mirrored in RTL) */}
          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={() => scrollReels('prev')}
              className="w-11 h-11 rounded-xl bg-white text-[var(--deep)] border-2 border-[var(--border)] hard-shadow-sm flex items-center justify-center pressable-btn"
              aria-label="Previous reel"
            >
              <ChevronLeft className="w-6 h-6 rtl:-scale-x-100" />
            </button>
            <button
              type="button"
              onClick={() => scrollReels('next')}
              className="w-11 h-11 rounded-xl bg-white text-[var(--deep)] border-2 border-[var(--border)] hard-shadow-sm flex items-center justify-center pressable-btn"
              aria-label="Next reel"
            >
              <ChevronRight className="w-6 h-6 rtl:-scale-x-100" />
            </button>
          </div>
        </div>

        {/* Horizontal Reel Wall (snap mandatory, 260px desktop, 72vw mobile) */}
        <div
          ref={reelScrollRef}
          className="flex gap-5 overflow-x-auto snap-x snap-mandatory py-4 no-scrollbar -mx-6 px-6 sm:-mx-8 sm:px-8"
        >
          {reels.map((reel) => (
            <ReelCard
              key={reel.id}
              reel={reel}
              isActiveVideo={activeVideoId === reel.id}
              onActivate={(id) => setActiveVideoId(id)}
              onDeactivate={() => setActiveVideoId(null)}
              onSelect={(item) =>
                setSelectedVideo({
                  src: item.src,
                  title: `${item.doctor[lang]} — ${item.topic[lang]}`,
                  views: item.views,
                })
              }
            />
          ))}
        </div>
      </div>

      {/* Video Lightbox with Sound and Controls */}
      <AnimatePresence>
        {selectedVideo && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setSelectedVideo(null)}
              className="absolute inset-0 bg-[var(--deep)]/85 backdrop-blur-md"
              aria-label="Close video player"
            />

            {/* Modal Panel */}
            <motion.div
              initial={{ scale: 0.94, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.94, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 260, damping: 24 }}
              className="relative z-10 w-full max-w-3xl bg-black rounded-3xl border-2 border-[var(--border)] hard-shadow-lg overflow-hidden flex flex-col"
              role="dialog"
              aria-modal="true"
            >
              {/* Modal Header */}
              <div className="px-6 py-4 bg-[var(--deep)] border-b-2 border-[var(--border)] flex items-center justify-between text-white">
                <div className="flex items-center gap-2">
                  <Volume2 className="w-5 h-5 text-[var(--tint-strong)]" />
                  <span className="font-heading font-extrabold text-sm sm:text-base truncate max-w-[280px] sm:max-w-md">
                    {selectedVideo.title}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedVideo(null)}
                  className="w-9 h-9 rounded-xl bg-white text-[var(--deep)] border-2 border-[var(--border)] flex items-center justify-center hard-shadow-sm pressable-btn"
                  aria-label="Close video"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Video Player */}
              <div className="relative aspect-video sm:aspect-16/9 bg-zinc-950 flex items-center justify-center">
                <video
                  src={selectedVideo.src}
                  controls
                  autoPlay
                  playsInline
                  className="w-full h-full object-contain"
                >
                  Your browser does not support the video tag.
                </video>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
