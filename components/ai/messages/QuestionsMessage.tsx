'use client';

import React from 'react';
import { User, Bot } from 'lucide-react';
import { MessageTypeValue } from '@/types/ai';
import { useLanguage } from '@/contexts/LanguageContext';

interface QuestionsMessageProps {
  role: 'user' | 'assistant';
  content: string | string[];
  timestamp?: number;
  messageType?: MessageTypeValue;
  round?: number;
  onQuestionClick?: (question: string) => void;
}

const QuestionsMessage: React.FC<QuestionsMessageProps> = ({
  role,
  content,
  timestamp,
  messageType,
  round,
  onQuestionClick,
}) => {
  const { t } = useLanguage();
  const isUser = role === 'user';

  // Get assistant name based on message type
  const getAssistantName = () => {
    if (isUser) return t.ai.messages.user;
    return t.ai.messages.assistant.default;
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

        <div className="text-gray-700 dark:text-gray-300">
          {Array.isArray(content) ? (
            <div className="flex flex-col gap-2">
              {content.map((question, index) => (
                <button
                  key={index}
                  onClick={() => {
                    onQuestionClick?.(question);
                  }}
                  className="text-left p-2 rounded border border-gray-200 dark:border-gray-600 bg-gray-50 hover:bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 transition-colors duration-200 w-fit max-w-full"
                >
                  {question}
                </button>
              ))}
            </div>
          ) : (
            <div className="whitespace-pre-wrap break-words">{content}</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuestionsMessage;
