'use client';

import React, { useState, useEffect } from 'react';
import { Calendar, Tag, ArrowLeft, User } from 'lucide-react';
import { TinaMarkdown } from 'tinacms/dist/rich-text';
import { components } from '@/components/mdx-components';
import client from '@/tina/__generated__/client';
import Link from 'next/link';
import { useParams } from 'next/navigation';

interface BlogData {
  title: string;
  author: string;
  date: string;
  cover?: string | null;
  summary?: string | null;
  category?: string | null;
  tags?: (string | null)[] | null;
  body: any;
}

export default function BlogDetailPage() {
  const params = useParams();
  const [blog, setBlog] = useState<BlogData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadBlogDetail = async () => {
      try {
        const slug = Array.isArray(params.slug) ? params.slug.join('/') : params.slug;
        console.log('Loading blog with slug:', slug);

        const result = await client.queries.blog({
          relativePath: `${slug}.md`
        });
        console.log('API response:', result);

        if (result.data.blog) {
          const blogData: BlogData = {
            title: result.data.blog.title,
            author: result.data.blog.author,
            date: result.data.blog.date,
            cover: result.data.blog.cover,
            category: result.data.blog.category,
            summary: result.data.blog.summary,
            body: result.data.blog.body,
            tags: result.data.blog.tags
          };
          setBlog(blogData);
        }
      } catch (err) {
        console.error('Failed to load blog:', err);
        setError('加载博客失败');
      } finally {
        setLoading(false);
      }
    };

    if (params.slug) {
      loadBlogDetail();
    }
  }, [params.slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-xl text-gray-600 dark:text-gray-400">加载中...</div>
      </div>
    );
  }

  if (error || !blog) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-xl text-red-500">{error || '博客未找到'}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-gray-900 py-24">
      <div className="container mx-auto px-4">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:gap-3 transition-all duration-300 mb-8"
        >
          <ArrowLeft size={20} />
          返回博客列表
        </Link>

        <article className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden">
          {blog.cover && (
            <div className="relative h-[400px] overflow-hidden">
              <img
                src={blog.cover}
                alt={blog.title}
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
          )}

          <div className="p-8 md:p-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 dark:text-white">
              {blog.title}
            </h1>

            <div className="flex items-center gap-4 mb-8 text-gray-600 dark:text-gray-400 flex-wrap">
              <span className="flex items-center gap-2">
                <User size={16} />
                {blog.author}
              </span>
              <span className="flex items-center gap-2">
                <Calendar size={16} />
                {new Date(blog.date).toLocaleDateString('zh-CN')}
              </span>
              {blog.category && (
                <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full text-sm">
                  {blog.category}
                </span>
              )}
            </div>

            {blog.summary && (
              <div className="text-lg text-gray-600 dark:text-gray-300 mb-8 p-6 bg-blue-50 dark:bg-blue-900/20 rounded-lg border-l-4 border-blue-600">
                {blog.summary}
              </div>
            )}

            <div className="prose prose-lg dark:prose-invert max-w-none">
              <TinaMarkdown content={blog.body} components={components} />
            </div>

            {blog.tags && blog.tags.length > 0 && (
              <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
                <div className="flex items-center gap-2 flex-wrap">
                  <Tag size={16} className="text-gray-600 dark:text-gray-400" />
                  <span className="text-gray-600 dark:text-gray-400">标签:</span>
                  {blog.tags.filter((tag): tag is string => tag !== null).map((tag) => (
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
