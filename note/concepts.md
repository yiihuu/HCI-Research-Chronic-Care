# 概念梳理 · Concept Notes

> 本笔记梳理 HCI 研究方法论的核心概念，来源有二：(1) 一套方法论课程讲义（标注为 PROOF OF CONCEPT / STUDY DESIGN / DATA COLLECTION）；(2) RTD（Research Through Design）相关文献。
> This note organizes core concepts of HCI research methodology from two sources: (1) a set of methodology lecture slides (tagged PROOF OF CONCEPT / STUDY DESIGN / DATA COLLECTION); (2) literature on Research Through Design (RTD).
>
> 目的：把这些"方法工具箱"与我们的课题（患者端慢性病自我管理 + 链接选择交互）对应起来，方便后续写论文方法章与 poster。
> Purpose: to map this "methods toolbox" onto our own project (patient-side chronic-disease self-management + link-selection interaction), for use in the methods chapter and the poster.

> **相关笔记 Companion**：[`research-design.md`](./research-design.md)（研究范式 / 12 项规划决策 / 设计与问题的错配 / 伦理）· [`README.md`](./README.md)（笔记索引）
> **Related**: `research-design.md` (paradigms / twelve planning decisions / design–question mismatches / ethics) · `README.md` (note index)

📝 TODO（手写）：本笔记是**可读性优先的梳理**，不是论文正文。后续请把与导师确认后的术语、引用页码、以及我们自己研究的实际选择填进来。

---

## 1. 研究范式 · Research Paradigms

### 1.1 RTD（Research Through Design，通过设计做研究）· RTD

- **定义**：把"设计实践本身"当作一种合法的知识生产方式——设计物（原型）不只是用来演示，而是承载并质询某个概念、产出可被同行评议的"设计知识"。
  **Definition**: treats "design practice itself" as a legitimate mode of knowledge production—the design artifact (prototype) is not merely a demo but embodies and interrogates a concept, producing peer-reviewable "design knowledge."
- **与 Proof of Concept 的关系**：RTD 认为"概念验证型原型"本身就是研究贡献。这正好与下方 Mankoff 框架里"发明型研究的三个部分"形成互补——RTD 强调第二步（proof of concept）产出的 artifact 即知识载体，而非只为第三步"additional validation"做铺垫。
  **Relation to Proof of Concept**: RTD holds that the proof-of-concept artifact *is* the research contribution. This complements the Mankoff "three parts of inventive research" below—RTD stresses that step 2 (proof of concept) yields knowledge-bearing artifacts, not merely a setup for step 3.
- **典型方法/产出**：annotated portfolio（带注解的作品集）、cultural probes、technology probes。
  **Typical methods/outputs**: annotated portfolio, cultural probes, technology probes.
- **关键文献（通用知识，非本批截图）**：Zimmerman, Stolterman & Forlizzi (2010) *An Analysis and Critique of Research through Design*; Fallman (2003, 2008); Gaver (2012)。
  **Key references (general knowledge, not from these slides)**: Zimmerman, Stolterman & Forlizzi (2010); Fallman (2003, 2008); Gaver (2012).

### 1.2 发明型 HCI 研究 · Inventive HCI Research

- 来源：Mankoff (2014). *Concepts, Values, and Methods for Technical HCI Research*. In *Ways of Knowing in HCI*（讲义截图第 339、356 页）。
  Source: Mankoff (2014), in *Ways of Knowing in HCI* (lecture slides pp. 339, 356).
- 这类研究关心"我们能否造出某种新技术、它是否work"，区别于纯经验研究。
  This strand asks "can we build a new technology and does it work," distinct from purely empirical studies.

---

## 2. 概念验证 · Proof of Concept

### 2.1 发明型研究的三个部分 · Inventive research has three parts


- **① 概念创造 Concept creation**：设想一种连接"技术"与"人的需求"的新方式。
  Devise a new way to bridge technology and human needs.
