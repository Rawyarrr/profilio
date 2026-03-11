import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiMenuAlt4, HiX } from 'react-icons/hi';
import { HiGlobeAlt } from 'react-icons/hi';
import { HiSun, HiMoon } from 'react-icons/hi';
import { useLanguage } from '../i18n/LanguageContext';
import { useTheme } from '../i18n/ThemeContext';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [activeSection, setActiveSection] = useState('home');
    const [langOpen, setLangOpen] = useState(false);
    const langRef = useRef(null);
    const { t, language, setLanguage, isRTL } = useLanguage();
    const { isDark, toggleTheme } = useTheme();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);

            const sections = ['home', 'about', 'skills', 'projects', 'contact'];
            for (const section of sections.reverse()) {
                const element = document.getElementById(section);
                if (element && window.scrollY >= element.offsetTop - 200) {
                    setActiveSection(section);
                    break;
                }
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Close language dropdown on outside click
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (langRef.current && !langRef.current.contains(e.target)) {
                setLangOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const navLinks = [
        { name: t('nav.home'), href: '#home' },
        { name: t('nav.about'), href: '#about' },
        { name: t('nav.skills'), href: '#skills' },
        { name: t('nav.projects'), href: '#projects' },
        { name: t('nav.contact'), href: '#contact' },
    ];

    const languages = [
        { code: 'en', label: 'English' },
        { code: 'ar', label: 'العربية' },
        { code: 'ku', label: 'کوردی' },
    ];

    return (
        <motion.nav
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className={`fixed top-0 left-0 w-full z-[100] transition-all duration-500 ${scrolled ? 'glass-strong py-4' : 'bg-transparent py-6'
                }`}
        >
            <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
                {/* Logo */}
                <motion.a
                    href="#home"
                    className="relative group flex items-center gap-2"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent to-cyan flex items-center justify-center">
                        <span className="text-primary font-heading font-bold text-lg">R</span>
                    </div>
                    <span className="hidden sm:block font-heading font-bold text-xl text-white">
                        Rawyar<span className="text-accent">.</span>
                    </span>
                </motion.a>

                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center gap-1">
                    {navLinks.map((link, i) => (
                        <motion.a
                            key={link.href}
                            href={link.href}
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 + i * 0.1 }}
                            className={`relative px-4 py-2 text-sm font-medium transition-colors duration-300 ${activeSection === link.href.slice(1)
                                ? 'text-accent'
                                : 'text-text-secondary hover:text-white'
                                }`}
                        >
                            {link.name}
                            {activeSection === link.href.slice(1) && (
                                <motion.div
                                    layoutId="activeNav"
                                    className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 bg-accent rounded-full"
                                    transition={{ type: 'spring', duration: 0.5 }}
                                />
                            )}
                        </motion.a>
                    ))}

                    {/* Theme Toggle */}
                    <motion.button
                        onClick={toggleTheme}
                        className="flex items-center justify-center w-9 h-9 rounded-lg text-text-secondary hover:text-accent hover:bg-white/5 transition-all duration-300"
                        whileTap={{ scale: 0.9, rotate: 180 }}
                        whileHover={{ scale: 1.1 }}
                        title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
                    >
                        <AnimatePresence mode="wait">
                            {isDark ? (
                                <motion.span
                                    key="sun"
                                    initial={{ opacity: 0, rotate: -90, scale: 0 }}
                                    animate={{ opacity: 1, rotate: 0, scale: 1 }}
                                    exit={{ opacity: 0, rotate: 90, scale: 0 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <HiSun className="text-xl" />
                                </motion.span>
                            ) : (
                                <motion.span
                                    key="moon"
                                    initial={{ opacity: 0, rotate: 90, scale: 0 }}
                                    animate={{ opacity: 1, rotate: 0, scale: 1 }}
                                    exit={{ opacity: 0, rotate: -90, scale: 0 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <HiMoon className="text-xl" />
                                </motion.span>
                            )}
                        </AnimatePresence>
                    </motion.button>

                    {/* Language Dropdown */}
                    <div className="relative" ref={langRef}>
                        <motion.button
                            onClick={() => setLangOpen(!langOpen)}
                            className="flex items-center gap-1.5 px-3 py-2 text-sm text-text-secondary hover:text-white transition-colors rounded-lg hover:bg-white/5"
                            whileTap={{ scale: 0.95 }}
                        >
                            <HiGlobeAlt className="text-lg text-accent" />
                            <span className="font-medium">{language.toUpperCase()}</span>
                        </motion.button>

                        <AnimatePresence>
                            {langOpen && (
                                <motion.div
                                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                                    transition={{ duration: 0.2 }}
                                    className={`absolute top-full mt-2 ${isRTL ? 'left-0' : 'right-0'} w-44 glass-strong rounded-xl overflow-hidden border border-border-color shadow-xl`}
                                >
                                    {languages.map((lang) => (
                                        <button
                                            key={lang.code}
                                            onClick={() => {
                                                setLanguage(lang.code);
                                                setLangOpen(false);
                                            }}
                                            className={`w-full flex items-center gap-3 px-4 py-3 text-sm transition-all duration-200 ${language === lang.code
                                                ? 'text-accent bg-accent/10'
                                                : 'text-text-secondary hover:text-white hover:bg-white/5'
                                                }`}
                                        >
                                            <span className="font-medium">{lang.label}</span>
                                            {language === lang.code && (
                                                <span className="ml-auto text-accent">✓</span>
                                            )}
                                        </button>
                                    ))}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>

                {/* Mobile Menu Button */}
                <motion.button
                    onClick={() => setIsOpen(!isOpen)}
                    className="md:hidden text-white text-2xl z-50 w-10 h-10 flex items-center justify-center"
                    whileTap={{ scale: 0.9 }}
                >
                    <AnimatePresence mode="wait">
                        {isOpen ? (
                            <motion.div
                                key="close"
                                initial={{ rotate: -90, opacity: 0 }}
                                animate={{ rotate: 0, opacity: 1 }}
                                exit={{ rotate: 90, opacity: 0 }}
                                transition={{ duration: 0.2 }}
                            >
                                <HiX />
                            </motion.div>
                        ) : (
                            <motion.div
                                key="menu"
                                initial={{ rotate: 90, opacity: 0 }}
                                animate={{ rotate: 0, opacity: 1 }}
                                exit={{ rotate: -90, opacity: 0 }}
                                transition={{ duration: 0.2 }}
                            >
                                <HiMenuAlt4 />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.button>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsOpen(false)}
                            className="fixed inset-0 bg-primary/80 backdrop-blur-sm z-40"
                        />

                        {/* Menu Panel */}
                        <motion.div
                            initial={{ x: isRTL ? '-100%' : '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: isRTL ? '-100%' : '100%' }}
                            transition={{ type: 'tween', duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                            className={`fixed top-0 ${isRTL ? 'left-0' : 'right-0'} w-4/5 max-w-sm h-screen glass-strong flex flex-col z-50`}
                        >
                            <div className="flex-1 flex flex-col justify-center px-6 sm:px-8 gap-4 sm:gap-6 mt-16">
                                {navLinks.map((link, i) => (
                                    <motion.a
                                        key={link.href}
                                        href={link.href}
                                        onClick={() => setIsOpen(false)}
                                        initial={{ opacity: 0, x: isRTL ? -50 : 50 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.1 + i * 0.1 }}
                                        className="text-2xl sm:text-3xl font-heading font-bold text-white hover:text-accent transition-colors flex items-center gap-3 sm:gap-4"
                                    >
                                        <span className="text-accent font-mono text-sm">0{i + 1}</span>
                                        {link.name}
                                    </motion.a>
                                ))}

                                {/* Theme & Language in Mobile Menu */}
                                <div className="mt-4 pt-4 border-t border-border-color">
                                    {/* Theme Toggle */}
                                    <div className="flex items-center justify-between mb-4">
                                        <p className="text-text-secondary text-sm font-mono">Theme</p>
                                        <motion.button
                                            onClick={toggleTheme}
                                            className="flex items-center gap-2 px-4 py-2 rounded-full glass text-text-secondary hover:text-accent transition-all duration-200"
                                            whileTap={{ scale: 0.95 }}
                                        >
                                            {isDark ? <HiSun className="text-lg" /> : <HiMoon className="text-lg" />}
                                            <span className="text-sm font-medium">{isDark ? 'Light' : 'Dark'}</span>
                                        </motion.button>
                                    </div>

                                    {/* Language Switcher */}
                                    <p className="text-text-secondary text-sm font-mono mb-3">Language</p>
                                    <div className="flex flex-wrap gap-2">
                                        {languages.map((lang) => (
                                            <button
                                                key={lang.code}
                                                onClick={() => {
                                                    setLanguage(lang.code);
                                                }}
                                                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${language === lang.code
                                                    ? 'bg-accent text-primary'
                                                    : 'glass text-text-secondary hover:text-white'
                                                    }`}
                                            >
                                                <span>{lang.label}</span>
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Social Links */}
                            <div className="px-8 pb-8">
                                <div className="h-px bg-border-color mb-6"></div>
                                <p className="text-text-secondary text-sm font-mono">{t('nav.getInTouch')}</p>
                                <a href="mailto:salarrawyar8@gmail.com" className="text-accent font-medium">salarrawyar8@gmail.com</a>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </motion.nav>
    );
};

export default Navbar;
