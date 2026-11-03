# 系统设计 · System Design（RQ2）

> 本文件对应 README 的「系统设计」章节，是给导师周期性汇报 RQ2 进度的载体。
> 当前为**骨架**，标注 `📝 TODO` 处需你手写充实。可运行原型见仓库 [`prototype/`](../prototype/)。
>
> This file mirrors the "System Design" section of the README and serves as the vehicle for reporting RQ2 progress to your advisor.
> It is currently a **scaffold**; spots marked `📝 TODO` are for you to fill in by hand. The runnable prototype lives in [`prototype/`](../prototype/).

---

## 1. 设计目标 · Design Goals

从 RQ2「如何设计链接选择交互，支持患者低成本建立症状—情境关联并促进个人反思」推导：

Derived from RQ2 ("How should a link-selection interaction be designed to support patients in building symptom–context links at low cost and to promote personal reflection?"):

- **G1 · 低门槛归因**：一键式把症状连到情境因子（环境 / 心情 / 活动），不要求自由文字负担。
  **G1 · Low-effort attribution** — one-tap linking of a symptom to a contextual factor (environment / mood / activity), with no free-text burden.
- **G2 · 个人意义建构**：患者亲手绘制的链接，汇成一张可回顾的个人症状—情境地图。
  **G2 · Personal sensemaking** — the links the patient draws accumulate into a revisitable personal symptom–context map.
- **G3 · 情境显式化**：把"环境 / 心情 / 活动"等做成可选择的情境节点，让隐性归因可见。
  **G3 · Context explicitness** — environment / mood / activity become selectable context nodes, making implicit attribution visible.
- **G4 · 反思回路**：随时间积累，模式自然浮现（如"我的疲劳常和天气相连"），支持回顾式反思。
  **G4 · Reflection loop** — over time, patterns emerge naturally (e.g., "my fatigue often links to weather"), supporting retrospective reflection.

> 📝 TODO（手写）：把 G1–G4 与具体设计决策、评估指标一一对应；可加一张 design goals → features 映射表（例如 G1 ↔ 点击式链接 UI、G4 ↔ 个人链接图时间视图）。
> 📝 TODO (by hand): Map G1–G4 one-to-one onto concrete design decisions and evaluation criteria; consider adding a design goals → features table (e.g., G1 ↔ tap-to-link UI, G4 ↔ temporal view of the personal link graph).

## 2. 设计素材 / 探针 · Design Probe

当前原型 **Nomi 暖记（chronic-recall）** 作为早期设计探针，验证"症状记录 + 身体地图 + 复诊准备"的闭环；下一步将把 **链接选择** 前置为核心交互。

The current prototype **Nomi 暖记 (chronic-recall)** serves as an early design probe that validates the loop of "symptom logging + body map + visit preparation"; the next step is to foreground **link-selection** as the core interaction.

### 2.1 屏幕与功能 · Screens

| 屏幕 · Screen | 功能 · Function | 对应设计目标 · Design goal |
|---|---|---|
| 症状录入 / Symptom entry | 记录当下症状（语音 / 文字）/ Record a present symptom (voice / text) | G1 |
| **链接选择 / Link selection（核心）** | 针对症状点击判定与环境/心情/活动的关联 / Tap to judge the symptom's link to environment / mood / activity | **G1, G3** |
| 身体地图 / Body Map | 症状落到身体部位（可选）/ Symptom placed on a body region (optional) | G3 |
| 个人链接图 / Personal link graph | 回顾症状—情境链接网络与浮现模式 / Review the symptom–context link network and emerging patterns | G2, G4 |
| 时间表 / Timeline | 症状与链接随时间的波动 / Symptom and link fluctuation over time | G4 |

> 📝 TODO（手写）：补每个屏幕的截图 / 线框（建议放 `prototype/` 或 `docs/assets/`），并写交互细节（如"点击症状 → 弹出情境因子 chips → 选中即建立链接"的具体机制）。
> 📝 TODO (by hand): Add a screenshot or wireframe per screen (suggest `prototype/` or `docs/assets/`), and describe interaction details such as the exact mechanism of "tap symptom → context-factor chips pop up → selecting creates a link".

