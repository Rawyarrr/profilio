import { motion } from 'framer-motion';
import { useLanguage } from '../i18n/LanguageContext';

const Loader = () => {
    const { t } = useLanguage();
    const name = "RAWYAR";
    const subtitle = "SALAR";

    return (
        <motion.div
            className="loader-screen"
            initial={{ opacity: 1 }}
            exit={{
                opacity: 0,
                transition: { duration: 1, ease: [0.76, 0, 0.24, 1] }
            }}
        >
            {/* Animated Orbs */}
            <div className="orb orb-1"></div>
            <div className="orb orb-2"></div>

            <div className="relative z-10 text-center">
                {/* First Name */}
                <div className="loader-text mb-2">
                    {name.split('').map((letter, i) => (
                        <motion.span
                            key={i}
                            initial={{ opacity: 0, y: 100, rotateX: -90 }}
                            animate={{ opacity: 1, y: 0, rotateX: 0 }}
                            transition={{
                                duration: 0.8,
                                delay: i * 0.08,
                                ease: [0.22, 1, 0.36, 1]
                            }}
                            className="gradient-text"
                        >
                            {letter}
                        </motion.span>
                    ))}
                </div>

                {/* Last Name */}
                <div className="loader-text text-2xl md:text-4xl text-text-secondary">
                    {subtitle.split('').map((letter, i) => (
                        <motion.span
                            key={i}
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{
                                duration: 0.6,
                                delay: 0.5 + i * 0.08,
                                ease: [0.22, 1, 0.36, 1]
                            }}
                        >
                            {letter}
                        </motion.span>
                    ))}
                </div>
            </div>

            {/* Loading bar */}
            <motion.div
                className="absolute bottom-24 left-0 right-0 flex justify-center"
                initial={{ opacity: 0, scaleX: 0 }}
                animate={{ opacity: 1, scaleX: 1 }}
                transition={{ delay: 1, duration: 0.5 }}
            >
                <div className="w-56 h-1 bg-secondary rounded-full overflow-hidden">
                    <motion.div
                        className="h-full bg-gradient-to-r from-accent via-cyan to-blue rounded-full"
                        initial={{ width: '0%' }}
                        animate={{ width: '100%' }}
                        transition={{ duration: 1.8, delay: 1.2, ease: [0.22, 1, 0.36, 1] }}
                    />
                </div>
            </motion.div>

            {/* Tagline */}
            <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 }}
                className="absolute bottom-12 left-0 right-0 text-center text-text-secondary font-mono text-sm tracking-widest"
            >
                {t('loader.tagline')}
            </motion.p>
        </motion.div>
    );
};

export default Loader;
