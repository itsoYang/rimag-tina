// API 统一配置文件

// 环境变量
export const ENV = {
  // 后端 API 基础 URL
  API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL || 'https://bzh.rimagcloud.com',
};

// API 端点配置
export const API_ENDPOINTS = {
  // 标准查询模块
  STANDARDS: {
    LIST: `${ENV.API_BASE_URL}/bzh_api/standards`,
    FILTERS: (modality?: string) =>
      `${ENV.API_BASE_URL}/bzh_api/standards/filters${modality ? `?modality=${modality}` : ''}`,
  },

  // AI 平台模块
  AI: {
    // 项目名称标准化
    STANDARDIZATION: {
      CHAT: `${ENV.API_BASE_URL}/aiplatform/checkitem/chat_for_checkitem_match`,
    },

    // 检查项目推荐
    RECOMMENDATION: {
      RECOMMEND: `${ENV.API_BASE_URL}/rimagai/checkitem/recommend_item`,
      REASON: `${ENV.API_BASE_URL}/rimagai/checkitem/recommend_reason`,
    },

    // 报告解读
    REPORT: {
      INTERPRET: `${ENV.API_BASE_URL}/report/interpret`,
    },

    // 报告生成
    REPORT_GEN: {
      GENERATE: `${ENV.API_BASE_URL}/report/generate`,
    },

    // 报告质控
    REPORT_QUALITY: {
      CHECK: `${ENV.API_BASE_URL}/report/quality-check`,
    },

    // 知识问答
    KNOWLEDGE: {
      QUERY: `${ENV.API_BASE_URL}/knowledge/query`,
    },
  },
};

// API 请求配置
export const API_REQUEST_CONFIG = {
  timeout: 30000, // 30秒超时
  headers: {
    'Content-Type': 'application/json',
  },
};