- **② 概念验证 Proof of concept**（图中高亮）：至少部分实现它，证明"它可行"。
  Implement it, at least partly, to show that it works. *(highlighted in the slide)*
- **③ 额外验证 Additional validation**：展示该贡献所宣称的具体价值。
  Show the specific value the contribution claims.

### 2.2 原型概念从哪来 · Where prototype concepts come from

- **需求优先 Needs-first**：从已观察到的需求出发，找技术去满足它。
  From an observed need, find technology to meet it.
- **技术优先 Technology-first**：先深度掌握某项技术，再找它能服务的需求；无论起点如何，发明价值最终由其"对需求的影响"衡量。
  Build deep expertise in a technology, then find needs it can serve; value is judged by effect on needs regardless of starting point.
- **混合 Hybrid**：同步追踪需求与技术，常为已有事物找到新用途。
  Track needs and technologies together; often finds new uses for existing things.
- **障碍驱动 Roadblock-driven**：直接瞄准阻碍进展的环节，常产出工具类发明。
  Target what blocks progress directly; often produces tools.

📝 TODO（手写）：我们课题的概念来源属于哪一类/哪几类混合？（提示：链接选择既可看作"需求优先"——回应患者难做症状归因；也可看作对"自追踪/个人信息化"已有思路的新用途挖掘，偏 Hybrid。）

### 2.3 该造多少：健壮性层级 · How much to build — levels of robustness


- **两个维度 Two dimensions**：
  - 功能范围 Scope of function：从"只做新东西"，到"真实场景所需的支撑功能"。
    From only what is new, to the supporting functions needed for realistic settings.
  - 平台 Platform：从脚本/原型工具，到生产级平台。
    From scripting/prototyping tools, to production-grade platforms.
- **更健壮的代价 The cost of more robustness**：每往上爬一级都耗费巨大；部署近乎产品级完整度，且大多与"发明"本身无关；这种投入未必增加新知识，部署还会引入与核心创意无关的混淆变量。要求每个发明都做到最大健壮度会拖慢整个领域——**应刻意选择权衡点**。
  Each step up costs much more effort; deployment needs near product-level completeness, mostly unrelated to the invention; that effort may add little new knowledge, and deployments add confounds unrelated to the core idea. Requiring maximum robustness for every invention would slow the field—choose the trade-off deliberately.
- **健壮性层级（由低到高，控制力递减、成本递增）Levels of robustness** *(lower = less control, higher = more cost)*：
  1. 文字描述 Description in prose
  2. 照片/截图 Photos or screenshots
  3. 使用视频 Video of it in use
  4. 现场演示 Live demonstration
  5. 用户测试 Testing with users
  6. 独立使用的部署 Deployment for independent use

📝 TODO（手写）：我们当前的 Nomi 暖记 / chronic-recall 原型（活动代号 Constellink）处于哪一层？建议定位于"截图/视频/小规模用户测试"，避免过度工程化。

---

## 3. 研究设计分组 · Study Design Groups

讲义把 HCI 研究设计分为若干"组（Group）"，本批截图含 **Group 1 / 2 / 4 / 5**（Group 3 不在本批图内，留待补充）。
The lecture groups HCI study designs into clusters; this batch covers **Group 1 / 2 / 4 / 5** (Group 3 is absent from these slides—to be added later).

### 3.1 Group 1 · 技术评估 Technical evaluation


- **问题**：系统是否如其所宣称的那样工作——准确、低延迟、健壮、模型决策质量是否够好？
  Does the system do what it claims, accurately and reliably enough?
- **做法**：定义阈值；构建独立于开发数据的测试协议；在匹配条件下重复运行；报告指标；随后接用户研究。
  Define thresholds; build a test protocol separate from development data; run repeated runs under matched conditions; report metrics; follow with a user study.
