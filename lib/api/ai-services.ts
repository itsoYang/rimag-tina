import { API_ENDPOINTS, APIResponse } from '@/lib/api.config';
import {
  StandardizationRequest,
  StandardizationResponse,
  RecommendationRequest,
  RecommendationResponse,
  MessageTypeValue,
} from '@/types/ai';

// Standardization service
export const standardizationService = {
  async standardize(
    request: StandardizationRequest,
    signal?: AbortSignal
  ): Promise<APIResponse<StandardizationResponse>> {
    try {
      const response = await fetch(API_ENDPOINTS.AI.STANDARDIZATION.CHAT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'algrule',
          messages: [
            {
              role: 'user',
              content: request.input,
            },
          ],
          temperature: 0.3,
          max_tokens: 500,
        }),
        signal,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      const content = data.choices?.[0]?.message?.content;

      if (!content) {
        return {
          success: false,
          error: '响应格式错误：内容为空',
        };
      }

      // Parse response (simplified, you may need to customize based on actual API response)
      return {
        success: true,
        data: {
          items: [{
            standardName: content,
            code: '',
            confidence: 1.0,
          }],
        },
        formattedText: content,
      };
    } catch (error) {
      console.error('Standardization error:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : '标准化处理失败',
      };
    }
  },
};

// Recommendation service
export const recommendationService = {
  async chat(
    messages: any[],
    onUpdate?: (content: string, finish: number) => void
  ): Promise<void> {
    try {
      const sessionId = Math.random().toString(36).substring(7);
      const response = await fetch(API_ENDPOINTS.AI.RECOMMENDATION.RECOMMEND, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          session_id: sessionId,
          patient_id: '',
          doctor_id: '',
          department: '',
          source: '',
          patient_sex: '',
          patient_age: '',
          abstract_history: '',
          clinic_info: messages[0].content,
          diagnose_name: '',
          recommend_count: 3,
        }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log('Recommendation response:', data.data);

      let mainRecommendation = '';
      let alternatives = '';
      let other = '';

      if (data.data.length > 0) {
        mainRecommendation = data.data[0].check_item_name;
      }
      if (data.data.length > 1) {
        alternatives = data.data[1].check_item_name;
      }
      if (data.data.length > 2) {
        other = data.data[2].check_item_name;
      }

      const result = {
        mainRecommendation,
        mainReason: '',
        mainCautions: '',
        alternatives,
        alterReason: '',
        alterCautions: '',
        other,
        otherReason: '',
        otherCautions: '',
      };

      const content = JSON.stringify(result);
      onUpdate?.(content, 0);

      // Get recommendation reasons (streaming)
      const reasonResponse = await fetch(API_ENDPOINTS.AI.RECOMMENDATION.REASON, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          session_id: sessionId,
          checkitems: data.data,
        }),
      });

      if (reasonResponse.ok && reasonResponse.body) {
        const reader = reasonResponse.body.getReader();
        const decoder = new TextDecoder();

        let mainReason = '';
        let alterReason = '';
        let otherReason = '';
        let mainCautions = '';
        let alterCautions = '';
        let otherCautions = '';

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          const chunks = decoder.decode(value, { stream: true }).split('\n');
          for (let chunk of chunks) {
            if (chunk.startsWith('data:')) {
              chunk = chunk.slice(5);
            } else {
              continue;
            }

            try {
              const chunkJs = JSON.parse(chunk);
              const checkitem = chunkJs.data.check_item_name;
              const reason = chunkJs.data.reason;
              const caution = chunkJs.data.cautions;

              if (checkitem === mainRecommendation) {
                mainReason += reason;
                mainCautions += caution;
              } else if (checkitem === alternatives) {
                alterReason += reason;
                alterCautions += caution;
              } else if (checkitem === other) {
                otherReason += reason;
                otherCautions += caution;
              }

              const updatedContent = JSON.stringify({
                mainRecommendation,
                mainReason,
                mainCautions,
                alternatives,
                alterReason,
                alterCautions,
                other,
                otherReason,
                otherCautions,
              });

              onUpdate?.(updatedContent, chunkJs.finish);
            } catch (e) {
              console.error('Error parsing SSE data:', e);
            }
          }
        }
      }
    } catch (error) {
      console.error('Error in recommendation chat:', error);
      throw error;
    }
  },
};

