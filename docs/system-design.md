# 系统设计 · System Design（RQ2）

> 本文件对应 README 的「系统设计」章节，是给导师周期性汇报 RQ2 进度的载体。
> 当前为**骨架**，标注 `📝 TODO` 处需你手写充实。可运行原型见仓库 [`prototype/`](../prototype/)。
>
> This file mirrors the "System Design" section of the README and serves as the vehicle for reporting RQ2 progress to your advisor.
> It is currently a **scaffold**; spots marked `📝 TODO` are for you to fill in by hand. The runnable prototype lives in [`prototype/`](../prototype/).

---

## 1. 设计目标 · Design Goals

从 RQ2「如何设计支持多模态数据整合下医患协同意义建构的交互式仪表盘」推导：

Derived from RQ2 ("How should an interactive dashboard support collaborative sensemaking under multimodal data integration?"):

- **G1 · 多源对齐**：把纵向临床数据（MRI / EDSS / 复发）与患者自报体验（症状 / 生活影响）放在同一意义空间。
  **G1 · Cross-source alignment** — bring longitudinal clinical data (MRI / EDSS / relapse records) and patient-reported experiences (symptoms / life impact) into a shared space of meaning.
- **G2 · 协同推理**：界面服务于"医患一起看、一起解释"，而非各自视图。
  **G2 · Collaborative reasoning** — the interface should serve "looking and interpreting together", not two separate views.
- **G3 · 多模态录入与回看**：支持语音、身体地图、时间轴等多种自报模态。
  **G3 · Multimodal capture and review** — support multiple self-report modalities: voice, body map, timeline.
- **G4 · 复诊准备**：把分散体验收敛为可被复诊对话消耗的"回忆锚点"。
  **G4 · Visit preparation** — condense scattered experiences into "recall anchors" that the follow-up conversation can actually consume.

> 📝 TODO（手写）：把 G1–G4 与具体设计决策、评估指标一一对应；可加一张 design goals → features 映射表。
> 📝 TODO (by hand): Map G1–G4 one-to-one onto concrete design decisions and evaluation criteria; consider adding a design goals → features table.

## 2. 设计素材 / 探针 · Design Probe

当前原型 **Nomi 暖记（chronic-recall）** 作为早期设计探针，验证"症状回忆 + 身体地图 + 复诊准备"的核心闭环。

The current prototype **Nomi 暖记 (chronic-recall)** serves as an early design probe that validates the core loop of "symptom recall + body map + visit preparation".

### 2.1 屏幕与功能 · Screens

| 屏幕 · Screen | 功能 · Function | 对应设计目标 · Design goal |
|---|---|---|
| 选择人物 / Select | 多档案入口 / Multi-profile entry | 个性化 / Personalization |
| 工作台 / Workbench | 复诊窗口、温和记录提示（FR1）/ Visit window, gentle recording prompt (FR1) | G4 |
| 身体地图 / Body Map | 语音/文字症状 → 同步到身体部位 / Voice or text symptoms synced onto body regions | G1, G3 |
| 回忆锚点 / Recall Anchors | 标记"想留意的部分" / Mark what the patient wants to raise | G2, G4 |
| 时间表 / Timeline | 复诊窗口内症状波动 / Symptom fluctuation within the visit window | G1, G3 |

> 📝 TODO（手写）：补每个屏幕的截图 / 线框（建议放 `prototype/` 或 `docs/assets/`），并写交互细节（如语音→身体部位同步的具体机制）。
> 📝 TODO (by hand): Add a screenshot or wireframe per screen (suggest `prototype/` or `docs/assets/`), and describe interaction details such as the exact mechanism of syncing voice to body regions.

### 2.2 架构 · Architecture

```
患者自报输入 ──(语音/文字)──▶ 多模态解析 ──▶ 身体地图 / 时间轴 同步
                                          │
                                    回忆锚点提炼 ──▶ 复诊准备整理（localStorage）
                                          │
                        复诊对话 ──▶ 医患共同查看 / 协同意义建构
```

```
Patient self-report ──(voice/text)──▶ Multimodal parsing ──▶ Body map / timeline sync
                                                    │
                                          Recall-anchor distillation ──▶ Visit-prep summary (localStorage)
                                                    │
                      Follow-up dialogue ──▶ Joint review / collaborative sensemaking
```

> 📝 TODO（手写）：补全数据流图与模块职责；说明哪些在本地、哪些需服务端（隐私与 IRB 考量）。
> 📝 TODO (by hand): Complete the data-flow diagram and module responsibilities; clarify what stays local vs. what needs a server (privacy and IRB considerations).

## 3. 多模态交互 · Multimodal Interaction

- **语音 → 视觉**：口语化症状经解析落到身体地图的具体部位（降低录入门槛）。
  **Voice → visual** — colloquially phrased symptoms are parsed onto specific body regions, lowering the entry barrier.
- **空间表征**：用身体地图把"看不见的症状"空间化，便于医患指认。
  **Spatial representation** — the body map spatializes otherwise invisible symptoms so that clinician and patient can point at them together.
- **时间表征**：复诊窗口 + 症状波动时间轴，把纵向轨迹显式化。
  **Temporal representation** — the visit window plus a symptom-fluctuation timeline make the longitudinal trajectory explicit.

> 📝 TODO（手写）：讨论多模态整合如何具体促进"协同意义建构"（引用 related work 中的意义建构 / 可视化理论）。
> 📝 TODO (by hand): Discuss how multimodal integration specifically fosters collaborative sensemaking (cite sensemaking and visualization theory from the related work).

## 4. 设计理由与方法论 · Rationale

- 原型采用**参与式 / 迭代式**路线：先以探针收集医生反馈，再重设计。
  The prototype follows a **participatory and iterative** route: first collect clinician feedback with the probe, then redesign.
- 与 RQ1 形成闭环：RQ1 发现的障碍直接驱动 RQ2 的设计决策。
  It closes the loop with RQ1: obstacles surfaced by RQ1 directly drive RQ2 design decisions.

> 📝 TODO（手写）：写 design rationale 段落，明确本设计相对现有临床仪表盘的差异化；链接到 `related-work.md` 的缺口陈述。
> 📝 TODO (by hand): Write the design rationale paragraph, making explicit how this design differs from existing clinical dashboards; cross-link to the gap statement in `related-work.md`.

## 5. 当前状态与下一步 · Status & Next

- 状态：早期探针，待 RQ1 形成性发现驱动重设计。
  Status: an early probe, awaiting redesign driven by RQ1 formative findings.
- 下一步：基于访谈发现重构仪表盘主视图；评估多模态录入的可用性。
  Next: restructure the dashboard's main view based on interview findings; evaluate the usability of multimodal capture.

> 📝 TODO（手写）：每次汇报时更新本节。
> 📝 TODO (by hand): Update this section at every advisor report.
