'use client';

import React from 'react';
import BaseMessage from './BaseMessage';
import { MessageType, type StandardizationContent, type BaseMessageProps } from '@/types/ai';
import { ClipboardCopy, CheckCircle } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface StandardizationMessageProps extends BaseMessageProps {
  parsedContent?: StandardizationContent;
}

const StandardizationMessage: React.FC<StandardizationMessageProps> = (props) => {
  const { content, parsedContent, ...baseProps } = props;
  const { t } = useLanguage();
  const [copySuccess, setCopySuccess] = React.useState(false);

  // Copy to clipboard
  const handleCopy = React.useCallback(async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch (err) {
      console.error('Copy failed:', err);
    }
  }, []);

  // If it's a user message, use base message component
  if (props.role === 'user') {
    return <BaseMessage {...props} />;
  }

  // Process standardization results
  const standardizations = React.useMemo(() => {
    if (parsedContent && parsedContent.items && parsedContent.items.length > 0) {
      return parsedContent.items;
    }
    return null;
  }, [parsedContent]);

  return (
    <BaseMessage {...baseProps} content="" messageType={MessageType.STANDARDIZATION}>
      <div className="space-y-4">
        {/* Standardization results */}
        {standardizations ? (
          <div className="space-y-4">
            {standardizations.map((item, index) => (
              <div
                key={index}
                className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg"
              >
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-blue-600 dark:text-blue-400 flex-shrink-0" />
                  <div className="flex-1">
                    <div className="font-medium text-blue-900 dark:text-blue-100">
                      {t.ai.standardization.result}{' '}
                      {standardizations.length > 1 ? `#${index + 1}` : ''}
                    </div>
                    <div className="mt-2 space-y-2">
                      <div className="text-blue-800 dark:text-blue-200">
                        {t.ai.standardization.standardName}：{item.standardName}
                      </div>
                      <div className="text-blue-800 dark:text-blue-200">
                        {t.ai.standardization.code}：{item.code}
                      </div>
                      <div className="text-blue-800 dark:text-blue-200">
                        {t.ai.standardization.confidence}：
                        {Math.round(item.confidence * 100)}%
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
            {content}
          </div>
        )}

        {/* Copy button */}
        {standardizations && (
          <div className="flex items-center gap-2">
            <button
              onClick={() =>
                handleCopy(
                  standardizations
                    .map(
                      (item, index) =>
                        `${
                          standardizations.length > 1
                            ? `${t.ai.standardization.result} #${index + 1}\n`
                            : ''
                        }${t.ai.standardization.standardName}：${item.standardName}\n${
                          t.ai.standardization.code
                        }：${item.code}\n${t.ai.standardization.confidence}：${Math.round(
                          item.confidence * 100
                        )}%`
                    )
                    .join('\n\n')
                )
              }
              className={`inline-flex items-center px-3 py-1.5 rounded text-sm transition-colors ${
                copySuccess
                  ? 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
              }`}
            >
              <ClipboardCopy className="w-4 h-4 mr-1" />
              {copySuccess ? t.ai.standardization.copied : t.ai.standardization.copyResult}
            </button>
          </div>
        )}
      </div>
    </BaseMessage>
  );
};

export default StandardizationMessage;
