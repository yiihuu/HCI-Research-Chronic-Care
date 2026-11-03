# 开发 / 研究日志 · Devlog

> 公开的工作记录，用于自我督促与进度追踪。深层研究思路见私有笔记（不在此公开仓库）。
> Public working log for self-accountability and progress tracking. Deep research thinking lives in private notes (not pushed).

## 2026-11-03
- **仓库框架搭建 / Scaffold**：仿 `ai-ing-hub` 流程，建立研究+开发一体仓库。结构：README（双语 HCI 研究总览）、PROGRESS（对外里程碑）、DEVLOG（本文件）、docs/（system-design / methods / related-work / references 四章节骨架）、prototype/（Nomi 暖记原型代码）、analysis/（分析材料索引）、private/（私有笔记，已 gitignore）。
  Mirrored the `ai-ing-hub` workflow to build a single repository that unifies research and development: README (bilingual HCI research overview), PROGRESS (external milestones), DEVLOG (this file), docs/ (scaffolds for system-design / methods / related-work / references), prototype/ (Nomi 暖记 prototype code), analysis/ (analysis material index), private/ (private notes, gitignored).
- **定位 / Framing**：以设计导向 HCI 研究为主线；RQ1 形成性访谈 + 主题分析，RQ2 迭代式原型设计。案例为多发性硬化症（MS）。
  Framing: design-oriented HCI research as the spine — RQ1 formative interviews plus thematic analysis, RQ2 iterative prototype design, with Multiple Sclerosis (MS) as the case.
- **原型入库 / Prototype in**：把 `chronic-recall/`（Nomi 暖记）当前版本拷入 `prototype/` 作为早期设计探针。
  Copied the current `chronic-recall/` (Nomi 暖记) version into `prototype/` as an early design probe.
- **文献预填 / References seed**：从本地 `论文相关/` 提取 CHI 文献标题，预填 `related-work.md` 五条主题轴线与 `references.md` 起始清单。
  Extracted CHI paper titles from the local `论文相关/` folder and pre-filled the five thematic axes in `related-work.md` plus the starter list in `references.md`.
- **已发布 / Published**：仓库定名为 `HCI-Research-Chronic-Care`（Public），已推送至 https://github.com/yiihuu/HCI-Research-Chronic-Care 。`private/` 经 GitHub API 验证确认未上传。
  Named the repository `HCI-Research-Chronic-Care` (Public) and pushed it to https://github.com/yiihuu/HCI-Research-Chronic-Care . `private/` was verified via the GitHub API as not uploaded.
- **工具链备注 / Toolchain**：本机未独立安装 Git for Windows，git 由 WorkBuddy 自带 PortableGit 提供（`D:\002AI\workbuddy\resources\vendor\PortableGit\`），故无独立「Git Bash」窗口；GitHub 凭据由系统级 GCM（credential.helper=manager）缓存，日常 `git push` 可直接用。
  Toolchain note: Git for Windows is not installed separately on this machine; git comes from WorkBuddy's bundled PortableGit (`D:\002AI\workbuddy\resources\vendor\PortableGit\`), so there is no standalone Git Bash window. GitHub credentials are cached by the system-level GCM (credential.helper=manager), so `git push` works directly.
- **双语化 / Bilingual pass**：确立"中文改动自动补英文"约定，并回填 README 之外全部文档的英文对照（docs/ 四章节、PROGRESS、DEVLOG、analysis/README）。
  Established the standing convention of pairing every Chinese edit with an English counterpart, and backfilled English for all documents except the README (the four docs/ chapters, PROGRESS, DEVLOG, analysis/README).
- **下一步 / Next**：手写充实 docs 四章节（每次给导师汇报的内容）；推进 IRB 与预访谈。
  Next: hand-write the four docs/ chapters (the material reported to the advisor each round); advance the IRB and pilot interviews.
- **研究转向（晚）/ Pivot (eve)**：用户明确放弃"系统/医患协同意义建构"，改为"患者端慢病自我管理 + 链接选择（link-selection）交互"——例：发现症状→点击判定与环境/心情的关联。案例由 MS **泛化到一般慢性病**。已重构 README 与 docs/{system-design,methods,related-work} 框架（RQ1 改患者侧需求、RQ2 改链接选择、related-work 轴线重排、SDM 降为背景）；仓库名 `HCI-Research-Chronic-Care` 仍适用。
  Pivot (eve): the user dropped "system / clinician–patient collaborative sensemaking" in favour of "patient-side chronic-disease self-management + link-selection interaction" — e.g., notice a symptom → tap to judge its link to environment/mood. The case generalized from MS to chronic disease broadly. Reframed README and docs/{system-design,methods,related-work} (RQ1 → patient-side needs, RQ2 → link-selection, related-work axes reordered, SDM demoted to background); the repo name `HCI-Research-Chronic-Care` still fits.
- **已知 / Known**：仓库位于 OneDrive 同步目录（`newresearch/`）。为避免 `.git` 与 OneDrive 实时同步冲突，**请勿在多台设备同时打开编辑**；大文件（录音/转录）走 `analysis/raw/`、`analysis/transcripts/`（已 gitignore）或外部存储，勿直接入库。
  Known: the repository lives inside the OneDrive-synced folder (`newresearch/`). To avoid `.git` conflicting with OneDrive's real-time sync, **do not edit it on multiple devices at once**; keep large files (recordings, transcripts) in `analysis/raw/` and `analysis/transcripts/` (gitignored) or in external storage rather than committing them.
- **待决 / Open**：仓库名与首版框架已定稿；后续专注手写 docs/ 四章节。
  Open: the repository name and the first framework are settled; the remaining work is hand-writing the four docs/ chapters.
