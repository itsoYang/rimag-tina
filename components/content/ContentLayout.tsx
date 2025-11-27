import React from 'react';
import NetworkBackground from '../common/NetworkBackground';

interface ContentLayoutProps {
  title: string;
  subtitle: string;
  cover?: string;
  children: React.ReactNode;
}

const ContentLayout: React.FC<ContentLayoutProps> = ({
  title,
  subtitle,
  cover = 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d',
  children
}) => {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-gray-900 transition-colors duration-300 relative overflow-hidden">
      {/* Background */}
      <NetworkBackground />

      <div className="relative pt-24 pb-12">
        <div className="relative container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-white dark:to-blue-200">
              {title}
            </h1>
            {subtitle && (
              <p className="text-xl text-gray-600 dark:text-gray-300">
                {subtitle}
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 pb-24 relative z-10">
        {children}
      </div>
    </div>
  );
};

export default ContentLayout;
