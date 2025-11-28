'use client';

import React, { useState } from 'react';
import Section from '@/components/common/Section';
import SectionTitle from '@/components/common/SectionTitle';
import { useLanguage } from '@/contexts/LanguageContext';
import { motion, AnimatePresence } from 'motion/react';
import {
  Layers,
  Database,
  Cpu,
  BookOpen,
  GitBranch,
  FileText,
  Settings
} from 'lucide-react';

const Card = ({ title, items, icon: Icon, index }: { title: string; items: string[]; icon: any; index: number }) => {
  const { t } = useLanguage();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className="glass-card p-6 rounded-2xl hover:border-blue-400 dark:hover:border-cyan-500/50 group h-full"
    >
      <div className="flex items-center justify-center mb-5">
        <div className="p-3 rounded-full bg-blue-100/50 dark:bg-white/5 group-hover:bg-blue-200/50 dark:group-hover:bg-cyan-500/20 transition-colors duration-300">
          <Icon className="w-6 h-6 text-blue-600 dark:text-cyan-400 group-hover:scale-110 transition-transform duration-300" />
        </div>
      </div>
      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 text-center group-hover:text-blue-600 dark:group-hover:text-cyan-400 transition-colors">
        {title}
      </h3>
      <ul className="space-y-3">
        {items.map((item, idx) => (
          <li key={idx} className="flex items-start group/item">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-blue-400 dark:bg-cyan-400 mt-2 mr-2 flex-shrink-0 group-hover/item:scale-125 transition-transform"></span>
            <span className="text-sm text-gray-600 dark:text-gray-300 group-hover/item:text-gray-900 dark:group-hover/item:text-white transition-colors">{item}</span>
          </li>
        ))}
      </ul>
    </motion.div>
  );
};

const CoreContentSection = () => {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<'standard' | 'support'>('standard');

  const standardParts = [
    {
      title: t.standards.system.parts.naming.title,
      icon: FileText,
      content: [
        t.standards.system.parts.naming.items.standard_naming,
        t.standards.system.parts.naming.items.standard_coding
      ]
    },
    {
      title: t.standards.system.parts.content.title,
      icon: Layers,
      content: [
        t.standards.system.parts.content.items.operation_specs,
        t.standards.system.parts.content.items.clinical_significance,
        t.standards.system.parts.content.items.technical_difficulty,
        t.standards.system.parts.content.items.insurance_mapping
      ]
    },
    {
      title: t.standards.system.parts.application.title,
      icon: Cpu,
      content: [
        t.standards.system.parts.application.items.data_cleaning,
        t.standards.system.parts.application.items.data_analysis,
        t.standards.system.parts.application.items.ai_assistance
      ]
    }
  ];

  const supportSystem = [
    { title: t.standards.system.support.dictionary, icon: BookOpen },
    { title: t.standards.system.support.version, icon: GitBranch },
    { title: t.standards.system.support.content, icon: Database },
    { title: t.standards.system.support.maintenance, icon: Settings }
  ];

  return (
    <Section className="bg-slate-50 dark:bg-gray-900/95 transition-colors duration-300">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <SectionTitle className="text-center mb-10">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-cyan-400 dark:to-purple-400">
              {t.standards.system.title}
            </span>
          </SectionTitle>

          {/* Tabs */}
          <div className="flex justify-center mb-12">
            <div className="bg-white/50 dark:bg-white/5 backdrop-blur-md p-1.5 rounded-full inline-flex border border-white/20 dark:border-white/10">
              <button
                onClick={() => setActiveTab('standard')}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeTab === 'standard'
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-white'
                }`}
              >
                {t.standards.system.title}
              </button>
              <button
                onClick={() => setActiveTab('support')}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeTab === 'support'
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-white'
                }`}
              >
                {t.standards.system.support.title}
              </button>
            </div>
          </div>

          <div className="min-h-[400px]">
            <AnimatePresence mode="wait">
              {activeTab === 'standard' ? (
                <motion.div
                  key="standard"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                  className="grid grid-cols-1 md:grid-cols-3 gap-8"
                >
                  {standardParts.map((part, index) => (
                    <Card
                      key={index}
                      index={index}
                      title={part.title}
                      items={part.content}
                      icon={part.icon}
                    />
                  ))}
                </motion.div>
              ) : (
                <motion.div
                  key="support"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    {supportSystem.map((item, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.1, duration: 0.4 }}
                        className="glass-card p-5 rounded-xl text-center hover:border-blue-400 dark:hover:border-cyan-500/50 group"
                      >
                        <div className="flex justify-center mb-3">
                          <item.icon className="w-6 h-6 text-gray-400 dark:text-gray-500 group-hover:text-blue-600 dark:group-hover:text-cyan-400 transition-colors duration-300" />
                        </div>
                        <h4 className="text-base font-bold text-gray-800 dark:text-white group-hover:text-blue-600 dark:group-hover:text-cyan-400 transition-colors">
                          {item.title}
                        </h4>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </Section>
  );
};

export default CoreContentSection;