- **内部用到的方法 Within it**：数据收集＝交互日志（性能指标）、视频观察试次；数据分析＝错误分析（error analysis）。
  Data collection: interaction logging (performance metrics), observation (video-recorded) of trials. Data analysis: error analysis.

### 3.2 Group 2 · 受控实验 Controlled experiment


- **问题**：比起基线，人们用该系统是否表现/体验更好？
  Do people perform or experience better with the system than with a baseline?
- **做法**：在"其他一切不变"下比较系统与基线；被试间/被试内设计；提前确定结果指标；用置信区间报告效应量。
  Compare system vs. baseline while everything else is held constant; between-/within-subjects; define outcome measures in advance; report effect sizes with confidence intervals.
- **内部用到的方法 Within it**：数据收集＝标准化问卷、交互日志、视频观察、半结构化访谈（结束后）；数据分析＝估计（效应量）、行为编码、主题分析。
  Data collection: standardised questionnaires, interaction logging, observation, semi-structured interviews (post-session). Data analysis: estimation (effect sizes), behavioural coding, thematic analysis.

### 3.3 Group 4 · 专家评审 / 启发式评估 Expert review / heuristic evaluation


- **问题**：合格专家是否判断该系统或其产出"可用且恰当"？
  Do qualified experts judge the system or its outputs as usable and appropriate?
- **做法**：专家（非终端用户）依据明确标准评审界面（启发式评估）；或从业者判断恰当性；在可比较的输出上做盲评更有帮助。
  Experts (not end users) judge the system/outputs against explicit criteria (heuristic evaluation); or practitioners judge appropriateness; blinding helps where outputs are comparable.
- **内部用到的方法 Within it**：数据收集＝评分量表/问卷、同步出声思考（concurrent think-aloud）、半结构化访谈；数据分析＝估计（效应量与 CI）、主题分析。
  Data collection: rating scales/questionnaires, concurrent think-aloud, semi-structured interviews. Data analysis: estimation (effect sizes & CIs), thematic analysis.

### 3.4 Group 5 · 田野部署 / 真实场景研究 Field deployment (in-the-wild)


- **问题**：系统在真实场景中是否被使用、是否重要——随着时间推移？
  Is the system used, and does it matter, in its real setting over time?
- **做法**：在真实环境用数天到数周（而非一次实验室会话）；以控制力换取生态效度；技术探针（technology probe）是面向家庭环境的轻量版本。
  Used in its real setting over days/weeks, not one lab session; trades control for ecological validity; a technology probe is a lightweight version for homes.
- **内部用到的方法 Within it**：数据收集＝交互日志、经验取样（ESM）、日记研究、半结构化访谈（进入/退出）；数据分析＝主题分析、联合展示（mixed-methods 整合）、估计（效应量与 CI）。
  Data collection: interaction logging, ESM, diary study, semi-structured interviews (entry/exit). Data analysis: thematic analysis, joint display (mixed-methods integration), estimation (effect sizes & CIs).

---

## 4. 数据收集方法 · Data Collection Methods

### 4.1 半结构化访谈 · Semi-structured interviews


- **是什么**：开放式问题＋追问＋留出跟进空间；捕捉行为背后的原因、经验与解读。
  A mix of open questions and probes, with room for follow-ups; captures reasons, experiences and interpretations behind behaviour.
- **怎么做**：起草简短灵活的提纲（约 4–6 个问题）；招募 1–2 人做 pilot；进行约 20–30 分钟录音会话；转写并编码（如主题分析）；报告模式、样本引文与值得注意的个案。
  Draft a short flexible guide (~4–6 questions); recruit 1–2 for piloting; run ~20–30 min recorded sessions; transcribe and code (e.g., thematic analysis); report patterns, sample quotes, notable cases.

### 4.2 刺激性回忆 / 回溯式出声思考 · Stimulated recall / retrospective think-aloud


