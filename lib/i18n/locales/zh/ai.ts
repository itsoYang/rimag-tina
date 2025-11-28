export default {
  // Page header
  header: {
    title: '医学影像 AI 助手',
    subtitle: '为您提供医学影像项目标准化、检查建议生成、报告解读和专业知识问答服务',
  },

  // Module titles and descriptions
  modules: {
    standardization: {
      title: '项目名称标准化',
      description: '输入医学影像检查项目名称，获取标准化名称和编码',
      inputPlaceholder: '请输入项目名称...',
      examples: [
        'CT(双肾+输尿管+膀胱)平扫',
        '肺部、纵隔螺旋CT平扫',
        '颅脑磁共振平扫+DWI+MRA_颈椎磁共振平扫_股骨头磁共振平扫',
      ],
    },
    recommendation: {
      title: '检查项目推荐',
      description: '输入临床症状或临床诊断，推荐合适的影像检查项目',
      inputPlaceholder: '请输入临床表现...',
      examples: [
        '患者头痛，恶心3天',
        '27岁妊娠24周孕妇，突发胸痛和呼吸困难，D-二聚体升高，怀疑肺栓塞。',
      ],
    },
    report: {
      title: '报告解读',
      description: '解读医学影像检查报告内容',
      inputPlaceholder: '请输入报告内容...',
      examples: [
        '男：82岁，检查项目：头颅CT平扫...',
      ],
    },
    reportGen: {
      title: '报告生成',
      description: '根据诊断，生成报告',
      inputPlaceholder: '请输入诊断信息...',
      examples: [
        'CT 腔梗',
        'MR 鼻息肉',
      ],
    },
    reportQuality: {
      title: '报告质控',
      description: '检查报告所见及诊断',
      inputPlaceholder: '请输入报告内容...',
      examples: [
        '影像所见：双肺纹理清晰，右肺中叶可见条索影...',
      ],
    },
  },

  // Chat interface
  chat: {
    selectModule: '选择功能模块',
    examples: '示例：',
    generating: '正在生成回复',
    cancel: '取消生成',
    sendButton: '发送',
    inputHint: '按 Enter 发送，Shift + Enter 换行',
    clearChat: '清空对话',
    charCount: '字',
  },

  // Message components
  messages: {
    user: '您',
    assistant: {
      standardization: '标准化AI助手',
      recommendation: '推荐AI助手',
      report: '报告解读AI助手',
      reportGen: '报告生成AI助手',
      reportQuality: '报告质控AI助手',
      default: 'AI助手',
    },
    round: '第{round}轮',
    sendFailed: '消息发送失败，请重试',
    processing: '正在处理您的请求...',
  },

  // Standardization message
  standardization: {
    result: '标准化结果',
    standardName: '标准名称',
    code: '标准编码',
    confidence: '匹配度',
    copyResult: '复制结果',
    copied: '已复制',
    notFound: '未找到标准化结果',
  },

  // Recommendation message
  recommendation: {
    mainTitle: '检查项目推荐',
    reason: '推荐理由',
    cautions: '注意事项',
    alternatives: '替代方案',
    other: '其他方案',
  },

  // Error messages
  errors: {
    emptyInput: '请输入内容',
    sendFailed: '发送消息失败',
    networkError: '网络错误，请检查连接',
    serverError: '服务器错误，请稍后重试',
    unknownError: '未知错误',
  },

  // Footer
  footer: {
    copyright: '{year} 医学影像 AI 助手. All rights reserved.',
  },
};
