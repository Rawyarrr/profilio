import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LanguageProvider } from './i18n/LanguageContext';
import { ThemeProvider } from './i18n/ThemeContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Cursor from './components/Cursor';
import Loader from './components/Loader';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Scroll Progress
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = totalHeight > 0 ? (window.scrollY / totalHeight) * 100 : 0;
      setScrollProgress(progress);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Simulate Loading
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <ThemeProvider>
      <LanguageProvider>
        {/* Loading Screen */}
        <AnimatePresence>
          {isLoading && <Loader />}
        </AnimatePresence>

        {/* Custom Cursor */}
        <Cursor />

        {/* Noise Overlay */}
        <div className="noise-overlay"></div>

        {/* Scroll Progress Bar */}
        <div className="scroll-progress">
          <motion.div
            className="scroll-progress-bar"
            style={{ scaleX: scrollProgress / 100 }}
          />
        </div>

        {/* Main Content */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isLoading ? 0 : 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Navbar />
          <main>
            <Hero />
            <About />
            <Skills />
            <Projects />
            <Contact />
          </main>
          <Footer />
        </motion.div>
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;
