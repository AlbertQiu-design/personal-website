# 作品集改版：从「AI 产品经理」改为「商业分析 + Digital Solutions」

## Context
上一版网站定位是「懂设计、能动手的 AI 产品经理」。这次要改成同时面向两类岗位：**商业 / 系统分析（BA）** 和 **数字化解决方案工程（Digital Solutions Engineering，下文简称 DSE）**。依据的是两份新简历（`src/imports/Albert_Qiu_BA_Business_Systems_Analysis.pdf`、`src/imports/Albert_Qiu_Digital_Solutions_Engineering.pdf`）。

简历中和当前网站不一致的事实（以简历为准）：
- 新增实习：**MCJ Design（香港）· Product Management Intern – AI & Digital Products · 2026.06 – 至今**
- 西湖大学：2025.01 – 2025.06，职位为 Interaction Design & Product Intern；成果：**SUS +18 分**
- 浙大：UI/UX Design Intern – Digital Platforms；成果：**关键告警识别时间缩短约 35%**
- 亚运会：Design & Stakeholder Coordination Intern；成果：**交付 50+ 套设计**
- HKUST：2026.08 – 2028.01；电话改为 **+852 6759 9932**；语言：英语流利 / 粤语流利 / 普通话母语
- 项目：**Mochi Island**（macOS AI 伴侣，约 11 天发布 v1.0）、**VANTA**（AI 视觉机器鱼，ESP32 + Web Serial）
- 奖项：简历列了 8 项，网站上去掉简历里没写的「浙江省工业设计竞赛」和「环保科技创新竞赛」两项

已确认的决策：
1. **统一定位，两份简历都可下载**：Résumé 按钮弹出菜单，可选 BA 版或 DSE 版；开屏还会让用户先选身份（BA / DSE / AI PM），见文末「身份选择」一节
2. 项目：Vibe Island → **Mochi Island**，机器鱼 → **VANTA**（不再是 ECG，改为视觉 / 碰撞预警）；**保留 AI 求职教育网站**，标注为「规划中」
3. 原来的 4 个设计作品保留，降级为「Design Foundations」区块
4. 实习**不**做成首页案例卡片，只放在 About 页的经历时间线里（但量化数字会出现在 Hero 的关键数字里）
5. 求职城市只写**香港**；默认语言仍为**英文**

## 定位与文案
- EN 标题：**"I turn business needs into digital solutions that ship."**
- EN 副标题：*Business & systems analysis with a builder's hands — requirements, workflows and working Python / Swift / web prototypes, validated with real users.*
- ZH 标题：**「把业务需求，变成能落地的数字化方案」**
- ZH 副标题：「商业与系统分析 + 动手做原型——梳理需求与流程，用 Python / Swift / Web 做出可用方案，并用真实用户验证。」
- 状态标签：`● Open to Business Analyst & Digital Solutions roles` + 等宽字体 `Hong Kong · Full-time`（中文：「正在寻找商业分析 / 数字化解决方案岗位」「香港 · 全职」）
- Hero 三个关键数字（中英文都用真实数字，中文版不再换成学校名）：
  - `+18` — SUS usability score · Westlake lab（中文：SUS 可用性评分提升 · 西湖大学）
  - `~35%` — faster critical-alarm identification · ZJU platform（中文：关键告警识别提速 · 浙大平台）
  - `11 days` — to ship macOS v1.0 · Mochi Island（中文：`11 天` 发布 macOS v1.0）
- Meta title：`Albert Qiu — Business & Digital Solutions Analyst`；description 按上面的定位写，提到 Hong Kong
- 页脚角色：`Business & Digital Solutions Analyst` / 「商业分析 · 数字化方案」

## 实施清单

### 1. 简历资源与公共模块（`components/resume.ts`）
- 用 Vite 的 `?url` 导入两份本地 PDF，替换原来的 Google Drive 链接：
  `import baPdf from '../../imports/Albert_Qiu_BA_Business_Systems_Analysis.pdf?url'`（DSE 同理）
- 导出 `RESUMES = [{ id: 'ba', labelKey: 'resume.ba', file: baPdf, filename: 'Albert_Qiu_BA_Business_Systems_Analysis.pdf' }, { id: 'dse', ... }]`、`downloadResume(id)`、`CONTACT_EMAIL`、`CONTACT_PHONE = '+852 6759 9932'`、`PORTFOLIO_URL = 'https://www.albert-designer.com'`、`LINKEDIN_URL = 'https://www.linkedin.com/in/albert-qiu-7024a9440/'`
- 新组件 **`ResumeMenu.tsx`**：用 Radix DropdownMenu（`@radix-ui/react-dropdown-menu`），不用 shadcn 封装。props：`variant: 'nav' | 'primary' | 'outline' | 'card'`、`align`。菜单有两项，每项包含标题（Business & Systems Analysis / Digital Solutions Engineering）、一行等宽小字说明（例如 "Requirements · process mapping · specs" / "Python · Swift · web · device integration"）和下载图标。菜单面板：`bg-zinc-950 border-white/10 rounded-2xl`，菜单项 `rounded-xl`，hover 时显示主题色。在 Header、Hero、About、Contact 四处复用
- 手机端菜单：Header 移动菜单里直接平铺两个按钮（BA / DSE），不嵌套下拉

