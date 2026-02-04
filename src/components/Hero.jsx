import { useRef, useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

const Hero = () => {
    const containerRef = useRef(null);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    // Mouse position for parallax
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const springConfig = { damping: 30, stiffness: 200 };
    const parallaxX = useSpring(useTransform(mouseX, [0, 1], [-30, 30]), springConfig);
    const parallaxY = useSpring(useTransform(mouseY, [0, 1], [-30, 30]), springConfig);

    useEffect(() => {
        const handleMouseMove = (e) => {
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
            transition: { duration: 1, ease: [0.22, 1, 0.36, 1] }
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

            {/* Geometric Decorations */}
            <motion.div
                style={{ x: parallaxX, y: parallaxY }}
                className="absolute top-20 left-10 w-32 h-32 border border-accent/20 rounded-full geo-circle"
            />
            <motion.div
                style={{ x: useTransform(parallaxX, v => -v), y: useTransform(parallaxY, v => -v) }}
                className="absolute bottom-32 right-20 w-24 h-24 border border-cyan/20 geo-square rotate-45"
            />
            <motion.div
                className="absolute top-1/3 right-1/4 w-3 h-3 bg-accent rounded-full float-medium"
            />
            <motion.div
                className="absolute bottom-1/3 left-1/4 w-2 h-2 bg-cyan rounded-full float-slow"
            />

            {/* Mouse Glow */}
            <motion.div
                className="fixed w-[600px] h-[600px] rounded-full pointer-events-none z-0"
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
                        AVAILABLE FOR WORK
                    </span>
                </motion.div>

                {/* Name */}
                <motion.div variants={itemVariants} className="overflow-hidden mb-4">
                    <h1 className="text-6xl sm:text-8xl md:text-9xl font-heading font-bold tracking-tighter">
                        <span className="shimmer-text">{name}</span>
                    </h1>
                </motion.div>

                <motion.div variants={itemVariants} className="overflow-hidden mb-8">
                    <h1 className="text-5xl sm:text-7xl md:text-8xl font-heading font-bold tracking-tighter text-text-secondary">
                        {lastName}
                    </h1>
                </motion.div>

                {/* Tagline */}
                <motion.h2
                    variants={itemVariants}
                    className="text-xl md:text-2xl lg:text-3xl text-text-secondary mb-8 font-light"
                >
                    <span className="text-accent">Software Engineer</span> • <span className="text-cyan">Mobile Developer</span> • <span className="text-blue">Web Developer</span>
                </motion.h2>

                {/* Description */}
                <motion.p
                    variants={itemVariants}
                    className="max-w-2xl mx-auto text-text-secondary text-lg leading-relaxed mb-12"
                >
                    I design and build <span className="text-white font-medium">exceptional digital experiences</span> that are
                    fast, accessible, and visually stunning. Currently focused on creating
                    <span className="text-accent"> impactful web applications</span>.
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
                        <span>Explore My Work</span>
                    </motion.a>

                    <motion.a
                        href="#contact"
                        className="magnetic-btn"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <span>Let's Connect</span>
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
                    <span className="text-text-secondary/50 text-xs font-mono tracking-[0.3em] rotate-90 origin-center mb-8">SCROLL</span>
                    <div className="w-px h-16 bg-gradient-to-b from-accent to-transparent"></div>
                </motion.div>
            </motion.div>

            {/* Bottom Line */}
            <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent"></div>
        </section>
    );
};

export default Hero;
