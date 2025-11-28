'use client';

import React from 'react';
import Section from '@/components/common/Section';
import SectionTitle from '@/components/common/SectionTitle';
import { Award, Target, Zap } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { motion } from 'motion/react';

const StandardGoalsSection = () => {
  const { t } = useLanguage();

  const goals = [
    {
      icon: Target,
      title: t.standards.goals.cards.target.title,
      description: t.standards.goals.cards.target.description
    },
    {
      icon: Zap,
      title: t.standards.goals.cards.significance.title,
      description: t.standards.goals.cards.significance.description
    },
    {
      icon: Award,
      title: t.standards.goals.cards.value.title,
      description: t.standards.goals.cards.value.description
    }
  ];

  return (
    <Section className="bg-slate-50 dark:bg-gray-900/95 transition-colors duration-300">
      <div className="container mx-auto px-4">
        <SectionTitle className="text-center mb-16">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-cyan-400 dark:to-purple-400">
            {t.standards.goals.title}
          </span>
        </SectionTitle>

        <div className="grid md:grid-cols-3 gap-8">
          {goals.map((goal, index) => (
            <motion.div
              key={index}
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
              <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-cyan-400 transition-colors">
                {goal.title}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                {goal.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
};

export default StandardGoalsSection;
