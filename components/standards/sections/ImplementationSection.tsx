'use client';

import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { motion } from 'motion/react';
import Section from '@/components/common/Section';
import SectionTitle from '@/components/common/SectionTitle';
import { Database, Settings, GraduationCap, RefreshCw } from 'lucide-react';

const ImplementationSection = () => {
  const { t } = useLanguage();

  const steps = [
    { icon: Database, key: 'data' },
    { icon: Settings, key: 'system' },
    { icon: GraduationCap, key: 'training' },
    { icon: RefreshCw, key: 'optimization' }
  ];

  return (
    <Section className="bg-white dark:bg-gray-900/90 transition-colors duration-300">
      <div className="container mx-auto px-4">
        <SectionTitle className="text-center mb-16">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-cyan-400 dark:to-purple-400">
            {t.standards.implementation.title}
          </span>
        </SectionTitle>

        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
            {/* Connecting Line (Desktop) */}
            <div className="hidden md:block absolute top-8 left-0 w-full h-0.5 bg-gray-200 dark:bg-gray-700 -z-10"></div>

            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
                className="flex flex-col items-center text-center group"
              >
                <div className="w-16 h-16 rounded-full bg-white dark:bg-gray-900 border-4 border-blue-50 dark:border-white/5 shadow-lg flex items-center justify-center mb-6 group-hover:border-blue-200 dark:group-hover:border-cyan-400/30 transition-all duration-300 z-10">
                  <step.icon className="w-6 h-6 text-blue-600 dark:text-cyan-400 group-hover:scale-110 transition-transform duration-300" />
                </div>
                <h3 className="text-lg font-bold mb-3 text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-cyan-400 transition-colors">
                  {(t.standards.implementation.steps as any)[step.key].title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed max-w-[200px]">
                  {(t.standards.implementation.steps as any)[step.key].description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
};

export default ImplementationSection;