// Report interpretation service
export const reportService = {
  async chat(
    messages: any[],
    onUpdate?: (content: string) => void
  ): Promise<void> {
    try {
      const response = await fetch(API_ENDPOINTS.AI.REPORT.INTERPRET, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'algreport',
          messages: messages,
          stream: true,
        }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      let content = '';
      console.log('开始读取报告解读响应', reader);

      if (reader) {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          try {
            const raw_chunk = decoder.decode(value, { stream: true });
            const chunks = raw_chunk.split('\n');
            chunks.filter(chunk => chunk.trim().length > 0).forEach(chunk => {
              try {
                const chunk_js = JSON.parse(chunk);
                content = chunk_js.text;
                onUpdate?.(content);
              } catch (e) {
                console.error(`Error parsing SSE data: ${e}`);
              }
            });
          } catch (e) {
            console.error('Error decode SSE data:', e);
          }
        }
      }
    } catch (error) {
      console.error('Error in report chat:', error);
      throw error;
    }
  },
};

// Report generation service
export const reportGenService = {
  async chat(
    messages: any[],
    chatId: string,
    onUpdate?: (content: string) => void
  ): Promise<void> {
    try {
      const response = await fetch(API_ENDPOINTS.AI.REPORT_GEN.GENERATE, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'algreportgen',
          messages: messages,
          chatId,
          stream: true,
        }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      let content = '';
      console.log('开始读取报告生成响应', reader);

      if (reader) {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          const chunk = decoder.decode(value, { stream: true });
          try {
            const chunk_js = JSON.parse(chunk);
            content = chunk_js.text;
            onUpdate?.(content);
            if (chunk_js.finish) {
              break;
            }
          } catch (e) {
            console.error('Error parsing SSE data:', e, chunk);
          }
        }
      }
    } catch (error) {
      console.error('Error in report gen chat:', error);
      throw error;
    }
  },
};

// Report quality control service
export const reportQualityService = {
  async chat(
    messages: any[],
    chatId: string,
    onUpdate?: (content: string, finish?: number) => void
  ): Promise<void> {
    try {
      const response = await fetch(API_ENDPOINTS.AI.REPORT_QUALITY.CHECK, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          session_id: chatId,
          doctor_id: '',
          checkitem: '',
          modality: '',
          finding: messages[0].content,
          impression: '\n\n',
        }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      let content = '';
      console.log('开始读取报告质控响应', reader);

      if (reader) {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          let chunks = decoder.decode(value, { stream: true }).split('\n');
          chunks.forEach(chunk => {
            try {
              if (chunk.startsWith('data:')) {
                chunk = chunk.slice(5);
                const chunk_js = JSON.parse(chunk);
                if (chunk_js.finish === 0) {
                  content = content + chunk_js.data.content;
                }
                onUpdate?.(content, chunk_js.finish);
              }
            } catch (e) {
              console.error('Error parsing SSE data:', e, chunk);
            }
          });
        }
      }

      // Fetch critical value
      const criticalUrl = `${API_ENDPOINTS.AI.REPORT_QUALITY.CHECK.replace('quality-check', 'critical')}`;
      fetch(criticalUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          session_id: chatId,
          doctor_id: '',
          checkitem: '',
          modality: '',
          finding: messages[0].content,
          impression: '\n\n',
        }),
      })
        .then(response => {
          if (!response.ok) {
            throw new Error('critical response was not ok');
          }
          return response.json();
        })
        .then(data => {
          console.log('critical response:', data);
          const critical_value = data.data.critical_value;
          content = content + '\n\n【报告危急值】\n\n' + critical_value;
          onUpdate?.(content);
        })
        .catch(error => {
          console.error('Error in critical check:', error);
        });
    } catch (error) {
      console.error('Error in report quality chat:', error);
      throw error;
    }
  },
};

// Knowledge Q&A service
export const knowledgeService = {
  async chat(
    messages: any[],
    onUpdate?: (content: string) => void
  ): Promise<void> {
    try {
      const response = await fetch(API_ENDPOINTS.AI.KNOWLEDGE.QUERY, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'algmedqa',
          messages: messages,
          temperature: 0.3,
          max_tokens: 500,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      const content = data.choices?.[0]?.message?.content;

      if (!content) {
        throw new Error('响应格式错误：内容为空');
      }

      onUpdate?.(content);
    } catch (error) {
      console.error('Error in knowledge chat:', error);
      throw error;
    }
  },
};
