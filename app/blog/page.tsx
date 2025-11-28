'use client';

import { useState, useEffect } from 'react';
import ContentLayout from '@/components/content/ContentLayout';
import { Beaker, Code, Book, Calendar, User, ArrowRight, Tag } from 'lucide-react';
import { motion } from 'motion/react';
import client from '@/tina/__generated__/client';
import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';

interface Category {
  id: string;
  label: string;
  icon: any;
  count: number;
}

interface BlogItem {
  node: {
    id: string;
    title: string;
    date: string;
    author: string;
    summary?: string;
    category?: string;
    cover?: string;
    _sys: {
      relativePath: string;
    };
  };
}

export default function BlogPage() {
  const { t } = useLanguage();
  const [blogItems, setBlogItems] = useState<BlogItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const categories: Category[] = [
    {
      id: 'technical',
      label: '技术博客',
      icon: Code,
      count: 0,
    },
    {
      id: 'research',
      label: '研究',
      icon: Beaker,
      count: 0,
    },
    {
      id: 'industry',
      label: '行业',
      icon: Book,
      count: 0,
    },
  ];

  useEffect(() => {
    const loadBlogs = async () => {
      try {
        const result = await client.queries.blogConnection({
          sort: 'date',
          last: 40,
        });

        if (result.data?.blogConnection?.edges) {
          setBlogItems(result.data.blogConnection.edges as BlogItem[]);
        }
      } catch (err) {
        console.error('Failed to load blogs:', err);
        setError('加载博客失败');
      } finally {
        setLoading(false);
      }
    };

    loadBlogs();
  }, []);

  const filteredBlogs = blogItems.filter((item) => {
    if (selectedCategory && item.node.category !== selectedCategory) {
      return false;
    }
    if (searchTerm) {
      const search = searchTerm.toLowerCase();
      return (
        item.node.title.toLowerCase().includes(search) ||
        item.node.summary?.toLowerCase().includes(search)
      );
    }
    return true;
  });

  if (loading) {
    return (
      <ContentLayout title="技术博客" subtitle="深度分享和技术探索">
        <div className="space-y-6">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-64 rounded-xl animate-pulse bg-white/50 dark:bg-white/5 border border-gray-200 dark:border-gray-700"
            />
          ))}
        </div>
      </ContentLayout>
    );
  }

  if (error) {
    return (
      <ContentLayout title="技术博客" subtitle="">
        <div className="text-center text-red-500">{error}</div>
      </ContentLayout>
    );
  }

  return (
    <ContentLayout title="技术博客" subtitle="深度分享和技术探索">
      <div className="container mx-auto px-4 py-8">
        {/* Filters */}
        <div className="mb-8 space-y-4">
          {/* Search Bar */}
          <div className="max-w-md">
            <input
              type="text"
              placeholder="搜索博客..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 outline-none"
            />
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedCategory(null)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                selectedCategory === null
                  ? 'bg-blue-600 text-white'
                  : 'bg-white/50 dark:bg-white/5 text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-white/10'
              }`}
            >
              全部
            </button>
            {categories.map((cat) => {
              const Icon = cat.icon;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2 ${
                    selectedCategory === cat.id
                      ? 'bg-blue-600 text-white'
                      : 'bg-white/50 dark:bg-white/5 text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-white/10'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Blog List */}
        <div className="space-y-8">
          {filteredBlogs.map(({ node: item }, index) => (
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
                  <div className="flex items-center gap-4 mb-4 flex-wrap">
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
                    <span className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-2">
                      <User size={14} />
                      {item.author}
                    </span>
                  </div>

                  <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
                    <Link href={`/blog/${item._sys.relativePath.replace('.md', '')}`}>
                      {item.title}
                    </Link>
                  </h2>

                  {item.summary && (
                    <p className="text-gray-600 dark:text-gray-300 mb-6 line-clamp-2 leading-relaxed">
                      {item.summary}
                    </p>
                  )}

                  <div className="mt-auto">
                    <Link
                      href={`/blog/${item._sys.relativePath.replace('.md', '')}`}
                      className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 font-medium hover:gap-3 transition-all duration-300"
                    >
                      阅读更多
                      <ArrowRight size={16} />
                    </Link>
                  </div>
                </div>
              </div>
            </motion.article>
          ))}

          {filteredBlogs.length === 0 && (
            <div className="text-center py-12 text-gray-500 dark:text-gray-400">
              暂无博客文章
            </div>
          )}
        </div>
      </div>
    </ContentLayout>
  );
}
