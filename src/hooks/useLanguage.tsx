// src/hooks/useLanguage.tsx
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { translations, Language, TranslationSchema } from '../data/i18n';

interface LanguageContextType {
  lang: Language;
  isRTL: boolean;
  dir: number; // 1 for LTR, -1 for RTL
  t: TranslationSchema;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const STORAGE_KEY = 'go2viral_lang_pref';

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lang, setLangState] = useState<Language>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved === 'ar' || saved === 'en') {
        return saved;
      }
    } catch {
      // Ignore local storage errors
    }
    return 'ar'; // Default Arabic
  });

  const applyDomAttributes = useCallback((currentLang: Language) => {
    const isRtl = currentLang === 'ar';
    document.documentElement.lang = currentLang;
    document.documentElement.dir = isRtl ? 'rtl' : 'ltr';
    document.documentElement.style.setProperty('--dir', isRtl ? '-1' : '1');

    // Update title and meta description
    const currentMeta = translations[currentLang].meta;
    document.title = currentMeta.title;
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', currentMeta.description);
    }
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) {
      ogTitle.setAttribute('content', currentMeta.title);
    }
  }, []);

  useEffect(() => {
    applyDomAttributes(lang);
  }, [lang, applyDomAttributes]);

  const setLanguage = useCallback((newLang: Language) => {
    applyDomAttributes(newLang);
    setLangState(newLang);
    try {
      localStorage.setItem(STORAGE_KEY, newLang);
    } catch {
      // Ignore
    }
  }, [applyDomAttributes]);

  const toggleLanguage = useCallback(() => {
    setLanguage(lang === 'ar' ? 'en' : 'ar');
  }, [lang, setLanguage]);

  const isRTL = lang === 'ar';
  const dir = isRTL ? -1 : 1;
  const t = translations[lang];

  return (
    <LanguageContext.Provider value={{ lang, isRTL, dir, t, setLanguage, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
