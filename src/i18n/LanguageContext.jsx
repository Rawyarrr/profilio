import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import translations from './translations';

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
    const [language, setLanguageState] = useState(() => {
        try {
            return localStorage.getItem('portfolio-lang') || 'en';
        } catch {
            return 'en';
        }
    });

    const isRTL = language === 'ar' || language === 'ku';

    const setLanguage = useCallback((lang) => {
        setLanguageState(lang);
        try {
            localStorage.setItem('portfolio-lang', lang);
        } catch {
            // ignore
        }
    }, []);

    // Update <html> dir and lang attributes
    useEffect(() => {
        document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
        document.documentElement.lang = language;
    }, [language, isRTL]);

    // Translation helper — supports nested keys like 'nav.home'
    const t = useCallback((key) => {
        const keys = key.split('.');
        let value = translations[language];
        for (const k of keys) {
            if (value && typeof value === 'object') {
                value = value[k];
            } else {
                return key; // fallback: return the key itself
            }
        }
        return value ?? key;
    }, [language]);

    return (
        <LanguageContext.Provider value={{ language, setLanguage, t, isRTL }}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = () => {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
};

export default LanguageContext;
