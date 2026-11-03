# 系统设计 · System Design（RQ2）

> 本文件对应 README 的「系统设计」章节，是给导师周期性汇报 RQ2 进度的载体。
> 当前为**骨架**，标注 `📝 TODO` 处需你手写充实。可运行原型见仓库 [`prototype/`](../prototype/)。
>
> This file mirrors the "System Design" section of the README and serves as the vehicle for reporting RQ2 progress to your advisor.
> It is currently a **scaffold**; spots marked `📝 TODO` are for you to fill in by hand. The runnable prototype lives in [`prototype/`](../prototype/).

---

## 1. 设计目标 · Design Goals

从 RQ2 推导若干设计目标（例如低门槛归因、个人意义建构、情境显式化、反思回路）。
Derive design goals from RQ2 (e.g., low-effort attribution, personal sensemaking, context explicitness, reflection loop).

> 📝 TODO（手写）：列出并论证你的设计目标，与具体设计决策、评估指标一一对应。
> 📝 TODO (by hand): List and justify your design goals, mapping each onto concrete design decisions and evaluation criteria.

## 2. 设计素材 / 探针 · Design Probe

当前原型 **Nomi 暖记（chronic-recall）** 作为早期设计探针；下一步将"链接选择"前置为核心交互。
The current prototype **Nomi 暖记 (chronic-recall)** serves as an early design probe; the next step is to foreground **link-selection** as the core interaction.

### 2.1 屏幕与功能 · Screens

| 屏幕 · Screen | 功能 · Function | 对应设计目标 · Design goal |
|---|---|---|
| 📝 TODO | 📝 TODO | 📝 TODO |

> 📝 TODO（手写）：列出关键屏幕（如症状录入、链接选择、个人链接图、时间轴），补截图 / 线框与交互细节。
> 📝 TODO (by hand): List key screens (symptom entry, link selection, personal link graph, timeline), add screenshots / wireframes and interaction details.

### 2.2 架构 / Architecture

> 📝 TODO（手写）：画数据流图与模块职责；说明本地 vs 服务端、以及"链接"的数据结构（节点 / 边 / 置信度 / 时间戳）。
> 📝 TODO (by hand): Draw the data-flow diagram and module responsibilities; clarify local vs. server, and the data structure of a "link" (node / edge / confidence / timestamp).

## 3. 链接选择交互 · Link-Selection Interaction

核心交互：患者在症状与情境因子（环境 / 心情 / 活动）之间点选，建立可存储的显式链接，降低反思门槛。
Core interaction: the patient taps between a symptom and a context factor (environment / mood / activity) to build a storable explicit link, lowering the reflection barrier.

> 📝 TODO（手写）：讨论链接选择如何促进"个人意义建构"；说明情境因子初始集合如何由 RQ1 访谈发现确定。
> 📝 TODO (by hand): Discuss how link-selection fosters personal sensemaking; explain how the initial context-factor set is determined from RQ1 findings.

## 4. 设计理由与方法论 · Rationale

> 📝 TODO（手写）：写 design rationale，点明相对现有症状追踪 App（被动记录）的差异化，并链接 `related-work.md` 的缺口陈述。
> 📝 TODO (by hand): Write the design rationale, making explicit how this design differs from existing passive-logging symptom apps; cross-link to the gap statement in `related-work.md`.

## 5. 当前状态与下一步 · Status & Next

> 📝 TODO（手写）：每次汇报时更新本节（状态、下一步、里程碑日期）。
> 📝 TODO (by hand): Update this section at every advisor report (status, next steps, milestone dates).
