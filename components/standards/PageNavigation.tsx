'use client';

import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

const PageNavigation = () => {
  const { t } = useLanguage();

  const sections = [
    { id: 'goals', title: t.standards.goals.title },
    { id: 'buildGoals', title: t.standards.buildGoals.title },
    { id: 'principles', title: t.standards.principles.title },
    { id: 'process', title: t.standards.process.title },
    { id: 'system', title: t.standards.system.title },
    { id: 'implementation', title: t.standards.implementation.title },
  ];

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="fixed left-4 top-1/2 transform -translate-y-1/2 z-50 hidden lg:block">
      <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-lg shadow-lg p-4">
        <ul className="space-y-2">
          {sections.map((section) => (
            <li key={section.id}>
              <button
                onClick={() => scrollToSection(section.id)}
                className="text-sm text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors whitespace-nowrap text-left"
              >
                {section.title}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default PageNavigation;
