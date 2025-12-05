/**
 * API Configuration File
 * Unified management for all backend services
 */

// ============================================
// Environment Variables Configuration
// ============================================
export const ENV = {
  // Backend API Base URL
  API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL || '/api',
} as const;

// ============================================
// Backend API Endpoint Configuration
// ============================================
export const API_ENDPOINTS = {
  // Standards Query Related
  STANDARDS: {
    LIST: `${ENV.API_BASE_URL}/bzh_api/standards`,
    FILTERS: (modality?: string) =>
      `${ENV.API_BASE_URL}/bzh_api/standards/filters${modality ? `?modality=${modality}` : ''}`,
    POPOVER_INFO: `${ENV.API_BASE_URL}/aiplatform/checkitem/get_popover_info`,
  },

  // AI Platform Module Endpoints
  AI: {
    // Project Name Standardization
    STANDARDIZATION: {
      CHAT: `${ENV.API_BASE_URL}/aiplatform/checkitem/chat_for_checkitem_match`,
    },

    // Examination Recommendation
    RECOMMENDATION: {
      RECOMMEND: `${ENV.API_BASE_URL}/rimagai/checkitem/recommend_item`,
      REASON: `${ENV.API_BASE_URL}/rimagai/checkitem/recommend_reason`,
    },

    // Report Interpretation
    REPORT: {
      INTERPRET: `${ENV.API_BASE_URL}/aiplatform/report/chat_for_report_analysis`,
    },

    // Report Generation
    REPORT_GEN: {
      GENERATE: `${ENV.API_BASE_URL}/aiplatform/report/chat_for_report_gen`,
    },

    // Report Quality Control
    REPORT_QUALITY: {
      CHECK: `${ENV.API_BASE_URL}/rimagai/report/quality_control`,
      CRITICAL: `${ENV.API_BASE_URL}/rimagai/report/critical`,
    },

    // Knowledge Q&A
    KNOWLEDGE: {
      QUERY: `${ENV.API_BASE_URL}/aiplatform/knowledge/chat_for_medqa`,
    },
  },
} as const;

// ============================================
// API Request Configuration
// ============================================
export const API_REQUEST_CONFIG = {
  // Request timeout (milliseconds)
  TIMEOUT: 30000,

  // Retry times
  RETRY_TIMES: 3,

  // Retry delay (milliseconds)
  RETRY_DELAY: 1000,

  // Request headers
  HEADERS: {
    'Content-Type': 'application/json',
  },
} as const;

// ============================================
// API Response Interface
// ============================================
export interface APIResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// ============================================
// API Error Class
// ============================================
export class APIError extends Error {
  constructor(
    message: string,
    public statusCode?: number,
    public response?: any
  ) {
    super(message);
    this.name = 'APIError';
  }
}
