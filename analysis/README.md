# 数据分析材料索引 · Analysis

> 本目录用于存放本研究的数据分析脚本与（脱敏后）数据。
> This folder holds data-analysis scripts and de-identified data.

## 当前内容 · Current
- 暂为空骨架。方法学参考保留在本地 `newresearch/Analysis/`：
  - `Book_SaldanaCodingManualForQualResearch.pdf` — 编码手册（质性分析）
  - `Using-thematic-analysis-in-psychology-1.pdf` — 主题分析原文（Braun & Clarke）
  - `RAY_seminar_code/` — RAY seminar 统计/可视化示例（t-test / ANOVA / Likert），作方法学参考

## 注意事项 · Notes
- **原始数据勿入库**：访谈录音、转录、临床数据属敏感材料，放在 `analysis/raw/` 与 `analysis/transcripts/`，已被根 `.gitignore` 忽略，永不推送。
- 仅脱敏后的编码表示例、聚合统计可纳入版本控制。
- 建议使用质性分析工具（如 Taguette / NVivo / 手写）并保留审计轨迹。

## 计划结构 · Planned Layout（待建）
```
analysis/
├── README.md
├── scripts/        # 分析脚本（R / Python）
├── codes/          # 编码表 / 主题框架（脱敏）
├── figures/        # 生成图表
├── raw/            # 原始数据（gitignored）
└── transcripts/    # 转录稿（gitignored）
```
