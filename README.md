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
- **RQ2**：如何设计一个支持多模态数据整合下医患协同意义建构的交互式仪表盘？其核心交互与表征应如何组织？

> 📝 TODO（手写）：在 `docs/system-design.md` 与 `docs/methods.md` 把 RQ 拆成可操作的研究子问题与评估指标。

## 问题背景 · Background

- 慢病随访是一个**纵向、多源、异质**的意义建构过程：临床端有结构化但稀疏的纵向指标，患者端有密集但非结构化的自报体验。二者在随访对话中需要被"对齐"才能形成共同理解。
- 现有临床系统多以**单模态、单视角**（医生视图或患者日志）呈现，缺少把"数字"与"体验"放在同一意义空间中、供医患**共同推理**的界面。
- 多发性硬化症（MS）是理想案例：疾病轨迹高度异质、症状 invisible、复发-缓解模式使得"患者感受"与"临床指标"常常脱节。

> 📝 TODO（手写）：补一段更凝练的 related-work gap 陈述（指向 `docs/related-work.md`），说明本研究相对 SDM（共享决策）与既有临床仪表盘的差异化切入点。

## 项目定位 · Positioning

- 这是一项**以设计为导向的 HCI 研究（design-oriented HCI research）**：先做形成性研究（RQ1），再迭代设计原型（RQ2），最终通过可用性 / 形成性评估闭合。
- 方法论主线：半结构化访谈（医生侧形成性研究）+ 主题分析（Braun & Clarke）+ 参与式/迭代式原型设计。

## 系统设计 · System Design

> 详细设计与架构见 [docs/system-design.md](./docs/system-design.md)；可运行原型在 [`prototype/`](./prototype/)（Nomi 暖记 / chronic-recall）。

当前原型 **Nomi 暖记** 是一个面向慢病患者症状回忆的助手，作为本研究 RQ2 的**早期设计素材 / 探针（design probe）**，包含：

- **工作台 / Workbench**：复诊窗口、温和的可选记录提示。
- **身体地图 / Body Map**：语音/文字症状 → 同步到身体部位的可视化。
- **回忆锚点 / Recall Anchors**：为复诊提炼"想留意的部分"。
- **时间表 / Timeline**：复诊窗口内的症状波动。

> 📝 TODO（手写）：把上述四个屏幕映射到 RQ2 的"协同意义建构"诉求；补交互流程图与多模态（语音 / 视觉 / 时间）整合的设计理由。

## 研究方法与数据分析 · Method & Data Analysis

> 详细方法见 [docs/methods.md](./docs/methods.md)。

- **研究范式**：质性为主的形成性研究 + 迭代式设计。
- **数据收集**：神经科医生半结构化访谈（IRB 准备中），辅以随访场景观察。
- **数据分析**：主题分析（Thematic Analysis, Braun & Clarke 六阶段）+ Saldaña 编码手册指导的编码策略。

> 📝 TODO（手写）：补充参与者招募与抽样策略（已通过佟老师临床合作网络对接）、访谈提纲、编码框架示例、RQ 与分析方法映射表。

## 相关工作 · Related Work

> 详细综述与对比表见 [docs/related-work.md](./docs/related-work.md)；文献清单见 [docs/references.md](./docs/references.md)。

初步划分的主题轴线：

1. 自追踪与慢病管理（self-tracking & chronic disease）
2. 临床仪表盘与照护优先级可视化
3. 共享决策（SDM）vs. 协同意义建构（collaborative sensemaking）
4. 健康场景的多模态 / 对话式交互
5. 与临床医生 / 患者的协同设计（co-design）

> 📝 TODO（手写）：把 `论文相关/` 下的 CHI 文献逐一归入上述轴线，并填写对比表中的"与本研究的差异"列。

## 参考资料 · References

> 起始文献清单（来自本地 `论文相关/`）已预填在 [docs/references.md](./docs/references.md)，需你补全为统一引用格式（APA / ACM / BibTeX）。

## 仓库结构 · Repository Structure

```
HCI-Research-Chronic-Care/
├── README.md              # 本研究总览（双语 + HCI 框架）
├── PROGRESS.md            # 对外进展里程碑
├── DEVLOG.md              # 逐日公开开发/研究日志
├── docs/                  # 研究章节（你要周期性手写更新的部分）
│   ├── system-design.md   # 系统设计（RQ2 原型）
│   ├── methods.md         # 研究方法与数据分析（RQ1）
│   ├── related-work.md    # 相关工作与文献对比
│   └── references.md      # 参考文献清单
├── prototype/             # 可运行原型 Nomi 暖记 / chronic-recall
│   ├── index.html
│   ├── app.js
│   └── style.css
├── analysis/              # 数据分析脚本与（脱敏）数据（raw/ 已 gitignore）
│   └── README.md          # 分析材料索引
├── .gitignore
└── private/               # 私有研究笔记（已 gitignore，永不推送）
    └── RESEARCH.md
```

## 路线规划 · Roadmap

- **阶段 0（当前）· 框架搭建**：仓库结构、研究章节骨架、原型代码入库。
- **阶段 1 · 形成性研究（RQ1）**：IRB 通过 → 医生访谈 → 主题分析 → 障碍与需求提炼。
- **阶段 2 · 原型迭代（RQ2）**：基于 RQ1 发现重设计 Nomi / 仪表盘；多模态整合。
- **阶段 3 · 形成性评估**：医生 + 患者可用性 / 意义建构评估；迭代。
- **阶段 4 · 写作与投稿**：论文撰写（结构与本 README 章节对齐）。

## 伦理与合规 · Ethics (IRB)

- 本研究处于 **IRB 准备阶段**，正式访谈需通过伦理审查后方可开展。
- 访谈录音、转录、临床数据均须脱敏，原始材料不进入公开仓库（见 `.gitignore` 的 `analysis/raw/`、`analysis/transcripts/`）。

## 已知边界 · Known Limitations

- 当前 `prototype/` 为早期设计探针，不等同于最终研究artifact；其交互需随 RQ1 发现重做。
- 文献综述（related work）与数据分析方法目前为骨架，待手写充实。
- 仓库位于 OneDrive 同步目录内：避免在多台设备同时打开编辑，以防 `.git` 与同步冲突（见 DEVLOG 备注）。