### 2. 项目数据（`buildingProjects.tsx` → 改名为 `solutionProjects.tsx`）
- 路由 id 改为 `mochi`、`vanta`、`careeredu`；`BuildingId` 改名为 `SolutionId`
- 文件改名：`VibeIslandDetail.tsx` → `MochiIslandDetail.tsx`，`RoboFishECGDetail.tsx` → `VantaDetail.tsx`，`CareerEduDetail.tsx` 不变
- 每个项目新增字段 `status: 'shipped' | 'tested' | 'planned'`，状态胶囊：
  - Mochi：`● Released v1.0`（主题色呼吸点）
  - VANTA：`● Prototype tested`
  - 求职教育网站：`○ Planned`（灰色空心点，不呼吸）
- 卡片标签色：Mochi `bg-blue-200 text-blue-950`（呼应封面的蓝色品牌色）；VANTA `bg-cyan-200 text-cyan-950`（替换原来的 rose）；求职教育网站保持 `bg-emerald-200 text-emerald-950`
- 封面图形（`Motif`）：
  - Mochi：**不再用代码图形，改用真实封面图** `src/imports/____.png`（见文末「Mochi Island 详情页」）
  - VANTA：视野扇形 + 方位刻度环 + 一个碰撞预警点（cyan），去掉 ECG 线和 `aq-ecg` 动画
  - 求职教育网站：保留原来的柱状图
- 文案 key：把 `project.vibeisland.*` / `project.robofish.*` 改为 `project.mochi.*` / `project.vanta.*`，字段为 title / category / description / role / stage / period（中英双语）
  - Mochi：category `Requirements & Workflow Design & Software Integration`；role `Requirements, workflow & build · Team project`；period `Sep 2026 – Present`；description 写四款竞品分析 + 开发者访谈 → MVP 范围；Swift 悬浮层 + Web UI + 本地 Python 引擎；约 11 天发布 v1.0
  - VANTA：category `AI Vision & Device Integration & Workflow`；role `Workflow & interface lead`；period `2026`；description 写 ESP32 Web Serial 控制界面、实时方位反馈、碰撞预警、视觉输入→反馈流程
  - 求职教育网站：保留现有文案，stage 改为 `Planned` / 「规划中」，role 改为 `Founder / Analyst`

### 3. 首页（`HomePage.tsx`）
首页顺序：**Hero → Solutions in Practice → Design Foundations（含 Other Work）→ About 预览 → Let's Connect**
- Hero：按上面的新文案替换；CTA 改为 `View Projects`（主题色实心）+ `<ResumeMenu variant="outline">`（按钮文字「Résumé PDF ▾」）
- **Solutions in Practice**（原 Building Now，中文「实践项目」）：`id="works"` 的包裹层不变；3 列卡片，按 Mochi → VANTA → 求职教育网站排列；底部元信息行显示 `Role · Stage · Period`。求职教育网站卡片整体降低透明度（`opacity-80`），悬停时显示「Planned」，仍然可以点进去
- **Design Foundations**（原 Selected Works，中文「设计基础」）：
  - 标题保留弹簧效果和黄色下划线；说明文字：*"Where the analysis habit started — four design projects, each read as need → solution → validation."*
  - 布局从「整宽大图单列」改为 `md:grid-cols-2` 两列，图片比例 `aspect-[16/10]`，标题字号降一级
  - 卡片下方的三行改为：**Need**（原 problem）/ **Solution**（原 decision）/ **Validation**（原 outcome 标签，**改为中性描边**，不再用主题色）
  - 顺序保持 StrideGuard → NeuroDrive → Hui → Skysafe
  - Other Work 放在两列网格下面，整宽
  - 新增 key：`card.need` / `card.solution` / `card.validation`；复用现有的 `project.<id>.decision` / `outcome`，并把 decision 文案改写成「方案」的口吻
- About 预览和 Connect 文案改为 BA / Solutions 口吻

