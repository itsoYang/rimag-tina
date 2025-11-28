'use client';

import { useState, useEffect } from 'react';
import { CheckCircle, Globe, Zap, Share2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import HologramDiagram from './HologramDiagram';
import { useLanguage } from '@/contexts/LanguageContext';

const StandardIntro = () => {
  const { t } = useLanguage();
  const [currentSlide, setCurrentSlide] = useState(0);

  const keyPoints = [
    {
      icon: Globe,
      title: t.intro.standardIntro.nationalUnification.title,
      description: t.intro.standardIntro.nationalUnification.description
    },
    {
      icon: Share2,
      title: t.intro.standardIntro.interconnectivity.title,
      description: t.intro.standardIntro.interconnectivity.description
    },
    {
      icon: Zap,
      title: t.intro.standardIntro.efficiency.title,
      description: t.intro.standardIntro.efficiency.description
    },
    {
      icon: CheckCircle,
      title: t.intro.standardIntro.authorityEndorsement.title,
      description: t.intro.standardIntro.authorityEndorsement.description
    }
  ];

  const visualizationTypes: ('value' | 'process' | 'impact')[] = ['value', 'process', 'impact'];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % visualizationTypes.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative overflow-hidden py-20 bg-slate-50 dark:bg-gray-900 transition-colors duration-300">
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-blue-100/50 to-transparent dark:from-cyan-500/5 dark:to-transparent pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-700 to-blue-500 dark:from-white dark:to-blue-200">
                {t.intro.title}
              </span>
            </h2>

            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
              {t.intro.description}
            </p>

            <div className="space-y-4">
              {keyPoints.map((point, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center space-x-4 p-4 rounded-lg hover:bg-white/50 dark:hover:bg-white/5 transition-colors border border-transparent hover:border-cyan-400/30 group"
                >
                  <div className="p-2 rounded-full bg-blue-100/50 dark:bg-white/5 group-hover:bg-blue-200/50 dark:group-hover:bg-cyan-500/20 transition-colors">
                    <point.icon className="w-6 h-6 text-blue-600 dark:text-cyan-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-cyan-400 transition-colors">
                      {point.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">{point.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Hologram Visualization */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative h-[500px] w-full"
          >
            <div className="absolute inset-0 bg-gradient-to-b from-blue-400/10 to-purple-400/10 dark:from-cyan-500/10 dark:to-purple-500/10 rounded-full blur-[100px]" />

            <div className="relative h-full w-full glass-panel rounded-2xl p-1 border border-white/40 dark:border-white/10 overflow-hidden">
              <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20" />

              <AnimatePresence mode="wait">
                <motion.div
                  key={currentSlide}
                  initial={{ opacity: 0, scale: 0.8, filter: 'blur(10px)' }}
                  animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, scale: 1.2, filter: 'blur(10px)' }}
                  transition={{ duration: 0.5 }}
                  className="w-full h-full flex items-center justify-center"
                >
                  <HologramDiagram type={visualizationTypes[currentSlide]} />
                </motion.div>
              </AnimatePresence>

              {/* Tab Indicators */}
              <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
                {visualizationTypes.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      currentSlide === index
                        ? 'bg-blue-600 dark:bg-cyan-400 w-8'
                        : 'bg-gray-300 dark:bg-white/20 hover:bg-gray-400 dark:hover:bg-white/40 w-2'
                    }`}
                    aria-label={`切换到视图 ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default StandardIntro;

