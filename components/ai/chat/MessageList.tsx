'use client';

import React from 'react';
import { Message, MessageType } from '@/types/ai';
import {
  BaseMessage,
  StandardizationMessage,
  RecommendationMessage,
  ReportMessage,
  ReportGenMessage,
  ReportQualityMessage,
  QuestionsMessage,
} from '../messages';

interface MessageListProps {
  messages: Message[];
  currentRound?: number;
  onQuestionClick?: (question: string) => void;
}

// Message type to component mapping
const messageComponents: Record<string, React.ComponentType<any>> = {
  [MessageType.STANDARDIZATION]: StandardizationMessage,
  [MessageType.RECOMMENDATION]: RecommendationMessage,
  [MessageType.REPORT]: ReportMessage,
  [MessageType.REPORTGEN]: ReportGenMessage,
  [MessageType.REPORTQUALITY]: ReportQualityMessage,
  [MessageType.QUESTIONS]: QuestionsMessage,
};

const MessageList: React.FC<MessageListProps> = ({
  messages,
  currentRound = 0,
  onQuestionClick,
}) => {
  return (
    <div className="space-y-4">
      {messages.map((message, index) => {
        // Get corresponding message component
        const MessageComponent = messageComponents[message.type] || BaseMessage;
        // Calculate current message round
        const messageRound = Math.floor(index / 2) + 1;

        return (
          <div
            key={message.id}
            className={`transition-all duration-200 ${
              message.status === 'sending' ? 'opacity-70' : 'opacity-100'
            }`}
          >
            <MessageComponent
              role={message.role}
              content={message.content}
              timestamp={message.timestamp}
              parsedContent={message.parsedContent}
              round={messageRound}
              onQuestionClick={
                message.type === MessageType.QUESTIONS ? onQuestionClick : undefined
              }
            />

            {/* Error status indicator */}
            {message.status === 'error' && (
              <div className="mt-1 text-sm text-red-500 dark:text-red-400">
                消息发送失败，请重试
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default MessageList;
