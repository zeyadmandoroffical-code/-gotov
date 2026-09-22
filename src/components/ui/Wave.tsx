// src/components/ui/Wave.tsx
import React from 'react';

interface WaveProps {
  fillColor: string;
  flip?: boolean;
  className?: string;
}

export const Wave: React.FC<WaveProps> = ({ fillColor, flip = false, className = '' }) => {
  return (
    <div
      className={`w-full leading-none overflow-hidden select-none pointer-events-none ${
        flip ? 'rotate-180 -mb-0.5' : '-mt-0.5'
      } ${className}`}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 1440 60"
        preserveAspectRatio="none"
        className="w-full h-[60px] block"
        style={{ fill: fillColor }}
      >
        <path d="M0,30 C240,90 480,-30 720,30 S1200,90 1440,30 L1440,60 L0,60 Z" />
      </svg>
    </div>
  );
};
