# InterLeaf 借鉴拆解 · Borrowing from InterLeaf

> 来源：TargetCHI/InterLeaf_ A Letter-Based Mobile Platform for Reflection, Connection, and Chronic Pain Support.pdf（CHI EA '26, Barcelona, doi 10.1145/3772363.3798739）
> Source: TargetCHI/InterLeaf_ A Letter-Based Mobile Platform for Reflection, Connection, and Chronic Pain Support.pdf (CHI EA '26, Barcelona, doi 10.1145/3772363.3798739)

📝 TODO（手写）：本笔记为素材拆解，非研究正文。所选范围、命名与设计取舍由维护者定稿。

---

## 1. 原文结构 · Source Structure

- **三层交互 · Three interaction layers**：Letters（私密反思信，可留私密或匿名分享）→ Grove of Solace（共享安慰物＋短说明）→ Chats（读到共鸣后发起的 1:1 异步对话）。
  **Three interaction layers**: Letters (private reflective letters, optionally shared anonymously) → Grove of Solace (shared comfort objects with short captions) → Chats (asynchronous 1:1 initiated after reading a shared letter).
- **AI 标注管线 · AI tagging pipeline**：叙述归一化 → 伤害筛查 → 情境标签生成 → 本体关键词标注 → 相似度匹配 → 融合＋置信门控（输出两类结果：安全风险信号、可编辑标签集）。
  **AI tagging pipeline**: narrative normalization → harm screening → contextual tag generation → ontology keyword tagging → similarity matching → fusion with confidence gating (two outputs: a safety risk signal and an editable tag set).
- **离线评估 · Offline evaluation**：250 封 LLM 生成的合成信件 + 两名标注者共识标签；四个评估任务＝安全检测、本体多标签标注、自由主题召回、置信校准。
  **Offline evaluation**: a 250-letter synthetic corpus annotated by two trained annotators; four tasks — safety detection, ontology multi-label tagging, free-form theme recovery, confidence calibration.
- **设计原则 · Design principles**：calm technology、私密优先、不设可见性指标（无点赞/评论/粉丝）、分享与连接均为 opt-in、标签为"可编辑建议"而非定义感受。
  **Design principles**: calm technology, private-first, no visibility metrics, sharing and matching are opt-in, tags are editable suggestions rather than definitions of feeling.

## 2. 本体表（原文 Table 1）· Ontology (Source Table 1)

| 类别 · Category | 规范标签 · Canonical labels |
|---|---|
| 身体部位 · Body area | head, neck, shoulder, back, hip, knee, hands, feet, diffuse |
| 症状 · Symptom | burning, stabbing, throbbing, stiffness, fatigue, brain fog |
| 触发 · Trigger | weather, stress, long sitting, hormonal cycle |
| 应对 · Coping | pacing, heat, mindfulness, medication, stretching |
| 情绪 · Emotion | grief, anger, frustration, shame, hope, loneliness |

📝 TODO（手写）：该本体为英文／西方框架，需与本课题的慢性病场景对齐（是否引入睡眠、用药周期、天气、压力、久坐、饮食等；是否需要"弥漫/全身"这类非特异描述）。

## 3. 维度映射 · Dimension Mapping

| InterLeaf 机制 · Mechanism | InterLeaf 用途 · Their use | 本课题对应 · Our counterpart | 取舍 · Take |
|---|---|---|---|
| Letters（自由书写） | 私密反思载体 | 发作记录（结构化三段：感觉 / 触发 / 缓解） | 弃自由书写，取"私密优先" |
| 标签本体（5 类） | 从自由文本抽结构化元数据 | 三段式的标签底座 | **核心借鉴** |
| 触发 Trigger（weather / stress / long sitting / hormonal cycle） | 归因 | 环境因素 + 心情因素（用户点选） | **核心借鉴** |
| 应对 Coping（pacing / heat / mindfulness / medication / stretching） | 自我照顾 | 缓解方式 → 自我调节 | **核心借鉴** |
| Grove of Solace | 共享安慰物 | 个人缓解策略库（"什么对我有效"） | 借鉴形式，去社交 |
| Chats（opt-in 1:1） | 有意图的连接 | 远期：与同伴／临床分享个人模式 | 可选（远期） |
| AI 管线（本体标注＋置信门控＋可编辑标签） | 从长文本抽标签 | **反向使用**：AI 预填候选标签，用户点选确认 → 降低负担 | 核心借鉴（若做 AI 层） |
| 标签"可编辑、只作脚手架" | 不定义感受 | 建议而非断言；不做临床建议 | 借鉴（重要原则） |
| 离线合成语料评估 | 概念验证阶段的可评估性 | 若做 AI 层：先用合成／离线语料做概念验证 | 借鉴（方法学） |

## 4. scope 扩展选项 · Scope Options

| 选项 · Option | 内容 · Content | 收益 · Gain | 代价 · Cost |
|---|---|---|---|
| **A. 跨发作个人模式层** | 多次发作累积 → 个人触发／缓解模式 → 下次发作前的提示 | 直接闭合"归因 → 自我调节"回路；给出反思与自我效能的可见产出 | 需纵向数据与聚合逻辑，工作量最大 |
| **B. AI 辅助预填层** | 自由／语音短输入 → AI 给候选标签＋置信门控 → 用户点选确认 | 兑现"低负担"；借用 InterLeaf 的置信门控与可编辑建议 | 引入模型依赖与评估负担（需伦理与离线评估） |
| **C. 社会／共享层** | 匿名聚合的缓解策略库，或同伴 opt-in 1:1 | 借 Grove／Chats，扩大生态 | 隐私与伦理成本高；硕士课题体量风险 |
| **D. 临床接口层** | 把个人模式图导出给下次门诊 | 接回临床场景 | 与当前"患者端"定位冲突，仅作远期工作 |

📝 TODO（手写）：选定哪几层；每层的优先级与是否在 poster 期内可完成。

## 5. 待决问题 · Open Questions

📝 TODO（手写）：
- 三段流程的顺序是否固定（感觉 → 触发 → 缓解），还是允许先记触发、事后补缓解？
- "缓解"是单选、多选，还是带"有效／无效"评分？
- 标签是固定列表、可自增，还是本地可编辑？
- 跨发作层的聚合窗口（最近 7 天 / 30 天 / 全部）？
- 模式呈现形式：时间线、矩阵、热力图、还是文字回顾？
