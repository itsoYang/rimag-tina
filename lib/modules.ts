import { Module, MessageType } from '@/types/ai';
import {
  FlaskConical,
  ClipboardList,
  FileText,
  FileCheck,
  ShieldCheck,
} from 'lucide-react';

export const MODULES: Module[] = [
  {
    type: MessageType.STANDARDIZATION,
    title: '项目名称标准化',
    description: '输入医学影像检查项目名称，获取标准化名称和编码',
    icon: FlaskConical,
    examples: [
      'CT(双肾+输尿管+膀胱)平扫',
      '肺部、纵隔螺旋CT平扫',
      '颅脑磁共振平扫+DWI+MRA_颈椎磁共振平扫_股骨头磁共振平扫',
    ],
    inputPlaceholder: '请输入项目名称...',
    inputValidation: (input: string) => input.trim().length > 0,
  },
  {
    type: MessageType.RECOMMENDATION,
    title: '检查项目推荐',
    description: '输入临床症状或临床诊断，推荐合适的影像检查项目',
    icon: ClipboardList,
    examples: ['患者头痛，恶心3天', '27岁妊娠24周孕妇，突发胸痛和呼吸困难，D-二聚体升高，怀疑肺栓塞。'],
    inputPlaceholder: '请输入临床表现...',
    inputValidation: (input: string) => input.trim().length > 0,
  },
  {
    type: MessageType.REPORT,
    title: '报告解读',
    description: '解读医学影像检查报告内容',
    icon: FileText,
    examples: [
      `男：82岁，检查项目：头颅CT平扫，
主诉：反复咳嗽、咳痰5年，加重伴痰中带血2月余。肋间隙增宽，语颤减弱，叩诊过清音，双肺呼吸音减弱，双侧肺可闻及少量湿啰音；
病史：1.慢性阻塞性肺病急性加重期 2.肺占位性病变 3.高血压 4.脑梗死个人史；
影像所见：
      桥脑左侧及左侧丘脑见斑片状低密度影，双侧脑室前后角旁见对称性分布的稍低密度影，余脑实质内未见明显异常密度灶，诸脑裂、脑沟无增宽。脑室系统无明显扩大，中线结构居中。小脑、脑干未见明显异常。颅骨结构未见明显异常。
      两侧胸廓对称，纵隔气管居中。左肺上叶见片状致密高密度影，支气管可见明显阻塞，余双肺野清晰，肺纹理规整，未见异常组织密度影及占位性病变。左肺门影增大。纵隔结构清楚，未见占位病变，气管旁、隆突前下、血管前及腔静脉后未见肿大淋巴结。双侧胸膜无增厚，左侧胸腔内见液体影。
影像诊断：
1、桥脑左侧及左侧丘脑软化灶；
2、双侧脑室前后角旁脱髓鞘改变；3、考虑为左肺中央型肺癌伴左上肺实变；
4、左侧胸腔积液；
5、建议必要时随访或增强扫描。`,
    ],
    inputPlaceholder: '请输入报告内容...',
    inputValidation: (input: string) => input.trim().length > 50,
  },
  {
    type: MessageType.REPORTGEN,
    title: '报告生成',
    description: '根据诊断，生成报告',
    icon: FileCheck,
    examples: ['CT 腔梗', 'MR 鼻息肉'],
    inputPlaceholder: '请输入诊断信息...',
    inputValidation: (input: string) => input.trim().length > 0,
  },
  {
    type: MessageType.REPORTQUALITY,
    title: '报告质控',
    description: '检查报告所见及诊断',
    icon: ShieldCheck,
    examples: [
      `影像所见：双肺纹理清晰，右肺中叶可见条索影，左肺舌段可见条片影。气管及主要支气管通畅。双侧肺门及纵隔未见增大淋巴结。心脏和大血管结构未见异常。左侧胸腔少量积液，左侧胸膜增厚钙化。
      影像诊断：
      1.左肺舌段慢性炎症。
      2.右肺中叶纤维灶。
      3.左侧胸腔少量积液。
      4.左侧胸膜增厚钙化。`,
    ],
    inputPlaceholder: '请输入报告内容...',
    inputValidation: (input: string) => input.trim().length > 0,
  },
];
