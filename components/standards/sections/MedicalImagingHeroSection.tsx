'use client';

import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { motion } from 'motion/react';
import Section from '@/components/common/Section';
import NetworkBackground from '@/components/common/NetworkBackground';

const MedicalImagingHeroSection = () => {
  const { t } = useLanguage();

  return (
    <Section className="relative overflow-hidden min-h-[600px] flex items-center">
      {/* Background */}
      <NetworkBackground />

      <div className="relative container mx-auto px-4 z-10">
        <div className="max-w-5xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 text-gray-900 dark:text-white drop-shadow-lg"
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 dark:from-white dark:via-blue-100 dark:to-blue-200">
              {t.standards.hero.title}
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg md:text-xl text-gray-600 dark:text-gray-200 mb-10 font-light"
          >
            {t.standards.hero.subtitle}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="glass-panel rounded-xl p-6 mb-10 mx-auto max-w-3xl"
          >
            <p className="text-lg text-gray-700 dark:text-gray-200 leading-relaxed">
              {t.standards.hero.description}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 max-w-3xl mx-auto">
            {[
              {
                value: '30%',
                label: t.standards.hero.stats.efficiency.label,
                icon: '⚡'
              },
              {
                value: '80%',
                label: t.standards.hero.stats.sharing.label,
                icon: '🔄'
              },
              {
                value: '95%',
                label: t.standards.hero.stats.ai.label,
                icon: '🤖'
              }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                className="glass-card p-5 rounded-xl text-center group"
              >
                <div className="text-3xl font-bold text-blue-600 dark:text-cyan-400 mb-1 group-hover:scale-110 transition-transform duration-300">
                  {stat.value}
                </div>
                <div className="text-xs text-gray-600 dark:text-gray-300 mb-1 font-medium">
                  {stat.label}
                </div>
                <div className="text-xl filter grayscale group-hover:grayscale-0 transition-all duration-300">
                  {stat.icon}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
};

export default MedicalImagingHeroSection;
