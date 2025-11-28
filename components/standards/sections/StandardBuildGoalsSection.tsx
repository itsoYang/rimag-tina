'use client';

import React from 'react';
import Section from '@/components/common/Section';
import SectionTitle from '@/components/common/SectionTitle';
import { useLanguage } from '@/contexts/LanguageContext';
import { motion } from 'motion/react';
import {
  Database,
  Building,
  FileText,
  Globe,
  Layers
} from 'lucide-react';

const StandardBuildGoalsSection = () => {
  const { t } = useLanguage();

  const goals = [
    {
      icon: Database,
      title: t.standards.buildGoals.items.dataAnalysis.title,
      description: t.standards.buildGoals.items.dataAnalysis.description
    },
    {
      icon: Building,
      title: t.standards.buildGoals.items.coverage.title,
      description: t.standards.buildGoals.items.coverage.description
    },
    {
      icon: FileText,
      title: t.standards.buildGoals.items.workflow.title,
      description: t.standards.buildGoals.items.workflow.description
    },
    {
      icon: Globe,
      title: t.standards.buildGoals.items.adaptability.title,
      description: t.standards.buildGoals.items.adaptability.description
    },
    {
      icon: Layers,
      title: t.standards.buildGoals.items.examination.title,
      description: t.standards.buildGoals.items.examination.description
    }
  ];

  const firstRow = goals.slice(0, 3);
  const secondRow = goals.slice(3);

  const Card = ({ goal, index }: { goal: typeof goals[0], index: number }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      viewport={{ once: true }}
      className="glass-card p-6 rounded-2xl flex flex-col items-center text-center group hover:border-blue-400 dark:hover:border-cyan-500/50"
    >
      <div className="p-3 rounded-full bg-blue-100/50 dark:bg-white/5 mb-5 group-hover:bg-blue-200/50 dark:group-hover:bg-cyan-500/20 transition-colors duration-300">
        <goal.icon
          className="w-8 h-8 text-blue-600 dark:text-cyan-400 group-hover:scale-110 transition-transform duration-300"
          strokeWidth={1.5}
        />
      </div>
      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-cyan-400 transition-colors">
        {goal.title}
      </h3>
      <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
        {goal.description}
      </p>
    </motion.div>
  );

  return (
    <Section className="bg-white dark:bg-gray-900/90 transition-colors duration-300">
      <div className="container mx-auto px-4">
        <SectionTitle className="text-center mb-16">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-cyan-400 dark:to-purple-400">
            {t.standards.buildGoals.title}
          </span>
        </SectionTitle>

        <div className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {firstRow.map((goal, index) => (
              <Card key={index} goal={goal} index={index} />
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
            {secondRow.map((goal, index) => (
              <Card key={index + 3} goal={goal} index={index + 3} />
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
};

export default StandardBuildGoalsSection;
