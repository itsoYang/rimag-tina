'use client';

import React from 'react';
import Section from '@/components/common/Section';
import SectionTitle from '@/components/common/SectionTitle';
import { useLanguage } from '@/contexts/LanguageContext';
import { motion } from 'motion/react';
import {
  CalendarDays,
  Search,
  FileEdit,
  Building2,
  Users,
  Send,
  RefreshCw
} from 'lucide-react';

const ProcessSection = () => {
  const { t } = useLanguage();

  const timeline = t.standards.process.timeline;

  return (
    <Section className="bg-white dark:bg-gray-900/90 transition-colors duration-300">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <SectionTitle className="text-center mb-16">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-cyan-400 dark:to-purple-400">
              {t.standards.process.title}
            </span>
          </SectionTitle>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Timeline */}
            <div className="relative pl-4">
              <div className="absolute left-12 top-0 h-full w-0.5 bg-gradient-to-b from-blue-200 via-blue-400 to-blue-200 dark:from-cyan-400/20 dark:via-cyan-400/50 dark:to-cyan-400/20"></div>
              {timeline.map((item: any, index: number) => {
                const icons = [CalendarDays, Search, FileEdit, Building2, Users, Send];
                const Icon = icons[index];

                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                    viewport={{ once: true }}
                    className="relative flex items-start mb-12 last:mb-0 group"
                  >
                    <div className="absolute left-0 w-12 h-12 bg-white dark:bg-gray-900 border-2 border-blue-100 dark:border-cyan-400/30 shadow-lg rounded-full flex items-center justify-center z-10 group-hover:scale-110 group-hover:border-blue-400 dark:group-hover:border-cyan-400 transition-all duration-300">
                      <Icon className="w-5 h-5 text-blue-600 dark:text-cyan-400" strokeWidth={1.5} />
                    </div>
                    <div className="ml-20 glass-card p-5 rounded-xl w-full hover:border-blue-300 dark:hover:border-cyan-400/30 transition-all">
                      <div className="text-xs font-semibold text-blue-600 dark:text-cyan-400 mb-1 font-mono">
                        {item.date}
                      </div>
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                        {item.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 text-xs leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Right Cycle Diagram */}
            <div className="flex flex-col items-center justify-center lg:pl-12">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-12 text-center">
                {t.standards.process.cycle_title}
              </h3>

              <div className="relative w-full max-w-[450px] aspect-square flex items-center justify-center">
                {/* Central Hub */}
                <div className="absolute z-20 w-32 h-32 rounded-full glass-card flex items-center justify-center shadow-[0_0_30px_rgba(59,130,246,0.3)] dark:shadow-[0_0_30px_rgba(6,182,212,0.3)]">
                  <div className="text-center">
                    <RefreshCw className="w-8 h-8 text-blue-600 dark:text-cyan-400 mx-auto mb-2 animate-spin" style={{ animationDuration: '8s' }} />
                    <span className="text-sm font-bold text-gray-800 dark:text-white block">
                      {t.standards.process.iteration}
                    </span>
                  </div>
                </div>

                {/* Orbiting Steps */}
                {[
                  { key: 'demand', icon: Search, label: '需求分析' },
                  { key: 'develop', icon: FileEdit, label: '标准研制' },
                  { key: 'verify', icon: Building2, label: '试点验证' },
                  { key: 'release', icon: Send, label: '发布实施' },
                  { key: 'feedback', icon: Users, label: '反馈优化' }
                ].map((step, index, array) => {
                  const angle = (index * 360) / array.length - 90;
                  const radius = 160;
                  const x = Math.cos((angle * Math.PI) / 180) * radius;
                  const y = Math.sin((angle * Math.PI) / 180) * radius;

                  return (
                    <motion.div
                      key={index}
                      className="absolute z-10"
                      style={{
                        left: '50%',
                        top: '50%',
                        transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`
                      }}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.2, duration: 0.5 }}
                    >
                      <div className="relative group cursor-pointer">
                        <div className="w-20 h-20 rounded-full bg-white dark:bg-gray-900 border-2 border-blue-100 dark:border-cyan-400/30 shadow-lg flex flex-col items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:border-blue-500 dark:group-hover:border-cyan-400 group-hover:shadow-[0_0_20px_rgba(59,130,246,0.4)]">
                          <step.icon className="w-6 h-6 text-blue-600 dark:text-cyan-400 mb-1" />
                          <span className="text-xs font-bold text-gray-700 dark:text-gray-200">
                            {step.label}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}

                {/* Connecting Ring */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ transform: 'rotate(-90deg)' }}>
                  <circle
                    cx="50%"
                    cy="50%"
                    r="160"
                    fill="none"
                    stroke="url(#gradient-ring)"
                    strokeWidth="2"
                    strokeDasharray="10 5"
                    className="opacity-30"
                  />
                  <defs>
                    <linearGradient id="gradient-ring" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#2563EB" />
                      <stop offset="100%" stopColor="#06B6D4" />
                    </linearGradient>
                  </defs>
                </svg>

                {/* Animated Active Dot on Ring */}
                <motion.div
                  className="absolute inset-0"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                >
                  <div className="absolute top-[65px] left-1/2 -translate-x-1/2 w-3 h-3 bg-blue-600 dark:bg-cyan-400 rounded-full shadow-[0_0_15px_currentColor]"></div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
};

export default ProcessSection;
