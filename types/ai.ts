import { ReactNode } from 'react';

// ============================================
// Message Types
// ============================================

// Base message properties
export interface BaseMessageProps {
  role: 'user' | 'assistant';
  content: string | string[];
  timestamp?: number;
  status?: 'sending' | 'success' | 'error';
}

// Standardization message content
export interface StandardizationContent {
  items?: StandardizationItem[];
}

export interface StandardizationItem {
  standardName: string;
  code: string;
  confidence: number;
}

// Recommendation message content
export interface RecommendationContent {
  mainRecommendation: string;
  mainReason: string;
  mainCautions: string;
  alternatives: string;
  alterReason: string;
  alterCautions: string;
  other: string;
  otherReason: string;
  otherCautions: string;
}

// Report content (generic for report analysis, generation, and quality)
export interface ReportContent {
  findings?: Array<{
    key: string;
    explanation: string;
  }>;
  diagnosis?: Array<{
    condition: string;
    details: string;
  }>;
  explanation?: string;
  suggestions?: string[];
}

// Knowledge Q&A content
export interface QAContent {
  answer: string;
  references?: Array<{
    title: string;
    link?: string;
  }>;
}

// Message type literals
export type MessageTypeValue =
  | 'standardization'
  | 'recommendation'
  | 'report'
  | 'reportgen'
  | 'report_quality'
  | 'questions';

// Message type constants
export const MessageType = {
  STANDARDIZATION: 'standardization' as MessageTypeValue,
  RECOMMENDATION: 'recommendation' as MessageTypeValue,
  REPORT: 'report' as MessageTypeValue,
  REPORTGEN: 'reportgen' as MessageTypeValue,
  REPORTQUALITY: 'report_quality' as MessageTypeValue,
  QUESTIONS: 'questions' as MessageTypeValue,
} as const;

export type MessageTypeKey = keyof typeof MessageType;

// ============================================
// Message Data Structure
// ============================================

export interface Message {
  id: string;
  type: MessageTypeValue;
  role: 'user' | 'assistant';
  content: string | string[];
  timestamp: number;
  status: 'sending' | 'success' | 'error';
  parsedContent?: any;
}

// ============================================
// Chat State
// ============================================

export interface ChatState {
  messages: Message[];
  chatId: string;
  currentModule: MessageTypeValue;
  isGenerating: boolean;
  error?: string;
}

// ============================================
// Module Configuration
// ============================================

export interface Module {
  type: MessageTypeValue;
  title: string;
  description: string;
  icon: any; // Lucide icon component
  examples: string[];
  inputPlaceholder: string;
  inputValidation?: (input: string) => boolean;
}

// ============================================
// API Related Types
// ============================================

export interface APIResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  formattedText?: string;
}

export interface StandardizationRequest {
  input: string;
  options?: {
    fuzzyMatch?: boolean;
    maxAlternatives?: number;
    minConfidence?: number;
  };
}

export interface StandardizationResponse {
  items: StandardizationItem[];
}

export interface RecommendationRequest {
  description: string;
  options?: {
    maxRecommendations?: number;
    considerFactors?: string[];
    minConfidence?: number;
  };
}

export interface RecommendationResponse {
  content: string;
}

// ============================================
// Helper Functions
// ============================================

// Generate unique message ID
export const generateMessageId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

// Create new message
export const createMessage = (
  type: MessageTypeValue,
  role: Message['role'],
  content: string | string[],
  parsedContent?: any
): Message => {
  return {
    id: generateMessageId(),
    type,
    role,
    content,
    timestamp: Date.now(),
    status: 'sending',
    parsedContent,
  };
};

// Update message status
export const updateMessageStatus = (
  messages: Message[],
  messageId: string,
  status: Message['status'],
  parsedContent?: any
): Message[] => {
  return messages.map((message) =>
    message.id === messageId
      ? { ...message, status, parsedContent: parsedContent ?? message.parsedContent }
      : message
  );
};
