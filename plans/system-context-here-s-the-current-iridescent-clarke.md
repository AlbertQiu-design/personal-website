# 作品集改版方案：从「留学申请」到「求职」

## Context
现在的网站是给留学招生官看的：重点讲学术潜力、获奖数量、"senior student" 的身份，再配上偏艺术化的开屏动画。求职场景的读者换成了**招聘方和设计负责人**，他们平均只看 30–90 秒，关心三件事：**你能做什么岗位、做出了什么结果、和你合作靠不靠谱**。这次改版的目标是：在保留 #DBFE02 视觉识别和弹簧交互的前提下，把信息结构从"展示自己"改成"回答招聘方的问题"。

已知现状（来自代码）：
- `HomePage.tsx`：4 个项目卡片 + Other Work，描述只有一句概念，没有角色和成果
- `LanguageContext.tsx`：about.intro 仍写着 "senior Industrial Design student"；奖项有 10 条平铺
- `SplashScreen.tsx`：每次进站都要看开屏 + Click to Enter，对 HR 来说是阻力
- 实习经历描述偏"做了什么"，缺少"带来了什么结果"

## 核心定位（目标岗位：AI 产品经理）
**一句话定位**：*"AI Product Manager with a designer's hands — I take AI products from insight to shipped, across software and hardware."*
- 中文：「懂设计、能动手的 AI 产品经理——把 AI 产品从洞察一路推进到上线，软件、硬件都做。」
- 差异化：多数 AI PM 候选人缺原型能力和硬件经验；设计背景 + HKUST TLE（技术领导与创业）正好补上这一块。
- 叙事重心从"我画了什么"转向 **问题定义 → 用户 / 市场判断 → 范围取舍 → 指标 → 迭代**。

## 新增：三个在做的 AI 项目位（P0，放在作品区最前）
首页作品区拆成两组：**"Building now"**（3 个占位）在上，**"Selected Works"**（原 4 个项目）在下。
| 槽位 | 项目 | 卡片标签色 | PM 叙事重点 |
|---|---|---|---|
| 1 | **AI Vibe Island**（AI 产品） | 主题色 #DBFE02 | 产品定位、核心 Loop、用户增长 / 留存指标 |
| 2 | **AI 求职教育网站** | `emerald-200` | 用户分层、AI 能力边界、商业模式（与当前求职场景互相佐证） |
| 3 | **AI 机器鱼 · 运动员心率 ECG 追踪** | `rose-200` | 软硬件协同、数据链路、准确率 / 延迟等技术指标、B 端场景 |
- 卡片状态胶囊：`● In progress`（带呼吸点）+ `Role: Founder / PM` + `Stage: MVP / Prototype`
- 封面先用占位图（深色渐变 + 项目名大字 + 噪点），以后直接替换图片即可
- 每个项目先预留一个详情页路由（`VibeIslandDetail.tsx`、`CareerEduDetail.tsx`、`RoboFishECGDetail.tsx`），使用统一的 PM 案例模板：**Problem / Users / Why AI / MVP Scope / Metrics / Roadmap / What I learned**。目前写 "Case study coming soon"，图片资源以后只放在各自路由内
- 文案 key：`project.vibeisland.*`、`project.careeredu.*`、`project.robofish.*`（title/category/description/role/stage，中英双语）
- 原 4 个项目重新包装成 PM 视角：每张卡片补一句"我做的产品决策"（例如 StrideGuard：确定"伤前预警"而不是"跑后分析"作为核心价值）

## 改版清单（按投入产出比排序）

### P0 — 首屏 5 秒定生死
1. **开屏改为只在首次访问时播放**：用 `sessionStorage` 记住已播放过；在开屏上加 "Skip"；`Click to Enter` 改为自动进入（进度条走完 + 600ms）。只改 `SplashScreen.tsx` 和 `App.tsx` 里的进入逻辑。
2. **首页顶部新增 Hero 区**（放在 Selected Works 之前，`HomePage.tsx`）：
   - 大字定位语（用弹簧字符效果，复用现有 `motion.span` 拆字的写法）
   - 一行状态胶囊：`● Open to roles · AI / Interaction / Product Design · Shanghai · Hangzhou · HK`（绿点做呼吸动画）
   - 状态胶囊改为：`● Open to AI Product Manager roles`
   - 3 个关键数字：`3 AI products in build` · `3 internships` · `5 international awards`
   - 两个 CTA：`View Work`（主题色实心）+ `Résumé PDF`（描边）
