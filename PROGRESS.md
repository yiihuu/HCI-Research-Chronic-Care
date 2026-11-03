# 项目进展 · Progress

> 面向外部的进展汇总；逐日流水见 [DEVLOG.md](./DEVLOG.md)。
> External-facing progress summary; day-by-day log in [DEVLOG.md](./DEVLOG.md).

**当前状态 · Status**：仓库框架搭建完成（README + docs 骨架 + 原型代码入库），全部文档已补齐中英对照。处于 IRB 准备 / 形成性研究摸底阶段。Repo scaffold done and all documents are now bilingual; IRB prep / formative study ongoing.

## 里程碑 · Milestones

<table>
  <thead>
    <tr><th>日期 · Date</th><th>改动 · Change</th></tr>
  </thead>
  <tbody>
    <tr>
      <td rowspan="6" style="color:#2f7d77;font-weight:700;vertical-align:top;white-space:nowrap;background:#eaf6f4;border-radius:6px;padding:6px 10px"><b>2026-11-03</b></td>
      <td>搭建仓库框架：README（双语 HCI 研究总览）+ docs/ 四章节骨架 + PROGRESS/DEVLOG。<br>Scaffolded the repo framework: README (bilingual HCI research overview) + four docs/ chapter scaffolds + PROGRESS/DEVLOG.</td>
    </tr>
    <tr>
      <td>原型代码 Nomi 暖记 / chronic-recall 入库 <code>prototype/</code>。<br>Added the Nomi 暖记 / chronic-recall prototype code under <code>prototype/</code>.</td>
    </tr>
    <tr>
      <td>私有研究笔记 <code>private/RESEARCH.md</code> 模板就位（gitignore）。<br>Set up the private research-notes template at <code>private/RESEARCH.md</code> (gitignored).</td>
    </tr>
    <tr>
      <td>预填 Related Work 主题轴线与 References 起始文献清单（来自本地 <code>论文相关/</code>）。<br>Pre-filled the Related Work thematic axes and the starter References list (drawn from the local <code>论文相关/</code> folder).</td>
    </tr>
    <tr>
      <td><b>公开发布 / Published</b>：仓库定名 <code>HCI-Research-Chronic-Care</code>（Public），已推送至 <a href="https://github.com/yiihuu/HCI-Research-Chronic-Care">github.com/yiihuu/HCI-Research-Chronic-Care</a>；<code>private/</code> 已验证未上传。<br><b>Published</b>: repository named <code>HCI-Research-Chronic-Care</code> (Public) and pushed to <a href="https://github.com/yiihuu/HCI-Research-Chronic-Care">github.com/yiihuu/HCI-Research-Chronic-Care</a>; <code>private/</code> was verified as not uploaded.</td>
    </tr>
    <tr>
      <td><b>双语化 / Bilingual pass</b>：按约定为 README 之外的全部文档补齐英文对照（docs/ 四章节、PROGRESS、DEVLOG、analysis/README）。<br><b>Bilingual pass</b>: added English counterparts throughout every document except the README (the four docs/ chapters, PROGRESS, DEVLOG, analysis/README), following the standing bilingual convention.</td>
    </tr>
  </tbody>
</table>

## 已搭建 · Scaffolded

- 仓库结构（README / docs / prototype / analysis / private）。
  Repository structure (README / docs / prototype / analysis / private).
- 研究章节骨架：system-design、methods、related-work、references（均含 📝 TODO 填空位）。
  Research chapter scaffolds: system-design, methods, related-work, references (each with 📝 TODO placeholders).
- 可运行原型（早期设计探针）。
  A runnable prototype (early design probe).

## 下一步 · Next

- 充实 `docs/methods.md`：访谈提纲、招募策略、主题分析编码示例。
  Flesh out `docs/methods.md`: interview guide, recruitment strategy, thematic-analysis coding examples.
- 充实 `docs/system-design.md`：把原型映射到 RQ2 + 交互流程图。
  Flesh out `docs/system-design.md`: map the prototype onto RQ2 and add interaction flow diagrams.
- 充实 `docs/related-work.md` 与 `references.md`：文献归类与统一引用格式。
  Flesh out `docs/related-work.md` and `references.md`: classify the literature and unify the citation format.
- 推进 IRB 提交与预访谈摸底。
  Advance the IRB submission and the pilot (informal probing) interviews.

## 更新约定 · Convention

代码 / 研究改动累积到一定量时，由维护者总结后更新本页。
Code and research changes are summarized into this page by the maintainer once they accumulate.

**双语约定 · Bilingual convention**：在任意 Markdown 中写入中文时，必须同时补上对应英文（标题写 `中文 · English`，正文中文一段、英文紧随其下一行）。私有笔记 `private/` 可保持纯中文。
Whenever Chinese is written into any Markdown file, the matching English must be added in the same commit (headings as `Chinese · English`; body text as a Chinese paragraph followed by its English counterpart). The private notes under `private/` may remain Chinese-only.
