'use client';

import React, { useEffect, useState } from 'react';
import { Download, Monitor, Apple, Zap, Shield, RefreshCw, Cpu } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

// OBS 下载地址配置
const OBS_BASE_URL = 'https://bzh-assistant-client.obs.cn-east-3.myhuaweicloud.com/releases';

// 版本信息
const VERSION = '1.0.0';
const RELEASE_DATE = '2026-01-20';

interface DownloadItem {
  platform: 'windows' | 'mac-intel' | 'mac-arm';
  title: string;
  description: string;
  filename: string;
  icon: React.ReactNode;
}

export default function DownloadPage() {
  const { t } = useLanguage();
  const [detectedPlatform, setDetectedPlatform] = useState<string>('');

  useEffect(() => {
    const userAgent = navigator.userAgent.toLowerCase();
    if (userAgent.includes('win')) {
      setDetectedPlatform('windows');
    } else if (userAgent.includes('mac')) {
      setDetectedPlatform('mac');
    }
  }, []);

  const downloads: DownloadItem[] = [
    {
      platform: 'windows',
      title: t.download.windows.title,
      description: t.download.windows.description,
      filename: `rimag-assistant-${VERSION}-setup.exe`,
      icon: <Monitor className="w-8 h-8" />
    },
    {
      platform: 'mac-arm',
      title: `${t.download.mac.title} (${t.download.mac.apple})`,
      description: t.download.mac.description,
      filename: `rimag-assistant-${VERSION}-arm64-mac.zip`,
      icon: <Apple className="w-8 h-8" />
    },
    {
      platform: 'mac-intel',
      title: `${t.download.mac.title} (${t.download.mac.intel})`,
      description: t.download.mac.description,
      filename: `rimag-assistant-${VERSION}.dmg`,
      icon: <Apple className="w-8 h-8" />
    }
  ];

  const features = [
    { icon: <Zap className="w-4 h-4" />, text: t.download.tags.fast },
    { icon: <Cpu className="w-4 h-4" />, text: t.download.tags.ocr },
    { icon: <RefreshCw className="w-4 h-4" />, text: t.download.tags.autoUpdate },
    { icon: <Shield className="w-4 h-4" />, text: t.download.tags.secure }
  ];

  const isRecommended = (platform: string) => {
    if (detectedPlatform === 'windows' && platform === 'windows') return true;
    if (detectedPlatform === 'mac' && platform === 'mac-arm') return true;
    return false;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <div className="pt-20 pb-10 text-center">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          {t.download.title}
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          {t.download.subtitle}
        </p>
        <div className="mt-3 text-sm text-gray-500 dark:text-gray-400">
          {t.download.version} {VERSION} · {RELEASE_DATE}
        </div>
      </div>

      {/* Download Cards */}
      <div className="max-w-4xl mx-auto px-4">
        <div className="grid gap-6 md:grid-cols-3">
          {downloads.map((item) => (
            <div
              key={item.platform}
              className={`relative bg-white dark:bg-gray-800 rounded-2xl shadow-lg border-2 transition-all hover:shadow-xl hover:-translate-y-1 ${
                isRecommended(item.platform)
                  ? 'border-blue-500 dark:border-blue-400'
                  : 'border-gray-200 dark:border-gray-700'
              }`}
            >
              {isRecommended(item.platform) && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="bg-blue-500 text-white text-xs font-medium px-3 py-1 rounded-full">
                    {t.download.recommended}
                  </span>
                </div>
              )}
              
              <div className="p-6 text-center">
                <div className="inline-flex items-center justify-center w-14 h-14 bg-gray-100 dark:bg-gray-700 rounded-full mb-4 text-gray-700 dark:text-gray-300">
                  {item.icon}
                </div>
                
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                  {item.title}
                </h3>
                
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-5">
                  {item.description}
                </p>
                
                <a
                  href={`${OBS_BASE_URL}/${item.filename}`}
                  className="inline-flex items-center justify-center w-full px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
                >
                  <Download className="w-4 h-4 mr-2" />
                  {t.download.download}
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Feature Tags */}
        <div className="mt-12 mb-16 flex flex-wrap justify-center gap-4">
          {features.map((feature, index) => (
            <div
              key={index}
              className="inline-flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 rounded-full shadow-sm border border-gray-200 dark:border-gray-700 text-sm text-gray-600 dark:text-gray-300"
            >
              <span className="text-blue-500">{feature.icon}</span>
              {feature.text}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
