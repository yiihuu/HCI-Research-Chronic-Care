# 海报文稿 · Poster Manuscript（双语 · Bilingual）

> 本文件是面向 **CHI Extended Abstracts（海报 / Late-Breaking Work 轨道）** 的 poster 文稿初稿，对标 *InterLeaf: A Letter-Based Mobile Platform for Reflection, Connection, and Chronic Pain Support*（CHI EA '26）的板块结构。
> This file is a first draft of the poster manuscript for a **CHI Extended Abstracts (Poster / Late-Breaking Work) submission**, structured after *InterLeaf* (CHI EA '26).
>
> 写作约定：标题 `中文 · English`，正文中文一段、英文紧随其下一行。实证的"主题发现"目前尚无转录稿，故以 `📝 TODO（实证）` 标注，待 3 段访谈录音转写后填入——**不替你编造发现**。
> Convention: headings `Chinese · English`; each Chinese paragraph is followed by its English counterpart. Empirical *themes* are not yet available (interviews un-transcribed) and are marked `📝 TODO (empirical)` — findings are NOT fabricated.

---

## 作者与单位 · Authors & Affiliation

- **第一作者 / First author**：[你的姓名 / Your Name]（📝 TODO）
- **通讯 / 共同作者 / Advisor**：佟老师（Tong Laoshi, [英文名 / English name]）（📝 TODO）
- **单位 / Affiliation**：香港科技大学（广州）· [学院 / School]（Hong Kong University of Science and Technology (Guangzhou) · [School]）（📝 TODO）
- **联系 / Contact**：[邮箱 / email]（📝 TODO）

---

## 标题 · Title

**把症状连回生活：面向慢病自我管理的低负担"链接选择"交互**
**Linking Symptoms Back to Life: A Low-Effort "Link-Selection" Interaction for Chronic Disease Self-Management**

> 📝 TODO（手写）：标题最终定稿；当前为工作标题（working title）。系统中英文名待定：原型在仓库中称 **Nomi 暖记 / chronic-recall**，活动调研阶段代号 **Constellink**——poster 终稿需统一为一个系统名。
> 📝 TODO (by hand): Finalize the title (working title above). System name to be unified: the prototype is called **Nomi 暖记 / chronic-recall** in the repo and codenamed **Constellink** in the survey phase — pick one name for the final poster.

---

## 摘要 · Abstract

慢性病患者需要在两次复诊之间自行记录、回忆并整理症状，但这一过程往往伴随三重负担：看到或写下病情资料时的**情绪负担**、复诊时难以准确回忆与区分症状的**记忆负担**，以及记录本身费时费力、常被中断的**记录负担**；三者还会形成"情绪→记忆"的负向因果链。现有症状追踪工具多以被动记录为主，很少帮助患者把症状与环境、心情等情境因子**主动联系起来**。本文报告一项以设计为导向的 HCI 研究：我们通过形成性研究（预筛选问卷 + 半结构化访谈）探查慢性病患者在症状归因与链接时的障碍与需求，并据此设计一个"链接选择（link-selection）"交互——患者只需在症状与情境因子间点选，即可低成本地建立可回顾的显式链接，把隐性的个人归因转为支持反思的结构化意义建构。我们描述了问题空间、研究问题、原型设计，并报告形成性研究的初步进展。

People living with chronic disease must record, recall, and organize their symptoms between clinic visits, yet this process is marked by three burdens: an *emotional burden* when viewing or writing health data, a *memory burden* in accurately recalling and distinguishing episodes at visits, and a *recording burden* where logging is time-consuming and often abandoned — together forming a negative emotion→memory chain. Existing symptom-tracking tools are mostly passive logs that rarely help users actively connect symptoms to contextual triggers such as environment or mood. This paper reports a design-oriented HCI study: we conduct a formative study (pre-screening survey + semi-structured interviews) to surface patients' obstacles and needs around symptom attribution and linking, and we design a "link-selection" interaction in which patients tap between a symptom and a contextual factor to build low-effort, revisitable explicit links — turning implicit personal attribution into structured sensemaking that supports reflection. We describe the problem space, research questions, the prototype design, and preliminary progress of the formative study.

> 📝 TODO（手写）：摘要字数按目标轨道要求压缩（Late-Breaking Work 通常 ≤ 100–150 词英文；若投 Student Research Competition 另有摘要格式）。
> 📝 TODO (by hand): Trim the abstract to the target track's word limit (LBW usually ≤ 100–150 words; SRC has its own abstract format).

---

## 关键词与分类 · Keywords & CCS Concepts

**关键词 / Keywords**：chronic disease self-management（慢病自我管理）；personal informatics（个人信息化）；reflection support（反思支持）；symptom attribution（症状归因）；link-selection（链接选择）；human–AI / human–computer interaction（人机交互）。

**CCS Concepts**（📝 TODO 选 2–3 条）：
- Human-centered computing → Human computer interaction (HCI) → Interaction techniques
- Human-centered computing → Ubiquitous and mobile computing → Ubiquitous computing
- Applied computing → Health care information systems

---

## 1. 引言与问题 · Introduction & Problem

在两次复诊之间，慢性病患者长期处于"没人管"的自主管理期：症状起起伏伏，却要自己记下来、并在复诊时向医生讲清楚。然而，许多患者在这一阶段承受着三重相互交织的负担。

Between clinic visits, people with chronic disease live in an unsupported self-management period: symptoms fluctuate, yet they must log them and later explain them clearly to a clinician. Many patients, however, carry three interwoven burdens.

- **情绪负担 / Emotional burden**：看到或写下自己的病情、检查数据时会产生抵触、焦虑或低落；有人因此回避记录与查看（Ancker et al., 2015）。
  *Emotional burden*: viewing or writing one's health data triggers resistance, anxiety, or low mood; some avoid recording and checking altogether (Ancker et al., 2015).
- **记忆负担 / Memory burden**：复诊时难以准确回忆症状的发生时间、轻重与频率，容易把不同次复诊的内容记混，面对医生的细节追问常常答不上来（Twomey et al., 2020）。
  *Memory burden*: at visits, patients struggle to recall when, how severe, and how often symptoms occurred, mix up episodes across visits, and fail detailed clinician queries (Twomey et al., 2020).
- **记录负担 / Recording burden**：写症状日记、保存报告费时费力，常因忙碌或与生活冲突而中断、放弃。
  *Recording burden*: symptom journaling and report-keeping are effortful and frequently interrupted or abandoned due to busyness or life conflict.

更关键的是，这三者并非孤立：情绪与低落会进一步损害回忆能力，构成"情绪→记忆"的因果链；而现有追踪工具（日志、量表、提醒）只提供"记"的能力，几乎不提供"连"的结构化支持——患者要在脑中自行拼凑症状与情境（环境、心情、活动）之间的关系。当复诊来临，这种碎片化的自我报告往往难以组织成医生可理解的叙事。

Crucially, these burdens are not isolated: mood and low affect further impair recall, forming an emotion→memory chain; meanwhile, existing trackers (journals, scales, reminders) only support *recording*, rarely *linking* — patients must mentally piece together symptom–context (environment, mood, activity) relations. By visit time, this fragmented self-report is hard to organize into a clinician-legible narrative.

> 📝 TODO（手写）：在摘要/引言补一段更凝练的 related-work gap 陈述，点明本研究相对"被动记录类"症状 App 的差异化切入点（结构化归因 vs. 被动记录）。
> 📝 TODO (by hand): Add a tighter gap statement contrasting this work with passive-logging symptom apps (structured attribution vs. passive logging).

---

## 2. 研究问题 · Research Questions

- **RQ1**：慢性病患者在自我管理中做症状归因 / 链接（判断"当前症状是否与环境或心情有关"）时，面临哪些障碍、需求与心智模型？
  **RQ1**: When attributing symptoms or creating links during self-management (e.g., judging whether a symptom is linked to environment or mood), what obstacles, needs, and mental models do patients have?
- **RQ2**：如何设计"链接选择"交互，支持患者低成本地建立症状—情境关联，并促进个人反思？
  **RQ2**: How should a "link-selection" interaction be designed to support patients in building symptom–context links at low cost and to promote personal reflection?

### 2.1 预期贡献 · Expected Contributions

1. 对慢病随访"情绪—记忆—记录"三重负担及其中介关系的形成性刻画（RQ1）。
   A formative characterization of the emotional–memory–recording burden triad and its mediation in chronic-disease follow-up (RQ1).
2. 一种轻量、结构化的"链接选择"交互，把隐性归因转为可回顾的显式链接，降低反思门槛（RQ2）。
   A lightweight, structured "link-selection" interaction that turns implicit attribution into revisitable explicit links, lowering the barrier to reflection (RQ2).
3. 对"记"与"思"之间断层的设计干预，连接个人信息化与反思支持两条 HCI 脉络。
   A design intervention for the recording–reflection gap, bridging personal-informatics and reflection-support literatures.

> 📝 TODO（手写）：把 RQ1/RQ2 拆成可操作子问题与评估指标（链接准确率、回顾频率、自我效能感变化、NASA-TLX 认知负荷等）。
> 📝 TODO (by hand): Break RQ1/RQ2 into actionable sub-questions and evaluation metrics (link accuracy, review frequency, self-efficacy change, NASA-TLX, etc.).

---

## 3. 相关工作 · Related Work（精简版）

> 完整综述与对比表见仓库 [`docs/related-work.md`](../../docs/related-work.md)；文献清单见 [`docs/references.md`](../../docs/references.md)。下方为 poster 口径的浓缩。
> Full review and comparison table: [`docs/related-work.md`](../../docs/related-work.md); reference list: [`docs/references.md`](../../docs/references.md). Condensed below for the poster.

- **个人信息化与自追踪 / Personal informatics & self-tracking**：Li et al. 的阶段性模型指出"记录容易、反思与行动难"的鸿沟；在"难明疾病"中自追踪尤具不确定性。
  Li et al.'s stage model highlights the *recording-is-easy, reflection-and-action-are-hard* gap; self-tracking in "enigmatic" conditions is especially uncertain.
- **症状追踪与慢病管理 App / Symptom-tracking apps**：现有工具聚焦被动记录，缺"症状↔情境"的结构化链接。
  Existing tools focus on passive logging and lack structured symptom↔context linking.
- **反思支持 / Reflection support**：InterLeaf 等用平静技术（calm technology）支持情感共鸣式反思，但表达门槛高、非结构化。
  InterLeaf et al. use calm technology for resonant reflection, yet expression cost is high and unstructured.
- **常识 / 因果归因 / Lay & causal attribution**：患者在缺乏临床证据时自行推断症状成因，但民间归因很少被转译为可操作交互。
  Patients infer causes without clinical evidence, yet lay attribution is rarely translated into actionable interaction.
- **链接 / 图式交互 / Link & graph interaction**：节点-链接、概念图范式是本研究"链接选择"最直接的设计 lineage，但多为分析者视角、非患者日常轻量使用。
  Node-link and concept-map paradigms are the most direct design lineage of link-selection, yet are mostly analyst-facing, not lightweight daily patient use.

> 📝 TODO（手写）：poster 版 related work 压缩到 1 栏；把 `论文相关/` 的 CHI 文献逐条归入上述轴线并填"差异/缺口"列。
> 📝 TODO (by hand): Compress related work to one poster column; place each CHI paper from `论文相关/` into the axes and fill the difference/gap column.

---

## 4. 形成性研究（RQ1）· Formative Study

本研究采用**设计导向的 HCI 研究**范式：先做形成性研究（患者侧），再迭代设计原型，最终形成性评估闭合。当前已开展数据收集。

This study follows a **design-oriented HCI** paradigm: a patient-side formative study first, then iterative prototype design, closing with formative evaluation. Data collection is underway.

### 4.1 参与者与招募 · Participants & Recruitment

- **纳入 / Inclusion**：确诊需长期治疗（≥1 年）的慢性病患者；在情绪、记忆、记录三类困扰中至少占一项；定期复诊 ≥1 年。
  *Inclusion*: people diagnosed with a chronic condition requiring long-term treatment (≥1 yr); reporting at least one of the emotional / memory / recording burdens; regular follow-up ≥1 yr.
- **抽样 / Sampling**：目的性抽样，经导师（佟老师）临床合作网络对接；招募物料含两张海报 + 线上发帖文案，强调"自由填写、无需表现好"。
  *Sampling*: purposive, via the advisor's clinical network; recruitment used two posters plus an online post emphasizing "free response, no need to perform."
- **报酬与伦理 / Compensation & ethics**：完成访谈酬谢 100 元；预筛选问卷主动剔除姓名/身份证/病历等敏感字段，仅收联系方式，遵循数据最小化。本研究经 [机构] 伦理审查批准（批件号 ___）。
  *Compensation & ethics*: 100 RMB for a completed interview; the pre-screening survey deliberately drops name/ID/medical records, collecting contact only (data minimization). This study was approved by the [Institution] IRB (protocol no. ___).

> 📝 TODO（手写）：确认伦理批件号与状态（已批准 / 豁免 / 在审）；补样本量预期与最终实际参与人数。
> 📝 TODO (by hand): Confirm IRB approval number and status (approved / exempt / pending); add expected and actual participant counts.

### 4.2 数据收集工具 · Data Collection Instruments

**预筛选问卷（飞书多维表格表单）** 同时承担筛查与量表基线，含国际通用标准量表：

The **pre-screening survey (Feishu base form)** doubles as screening and baseline measurement, embedding internationally validated scales:

| 模块 · Module | 内容 · Content | 用途 · Purpose |
|---|---|---|
| Part A 资格初筛 | 年龄、病种（多选）、复诊频率、症状波动类型 | 纳入判定 / eligibility |
| Part B 三类困扰初筛 | 情绪/记忆/记录各 3 题（5 级同意度） | 定位负担类型 / burden typing |
| Part C 心理健康量表 | **PHQ-8**（抑郁, 8×0–3）、**GAD-7**（焦虑, 7×0–3）、**WHO-5**（幸福感, 5×0–5） | 标准化心理基线 / standardized baseline |
| Part D 补充量表（选填） | 改编 **PRMQ**（日常记忆, 8 题）、改编 **TBQ/PETS**（治疗负担, 2 题） | 记忆与治疗负担 / memory & treatment burden |
| Part F 开放题 | 情绪如何影响记忆/记录、现有记录工具、最想要的工具等 | 真实困扰 + 系统输入 / lived burden + design input |

**半结构化访谈**：一对一线上访谈，录音 + 转录（脱敏，不进公开仓库）；提纲围绕"症状归因/链接时的障碍、需求与心智模型"，并探询患者自然如何解释症状成因（为情境因子分类法提供输入）。目前已录制 **3 段访谈**（2026-07-15、2026-09-21、2026-10-20），转录与主题分析进行中。

**Semi-structured interviews**: one-on-one online interviews, recorded and de-identified (transcripts never enter the public repo); the guide centers on obstacles, needs, and mental models around symptom attribution/linking, probing how patients naturally explain symptom causes (to inform the context-factor taxonomy). **Three interviews** are recorded so far (2026-07-15, 2026-09-21, 2026-10-20); transcription and thematic analysis are in progress.

> 📝 TODO（手写）：把访谈提纲（脱敏后）贴入 `docs/methods.md`；记录每段访谈的时长、媒介、是否双人编码；报告预筛选问卷实际回收份数与通过率。
> 📝 TODO (by hand): Paste the (de-identified) interview guide into `docs/methods.md`; record each interview's duration, medium, and coding scheme; report actual pre-screening responses and pass rate.

### 4.3 数据分析 · Data Analysis

采用 Braun & Clarke 主题分析六阶段 + Saldaña 编码手册指导的首轮/二轮编码（描述性 → 主题/轴心编码）；以访谈 + 问卷 +（未来）原型反馈做三角验证。

We adopt Braun & Clarke's six-phase thematic analysis plus Saldaña-guided first/second-cycle coding (descriptive → thematic/axial); interviews, surveys, and (future) prototype feedback are triangulated.

> 📝 TODO（手写）：写明具体编码类型与 2–3 个脱敏编码示例（尤其"归因障碍""情境因子心智模型"类）；说明信度策略（双人编码/一致性）。
> 📝 TODO (by hand): Name the coding types and give 2–3 de-identified examples (esp. "attribution obstacle", "context-factor mental model"); specify reliability (double coding / agreement).

---

## 5. 系统设计：链接选择交互（RQ2）· System Design: Link-Selection

基于 RQ1 的初步输入，我们设计了一个以"链接选择"为核心的交互原型（仓库中称 Nomi 暖记 / chronic-recall，活动代号 Constellink），把"症状归因"从自由文字负担转为轻量点选。

Building on RQ1 inputs, we design a prototype centered on **link-selection** (called Nomi 暖记 / chronic-recall in the repo, codenamed Constellink), converting symptom attribution from a free-text burden into lightweight tapping.

### 5.1 设计目标 · Design Goals

- **G1 · 低门槛归因**：一键把症状连到情境因子（环境/心情/活动），无自由文字负担。
  **G1 · Low-effort attribution** — one-tap linking to a context factor, no free-text burden.
- **G2 · 个人意义建构**：患者亲手绘制的链接汇成可回顾的个人症状—情境地图。
  **G2 · Personal sensemaking** — drawn links accumulate into a revisitable personal symptom–context map.
- **G3 · 情境显式化**：环境/心情/活动做成可选节点，让隐性归因可见。
  **G3 · Context explicitness** — factors become selectable nodes, making implicit attribution visible.
- **G4 · 反思回路**：随时间积累，模式自然浮现（如"我的疲劳常和天气相连"）。
  **G4 · Reflection loop** — over time, patterns emerge (e.g., "my fatigue often links to weather").

### 5.2 核心交互 · Core Interaction

- **症状录入 / Symptom entry**：患者记录当下症状（语音/文字）。
  *Symptom entry*: record a present symptom (voice/text).
- **链接选择（核心）/ Link selection (core)**：针对该症状点击判定其与"环境/心情/活动"的关联——把"我感觉这次不舒服可能和天气有关"变成一条可存储的显式链接。
  *Link selection (core)*: tap to judge the symptom's link to a contextual factor — turning "I think this flare is weather-related" into a storable explicit link.
- **个人链接图 / Personal link graph**：随时间积累，症状—情境链接形成可回顾的个人意义地图。
  *Personal link graph*: links accumulate into a revisitable personal sensemaking map.

**数据模型 / Data model**：症状节点 ↔ 情境节点，患者点击建立边；每条链接含节点、边、置信度、时间戳，本地存储（隐私与 IRB 考量）。

**Data model**: symptom node ↔ context node, edge created by patient tap; each link carries node, edge, confidence, and timestamp, stored locally (privacy/IRB considerations).

> 📝 TODO（手写）：补每个屏幕的截图/线框；明确情境因子初始集合如何由 RQ1 访谈发现确定；写 design rationale 段落，点明相对"被动记录"类 App 的差异化。
> 📝 TODO (by hand): Add per-screen screenshots/wireframes; specify how the initial context-factor set is derived from RQ1; write the design-rationale paragraph differentiating from passive-logging apps.

---

## 6. 当前状态与初步发现 · Current Status & Preliminary Findings

**已收集数据 / Data in hand**：预筛选问卷（含 PHQ-8/GAD-7/WHO-5 等标准化量表）+ **3 段半结构化访谈**（2026-07-15、09-21、10-20）+ Constellink 活动前问卷（PHQ-8/GAD-7/WHO-5）。
**Data in hand**: pre-screening survey (PHQ-8/GAD-7/WHO-5 and more) + **3 semi-structured interviews** (2026-07-15, 09-21, 10-20) + Constellink pre-activity survey (PHQ-8/GAD-7/WHO-5).

**分析进展 / Analysis progress**：访谈转录与 Braun & Clarke 主题分析进行中；我们以"情绪—记忆—记录"三重负担作为候选组织框架，并关注"情绪→记忆"中介链。
**Analysis progress**: interview transcription and Braun & Clarke thematic analysis are in progress; we use the emotional–memory–recording burden triad as a candidate organizing framework and attend to the emotion→memory mediation.

> 📝 TODO（实证）：以下为**待转录稿填入**的发现位——请勿在转写前宣称结论。建议先报告 2–3 个来自访谈的候选主题（脱敏引文 + 支持者编号 Px），例如：
> 📝 TODO (empirical): The findings below are **to be filled after transcription** — do not assert conclusions before then. Suggested candidate themes (de-identified quotes + supporter IDs Px):
> - 候选主题 1 / Candidate theme 1：___（证据："___"，支持者 P_ / evidence: "___", supporters P_）
> - 候选主题 2 / Candidate theme 2：___
> - 候选主题 3 / Candidate theme 3：___（尤其关注"情绪→记忆"因果链、对"连接症状与情境"工具的需求）
> - 设计启示 / Design implication：RQ1 发现如何驱动 G1–G4（如情境因子初始集合）。

> ⚠️ 注意：因录音尚未转写，本节目前**不呈现任何具体主题结论**，仅说明数据与方法。转写后由你（或我协助）填入真实主题。
> ⚠️ Note: because interviews are un-transcribed, this section currently reports **no specific thematic conclusions**—only data and method. Real themes to be added after transcription.

---

## 7. 讨论 · Discussion

"链接选择"把 HCI 中两条脉络——个人信息化（记录）与反思支持（思）——用一种**轻量结构化**的交互缝起来：它不要求患者写长文，只处理"一个症状 ↔ 一个情境"的微小决策，从而降低反思门槛、让隐性归因可见。相对 InterLeaf 等自由式、高表达成本的反思工具，链接选择更适合慢病患者"记不住、懒得记、记了又难受"的现实；相对现有被动记录 App，它首次把"症状↔情境"的结构化归因前置为用户日常动作。未来可探索把个人链接图带入复诊场景，作为医患协同意义建构的入口（本研究当前仅患者端）。

"Link-selection" stitches together two HCI threads — personal informatics (recording) and reflection support (thinking) — via a *lightweight structured* interaction: rather than writing prose, the patient makes a tiny "one symptom ↔ one context" decision, lowering the reflection barrier and making implicit attribution visible. Compared with free-form, high-expression-cost reflection tools like InterLeaf, link-selection better fits patients who "can't remember, won't bother, and feel bad after recording"; compared with passive-logging apps, it foregrounds structured symptom↔context attribution as a daily patient action. Future work may bring the personal link graph into the clinic visit as an entry to clinician–patient collaborative sensemaking (this study is patient-side only).

> 📝 TODO（手写）：把初步发现（第 6 节）连回理论缺口；讨论"链接选择"对自我效能感与反思支持的预期作用。
> 📝 TODO (by hand): Tie preliminary findings (§6) back to the theoretical gap; discuss link-selection's expected effect on self-efficacy and reflection support.

---

## 8. 局限 · Limitations

- 当前为**形成性阶段**，样本小（3 段访谈 + 预筛选），发现待扩大与交叉验证。
  This is a **formative stage** with a small sample (3 interviews + pre-screening); findings await expansion and triangulation.
- 研究范围**仅患者端**，尚未纳入临床医生视角与真实部署。
  Scope is **patient-side only**; clinician perspective and real deployment are not yet included.
- 原型为早期设计探针，链接选择的交互与情境因子分类需随 RQ1 发现迭代。
  The prototype is an early probe; link-selection interaction and the context-factor taxonomy need iteration from RQ1.
- 心理健康量表（PHQ-8/GAD-7/WHO-5）用于刻画负担基线，非临床诊断。
  The mental-health scales profile burden baseline, not clinical diagnosis.

---

## 9. 结论 · Conclusion

慢病随访间的情绪—记忆—记录三重负担，暴露了"记"与"思"之间的断层。我们以"链接选择"这一轻量结构化交互作为设计回应，让患者在症状与情境因子间低成本地建立显式链接，支持个人层面的反思与意义建构。本海报报告该问题的形成性刻画、研究问题与原型设计，并分享形成性研究的初步进展。

The emotional–memory–recording burden triad in chronic-disease follow-up exposes a gap between *recording* and *reflecting*. We respond with "link-selection", a lightweight structured interaction letting patients build explicit symptom–context links at low cost, supporting personal reflection and sensemaking. This poster reports the formative characterization of the problem, the research questions, the prototype design, and preliminary progress of the formative study.

---

## 10. 参考文献 · References（poster 精选子集）

> 完整清单与统一格式见 [`docs/references.md`](../../docs/references.md)。下方为 poster 引用子集（ACM 格式待统一）。
> Full list: [`docs/references.md`](../../docs/references.md). Subset below (ACM format to be unified).

1. Ancker, J. S., et al. (2015). "You Get Reminded You're a Sick Person": Personal Data Tracking and Patients With Multiple Chronic Conditions. *J Med Internet Res*, 17(8).
2. Twomey, M., et al. (2020). Memory recall/information retrieval challenges within the medical appointment: a review. *J Decis Syst*, 29(3).
3. Braun, V., & Clarke, V. (2006). Using thematic analysis in psychology. *Qualitative Research in Psychology*.
4. Saldaña, J. (2016). *The Coding Manual for Qualitative Researchers*. SAGE.
5. Kroenke, K., et al. (2009). The PHQ-8 as a measure of current depression in the general population. *J Affect Disord*.
6. Spitzer, R. L., et al. (2006). A brief measure for assessing generalized anxiety disorder: the GAD-7. *Arch Intern Med*.
7. Topp, C. W., et al. (2015). The WHO-5 Well-Being Index: a systematic review. *Psychother Psychosom*.
8. Li, I., et al. (2010). A Stage-Based Model of Personal Informatics Systems. *CHI*.
9. InterLeaf: A Letter-Based Mobile Platform for Reflection, Connection, and Chronic Pain Support. *CHI EA* '26.
10. "You Can See the Connections": Facilitating Visualization of Care Priorities in People Living with Multiple Chronic Health Conditions. *CHI*.

> 📝 TODO（手写）：用 Zotero/BibTeX 导出统一 ACM 格式；补全作者、年份、DOI；把 `论文相关/` 的其余 CHI 文献纳入。
> 📝 TODO (by hand): Export a unified ACM format via Zotero/BibTeX; complete authors, years, DOIs; include the remaining CHI papers from `论文相关/`.

---

## 11. 致谢 · Acknowledgments

感谢参与本研究的受访者；感谢导师佟老师的指导与临床合作网络支持；感谢 [资助方 / funding]（📝 TODO）。本研究遵循 [机构] 伦理审查。

We thank the study participants; our advisor Tong Laoshi for guidance and the clinical collaboration network; and [funding] (📝 TODO). This study followed [Institution] IRB review.

---

## 附 · 海报视觉版式建议（供后续排版）· Poster Layout Notes (for layout later)

> 以下把文稿映射到 InterLeaf 式海报栏位，便于后续把本文稿排成一张 A0 海报。
> Maps the manuscript onto InterLeaf-style poster boards, to later lay it out as an A0 poster.

| 栏位 / Board | 来源章节 · Source | 视觉资产 · Visual |
|---|---|---|
| Title + Authors | 标题/作者 | 系统名 + HKUST(GZ) logo |
| Abstract | 摘要 | 短文 |
| Problem: 3 burdens | §1 | 三负担关系图（情绪→记忆→记录） |
| RQ + Contributions | §2 | 两张小卡 |
| Related Work | §3 | 5 轴线 + 对比表（精简） |
| Formative Study | §4 | 量表徽章（PHQ-8/GAD-7/WHO-5）+ 3 访谈时间线 |
| System: Link-Selection | §5 | 交互流程图 + 个人链接图 + 原型截图 |
| Status & Findings | §6 | 数据看板（已收集 N）+ 📝 TODO 主题卡 |
| Discussion / Limitation / Conclusion | §7–9 | 三栏 |
| References + Ack | §10–11 | 小字 |

> 📝 TODO（手写）：据此版式做一张 A0 海报（可用 HTML/PPT 导出）；原型截图从 `prototype/` 导出。
> 📝 TODO (by hand): Build the A0 poster from this layout (HTML/PPT export); export prototype screenshots from `prototype/`.
