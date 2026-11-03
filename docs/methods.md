# 研究方法与数据分析 · Method & Data Analysis（RQ1）

> 本文件对应 README 的「研究方法与数据分析」章节，是给导师周期性汇报 RQ1 / 方法学进度的载体。
> 当前为**骨架**，标注 `📝 TODO` 处需你手写充实。
>
> This file mirrors the "Method & Data Analysis" section of the README and serves as the vehicle for reporting RQ1 and methodology progress to your advisor.
> It is currently a **scaffold**; spots marked `📝 TODO` are for you to fill in by hand.

---

## 1. 研究范式 · Research Paradigm

- **设计导向的 HCI 研究（design-oriented HCI research）**：形成性研究（RQ1，患者侧）→ 迭代设计（RQ2）→ 形成性评估。
  **Design-oriented HCI research**: formative study (RQ1, patient-side) → iterative design (RQ2) → formative evaluation.
- 质性为主（qualitative-dominant），以半结构化访谈 + 主题分析为主轴。
  Qualitative-dominant, with semi-structured interviews and thematic analysis as the backbone.

> 📝 TODO（手写）：一句陈述研究范式与本体论/认识论立场（可引用 HCI 方法论文献）。
> 📝 TODO (by hand): State the research paradigm and the ontological/epistemological stance in a sentence (cite HCI methodology literature as needed).

## 2. 研究设计 · Study Design

| 维度 · Dimension | 设计 · Design |
|---|---|
| 研究对象 · Participants | 慢性病患者（一般慢病，非单病种限定）/ People living with chronic disease (general chronic conditions, not condition-specific) |
| 研究类型 · Study type | 形成性研究（formative study），探索性 / exploratory |
| 数据来源 · Data sources | 半结构化访谈 +（可选）自我管理实践观察 / Semi-structured interviews + (optional) observation of self-management practice |
| 抽样策略 · Sampling | 目的性抽样（佟老师临床合作网络对接）/ Purposive sampling via the advisor's clinical network |

> 📝 TODO（手写）：明确样本量预期、纳入/排除标准（如确诊时长、是否正在自我管理）。
> 📝 TODO (by hand): Specify the expected sample size and inclusion/exclusion criteria (e.g., duration since diagnosis, whether they currently self-manage).

## 3. 参与者与招募 · Participants & Recruitment

- 招募渠道：通过导师（佟老师）潜在临床合作网络对接慢性病患者。
  Recruitment channel: patient outreach through the advisor's (Tong laoshi's) potential clinical collaboration network.
- 当前状态：**IRB 准备阶段**，正式招募需在伦理审查通过后启动。
  Current status: **IRB preparation**; formal recruitment can only start once ethics approval is granted.

> 📝 TODO（手写）：填写招募话术要点、知情同意流程、报酬（如有）、预计招募人数；注意招募语境聚焦"症状归因 / 自我管理"而非特定病种。
> 📝 TODO (by hand): Add key recruitment wording, the informed-consent flow, compensation (if any), and the expected number of recruits; keep the recruitment framing focused on "symptom attribution / self-management" rather than a specific condition.

## 4. 数据收集 · Data Collection

- 工具：半结构化访谈提纲（围绕"患者在自我管理中做症状归因 / 链接时的障碍、需求与心智模型"）。
  Instrument: a semi-structured interview guide centred on the obstacles, needs, and mental models patients have when attributing symptoms or creating links during self-management.
- 形式：一对一访谈，录音 + 转录；转录材料脱敏，不进公开仓库。
  Format: one-on-one interviews, recorded and transcribed; transcripts are de-identified and never enter the public repository.

> 📝 TODO（手写）：贴出访谈提纲（可放 `private/` 或脱敏后放此处）；记录访谈时长、地点、媒介；可包含情境因子归类的探询（患者自然如何解释症状成因）。
> 📝 TODO (by hand): Paste the interview guide (in `private/`, or here once de-identified); record interview duration, setting, and medium; consider probing how patients naturally explain symptom causes (to inform the context-factor taxonomy).

## 5. 数据分析 · Data Analysis

### 5.1 主题分析（Thematic Analysis, Braun & Clarke）

采用六阶段框架：

