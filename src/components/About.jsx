import { useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';

const About = () => {
    const ref = useRef(null);
    const imageRef = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    const { scrollYProgress } = useScroll({
        target: imageRef,
        offset: ["start end", "end start"]
    });

    const imageY = useTransform(scrollYProgress, [0, 1], [50, -50]);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.15, delayChildren: 0.2 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
        }
    };

    const techs = [
        "Flutter / Dart", "Firebase / Firestore", "React / Next.js",
        "Node.js / Express", "C# / .NET Core", "Python",
        "SQL / MongoDB", "Git / GitHub"
    ];

    const stats = [
        { number: "3+", label: "Years Experience" },
        { number: "30+", label: "Projects Completed" },
    ];

    return (
        <section id="about" className="section-padding relative overflow-hidden">
            {/* Background */}
            <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-accent/5 to-transparent pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan/5 rounded-full blur-3xl"></div>

            <motion.div
                ref={ref}
                variants={containerVariants}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                className="max-w-6xl mx-auto px-6"
            >
                {/* Section Header */}
                <motion.div variants={itemVariants} className="mb-16">
                    <div className="section-number">
                        <span>01</span>
                    </div>
                    <h2 className="section-title">
                        About <span className="gradient-text">Me</span>
                    </h2>
                </motion.div>

                <div className="grid lg:grid-cols-5 gap-16 items-start">
                    {/* Text Content */}
                    <div className="lg:col-span-3 space-y-8">
                        <motion.p variants={itemVariants} className="text-text-secondary text-lg leading-relaxed">
                            Hello! I'm <span className="text-white font-semibold">Rawyar</span>, a passionate
                            <span className="text-accent"> Software Engineer</span> and
                            <span className="text-cyan"> Computer Science student</span> based in Kurdistan/Sulaymaniyah.
                            I love creating digital solutions that blend beautiful design with robust functionality.
                        </motion.p>

                        <motion.p variants={itemVariants} className="text-text-secondary text-lg leading-relaxed">
                            My journey into programming began during university, and I've since built everything from
                            <span className="text-white"> cross-platform mobile apps</span> and
                            <span className="text-white"> full-stack web applications</span>. I specialize in
                            building beautiful, performant apps<span className="text-cyan"></span> .
                        </motion.p>

                        {/* Tech Stack */}
                        <motion.div variants={itemVariants}>
                            <p className="text-white font-medium mb-4 flex items-center gap-2">
                                <span className="w-6 h-px bg-accent"></span>
                                Technologies I work with
                            </p>
                            <ul className="grid grid-cols-2 gap-3">
                                {techs.map((tech, i) => (
                                    <motion.li
                                        key={i}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                                        transition={{ delay: 0.4 + i * 0.05 }}
                                        className="flex items-center gap-2 text-text-secondary text-sm"
                                    >
                                        <span className="text-accent text-xs">▹</span>
                                        {tech}
                                    </motion.li>
                                ))}
                            </ul>
                        </motion.div>

                        {/* Stats */}
                        <motion.div
                            variants={itemVariants}
                            className="flex gap-8 pt-4"
                        >
                            {stats.map((stat, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                                    transition={{ delay: 0.6 + i * 0.1 }}
                                    className="text-center"
                                >
                                    <div className="text-3xl md:text-4xl font-heading font-bold gradient-text mb-1">
                                        {stat.number}
                                    </div>
                                    <div className="text-text-secondary text-xs uppercase tracking-wider">
                                        {stat.label}
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>

                    {/* Image */}
                    <motion.div
                        ref={imageRef}
                        variants={itemVariants}
                        className="lg:col-span-2 relative"
                    >
                        <motion.div style={{ y: imageY }} className="relative">
                            {/* Decorative Elements */}
                            <div className="absolute -inset-4 border border-accent/20 rounded-2xl"></div>
                            <div className="absolute -inset-8 border border-cyan/10 rounded-2xl rotate-3"></div>

                            {/* Image Container */}
                            <div className="relative rounded-2xl overflow-hidden group">
                                <div className="absolute inset-0 bg-gradient-to-t from-primary via-transparent to-transparent z-10"></div>
                                <div className="absolute inset-0 bg-accent/20 mix-blend-multiply z-10 group-hover:bg-transparent transition-all duration-500"></div>

                                <motion.img
                                    src="/img/rawyar.jpg"
                                    alt="Rawyar Salar"
                                    className="w-full aspect-[3/4] object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
                                />

                                {/* Corner Accents */}
                                <div className="absolute top-4 left-4 w-8 h-8 border-l-2 border-t-2 border-accent opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
                                <div className="absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 border-cyan opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
                            </div>

                            {/* Floating Status */}
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={isInView ? { opacity: 1, x: 0 } : {}}
                                transition={{ delay: 0.8 }}
                                className="absolute -bottom-4 -left-4 glass px-4 py-3 rounded-xl"
                            >
                                <div className="flex items-center gap-2">
                                    <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                                    <span className="text-sm font-mono text-text-secondary">Open to work</span>
                                </div>
                            </motion.div>
                        </motion.div>
                    </motion.div>
                </div>
            </motion.div>
        </section>
    );
};

export default About;
