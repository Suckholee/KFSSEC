import React, { createContext, useContext, useEffect, useState } from 'react';
import { translate } from './translate';

const LanguageContext = createContext(null);
const storageKey = 'kfssec-language';
const supportedLanguages = ['ko', 'en', 'ja', 'zh'];

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(() => {
    try {
      const saved = localStorage.getItem(storageKey);
      return supportedLanguages.includes(saved) ? saved : 'ko';
    } catch {
      return 'ko';
    }
  });

  useEffect(() => {
    document.documentElement.lang = language;
    try {
      localStorage.setItem(storageKey, language);
    } catch {
      /* Keep switching available without storage. */
    }
  }, [language]);

  useEffect(() => {
    const syncLanguage = (event) => {
      if (event.key === storageKey && supportedLanguages.includes(event.newValue)) {
        setLanguage(event.newValue);
      }
    };
    window.addEventListener('storage', syncLanguage);
    return () => window.removeEventListener('storage', syncLanguage);
  }, []);

  const t = (korean, translated) => {
    if (language === 'ko') return korean;
    if (language === 'en' && translated !== undefined) return translated;
    return translate(language, korean);
  };

  const tr = (value, ...values) => translate(language, value, ...values);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, tr }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage requires LanguageProvider');
  return context;
}
