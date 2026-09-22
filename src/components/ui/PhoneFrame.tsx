// src/components/ui/PhoneFrame.tsx
import React from 'react';

interface PhoneFrameProps {
  children: React.ReactNode;
  className?: string;
}

export const PhoneFrame: React.FC<PhoneFrameProps> = ({
  children,
  className = '',
}) => {
  return (
    <div
      className={`relative rounded-[28px] border-2 border-[var(--border)] bg-black hard-shadow overflow-hidden aspect-[9/16] ${className}`}
    >
      {/* Top notch speaker pill */}
      <div className="absolute top-2.5 left-1/2 -translate-x-1/2 z-30 w-16 h-3 bg-black rounded-full border border-white/20 flex items-center justify-center pointer-events-none">
        <div className="w-2 h-2 rounded-full bg-[#3a0788]/60 mr-1.5" />
        <div className="w-6 h-1 rounded-full bg-white/30" />
      </div>

      {/* Screen area */}
      <div className="relative w-full h-full overflow-hidden bg-zinc-950">
        {children}
      </div>
    </div>
  );
};
