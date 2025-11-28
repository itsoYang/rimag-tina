'use client';

import { useEffect, useRef, useState } from 'react';
import { Building2, FileText, Users, RefreshCw } from 'lucide-react';
import { motion, useInView, useMotionValue, useSpring } from 'motion/react';
import { useLanguage } from '@/contexts/LanguageContext';

const Counter = ({ value }: { value: string }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  // Extract number from string (e.g., "150+" -> 150)
  const numericValue = parseInt(value.replace(/\D/g, '')) || 0;
  const suffix = value.replace(/[0-9]/g, '');

  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, { duration: 2000 });

  useEffect(() => {
    if (inView) {
      motionValue.set(numericValue);
    }
  }, [inView, numericValue, motionValue]);

  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    return springValue.on("change", (latest) => {
      setDisplayValue(Math.floor(latest));
    });
  }, [springValue]);

  return (
    <span ref={ref} className="font-mono text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-blue-600 to-blue-800 dark:from-white dark:to-blue-200">
      {displayValue}{suffix}
    </span>
  );
};

const Stats = () => {
  const { t } = useLanguage();
  
  const stats = [
    {
      icon: Building2,
      value: t.stats.hospitals.value,
      label: t.stats.hospitals.label,
      description: t.stats.hospitals.description
    },
    {
      icon: FileText,
      value: t.stats.codes.value,
      label: t.stats.codes.label,
      description: t.stats.codes.description
    },
    {
      icon: Users,
      value: t.stats.experts.value,
      label: t.stats.experts.label,
      description: t.stats.experts.description
    },
    {
      icon: RefreshCw,
      value: t.stats.updates.value,
      label: t.stats.updates.label,
      description: t.stats.updates.description
    }
  ];

  return (
    <section className="relative overflow-hidden bg-slate-50 dark:bg-gray-900 py-20 transition-colors duration-300">
      {/* Background Grid */}
      <div
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(rgba(6, 182, 212, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(6, 182, 212, 0.1) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      <div className="relative z-10 container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-16">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-500 to-purple-500">
            {t.stats.title}
          </span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              viewport={{ once: true }}
              className="glass-card p-8 rounded-2xl text-center group relative overflow-hidden"
            >
              {/* Hover Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-100/50 to-transparent dark:from-cyan-500/10 dark:to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="relative z-10">
                <div className="mb-6 inline-block p-4 rounded-full bg-blue-100/50 dark:bg-white/5 group-hover:bg-blue-200/50 dark:group-hover:bg-cyan-500/20 transition-colors duration-300">
                  <stat.icon className="w-8 h-8 text-blue-600 dark:text-cyan-400 group-hover:scale-110 transition-transform duration-300" />
                </div>

                <div className="mb-2">
                  <Counter value={stat.value} />
                </div>

                <div className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-2 font-mono tracking-wide">
                  {stat.label}
                </div>

                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {stat.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;

