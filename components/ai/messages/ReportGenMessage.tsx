'use client';

import React from 'react';
import BaseMessage from './BaseMessage';
import { MessageType, type BaseMessageProps } from '@/types/ai';
import ReactMarkdown from 'react-markdown';

interface ReportGenMessageProps extends BaseMessageProps {
  parsedContent?: any;
}

const ReportGenMessage: React.FC<ReportGenMessageProps> = (props) => {
  const { content, ...baseProps } = props;

  // If it's a user message, use base message component
  if (props.role === 'user') {
    return <BaseMessage {...props} />;
  }

  return (
    <BaseMessage {...baseProps} content="" messageType={MessageType.REPORTGEN}>
      <div className="prose dark:prose-invert max-w-none [&>*:first-child]:mt-0 [&>*:last-child]:mb-0 [&>p]:my-2 [&>ul]:my-2 [&>ol]:my-2 [&>blockquote]:my-2 [&>pre]:my-2 whitespace-normal">
        <ReactMarkdown>{String(content)}</ReactMarkdown>
      </div>
    </BaseMessage>
  );
};

export default ReportGenMessage;
