import { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt, FaArrowRight } from 'react-icons/fa';

const projectsData = [
    {
        id: 1,
        title: "Kurd Cut",
        category: "Mobile",
        description: "Barber and salon booking application with real-time features, interactive maps, push notifications, appointment management, and seamless user experience for customers and barbers.",
        image: "/img/kurdcut.png",
        techs: ["Flutter", "Dart", "Firebase", "REST APIs"],
        links: { github: "#", live: "#" },
        color: "#f59e0b"
    },
    {
        id: 2,
        title: "Coffee shop Management System",
        category: "Desktop",
        description: "Comprehensive desktop application for managing coffee shop, borrower records, and automated due date reminders with reporting features.",
        image: "/img/cafe.png",
        techs: ["java", "JavaFX", "MySQL"],
        links: { github: "#", live: null },
        color: "#06b6d4"
    },
    {
        id: 3,
        title: "Institute Management System",
        category: "Web",
        description: "Comprehensive web application for managing institute records, student information, and automated due date reminders with reporting features.",
        image: "/img/institute.png",
        techs: ["React", "Node.js", "MongoDB", "Express.js"],
        links: { github: "#", live: "#" },
        color: "#3b82f6"
    },
    {
        id: 4,
        title: "Weather Dashboard",
        category: "Web",
        description: "Real-time weather tracking with beautiful visualizations, 7-day forecasts, and location-based weather alerts.",
        image: "/img/weather.webp",
        techs: ["React", "API", "Chart.js"],
        links: { github: "#", live: "#" },
        color: "#f59e0b"
    },
    {
        id: 5,
        title: "Supermarket Management System",
        category: "Desktop",
        description: "Comprehensive desktop application for managing supermarket inventory, sales tracking, and automated reporting features.",
        image: "/img/market.png",
        techs: ["C#", ".NET", "SQL Server", "WPF"],
        links: { github: "#", live: null },
        color: "#ec4899"
    },
    {
        id: 6,
        title: "Portfolio Website",
        category: "Web",
        description: "Modern personal portfolio showcasing projects and skills with smooth animations and responsive design.",
        image: "/img/portfolio.png",
        techs: ["React", "Framer Motion", "Tailwind"],
        links: { github: "#", live: "#" },
        color: "#8b5cf6"
    }
];

const Projects = () => {
    const [filter, setFilter] = useState('All');
    const [hoveredId, setHoveredId] = useState(null);
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

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
        hidden: { opacity: 0, y: 60 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
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
                animate={isInView ? "visible" : "hidden"}
                className="max-w-6xl mx-auto px-6"
            >
                {/* Section Header */}
                <motion.div variants={cardVariants} className="text-center mb-16">
                    <div className="section-number justify-center">
                        <span>03</span>
                    </div>
                    <h2 className="section-title">
                        Featured <span className="gradient-text">Projects</span>
                    </h2>
                    <p className="text-text-secondary max-w-xl mx-auto mt-4">
                        Some things I've built with love and dedication
                    </p>
                </motion.div>

                {/* Filter Tabs */}
                <motion.div variants={cardVariants} className="flex justify-center gap-2 mb-12">
                    {categories.map((cat) => (
                        <motion.button
                            key={cat}
                            onClick={() => setFilter(cat)}
                            className={`relative px-6 py-2.5 font-mono text-sm rounded-full transition-all duration-300 overflow-hidden ${filter === cat
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
                            <span className="relative z-10">{cat}</span>
                        </motion.button>
                    ))}
                </motion.div>

                {/* Projects Grid */}
                <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
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
                                <div className="relative h-48 overflow-hidden rounded-t-2xl">
                                    {/* Actual Image or Gradient Placeholder */}
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
                                    {/* Overlay */}
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
                                    <div className="absolute top-4 left-4 z-20">
                                        <span className="text-5xl font-heading font-bold opacity-20" style={{ color: project.color }}>
                                            0{project.id}
                                        </span>
                                    </div>

                                    {/* Links */}
                                    <motion.div
                                        className="absolute top-4 right-4 z-20 flex gap-3"
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
                                            {project.category}
                                        </span>
                                    </div>

                                    <h3 className="text-xl font-heading font-bold text-white mb-3 group-hover:text-accent transition-colors">
                                        {project.title}
                                    </h3>

                                    <p className="text-text-secondary text-sm leading-relaxed mb-4 line-clamp-2">
                                        {project.description}
                                    </p>

                                    {/* Tech Stack */}
                                    <div className="flex flex-wrap gap-2 mb-4">
                                        {project.techs.map((tech, i) => (
                                            <span key={i} className="text-xs font-mono text-text-secondary">
                                                {tech}{i < project.techs.length - 1 && " •"}
                                            </span>
                                        ))}
                                    </div>

                                    {/* View More */}
                                    <motion.div
                                        className="flex items-center gap-2 text-sm font-medium text-accent opacity-0 group-hover:opacity-100 transition-opacity"
                                    >
                                        <span>View Details</span>
                                        <motion.span animate={{ x: hoveredId === project.id ? 5 : 0 }}>
                                            <FaArrowRight size={12} />
                                        </motion.span>
                                    </motion.div>
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
                        <span>See More on GitHub</span>
                    </motion.a>
                </motion.div>
            </motion.div>
        </section>
    );
};

export default Projects;
