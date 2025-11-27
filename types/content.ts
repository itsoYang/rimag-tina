import { LucideIcon } from 'lucide-react';

export interface BaseContent {
  id: string;
  title: string;
  date: string;
  cover: string;
  summary: string;
  content: string;
  author: string;
  tags: string[];
  locale: string;
}

export interface NewsContent extends BaseContent {
  type: 'news';
  category: 'announcement' | 'update' | 'event';
}

export interface BlogContent extends BaseContent {
  type: 'blog';
  category: 'technical' | 'industry' | 'research';
  readingTime: number;
}

export type ContentType = NewsContent | BlogContent;

export interface Category {
  id: string;
  label: string;
  icon: LucideIcon;
  count?: number;
}

export interface ContentFilter {
  search: string;
  category: string | null;
  tags: string[];
  dateRange: {
    start: Date | null;
    end: Date | null;
  };
}
