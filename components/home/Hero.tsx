'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronRight } from 'lucide-react';
import NetworkBackground from '../common/NetworkBackground';
import { useLanguage } from '@/contexts/LanguageContext';

const Hero = () => {
  const router = useRouter();
  const { t } = useLanguage();
  const [currentTextIndex, setCurrentTextIndex] = useState(0);

  const subtitles = [
    t.hero.subtitle1,
    t.hero.subtitle2,
    t.hero.subtitle3,
    t.hero.subtitle4
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTextIndex((prev) => (prev + 1) % subtitles.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [subtitles.length]);

  const handleNavigation = (path: string) => {
    router.push(path);
  };

  return (
    <div className="relative h-[700px] overflow-hidden flex items-center justify-center">
      {/* Background */}
      <NetworkBackground />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="space-y-8"
        >
          {/* Main Title */}
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-gray-900 dark:text-white drop-shadow-lg">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 dark:from-white dark:via-blue-100 dark:to-blue-200">
              {t.hero.title}
            </span>
          </h1>

          {/* Typing/Fading Subtitle */}
          <div className="h-20 flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.p
                key={currentTextIndex}
                initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, y: -20, filter: 'blur(10px)' }}
                transition={{ duration: 0.5 }}
                className="text-2xl md:text-3xl text-blue-600 dark:text-cyan-400 font-light tracking-wide"
              >
                {subtitles[currentTextIndex]}
              </motion.p>
            </AnimatePresence>
          </div>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-col md:flex-row items-center justify-center gap-6 mt-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            <button
              onClick={() => handleNavigation('/overview')}
              className="px-8 py-4 text-lg bg-blue-600 hover:bg-blue-700 dark:bg-cyan-500 dark:hover:bg-cyan-400 text-white dark:text-gray-900 font-bold shadow-lg hover:shadow-xl dark:shadow-[0_0_20px_rgba(6,182,212,0.4)] dark:hover:shadow-[0_0_30px_rgba(6,182,212,0.6)] transition-all duration-300 border-none rounded-lg flex items-center gap-2"
            >
              {t.hero.cta.standards} <ChevronRight className="w-5 h-5" />
            </button>
            <button
              onClick={() => handleNavigation('/standards')}
              className="px-8 py-4 text-lg border-2 border-blue-200 dark:border-cyan-500/50 text-blue-600 dark:text-cyan-400 hover:bg-blue-50 dark:hover:bg-cyan-500/10 hover:border-blue-400 dark:hover:border-cyan-400 backdrop-blur-sm rounded-lg transition-all duration-300"
            >
              {t.hero.cta.query}
            </button>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="w-6 h-10 border-2 border-gray-400 dark:border-white/30 rounded-full flex justify-center p-1">
          <div className="w-1 h-2 bg-blue-600 dark:bg-cyan-400 rounded-full" />
        </div>
      </motion.div>
    </div>
  );
};

export default Hero;

