# 归因林 · Attribution Grove（原型说明）

> 运行方式：直接用浏览器打开 `index.html`（纯静态，无依赖、无网络请求，数据存 localStorage）。
> How to run: open `index.html` in a browser (static, no dependencies, no network calls; data lives in localStorage).

## 三个视图 · Three views

| 视图 · View | 内容 · Content |
|---|---|
| 记录 · Record | 入口按钮 + 最近记录列表 |
| 树林 · Grove | 归因树（身体部位 → 症状 → 每次发作 → 触发 / 缓解） |
| 规律 · Patterns | 跨发作的触发关联 + 缓解有效性 |

## 三段式归因 · Three-stage attribution

| 步骤 · Step | 字段 · Fields | 必填 · Required |
|---|---|---|
| 1 感觉 · Feel | 身体部位 / 症状性质 / 情绪 / 程度 / 起始时间 | 部位、症状、程度 |
| 2 触发 · Trigger | 环境因素 / 心情因素 / 补充文字 | 可跳过 |
| 3 缓解 · Relief | 应对方式 / 效果 / 回看 | 效果 |

## 标签本体 · Tag ontology

依据 InterLeaf (CHI EA '26) Table 1，见 `ontology.js`。

| 类别 · Category | 本原型字段 · Field |
|---|---|
| body area | 身体部位（18 项，单选） |
| symptom | 症状性质（17 项，多选） |
| emotion | 情绪（14 项，多选，默认折叠） |
| trigger | 拆为「环境因素」（14 项）与「心情因素」（10 项）两轴 |
| coping | 应对方式（17 项） |

各轴均支持「+ 自定义」——对应 InterLeaf 的 "keep the original free-form label"。

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

- **点选而非书写**：标签本体化，一次归因 ≤ 6 次点击。
- **触发可跳过**：不确定时先记录、事后补，降低"必须想清楚"的压力。
- **情绪默认折叠**：非归因主链，作为可选补充。
- **回看区**：第 3 步实时显示前两步选择，确认后再保存。
- **可编辑标签**：自定义标签与本体标签同等对待。

## 待验证 · Open questions

📝 TODO（手写）：
- 三段顺序是否固定，是否允许事后补「缓解」。
- 「缓解」是否需要带有效性评分（当前为单选四档）。
- 标签集合是否需按病种细分。
- 跨发作层的聚合窗口与呈现形式。

## 相关文档 · Related

- [docs/system-design.md](../../docs/system-design.md)
- [note/interleaf-borrowing.md](../../note/interleaf-borrowing.md)
