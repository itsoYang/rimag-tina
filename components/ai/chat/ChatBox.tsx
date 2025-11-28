'use client';

import React, { useState, useCallback, useRef } from 'react';
import { MessageTypeValue, Message, ChatState, createMessage, updateMessageStatus, MessageType } from '@/types/ai';
import { Module } from '@/types/ai';
import MessageList from './MessageList';
import ChatInput, { ChatInputRef } from './ChatInput';
import GenerationProgress from './GenerationProgress';
import { Trash2 } from 'lucide-react';
import { standardizationService, recommendationService, reportService, reportGenService, reportQualityService } from '@/lib/api/ai-services';
import { useLanguage } from '@/contexts/LanguageContext';

interface ChatBoxProps {
  currentModule: MessageTypeValue;
  currentModuleConfig: Module;
  onModuleChange: (module: MessageTypeValue) => void;
  selectedExample?: string;
}

const ChatBox: React.FC<ChatBoxProps> = ({
  currentModule,
  currentModuleConfig,
  onModuleChange,
  selectedExample,
}) => {
  const { t } = useLanguage();

  // State management
  const [chatState, setChatState] = useState<ChatState>({
    messages: [],
    chatId: Math.random().toString(36).substring(7),
    currentModule,
    isGenerating: false,
  });

  // Create ChatInput ref
  const chatInputRef = useRef<ChatInputRef>(null);

  // Request controller
  const abortControllerRef = useRef<AbortController | null>(null);

  // Cancel generation
  const handleCancel = useCallback(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
    }
    setChatState((prev) => ({
      ...prev,
      isGenerating: false,
    }));
  }, []);

  // Handle standardization request
  const handleStandardization = async (message: Message) => {
    try {
      const response = await standardizationService.standardize(
        { input: message.content as string },
        abortControllerRef.current?.signal
      );

      if (response.success && response.data) {
        const assistantMessage = createMessage(
          MessageType.STANDARDIZATION,
          'assistant',
          '',
          response.data
        );

        setChatState((prev) => ({
          ...prev,
          messages: [
            ...updateMessageStatus(prev.messages, message.id, 'success'),
            assistantMessage,
          ],
          isGenerating: false,
          error: undefined,
        }));
      } else {
        throw new Error(response.error || '标准化处理失败');
      }
    } catch (error) {
      if (error instanceof Error && error.name === 'AbortError') {
        return;
      }

      setChatState((prev) => ({
        ...prev,
        messages: updateMessageStatus(prev.messages, message.id, 'error'),
        isGenerating: false,
        error: error instanceof Error ? error.message : '发送消息失败',
      }));
    }
  };

  // Handle recommendation request
  const handleRecommendation = useCallback(async (message: Message) => {
    try {
      const newMessage = createMessage(MessageType.RECOMMENDATION, 'assistant', '');

      setChatState((prev) => ({
        ...prev,
        messages: [...prev.messages, newMessage],
      }));

      const messages = [message];
      await recommendationService.chat(messages, (content, finish) => {
        setChatState((prev) => {
          const updatedMessages = [...prev.messages];
          const lastMessage = updatedMessages[updatedMessages.length - 1];
          if (lastMessage) {
            lastMessage.parsedContent = content;
            lastMessage.content = content;
          }
          return {
            ...prev,
            messages: updatedMessages,
            isGenerating: finish === 0,
            error: undefined,
          };
        });
      });
    } catch (error) {
      console.error('Error in handleRecommendation:', error);
    }
  }, []);

  // Handle report analysis request
  const handleReportAnalysis = useCallback(async (message: Message) => {
    try {
      const newMessage = createMessage(MessageType.REPORT, 'assistant', '');

      setChatState((prev) => ({
        ...prev,
        messages: [...prev.messages, newMessage],
      }));

      const dialogueHistory = chatState.messages
        .filter((msg) => typeof msg.content === 'string')
        .map((msg) => ({
          role: msg.role,
          content: msg.content as string,
        }));
      dialogueHistory.push({
        role: message.role,
        content: message.content as string,
      });

      await reportService.chat(dialogueHistory, (content) => {
        setChatState((prev) => {
          const updatedMessages = [...prev.messages];
          const lastMessage = updatedMessages[updatedMessages.length - 1];
          if (lastMessage) {
            lastMessage.content = content;
          }
          return {
            ...prev,
            messages: updatedMessages,
            isGenerating: false,
          };
        });
      });
    } catch (error) {
      console.error('Error in handleReportAnalysis:', error);
    }
  }, [chatState]);

  // Handle report generation request
  const handleReportGeneration = useCallback(async (message: Message) => {
    try {
      const newMessage = createMessage(MessageType.REPORTGEN, 'assistant', '');

      setChatState((prev) => ({
        ...prev,
        messages: [...prev.messages, newMessage],
      }));

      const dialogueHistory = chatState.messages
        .filter((msg) => typeof msg.content === 'string')
        .map((msg) => ({
          role: msg.role,
          content: msg.content as string,
        }));
      dialogueHistory.push({
        role: message.role,
        content: message.content as string,
      });

      await reportGenService.chat(dialogueHistory, chatState.chatId, (content) => {
        setChatState((prev) => {
          const updatedMessages = [...prev.messages];
          const lastMessage = updatedMessages[updatedMessages.length - 1];
          if (lastMessage) {
            lastMessage.content = content;
          }
          return {
            ...prev,
            messages: updatedMessages,
            isGenerating: false,
          };
        });
      });
    } catch (error) {
      console.error('Error in handleReportGeneration:', error);
      setChatState((prev) => ({
        ...prev,
        isGenerating: false,
        error: '报告生成失败',
      }));
    }
  }, [chatState]);

  // Handle report quality control request
  const handleReportQuality = useCallback(async (message: Message) => {
    try {
      const newMessage = createMessage(MessageType.REPORTQUALITY, 'assistant', '');

      setChatState((prev) => ({
        ...prev,
        messages: [...prev.messages, newMessage],
      }));

      const dialogueHistory = chatState.messages
        .filter((msg) => typeof msg.content === 'string')
        .map((msg) => ({
          role: msg.role,
          content: msg.content as string,
        }));
      dialogueHistory.push({
        role: message.role,
        content: message.content as string,
      });

      await reportQualityService.chat(dialogueHistory, chatState.chatId, (content, finish) => {
        setChatState((prev) => {
          const updatedMessages = [...prev.messages];
          const lastMessage = updatedMessages[updatedMessages.length - 1];
          if (lastMessage) {
            lastMessage.content = content;
          }
          return {
            ...prev,
            messages: updatedMessages,
            isGenerating: finish === 0,
          };
        });
      });
    } catch (error) {
      console.error('Error in handleReportQuality:', error);
      setChatState((prev) => ({
        ...prev,
        isGenerating: false,
        error: '报告质控失败',
      }));
    }
  }, [chatState]);

  // Send message handler
  const handleSendMessage = useCallback(
    async (content: string) => {
      // Create new request controller
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
      abortControllerRef.current = new AbortController();

      // Create user message
      const userMessage = createMessage(currentModule, 'user', content);

      setChatState((prev) => ({
        ...prev,
        messages: [...prev.messages, userMessage],
        isGenerating: true,
        error: undefined,
      }));

      // Handle message based on module type
      switch (currentModule) {
        case MessageType.STANDARDIZATION:
          await handleStandardization(userMessage);
          break;
        case MessageType.RECOMMENDATION:
          await handleRecommendation(userMessage);
          break;
        case MessageType.REPORT:
          await handleReportAnalysis(userMessage);
          break;
        case MessageType.REPORTGEN:
          await handleReportGeneration(userMessage);
          break;
        case MessageType.REPORTQUALITY:
          await handleReportQuality(userMessage);
          break;
        default:
          setChatState((prev) => ({
            ...prev,
            messages: updateMessageStatus(prev.messages, userMessage.id, 'error'),
            isGenerating: false,
            error: '未实现的功能模块',
          }));
      }
    },
    [currentModule, handleStandardization, handleRecommendation, handleReportAnalysis, handleReportGeneration, handleReportQuality]
  );

  const handleQuestionClick = useCallback((question: string) => {
    if (chatInputRef.current) {
      chatInputRef.current.setInputContent(question);
    }
  }, []);

  const handleClearMessages = useCallback(() => {
    setChatState((prev) => ({
      ...prev,
      messages: [],
      chatId: Math.random().toString(36).substring(7),
    }));
  }, []);

  return (
    <div className="flex flex-col h-full bg-gray-50 dark:bg-gray-800/50">
      {/* Message list area */}
      <div className="flex-1 overflow-y-auto p-4">
        <MessageList
          messages={chatState.messages}
          currentRound={0}
          onQuestionClick={handleQuestionClick}
        />
      </div>

      {/* Generation progress area */}
      {chatState.isGenerating && (
        <GenerationProgress
          status="generating"
          currentStep={t.ai.messages.processing}
          onCancel={handleCancel}
        />
      )}

      {/* Error message */}
      {chatState.error && !chatState.isGenerating && (
        <div className="px-4 py-2 bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 text-sm">
          {chatState.error}
        </div>
      )}

      {/* Input area */}
      <div className="border-t border-gray-200 dark:border-gray-700">
        <div className="flex items-center">
          <button
            className="px-4 py-2 text-sm text-gray-500 dark:text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 flex items-center gap-1"
            onClick={handleClearMessages}
            title={t.ai.chat.clearChat}
          >
            <Trash2 className="w-4 h-4" />
          </button>
          <div className="flex-1">
            <ChatInput
              ref={chatInputRef}
              moduleType={currentModule}
              onSendMessage={handleSendMessage}
              isLoading={chatState.isGenerating}
              placeholder={currentModuleConfig?.inputPlaceholder}
              initialContent={selectedExample}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatBox;