### 4. 详情页模板（`BuildingCaseDetail.tsx` → 改名为 `SolutionCaseDetail.tsx`）
- 章节改为 BA 视角：**Context / Requirements / Workflow & States / Solution Architecture / Validation / Outcome / Next**（key 为 `case.context`、`case.requirements`、`case.workflow`、`case.architecture`、`case.validation`、`case.outcome`、`case.next`，每个都带 `.q` 引导问句）
- 每个项目可以按章节填写真实内容（key `case.<projectId>.<section>`）；没有内容的章节显示「Drafting」胶囊和引导问句
  - **Mochi** 不使用这个模板，改为专门的详情页（见文末「Mochi Island 详情页」）。以下内容并入该页的「Behind the build」部分：Context（开发者看不到本地 agent 在做什么）、Requirements（4 款竞品 + 开发者访谈 → MVP 范围与通知优先级）、Workflow & States（把 Cursor/Codex 事件映射为 thinking / waiting / completed / failed 及响应规则）、Architecture（Swift overlay + Web UI + 本地 Python 引擎 / Ollama）、Outcome（AI 辅助开发，约 11 天发布 macOS v1.0）。Validation 和 Next 显示 Drafting
  - **VANTA** 已有内容：Requirements（把操作员任务映射为视觉与控制流程）、Workflow（视觉输入 → 输出 → 预警反馈）、Architecture（ESP32 + Web Serial 界面、实时方位、碰撞预警）、Validation（已完成原型测试）。其余显示 Drafting
  - **求职教育网站**：全部章节显示 Drafting，顶部提示「Planned — case study coming soon」
- 左侧摘要区的元信息改为 Role / Stage / Period；有内容的章节用白色正文，Drafting 的章节保持暗色
- `ProjectDetail.tsx`、`ProjectNavigation.tsx` 的 id 和标题同步改为 mochi / vanta / careeredu
- 4 个原有详情页的 TL;DR 卡片保留，标签改为 **Need / My Role / Approach / Validation**（只改 `tldr.problem` / `tldr.process` / `tldr.impact` 这几个标签的文案，key 结构不变）

### 5. About 页（`AboutMePage.tsx`）
- 页头副标题、intro 改写：交互设计背景 → 把业务需求转成清晰的需求与流程 → 与产品 / 工程团队测试和迭代 → 用 AI 工具加速分析、文档和原型；结尾写 HKUST TLE 在读（2026.08 起）
- 「我在找什么」：香港的 BA / 系统分析 / Digital Solutions 全职岗位，每周 5 天
- 在头像下方的联系按钮下面新增**语言**一行胶囊：English · Fluent / 粤语 · 流利 / 普通话 · 母语
- **How I work** 改为四步：**Elicit → Map → Prototype → Validate**（中文：需求挖掘 → 流程梳理 → 原型实现 → 测试验证），每一步的佐证分别为：MCJ PRD / 西湖大学任务映射 / Mochi Island 集成 / 浙大用户测试
- **经历时间线**：
  - 最上面新增 **MCJ Design（Hong Kong）**卡片。没有 logo 素材，左侧 logo 区域改为等宽字体「MCJ」文字徽章，与其他卡片的渐变底一致
  - 各段经历的职位、时间、要点按简历更新。要点合并 BA 版和 DSE 版，每段 2–3 条，量化成果原样保留（+18、约 35%、50+）。量化数字在要点里用 `text-white` 高亮，正文 `text-white/70`
  - 实现方式：经历卡片改为由数组 `EXPERIENCES = [{ id, logo?, monogram?, points: 3 }]` 驱动渲染，去掉现在重复的三段 JSX
- **奖项**：5 个国际奖项徽章墙不变；折叠区改为 `+3`（金江杯、挑战杯、蓝桥杯 / 中数杯 AIGC），删除 zhejiang / environmental 两个 key
- **技能**分组改为：**Analysis**（需求分析、流程梳理、规格说明、测试数据分析、Excel 透视表、Solution brief、设计思维）/ **Build**（Python、Swift、HTML/CSS/JS、Ollama 本地部署、Cursor/Codex、ESP32 · Web Serial）/ **Design**（Figma、Axure、原型设计、交互设计）。工具 logo 卡片保留
- 教育：HKUST 改为 2026.08 – 2028.01，学位名称去掉「Incoming」并加一行课程（BA 版与 DSE 版课程合并去重：Python；AI-Driven Decision Making；Product Development & Prototyping；AI Technology Innovation；Product Lifecycle Workshop）；中国计量大学加课程一行
- 底部按钮改为 `<ResumeMenu variant="primary">` + Contact Me

