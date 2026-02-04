import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiMenuAlt4, HiX } from 'react-icons/hi';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [activeSection, setActiveSection] = useState('home');

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);

            // Update active section based on scroll position
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

    const navLinks = [
        { name: 'Home', href: '#home' },
        { name: 'About', href: '#about' },
        { name: 'Skills', href: '#skills' },
        { name: 'Projects', href: '#projects' },
        { name: 'Contact', href: '#contact' },
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
                            key={link.name}
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

                    {/* CTA Button */}

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
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ type: 'tween', duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                            className="fixed top-0 right-0 w-4/5 max-w-sm h-screen glass-strong flex flex-col z-50"
                        >
                            <div className="flex-1 flex flex-col justify-center px-8 gap-6">
                                {navLinks.map((link, i) => (
                                    <motion.a
                                        key={link.name}
                                        href={link.href}
                                        onClick={() => setIsOpen(false)}
                                        initial={{ opacity: 0, x: 50 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.1 + i * 0.1 }}
                                        className="text-3xl font-heading font-bold text-white hover:text-accent transition-colors flex items-center gap-4"
                                    >
                                        <span className="text-accent font-mono text-sm">0{i + 1}</span>
                                        {link.name}
                                    </motion.a>
                                ))}
                            </div>

                            {/* Social Links */}
                            <div className="px-8 pb-8">
                                <div className="h-px bg-border-color mb-6"></div>
                                <p className="text-text-secondary text-sm font-mono">Get in touch</p>
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
