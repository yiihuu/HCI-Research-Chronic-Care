# 慢病自我管理中的链接选择交互 · Link-Selection Interaction for Chronic Disease Self-Management

![License](https://img.shields.io/badge/license-CC--BY--NC--pending-yellow)
![Status](https://img.shields.io/badge/status-IRB%20prep%20%2F%20formative%20study-blue)
![Method](https://img.shields.io/badge/method-HCI%20%7C%20qualitative%20%2B%20prototype-orange)
![Artifact](https://img.shields.io/badge/artifact-Nomi%20%E6%9A%96%E8%AE%B0%20%2F%20chronic--recall-green)
![Version](https://img.shields.io/badge/version-0.2.0-reframe-lightgrey)

📈 **进展 / Progress** → [PROGRESS.md](./PROGRESS.md) · 📓 开发日志 / Devlog → [DEVLOG.md](./DEVLOG.md) · 📂 研究章节 / Docs → [docs/](./docs/)

🔗 **仓库 / Repository** → https://github.com/yiihuu/HCI-Research-Chronic-Care

---

## 研究问题 · Research Questions

在此陈述你的两个研究问题：RQ1（患者侧症状归因的障碍与需求）与 RQ2（链接选择交互设计）。
State your two research questions here: RQ1 (patient-side obstacles and needs in symptom attribution) and RQ2 (link-selection interaction design).

> 📝 TODO（手写）：在 `docs/system-design.md` 与 `docs/methods.md` 把 RQ 拆成子问题与评估指标。
> 📝 TODO (by hand): Break the RQs into sub-questions and evaluation metrics in `docs/system-design.md` and `docs/methods.md`.

## 问题背景 · Background

简述慢病自我管理中的问题空间，以及本研究的切入点（结构化归因 vs. 被动记录）。
Briefly describe the problem space in chronic-disease self-management and this study's entry point (structured attribution vs. passive logging).

> 📝 TODO（手写）：补一段凝练的背景与 gap 陈述，指向 `docs/related-work.md`。
> 📝 TODO (by hand): Add a tight background and gap statement, pointing to `docs/related-work.md`.

## 项目定位 · Positioning

这是一项以设计为导向的 HCI 研究（形成性研究 → 迭代设计 → 形成性评估）。
This is a design-oriented HCI study (formative study → iterative design → formative evaluation).

> 📝 TODO（手写）：一句陈述研究范式与立场。
> 📝 TODO (by hand): State the research paradigm and stance in one sentence.

## 系统设计 · System Design

> 详细设计与架构见 [docs/system-design.md](./docs/system-design.md)；可运行原型在 [`prototype/`](./prototype/)（Nomi 暖记 / chronic-recall）。
> Detailed design: [docs/system-design.md](./docs/system-design.md). Prototype: [`prototype/`](./prototype/).

围绕"链接选择"核心交互展开设计（症状 ↔ 情境因子的显式链接）。
Design centres on the core "link-selection" interaction (explicit symptom ↔ context-factor links).

> 📝 TODO（手写）：补交互流程、情境因子分类、个人链接图可视化设计理由。
> 📝 TODO (by hand): Add the interaction flow, context-factor taxonomy, and visualization rationale.

## 研究方法与数据分析 · Method & Data Analysis

> 详细方法见 [docs/methods.md](./docs/methods.md)。
> For the full method, see [docs/methods.md](./docs/methods.md).

质性为主的形成性研究 + 迭代式设计；数据分析采用主题分析（Braun & Clarke）+ Saldaña 编码。
A qualitative-dominant formative study plus iterative design; analysis via thematic analysis (Braun & Clarke) and Saldaña coding.

> 📝 TODO（手写）：补充招募策略、访谈提纲、编码示例、RQ→分析映射表。
> 📝 TODO (by hand): Add recruitment strategy, interview guide, coding examples, RQ→analysis map.

## 相关工作 · Related Work

> 详细综述与对比表见 [docs/related-work.md](./docs/related-work.md)；文献清单见 [docs/references.md](./docs/references.md)。
> Full review: [docs/related-work.md](./docs/related-work.md); references: [docs/references.md](./docs/references.md).

初步主题轴线：个人信息化 / 症状追踪 App / 反思支持 / 因果归因 / 链接·图式交互（SDM 与协同意义建构作为背景脉络）。
Thematic axes: personal informatics / symptom-tracking apps / reflection support / causal attribution / link·graph interaction (SDM and collaborative sensemaking as background context).

> 📝 TODO（手写）：把 `论文相关/` 的文献归入轴线，填对比表的"差异/缺口"列。
> 📝 TODO (by hand): Place `论文相关/` papers into the axes and fill the difference/gap column.

## 参考资料 · References

> 起始清单见 [docs/references.md](./docs/references.md)，需补全为统一引用格式。
> Starter list in [docs/references.md](./docs/references.md); complete into one citation style.

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
│   ├── references.md      # 参考文献清单 / Reference list
│   └── poster/            # 会议海报文稿（对标 InterLeaf / CHI EA）/ Poster manuscript (after InterLeaf / CHI EA)
│       └── manuscript.md  # 海报双语文稿骨架 / Bilingual poster manuscript scaffold
├── note/                  # 概念梳理笔记（可读性优先，已映射到课题）/ Concept notes (readable, mapped to the project)
│   ├── concepts.md        # 方法论概念梳理：RTD + 概念验证 + 研究设计/数据收集 / Method concepts: RTD + PoC + study design
│   └── assets/            # 笔记引用的讲义截图 / Lecture screenshots referenced by the notes
├── 资料/                  # 方法论书籍/讲义/PDF 素材库（你后续上传）/ Methodology books & PDF library (to be uploaded)
│   └── README.md          # 资料索引与入库守则 / Material index & intake rules
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

## 概念笔记与资料库 · Concept Notes & Material Library

- [`note/`](./note/) 是**方法论概念梳理**（可读性优先、已中英对照、已映射到本课题）：目前含 `concepts.md`——RTD、概念验证、研究设计分组、数据收集方法，及与慢病课题的对应表。
  [`note/`](./note/) holds **methodology concept notes** (readable-first, bilingual, mapped to this project): currently `concepts.md` — RTD, proof of concept, study-design groups, data-collection methods, and a mapping table to the chronic-care project.
- [`资料/`](./资料/) 是**原始素材库**（你后续上传的方法论书籍 / 讲义 / PDF）。入库前请确认无版权与隐私风险；敏感内容请放 `private/`。
  [`资料/`](./资料/) is the **raw-material library** (methodology books / lecture notes / PDFs you will upload). Confirm no copyright/privacy risk before adding; put sensitive content in `private/`.
- 流程：上传到 `资料/` → 在 `note/` 消化成概念笔记 → 沉淀进 `docs/`（方法章 / related work）。
  Flow: upload to `资料/` → digest into `note/` concept notes → consolidate into `docs/` (methods chapter / related work).

## 路线规划 · Roadmap

- **阶段 0（当前）· 框架搭建**：仓库结构、研究章节骨架、原型代码；新增 `note/`（概念梳理）与 `资料/`（素材库）。
  **Stage 0 (current) · Framework**: repository structure, research chapter scaffolds, prototype code; added `note/` and `资料/`.
- **阶段 1 · 形成性研究（RQ1）**：访谈（症状归因/链接需求）→ 主题分析 → 障碍与需求提炼。
  **Stage 1 · Formative study (RQ1)**: interviews (symptom-attribution / linking needs) → thematic analysis → obstacles and requirements distilled.
- **阶段 2 · 原型迭代（RQ2）**：基于 RQ1 发现，把 Nomi 重设计为核心"链接选择"交互。
  **Stage 2 · Prototype iteration (RQ2)**: based on RQ1 findings, redesign Nomi around the core "link-selection" interaction.
- **阶段 3 · 形成性评估**：患者可用性与个人意义建构评估；迭代。
  **Stage 3 · Formative evaluation**: patient usability and personal-sensemaking evaluation; iterate.
- **阶段 4 · 写作与投稿**：论文撰写（结构与本 README 章节对齐）。
  **Stage 4 · Writing and submission**: paper writing, structured to align with the sections of this README.

## 伦理与合规 · Ethics (IRB)

- 访谈录音、转录、临床数据均须脱敏，原始材料不进入公开仓库（见 `.gitignore` 的 `analysis/raw/`、`analysis/transcripts/`）。
  Interview recordings, transcripts, and clinical data must all be de-identified; raw material never enters the public repository (see `analysis/raw/` and `analysis/transcripts/` in `.gitignore`).

> 📝 TODO（手写）：更新伦理状态（已批准 / 豁免 / 在审）与批件号。
> 📝 TODO (by hand): Update IRB status (approved / exempt / pending) and protocol number.

## 已知边界 · Known Limitations

> 📝 TODO（手写）：在此诚实列出当前研究的边界（如样本量、仅患者端、原型阶段等）。
> 📝 TODO (by hand): List the current study's boundaries here (e.g., sample size, patient-side only, prototype stage).

## 文档约定 · Documentation Convention

- 本仓库所有 Markdown 采用**中英对照**：标题写 `中文 · English`，正文中文一段、英文紧随其下一行。私有笔记 `private/` 可保持纯中文。
  All Markdown in this repository is **bilingual**: headings are written as `Chinese · English`, and each Chinese body paragraph is followed by its English counterpart. The private notes under `private/` may remain Chinese-only.
- `docs/` 各章节中的 `📝 TODO` 为预留填空位，由维护者手写更新（通常是每次向导师汇报前）。
  The `📝 TODO` markers in `docs/` are reserved placeholders for the maintainer to fill in by hand — typically before each advisor reporting round.
