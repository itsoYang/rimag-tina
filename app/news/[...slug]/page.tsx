'use client';

import React, { useState, useEffect } from 'react';
import { Calendar, Tag, ArrowLeft } from 'lucide-react';
import { TinaMarkdown } from 'tinacms/dist/rich-text';
import { components } from '@/components/mdx-components';
import client from '@/tina/__generated__/client';
import Link from 'next/link';
import { useParams } from 'next/navigation';

interface NewsData {
  title: string;
  date: string;
  cover?: string | null;
  summary?: string | null;
  category?: string | null;
  tags?: (string | null)[] | null;
  _body: any;
}

export default function NewsDetailPage() {
  const params = useParams();
  const [news, setNews] = useState<NewsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadNewsDetail = async () => {
      try {
        // Next.js 15: params 可能为 null，需要检查
        if (!params || !params.slug) {
          setError('新闻不存在');
          return;
        }
        
        const slug = Array.isArray(params.slug) ? params.slug.join('/') : params.slug;
        console.log('Loading news with slug:', slug);

        const result = await client.queries.newsDetailQuery({
          relativePath: `${slug}.md`
        });
        console.log('API response:', result);

        if (result.data.news) {
          const newsData: NewsData = {
            title: result.data.news.title,
            date: result.data.news.date,
            cover: result.data.news.cover,
            category: result.data.news.category,
            summary: result.data.news.summary,
            _body: result.data.news._body,
            tags: result.data.news.tags
          };
          setNews(newsData);
        }
      } catch (err) {
        console.error('Failed to load news:', err);
        setError('加载新闻失败');
      } finally {
        setLoading(false);
      }
    };

    if (params?.slug) {
      loadNewsDetail();
    }
  }, [params?.slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-xl text-gray-600 dark:text-gray-400">加载中...</div>
      </div>
    );
  }

  if (error || !news) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-xl text-red-500">{error || '新闻未找到'}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-gray-900 py-24">
      <div className="container mx-auto px-4">
        <Link
          href="/news"
          className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:gap-3 transition-all duration-300 mb-8"
        >
          <ArrowLeft size={20} />
          返回新闻列表
        </Link>

        <article className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden">
          {news.cover && (
            <div className="relative h-[400px] overflow-hidden">
              <img
                src={news.cover}
                alt={news.title}
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
          )}

          <div className="p-8 md:p-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 dark:text-white">
              {news.title}
            </h1>

            <div className="flex items-center gap-4 mb-8 text-gray-600 dark:text-gray-400">
              <span className="flex items-center gap-2">
                <Calendar size={16} />
                {new Date(news.date).toLocaleDateString('zh-CN')}
              </span>
              {news.category && (
                <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full text-sm">
                  {news.category}
                </span>
              )}
            </div>

            {news.summary && (
              <div className="text-lg text-gray-600 dark:text-gray-300 mb-8 p-6 bg-blue-50 dark:bg-blue-900/20 rounded-lg border-l-4 border-blue-600">
                {news.summary}
              </div>
            )}

            <div className="prose prose-lg dark:prose-invert max-w-none">
              <TinaMarkdown content={news._body} components={components} />
            </div>

            {news.tags && news.tags.length > 0 && (
              <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
                <div className="flex items-center gap-2 flex-wrap">
                  <Tag size={16} className="text-gray-600 dark:text-gray-400" />
                  <span className="text-gray-600 dark:text-gray-400">标签:</span>
                  {news.tags.filter((tag): tag is string => tag !== null).map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded-full text-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </article>
      </div>
    </div>
  );
}
