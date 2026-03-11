import { useRef, useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../i18n/LanguageContext';

const Hero = () => {
    const containerRef = useRef(null);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [roleIndex, setRoleIndex] = useState(0);
    const [displayedText, setDisplayedText] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);
    const { t } = useLanguage();

    // Roles for typewriter
    const roles = [
        { text: () => t('hero.softwareEngineer'), color: 'var(--accent)' },
        { text: () => t('hero.mobileDev'), color: 'var(--cyan)' },
        { text: () => t('hero.webDev'), color: 'var(--blue, #3b82f6)' },
    ];

    // Typewriter effect
    useEffect(() => {
        const currentRole = roles[roleIndex].text();
        let timeout;

        if (!isDeleting && displayedText.length < currentRole.length) {
            // Typing
            timeout = setTimeout(() => {
                setDisplayedText(currentRole.slice(0, displayedText.length + 1));
            }, 80);
        } else if (!isDeleting && displayedText.length === currentRole.length) {
            // Pause at full text, then start deleting
            timeout = setTimeout(() => {
                setIsDeleting(true);
            }, 2000);
        } else if (isDeleting && displayedText.length > 0) {
            // Deleting
            timeout = setTimeout(() => {
                setDisplayedText(currentRole.slice(0, displayedText.length - 1));
            }, 40);
        } else if (isDeleting && displayedText.length === 0) {
            // Move to next role
            setIsDeleting(false);
            setRoleIndex((prev) => (prev + 1) % roles.length);
        }

        return () => clearTimeout(timeout);
    }, [displayedText, isDeleting, roleIndex]);

    // Mouse position for parallax
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const springConfig = { damping: 30, stiffness: 200 };
    const parallaxX = useSpring(useTransform(mouseX, [0, 1], [-30, 30]), springConfig);
    const parallaxY = useSpring(useTransform(mouseY, [0, 1], [-30, 30]), springConfig);

    useEffect(() => {
        const handleMouseMove = (e) => {
            // Only capture mouse on non-touch devices
            if (window.matchMedia("(pointer: coarse)").matches) return;
            const { clientX, clientY } = e;
            const { innerWidth, innerHeight } = window;
            mouseX.set(clientX / innerWidth);
            mouseY.set(clientY / innerHeight);
            setMousePosition({ x: clientX, y: clientY });
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, [mouseX, mouseY]);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.15, delayChildren: 0.5 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 80 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 1.2, ease: [0.22, 1, 0.36, 1] } // refined cinematic bezier curve
        }
    };

    const name = "RAWYAR";
    const lastName = "SALAR";

    return (
        <section
            id="home"
            ref={containerRef}
            className="relative min-h-screen flex items-center justify-center overflow-hidden"
        >
            {/* Animated Orbs */}
            <div className="orb orb-1"></div>
            <div className="orb orb-2"></div>
            <div className="orb orb-3"></div>

            {/* Grid Pattern */}
            <div
                className="absolute inset-0 opacity-[0.03]"
                style={{
                    backgroundImage: `
            linear-gradient(rgba(16, 185, 129, 0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(16, 185, 129, 0.3) 1px, transparent 1px)
          `,
                    backgroundSize: '60px 60px'
                }}
            />

            {/* Geometric Decorations (Hidden on Mobile) */}
            <motion.div
                style={{ x: parallaxX, y: parallaxY }}
                className="absolute top-20 left-10 w-16 md:w-32 h-16 md:h-32 border border-accent/20 rounded-full geo-circle hidden md:block"
            />
            <motion.div
                style={{ x: useTransform(parallaxX, v => -v), y: useTransform(parallaxY, v => -v) }}
                className="absolute bottom-32 right-20 w-12 md:w-24 h-12 md:h-24 border border-cyan/20 geo-square rotate-45 hidden md:block"
            />
            <motion.div
                className="absolute top-1/3 right-1/4 w-3 h-3 bg-accent rounded-full float-medium hidden md:block"
            />
            <motion.div
                className="absolute bottom-1/3 left-1/4 w-2 h-2 bg-cyan rounded-full float-slow hidden md:block"
            />

            {/* Mouse Glow (Hidden on Mobile) */}
            <motion.div
                className="hidden md:block fixed w-[600px] h-[600px] rounded-full pointer-events-none z-0"
                animate={{
                    x: mousePosition.x - 300,
                    y: mousePosition.y - 300,
                }}
                transition={{ type: 'spring', damping: 30, stiffness: 200 }}
                style={{
                    background: 'radial-gradient(circle, rgba(16, 185, 129, 0.08) 0%, transparent 60%)',
                }}
            />

            {/* Main Content */}
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="relative z-10 max-w-6xl mx-auto px-6 text-center"
            >
                {/* Greeting */}
                <motion.div variants={itemVariants} className="mb-8">
                    <span className="inline-flex items-center gap-3 px-5 py-2 rounded-full glass text-accent font-mono text-sm tracking-widest">
                        <span className="w-2 h-2 bg-accent rounded-full animate-pulse"></span>
                        {t('hero.available')}
                    </span>
                </motion.div>

                {/* Name */}
                <motion.div variants={itemVariants} className="overflow-hidden mb-2 sm:mb-4">
                    <h1 className="text-4xl xs:text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-heading font-bold tracking-tighter">
                        <span className="shimmer-text">{name}</span>
                    </h1>
                </motion.div>

                <motion.div variants={itemVariants} className="overflow-hidden mb-6 sm:mb-8">
                    <h1 className="text-4xl xs:text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-heading font-bold tracking-tighter text-text-secondary">
                        {lastName}
                    </h1>
                </motion.div>

                {/* Typewriter Tagline */}
                <motion.div
                    variants={itemVariants}
                    className="mb-8 h-10 sm:h-12 md:h-14 flex items-center justify-center"
                >
                    <h2
                        className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-light"
                        style={{ color: roles[roleIndex].color }}
                    >
                        {displayedText}
                        <motion.span
                            animate={{ opacity: [1, 0] }}
                            transition={{ duration: 0.5, repeat: Infinity, repeatType: 'reverse' }}
                            className="inline-block w-[3px] h-[1em] ml-1 align-middle rounded-sm"
                            style={{ backgroundColor: roles[roleIndex].color }}
                        />
                    </h2>
                </motion.div>

                {/* Description */}
                <motion.p
                    variants={itemVariants}
                    className="max-w-2xl mx-auto text-text-secondary text-sm sm:text-base md:text-lg leading-relaxed mb-8 sm:mb-12 px-2"
                >
                    {t('hero.descText1')}<span className="text-white font-medium">{t('hero.descHighlight')}</span>{t('hero.descText2')}
                    <span className="text-accent">{t('hero.descAccent')}</span>{t('hero.descText3')}
                </motion.p>

                {/* CTA Buttons */}
                <motion.div
                    variants={itemVariants}
                    className="flex flex-col sm:flex-row items-center justify-center gap-5"
                >
                    <motion.a
                        href="#projects"
                        className="magnetic-btn btn-filled"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <span>{t('hero.exploreWork')}</span>
                    </motion.a>

                    <motion.a
                        href="#contact"
                        className="magnetic-btn"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <span>{t('hero.letsConnect')}</span>
                    </motion.a>
                </motion.div>
            </motion.div>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2.5 }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center"
            >
                <motion.div
                    animate={{ y: [0, 12, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    className="flex flex-col items-center gap-2"
                >
                    <span className="text-text-secondary/50 text-xs font-mono tracking-[0.3em] rotate-90 origin-center mb-8">{t('hero.scroll')}</span>
                    <div className="w-px h-16 bg-gradient-to-b from-accent to-transparent"></div>
                </motion.div>
            </motion.div>

            {/* Bottom Line */}
            <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent"></div>
        </section>
    );
};

export default Hero;