### 2.2 架构 / Architecture

```
患者症状录入 ──(语音/文字)──▶ 症状节点
                                │
       情境因子（环境/心情/活动）◀── 链接选择（患者点击建立边）
                                │
                         个人链接图 ──▶ 模式浮现 / 回顾式反思（localStorage）
```

```
Patient symptom entry ──(voice/text)──▶ Symptom node
                                         │
   Context factors (environment/mood/activity) ◀── Link selection (patient taps to create edge)
                                         │
                          Personal link graph ──▶ Pattern emergence / retrospective reflection (localStorage)
```

> 📝 TODO（手写）：补全数据流图与模块职责；说明哪些在本地、哪些需服务端（隐私与 IRB 考量）；明确"链接"的数据结构（节点 / 边 / 置信度 / 时间戳）。
> 📝 TODO (by hand): Complete the data-flow diagram and module responsibilities; clarify what stays local vs. what needs a server (privacy and IRB considerations); specify the data structure of a "link" (node / edge / confidence / timestamp).

## 3. 链接选择交互 · Link-Selection Interaction

- **结构化归因 vs 自由记录**：患者不必写长文，只需在症状与情境因子间点选，把"我感觉这次不舒服可能和天气有关"变成一条可存储的显式链接。
  **Structured attribution vs. free logging** — instead of writing prose, the patient taps between a symptom and a context factor, turning "I think this flare is weather-related" into a storable explicit link.
- **情境因子的分类法**：环境（天气 / 温度 / 噪音）、心情（焦虑 / 低落 / 平静）、活动（运动 / 久坐 / 社交）等作为可扩展的情境维度。
  **Taxonomy of context factors** — environment (weather / temperature / noise), mood (anxious / low / calm), activity (exercise / sitting / social) as extensible context dimensions.
- **低认知负荷**：每次只处理"一个症状 ↔ 一个情境"的微小决策，避免一次性反思的负担。
  **Low cognitive load** — each interaction is a tiny decision of "one symptom ↔ one context", avoiding the burden of one-shot reflection.

> 📝 TODO（手写）：讨论链接选择如何具体促进"个人意义建构"（引用 related work 中的反思支持 / personal informatics 理论）；说明情境因子的初始集合如何确定（来自 RQ1 访谈发现）。
> 📝 TODO (by hand): Discuss how link-selection specifically fosters personal sensemaking (cite reflection-support / personal-informatics theory from the related work); explain how the initial set of context factors is determined (from RQ1 interview findings).

## 4. 设计理由与方法论 · Rationale

- 原型采用**参与式 / 迭代式**路线：先以探针收集患者反馈，再重设计。
  The prototype follows a **participatory and iterative** route: first collect patient feedback with the probe, then redesign.
- 与 RQ1 形成闭环：RQ1 发现的归因障碍 / 心智模型直接驱动 RQ2 的链接选择设计决策。
  It closes the loop with RQ1: the attribution obstacles and mental models surfaced by RQ1 directly drive RQ2 link-selection design decisions.

> 📝 TODO（手写）：写 design rationale 段落，明确本设计相对现有症状追踪 App（被动记录）的差异化；链接到 `related-work.md` 的缺口陈述。
> 📝 TODO (by hand): Write the design rationale paragraph, making explicit how this design differs from existing symptom-tracking apps (passive logging); cross-link to the gap statement in `related-work.md`.

## 5. 当前状态与下一步 · Status & Next

- 状态：早期探针，待 RQ1 形成性发现驱动"链接选择"前置重设计。
  Status: an early probe, awaiting RQ1 formative findings to drive the redesign that foregrounds link-selection.
- 下一步：基于访谈发现定义情境因子分类 → 重构原型主交互为链接选择 → 评估点击式归因的可用性。
  Next: define the context-factor taxonomy from interview findings → restructure the prototype's main interaction into link-selection → evaluate the usability of tap-to-attribute.

> 📝 TODO（手写）：每次汇报时更新本节。
> 📝 TODO (by hand): Update this section at every advisor report.
