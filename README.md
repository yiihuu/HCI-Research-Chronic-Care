# MS Collaborative Sensemaking Dashboard · 慢病医患协同意义建构仪表盘

![License](https://img.shields.io/badge/license-CC--BY--NC--pending-yellow)
![Status](https://img.shields.io/badge/status-IRB%20prep%20%2F%20formative%20study-blue)
![Method](https://img.shields.io/badge/method-HCI%20%7C%20qualitative%20%2B%20prototype-orange)
![Artifact](https://img.shields.io/badge/artifact-Nomi%20%E6%9A%96%E8%AE%B0%20%2F%20chronic--recall-green)
![Version](https://img.shields.io/badge/version-0.1.0-scaffold-lightgrey)

> 一项以多发性硬化症（MS）为例的 HCI 研究：探索神经科医生在慢病随访中整合纵向临床数据与患者自报体验的障碍，并设计一个支持多模态数据整合下医患协同意义建构（collaborative sensemaking）的交互式仪表盘。
>
> An HCI research project using Multiple Sclerosis (MS) as a case study: investigating the barriers neurologists face when integrating longitudinal clinical data with patients' self-reported experiences during chronic-disease follow-up, and designing a multimodal interactive dashboard that supports clinician–patient collaborative sensemaking.

📈 **进展 / Progress** → [PROGRESS.md](./PROGRESS.md) · 📓 开发日志 / Devlog → [DEVLOG.md](./DEVLOG.md) · 📂 研究章节 / Docs → [docs/](./docs/)

🔗 **仓库 / Repository** → https://github.com/yiihuu/HCI-Research-Chronic-Care

---

## 研究问题 · Research Questions

- **RQ1**：神经科医生在 MS 随访中，整合纵向临床数据（如 MRI、EDSS、复发记录）与患者自报体验（症状、生活影响）时，面临哪些障碍与意义建构断层？
  **RQ1**: When integrating longitudinal clinical data (e.g., MRI, EDSS, relapse records) with patient-reported experiences (symptoms, life impact) during MS follow-up, what obstacles and sensemaking gaps do neurologists face?
- **RQ2**：如何设计一个支持多模态数据整合下医患协同意义建构的交互式仪表盘？其核心交互与表征应如何组织？
  **RQ2**: How should an interactive dashboard be designed to support clinician–patient collaborative sensemaking under multimodal data integration? How should its core interactions and representations be organized?

> 📝 TODO（手写）：在 `docs/system-design.md` 与 `docs/methods.md` 把 RQ 拆成可操作的研究子问题与评估指标。
> 📝 TODO (by hand): In `docs/system-design.md` and `docs/methods.md`, break the RQs into actionable sub-questions and evaluation criteria.

## 问题背景 · Background

- 慢病随访是一个**纵向、多源、异质**的意义建构过程：临床端有结构化但稀疏的纵向指标，患者端有密集但非结构化的自报体验。二者在随访对话中需要被"对齐"才能形成共同理解。
  Chronic-disease follow-up is a **longitudinal, multi-source, heterogeneous** sensemaking process: the clinical side offers structured but sparse longitudinal metrics, while the patient side offers dense but unstructured self-report. The two must be "aligned" within the follow-up conversation before a shared understanding can emerge.
- 现有临床系统多以**单模态、单视角**（医生视图或患者日志）呈现，缺少把"数字"与"体验"放在同一意义空间中、供医患**共同推理**的界面。
  Existing clinical systems mostly present a **single modality from a single perspective** (a clinician view or a patient log), and lack an interface that places numbers and experience in one shared space of meaning for **joint reasoning**.
- 多发性硬化症（MS）是理想案例：疾病轨迹高度异质、症状 invisible、复发-缓解模式使得"患者感受"与"临床指标"常常脱节。
  Multiple Sclerosis (MS) is an ideal case: disease trajectories are highly heterogeneous, symptoms are invisible, and the relapsing–remitting pattern routinely decouples "how the patient feels" from "what the clinical metrics show".

> 📝 TODO（手写）：补一段更凝练的 related-work gap 陈述（指向 `docs/related-work.md`），说明本研究相对 SDM（共享决策）与既有临床仪表盘的差异化切入点。
> 📝 TODO (by hand): Add a tighter related-work gap statement (pointing to `docs/related-work.md`) explaining this study's distinctive entry point relative to SDM (shared decision-making) and existing clinical dashboards.

## 项目定位 · Positioning

- 这是一项**以设计为导向的 HCI 研究（design-oriented HCI research）**：先做形成性研究（RQ1），再迭代设计原型（RQ2），最终通过可用性 / 形成性评估闭合。
  This is a **design-oriented HCI research** project: first a formative study (RQ1), then an iteratively designed prototype (RQ2), closing the loop with usability and formative evaluation.
- 方法论主线：半结构化访谈（医生侧形成性研究）+ 主题分析（Braun & Clarke）+ 参与式/迭代式原型设计。
  Methodological spine: semi-structured interviews (clinician-side formative study) + thematic analysis (Braun & Clarke) + participatory/iterative prototype design.

## 系统设计 · System Design

> 详细设计与架构见 [docs/system-design.md](./docs/system-design.md)；可运行原型在 [`prototype/`](./prototype/)（Nomi 暖记 / chronic-recall）。
> Detailed design and architecture: [docs/system-design.md](./docs/system-design.md). The runnable prototype lives in [`prototype/`](./prototype/) (Nomi 暖记 / chronic-recall).

当前原型 **Nomi 暖记** 是一个面向慢病患者症状回忆的助手，作为本研究 RQ2 的**早期设计素材 / 探针（design probe）**，包含：

The current prototype **Nomi 暖记** is a symptom-recall assistant for people with chronic disease, serving as an **early design probe** for RQ2. It comprises:

- **工作台 / Workbench**：复诊窗口、温和的可选记录提示。
  **Workbench**: the visit window and a gentle, optional recording prompt.
- **身体地图 / Body Map**：语音/文字症状 → 同步到身体部位的可视化。
  **Body Map**: voice or text symptoms synced onto body regions.
- **回忆锚点 / Recall Anchors**：为复诊提炼"想留意的部分"。
  **Recall Anchors**: distilling what the patient wants to raise at the next visit.
- **时间表 / Timeline**：复诊窗口内的症状波动。
  **Timeline**: symptom fluctuation within the visit window.

> 📝 TODO（手写）：把上述四个屏幕映射到 RQ2 的"协同意义建构"诉求；补交互流程图与多模态（语音 / 视觉 / 时间）整合的设计理由。
> 📝 TODO (by hand): Map the four screens above onto RQ2's collaborative-sensemaking requirements; add interaction flow diagrams and the design rationale for multimodal (voice / visual / temporal) integration.

## 研究方法与数据分析 · Method & Data Analysis

> 详细方法见 [docs/methods.md](./docs/methods.md)。
> For the full method, see [docs/methods.md](./docs/methods.md).

- **研究范式**：质性为主的形成性研究 + 迭代式设计。
  **Paradigm**: a qualitative-dominant formative study plus iterative design.
- **数据收集**：神经科医生半结构化访谈（IRB 准备中），辅以随访场景观察。
  **Data collection**: semi-structured interviews with neurologists (IRB in preparation), supported by observation of follow-up visits.
- **数据分析**：主题分析（Thematic Analysis, Braun & Clarke 六阶段）+ Saldaña 编码手册指导的编码策略。
  **Data analysis**: thematic analysis (Braun & Clarke's six phases) plus a coding strategy guided by Saldaña's coding manual.

> 📝 TODO（手写）：补充参与者招募与抽样策略（已通过佟老师临床合作网络对接）、访谈提纲、编码框架示例、RQ 与分析方法映射表。
> 📝 TODO (by hand): Add the recruitment and sampling strategy (already routed through the advisor's clinical collaboration network), the interview guide, sample coding frames, and an RQ-to-analysis mapping table.

## 相关工作 · Related Work

> 详细综述与对比表见 [docs/related-work.md](./docs/related-work.md)；文献清单见 [docs/references.md](./docs/references.md)。
> For the full review and comparison table, see [docs/related-work.md](./docs/related-work.md); the reference list is in [docs/references.md](./docs/references.md).

初步划分的主题轴线：

The thematic axes drawn so far:

1. 自追踪与慢病管理（self-tracking & chronic disease）
2. 临床仪表盘与照护优先级可视化（clinical dashboards & care-priority visualization）
3. 共享决策（SDM）vs. 协同意义建构（collaborative sensemaking）
4. 健康场景的多模态 / 对话式交互（multimodal & conversational interaction in health）
5. 与临床医生 / 患者的协同设计（co-design）

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
│   ├── system-design.md   # 系统设计（RQ2 原型）/ System design (RQ2 prototype)
│   ├── methods.md         # 研究方法与数据分析（RQ1）/ Method & data analysis (RQ1)
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
- **阶段 1 · 形成性研究（RQ1）**：IRB 通过 → 医生访谈 → 主题分析 → 障碍与需求提炼。
  **Stage 1 · Formative study (RQ1)**: IRB approval → clinician interviews → thematic analysis → obstacles and requirements distilled.
- **阶段 2 · 原型迭代（RQ2）**：基于 RQ1 发现重设计 Nomi / 仪表盘；多模态整合。
  **Stage 2 · Prototype iteration (RQ2)**: redesign Nomi / the dashboard from RQ1 findings; multimodal integration.
- **阶段 3 · 形成性评估**：医生 + 患者可用性 / 意义建构评估；迭代。
  **Stage 3 · Formative evaluation**: clinician + patient usability and sensemaking evaluation; iterate.
- **阶段 4 · 写作与投稿**：论文撰写（结构与本 README 章节对齐）。
  **Stage 4 · Writing and submission**: paper writing, structured to align with the sections of this README.

## 伦理与合规 · Ethics (IRB)

- 本研究处于 **IRB 准备阶段**，正式访谈需通过伦理审查后方可开展。
  The study is in the **IRB preparation** stage; formal interviews may only begin once ethics approval is granted.
- 访谈录音、转录、临床数据均须脱敏，原始材料不进入公开仓库（见 `.gitignore` 的 `analysis/raw/`、`analysis/transcripts/`）。
  Interview recordings, transcripts, and clinical data must all be de-identified; raw material never enters the public repository (see `analysis/raw/` and `analysis/transcripts/` in `.gitignore`).

## 已知边界 · Known Limitations

- 当前 `prototype/` 为早期设计探针，不等同于最终研究artifact；其交互需随 RQ1 发现重做。
  The current `prototype/` is an early design probe, not the final research artifact; its interactions will need to be redone in light of RQ1 findings.
- 文献综述（related work）与数据分析方法目前为骨架，待手写充实。
  The literature review and the data-analysis method are currently scaffolds, to be filled in by hand.
- 仓库位于 OneDrive 同步目录内：避免在多台设备同时打开编辑，以防 `.git` 与同步冲突（见 DEVLOG 备注）。
  The repository lives inside a OneDrive-synced folder: avoid editing it on multiple devices at once, to prevent `.git` conflicts with sync (see the DEVLOG note).

## 文档约定 · Documentation Convention

- 本仓库所有 Markdown 采用**中英对照**：标题写 `中文 · English`，正文中文一段、英文紧随其下一行。私有笔记 `private/` 可保持纯中文。
  All Markdown in this repository is **bilingual**: headings are written as `Chinese · English`, and each Chinese body paragraph is followed by its English counterpart. The private notes under `private/` may remain Chinese-only.
- `docs/` 各章节中的 `📝 TODO` 为预留填空位，由维护者手写更新（通常是每次向导师汇报前）。
  The `📝 TODO` markers in `docs/` are reserved placeholders for the maintainer to fill in by hand — typically before each advisor reporting round.
