import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { FaPaperPlane, FaEnvelope, FaMapMarkerAlt, FaPhone } from 'react-icons/fa';
import { useLanguage } from '../i18n/LanguageContext';

const Contact = () => {
    const ref = useRef(null);
    const formRef = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });
    const [formState, setFormState] = useState({ name: '', email: '', message: '' });
    const [focused, setFocused] = useState(null);
    const [status, setStatus] = useState({ submitting: false, submitted: false, error: null });
    const { t, isRTL } = useLanguage();

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
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

    const handleChange = (e) => {
        setFormState({ ...formState, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus({ submitting: true, submitted: false, error: null });

        try {
            const response = await fetch("https://formsubmit.co/ajax/salarrawyar8@gmail.com", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    name: formState.name,
                    email: formState.email,
                    message: formState.message,
                    _subject: `Portfolio Contact from ${formState.name}`
                })
            });

            const data = await response.json();

            if (response.ok) {
                setStatus({ submitting: false, submitted: true, error: null });
                setFormState({ name: '', email: '', message: '' });
                setTimeout(() => setStatus(prev => ({ ...prev, submitted: false })), 5000);
            } else {
                setStatus({ submitting: false, submitted: false, error: data.message || 'Something went wrong!' });
            }
        } catch (error) {
            setStatus({ submitting: false, submitted: false, error: t('contact.errorMessage') });
        }
    };

    const contactInfo = [
        { icon: <FaEnvelope />, label: t('contact.email'), value: "salarrawyar8@gmail.com", href: "mailto:salarrawyar8@gmail.com" },
        { icon: <FaMapMarkerAlt />, label: t('contact.location'), value: t('contact.locationValue'), href: null },
        { icon: <FaPhone />, label: t('contact.phone'), value: "+964 750 159 2173", href: "tel:+9647501592173" },
    ];

    const labelPosition = isRTL ? 'right-5' : 'left-5';

    return (
        <section id="contact" className="section-padding relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute top-0 left-0 w-full h-full">
                <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl"></div>
                <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-cyan/10 rounded-full blur-3xl"></div>
            </div>

            <motion.div
                ref={ref}
                variants={containerVariants}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                className="max-w-6xl mx-auto px-6 relative z-10"
            >
                {/* Section Header */}
                <motion.div variants={itemVariants} className="text-center mb-16">
                    <div className="section-number justify-center">
                        <span>04</span>
                    </div>
                    <h2 className="section-title">
                        {t('contact.sectionTitle1')}<span className="gradient-text">{t('contact.sectionTitle2')}</span>
                    </h2>
                    <p className="text-text-secondary max-w-xl mx-auto mt-4">
                        {t('contact.sectionDesc')}
                    </p>
                </motion.div>

                <div className="grid lg:grid-cols-5 gap-8 lg:gap-12">
                    {/* Contact Info */}
                    <motion.div variants={itemVariants} className="lg:col-span-2 space-y-8">
                        <div>
                            <h3 className="text-2xl font-heading font-bold text-white mb-4">
                                {t('contact.getInTouch')}
                            </h3>
                            <p className="text-text-secondary leading-relaxed">
                                {t('contact.contactDesc')}
                            </p>
                        </div>

                        <div className="space-y-4">
                            {contactInfo.map((info, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, x: isRTL ? 20 : -20 }}
                                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                                    transition={{ delay: 0.3 + i * 0.1 }}
                                    className="group"
                                >
                                    {info.href ? (
                                        <a href={info.href} className="flex items-center gap-4 p-4 glass rounded-xl hover:border-accent/50 transition-all duration-300">
                                            <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-primary transition-all duration-300">
                                                {info.icon}
                                            </div>
                                            <div>
                                                <p className="text-text-secondary text-sm">{info.label}</p>
                                                <p className="text-white font-medium">{info.value}</p>
                                            </div>
                                        </a>
                                    ) : (
                                        <div className="flex items-center gap-4 p-4 glass rounded-xl">
                                            <div className="w-12 h-12 rounded-xl bg-cyan/10 flex items-center justify-center text-cyan">
                                                {info.icon}
                                            </div>
                                            <div>
                                                <p className="text-text-secondary text-sm">{info.label}</p>
                                                <p className="text-white font-medium">{info.value}</p>
                                            </div>
                                        </div>
                                    )}
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Contact Form */}
                    <motion.div variants={itemVariants} className="lg:col-span-3">
                        <form ref={formRef} onSubmit={handleSubmit} className="premium-card p-5 sm:p-8 space-y-5 sm:space-y-6">
                            <div className="grid sm:grid-cols-2 gap-6">
                                {/* Name Input */}
                                <div className="relative">
                                    <motion.input
                                        type="text"
                                        name="name"
                                        value={formState.name}
                                        onChange={handleChange}
                                        onFocus={() => setFocused('name')}
                                        onBlur={() => setFocused(null)}
                                        className="w-full bg-tertiary/50 border border-border-color rounded-xl px-5 py-4 text-white focus:outline-none focus:border-accent transition-colors"
                                        placeholder=" "
                                        required
                                    />
                                    <motion.label
                                        className={`absolute ${labelPosition} text-text-secondary text-sm pointer-events-none px-2`}
                                        style={{ backgroundColor: 'var(--bg-secondary)' }}
                                        animate={{
                                            top: focused === 'name' || formState.name ? '-8px' : '16px',
                                            fontSize: focused === 'name' || formState.name ? '12px' : '14px',
                                            color: focused === 'name' ? '#10b981' : '#94a3b8'
                                        }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        {t('contact.yourName')}
                                    </motion.label>
                                </div>

                                {/* Email Input */}
                                <div className="relative">
                                    <motion.input
                                        type="email"
                                        name="email"
                                        value={formState.email}
                                        onChange={handleChange}
                                        onFocus={() => setFocused('email')}
                                        onBlur={() => setFocused(null)}
                                        className="w-full bg-tertiary/50 border border-border-color rounded-xl px-5 py-4 text-white focus:outline-none focus:border-accent transition-colors"
                                        placeholder=" "
                                        required
                                    />
                                    <motion.label
                                        className={`absolute ${labelPosition} text-text-secondary text-sm pointer-events-none px-2`}
                                        style={{ backgroundColor: 'var(--bg-secondary)' }}
                                        animate={{
                                            top: focused === 'email' || formState.email ? '-8px' : '16px',
                                            fontSize: focused === 'email' || formState.email ? '12px' : '14px',
                                            color: focused === 'email' ? '#10b981' : '#94a3b8'
                                        }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        {t('contact.emailAddress')}
                                    </motion.label>
                                </div>
                            </div>

                            {/* Message Input */}
                            <div className="relative">
                                <motion.textarea
                                    name="message"
                                    value={formState.message}
                                    onChange={handleChange}
                                    onFocus={() => setFocused('message')}
                                    onBlur={() => setFocused(null)}
                                    rows="5"
                                    className="w-full bg-tertiary/50 border border-border-color rounded-xl px-5 py-4 text-white focus:outline-none focus:border-accent transition-colors resize-none"
                                    placeholder=" "
                                    required
                                />
                                <motion.label
                                    className={`absolute ${labelPosition} text-text-secondary text-sm pointer-events-none px-2`}
                                    style={{ backgroundColor: 'var(--bg-secondary)' }}
                                    animate={{
                                        top: focused === 'message' || formState.message ? '-8px' : '16px',
                                        fontSize: focused === 'message' || formState.message ? '12px' : '14px',
                                        color: focused === 'message' ? '#10b981' : '#94a3b8'
                                    }}
                                    transition={{ duration: 0.2 }}
                                >
                                    {t('contact.yourMessage')}
                                </motion.label>
                            </div>

                            {/* Submit Button */}
                            <motion.button
                                type="submit"
                                className="w-full magnetic-btn btn-filled justify-center gap-2"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                disabled={status.submitting}
                            >
                                {status.submitting ? (
                                    <span>{t('contact.sending')}</span>
                                ) : status.submitted ? (
                                    <motion.span
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                    >
                                        {t('contact.messageSent')}
                                    </motion.span>
                                ) : status.error ? (
                                    <span className="text-red-400">{status.error}</span>
                                ) : (
                                    <span className="flex items-center gap-2">
                                        <FaPaperPlane />
                                        {t('contact.sendMessage')}
                                    </span>
                                )}
                            </motion.button>
                        </form>
                    </motion.div>
                </div>
            </motion.div>
        </section>
    );
};

export default Contact;
