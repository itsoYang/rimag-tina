'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'motion/react';
import { ArrowRight, Calendar, Clock } from 'lucide-react';
import client from '@/tina/__generated__/client';
import { useLanguage } from '@/contexts/LanguageContext';

interface ContentItem {
  node: {
    id: string;
    title: string;
    date: string;
    summary?: string;
    cover?: string;
    _sys: {
      relativePath: string;
      filename: string;
    }
  }
}

const NewsAndBlogs: React.FC = () => {
  const router = useRouter();
  const { t } = useLanguage();
  const [newsItems, setNewsItems] = useState<ContentItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadContent = async () => {
      try {
        const newsResult = await client.queries.newsConnection({
          sort: "date",
          first: 10
        });

        const edges = newsResult.data?.newsConnection?.edges || [];
        setNewsItems(edges.slice(0, 6) as ContentItem[]);
        setLoading(false);
      } catch (err) {
        console.error('Failed to load content:', err);
        setLoading(false);
      }
    };

    loadContent();
  }, []);

  if (loading) {
    return (
      <section className="py-20 bg-slate-50 dark:bg-gray-900">
        <div className="container mx-auto px-4 text-center text-blue-600 dark:text-cyan-400">
          加载中...
        </div>
      </section>
    );
  }

  return (
    <section className="bg-slate-50 dark:bg-gray-900 relative overflow-hidden py-20 transition-colors duration-300">
      {/* Background Grid */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10 pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <h2 className="text-4xl font-bold text-center mb-12">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-500 to-purple-500">
            {t.common.content.latestUpdates}
          </span>
        </h2>

        {/* News Ticker */}
        {newsItems.length > 0 && (
          <div className="mb-16 relative">
            <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-slate-50 to-transparent dark:from-gray-900 dark:to-transparent z-10" />
            <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-slate-50 to-transparent dark:from-gray-900 dark:to-transparent z-10" />

            <div className="glass-panel rounded-full py-4 px-2 overflow-hidden flex items-center border-blue-200 dark:border-cyan-500/30">
              <div className="bg-blue-600 dark:bg-cyan-500 text-white dark:text-gray-900 font-bold px-4 py-1 rounded-full text-sm whitespace-nowrap mr-4 ml-2">
                NEWS FLASH
              </div>
              <motion.div
                className="flex space-x-12 whitespace-nowrap"
                animate={{ x: [0, -1000] }}
                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
              >
                {[...newsItems, ...newsItems].map((item, index) => (
                  <div
                    key={`${item.node.id}-${index}`}
                    className="flex items-center space-x-3 cursor-pointer group"
                    onClick={() => router.push(`/news/${item.node._sys.filename.replace('.md', '')}`)}
                  >
                    <span className="text-blue-500 dark:text-cyan-500/70 text-sm font-mono">{item.node.date}</span>
                    <span className="text-gray-700 dark:text-gray-300 group-hover:text-blue-600 dark:group-hover:text-white transition-colors">
                      {item.node.title}
                    </span>
                    <ArrowRight className="w-4 h-4 text-blue-600 dark:text-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        )}

        {/* News Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {newsItems.slice(0, 3).map(({ node: item }, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="glass-card rounded-xl overflow-hidden group flex flex-col h-full border-white/40 dark:border-white/5 hover:border-blue-300 dark:hover:border-cyan-500/50 cursor-pointer"
              onClick={() => router.push(`/news/${item._sys.filename.replace('.md', '')}`)}
            >
              <div className="relative h-48 overflow-hidden">
                {item.cover ? (
                  <img
                    src={item.cover}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 flex items-center justify-center">
                    <Clock className="w-12 h-12 text-gray-400 dark:text-gray-700" />
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent opacity-60" />
                <div className="absolute bottom-4 left-4 flex items-center space-x-2 text-xs text-blue-300 dark:text-cyan-400 font-mono bg-black/50 backdrop-blur-sm px-2 py-1 rounded">
                  <Calendar className="w-3 h-3" />
                  <span>{item.date}</span>
                </div>
              </div>

              <div className="p-6 flex-1 flex flex-col">
                <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-cyan-400 transition-colors line-clamp-2">
                  {item.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-3 mb-4 flex-1">
                  {item.summary}
                </p>
                <div className="flex items-center text-blue-600 dark:text-cyan-400 text-sm font-medium group/link">
                  {t.common.common.learnMore}
                  <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover/link:translate-x-1" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-12">
          <button
            className="px-8 py-3 border-2 border-blue-200 dark:border-cyan-500/30 text-blue-600 dark:text-cyan-400 hover:bg-blue-50 dark:hover:bg-cyan-500/10 rounded-lg transition-all duration-300"
            onClick={() => router.push('/news')}
          >
            {t.common.news.viewAll}
          </button>
        </div>
      </div>
    </section>
  );
};

export default NewsAndBlogs;

