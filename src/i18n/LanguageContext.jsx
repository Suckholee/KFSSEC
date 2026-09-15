import React, { createContext, useContext, useEffect, useState } from 'react';
import { translate } from './translate';

const LanguageContext = createContext(null);
const storageKey = 'kfssec-language';

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(() => {
    try { return localStorage.getItem(storageKey) === 'en' ? 'en' : 'ko'; }
    catch { return 'ko'; }
  });

  useEffect(() => {
    document.documentElement.lang = language;
    try { localStorage.setItem(storageKey, language); } catch { /* Keep switching available without storage. */ }
  }, [language]);

  useEffect(() => {
    const syncLanguage = (event) => {
      if (event.key === storageKey) setLanguage(event.newValue === 'en' ? 'en' : 'ko');
    };
    window.addEventListener('storage', syncLanguage);
    return () => window.removeEventListener('storage', syncLanguage);
  }, []);

  const t = (korean, translated) => language === 'en' && translated !== undefined ? translated : translate(language, korean);
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
