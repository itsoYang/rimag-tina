'use client';

import React from 'react';
import client from '@/tina/__generated__/client';
import ContentArea from '@/components/overview/ContentArea';
import LeftNavigation from '@/components/overview/LeftNavigation';

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

export default function Overview() {
  const [data, setData] = React.useState<OverviewData[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [selectedFile, setSelectedFile] = React.useState<string | null>(null);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await client.queries.overviewQuery();

        const overviewsPromises = response.data?.overviewConnection?.edges?.map(async (edge) => {
          if (edge?.node) {
            // 获取完整数据包括body
            const detailResponse = await client.queries.overviewDetailQuery({
              relativePath: `${edge.node._sys.filename}`
            });

            return {
              id: edge.node.id,
              title: edge.node.title,
              description: edge.node.description ?? undefined,
              _body: detailResponse.data.overview?._body ?? null,
              order: edge.node.order ?? 0,
              _sys: edge.node._sys
            };
          }
          return null;
        }) || [];

        const overviews = (await Promise.all(overviewsPromises)).filter((item): item is NonNullable<typeof item> => item !== null) as OverviewData[];

        const sortedOverviews = overviews.sort((a, b) => (a.order ?? 0) - (b.order ?? 0));

        if (sortedOverviews.length > 0) {
          setData(sortedOverviews);
          if (!selectedFile) {
            setSelectedFile(sortedOverviews[0]._sys.filename);
          }
        }

        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, [selectedFile]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-gray-900 transition-colors duration-300 relative overflow-hidden">
        <div className="relative z-10 container mx-auto px-6 py-24">
          <div className="grid grid-cols-1 lg:grid-cols-[320px_minmax(0,_1fr)] gap-8">
            <aside className="hidden lg:block sticky top-24 self-start h-[calc(100vh-8rem)]">
              <div className="space-y-4">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="h-16 rounded-xl animate-pulse bg-white/50 dark:bg-white/5 border border-gray-200 dark:border-gray-700" />
                ))}
              </div>
            </aside>

            <main className="min-w-0">
              <div className="p-8 md:p-12 rounded-2xl border border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-800/80 min-h-[calc(100vh-8rem)] animate-pulse">
                <div className="h-10 w-3/4 bg-gray-200 dark:bg-white/10 rounded-lg mb-8" />
                <div className="space-y-4">
                  <div className="h-4 w-full bg-gray-200 dark:bg-white/10 rounded" />
                  <div className="h-4 w-full bg-gray-200 dark:bg-white/10 rounded" />
                  <div className="h-4 w-5/6 bg-gray-200 dark:bg-white/10 rounded" />
                </div>
              </div>
            </main>
          </div>
        </div>
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">暂无内容</h2>
          <p className="text-gray-600 dark:text-gray-400">请稍后再试</p>
        </div>
      </div>
    );
  }

  const selectedContent = data.find(item => item._sys.filename === selectedFile);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-gray-900 transition-colors duration-300 relative">
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-50/50 to-white/50 dark:from-gray-900 dark:to-gray-900/50" />
      </div>

      <div className="relative z-10 container mx-auto px-6 py-24">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-white dark:to-blue-200">
            标准介绍
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            医学影像检查项目名称及编码标准详细说明
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[320px_minmax(0,_1fr)] gap-8">
          <aside className="hidden lg:block sticky top-24 self-start h-[calc(100vh-8rem)] overflow-y-auto scrollbar-hide">
            <LeftNavigation
              content={data}
              onFileSelect={(filename) => setSelectedFile(filename)}
              selectedFile={selectedFile}
            />
          </aside>
          <main className="min-w-0 space-y-8">
            {selectedContent && (
              <ContentArea content={selectedContent} />
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
