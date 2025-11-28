'use client';

import { useEffect, useState } from 'react';
import ContentLayout from '@/components/content/ContentLayout';
import { motion } from 'motion/react';
import { Target } from 'lucide-react';
import { TinaMarkdown } from 'tinacms/dist/rich-text';
import client from '@/tina/__generated__/client';
import { components } from '@/components/mdx-components';

interface AboutData {
  title: string;
  content: any;
  sections?: {
    heading?: string;
    description?: string;
    image?: string;
  }[];
}

export default function About() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pageData, setPageData] = useState<AboutData | null>(null);

  useEffect(() => {
    async function loadContent() {
      try {
        const result = await client.queries.aboutQuery({
          relativePath: 'about.md'
        });

        if (result.data.about) {
          setPageData({
            title: result.data.about.title,
            content: result.data.about.content,
            sections: result.data.about.sections as any,
          });
        }
      } catch (err) {
        console.error('Error loading about page:', err);
        setError(err instanceof Error ? err.message : '加载内容失败');
      } finally {
        setIsLoading(false);
      }
    }

    loadContent();
  }, []);

  if (isLoading) {
    return (
      <ContentLayout title="关于我们" subtitle="了解我们的使命和团队">
        <div className="space-y-8">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-64 rounded-xl animate-pulse bg-white/50 dark:bg-white/5 border border-gray-200 dark:border-gray-700" />
          ))}
        </div>
      </ContentLayout>
    );
  }

  if (error || !pageData) {
    return (
      <ContentLayout title="关于我们" subtitle="">
        <div className="text-center text-red-500">
          {error || '未找到内容'}
        </div>
      </ContentLayout>
    );
  }

  const { title, content, sections } = pageData;

  return (
    <ContentLayout
      title={title}
      subtitle="致力于推动医学影像行业标准化发展"
    >
      <div className="container mx-auto px-4 py-8">
        {/* Main Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="p-8 md:p-12 rounded-2xl mb-16 max-w-4xl mx-auto border border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm"
        >
          <div className="prose prose-lg dark:prose-invert max-w-none">
            {content && (
              <TinaMarkdown content={content} components={components} />
            )}
          </div>
        </motion.div>

        {/* Sections Grid */}
        {sections && sections.length > 0 && (
          <div className="grid gap-8 md:grid-cols-2 mb-20">
            {sections.map((section, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 + 0.3, duration: 0.5 }}
                className="group rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm hover:border-blue-400 dark:hover:border-blue-500/50 transition-all duration-300"
              >
                {section.image && (
                  <div className="aspect-video overflow-hidden relative">
                    <img
                      src={section.image}
                      alt={section.heading || ''}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                )}
                <div className="p-8">
                  <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white flex items-center gap-3">
                    <Target className="w-6 h-6 text-blue-500 dark:text-blue-400" />
                    {section.heading}
                  </h2>
                  <div className="text-gray-600 dark:text-gray-300 whitespace-pre-line leading-relaxed">
                    {section.description}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </ContentLayout>
  );
}
