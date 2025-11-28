'use client';

import React, { useState } from 'react';
import { MessageType, MessageTypeValue } from '@/types/ai';
import { MODULES } from '@/lib/modules';
import ModuleSelector from '@/components/ai/ModuleSelector';
import ChatBox from '@/components/ai/chat/ChatBox';
import NetworkBackground from '@/components/common/NetworkBackground';
import { useLanguage } from '@/contexts/LanguageContext';

const AIPlatformPage: React.FC = () => {
  const { t } = useLanguage();

  // Currently selected module
  const [currentModule, setCurrentModule] = useState<MessageTypeValue>(
    MessageType.STANDARDIZATION
  );
  const [selectedExample, setSelectedExample] = useState<string>('');

  const handleExampleSelect = (example: string) => {
    setSelectedExample(example);
  };

  // Get current module config
  const currentModuleConfig = MODULES.find((m) => m.type === currentModule);

  if (!currentModuleConfig) {
    return <div>模块配置错误</div>;
  }

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-[#0B1120] transition-colors duration-300 relative">
      {/* Background */}
      <NetworkBackground />

      {/* Page header */}
      <header className="relative z-10 pt-16 pb-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-white dark:to-blue-200">
            {t.ai.header.title}
          </h1>
          <p className="mt-2 text-base text-gray-600 dark:text-gray-300 max-w-2xl">
            {t.ai.header.subtitle}
          </p>
        </div>
      </header>

      {/* Main content area */}
      <main className="relative z-10 flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-4">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-full">
          {/* Left module selector */}
          <div className="lg:col-span-1">
            <div className="glass-card rounded-2xl border border-white/20 dark:border-white/10 sticky top-24 overflow-hidden">
              <ModuleSelector
                modules={MODULES}
                currentModule={currentModule}
                onModuleChange={setCurrentModule}
                onExampleSelect={handleExampleSelect}
              />
            </div>
          </div>

          {/* Right chat area */}
          <div className="lg:col-span-3 flex flex-col">
            <div className="glass-card rounded-2xl border border-white/20 dark:border-white/10 flex-1 min-h-[600px] overflow-hidden flex flex-col">
              <ChatBox
                currentModule={currentModule}
                currentModuleConfig={currentModuleConfig}
                onModuleChange={setCurrentModule}
                selectedExample={selectedExample}
              />
            </div>
          </div>
        </div>
      </main>

      {/* Page footer */}
      <footer className="relative z-10 mt-auto py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-sm text-gray-500 dark:text-gray-400">
            {t.ai.footer.copyright.replace('{year}', new Date().getFullYear().toString())}
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AIPlatformPage;
