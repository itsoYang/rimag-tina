import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            医学影像检查项目名称及编码标准
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            推动医学影像行业标准化、规范化发展，提供权威的标准查询、AI 智能辅助和行业资讯服务
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/standards"
              className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors text-lg font-medium"
            >
              标准查询
            </Link>
            <Link
              href="/ai-platform"
              className="bg-white text-blue-600 border-2 border-blue-600 px-8 py-3 rounded-lg hover:bg-blue-50 transition-colors text-lg font-medium"
            >
              AI 平台
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
          核心功能
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          <FeatureCard
            title="标准查询"
            description="快速查询医学影像检查项目标准，支持按名称、编码及模态进行精准检索"
            href="/standards"
          />
          <FeatureCard
            title="AI 智能平台"
            description="6 大 AI 功能模块，包括项目标准化、检查推荐、报告生成等智能服务"
            href="/ai-platform"
          />
          <FeatureCard
            title="行业资讯"
            description="及时了解行业动态、标准更新和技术发展趋势"
            href="/news"
          />
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">
            加入标准化进程
          </h2>
          <p className="text-xl mb-8 opacity-90">
            共同推动医学影像行业的标准化、数字化与智能化发展
          </p>
          <Link
            href="/about"
            className="bg-white text-blue-600 px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors text-lg font-medium inline-block"
          >
            了解更多
          </Link>
        </div>
      </section>
    </div>
  );
}

function FeatureCard({
  title,
  description,
  href,
}: {
  title: string;
  description: string;
  href: string;
}) {
  return (
    <Link href={href} className="block">
      <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow h-full">
        <h3 className="text-xl font-bold text-gray-900 mb-3">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </div>
    </Link>
  );
}
