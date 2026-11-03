# 慢病自我管理中的链接选择交互 · Link-Selection Interaction for Chronic Disease Self-Management

![License](https://img.shields.io/badge/license-CC--BY--NC--pending-yellow)
![Status](https://img.shields.io/badge/status-IRB%20prep%20%2F%20formative%20study-blue)
![Method](https://img.shields.io/badge/method-HCI%20%7C%20qualitative%20%2B%20prototype-orange)
![Artifact](https://img.shields.io/badge/artifact-Nomi%20%E6%9A%96%E8%AE%B0%20%2F%20chronic--recall-green)
![Version](https://img.shields.io/badge/version-0.2.0-reframe-lightgrey)

> 一项以一般慢性病为背景的 HCI 研究：探索慢性病患者在自我管理中做症状归因（判断症状与环境、心情等情境因子的关联）时的障碍与需求，并设计一种"链接选择（link-selection）"交互，支持患者低成本地建立症状—情境关联、促进个人层面的反思与意义建构。
>
> An HCI study situated in general chronic disease: investigating the obstacles and needs patients face when attributing symptoms (judging whether a symptom is linked to contextual factors such as environment or mood) during self-management, and designing a "link-selection" interaction that lets patients build symptom–context links at low cost, fostering personal reflection and sensemaking.

📈 **进展 / Progress** → [PROGRESS.md](./PROGRESS.md) · 📓 开发日志 / Devlog → [DEVLOG.md](./DEVLOG.md) · 📂 研究章节 / Docs → [docs/](./docs/)

🔗 **仓库 / Repository** → https://github.com/yiihuu/HCI-Research-Chronic-Care

---

## 研究问题 · Research Questions

- **RQ1**：慢性病患者在自我管理中做症状归因 / 链接（例如判断"当前症状是否与环境或心情有关"）时，面临哪些障碍、需求与心智模型？
  **RQ1**: When patients attribute symptoms or create links during self-management (e.g., judging whether a current symptom is linked to environment or mood), what obstacles, needs, and mental models do they have?
- **RQ2**：如何设计"链接选择"交互，支持患者低成本地建立症状—情境关联，并促进个人反思？
  **RQ2**: How should a "link-selection" interaction be designed to support patients in building symptom–context links at low cost and to promote personal reflection?

> 📝 TODO（手写）：在 `docs/system-design.md` 与 `docs/methods.md` 把 RQ 拆成可操作的研究子问题与评估指标（如链接准确率、回顾频率、自我效能感变化）。
> 📝 TODO (by hand): In `docs/system-design.md` and `docs/methods.md`, break the RQs into actionable sub-questions and evaluation criteria (e.g., link accuracy, review frequency, changes in self-efficacy).

## 问题背景 · Background

- 慢病自我管理是一个**纵向、反复**的意义建构过程：患者长期记录症状，却往往难以把症状与情境触发（环境、心情、活动）联系起来。
  Chronic-disease self-management is a **longitudinal, recurring** sensemaking process: patients log symptoms over time, yet often struggle to connect them with contextual triggers (environment, mood, activity).
- 现有追踪工具多是**被动记录**（日志 / 量表），提供"记"的能力，却很少提供"连"的结构化支持——患者要在脑中自行拼凑症状与情境的关系。
  Existing trackers are mostly **passive logs** (journals / scales) that support recording but rarely offer structured support for *linking*; patients must mentally piece together symptom–context relationships on their own.
- **链接选择**作为一种结构化交互：用户发现症状 → 点击判定该症状与某一情境因子的关联，把隐性归因变成可操作、可回顾的**显式链接**。
  **Link-selection** as a structured interaction: the user notices a symptom, then clicks to judge its link to a contextual factor — turning implicit attribution into an explicit, revisitable **link**.

> 📝 TODO（手写）：补一段更凝练的 related-work gap 陈述（指向 `docs/related-work.md`），说明本研究相对现有自追踪 / 症状追踪 App 的差异化切入点（结构化归因 vs 被动记录）。
> 📝 TODO (by hand): Add a tighter related-work gap statement (pointing to `docs/related-work.md`) explaining this study's distinctive entry point relative to existing self-tracking / symptom-tracking apps (structured attribution vs. passive logging).

## 项目定位 · Positioning

- 这是一项**以设计为导向的 HCI 研究（design-oriented HCI research）**：先做形成性研究（RQ1，患者侧），再迭代设计原型（RQ2），最终通过形成性评估闭合。
  This is a **design-oriented HCI research** project: first a formative study (RQ1, patient-side), then an iteratively designed prototype (RQ2), closing the loop with formative evaluation.
- 方法论主线：半结构化访谈（患者侧形成性研究）+ 主题分析（Braun & Clarke）+ 参与式 / 迭代式原型设计。
  Methodological spine: semi-structured interviews (patient-side formative study) + thematic analysis (Braun & Clarke) + participatory / iterative prototype design.

## 系统设计 · System Design

> 详细设计与架构见 [docs/system-design.md](./docs/system-design.md)；可运行原型在 [`prototype/`](./prototype/)（Nomi 暖记 / chronic-recall）。
> Detailed design and architecture: [docs/system-design.md](./docs/system-design.md). The runnable prototype lives in [`prototype/`](./prototype/) (Nomi 暖记 / chronic-recall).

当前原型 **Nomi 暖记** 是一个面向慢病患者症状回忆与记录的助手，作为本研究 RQ2 的**早期设计素材 / 探针（design probe）**。其核心交互将围绕 **链接选择** 展开：

The current prototype **Nomi 暖记** is a symptom-recall and logging assistant for people with chronic disease, serving as an **early design probe** for RQ2. Its core interaction will centre on **link-selection**:

- **症状录入 / Symptom entry**：患者记录当下症状（语音 / 文字）。
  **Symptom entry**: the patient records a present symptom (voice / text).
- **链接选择 / Link selection（核心）**：针对该症状，点击判定它与"环境 / 心情 / 活动"等情境因子的关联（如"这次疲劳和天气有关"）。
  **Link selection (core)**: for that symptom, the patient clicks to judge its link to a contextual factor (environment / mood / activity), e.g., "this fatigue is linked to the weather".
- **个人链接图 / Personal link graph**：随时间积累，症状—情境链接形成一张可供回顾的个人意义地图。
  **Personal link graph**: over time, the symptom–context links accumulate into a revisitable personal sensemaking map.

> 📝 TODO（手写）：把上述交互映射到 RQ2 的"低成本归因 + 个人反思"诉求；补链接选择的交互流程图、情境因子分类法、以及个人链接图的可视化设计理由。
> 📝 TODO (by hand): Map the interactions above onto RQ2's "low-cost attribution + personal reflection" requirements; add the link-selection flow diagram, the taxonomy of contextual factors, and the design rationale for visualizing the personal link graph.

## 研究方法与数据分析 · Method & Data Analysis

> 详细方法见 [docs/methods.md](./docs/methods.md)。
> For the full method, see [docs/methods.md](./docs/methods.md).

- **研究范式**：质性为主的形成性研究 + 迭代式设计。
  **Paradigm**: a qualitative-dominant formative study plus iterative design.
- **数据收集**：慢性病患者半结构化访谈（IRB 准备中），聚焦症状归因 / 链接的需求与障碍。
  **Data collection**: semi-structured interviews with people living with chronic disease (IRB in preparation), focused on the needs and obstacles around symptom attribution / linking.
- **数据分析**：主题分析（Thematic Analysis, Braun & Clarke 六阶段）+ Saldaña 编码手册指导的编码策略。
  **Data analysis**: thematic analysis (Braun & Clarke's six phases) plus a coding strategy guided by Saldaña's coding manual.

> 📝 TODO（手写）：补充参与者招募与抽样策略（已通过佟老师临床合作网络对接）、访谈提纲、编码框架示例、RQ 与分析方法映射表。
> 📝 TODO (by hand): Add the recruitment and sampling strategy (already routed through the advisor's clinical collaboration network), the interview guide, sample coding frames, and an RQ-to-analysis mapping table.

## 相关工作 · Related Work

> 详细综述与对比表见 [docs/related-work.md](./docs/related-work.md)；文献清单见 [docs/references.md](./docs/references.md)。
> For the full review and comparison table, see [docs/related-work.md](./docs/related-work.md); the reference list is in [docs/references.md](./docs/references.md).

初步划分的主题轴线：

The thematic axes drawn so far:

1. 个人信息化与自追踪（personal informatics & self-tracking）
2. 症状追踪与慢病管理 App（symptom tracking & chronic disease apps）
3. 反思支持与个人意义建构（reflection support & personal sensemaking）
4. 常识性 / 因果归因（lay / causal attribution）
5. 链接 / 图式交互与结构化意义建构界面（link / graph interaction & structured sensemaking interfaces）
6. （背景脉络）共享决策（SDM）与协同意义建构（collaborative sensemaking）

> 📝 TODO（手写）：把 `论文相关/` 下的 CHI 文献逐一归入上述轴线，并填写对比表中的"与本研究的差异"列。
> 📝 TODO (by hand): Place each CHI paper from the `论文相关/` folder into the axes above and fill in the "difference from this study" column of the comparison table.

## 参考资料 · References

> 起始文献清单（来自本地 `论文相关/`）已预填在 [docs/references.md](./docs/references.md)，需你补全为统一引用格式（APA / ACM / BibTeX）。
> A starter reference list (drawn from the local `论文相关/` folder) is pre-filled in [docs/references.md](./docs/references.md); complete it into one consistent citation style (APA / ACM / BibTeX).

## 仓库结构 · Repository Structure

```
HCI-Research-Chronic-Care/
├── README.md              # 本研究总览（双语 + HCI 框架）/ Research overview (bilingual + HCI framework)
├── PROGRESS.md            # 对外进展里程碑 / External-facing progress milestones
├── DEVLOG.md              # 逐日公开开发/研究日志 / Day-by-day public devlog
├── docs/                  # 研究章节（你要周期性手写更新的部分）/ Research chapters (hand-written each reporting round)
│   ├── system-design.md   # 系统设计（RQ2 链接选择交互）/ System design (RQ2 link-selection)
│   ├── methods.md         # 研究方法与数据分析（RQ1 患者需求）/ Method & data analysis (RQ1 patient needs)
│   ├── related-work.md    # 相关工作与文献对比 / Related work and literature comparison
│   └── references.md      # 参考文献清单 / Reference list
├── prototype/             # 可运行原型 Nomi 暖记 / chronic-recall / Runnable prototype
│   ├── index.html
│   ├── app.js
│   └── style.css
├── analysis/              # 数据分析脚本与（脱敏）数据（raw/ 已 gitignore）/ Analysis scripts and de-identified data (raw/ gitignored)
│   └── README.md          # 分析材料索引 / Analysis material index
├── .gitignore
└── private/               # 私有研究笔记（已 gitignore，永不推送）/ Private research notes (gitignored, never pushed)
    └── RESEARCH.md
```

## 路线规划 · Roadmap

- **阶段 0（当前）· 框架搭建**：仓库结构、研究章节骨架、原型代码入库。
  **Stage 0 (current) · Framework**: repository structure, research chapter scaffolds, prototype code committed.
- **阶段 1 · 形成性研究（RQ1）**：IRB 通过 → 患者访谈（症状归因/链接需求）→ 主题分析 → 障碍与需求提炼。
  **Stage 1 · Formative study (RQ1)**: IRB approval → patient interviews (symptom-attribution / linking needs) → thematic analysis → obstacles and requirements distilled.
- **阶段 2 · 原型迭代（RQ2）**：基于 RQ1 发现，把 Nomi 重设计为核心"链接选择"交互；建立症状—情境链接模型。
  **Stage 2 · Prototype iteration (RQ2)**: based on RQ1 findings, redesign Nomi around the core "link-selection" interaction; build the symptom–context link model.
- **阶段 3 · 形成性评估**：患者可用性 / 个人意义建构评估；迭代。
  **Stage 3 · Formative evaluation**: patient usability and personal-sensemaking evaluation; iterate.
- **阶段 4 · 写作与投稿**：论文撰写（结构与本 README 章节对齐）。
  **Stage 4 · Writing and submission**: paper writing, structured to align with the sections of this README.

## 伦理与合规 · Ethics (IRB)

- 本研究处于 **IRB 准备阶段**，正式访谈需通过伦理审查后方可开展。
  The study is in the **IRB preparation** stage; formal interviews may only begin once ethics approval is granted.
- 访谈录音、转录、临床数据均须脱敏，原始材料不进入公开仓库（见 `.gitignore` 的 `analysis/raw/`、`analysis/transcripts/`）。
  Interview recordings, transcripts, and clinical data must all be de-identified; raw material never enters the public repository (see `analysis/raw/` and `analysis/transcripts/` in `.gitignore`).

## 已知边界 · Known Limitations

- 当前 `prototype/` 为早期设计探针，不等同于最终研究 artifact；其交互需随 RQ1 发现，把"链接选择"前置为核心。
  The current `prototype/` is an early design probe, not the final research artifact; its interaction must be reworked to foreground "link-selection" in light of RQ1 findings.
- 当前研究范围**仅患者端**（尚未纳入医患协同 / 临床医生视角）。
  The current scope is **patient-side only** (clinician collaboration / perspective not yet included).
- 文献综述（related work）与数据分析方法目前为骨架，待手写充实。
  The literature review and the data-analysis method are currently scaffolds, to be filled in by hand.
- 仓库位于 OneDrive 同步目录内：避免在多台设备同时打开编辑，以防 `.git` 与同步冲突（见 DEVLOG 备注）。
  The repository lives inside a OneDrive-synced folder: avoid editing it on multiple devices at once, to prevent `.git` conflicts with sync (see the DEVLOG note).

## 文档约定 · Documentation Convention

- 本仓库所有 Markdown 采用**中英对照**：标题写 `中文 · English`，正文中文一段、英文紧随其下一行。私有笔记 `private/` 可保持纯中文。
  All Markdown in this repository is **bilingual**: headings are written as `Chinese · English`, and each Chinese body paragraph is followed by its English counterpart. The private notes under `private/` may remain Chinese-only.
- `docs/` 各章节中的 `📝 TODO` 为预留填空位，由维护者手写更新（通常是每次向导师汇报前）。
  The `📝 TODO` markers in `docs/` are reserved placeholders for the maintainer to fill in by hand — typically before each advisor reporting round.