3. **导航右侧常驻 "Résumé ↓" 按钮**（`Header.tsx`），和语言切换并排放。

### P1 — 项目卡片改成"案例摘要"
4. 每张卡片在现有标题/描述下方加一条**元信息行**和**一句成果**：
   - `Role · Duration · Team` 例：`Lead Designer · 12 wks · Team of 4`
   - `Outcome` 例：`Gold, MUSE 2025` / `Validated with 12 runners`
   - 新增 i18n key：`project.*.role`、`project.*.outcome`（中英都要加）
5. **项目顺序按岗位匹配度重排**：StrideGuard（AI + 可穿戴）→ NeuroDrive → Hui Robot → Skysafe Heros。
6. **详情页统一加上"TL;DR 卡片"**（4 个 `*Detail.tsx` 页面顶部）：Problem / My Role / Process / Impact 四格，用 `rounded-2xl`。这类项目级内容只放在各自路由里，遵守资源作用域原则。

### P2 — About 页从"简历复述"改成"合作画像"
7. 重写 `about.intro`：去掉 "senior student"，改为写**专业身份 + 擅长领域 + 正在找什么**；HKUST 写成 "Incoming MSc at HKUST (TLE)"。
8. 实习要点改写成 **动词 + 产出 + 结果**（例："Shipped alert-system UI for a power plant, reducing operator steps from X to Y"）。没有数据的地方写清楚规模和交付物就行，**不编造数字**。
9. **奖项精简**：只在显眼位置放 5 个国际奖项，用徽章墙展示；国内省级奖项默认折叠（"+5 more"，用 Radix Accordion）。
10. 新增 **"How I work"** 区块，3 列：Research → Prototype（含硬件）→ Ship with engineers，正好对应西湖大学和浙大的经历。
11. Skills 按 PM 能力分组：**Product**（需求定义、PRD、优先级、指标设计）/ **AI**（LLM 应用、Prompt / Agent 原型、Vibe coding、评测）/ **Design & Build**（Figma、原型、硬件）。"How I work" 改为 Discover → Define → Prototype with AI → Ship & Measure。

### P3 — 转化与细节
12. Contact 页标题改为 "Let's build something" + 邮箱一键复制（用 sonner 弹 toast）+ LinkedIn / 作品集 PDF。
13. 中文版文案单独打磨，不要直接翻译英文：国内 HR 更看重学校、实习公司和获奖，所以中文版 Hero 的数字可以换成"西湖大学 / 浙大研究院 / 亚运会"。
14. 页面 `<title>` 和 meta description 改成定位语，方便链接分享时显示预览。

## 视觉调整（克制，不推翻）
- #DBFE02 只用在**状态点、CTA、成果标签**这三个地方，避免"处处都高亮 = 没有重点"。
- 元信息行用等宽字体（例如 JetBrains Mono），小字号 + 60% 白，营造出"工程师也能读懂"的专业感。
- 圆角沿用现有规范：标签/按钮 `rounded-xl`、卡片 `rounded-2xl`、大容器 `rounded-3xl`。

## 要修改的文件
- `components/LanguageContext.tsx` — 新增/重写文案 key（量最大）
- `components/HomePage.tsx` — Hero、卡片元信息、项目排序
- `components/SplashScreen.tsx`、`App.tsx` — 首次播放 + 跳过
- `components/Header.tsx` — Résumé 按钮
- `components/AboutMePage.tsx` — How I work、奖项折叠、技能分组
- `components/ContactPage.tsx` — 复制邮箱
- 4 个 `*Detail.tsx` — TL;DR 卡片

## 需要你提供的素材
- 目标岗位和城市（会影响定位语和状态胶囊的内容）
- 每个项目的 角色 / 周期 / 团队人数 / 一句成果
- 最新的简历 PDF

## 验证
- 计时测试：请一位没看过网站的人看 10 秒首屏，然后让 ta 说出"他做什么岗位、有什么亮点"
- 中英切换后每个新增 key 都有对应文案，不出现原始 key 字符串
- 刷新后不再出现开屏；新开标签页时开屏正常播放
- 移动端（375px）Hero 数字和 CTA 不换行错位
