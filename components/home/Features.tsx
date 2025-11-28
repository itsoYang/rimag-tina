'use client';

import { useRouter } from 'next/navigation';
import { Book, BarChart2, Search, Brain } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const Features = () => {
  const router = useRouter();
  const { t } = useLanguage();

  const features = [
    {
      icon: Book,
      title: t.features.standardIntro.title,
      description: t.features.standardIntro.description,
      path: '/overview'
    },
    {
      icon: BarChart2,
      title: t.features.standardDesc.title,
      description: t.features.standardDesc.description,
      path: '/overview'
    },
    {
      icon: Search,
      title: t.features.query.title,
      description: t.features.query.description,
      path: '/standards'
    },
    {
      icon: Brain,
      title: t.features.ai.title,
      description: t.features.ai.description,
      path: '/ai-platform'
    }
  ];

  return (
    <section className="py-20 bg-indigo-50 dark:bg-gray-800">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12 text-gray-900 dark:text-white">
          {t.features.title}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="glass-panel p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 hover:border-blue-400/50 group cursor-pointer"
              onClick={() => router.push(feature.path)}
            >
              <feature.icon className="w-12 h-12 text-blue-600 dark:text-blue-400 mb-4" />
              <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                {feature.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                {feature.description}
              </p>
              <button className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium transition-colors">
                {t.features.learnMore} →
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;

