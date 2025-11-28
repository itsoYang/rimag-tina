'use client';

import React from 'react';
import {
  MedicalImagingHeroSection,
  StandardGoalsSection,
  StandardPrinciplesSection,
  StandardBuildGoalsSection,
  CoreContentSection,
  ProcessSection,
  ImplementationSection
} from '@/components/standards/sections';
import BackToTop from '@/components/common/BackToTop';
import PageNavigation from '@/components/standards/PageNavigation';

export default function Overview() {
  return (
    <div className="min-h-screen">
      {/* Hero区域 - 深色背景 */}
      <div className="w-full">
        <MedicalImagingHeroSection />
      </div>

      {/* 标准建设意义 - 浅色背景 */}
      <div id="goals" className="w-full bg-white dark:bg-gray-800/90">
        <StandardGoalsSection />
      </div>

      {/* 标准建设目标 - 灰色背景 */}
      <div id="buildGoals" className="w-full bg-gray-50 dark:bg-gray-900/95">
        <StandardBuildGoalsSection />
      </div>

      {/* 标准建设原则 - 白色背景 */}
      <div id="principles" className="w-full bg-white dark:bg-gray-800/85">
        <StandardPrinciplesSection />
      </div>

      {/* 标准制定过程 - 灰色背景 */}
      <div id="process" className="w-full bg-gray-50 dark:bg-gray-900/90">
        <ProcessSection />
      </div>

      {/* 标准体系 - 白色背景 */}
      <div id="system" className="w-full bg-white dark:bg-gray-800/80">
        <CoreContentSection />
      </div>

      {/* 标准实施 - 灰色背景 */}
      <div id="implementation" className="w-full bg-gray-50 dark:bg-gray-900/75">
        <ImplementationSection />
      </div>

      {/* 页面导航 */}
      <PageNavigation />

      {/* 返回顶部按钮 */}
      <BackToTop />
    </div>
  );
}
