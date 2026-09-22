// src/components/work/ClinicLandingRenderer.tsx
import React, { useState } from 'react';
import { LandingPageItem } from '../../data/work';
import { useLanguage } from '../../hooks/useLanguage';
import { Loader2 } from 'lucide-react';

interface ClinicLandingRendererProps {
  item: LandingPageItem;
  onImageLoad?: () => void;
}

export const ClinicLandingRenderer: React.FC<ClinicLandingRendererProps> = ({
  item,
  onImageLoad,
}) => {
  const { lang } = useLanguage();
  const isAr = lang === 'ar';
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Map language to URL (/ar or /en)
  const getLiveUrl = (rawUrl: string, currentLang: 'ar' | 'en') => {
    if (!rawUrl) return '';
    if (currentLang === 'en') {
      return rawUrl.replace(/\/ar$/, '/en');
    }
    return rawUrl.replace(/\/en$/, '/ar');
  };

  const activeUrl = getLiveUrl(item.url, lang);
  const doctorName = isAr ? item.doctor.ar : item.doctor.en;

  return (
    <div className="relative w-full h-full bg-white flex flex-col overflow-hidden">
      {/* Sleek Minimalist Loading Screen */}
      {isLoading && (
        <div className="absolute inset-0 z-10 bg-zinc-50 flex flex-col items-center justify-center p-6 text-center transition-opacity duration-300">
          <div className="w-8 h-8 rounded-full border-2 border-zinc-200 border-t-[var(--primary)] animate-spin mb-3" />
          <span className="font-heading font-bold text-xs text-zinc-800">
            {doctorName}
          </span>
          <span className="text-[11px] text-zinc-400 mt-1">
            {isAr ? 'جاري تجهيز المعاينة...' : 'Loading preview...'}
          </span>
        </div>
      )}

      {/* Clean Edge-to-Edge Live Website Embed */}
      <iframe
        src={activeUrl}
        title={doctorName}
        className={`w-full h-full border-0 bg-white transition-opacity duration-500 ${
          isLoading ? 'opacity-0' : 'opacity-100'
        }`}
        loading="lazy"
        sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
        onLoad={() => {
          setIsLoading(false);
          if (onImageLoad) onImageLoad();
        }}
      />
    </div>
  );
};
