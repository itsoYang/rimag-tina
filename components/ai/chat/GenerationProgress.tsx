'use client';

import React from 'react';
import { Loader2, X } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface GenerationProgressProps {
  status: 'generating' | 'error' | 'idle';
  progress?: number;
  currentStep?: string;
  error?: string;
  onCancel?: () => void;
}

const GenerationProgress: React.FC<GenerationProgressProps> = ({
  status,
  progress,
  currentStep,
  error,
  onCancel,
}) => {
  const { t } = useLanguage();

  if (status === 'idle') return null;

  return (
    <div
      className={`px-4 py-3 ${
        status === 'error'
          ? 'bg-red-50 dark:bg-red-900/20'
          : 'bg-blue-50 dark:bg-blue-900/20'
      }`}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {status === 'generating' ? (
            <>
              <Loader2 className="w-5 h-5 text-blue-500 dark:text-blue-400 animate-spin" />
              <div>
                <div className="text-sm font-medium text-blue-700 dark:text-blue-300">
                  {t.ai.chat.generating}
                  {progress !== undefined && `（${Math.round(progress * 100)}%）`}
                </div>
                {currentStep && (
                  <div className="text-xs text-blue-600 dark:text-blue-400 mt-0.5">
                    {currentStep}
                  </div>
                )}
              </div>
            </>
          ) : (
            <div className="text-sm font-medium text-red-700 dark:text-red-400">
              {error || '生成失败，请重试'}
            </div>
          )}
        </div>

        {status === 'generating' && onCancel && (
          <button
            onClick={onCancel}
            className="p-1 hover:bg-blue-100 dark:hover:bg-blue-900/50 rounded-full transition-colors"
            title={t.ai.chat.cancel}
          >
            <X className="w-5 h-5 text-blue-500 dark:text-blue-400" />
          </button>
        )}
      </div>

      {/* Progress bar */}
      {status === 'generating' && progress !== undefined && (
        <div className="mt-2 h-1 bg-blue-100 dark:bg-blue-900/50 rounded-full overflow-hidden">
          <div
            className="h-full bg-blue-500 dark:bg-blue-400 transition-all duration-300"
            style={{ width: `${Math.round(progress * 100)}%` }}
          />
        </div>
      )}
    </div>
  );
};

export default GenerationProgress;
