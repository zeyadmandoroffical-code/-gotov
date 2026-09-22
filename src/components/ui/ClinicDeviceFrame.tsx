// src/components/ui/ClinicDeviceFrame.tsx
import React, { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'motion/react';
import { Globe } from 'lucide-react';

interface ClinicDeviceFrameProps {
  children: React.ReactNode;
  frameType?: 'phone' | 'browser';
  url?: string;
  isHovered?: boolean;
  className?: string;
  isInteractive?: boolean;
}

export const ClinicDeviceFrame: React.FC<ClinicDeviceFrameProps> = ({
  children,
  frameType = 'phone',
  url = 'docera-app.vercel.app',
  isHovered = false,
  className = '',
  isInteractive = true,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [scrollDistance, setScrollDistance] = useState(0);

  const isInView = useInView(containerRef, { amount: 0.3, once: true });
  const isTouchDevice =
    typeof window !== 'undefined' &&
    ('ontouchstart' in window || navigator.maxTouchPoints > 0);

  // Measure content for non-interactive fallback
  useEffect(() => {
    if (isInteractive) return;

    const updateDistance = () => {
      if (containerRef.current && contentRef.current) {
        const cHeight = containerRef.current.offsetHeight;
        const totalHeight = contentRef.current.offsetHeight;
        const diff = Math.max(0, totalHeight - cHeight);
        setScrollDistance(diff);
      }
    };

    updateDistance();
    const observer = new ResizeObserver(updateDistance);
    if (contentRef.current) observer.observe(contentRef.current);
    if (containerRef.current) observer.observe(containerRef.current);

    return () => observer.disconnect();
  }, [children, isInteractive]);

  const duration = scrollDistance > 0 ? scrollDistance / 95 : 3.5;

  if (frameType === 'browser') {
    return (
      <div
        className={`bg-white rounded-[20px] border-2 border-[var(--border)] hard-shadow overflow-hidden flex flex-col ${className}`}
      >
        {/* Browser Chrome Header */}
        <div className="h-8 bg-zinc-100 border-b border-zinc-200 flex items-center px-3 gap-2 select-none shrink-0">
          <div className="flex items-center gap-1.5 shrink-0" aria-hidden="true">
            <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
            <div className="w-2.5 h-2.5 rounded-full bg-amber-400" />
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
          </div>

          <div className="mx-auto max-w-[240px] w-full bg-white rounded-md h-5 px-2 border border-zinc-200 flex items-center justify-center gap-1.5 overflow-hidden">
            <Globe className="w-2.5 h-2.5 text-zinc-400 shrink-0" />
            <span className="text-[10px] font-mono text-zinc-600 truncate" dir="ltr">
              {url}
            </span>
          </div>

          <div className="w-6 shrink-0" aria-hidden="true" />
        </div>

        {/* Viewport container */}
        <div
          ref={containerRef}
          className="aspect-[4/5] sm:aspect-[3/4] overflow-hidden relative bg-white"
        >
          {children}
        </div>
      </div>
    );
  }

  // Ultra-Sleek Modern Smartphone Showcase Frame
  // Minimalist titanium bezel without intrusive notches or fake overlays that block the real website
  return (
    <div
      className={`relative rounded-[32px] p-[5px] bg-gradient-to-b from-zinc-800 via-zinc-900 to-zinc-950 border border-zinc-700/80 shadow-2xl transition-all duration-300 hover:shadow-cyan-950/20 ${className}`}
    >
      {/* Phone Screen Container */}
      <div className="relative w-full rounded-[27px] overflow-hidden bg-white border border-zinc-900/80 flex flex-col">
        {/* Screen Viewport with realistic mobile aspect ratio (9:17) */}
        <div
          ref={containerRef}
          className="aspect-[9/17] w-full overflow-hidden relative bg-white"
        >
          {isInteractive ? (
            <div className="absolute inset-0 w-full h-full overflow-hidden bg-white">
              {children}
            </div>
          ) : (
            <motion.div
              ref={contentRef}
              animate={{
                y: isHovered && !isTouchDevice
                  ? -scrollDistance
                  : isTouchDevice && isInView
                  ? [-scrollDistance * 0.35, 0]
                  : 0,
              }}
              transition={{
                y: isHovered && !isTouchDevice
                  ? { duration, ease: 'linear' }
                  : { duration: 0.8, ease: 'easeOut' },
              }}
              className="w-full relative"
            >
              {children}
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};
