'use client';

import React, { useEffect, useState } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { generateId } from '@/lib/helpers';

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

interface NavItem {
  id: string;
  title: string;
  level: number;
  parentId?: string;
  children?: NavItem[];
}

interface LeftNavigationProps {
  content: OverviewData[];
  onFileSelect: (filename: string) => void;
  selectedFile: string | null;
}

export default function LeftNavigation({ content, onFileSelect, selectedFile }: LeftNavigationProps) {
  const [headings, setHeadings] = useState<{ [key: string]: NavItem[] }>({});
  const [expandedFiles, setExpandedFiles] = useState<Set<string>>(new Set());
  const [expandedHeadings, setExpandedHeadings] = useState<Set<string>>(new Set());

  useEffect(() => {
    const extractHeadings = (content: OverviewData[]) => {
      const headingsMap: { [key: string]: NavItem[] } = {};
      const initialExpandedHeadings = new Set<string>();

      content.forEach((file) => {
        const items: NavItem[] = [];
        let lastHeadings: { [key: number]: NavItem } = {};

        if (file._body && Array.isArray(file._body.children)) {
          file._body.children.forEach((node: any) => {
            if (node.type?.match(/^h[1-6]$/) && node.children) {
              const level = parseInt(node.type.charAt(1));
              const title = node.children.reduce((acc: string, child: any) => {
                if (child.type === 'text') {
                  return acc + child.text;
                }
                return acc;
              }, '');

              if (title) {
                const id = generateId(title);
                const item: NavItem = { id, title, level };

                let parentLevel = level - 1;
                while (parentLevel > 0) {
                  const parent = lastHeadings[parentLevel];
                  if (parent) {
                    item.parentId = parent.id;
                    if (!parent.children) {
                      parent.children = [];
                    }
                    parent.children.push(item);
                    break;
                  }
                  parentLevel--;
                }

                lastHeadings[level] = item;
                if (level === 1 || !item.parentId) {
                  items.push(item);
                }

                if (level === 1) {
                  initialExpandedHeadings.add(id);
                }
              }
            }
          });
        }

        headingsMap[file._sys.filename] = items;
      });

      setExpandedHeadings(initialExpandedHeadings);
      return headingsMap;
    };

    setHeadings(extractHeadings(content));

    if (selectedFile) {
      setExpandedFiles(new Set([selectedFile]));
    }
  }, [content, selectedFile]);

  const scrollToHeading = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const rect = element.getBoundingClientRect();
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const absoluteTop = scrollTop + rect.top;
      const navbarHeight = 64;

      window.scrollTo({
        top: absoluteTop - navbarHeight - 20,
        behavior: 'smooth'
      });

      element.style.backgroundColor = '#fef3c7';
      setTimeout(() => {
        element.style.backgroundColor = '';
      }, 1500);
    }
  };

  const toggleFile = (filename: string, event: React.MouseEvent) => {
    event.stopPropagation();
    setExpandedFiles((prev) => {
      const next = new Set(prev);
      if (next.has(filename)) {
        next.delete(filename);
      } else {
        next.add(filename);
      }
      return next;
    });
  };

  const toggleHeading = (id: string, event: React.MouseEvent) => {
    event.stopPropagation();
    setExpandedHeadings((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const renderHeadingItem = (heading: NavItem, level: number = 0) => {
    const hasChildren = heading.children && heading.children.length > 0;
    const isExpanded = expandedHeadings.has(heading.id);

    return (
      <div key={heading.id}>
        <div className="flex items-center">
          {hasChildren && (
            <button
              onClick={(e) => toggleHeading(heading.id, e)}
              className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
            >
              {isExpanded ? (
                <ChevronDown className="w-4 h-4" />
              ) : (
                <ChevronRight className="w-4 h-4" />
              )}
            </button>
          )}
          <button
            onClick={() => scrollToHeading(heading.id)}
            className={`
              flex-1 text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700
              text-gray-600 dark:text-gray-300
              ${level === 0 ? 'text-base font-medium' : 'text-[15px]'}
            `}
            style={{ paddingLeft: hasChildren ? '0.5rem' : `${level + 1}rem` }}
          >
            {heading.title}
          </button>
        </div>
        {hasChildren && isExpanded && (
          <div className="ml-4">
            {heading.children!.map(child => renderHeadingItem(child, level + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <nav className="space-y-4">
      {content.map((item) => (
        <div key={item.id} className="rounded-xl overflow-hidden transition-all duration-300 border border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-800/80 hover:shadow-lg hover:border-blue-300 dark:hover:border-blue-500/30">
          <div className="flex items-center">
            {headings[item._sys.filename]?.length > 0 && (
              <button
                onClick={(e) => toggleFile(item._sys.filename, e)}
                className="p-3 hover:bg-blue-50 dark:hover:bg-white/5 text-gray-500 dark:text-gray-400 transition-colors"
              >
                {expandedFiles.has(item._sys.filename) ? (
                  <ChevronDown className="w-4 h-4" />
                ) : (
                  <ChevronRight className="w-4 h-4" />
                )}
              </button>
            )}
            <button
              onClick={() => onFileSelect(item._sys.filename)}
              className={`flex-1 text-left px-4 py-3 transition-all duration-300 ${selectedFile === item._sys.filename
                  ? 'bg-gradient-to-r from-blue-600/10 to-transparent dark:from-blue-400/10 border-l-4 border-blue-600 dark:border-blue-400'
                  : 'hover:bg-blue-50 dark:hover:bg-white/5 border-l-4 border-transparent'
                }`}
            >
              <h3 className={`font-bold text-sm ${selectedFile === item._sys.filename
                  ? 'text-blue-600 dark:text-blue-400'
                  : 'text-gray-700 dark:text-gray-200'
                }`}>
                {item.title}
              </h3>
              {item.description && (
                <p className={`text-xs mt-1 line-clamp-2 ${selectedFile === item._sys.filename
                    ? 'text-blue-500/80 dark:text-blue-400/70'
                    : 'text-gray-400 dark:text-gray-500'
                  }`}>
                  {item.description}
                </p>
              )}
            </button>
          </div>

          {expandedFiles.has(item._sys.filename) && headings[item._sys.filename] && (
            <div className="bg-gray-50/50 dark:bg-black/20 border-t border-gray-100 dark:border-white/5 p-2">
              {headings[item._sys.filename].map(heading =>
                renderHeadingItem(heading)
              )}
            </div>
          )}
        </div>
      ))}
    </nav>
  );
}
