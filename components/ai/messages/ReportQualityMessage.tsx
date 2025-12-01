'use client';

import React from 'react';
import BaseMessage from './BaseMessage';
import { MessageType, type BaseMessageProps } from '@/types/ai';
import ReactMarkdown from 'react-markdown';

interface ReportQualityMessageProps extends BaseMessageProps {
  parsedContent?: any;
}

const ReportQualityMessage: React.FC<ReportQualityMessageProps> = (props) => {
  const { content, ...baseProps } = props;

  // If it's a user message, use base message component
  if (props.role === 'user') {
    return <BaseMessage {...props} />;
  }

  return (
    <BaseMessage {...baseProps} content="" messageType={MessageType.REPORTQUALITY}>
      <div className="prose dark:prose-invert max-w-none [&>*:first-child]:mt-0 [&>*:last-child]:mb-0 [&>p]:my-2 [&>ul]:my-2 [&>ol]:my-2 [&>blockquote]:my-2 [&>pre]:my-2 whitespace-normal">
        <ReactMarkdown>{content}</ReactMarkdown>
      </div>
    </BaseMessage>
  );
};

export default ReportQualityMessage;
