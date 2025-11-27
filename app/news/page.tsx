'use client';

import React, { useState } from 'react';
import { Megaphone, Calendar } from 'lucide-react';
import ContentLayout from '@/components/content/ContentLayout';
import ContentFilter from '@/components/content/ContentFilter';
import NewsList from '@/components/news/NewsList';
import { Category, ContentFilter as FilterType } from '@/types/content';

const NewsPage = () => {
  const categories: Category[] = [
    {
      id: 'announcement',
      label: '公告',
      icon: Megaphone,
      count: 0
    },
    {
      id: 'event',
      label: '活动',
      icon: Calendar,
      count: 0
    }
  ];

  const [filter, setFilter] = useState<FilterType>({
    search: '',
    category: null,
    tags: [],
    dateRange: {
      start: null,
      end: null
    }
  });

  return (
    <ContentLayout
      title="新闻动态"
      subtitle="了解医学影像标准化领域的最新动态和重要资讯"
      cover="https://images.unsplash.com/photo-1576091160550-2173dba999ef"
    >
      <div className="mb-8">
        <ContentFilter
          filter={filter}
          categories={categories}
          onFilterChange={setFilter}
        />
      </div>

      <NewsList filter={filter} />
    </ContentLayout>
  );
};

export default NewsPage;