### 6. Contact 页（`ContactPage.tsx`）
- 标题保持 "Let's build something"，中文保持「一起做点东西」；状态标签改为新的求职状态，旁边写「Hong Kong · Full-time」
- 电话改为 `+852 6759 9932`，整行改为 `tel:` 链接
- 新增 Portfolio 一行（www.albert-designer.com，外链）
- 简历卡片改为两张并排卡片（BA / DSE），每张直接下载，不用下拉；`sm` 以下改为上下排列
- 邮箱复制、微信二维码功能保持不变

### 7. 其他
- `StudentHeader.tsx`：桌面端用 `<ResumeMenu variant="nav">` 替换现在的 Résumé 按钮
- `ProjectRecommendations.tsx`：只推荐 4 个设计作品，逻辑不变
- `LanguageContext.tsx`：所有新增 / 改名的 key 中英文都要补全，删掉不再使用的 key（vibeisland、robofish、hero 旧数字、awards.zhejiang / environmental）
- `Guidelines.md`：「求职改版」一节改写为 BA + Digital Solutions 版本（定位、路由 id、标签色、ResumeMenu、Design Foundations 规则）
- 开屏逻辑、弹簧交互、圆角规范、#DBFE02 的使用范围（状态点 / 主 CTA / 已发布项目的状态）保持不变

## 改动的文件
`resume.ts`、新增 `ResumeMenu.tsx`、`buildingProjects.tsx`（改名为 `solutionProjects.tsx`）、`BuildingCaseDetail.tsx`（改名为 `SolutionCaseDetail.tsx`）、`MochiIslandDetail.tsx` / `VantaDetail.tsx`（改名）/ `CareerEduDetail.tsx`、`ProjectDetail.tsx`、`ProjectNavigation.tsx`、`HomePage.tsx`、`AboutMePage.tsx`、`ContactPage.tsx`、`StudentHeader.tsx`、`StudentFooter.tsx`、`CaseTLDR.tsx`（不改，只改文案）、`LanguageContext.tsx`、`guidelines/Guidelines.md`

## 边界情况
- PDF 用 `?url` 导入后由 Vite 生成带 hash 的文件名；下载时用 `<a download="Albert_Qiu_….pdf">` 指定友好的文件名，同时 `target="_blank"` 作为兜底（部分浏览器会直接预览）
- 下拉菜单弹出时，自定义光标要能悬停在菜单项上：每个菜单项加 `data-interactive="true"`；菜单 Portal 的 z-index 要高于 Header（`z-[60]`）
- 中文下 Hero 的关键数字 `11 天` 等不换行（`whitespace-nowrap`）；375px 宽时，关键数字按上一版的方式改为一行一个，数字和说明左右排列
- 求职教育网站的卡片仍然可以点进去，避免出现死链

## 验证
- 用上一版的临时 vite 配置跑生产构建（stub 掉 `figma:asset`）：构建通过，并确认两个 PDF 被打包成资源
- 脚本检查：中英 key 集合一致；组件里用到的 `t('…')` key 都存在；模板拼接的 key（`project.<id>.*`、`case.<id>.*`、`tldr.<id>.*`）都齐全
- 全文搜索确认不再出现 `vibeisland`、`robofish`、`ECG`、`AI Product Manager`、`+86`、`Incoming`（中文版的「已录取」也一并改掉）
- 在预览里手动检查：Header / Hero / About / Contact 四处的简历菜单都能分别下载 BA 和 DSE 两份 PDF；中英文切换没有显示原始 key；375px 宽下 Hero 和简历菜单不溢出

---

## 新增：开屏「你正在寻找：」身份选择（Lens）

### 已确认
- 三个身份：**Business / Systems Analyst**（商业 / 系统分析师）、**Digital Solutions Engineer**（数字化解决方案工程师）、**AI Product Manager**（AI 产品经理）
- 位置：放在**开屏页**，取代原来的「进度条走完自动进入」
- 选择后会变化的内容：首页 Hero、项目顺序、推荐的简历、About 页的 How I work

### 状态管理
- 新增 `components/LensContext.tsx`：`type Lens = 'ba' | 'dse' | 'aipm' | 'all'`，提供 `lens` / `setLens`，持久化到 `sessionStorage`（key `aq_lens`）。与 `LanguageProvider` 一起包在 `App` 最外层
- `'all'` 对应用户点「只是看看 / Just browsing」，使用上面「定位与文案」里的统一版文案（BA + Solutions 合并的口吻）
- 刷新页面时：如果已经看过开屏，直接进入首页并沿用保存的 lens（与 `aq_splash_seen` 的逻辑一致）

