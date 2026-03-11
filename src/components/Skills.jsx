import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { FaReact, FaDatabase, FaMobile, FaServer } from 'react-icons/fa';
import {
    SiReact, SiNextdotjs, SiTypescript, SiTailwindcss, SiFramer,
    SiNodedotjs, SiDotnet, SiPython, SiDjango, SiGraphql,
    SiPostgresql, SiMongodb, SiFirebase,
    SiFlutter, SiDart,
    SiGit, SiFigma, SiAndroidstudio
} from 'react-icons/si';
import { DiMsqlServer } from 'react-icons/di';
import { VscCode } from 'react-icons/vsc';
import { useLanguage } from '../i18n/LanguageContext';

const Skills = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });
    const [hoveredSkill, setHoveredSkill] = useState(null);
    const { t } = useLanguage();

    const skillsData = [
        {
            title: t('skills.frontend'),
            description: t('skills.frontendDesc'),
            icon: <FaReact />,
            skills: [
                { name: "React / Next.js", level: 90, icon: <SiReact /> },
                { name: "TypeScript", level: 85, icon: <SiTypescript /> },
                { name: "Tailwind CSS", level: 95, icon: <SiTailwindcss /> },
                { name: "Framer Motion", level: 80, icon: <SiFramer /> },
            ],
            accent: "#10b981"
        },
        {
            title: t('skills.backend'),
            description: t('skills.backendDesc'),
            icon: <FaServer />,
            skills: [
                { name: "Node.js / Express", level: 85, icon: <SiNodedotjs /> },
                { name: "C# / .NET", level: 80, icon: <SiDotnet /> },
                { name: "Python / Django", level: 75, icon: <SiPython /> },
                { name: "REST / GraphQL", level: 85, icon: <SiGraphql /> },
            ],
            accent: "#06b6d4"
        },
        {
            title: t('skills.database'),
            description: t('skills.databaseDesc'),
            icon: <FaDatabase />,
            skills: [
                { name: "PostgreSQL", level: 80, icon: <SiPostgresql /> },
                { name: "MongoDB", level: 85, icon: <SiMongodb /> },
                { name: "Firebase", level: 90, icon: <SiFirebase /> },
                { name: "SQL Server", level: 75, icon: <DiMsqlServer /> },
            ],
            accent: "#3b82f6"
        },
        {
            title: t('skills.mobile'),
            description: t('skills.mobileDesc'),
            icon: <FaMobile />,
            skills: [
                { name: "Flutter", level: 95, icon: <SiFlutter /> },
                { name: "Dart", level: 90, icon: <SiDart /> },
                { name: "Firebase / Firestore", level: 90, icon: <SiFirebase /> },
                { name: "Firebase Auth", level: 85, icon: <SiFirebase /> },
            ],
            accent: "#f59e0b"
        },
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    };

    const cardVariants = {
        hidden: { opacity: 0, y: 30, scale: 0.98 },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: { duration: 0.8, ease: "easeOut" }
        }
    };

    return (
        <section id="skills" className="section-padding relative overflow-hidden bg-secondary/30">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-[0.02]">
                <div className="absolute inset-0" style={{
                    backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
                    backgroundSize: '50px 50px'
                }}></div>
            </div>

            {/* Gradient Orbs */}
            <div className="absolute top-0 left-1/4 w-96 max-w-full h-96 bg-accent/10 rounded-full blur-3xl pointer-events-none"></div>
            <div className="absolute bottom-0 right-1/4 w-96 max-w-full h-96 bg-cyan/10 rounded-full blur-3xl pointer-events-none"></div>

            <motion.div
                ref={ref}
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1 }}
                className="max-w-6xl mx-auto px-6 relative z-10"
            >
                {/* Section Header */}
                <motion.div variants={cardVariants} className="text-center mb-16">
                    <div className="section-number justify-center">
                        <span>02</span>
                    </div>
                    <h2 className="section-title">
                        {t('skills.sectionTitle1')}<span className="gradient-text">{t('skills.sectionTitle2')}</span>
                    </h2>
                    <p className="text-text-secondary max-w-xl mx-auto mt-4">
                        {t('skills.sectionDesc')}
                    </p>
                </motion.div>

                {/* Skills Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                    {skillsData.map((category, i) => (
                        <motion.div
                            key={i}
                            variants={cardVariants}
                            onMouseEnter={() => setHoveredSkill(i)}
                            onMouseLeave={() => setHoveredSkill(null)}
                            className="premium-card p-5 sm:p-8 group"
                        >
                            {/* Header */}
                            <div className="flex items-start gap-4 mb-6">
                                <motion.div
                                    className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl"
                                    style={{
                                        background: `linear-gradient(135deg, ${category.accent}20, transparent)`,
                                        color: category.accent
                                    }}
                                    animate={{
                                        rotate: hoveredSkill === i ? [0, -10, 10, 0] : 0,
                                        scale: hoveredSkill === i ? 1.1 : 1
                                    }}
                                    transition={{ duration: 0.5 }}
                                >
                                    {category.icon}
                                </motion.div>
                                <div>
                                    <h3 className="text-xl font-heading font-bold text-white group-hover:text-accent transition-colors">
                                        {category.title}
                                    </h3>
                                    <p className="text-text-secondary text-sm">{category.description}</p>
                                </div>
                            </div>

                            {/* Skills with Progress Bars */}
                            <div className="space-y-4">
                                {category.skills.map((skill, j) => (
                                    <div key={j}>
                                        <div className="flex justify-between text-sm mb-1.5">
                                            <span className="text-text-secondary flex items-center gap-2">
                                                {skill.icon && <span style={{ color: category.accent }}>{skill.icon}</span>}
                                                {skill.name}
                                            </span>
                                            <motion.span
                                                initial={{ opacity: 0 }}
                                                animate={isInView ? { opacity: 1 } : {}}
                                                transition={{ delay: 0.5 + j * 0.1 }}
                                                className="text-white font-mono"
                                            >
                                                {skill.level}%
                                            </motion.span>
                                        </div>
                                        <div className="h-1.5 bg-tertiary rounded-full overflow-hidden">
                                            <motion.div
                                                initial={{ width: 0 }}
                                                animate={isInView ? { width: `${skill.level}%` } : {}}
                                                transition={{ duration: 1, delay: 0.3 + j * 0.1, ease: [0.22, 1, 0.36, 1] }}
                                                className="h-full rounded-full"
                                                style={{ background: `linear-gradient(90deg, ${category.accent}, ${category.accent}80)` }}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Hover Glow */}
                            <motion.div
                                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl pointer-events-none"
                                style={{
                                    background: `radial-gradient(circle at 50% 50%, ${category.accent}08, transparent 70%)`
                                }}
                            />
                        </motion.div>
                    ))}
                </div>

                {/* Additional Tools */}
                <motion.div variants={cardVariants} className="mt-12 text-center">
                    <p className="text-text-secondary mb-6">{t('skills.alsoExperienced')}</p>
                    <div className="flex flex-wrap justify-center gap-2 sm:gap-4">
                        {[
                            { name: 'Firebase Cloud Functions', icon: <SiFirebase /> },
                            { name: 'REST APIs', icon: <SiGraphql /> },
                            { name: 'Git', icon: <SiGit /> },
                            { name: 'Figma', icon: <SiFigma /> },
                            { name: 'VS Code', icon: <VscCode /> },
                            { name: 'Android Studio', icon: <SiAndroidstudio /> },
                        ].map((tool, i) => (
                            <motion.span
                                key={i}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                                transition={{ delay: 0.8 + i * 0.05 }}
                                whileHover={{ scale: 1.1, y: -2 }}
                                className="px-3 sm:px-4 py-1.5 sm:py-2 glass rounded-full text-xs sm:text-sm text-text-secondary hover:text-accent transition-colors flex items-center gap-1.5 sm:gap-2"
                            >
                                <span className="text-accent">{tool.icon}</span>
                                {tool.name}
                            </motion.span>
                        ))}
                    </div>
                </motion.div>
            </motion.div>
        </section>
    );
};

export default Skills;
