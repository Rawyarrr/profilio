import { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import { useLanguage } from '../i18n/LanguageContext';

const Projects = () => {
    const [filter, setFilter] = useState('All');
    const [hoveredId, setHoveredId] = useState(null);
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });
    const { t, isRTL } = useLanguage();

    const projectsData = [
        {
            id: 1,
            title: "Kurd Cut",
            category: "Mobile",
            descKey: "projects.kurdcut",
            image: "/img/kurdcut.png",
            techs: ["Flutter", "Dart", "Firebase", "REST APIs"],
            links: { github: "https://github.com/Rawyarrr", live: "#" },
            color: "#f59e0b"
        },
        {
            id: 2,
            title: "Kurd Cut Web",
            category: "Web",
            descKey: "projects.kurdcutweb",
            image: "/img/kurdcutweb.png",
            techs: ["React", "Website", "Booking"],
            links: { github: null, live: "https://kurdcut.vercel.app/" },
            color: "#10b981"
        },
        {
            id: 3,
            title: "Coffee shop Management System",
            category: "Desktop",
            descKey: "projects.coffeeShop",
            image: "/img/cafe.png",
            techs: ["java", "JavaFX", "MySQL"],
            links: { github: "https://github.com/Rawyarrr", live: null },
            color: "#06b6d4"
        },
        {
            id: 4,
            title: "Institute Management System",
            category: "Web",
            descKey: "projects.institute",
            image: "/img/institute.png",
            techs: ["React", "Node.js", "MongoDB", "Express.js"],
            links: { github: "https://github.com/Rawyarrr", live: "#" },
            color: "#3b82f6"
        },
        {
            id: 5,
            title: "Weather Dashboard",
            category: "Web",
            descKey: "projects.weather",
            image: "/img/weather.webp",
            techs: ["React", "API", "Chart.js"],
            links: { github: "https://github.com/Rawyarrr", live: "#" },
            color: "#f59e0b"
        },
        {
            id: 6,
            title: "Supermarket Management System",
            category: "Desktop",
            descKey: "projects.supermarket",
            image: "/img/market.png",
            techs: ["C#", ".NET", "SQL Server", "WPF"],
            links: { github: "https://github.com/Rawyarrr", live: null },
            color: "#ec4899"
        },
        {
            id: 7,
            title: "Portfolio Website",
            category: "Web",
            descKey: "projects.portfolio",
            image: "/img/portfolio.png",
            techs: ["React", "Framer Motion", "Tailwind"],
            links: { github: "https://github.com/Rawyarrr", live: "#" },
            color: "#8b5cf6"
        }
    ];

    const categoryMap = {
        'All': t('projects.all'),
        'Mobile': t('projects.mobile'),
        'Web': t('projects.web'),
        'Desktop': t('projects.desktop'),
    };

    const categories = ["All", "Mobile", "Web", "Desktop"];
    const filteredProjects = filter === 'All' ? projectsData : projectsData.filter(p => p.category === filter);

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
        <section id="projects" className="section-padding relative">
            {/* Background */}
            <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-accent/20 to-transparent"></div>

            <motion.div
                ref={ref}
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1 }}
                className="max-w-6xl mx-auto px-6"
            >
                {/* Section Header */}
                <motion.div variants={cardVariants} className="text-center mb-16">
                    <div className="section-number justify-center">
                        <span>03</span>
                    </div>
                    <h2 className="section-title">
                        {t('projects.sectionTitle1')}<span className="gradient-text">{t('projects.sectionTitle2')}</span>
                    </h2>
                    <p className="text-text-secondary max-w-xl mx-auto mt-4">
                        {t('projects.sectionDesc')}
                    </p>
                </motion.div>

                {/* Filter Tabs */}
                <motion.div variants={cardVariants} className="flex flex-wrap justify-center gap-2 mb-8 sm:mb-12 px-2">
                    {categories.map((cat) => (
                        <motion.button
                            key={cat}
                            onClick={() => setFilter(cat)}
                            className={`relative px-4 sm:px-6 py-2 sm:py-2.5 font-mono text-xs sm:text-sm rounded-full transition-all duration-300 overflow-hidden ${filter === cat
                                ? 'text-primary'
                                : 'text-text-secondary hover:text-white border border-border-color'
                                }`}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            {filter === cat && (
                                <motion.div
                                    layoutId="activeProjectTab"
                                    className="absolute inset-0 bg-gradient-to-r from-accent to-cyan rounded-full"
                                    transition={{ type: 'spring', duration: 0.5 }}
                                />
                            )}
                            <span className="relative z-10">{categoryMap[cat]}</span>
                        </motion.button>
                    ))}
                </motion.div>

                {/* Projects Grid */}
                <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                    <AnimatePresence mode="popLayout">
                        {filteredProjects.map((project) => (
                            <motion.div
                                layout
                                key={project.id}
                                variants={cardVariants}
                                initial="hidden"
                                animate="visible"
                                exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.3 } }}
                                onMouseEnter={() => setHoveredId(project.id)}
                                onMouseLeave={() => setHoveredId(null)}
                                className="premium-card group relative"
                            >
                                {/* Image Area */}
                                <div className="relative h-40 sm:h-48 overflow-hidden rounded-t-2xl">
                                    {project.image ? (
                                        <img
                                            src={project.image}
                                            alt={project.title}
                                            className="absolute inset-0 w-full h-full object-cover"
                                        />
                                    ) : (
                                        <div
                                            className="absolute inset-0"
                                            style={{ background: `linear-gradient(135deg, ${project.color}40, ${project.color}10)` }}
                                        />
                                    )}
                                    <div className="absolute inset-0 bg-gradient-to-t from-secondary via-secondary/50 to-transparent z-10"></div>
                                    <motion.div
                                        animate={{
                                            scale: hoveredId === project.id ? 1.1 : 1,
                                            opacity: hoveredId === project.id ? 0.2 : 0.4
                                        }}
                                        transition={{ duration: 0.4 }}
                                        className="absolute inset-0 z-[5]"
                                        style={{ background: `linear-gradient(135deg, ${project.color}60, ${project.color}20)` }}
                                    />

                                    {/* Project Number */}
                                    <div className={`absolute top-4 ${isRTL ? 'right-4' : 'left-4'} z-20`}>
                                        <span className="text-5xl font-heading font-bold opacity-20" style={{ color: project.color }}>
                                            0{project.id}
                                        </span>
                                    </div>

                                    {/* Links */}
                                    <motion.div
                                        className={`absolute top-4 ${isRTL ? 'left-4' : 'right-4'} z-20 flex gap-3`}
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: hoveredId === project.id ? 1 : 0, y: hoveredId === project.id ? 0 : -10 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        {project.links.github && (
                                            <motion.a
                                                href={project.links.github}
                                                className="w-10 h-10 rounded-full glass flex items-center justify-center text-white hover:text-accent transition-colors"
                                                whileHover={{ scale: 1.1 }}
                                            >
                                                <FaGithub size={18} />
                                            </motion.a>
                                        )}
                                        {project.links.live && (
                                            <motion.a
                                                href={project.links.live}
                                                className="w-10 h-10 rounded-full glass flex items-center justify-center text-white hover:text-accent transition-colors"
                                                whileHover={{ scale: 1.1 }}
                                            >
                                                <FaExternalLinkAlt size={16} />
                                            </motion.a>
                                        )}
                                    </motion.div>
                                </div>

                                {/* Content */}
                                <div className="p-6">
                                    <div className="flex items-center gap-2 mb-3">
                                        <span
                                            className="px-3 py-1 text-xs font-mono rounded-full"
                                            style={{ background: `${project.color}20`, color: project.color }}
                                        >
                                            {categoryMap[project.category]}
                                        </span>
                                    </div>

                                    <h3 className="text-xl font-heading font-bold text-white mb-3 group-hover:text-accent transition-colors">
                                        {project.title}
                                    </h3>

                                    <p className="text-text-secondary text-sm leading-relaxed mb-4 line-clamp-2">
                                        {t(project.descKey)}
                                    </p>

                                    {/* Tech Stack */}
                                    <div className="flex flex-wrap gap-2 mb-4">
                                        {project.techs.map((tech, i) => (
                                            <span key={i} className="text-xs font-mono text-text-secondary">
                                                {tech}{i < project.techs.length - 1 && " •"}
                                            </span>
                                        ))}
                                    </div>

                                </div>

                                {/* Top Gradient Line */}
                                <motion.div
                                    className="absolute top-0 left-0 right-0 h-px"
                                    style={{ background: `linear-gradient(90deg, transparent, ${project.color}, transparent)` }}
                                    initial={{ scaleX: 0 }}
                                    animate={{ scaleX: hoveredId === project.id ? 1 : 0 }}
                                    transition={{ duration: 0.3 }}
                                />
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>

                {/* View More */}
                <motion.div variants={cardVariants} className="text-center mt-12">
                    <motion.a
                        href="https://github.com/Rawyarrr"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-3 magnetic-btn"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <FaGithub size={18} />
                        <span>{t('projects.seeMoreGithub')}</span>
                    </motion.a>
                </motion.div>
            </motion.div>
        </section>
    );
};

export default Projects;