The six-phase framework is adopted:

1. 熟悉数据（转录通读）/ Familiarization with the data (reading the transcripts)
2. 生成初始编码（initial codes）/ Generating initial codes
3. 寻找主题（themes）/ Searching for themes
4. 复核主题 / Reviewing themes
5. 定义与命名主题 / Defining and naming themes
6. 撰写报告 / Writing the report

### 5.2 编码策略（Saldana）

- 参考 Saldaña《质性研究编码手册》选择首轮 / 二轮编码策略（如描述性编码 → 主题编码 / 轴心编码）。
  Saldaña's *The Coding Manual for Qualitative Researchers* guides the choice of first- and second-cycle coding strategies (e.g., descriptive coding → thematic / axial coding).
- 本仓库 `analysis/` 保留编码练习与（脱敏）示例。
  This repository's `analysis/` folder holds coding exercises and de-identified examples.

> 📝 TODO（手写）：写明具体选用的编码类型与理由；给出 2–3 个编码示例（脱敏），尤其关注"归因障碍""情境因子心智模型"类编码。
> 📝 TODO (by hand): Name the specific coding types used and justify them; give 2–3 de-identified coding examples, especially around "attribution obstacles" and "context-factor mental models".

### 5.3 分析工具 · Analysis Tools

- 当前本地保留 RAY seminar 统计/可视化示例（t-test / ANOVA / Likert）于 `Analysis/RAY_seminar_code/` 作方法学参考；本研究质性分析以主题分析为主，定量仅作辅助（如 Likert 量表）。
  The RAY seminar statistics and visualization examples (t-test / ANOVA / Likert) are kept locally at `Analysis/RAY_seminar_code/` as methodological reference; the present study is primarily qualitative, with quantitative analysis (e.g., Likert scales) used only in a supporting role.

> 📝 TODO（手写）：确定是否引入质性分析软件（如 NVivo / Taguette / 手写），以及信度策略（如双人编码 / 一致性）。
> 📝 TODO (by hand): Decide whether to adopt qualitative analysis software (NVivo / Taguette / manual), and specify the reliability strategy (e.g., double coding / inter-coder agreement).

## 6. RQ 与分析映射 · RQ → Analysis Map

| 研究问题 · Research question | 数据 · Data | 分析方法 · Analysis | 预期产出 · Expected output |
|---|---|---|---|
| RQ1 归因障碍/需求 / Attribution obstacles & needs | 患者访谈 / Patient interviews | 主题分析 / Thematic analysis | 障碍主题 + 患者情境因子心智模型 / Obstacle themes + patients' context-factor mental models |
| RQ2 设计（见 system-design）/ RQ2 design (see system-design) | 访谈发现 + 探针反馈 / Interview findings + probe feedback | 迭代式设计 + 形成性评估 / Iterative design + formative evaluation | 链接选择交互设计决策 / Link-selection interaction design decisions |

> 📝 TODO（手写）：把上表扩成完整的方法-问题-产出矩阵。
> 📝 TODO (by hand): Expand the table above into a full method–question–output matrix.

## 7. 效度与立场 · Validity & Positionality

- 反思研究者立场（HCI 学生 / 非临床背景）对访谈与编码的影响。
  Reflect on how the researcher's position (an HCI student without clinical training) shaped interviewing and coding.
-  triangulation：访谈 + 观察 + 原型反馈交叉验证。
  Triangulation: cross-validate interviews, observation, and prototype feedback.

> 📝 TODO（手写）：补 rigor 论述（如 member checking、审计轨迹）。
> 📝 TODO (by hand): Add a rigor discussion (e.g., member checking, audit trail).

## 8. 当前状态与下一步 · Status & Next

- 状态：IRB 准备中；访谈提纲与招募措辞起草中。
  Status: IRB in preparation; the interview guide and recruitment wording are being drafted.
- 下一步：提交 IRB → 预访谈（非正式摸底）→ 正式访谈 → 主题分析。
  Next: submit IRB → pilot interviews (informal probing) → formal interviews → thematic analysis.

> 📝 TODO（手写）：每次汇报更新本节；记录里程碑日期。
> 📝 TODO (by hand): Update this section at every advisor report; record milestone dates.
