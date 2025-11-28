'use client';

import React, { useState } from 'react';
import { Module } from '@/types/ai';
import { MessageTypeValue } from '@/types/ai';
import { useLanguage } from '@/contexts/LanguageContext';

interface ModuleSelectorProps {
  modules: Module[];
  currentModule: MessageTypeValue;
  onModuleChange: (module: MessageTypeValue) => void;
  onExampleSelect?: (example: string) => void;
}

const ModuleSelector: React.FC<ModuleSelectorProps> = ({
  modules,
  currentModule,
  onModuleChange,
  onExampleSelect,
}) => {
  const { t } = useLanguage();
  const [expandedModule, setExpandedModule] = useState<MessageTypeValue | null>(null);

  const handleModuleClick = (module: Module) => {
    if (currentModule === module.type) {
      setExpandedModule(expandedModule === module.type ? null : module.type);
    } else {
      onModuleChange(module.type);
      setExpandedModule(module.type);
    }
  };

  const handleExampleClick = (example: string) => {
    if (onExampleSelect) {
      onExampleSelect(example);
    }
  };

  return (
    <div className="p-4 space-y-4">
      <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-4">
        {t.ai.chat.selectModule}
      </h2>
      <div className="grid grid-cols-1 gap-4">
        {modules.map((module) => {
          const isSelected = currentModule === module.type;
          const isExpanded = expandedModule === module.type;
          const Icon = module.icon;

          return (
            <div
              key={module.type}
              className={`rounded-lg transition-all duration-200 ${
                isSelected
                  ? 'ring-2 ring-blue-500 dark:ring-blue-400'
                  : 'hover:bg-gray-50 dark:hover:bg-gray-700/50'
              }`}
            >
              {/* Module card */}
              <button
                onClick={() => handleModuleClick(module)}
                className="w-full p-4 flex items-start gap-4 text-left"
              >
                {/* Icon */}
                <div
                  className={`flex-shrink-0 p-2 rounded-lg ${
                    isSelected
                      ? 'bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                  }`}
                >
                  <Icon className="w-6 h-6" />
                </div>

                {/* Title and description */}
                <div className="flex-1 min-w-0">
                  <h3
                    className={`font-medium ${
                      isSelected
                        ? 'text-blue-600 dark:text-blue-400'
                        : 'text-gray-900 dark:text-gray-100'
                    }`}
                  >
                    {module.title}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    {module.description}
                  </p>
                </div>
              </button>

              {/* Expanded examples area */}
              {isExpanded && module.examples && module.examples.length > 0 && (
                <div className="px-4 pb-4">
                  <div className="mt-2 space-y-2">
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
                      {t.ai.chat.examples}
                    </p>
                    {module.examples.map((example, index) => (
                      <button
                        key={index}
                        onClick={() => handleExampleClick(example)}
                        className="w-full text-left text-sm text-gray-500 dark:text-gray-400 bg-gray-50 hover:bg-gray-100 dark:bg-gray-700/50 dark:hover:bg-gray-600/50 p-2 rounded transition-colors duration-200"
                      >
                        {example.length > 50 ? `${example.slice(0, 50)}...` : example}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ModuleSelector;
