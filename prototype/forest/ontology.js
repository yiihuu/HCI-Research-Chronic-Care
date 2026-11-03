// ============================================================
// 标签本体 · Tag Ontology
// 结构依据 InterLeaf (CHI EA '26) Table 1 的五类本体：
//   body area / symptom / trigger / coping / emotion
// 差异：trigger 按用户需求拆为「环境因素」与「心情因素」两轴；
//       各轴允许用户自建自定义标签（对应 InterLeaf 的
//       "if no ontology term matches, keep the free-form label"）。
// ============================================================

const ONTOLOGY = {
  // —— 身体部位 Body area ——
  areas: [
    { id: 'head',    zh: '头部',   en: 'head' },
    { id: 'brain',   zh: '脑部',   en: 'brain' },
    { id: 'eye',     zh: '眼部',   en: 'eye' },
    { id: 'mouth',   zh: '口腔咽喉', en: 'mouth' },
    { id: 'neck',    zh: '颈部',   en: 'neck' },
    { id: 'shoulder',zh: '肩部',   en: 'shoulder' },
    { id: 'back',    zh: '背部',   en: 'back' },
    { id: 'chest',   zh: '胸部',   en: 'chest' },
    { id: 'abdomen', zh: '腹部',   en: 'abdomen' },
    { id: 'waist',   zh: '腰部',   en: 'waist' },
    { id: 'hip',     zh: '髋部',   en: 'hip' },
    { id: 'arm',     zh: '手臂',   en: 'arm' },
    { id: 'hand',    zh: '手部',   en: 'hand' },
    { id: 'thigh',   zh: '大腿',   en: 'thigh' },
    { id: 'knee',    zh: '膝盖',   en: 'knee' },
    { id: 'shin',    zh: '小腿',   en: 'shin' },
    { id: 'foot',    zh: '足部',   en: 'foot' },
    { id: 'skin',    zh: '皮肤',   en: 'skin' },
    { id: 'diffuse', zh: '全身弥漫', en: 'diffuse' },
  ],

  // —— 症状性质 Symptom ——
  symptoms: [
    { id: 'burning',  zh: '烧灼感', en: 'burning' },
    { id: 'stabbing', zh: '刺痛',   en: 'stabbing' },
    { id: 'throbbing',zh: '搏动痛', en: 'throbbing' },
    { id: 'stiffness',zh: '僵硬',   en: 'stiffness' },
    { id: 'fatigue',  zh: '疲乏',   en: 'fatigue' },
    { id: 'brainfog', zh: '脑雾',   en: 'brain fog' },
    { id: 'dizziness',zh: '头晕',   en: 'dizziness' },
    { id: 'nausea',   zh: '恶心',   en: 'nausea' },
    { id: 'numbness', zh: '麻木',   en: 'numbness' },
    { id: 'itching',  zh: '瘙痒',   en: 'itching' },
    { id: 'swelling', zh: '肿胀',   en: 'swelling' },
    { id: 'weakness', zh: '无力',   en: 'weakness' },
    { id: 'heat',     zh: '发热感', en: 'heat' },
    { id: 'cough',    zh: '咳嗽',   en: 'cough' },
    { id: 'palpitation',zh: '心悸', en: 'palpitations' },
    { id: 'vision',   zh: '视物模糊', en: 'blurred vision' },
    { id: 'insomnia', zh: '睡不着', en: 'insomnia' },
  ],

  // —— 情绪 Emotion ——
  emotions: [
    { id: 'grief',      zh: '悲伤',   en: 'grief' },
    { id: 'anger',      zh: '愤怒',   en: 'anger' },
    { id: 'frustration',zh: '挫败',   en: 'frustration' },
    { id: 'shame',      zh: '羞耻',   en: 'shame' },
    { id: 'hope',       zh: '希望',   en: 'hope' },
    { id: 'loneliness', zh: '孤独',   en: 'loneliness' },
    { id: 'anxiety',    zh: '焦虑',   en: 'anxiety' },
    { id: 'fear',       zh: '担心',   en: 'fear' },
    { id: 'relief',     zh: '宽慰',   en: 'relief' },
    { id: 'numb',       zh: '麻木',   en: 'numbness' },
    { id: 'joy',        zh: '开心',   en: 'joy' },
    { id: 'guilt',      zh: '内疚',   en: 'guilt' },
    { id: 'irritable',  zh: '易怒',   en: 'irritability' },
    { id: 'low',        zh: '低落',   en: 'low mood' },
  ],

  // —— 触发·环境因素 Environmental triggers ——
  env: [
    { id: 'weather',   zh: '天气变化', en: 'weather' },
    { id: 'temp',      zh: '温差',   en: 'temperature shift' },
    { id: 'sitting',   zh: '久坐',   en: 'long sitting' },
    { id: 'hormone',   zh: '激素周期', en: 'hormonal cycle' },
    { id: 'sleepdep',  zh: '睡眠不足', en: 'sleep deprivation' },
    { id: 'screen',    zh: '长时间屏幕', en: 'screen time' },
    { id: 'diet',      zh: '饮食',   en: 'diet' },
    { id: 'infection', zh: '感染',   en: 'infection' },
    { id: 'exertion',  zh: '过度劳累', en: 'physical exertion' },
    { id: 'light',     zh: '强光',   en: 'bright light' },
    { id: 'noise',     zh: '噪音',   en: 'noise' },
    { id: 'commute',   zh: '通勤出行', en: 'travel' },
    { id: 'menstruation', zh: '月经期', en: 'menstruation' },
    { id: 'medchange', zh: '用药变动', en: 'medication change' },
  ],

  // —— 触发·心情因素 Mood triggers ——
  mood: [
    { id: 'stress',    zh: '压力',   en: 'stress' },
    { id: 'anxiety',   zh: '焦虑',   en: 'anxiety' },
    { id: 'lowmood',   zh: '情绪低落', en: 'low mood' },
    { id: 'conflict',  zh: '人际冲突', en: 'interpersonal conflict' },
    { id: 'overwork',  zh: '过度工作', en: 'overwork' },
    { id: 'lonely',    zh: '孤独感', en: 'loneliness' },
    { id: 'appreh',    zh: '期待/兴奋', en: 'anticipation' },
    { id: 'recall',    zh: '记性负担', en: 'memory burden' },
    { id: 'visitanx',  zh: '就医焦虑', en: 'anticipation of care' },
    { id: 'guilt',     zh: '自责',   en: 'self-blame' },
  ],

  // —— 缓解·应对 Coping ——
  copings: [
    { id: 'pacing',     zh: '调整节奏', en: 'pacing' },
    { id: 'heat',       zh: '热敷',   en: 'heat' },
    { id: 'cool',       zh: '冷敷',   en: 'cold' },
    { id: 'mindful',    zh: '正念放松', en: 'mindfulness' },
    { id: 'breathing',  zh: '呼吸放松', en: 'breathing exercise' },
    { id: 'medication', zh: '服药',   en: 'medication' },
    { id: 'stretching', zh: '拉伸',   en: 'stretching' },
    { id: 'rest',       zh: '躺下休息', en: 'rest' },
    { id: 'sleep',      zh: '补觉',   en: 'sleeping' },
    { id: 'walk',       zh: '散步',   en: 'walking' },
    { id: 'hydration',  zh: '喝水/进食', en: 'hydration' },
    { id: 'posture',    zh: '调整姿势', en: 'posture change' },
    { id: 'screenbreak',zh: '离开屏幕', en: 'screen break' },
    { id: 'journal',    zh: '写下来', en: 'journaling' },
    { id: 'talking',    zh: '与人诉说', en: 'talking to someone' },
    { id: 'quiet',      zh: '独处安静', en: 'quiet alone time' },
    { id: 'nothing',    zh: '没有缓解', en: 'no relief yet' },
  ],
};

// —— 程度 Severity ——
const SEVERITY = [
  { id: 'light', zh: '轻', en: 'mild' },
  { id: 'medium', zh: '中', en: 'moderate' },
  { id: 'heavy', zh: '重', en: 'severe' },
];

// —— 缓解效果 Relief outcome ——
const RELIEF = [
  { id: 'helped',  zh: '有缓解', en: 'helped' },
  { id: 'partial', zh: '部分缓解', en: 'partly helped' },
  { id: 'none',    zh: '没有缓解', en: 'no relief' },
  { id: 'pending', zh: '还不确定', en: 'not yet known' },
];

// —— 标签查找（含自定义标签回退）——
function labelOf(list, id) {
  const hit = list.find((x) => x.id === id);
  if (hit) return hit;
  if (id && id.indexOf('custom:') === 0) return { id, zh: id.slice(7), en: 'custom' };
  return { id, zh: id, en: id };
}
function zh(list, id) { return labelOf(list, id).zh; }