### 开屏改造（`SplashScreen.tsx`）
- 保留左上 PORTFOLIO / 2025 和右下 ALBERT / QIU 的跳字效果和背景轮播
- 删除底部的自动进入进度条和 Skip 按钮，换成居中的**选择面板**：
  - 等宽字体的小标题：`You're looking for —` / `你正在寻找——`
  - 三张并排的大选项卡片（手机端上下排列），`rounded-2xl`，半透明黑底 + `backdrop-blur`，边框 `white/15`。每张卡片包括：编号 `01/02/03`（等宽字体）、身份名（大字）、一行「你会看到什么」的描述、右下箭头。悬停时整张卡片填满 #DBFE02、文字变黑，箭头用弹簧动画上移
  - 卡片下方放文字按钮：`Just browsing →` / `只是看看 →`（对应 `'all'`）
- 点击任意选项：`setLens(...)` → 开屏淡出 → 进入首页 → 立刻出现**身份介绍过渡层**（见下一节）
- 取消原来的「滚轮 / 滑动 / 点击任意位置即进入」，避免用户还没选就被带走；只保留 Esc 键，等同于点「只是看看」
- 键盘可访问：三张卡片都是 `<button>`，支持 Tab 切换焦点，焦点环使用主题色

### 选择后弹出的身份介绍（新组件 `LensIntro.tsx`）
- 进入首页后显示约 2.2 秒的全屏过渡层（黑底），也可以点击或按任意键关闭：
  - 小字：`Viewing as` / `当前视角`
  - 身份名用弹簧拆字的大标题（复用 `SpringText`）
  - 一句该身份的「页面描述」（见下表的 intro），以及三个关键词胶囊
  - 过渡层上滑消失，露出已经按这个身份调整好的 Hero
- `'all'` 不显示过渡层，直接进入首页
- 每个会话只显示一次（选择时显示；之后在页面里切换身份时不再全屏显示，只让 Hero 内容做淡入淡出）

### 各身份的内容差异
| | Business / Systems Analyst | Digital Solutions Engineer | AI Product Manager |
|---|---|---|---|
| intro（页面描述） | "I turn business needs into clear requirements, workflows and specs — and validate them with data." | "I build working solutions across Python, Swift, web and devices — from user task to tested prototype." | "I take AI products from insight to shipped — defining scope, states and success metrics." |
| 中文 intro | 把业务需求转化为清晰的需求、流程与规格，并用数据验证。 | 用 Python、Swift、Web 和硬件，把用户任务做成经过测试的可用方案。 | 把 AI 产品从洞察推进到上线——定义范围、状态与成功指标。 |
| 关键词胶囊 | Requirements · Process mapping · Test-data analysis | Python / Swift · Device integration · Rapid prototyping | MVP scope · PRDs · AI workflows |
| Hero 标题 | "I turn business needs into systems that work." | "I turn user tasks into working digital solutions." | "AI products, from insight to shipped." |
| Hero 关键数字 | +18 SUS · ~35% faster alarm ID · 50+ deliverables coordinated | 11 days to macOS v1.0 · 3 runtimes integrated (Swift / Web / Python) · ESP32 Web Serial control | 11 days to v1.0 · 4 competitors analysed → MVP scope · PRDs at MCJ Design |
| 项目顺序 | Mochi → VANTA → 求职教育网站 | VANTA → Mochi → 求职教育网站 | Mochi → 求职教育网站 → VANTA |
| 项目卡片描述 | 用 BA 版简历的写法（需求、流程、规格） | 用 DSE 版简历的写法（集成、接口、测试） | 用 PM 口吻（范围、指标、上线） |
| 推荐简历 | BA 版 PDF | DSE 版 PDF | AI 版 PDF（见文末「第三份简历」） |
| How I work | Elicit → Map → Specify → Validate | Understand task → Integrate → Prototype → Test | Discover → Define → Prototype with AI → Ship & Measure |

- `'all'` 使用上面「定位与文案」的统一版，项目顺序与 BA 相同，How I work 用 Elicit → Map → Prototype → Validate
- 实现方式：文案 key 带 lens 后缀，例如 `hero.title.ba` / `hero.title.dse` / `hero.title.aipm` / `hero.title.all`。新增一个辅助函数 `tl(key)`：先查 `${key}.${lens}`，查不到再回退到 `${key}`，避免四套 key 全部复制一遍。项目卡片描述用 `project.mochi.description.ba` 这种形式，没写的身份回退到通用描述
- 关键数字只用简历里有的事实：50+、3 种运行时（Swift / Web / Python）、4 款竞品都来自简历原文，不编造

