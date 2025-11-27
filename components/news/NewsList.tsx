'use client';

import React, { useState, useEffect } from 'react';
import { Calendar, ArrowRight, Tag } from 'lucide-react';
import { motion } from 'motion/react';
import client from '@/tina/__generated__/client';

interface NewsItem {
  node: {
    id: string;
    title: string;
    date: string;
    summary?: string;
    category?: string;
    cover?: string;
    _sys: {
      filename: string;
    }
  }
}

interface NewsListProps {
  filter?: {
    search: string;
    category: string | null;
    tags: string[];
    dateRange: {
      start: Date | null;
      end: Date | null;
    };
  };
}

const ITEMS_PER_PAGE = 5;

const NewsList: React.FC<NewsListProps> = ({ filter }) => {
  const [newsItems, setNewsItems] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const loadNews = async () => {
      try {
        const result = await client.queries.newsConnection({
          sort: "date",
          last: 40,
        });

        if (result.data?.newsConnection?.edges) {
          setNewsItems(result.data.newsConnection.edges as NewsItem[]);
        }
        setLoading(false);
      } catch (err) {
        console.error('Failed to load news:', err);
        setError('加载新闻失败');
        setLoading(false);
      }
    };

    loadNews();
  }, []);

  const filteredNews = newsItems.filter(item => {
    if (filter?.category && item.node.category !== filter.category) {
      return false;
    }
    if (filter?.search) {
      const searchTerm = filter.search.toLowerCase();
      return (
        item.node.title.toLowerCase().includes(searchTerm) ||
        item.node.summary?.toLowerCase().includes(searchTerm)
      );
    }
    return true;
  });

  const totalPages = Math.ceil(filteredNews.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentItems = filteredNews.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  useEffect(() => {
    setCurrentPage(1);
  }, [filter]);

  if (loading) return (
    <div className="space-y-6">
      {[1, 2, 3].map((i) => (
        <div key={i} className="h-48 rounded-xl animate-pulse bg-white/50 dark:bg-white/5 border border-gray-200 dark:border-gray-700" />
      ))}
    </div>
  );

  if (error) return <div className="text-center text-red-500">{error}</div>;

  return (
    <div className="space-y-8">
      {currentItems.map(({ node: item }, index) => (
        <motion.article
          key={item.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="group rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm hover:border-blue-400 dark:hover:border-blue-500/50 transition-all duration-300"
        >
          <div className="flex flex-col md:flex-row">
            {item.cover && (
              <div className="md:w-1/3 h-64 md:h-auto relative overflow-hidden">
                <img
                  src={item.cover}
                  alt={item.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            )}
            <div className="flex-1 p-8 flex flex-col justify-center">
              <div className="flex items-center gap-4 mb-4">
                {item.category && (
                  <span className="text-xs font-medium px-3 py-1 rounded-full bg-blue-100/50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800 flex items-center gap-1">
                    <Tag size={12} />
                    {item.category}
                  </span>
                )}
                <span className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-2">
                  <Calendar size={14} />
                  {new Date(item.date).toLocaleDateString('zh-CN')}
                </span>
              </div>

              <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
                <a href={`/news/${item._sys.filename.replace('.md', '')}`}>
                  {item.title}
                </a>
              </h2>

              {item.summary && (
                <p className="text-gray-600 dark:text-gray-300 mb-6 line-clamp-2 leading-relaxed">
                  {item.summary}
                </p>
              )}

              <div className="mt-auto">
                <a
                  href={`/news/${item._sys.filename.replace('.md', '')}`}
                  className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 font-medium hover:gap-3 transition-all duration-300"
                >
                  阅读更多
                  <ArrowRight size={16} />
                </a>
              </div>
            </div>
          </div>
        </motion.article>
      ))}

      {totalPages > 1 && (
        <div className="flex justify-center mt-12 space-x-2">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              onClick={() => setCurrentPage(index + 1)}
              className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${currentPage === index + 1
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30'
                  : 'bg-white/50 dark:bg-white/5 text-gray-600 dark:text-gray-400 hover:bg-blue-50 dark:hover:bg-white/10'
                }`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default NewsList;