- **是什么**：参与者观看自己活动的录影，说出当时注意到、想到、打算做什么；不打断任务；锚定在具体时刻；但属于"回溯式重建"，并非思维的直接记录。
  Participants watch a recording of their own activity and say what they noticed, thought and intended; does not disrupt the task; anchored in concrete moments; but accounts are retrospective reconstructions, not direct records of thought.
- **怎么做**：带时间戳录制会话；按既定标准挑选片段；结束后尽快回放、用非引导性提示；记录回忆并链接到时间戳；与行为一并分析（如联合展示）。
  Record the session with timestamps; select episodes by criteria; replay soon after with non-leading prompts; record the recall and link to timestamps; analyse alongside behaviour (e.g., joint display).

### 4.3 标准化问卷 · Standardised questionnaires


- **是什么**：用经过验证的量表，跨参与者一致地测量可用性、工作负荷、信任、亲密度、能动性（agency）或临场感；结果可在不同条件及其他研究间比较。例如 SUS、NASA-TLX、UEQ、Godspeed（机器人感知）。
  Validated scales measure usability, workload, trust, closeness, agency or presence consistently; results comparable across conditions and studies. E.g., SUS, NASA-TLX, UEQ, Godspeed.
- **怎么做**：把每个 RQ 构念映射到验证过的量表；按原版使用（必要时回译）；在设计中安排施测时机；保持题量简短；按规范计分并报告信度（Cronbach's α）。
  Map each RQ construct to a validated scale; use as published (back-translate if needed); time administration to the design; keep the battery short; score as specified; report reliability (Cronbach's α).

### 4.4 经验取样（ESM）＋交互日志 · ESM and interaction logging


- **是什么**：系统记录带时间戳的事件；ESM 再叠加简短的"当下"提示；既得客观行为，又得贴近发生时刻的主观体验。
  The system logs events with timestamps; ESM adds brief in-the-moment prompts; gives objective behaviour plus experience captured close to when it happens.
- **怎么做**：在搭建前就从 RQ 定义要记录的事件；跨设备使用同步时间戳；在体验重要的地方加简短现场提示；在 pilot 中检查完整性；导成可分析、并链接参与者 ID 的格式。
  Define events to log from the RQs before building; synchronize timestamps; add short in-situ prompts; check completeness in pilot; export in an analysable format linked to participant IDs.

### 4.5 视频观察 · Observation (video-recorded)


- **是什么**：用视频观察并记录会话（房间视角/第一人称/屏幕）；保留日志与记忆会漏掉的时机、视线、手势与言语；便于后续做刺激性回忆与行为编码。
  Sessions observed and recorded on video (room / first-person / screen); keeps timing, gaze, gesture and talk that logs and memory miss; enables stimulated recall and behavioural coding later.
- **怎么做**：布置机位覆盖所有参与者与系统；视频与日志、音频同步；取得录制及后续使用的同意；在 pilot 中测试覆盖与收音；安全存储并规划匿名化。
  Place cameras to cover all participants and the system; synchronize video with logs and audio; get consent for recording and later use; test coverage and audio in pilot; store securely; plan anonymisation.

---

## 5. 与本课题的对应 · Mapping to Our Project

> 课题定位（见 `README.md`）：患者端慢性病自我管理中的**链接选择**交互——用户发现症状后，点击判定该症状与情境因子（环境/心情/活动等）的关联。
> Project framing (see `README.md`): **link-selection** interaction in patient-side chronic-disease self-management—after noticing a symptom, the user taps to judge its link to a contextual factor (environment / mood / activity…).

| 方法 / 设计 · Method | 我们课题的落点 · Where it lands in our project | 当前状态 · Status |
|---|---|---|
| 半结构化访谈（§4.1） | RQ1 形成性研究：挖患者归因的需求/障碍/心智模型。我们已录 **3 段访谈**（2026-07-15 / 09-21 / 10-20），**待转写**。 | 📝 TODO（实证）未转写 |
| 标准化问卷（§4.3） | 预筛选问卷已含 PHQ-8 / GAD-7 / WHO-5、改编 PRMQ（记忆）、TBQ/PETS（治疗负担）。属"基线特征＋心理负荷"测量。 | 已收集，未分析 |
| 概念验证（§2） | RQ2：链接选择原型 = Nomi 暖记 / chronic-recall（活动代号 **Constellink**）。现处"截图/视频/小规模用户测试"层。 | 原型存在 |
| 专家评审（§3.3） | 后续可请 HCI/临床专家盲评链接选择界面的恰当性与可用性。 | 待规划 |
| 田野部署（§3.4） | 远期：把链接选择探针交给患者真实使用数周，用 ESM＋日志看长期归因行为。 | 远期 |
| 刺激性回忆（§4.2） | 可让用户回看自己在原型中的操作录屏，说出"当时为什么这样连"。 | 可纳入用户测试 |
| 技术评估（§3.1） | 链接数据模型（症状↔情境节点）的准确率/一致性，可离线验证。 | 视原型而定 |

**建议的论证链（写论文/poster 时用）Suggested argument chain**:
1. RQ1 用**半结构化访谈＋标准化问卷**做形成性研究，建立"患者难把症状连到情境"的需求与障碍（个人信息化/反思支持的缺口）。
2. RQ2 用 **RTD 思路＋概念验证**产出链接选择原型——artifact 本身即贡献。
3. 验证按"克制原则"（§2.3）选层级：先专家评审/小规模用户测试，不急于部署。
4. 远期再做田野部署（§3.5 对应 §3.4），用 ESM＋日志评估真实世界价值。

---

## 6. 参考文献 · References

**来自截图（可核对原文页码）· From the slides (verify page numbers against source)**:
- Mankoff (2014). *Concepts, Values, and Methods for Technical HCI Research*. In *Ways of Knowing in HCI*. （截图 p.339, 356）
- 技术评估相关：UIST '07 *Evaluating User Interface Systems Research*; *Best Practices for Policy Evaluation* （截图 p.356）
- 受控实验相关：*Human-Computer Interaction* (2nd ed.); *An Empirical Research Perspective*; *Lab and Field Evaluations* (MobileHCI); *Robot Learning as an Empirical Science: Best Practices for Policy Evaluation* (2024); *Modern Statistical Methods for HCI* （截图 p.356+）
- 专家评审：*Behavioural Research Methods* 34(4); *Interfaces*, CHI '90 （截图 p.359）
- 田野部署：*Lab and Field Evaluations* (MobileHCI '14); *Inspiring Design for and with Families*, CHI '03 （截图 p.360）
- 半结构化访谈：[1, 5]
- 刺激性回忆：[3, 4, 6] — *British J. Educ. Psychol.* 51(2); *Video-Stimulated Interviewing*; van den Haak, de Jong & Schellens (2003) *Retrospective vs. Concurrent Think-Aloud Protocols*, Behav. Inf. Technol. 22(5)
- 标准化问卷：[15, 31–34] — Limerick, Coyle & Moore (2014) *Experience of Agency in HCI*, Front. Hum. Neurosci.; Harms & Biocca (2004) *Networked Minds Measure of Social Presence*
- ESM：[22] — *Using the Experience Sampling Method to Evaluate Ubicomp Applications*, IEEE Pervasive Comput. 2(2)
- 视频观察：[9]

**RTD 通用文献（非截图）· RTD general references (not from slides)**:
- Zimmerman, J., Stolterman, E., & Forlizzi, J. (2010). *An Analysis and Critique of Research through Design*. In HCI.
- Fallman, D. (2003, 2008). *Design-oriented Human-Computer Interaction*; *The Interaction Design Research Triangle*.
- Gaver, B. (2012). *What should we expect from research through design?*

📝 TODO（手写）：把上述引用补全为统一 ACM / BibTeX 格式，并并入 `docs/references.md`。确认讲义的原始出处（课程/教材名）后补入。