### 页面内切换（选完之后还能改）
- **Hero 顶部**的状态标签那一行改为「Viewing as」分段控件：`BA | Solutions | AI PM`，选中项背景用 #DBFE02，滑块的弹簧参数与导航栏一致（`stiffness: 500, damping: 30`）。中文显示：`商业分析 | 数字方案 | AI 产品`
- 状态标签的文字随身份变化：`Open to Business Analyst roles` / `Open to Digital Solutions roles` / `Open to AI Product Manager roles`；`'all'` 显示合并版
- **Header**：在 `lg` 及以上，Résumé 按钮左边加一个紧凑的身份下拉（图标 + 当前身份缩写）；手机菜单里加三个身份按钮
- `ResumeMenu` 把当前身份推荐的那份简历排在第一位，并加一个 `Recommended` 小标签（菜单共三项，见文末「第三份简历」）

### 改动的文件（在原清单基础上新增）
新增 `LensContext.tsx`、`LensIntro.tsx`；修改 `SplashScreen.tsx`（选择面板）、`App.tsx`（Provider + 过渡层挂载）、`HomePage.tsx`（Hero 分段控件 + 按身份排序）、`AboutMePage.tsx`（How I work 用 `tl`）、`ResumeMenu.tsx`（推荐排序）、`StudentHeader.tsx`（身份下拉）、`LanguageContext.tsx`（带身份后缀的 key）

### 新增的验证项
- 新开标签页：开屏出现三个身份选项，不会再自动进入；选择后出现介绍过渡层 → Hero 文案与选择一致
- 刷新：跳过开屏，身份保持不变
- 在 Hero 切换身份：标题、关键数字、项目顺序、简历推荐同步变化；About 页的 How I work 也跟着变
- key 检查脚本加一项：每个带身份后缀的 key 至少存在通用版本或四个后缀版本，中英文一致


---

## 新增：Mochi Island 详情页（使用真实素材）

### 素材
- 封面：`src/imports/____.png`（1944×809，浅蓝色品牌插画：猫咪 App 图标 + "Mochi Island" 字标 + 代码窗口 / 终端 / OpenAI 图标）
- 视频：`src/imports/mochi-island-share.mp4`（1920×1080，77 秒，22.8 MB，带音轨）——产品宣传片。我用 ffmpeg 抽帧看过完整内容，故事线如下：

| 时间 | 字幕（原文） | 画面 |
|---|---|---|
| 0:00 | Six AI agents. Six windows. Which one needs you right now? | 桌面堆满 Cursor / Codex / Claude Code / Copilot 窗口和通知 |
| 0:08 | Meet Mochi. A tiny pet that lives in your notch. | 刘海旁的小猫 |
| 0:12 | It watches over every agent, so one glance tells you what they're up to. | 状态气泡：Thinking / Done / Waiting for you / Error |
| 0:20 | When one needs your okay, just approve it, right from the bubble. | 权限请求卡片：Allow / Deny |
| 0:28 | Every prompt you send, and every task you finish, keeps Mochi well fed. | Hunger / Energy / Happy 状态条、今日 Prompts / Tokens、待办 |
| 0:36 | Leave it too long, and Mochi gets hungry… sleepy… and faints. | 状态下降、睡着、晕倒 |
| 0:44 | Step away for a while… and Mochi catches you up the moment you're back. | "While you were away · 3 done · 1 stuck" 汇总 |
| 0:52 | It doesn't just keep you company. It offers to take work off your plate. | "Mochi's on it · Agent 4" → "Mochi handled it" |
| 0:58 | Mochi is deeply customizable — your own pet, your idol, someone you love… or even yourself. Then tune its size, its spot, its colors, and its sounds. | 设置面板：Looks / Position / Colors / Sound / Cursor |
| 1:10 | Turn babysitting AI into raising a pet that's all yours. · Native macOS · Runs 100% locally | 片尾标版 |

### 资源处理（遵守资源作用域原则）
- **封面图**：首页卡片和 Mochi 详情页都会用到（首页预览属于允许的全局用途），在 `solutionProjects.tsx` 中导入
- **视频与截图只在 `MochiIslandDetail.tsx` 中导入**
- 原视频 22.8 MB 太大，不适合直接上网页：用 ffmpeg 另外转一份网页版到 `src/app/assets/mochi/mochi-island-web.mp4`（1280 宽，H.264 CRF 28，`-movflags +faststart`，保留音轨，预计 5–8 MB），原文件不动
- 从视频抽 6 张关键截图（JPG，1280 宽，约 100–200 KB/张），放在 `src/app/assets/mochi/`：`problem.jpg`（0:02）、`glance.jpg`（0:17）、`approve.jpg`（0:21）、`fed.jpg`（0:33）、`recap.jpg`（0:49）、`customize.jpg`（1:06）
- 所有图片用 `ImageWithFallback` 渲染，并以 ES module 方式导入

