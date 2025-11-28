'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Search } from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import LanguageSwitch from './LanguageSwitch';
import { useLanguage } from '@/contexts/LanguageContext';

export default function Navbar() {
  const { t } = useLanguage();
  const pathname = usePathname();

  const isActive = (path: string) => {
    return pathname === path ? 'text-blue-600 dark:text-blue-400' : 'text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400';
  };

  const navItems = [
    { name: t.nav.home, href: '/' },
    { name: t.nav.standards, href: '/standards' },
    { name: t.nav.standards_query, href: '/standards/query' },
    { name: t.nav.overview, href: '/overview' },
    { name: t.nav.ai, href: '/ai' },
    { name: t.nav.news, href: '/news' },
    { name: t.nav.blog, href: '/blog' },
    { name: t.nav.about, href: '/about' },
  ];

  return (
    <nav className="fixed w-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200/50 dark:border-gray-700/50 text-gray-900 dark:text-white shadow-sm z-50 transition-all duration-300">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-2">
            <Link href="/" className="text-xl font-bold text-blue-600 dark:text-cyan-400 hover:text-blue-700 dark:hover:text-cyan-300 transition-colors">
              {t.nav.title}
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`${isActive(item.href)} transition-colors`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          <div className="flex items-center space-x-4">
            <LanguageSwitch />
            <ThemeToggle />
            <button className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
              <Search size={20} />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
