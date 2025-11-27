'use client';

import React from 'react';
import { Search } from 'lucide-react';
import type { Category, ContentFilter as FilterType } from '@/types/content';

interface ContentFilterProps {
  filter: FilterType;
  categories: Category[];
  onFilterChange: (filter: FilterType) => void;
}

const ContentFilter: React.FC<ContentFilterProps> = ({
  filter,
  categories,
  onFilterChange
}) => {
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onFilterChange({
      ...filter,
      search: e.target.value
    });
  };

  const handleCategoryChange = (categoryId: string | null) => {
    onFilterChange({
      ...filter,
      category: categoryId
    });
  };

  return (
    <div className="space-y-6">
      <div className="relative">
        <input
          type="text"
          value={filter.search}
          onChange={handleSearchChange}
          placeholder="搜索内容..."
          className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
        />
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
      </div>

      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => handleCategoryChange(null)}
          className={`px-4 py-2 rounded-lg transition-colors ${
            filter.category === null
              ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
              : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
          }`}
        >
          全部
        </button>
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => handleCategoryChange(category.id)}
            className={`px-4 py-2 rounded-lg transition-colors ${
              filter.category === category.id
                ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
            }`}
          >
            <div className="flex items-center gap-2">
              <category.icon size={16} />
              <span>{category.label}</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ContentFilter;
