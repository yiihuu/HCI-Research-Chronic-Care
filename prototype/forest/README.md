# 归因林 · Attribution Grove（原型说明）

> 在线 · Live: http://8.148.233.53/grove/
> 本地 · Local: 用浏览器打开 `index.html`（纯静态，无依赖、无网络请求，数据存 localStorage）。
> Live: http://8.148.233.53/grove/ — Local: open `index.html` in a browser (static, no dependencies, no network calls; data lives in localStorage).

## 视图 · Views

| 视图 · View | 内容 · Content |
|---|---|
| 归因林 · Grove | 归因树 + 正在生长的枝 + 候选叶子 |
| 记录 · Record | 入口按钮 + 最近记录列表 |
| 规律 · Patterns | 跨发作的触发关联 + 缓解有效性 |

## 生长式交互 · Grow-in-place interaction

| 阶段 · Stage | 枝上位置 · Node | 候选来源 · Candidates | 可跳过 · Skippable |
|---|---|---|---|
| ① 部位 · Area | 树的主干 · Trunk | body area 18 项 + 自定义 | 否 |
| ② 感觉 · Symptom | 第 1 节 · 1st node | symptom 17 项 + 自定义 | 否 |
| ③ 触发 · Trigger | 第 2 节 · 2nd node | env 14 项 + mood 10 项 + 自定义 | 是 |
| ④ 缓解 · Coping | 第 3 节 · 3rd node | coping 17 项 + 自定义 | 是 |
| ⑤ 效果 · Relief | 第 4 节 · 4th node | relief 4 档 | 是 |

| 动作 · Action | 机制 · Mechanism |
|---|---|
| 点树干上的 ＋ | 从该树长出新枝 · New branch from that tree |
| 点地面的 ＋ | 长出一棵新树（先选部位）· New tree from the ground |
| 点枝头的叶子 | 该叶子收拢到枝上，枝条继续往外长 · Leaf attaches, branch keeps growing |
| 点旧阶段的叶子 | 补选，不推进阶段 · Back-fill without advancing |
| 点 ＋ （阶段节点上方） | 重新打开该阶段的候选 · Re-open a passed stage |
| 点「更多…」 | 展开全部本体标签 · Expand the full ontology |
| 点「＋ 自己写一个」 | 在枝上就地输入自定义标签 · Free-form label in place |
| 点枝上的圆点 | 展开时间 / 程度 / 情绪 / 备注 · Optional detail popover |

## 标签本体 · Tag ontology

依据 InterLeaf (CHI EA '26) Table 1，见 `ontology.js`。
Based on InterLeaf (CHI EA '26) Table 1, see `ontology.js`.

| 类别 · Category | 本原型字段 · Field |
|---|---|
| body area | 身体部位（18 项，单选） |
| symptom | 症状性质（17 项，多选） |
| emotion | 情绪（14 项，选填，细节浮层内） |
| trigger | 拆为「环境因素」（14 项）与「心情因素」（10 项）两轴 |
| coping | 应对方式（17 项） |

## 候选排序 · Candidate ordering

| 规则 · Rule | 说明 · Note |
|---|---|
| 个人频次优先 · Personal frequency first | 自己身上出现过的标签排在前面 |
| 默认 6 项 + 「更多…」 · 6 by default | 其余靠「更多…」展开 |
| 自定义标签回填 · Custom labels reused | 历史自定义标签进入候选池 |

## 跨发作层 · Cross-episode layer

| 元素 · Element | 含义 · Meaning |
|---|---|
| 同一标签之间的淡色竖线 · Faint thread | 该标签在多次发作中反复出现 |
| 规律视图 · Patterns tab | 触发 → 症状共现、缓解有效性 |

## 数据模型 · Data model

```js
{
  id, ts,                 // 标识与时间戳
  area,                   // 身体部位（单选）
  symptoms: [],           // 症状性质
  emotions: [],           // 情绪
  severity,               // 程度 light / medium / heavy
  env: [], mood: [],      // 环境触发 / 心情触发
  copings: [],            // 应对方式
  relief,                 // 缓解效果 helped / partial / none / pending
  note                    // 补充文字
}
```

## 交互决策 · Interaction decisions

| 决策 · Decision | 取值 · Choice |
|---|---|
| 录入形式 · Entry | 画布上生长，不弹表单 · Grow on canvas, no form |
| 多选 · Multi-select | 同一节上分出多根枝 · Several twigs from one node |
| 阶段推进 · Advance | 点当前阶段的叶子才推进 · Only current-stage leaves advance |
| 触发可跳过 · Trigger skippable | 是 |
| 候选个性化 · Personalised | 按个人频次排序 |
| 情绪 · Emotion | 降级为可选细节 · Demoted to optional detail |

## 待验证 · Open questions

📝 TODO（手写）：
- 三段顺序是否固定，是否允许事后补「缓解」。
- 「缓解」是否需要带有效性评分（当前为单选四档）。
- 标签集合是否需按病种细分。
- 跨发作层的聚合窗口与呈现形式。
- 生长式交互是否比表单更快、更少被中途放弃。

## 相关文档 · Related

- [docs/system-design.md](../../docs/system-design.md)
- [note/interleaf-borrowing.md](../../note/interleaf-borrowing.md)
