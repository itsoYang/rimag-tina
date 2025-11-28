'use client';

import React, { useState } from 'react';
import Section from '@/components/common/Section';
import SectionTitle from '@/components/common/SectionTitle';
import { useLanguage } from '@/contexts/LanguageContext';
import { motion, AnimatePresence } from 'motion/react';
import {
  Target,
  Layers,
  Expand,
  Shield,
  Puzzle,
  ChevronRight
} from 'lucide-react';

const StandardPrinciplesSection = () => {
  const { t } = useLanguage();
  const [activeIndex, setActiveIndex] = useState(0);

  const principles = [
    {
      icon: Target,
      title: t.standards.principles.items.uniqueness.title,
      description: t.standards.principles.items.uniqueness.description
    },
    {
      icon: Layers,
      title: t.standards.principles.items.comprehensiveness.title,
      description: t.standards.principles.items.comprehensiveness.description
    },
    {
      icon: Expand,
      title: t.standards.principles.items.extensibility.title,
      description: t.standards.principles.items.extensibility.description
    },
    {
      icon: Shield,
      title: t.standards.principles.items.security.title,
      description: t.standards.principles.items.security.description
    },
    {
      icon: Puzzle,
      title: t.standards.principles.items.compatibility.title,
      description: t.standards.principles.items.compatibility.description
    }
  ];

  return (
    <Section className="bg-slate-50 dark:bg-gray-900/95 transition-colors duration-300">
      <div className="container mx-auto px-4">
        <SectionTitle className="text-center mb-16">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-cyan-400 dark:to-purple-400">
            {t.standards.principles.title}
          </span>
        </SectionTitle>

        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Left List */}
          <div className="md:col-span-5 space-y-3">
            {principles.map((principle, index) => (
              <div
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`cursor-pointer p-4 rounded-xl flex items-center justify-between transition-all duration-300 ${
                  activeIndex === index
                    ? 'bg-white dark:bg-white/10 shadow-lg border-l-4 border-blue-600 dark:border-cyan-400'
                    : 'hover:bg-white/50 dark:hover:bg-white/5'
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className={`p-2 rounded-lg ${activeIndex === index ? 'bg-blue-100 dark:bg-blue-900/50' : 'bg-gray-100 dark:bg-gray-800'}`}>
                    <principle.icon
                      className={`w-5 h-5 ${activeIndex === index ? 'text-blue-600 dark:text-cyan-400' : 'text-gray-500 dark:text-gray-400'}`}
                    />
                  </div>
                  <span className={`font-bold ${activeIndex === index ? 'text-gray-900 dark:text-white' : 'text-gray-600 dark:text-gray-400'}`}>
                    {principle.title}
                  </span>
                </div>
                {activeIndex === index && (
                  <ChevronRight className="w-5 h-5 text-blue-600 dark:text-cyan-400" />
                )}
              </div>
            ))}
          </div>

          {/* Right Detail Panel */}
          <div className="md:col-span-7">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="glass-card p-8 rounded-2xl h-full flex flex-col justify-center"
              >
                <div className="mb-6">
                  {React.createElement(principles[activeIndex].icon, {
                    className: "w-16 h-16 text-blue-600 dark:text-cyan-400 mb-6 opacity-80"
                  })}
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                    {principles[activeIndex].title}
                  </h3>
                  <div className="w-12 h-1 bg-gradient-to-r from-blue-600 to-cyan-500 dark:from-cyan-400 dark:to-blue-500 rounded-full mb-6"></div>
                  <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                    {principles[activeIndex].description}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </Section>
  );
};

export default StandardPrinciplesSection;
