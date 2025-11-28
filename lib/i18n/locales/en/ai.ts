export default {
  // Page header
  header: {
    title: 'Medical Imaging AI Assistant',
    subtitle: 'Providing standardization, recommendation, report interpretation, and professional Q&A services for medical imaging',
  },

  // Module titles and descriptions
  modules: {
    standardization: {
      title: 'Project Name Standardization',
      description: 'Enter medical imaging examination project names to get standardized names and codes',
      inputPlaceholder: 'Enter project name...',
      examples: [
        'CT (Kidneys + Ureters + Bladder) Plain Scan',
        'Chest and Mediastinum Spiral CT Plain Scan',
        'Brain MRI Plain Scan + DWI + MRA_Cervical MRI Plain Scan_Femoral Head MRI Plain Scan',
      ],
    },
    recommendation: {
      title: 'Examination Recommendation',
      description: 'Enter clinical symptoms or diagnosis to recommend appropriate imaging examinations',
      inputPlaceholder: 'Enter clinical manifestations...',
      examples: [
        'Patient with headache and nausea for 3 days',
        '27-year-old pregnant woman at 24 weeks, sudden chest pain and dyspnea, elevated D-dimer, suspected pulmonary embolism.',
      ],
    },
    report: {
      title: 'Report Interpretation',
      description: 'Interpret medical imaging examination report content',
      inputPlaceholder: 'Enter report content...',
      examples: [
        'Male: 82 years old, Examination: Brain CT Plain Scan...',
      ],
    },
    reportGen: {
      title: 'Report Generation',
      description: 'Generate reports based on diagnosis',
      inputPlaceholder: 'Enter diagnosis information...',
      examples: [
        'CT Lacunar Infarction',
        'MR Nasal Polyp',
      ],
    },
    reportQuality: {
      title: 'Report Quality Control',
      description: 'Check report findings and diagnosis',
      inputPlaceholder: 'Enter report content...',
      examples: [
        'Imaging findings: Clear lung markings, cord-like shadow visible in right middle lobe...',
      ],
    },
  },

  // Chat interface
  chat: {
    selectModule: 'Select Function Module',
    examples: 'Examples:',
    generating: 'Generating response',
    cancel: 'Cancel generation',
    sendButton: 'Send',
    inputHint: 'Press Enter to send, Shift + Enter for new line',
    clearChat: 'Clear chat',
    charCount: 'chars',
  },

  // Message components
  messages: {
    user: 'You',
    assistant: {
      standardization: 'Standardization AI Assistant',
      recommendation: 'Recommendation AI Assistant',
      report: 'Report Interpretation AI Assistant',
      reportGen: 'Report Generation AI Assistant',
      reportQuality: 'Report Quality AI Assistant',
      default: 'AI Assistant',
    },
    round: 'Round {round}',
    sendFailed: 'Message sending failed, please try again',
    processing: 'Processing your request...',
  },

  // Standardization message
  standardization: {
    result: 'Standardization Result',
    standardName: 'Standard Name',
    code: 'Standard Code',
    confidence: 'Confidence',
    copyResult: 'Copy Result',
    copied: 'Copied',
    notFound: 'No standardization result found',
  },

  // Recommendation message
  recommendation: {
    mainTitle: 'Examination Recommendation',
    reason: 'Reason',
    cautions: 'Precautions',
    alternatives: 'Alternatives',
    other: 'Other Options',
  },

  // Error messages
  errors: {
    emptyInput: 'Please enter content',
    sendFailed: 'Failed to send message',
    networkError: 'Network error, please check connection',
    serverError: 'Server error, please try again later',
    unknownError: 'Unknown error',
  },

  // Footer
  footer: {
    copyright: '{year} Medical Imaging AI Assistant. All rights reserved.',
  },
};
