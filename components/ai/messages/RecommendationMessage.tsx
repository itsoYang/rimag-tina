'use client';

import React from 'react';
import BaseMessage from './BaseMessage';
import { MessageType, type RecommendationContent, type BaseMessageProps } from '@/types/ai';
import {
  CheckCircle,
  AlertTriangle,
  ArrowRight,
  TrendingUp,
  Settings,
} from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface RecommendationMessageProps extends BaseMessageProps {
  parsedContent?: RecommendationContent | string;
}

const RecommendationMessage: React.FC<RecommendationMessageProps> = (props) => {
  const { content, parsedContent, ...baseProps } = props;
  const { t } = useLanguage();

  // If it's a user message, use base message component
  if (props.role === 'user') {
    return <BaseMessage {...props} />;
  }

  // Parse content
  const parseContent = (text: string | RecommendationContent): RecommendationContent | null => {
    try {
      if (!text) return null;

      if (typeof text === 'object') {
        return text;
      }

      const data = JSON.parse(text as string);
      return {
        mainRecommendation: data.mainRecommendation || '',
        mainReason: data.mainReason || '',
        mainCautions: data.mainCautions || '',
        alternatives: data.alternatives || '',
        alterReason: data.alterReason || '',
        alterCautions: data.alterCautions || '',
        other: data.other || '',
        otherReason: data.otherReason || '',
        otherCautions: data.otherCautions || '',
      };
    } catch (error) {
      console.error('Failed to parse recommendation content:', error);
      return null;
    }
  };

  const recommendation = parseContent(parsedContent || (content as string));

  if (!recommendation) {
    return (
      <BaseMessage {...baseProps} content={content} messageType={MessageType.RECOMMENDATION} />
    );
  }

  return (
    <BaseMessage {...baseProps} content="" messageType={MessageType.RECOMMENDATION}>
      <div className="space-y-4">
        {/* Main recommendation */}
        {recommendation.mainRecommendation && (
          <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
            <div className="flex items-start gap-3">
              <CheckCircle className="w-6 h-6 text-blue-600 dark:text-blue-400 flex-shrink-0" />
              <div>
                <div className="font-medium text-blue-900 dark:text-blue-100">
                  {t.ai.recommendation.mainTitle}
                </div>
                <div className="mt-1 text-blue-800 dark:text-blue-200">
                  {recommendation.mainRecommendation}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Main reason */}
        {recommendation.mainReason && (
          <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-lg">
            <div className="flex items-start gap-3">
              <ArrowRight className="w-6 h-6 text-gray-600 dark:text-gray-400 flex-shrink-0" />
              <div>
                <div className="font-medium text-gray-900 dark:text-gray-100">
                  {t.ai.recommendation.reason}
                </div>
                <div className="mt-1 text-gray-700 dark:text-gray-300">
                  {recommendation.mainReason}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Main cautions */}
        {recommendation.mainCautions && (
          <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-6 h-6 text-red-600 dark:text-red-400 flex-shrink-0" />
              <div>
                <div className="font-medium text-red-900 dark:text-red-100">
                  {t.ai.recommendation.cautions}
                </div>
                <div className="mt-2 space-y-2">
                  <span className="text-red-800 dark:text-red-200">
                    {recommendation.mainCautions}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Alternatives */}
        {recommendation.alternatives && (
          <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg">
            <div className="flex items-start gap-3">
              <TrendingUp className="w-6 h-6 text-yellow-600 dark:text-yellow-400 flex-shrink-0" />
              <div>
                <div className="font-medium text-yellow-900 dark:text-yellow-100">
                  {t.ai.recommendation.alternatives}
                </div>
                <div className="mt-1 text-yellow-800 dark:text-yellow-200">
                  {recommendation.alternatives}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Alternative reason */}
        {recommendation.alterReason && (
          <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-lg">
            <div className="flex items-start gap-3">
              <ArrowRight className="w-6 h-6 text-gray-600 dark:text-gray-400 flex-shrink-0" />
              <div>
                <div className="font-medium text-gray-900 dark:text-gray-100">
                  {t.ai.recommendation.reason}
                </div>
                <div className="mt-1 text-gray-700 dark:text-gray-300">
                  {recommendation.alterReason}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Alternative cautions */}
        {recommendation.alterCautions && (
          <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-6 h-6 text-red-600 dark:text-red-400 flex-shrink-0" />
              <div>
                <div className="font-medium text-red-900 dark:text-red-100">
                  {t.ai.recommendation.cautions}
                </div>
                <div className="mt-2 space-y-2">
                  <span className="text-red-800 dark:text-red-200">
                    {recommendation.alterCautions}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Other options */}
        {recommendation.other && (
          <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg">
            <div className="flex items-start gap-3">
              <Settings className="w-6 h-6 text-yellow-600 dark:text-yellow-400 flex-shrink-0" />
              <div>
                <div className="font-medium text-yellow-900 dark:text-yellow-100">
                  {t.ai.recommendation.other}
                </div>
                <div className="mt-1 text-yellow-800 dark:text-yellow-200">
                  {recommendation.other}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Other reason */}
        {recommendation.otherReason && (
          <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-lg">
            <div className="flex items-start gap-3">
              <ArrowRight className="w-6 h-6 text-gray-600 dark:text-gray-400 flex-shrink-0" />
              <div>
                <div className="font-medium text-gray-900 dark:text-gray-100">
                  {t.ai.recommendation.reason}
                </div>
                <div className="mt-1 text-gray-700 dark:text-gray-300">
                  {recommendation.otherReason}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Other cautions */}
        {recommendation.otherCautions && (
          <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-6 h-6 text-red-600 dark:text-red-400 flex-shrink-0" />
              <div>
                <div className="font-medium text-red-900 dark:text-red-100">
                  {t.ai.recommendation.cautions}
                </div>
                <div className="mt-2 space-y-2">
                  <span className="text-red-800 dark:text-red-200">
                    {recommendation.otherCautions}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </BaseMessage>
  );
};

export default RecommendationMessage;
