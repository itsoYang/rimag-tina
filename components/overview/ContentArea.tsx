'use client';

import React, { useEffect, useRef } from 'react';
import { TinaMarkdown } from 'tinacms/dist/rich-text';
import { generateId } from '@/lib/helpers';
import { components } from '@/components/mdx-components';

interface OverviewData {
  id: string;
  title: string;
  description?: string;
  _body: any;
  order: number;
  _sys: {
    filename: string;
  };
}

interface ContentAreaProps {
  content: OverviewData;
}

export default function ContentArea({ content }: ContentAreaProps) {
  const contentRef = useRef<HTMLDivElement>(null);

  const transformContent = (content: any) => {
    if (!content?._body) return null;

    if (content._body._type === 'rich-text' || content._body.type === 'root') {
      return content._body;
    }

    const transformNode = (node: any): any => {
      if (node.type?.match(/^h[1-6]$/)) {
        const titleText = node.children?.reduce((acc: string, child: any) => {
          if (child.type === 'text') {
            return acc + (child.value || child.text || '');
          }
          return acc;
        }, '') || '';

        const headingId = generateId(titleText);

        return {
          ...node,
          id: headingId,
          children: node.children?.map(transformNode) || []
        };
      }

      if (node.type === 'text') {
        return {
          text: node.value || node.text || '',
          ...(node.bold && { bold: true }),
          ...(node.italic && { italic: true })
        };
      }

      return {
        ...node,
        children: node.children?.map(transformNode) || []
      };
    };

    return {
      _type: 'rich-text',
      children: content._body.children?.map(transformNode) || []
    };
  };

  const transformedContent = transformContent(content);

  const customComponents = {
    ...components,
    h1: (props: any) => {
      const text = Array.isArray(props.children) ? props.children.join('') : props.children;
      const id = props.id || generateId(text);
      return (
        <h1 id={id} className="text-2xl md:text-3xl font-bold mb-8 pb-4 border-b border-gray-200 dark:border-gray-700 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-white dark:to-blue-200">
          {props.children}
        </h1>
      );
    },
    h2: (props: any) => {
      const text = Array.isArray(props.children) ? props.children.join('') : props.children;
      const id = props.id || generateId(text);
      return (
        <h2 id={id} className="text-xl md:text-2xl font-bold mt-10 mb-5 flex items-center group text-gray-900 dark:text-white">
          <span className="w-1.5 h-6 bg-blue-500 dark:bg-blue-400 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
          {props.children}
        </h2>
      );
    },
    h3: (props: any) => {
      const text = Array.isArray(props.children)
        ? props.children.map((child: any) =>
          typeof child === 'string'
            ? child
            : child?.props?.children || ''
        ).join('')
        : typeof props.children === 'string'
          ? props.children
          : props.children?.props?.children || '';

      const id = props.id || generateId(text);
      return <h3 id={id} className="text-lg md:text-xl font-bold mt-8 mb-4 text-gray-800 dark:text-gray-100">{props.children}</h3>;
    },
    h4: (props: any) => {
      const text = Array.isArray(props.children) ? props.children.join('') : props.children;
      const id = props.id || generateId(text);
      return <h4 id={id} className="text-base md:text-lg font-bold mt-6 mb-3 text-gray-700 dark:text-gray-200">{props.children}</h4>;
    },
    h5: (props: any) => {
      const text = Array.isArray(props.children) ? props.children.join('') : props.children;
      const id = props.id || generateId(text);
      return <h5 id={id} className="text-sm md:text-base font-bold mt-4 mb-2 text-gray-700 dark:text-gray-300">{props.children}</h5>;
    },
    h6: (props: any) => {
      const text = Array.isArray(props.children) ? props.children.join('') : props.children;
      const id = props.id || generateId(text);
      return <h6 id={id} className="text-sm font-bold mt-4 mb-2 text-gray-700 dark:text-gray-300">{props.children}</h6>;
    },
    table: (props: any) => {
      return (
        <div className="my-8 overflow-x-auto border border-gray-200 dark:border-gray-700 rounded-xl shadow-sm bg-white/50 dark:bg-gray-800/50">
          <table className="min-w-full divide-y divide-gray-200 dark:border-gray-700">
            {props.children}
          </table>
        </div>
      );
    },
    thead: (props: any) => (
      <thead className="bg-blue-50 dark:bg-gray-700">
        {props.children}
      </thead>
    ),
    tbody: (props: any) => (
      <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
        {props.children}
      </tbody>
    ),
    tr: (props: any) => (
      <tr className="hover:bg-blue-50/50 dark:hover:bg-gray-700/50 transition-colors">
        {props.children}
      </tr>
    ),
    th: (props: any) => (
      <th className="px-4 py-3 text-left text-sm font-bold text-gray-900 dark:text-white">
        {props.children}
      </th>
    ),
    td: (props: any) => (
      <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
        {props.children}
      </td>
    ),
  };

  return (
    <article className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-8 md:p-12 min-h-[calc(100vh-8rem)]">
      <div ref={contentRef} className="prose prose-base dark:prose-invert max-w-none">
        {transformedContent && (
          <TinaMarkdown
            content={transformedContent}
            components={customComponents}
          />
        )}
      </div>
    </article>
  );
}
