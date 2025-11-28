'use client';

import React, { ReactNode } from 'react';
import { MessageTypeValue } from '@/types/ai';
import { User, Bot } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface ExtendedBaseMessageProps {
  role: 'user' | 'assistant';
  content: string | string[];
  timestamp?: number;
  children?: ReactNode;
  messageType?: MessageTypeValue;
  round?: number;
}

const BaseMessage: React.FC<ExtendedBaseMessageProps> = ({
  role,
  content,
  timestamp,
  children,
  messageType,
  round,
}) => {
  const { t } = useLanguage();
  const isUser = role === 'user';

  // Get assistant name based on message type
  const getAssistantName = () => {
    if (isUser) return t.ai.messages.user;

    switch (messageType) {
      case 'standardization':
        return t.ai.messages.assistant.standardization;
      case 'recommendation':
        return t.ai.messages.assistant.recommendation;
      case 'report':
        return t.ai.messages.assistant.report;
      case 'reportgen':
        return t.ai.messages.assistant.reportGen;
      case 'report_quality':
        return t.ai.messages.assistant.reportQuality;
      default:
        return t.ai.messages.assistant.default;
    }
  };

  return (
    <div
      className={`flex items-start gap-4 p-4 rounded-lg transition-all duration-200 ${
        isUser
          ? 'bg-gray-50 dark:bg-gray-800/50'
          : 'bg-blue-50 dark:bg-blue-900/20'
      }`}
    >
      {/* Avatar */}
      <div
        className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
          isUser
            ? 'bg-gray-200 dark:bg-gray-700'
            : 'bg-blue-200 dark:bg-blue-800'
        }`}
      >
        {isUser ? (
          <User className="w-5 h-5 text-gray-600 dark:text-gray-300" />
        ) : (
          <Bot className="w-5 h-5 text-blue-600 dark:text-blue-400" />
        )}
      </div>

      {/* Content area */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <span
            className={`font-medium ${
              isUser
                ? 'text-gray-700 dark:text-gray-200'
                : 'text-blue-700 dark:text-blue-300'
            }`}
          >
            {getAssistantName()}
          </span>
          {timestamp && (
            <span className="text-xs text-gray-400 dark:text-gray-500">
              {new Date(timestamp).toLocaleTimeString()}
            </span>
          )}
          {round && (
            <span className="text-xs px-2 py-0.5 bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 rounded-full">
              {t.ai.messages.round.replace('{round}', round.toString())}
            </span>
          )}
        </div>

        <div className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap break-words">
          {children || content}
        </div>
      </div>
    </div>
  );
};

export default BaseMessage;
