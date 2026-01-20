'use client';

import Link from 'next/link';
import { MessageCircle, Mail, Linkedin, Download } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="bg-gray-900 dark:bg-gray-950 text-gray-300">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">{t.footer.quickLinks}</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/standards" className="hover:text-white transition-colors">
                  {t.nav.standards}
                </Link>
              </li>
              <li>
                <Link href="/standards/query" className="hover:text-white transition-colors">
                  {t.nav.query}
                </Link>
              </li>
              <li>
                <Link href="/ai" className="hover:text-white transition-colors">
                  {t.nav.ai}
                </Link>
              </li>
              <li>
                <Link href="/download" className="hover:text-white transition-colors inline-flex items-center">
                    {t.download.title}
                </Link>
              </li>
              <li>
                <a href="https://rimag-web-loinc.pages.dev/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                  LOINC
                </a>
              </li>
              <li>
                <a href="https://rimag-web-snomed.pages.dev/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                  SNOMED
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">{t.footer.contact}</h3>
            <ul className="space-y-2">
              <li>{t.footer.address}</li>
              <li>{t.footer.phone}</li>
              <li>{t.footer.email}</li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">{t.footer.followUs}</h3>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-white transition-colors" aria-label="WeChat">
                <MessageCircle size={24} />
              </a>
              <a href="#" className="hover:text-white transition-colors" aria-label="Email">
                <Mail size={24} />
              </a>
              <a href="#" className="hover:text-white transition-colors" aria-label="LinkedIn">
                <Linkedin size={24} />
              </a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm">
          <p>{t.footer.copyright}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

