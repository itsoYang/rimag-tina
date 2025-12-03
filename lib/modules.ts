import { Module, MessageType } from '@/types/ai';
import {
  FlaskConical,
  ClipboardList,
  FileText,
  FileCheck,
  ShieldCheck,
} from 'lucide-react';

/**
 * 获取本地化的模块配置
 * @param t - i18n 翻译函数
 * @returns 模块配置数组
 */
export const getModules = (t: any): Module[] => [
  {
    type: MessageType.STANDARDIZATION,
    title: t.ai.modules.standardization.title,
    description: t.ai.modules.standardization.description,
    icon: FlaskConical,
    examples: t.ai.modules.standardization.examples,
    inputPlaceholder: t.ai.modules.standardization.inputPlaceholder,
    inputValidation: (input: string) => input.trim().length > 0,
  },
  {
    type: MessageType.RECOMMENDATION,
    title: t.ai.modules.recommendation.title,
    description: t.ai.modules.recommendation.description,
    icon: ClipboardList,
    examples: t.ai.modules.recommendation.examples,
    inputPlaceholder: t.ai.modules.recommendation.inputPlaceholder,
    inputValidation: (input: string) => input.trim().length > 0,
  },
  {
    type: MessageType.REPORT,
    title: t.ai.modules.report.title,
    description: t.ai.modules.report.description,
    icon: FileText,
    examples: t.ai.modules.report.examples,
    inputPlaceholder: t.ai.modules.report.inputPlaceholder,
    inputValidation: (input: string) => input.trim().length > 50,
  },
  {
    type: MessageType.REPORTGEN,
    title: t.ai.modules.reportGen.title,
    description: t.ai.modules.reportGen.description,
    icon: FileCheck,
    examples: t.ai.modules.reportGen.examples,
    inputPlaceholder: t.ai.modules.reportGen.inputPlaceholder,
    inputValidation: (input: string) => input.trim().length > 0,
  },
  {
    type: MessageType.REPORTQUALITY,
    title: t.ai.modules.reportQuality.title,
    description: t.ai.modules.reportQuality.description,
    icon: ShieldCheck,
    examples: t.ai.modules.reportQuality.examples,
    inputPlaceholder: t.ai.modules.reportQuality.inputPlaceholder,
    inputValidation: (input: string) => input.trim().length > 0,
  },
];
