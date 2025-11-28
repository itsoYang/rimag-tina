'use client';

import React from 'react';
import BaseMessage from './BaseMessage';
import { MessageType, type BaseMessageProps } from '@/types/ai';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

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
      <div className="prose dark:prose-invert max-w-none [&>*:first-child]:mt-0 [&>*:last-child]:mb-0">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            h1: ({node, ...props}) => <h1 className="text-2xl font-bold mt-4 mb-2" {...props} />,
            h2: ({node, ...props}) => <h2 className="text-xl font-bold mt-3 mb-2" {...props} />,
            h3: ({node, ...props}) => <h3 className="text-lg font-semibold mt-2 mb-1" {...props} />,
            h4: ({node, ...props}) => <h4 className="text-base font-semibold mt-2 mb-1" {...props} />,
            p: ({node, ...props}) => <p className="my-2 leading-relaxed" {...props} />,
            ul: ({node, ...props}) => <ul className="my-2 ml-4 list-disc space-y-1" {...props} />,
            ol: ({node, ...props}) => <ol className="my-2 ml-4 list-decimal space-y-1" {...props} />,
            li: ({node, ...props}) => <li className="leading-relaxed" {...props} />,
            strong: ({node, ...props}) => <strong className="font-semibold text-gray-900 dark:text-gray-100" {...props} />,
            em: ({node, ...props}) => <em className="italic text-gray-800 dark:text-gray-200" {...props} />,
            blockquote: ({node, ...props}) => <blockquote className="border-l-4 border-blue-500 pl-4 my-2 italic text-gray-700 dark:text-gray-300" {...props} />,
            code: ({node, inline, ...props}: any) =>
              inline
                ? <code className="bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded text-sm" {...props} />
                : <code className="block bg-gray-100 dark:bg-gray-800 p-3 rounded my-2 text-sm overflow-x-auto" {...props} />,
          }}
        >
          {String(content)}
        </ReactMarkdown>
      </div>
    </BaseMessage>
  );
};

export default ReportGenMessage;
