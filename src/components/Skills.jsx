import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { FaReact, FaNodeJs, FaPython, FaDatabase, FaMobile, FaServer } from 'react-icons/fa';

const skillsData = [
    {
        title: "Frontend",
        description: "Building responsive, animated UIs with modern frameworks",
        icon: <FaReact />,
        skills: [
            { name: "React / Next.js", level: 90 },
            { name: "TypeScript", level: 85 },
            { name: "Tailwind CSS", level: 95 },
            { name: "Framer Motion", level: 80 },
        ],
        accent: "#10b981"
    },
    {
        title: "Backend",
        description: "Creating robust APIs and server-side applications",
        icon: <FaServer />,
        skills: [
            { name: "Node.js / Express", level: 85 },
            { name: "C# / .NET", level: 80 },
            { name: "Python / Django", level: 75 },
            { name: "REST / GraphQL", level: 85 },
        ],
        accent: "#06b6d4"
    },
    {
        title: "Database",
        description: "Designing efficient data models and queries",
        icon: <FaDatabase />,
        skills: [
            { name: "PostgreSQL", level: 80 },
            { name: "MongoDB", level: 85 },
            { name: "Firebase", level: 90 },
            { name: "SQL Server", level: 75 },
        ],
        accent: "#3b82f6"
    },
    {
        title: "Mobile Development",
        description: "Building beautiful cross-platform apps with Flutter & Firebase",
        icon: <FaMobile />,
        skills: [
            { name: "Flutter", level: 95 },
            { name: "Dart", level: 90 },
            { name: "Firebase / Firestore", level: 90 },
            { name: "Firebase Auth", level: 85 },
        ],
        accent: "#f59e0b"
    },
];

const Skills = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });
    const [hoveredSkill, setHoveredSkill] = useState(null);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    };

    const cardVariants = {
        hidden: { opacity: 0, y: 60 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
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
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan/10 rounded-full blur-3xl"></div>

            <motion.div
                ref={ref}
                variants={containerVariants}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                className="max-w-6xl mx-auto px-6 relative z-10"
            >
                {/* Section Header */}
                <motion.div variants={cardVariants} className="text-center mb-16">
                    <div className="section-number justify-center">
                        <span>02</span>
                    </div>
                    <h2 className="section-title">
                        Skills & <span className="gradient-text">Expertise</span>
                    </h2>
                    <p className="text-text-secondary max-w-xl mx-auto mt-4">
                        Technologies and tools I use to bring ideas to life
                    </p>
                </motion.div>

                {/* Skills Grid */}
                <div className="grid md:grid-cols-2 gap-6">
                    {skillsData.map((category, i) => (
                        <motion.div
                            key={i}
                            variants={cardVariants}
                            onMouseEnter={() => setHoveredSkill(i)}
                            onMouseLeave={() => setHoveredSkill(null)}
                            className="premium-card p-8 group"
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
                                            <span className="text-text-secondary">{skill.name}</span>
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
                    <p className="text-text-secondary mb-6">Also experienced with</p>
                    <div className="flex flex-wrap justify-center gap-4">
                        {['Firebase Cloud Functions', 'REST APIs', 'Git', 'Figma', 'VS Code', 'Android Studio'].map((tool, i) => (
                            <motion.span
                                key={i}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                                transition={{ delay: 0.8 + i * 0.05 }}
                                whileHover={{ scale: 1.1, y: -2 }}
                                className="px-4 py-2 glass rounded-full text-sm text-text-secondary hover:text-accent transition-colors"
                            >
                                {tool}
                            </motion.span>
                        ))}
                    </div>
                </motion.div>
            </motion.div>
        </section>
    );
};

export default Skills;