### 首页卡片
- Mochi 卡片的封面换成真实图片：`aspect-[4/3]` + `object-cover` + `object-[40%_50%]`，让猫咪图标和 "Mochi" 字标都在可见范围内；保留左上角编号和右上角「● Released v1.0」状态胶囊（叠在图上时加 `bg-black/50 backdrop-blur` 底，保证浅色图上看得清）
- 原来封面底部叠加的项目名大字，Mochi 不再显示（图里已经有字标）；另外两个项目的占位封面不变

### 详情页结构（`MochiIslandDetail.tsx`，自定义页面，不使用通用模板）
页面整体仍是黑色背景，Mochi 的内容区用封面里的浅蓝色作为局部强调色（`sky-200` / `blue-400`）。#DBFE02 只用在「Released v1.0」状态点和返回按钮上。

1. **封面横幅**：完整封面图，原比例（`aspect-[1944/809]`），`rounded-3xl`，入场时轻微放大并淡入。手机端改为 `aspect-[4/3] object-cover`，避免太扁
2. **标题区**（左右两栏）：
   - 左：标签胶囊（Requirements · Workflow Design · Software Integration）、标题 "Mochi Island"（弹簧拆字效果）、一句定位：*"Turn babysitting AI into raising a pet that's all yours."*（中文：「把盯着 AI 干活，变成养一只属于你的宠物」）、两个小胶囊：`Native macOS` · `Runs 100% locally`
   - 右：等宽字体的元信息表：Role（Requirements, workflow & build · Team project）/ Stage（Released v1.0）/ Period（Sep 2026 – Present）/ Stack（Swift · Web UI · Python · Ollama）/ Build time（~11 days, AI-assisted）
3. **宣传片播放器**：`<video controls playsInline preload="metadata" poster={封面}>`，`rounded-3xl`，16:9。
   - 右侧（手机端放在下方）是**章节列表**，对应上面故事线的 8 个节点：时间码（等宽字体）+ 短标题（The problem / Meet Mochi / One-glance status / Approve from the bubble / Keep Mochi fed / While you were away / Takes work off your plate / Make it yours）
   - 点击章节时 `video.currentTime = t` 并开始播放；播放过程中监听 `timeupdate`，高亮当前章节（左侧蓝色竖条）
   - 不自动播放、不静音：视频带解说音轨，由用户点击播放
4. **功能走查**（6 组「截图 + 文字」左右交替排列，滚动时淡入）：
   - The problem — "Six AI agents. Six windows."：多 agent 并行时，开发者不知道哪个在等自己
   - One glance — 把每个 agent 的活动映射为 Thinking / Waiting / Done / Error 四种状态，显示在刘海旁
   - Approve in place — 权限请求直接在气泡里 Allow / Deny，不用切窗口
   - Keep Mochi fed — Prompts 和完成的任务转化为宠物的饥饿 / 精力 / 心情，把 AI 用量做成一个轻量的反馈回路
   - While you were away — 回来时自动汇总（例如「3 done · 1 stuck」）
   - Make it yours — 宠物形象、位置、颜色、声音都可自定义
   - 每组文字上方有一个小标签说明它对应的分析工作，例如 `Requirement` / `State model` / `Response rule` / `Engagement loop`，把产品功能和 BA / Solutions 能力对应起来
5. **Behind the build**（三列卡片，内容来自简历，不编造）：
   - **Requirements**：分析 4 款竞品和开发者访谈反馈，确定 MVP 范围、任务流程和通知优先级
   - **State model**：把 Cursor / Codex 事件映射为 thinking / waiting / completed / failed，并定义每种状态的响应规则
   - **Integration**：Swift 悬浮层 + Web UI + 本地 Python 引擎（Ollama 本地部署）；借助 AI 辅助开发，约 11 天发布 macOS v1.0
   - 卡片右上角用等宽小字标注来源简历，例如 `BA résumé` / `DSE résumé`。按当前身份（lens）调整三张卡片的顺序：BA 身份 Requirements 在前，DSE 身份 Integration 在前，AI PM 身份 State model 在前
6. **底部**：「返回作品集」按钮 + 原有的上一个 / 下一个项目导航和更多项目推荐

### 文案
- 新增 key：`mochi.tagline`、`mochi.badge.native`、`mochi.badge.local`、`mochi.meta.stack`、`mochi.meta.build`、`mochi.video.title`、`mochi.chapters`（表头）、`mochi.ch.<1–8>`（章节短标题）、`mochi.feature.<problem|glance|approve|fed|recap|customize>.{tag,title,body}`、`mochi.build.<requirements|states|integration>.{title,body}`，中英双语
- 视频里的英文字幕原样引用（作为英文版功能标题的来源）；中文版另写，不逐字翻译

