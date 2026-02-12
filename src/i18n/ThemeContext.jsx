import { createContext, useContext, useState, useEffect, useCallback } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    const [theme, setThemeState] = useState(() => {
        try {
            return localStorage.getItem('portfolio-theme') || 'dark';
        } catch {
            return 'dark';
        }
    });

    const isDark = theme === 'dark';

    const toggleTheme = useCallback(() => {
        setThemeState((prev) => {
            const next = prev === 'dark' ? 'light' : 'dark';
            try {
                localStorage.setItem('portfolio-theme', next);
            } catch {
                // ignore
            }
            return next;
        });
    }, []);

    // Apply theme class to <html>
    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
    }, [theme]);

    return (
        <ThemeContext.Provider value={{ theme, isDark, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
};

export default ThemeContext;
