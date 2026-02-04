import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaInstagram, FaHeart, FaFacebook } from 'react-icons/fa';

const Footer = () => {
    const socials = [
        { icon: <FaGithub />, href: "https://github.com/Rawyarrr", label: "GitHub" },
        { icon: <FaLinkedin />, href: "https://www.linkedin.com/in/rawyar-salar-06468b347/", label: "LinkedIn" },
        { icon: <FaFacebook />, href: "https://web.facebook.com/shkar.hawramy.169", label: "Facebook" },
        { icon: <FaInstagram />, href: "https://www.instagram.com/rawyar_salar/", label: "Instagram" },
    ];

    const quickLinks = [
        { name: "Home", href: "#home" },
        { name: "About", href: "#about" },
        { name: "Skills", href: "#skills" },
        { name: "Projects", href: "#projects" },
        { name: "Contact", href: "#contact" },
    ];

    return (
        <footer className="relative pt-20 pb-8">
            {/* Top Decoration */}
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent"></div>

            {/* Background Glow */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-48 bg-accent/5 blur-3xl pointer-events-none"></div>

            <div className="max-w-6xl mx-auto px-6 relative z-10">
                <div className="grid md:grid-cols-3 gap-12 mb-16">
                    {/* Brand */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <a href="#home" className="flex items-center gap-2 mb-4">
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent to-cyan flex items-center justify-center">
                                <span className="text-primary font-heading font-bold text-lg">R</span>
                            </div>
                            <span className="font-heading font-bold text-xl text-white">
                                Rawyar<span className="text-accent">.</span>
                            </span>
                        </a>
                        <p className="text-text-secondary text-sm leading-relaxed">
                            Software Engineer crafting beautiful digital experiences.
                            Available for freelance projects and collaborations.
                        </p>
                    </motion.div>

                    {/* Quick Links */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                    >
                        <h4 className="text-white font-heading font-bold mb-4">Quick Links</h4>
                        <ul className="space-y-2">
                            {quickLinks.map((link, i) => (
                                <li key={i}>
                                    <a
                                        href={link.href}
                                        className="text-text-secondary text-sm hover:text-accent transition-colors animated-underline"
                                    >
                                        {link.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* Contact */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                    >
                        <h4 className="text-white font-heading font-bold mb-4">Get in Touch</h4>
                        <p className="text-text-secondary text-sm mb-4">
                            Feel free to reach out for collaborations or just a friendly hello!
                        </p>
                        <a
                            href="mailto:salarrawyar8@gmail.com"
                            className="text-accent font-medium hover:text-accent-light transition-colors"
                        >
                            salarrawyar8@gmail.com
                        </a>
                    </motion.div>
                </div>

                {/* Divider */}
                <div className="h-px bg-border-color mb-8"></div>

                {/* Bottom Section */}
                <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                    {/* Social Links */}
                    <div className="flex gap-4">
                        {socials.map((social, i) => (
                            <motion.a
                                key={i}
                                href={social.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={social.label}
                                className="w-10 h-10 rounded-full glass flex items-center justify-center text-text-secondary hover:text-accent hover:border-accent/50 transition-all duration-300"
                                whileHover={{ y: -5, scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.05 }}
                            >
                                {social.icon}
                            </motion.a>
                        ))}
                    </div>

                    {/* Credit */}
                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="text-text-secondary text-sm font-mono"
                    >
                        © {new Date().getFullYear()} • Built by <span className="text-accent">Rawyar Salar</span>
                    </motion.p>
                </div>

                {/* Back to Top */}
                <motion.a
                    href="#home"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    whileHover={{ y: -5 }}
                    className="fixed bottom-8 right-8 w-12 h-12 rounded-full bg-accent/10 border border-accent/30 flex items-center justify-center text-accent hover:bg-accent hover:text-primary transition-all duration-300 z-50"
                >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M18 15l-6-6-6 6" />
                    </svg>
                </motion.a>
            </div>
        </footer>
    );
};

export default Footer;
