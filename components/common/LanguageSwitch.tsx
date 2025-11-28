'use client';

import { Globe } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const LanguageSwitch = () => {
  const { locale, setLocale } = useLanguage();

  const toggleLanguage = () => {
    const newLang = locale === 'en' ? 'zh' : 'en';
    setLocale(newLang);
  };

  return (
    <button
      onClick={toggleLanguage}
      className="flex items-center space-x-1 hover:bg-gray-100 dark:hover:bg-gray-800 p-2 rounded-lg transition-colors"
      aria-label="切换语言"
    >
      <Globe className="w-5 h-5" />
      <span className="text-sm font-medium">{locale === 'en' ? '中文' : 'EN'}</span>
    </button>
  );
};

export default LanguageSwitch;

