'use client';

import React, { useState, useRef, useCallback, forwardRef, useImperativeHandle, useEffect } from 'react';
import { Send } from 'lucide-react';
import { MessageTypeValue } from '@/types/ai';
import { useLanguage } from '@/contexts/LanguageContext';

export interface ChatInputRef {
  setInputContent: (content: string) => void;
}

interface ChatInputProps {
  moduleType: MessageTypeValue;
  onSendMessage: (content: string) => Promise<void>;
  isLoading?: boolean;
  placeholder?: string;
  initialContent?: string;
}

const ChatInput = forwardRef<ChatInputRef, ChatInputProps>(
  (
    {
      moduleType,
      onSendMessage,
      isLoading = false,
      placeholder = '请输入您的问题...',
      initialContent,
    },
    ref
  ) => {
    const { t } = useLanguage();
    const [content, setContent] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [internalLoading, setInternalLoading] = useState(false);
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
      if (initialContent && initialContent !== content) {
        setContent(initialContent);
        if (textareaRef.current) {
          textareaRef.current.focus();
        }
      }
    }, [initialContent]);

    useEffect(() => {
      if (content) {
        adjustTextareaHeight();
      }
    }, [content]);

    useImperativeHandle(ref, () => ({
      setInputContent: (newContent: string) => {
        setContent(newContent);
        // Adjust height in next event loop
        setTimeout(() => {
          if (textareaRef.current) {
            adjustTextareaHeight();
          }
        }, 0);
      },
    }));

    // Auto-adjust textarea height
    const adjustTextareaHeight = useCallback(() => {
      const textarea = textareaRef.current;
      if (textarea) {
        textarea.style.height = 'auto';
        textarea.style.height = `${Math.min(textarea.scrollHeight, 200)}px`;
      }
    }, []);

    // Handle input change
    const handleChange = useCallback(
      (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const newContent = e.target.value;
        setContent(newContent);
        setError(null);
        adjustTextareaHeight();
      },
      [adjustTextareaHeight]
    );

    // Handle key down
    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        handleSend();
      }
    };

    // Handle send
    const handleSend = async () => {
      const loading = isLoading || internalLoading;
      if (loading) {
        console.log('正在加载中，不能发送消息');
        return;
      }

      const trimmedContent = content.trim();
      if (!trimmedContent) {
        setError(t.ai.errors.emptyInput);
        return;
      }

      try {
        console.log('=== ChatInput 开始发送消息 ===');
        console.log('发送内容:', trimmedContent);
        console.log('模块类型:', moduleType);
        console.log('加载状态:', loading);

        setInternalLoading(true);
        await onSendMessage(trimmedContent);
        console.log('消息发送成功');

        setContent('');
        setError(null);

        // Reset textarea height
        if (textareaRef.current) {
          textareaRef.current.style.height = 'auto';
        }
        console.log('=== ChatInput 消息发送完成 ===');
      } catch (error) {
        console.error('=== ChatInput 消息发送失败 ===');
        console.error('错误详情:', error);
        setError(error instanceof Error ? error.message : t.ai.errors.sendFailed);
      } finally {
        setInternalLoading(false);
      }
    };

    // Combined loading state
    const loading = isLoading || internalLoading;

    return (
      <div className="relative">
        {/* Input area */}
        <div
          className={`relative flex items-end gap-2 p-4 bg-white dark:bg-gray-800 rounded-lg border ${
            error
              ? 'border-red-300 dark:border-red-500/50'
              : 'border-gray-200 dark:border-gray-700'
          }`}
        >
          <textarea
            ref={textareaRef}
            value={content}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            disabled={loading}
            className={`flex-1 max-h-[200px] resize-none overflow-y-auto bg-transparent
            px-3 py-2 focus:outline-none ${
              loading
                ? 'text-gray-500 dark:text-gray-400'
                : 'text-gray-900 dark:text-gray-100'
            } placeholder-gray-400 dark:placeholder-gray-500`}
            rows={1}
          />
          <button
            onClick={handleSend}
            disabled={loading || !content.trim()}
            className={`flex-shrink-0 p-2 rounded-lg transition-colors ${
              loading || !content.trim()
                ? 'bg-gray-100 dark:bg-gray-700 text-gray-400 dark:text-gray-500'
                : 'bg-blue-500 text-white hover:bg-blue-600 dark:hover:bg-blue-400'
            }`}
            title={loading ? '正在处理中...' : t.ai.chat.sendButton}
          >
            <Send className="w-5 h-5" />
          </button>
        </div>

        {/* Error message */}
        {error && (
          <div className="absolute left-0 -bottom-6 text-sm text-red-500 dark:text-red-400">
            {error}
          </div>
        )}

        {/* Loading status */}
        {loading && (
          <div className="absolute left-0 -bottom-6 text-sm text-blue-500">
            {t.ai.messages.processing}
          </div>
        )}

        {/* Input hint */}
        <div className="mt-2 px-4 flex justify-between items-center text-xs text-gray-500 dark:text-gray-400">
          <div>{t.ai.chat.inputHint}</div>
          <div>
            {content.length} {t.ai.chat.charCount}
          </div>
        </div>
      </div>
    );
  }
);

ChatInput.displayName = 'ChatInput';

export default ChatInput;
