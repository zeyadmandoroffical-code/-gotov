// src/components/ui/Sticker.tsx
import React from 'react';
import { motion } from 'motion/react';
import { useLanguage } from '../../hooks/useLanguage';

export type StickerColor = 'primary' | 'tint-strong' | 'white';

interface StickerProps {
  text: string;
  rotation?: number; // Base angle in degrees (e.g. -8, 6)
  color?: StickerColor;
  starburst?: boolean;
  className?: string;
  delay?: number;
}

export const Sticker: React.FC<StickerProps> = ({
  text,
  rotation = 0,
  color = 'tint-strong',
  starburst = false,
  className = '',
  delay = 0.6,
}) => {
  const { dir } = useLanguage();
  const effectiveRotation = rotation * dir;

  const getColorClass = () => {
    switch (color) {
      case 'primary':
        return 'bg-[var(--primary)] text-white';
      case 'white':
        return 'bg-white text-[var(--deep)]';
      case 'tint-strong':
      default:
        return 'bg-[var(--tint-strong)] text-[var(--ink)]';
    }
  };

  const getFillHex = () => {
    switch (color) {
      case 'primary':
        return '#5428b3';
      case 'white':
        return '#ffffff';
      case 'tint-strong':
      default:
        return '#d9c9f7';
    }
  };

  const getTextColor = () => {
    switch (color) {
      case 'primary':
        return '#ffffff';
      case 'white':
        return '#3a0788';
      case 'tint-strong':
      default:
        return '#1a0b36';
    }
  };

  if (starburst) {
    // 16-point starburst polygon in SVG with stroke
    return (
      <motion.div
        initial={{ y: -30, opacity: 0, rotate: 0 }}
        whileInView={{ y: 0, opacity: 1, rotate: effectiveRotation }}
        viewport={{ once: true }}
        transition={{ type: 'spring', stiffness: 220, damping: 18, delay }}
        className={`inline-block select-none ${className}`}
      >
        <motion.div
          whileHover={{
            rotate: [effectiveRotation, effectiveRotation - 6, effectiveRotation + 6, effectiveRotation],
          }}
          transition={{ duration: 0.5 }}
          className="relative inline-flex items-center justify-center p-2 filter drop-shadow-[calc(4px*var(--dir))_4px_0_var(--border)]"
        >
          <svg viewBox="0 0 160 160" className="w-28 h-28 sm:w-32 sm:h-32">
            <polygon
              points="80,0 95,20 120,5 125,32 152,28 145,55 160,80 145,105 152,132 125,128 120,155 95,140 80,160 65,140 40,155 35,128 8,132 15,105 0,80 15,55 8,28 35,32 40,5 65,20"
              fill={getFillHex()}
              stroke="var(--border)"
              strokeWidth="4"
              strokeLinejoin="round"
            />
          </svg>
          <span
            className="absolute inset-0 flex items-center justify-center text-center font-hand text-xs sm:text-sm font-bold px-4 pointer-events-none"
            style={{ color: getTextColor() }}
          >
            {text}
          </span>
        </motion.div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ y: -30, opacity: 0, rotate: 0 }}
      whileInView={{ y: 0, opacity: 1, rotate: effectiveRotation }}
      viewport={{ once: true }}
      transition={{ type: 'spring', stiffness: 220, damping: 18, delay }}
      className={`inline-block select-none ${className}`}
    >
      <motion.div
        whileHover={{
          rotate: [effectiveRotation, effectiveRotation - 6, effectiveRotation + 6, effectiveRotation],
        }}
        transition={{ duration: 0.5 }}
        className={`${getColorClass()} border-2 border-[var(--border)] px-3.5 py-1.5 rounded-xl font-hand text-xs sm:text-sm font-bold hard-shadow flex items-center justify-center text-center cursor-default`}
      >
        {text}
      </motion.div>
    </motion.div>
  );
};