### 边界情况
- 视频加载失败：显示封面海报图，以及一个「Download video」文字链接作为兜底
- 移动端：章节列表放到视频下方，做成横向滚动的胶囊列表；功能走查改为图上文下
- 自定义光标：`<video>` 区域要保留原生控件的可用性，`SimpleCursor` 需要对 video 元素显示系统光标；如果原来是全局 `cursor-none`，在视频容器上加 `cursor-auto`
- 自动跳转章节时如果浏览器拦截了 `play()`，捕获 Promise 的报错，只完成跳转，不报错

### 验证（新增）
- 构建产物中包含网页版 mp4（大小小于 10 MB）和 6 张截图；原始 22.8 MB 的视频**不**被打包（没有任何文件导入它）
- 首页 Mochi 卡片的封面里，猫咪图标和字标都完整可见（375px / 1280px 两个宽度都检查）
- 点击章节能跳到正确的时间点，当前章节高亮跟随播放进度


---

## 新增：第三份简历（AI 方向）+ LinkedIn

### 已确认
- 新简历 `src/imports/Albert_Qiu_Vizper_AI_Project_Operation_Assistant.pdf`，简历中写的求职方向是 *AI Project & Product Operations*
- 网站上的第三个身份**仍然叫「AI Product Manager / AI 产品经理」**，这份简历作为它的推荐简历
- 原文件名带公司名 Vizper，网站下载时**改用通用文件名** `Albert_Qiu_AI_Product.pdf`（`<a download>` 指定文件名，原文件不改名）。Vite 打包后的资源名是 hash，不会暴露 Vizper；代码里只出现在 import 路径中
- LinkedIn：`https://www.linkedin.com/in/albert-qiu-7024a9440/`，用于 About 页按钮、Contact 页 LinkedIn 一行，以及页脚（新增小图标链接）

### 改动
- `resume.ts` 的 `RESUMES` 改为三项：`ba`（Business & Systems Analysis）、`dse`（Digital Solutions Engineering）、`ai`（AI Product）。`ai` 项的说明小字：`AI use cases · MVP scope · launch & AI tooling`
- `ResumeMenu` 显示三项，按当前身份把推荐的那份排第一（`ba` → BA、`dse` → DSE、`aipm` → AI、`all` → BA）
- Contact 页的简历卡片从两张改为三张（`sm` 以上三列，以下上下排列）
- 手机端 Header 菜单的简历按钮从两个改为三个（BA / Solutions / AI）

### AI 产品经理身份的文案按这份简历校准（只用简历中的事实）
- intro 不变（"I take AI products from insight to shipped…"），关键词胶囊改为：`AI use cases · MVP scope · AI-assisted delivery`
- Hero 关键数字：`11 days` to ship macOS v1.0（Mochi）· `4` competing apps analysed to prioritise agent updates（Mochi）· `+18` SUS from user-feedback iteration（西湖大学）
- 项目卡片描述（AI 身份）：
  - Mochi：竞品与开发者访谈 → 确定 agent 状态与通知的优先级；设计 thinking / waiting for input / completed / failed 四种状态，并支持并发任务追踪；约 11 天发布
  - VANTA：定义从图像输入到结果反馈的 AI 视觉流程；搭建并测试带实时状态与预警的 Web 控制原型
- Mochi 详情页「Behind the build」在 AI 身份下 State model 排第一，并补上「concurrent-task tracking」（来自这份简历）
- About 页：
  - MCJ 经历在 AI 身份下优先显示 AI 版要点：定义 AI 用例和 MVP 范围；调研受众、内容形式和推广渠道，给出上线宣传建议；用 AI 工具准备提案和客户材料
  - 经历要点按身份切换：`about.experience.<id>.point<n>.<lens>`，通过 `tl()` 回退到通用版。BA / DSE / AI 三份简历的写法分别对应三个身份
  - 技能区在 AI 身份下新增一组 **AI tools**：Cursor / Codex、Figma Make、Seedance（AI 视频）、Ollama（本地模型）
  - HKUST 课程在 AI 身份下显示：AI Technology Innovation；AI Product Marketing；Python；LLM API Workshop
- 简历里的「Availability」：BA / DSE 版写 Full-time, 5 days/week，AI 版写 Up to 5 days/week。Hero 状态标签在 AI 身份下显示 `Hong Kong · Up to 5 days/week`，其余身份显示 `Hong Kong · Full-time`

### 验证（新增）
- 三个身份下 ResumeMenu 的第一项分别是 BA / DSE / AI，下载得到的文件名为 `Albert_Qiu_BA_Business_Systems_Analysis.pdf` / `Albert_Qiu_Digital_Solutions_Engineering.pdf` / `Albert_Qiu_AI_Product.pdf`
- 构建产物和页面文字中都不出现 "Vizper"
- LinkedIn 链接在 About / Contact / 页脚三处都能在新标签页打开
