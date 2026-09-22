// src/components/ui/BrowserFrame.tsx
import React from 'react';

interface BrowserFrameProps {
  url?: string;
  children: React.ReactNode;
  className?: string;
}

export const BrowserFrame: React.FC<BrowserFrameProps> = ({
  url = 'clinic-appointment.go2viral.com',
  children,
  className = '',
}) => {
  return (
    <div
      className={`bg-white rounded-[20px] border-2 border-[var(--border)] hard-shadow overflow-hidden flex flex-col ${className}`}
    >
      {/* Browser Chrome Header */}
      <div className="h-9 bg-[var(--tint)] border-b-2 border-[var(--border)] flex items-center px-3.5 gap-2.5 select-none shrink-0">
        {/* Three dots */}
        <div className="flex items-center gap-1.5 shrink-0" aria-hidden="true">
          <div className="w-2.5 h-2.5 rounded-full bg-[var(--deep)]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[var(--primary)]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[var(--tint-strong)]" />
        </div>

        {/* URL Pill */}
        <div className="mx-auto max-w-[240px] w-full bg-white rounded-full h-5 px-2.5 border border-[var(--border)] flex items-center justify-center opacity-80 overflow-hidden">
          <span className="text-[10px] font-mono text-[var(--muted)] truncate" dir="ltr">
            {url}
          </span>
        </div>

        {/* Spacer to balance dots */}
        <div className="w-8 shrink-0" aria-hidden="true" />
      </div>

      {/* Frame Content */}
      <div className="relative flex-1 overflow-hidden bg-[var(--surface)]">
        {children}
      </div>
    </div>
  );
};
