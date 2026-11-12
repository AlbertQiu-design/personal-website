# Albert Qiu Portfolio - Design & Development Guidelines

## 项目概述
这是为设计师 Albert Qiu (邱皓惟) 开发的黄绿色调个人作品集网站，主题色为 #DBFE02。网站采用响应式设计，支持中英文双语切换，展示设计作品和个人信息。

---

## 设计系统

### 主题色彩
* **主题色**: #DBFE02 (黄绿色)
  * 用于 Logo、强调元素、按钮、标签、下划线等关键视觉元素
  * 悬停状态: #b8d402 (稍暗的黄绿色)
* **背景色**: 
  * 主背景: #000000 (黑色)
  * 次级背景: #27272a (zinc-900，用于 About 区域)
* **文字色**:
  * 主文字: #FFFFFF (白色)
  * 次级文字: rgba(255, 255, 255, 0.6-0.7) (半透明白色)
* **文字选中效果**: 使用主题色 #DBFE02 作为选中背景色（已在 globals.css 中定义）

### 项目标签颜色
* NeuroDrive: bg-[#DBFE02] text-black (主题色)
* Hui Robot: bg-sky-200 text-sky-900 (天蓝色)
* Skysafe Heros: bg-purple-200 text-purple-900 (紫色)
* StrideGuard: bg-orange-300 text-orange-950 (橙色)

### 字体
* 全局默认字体在 `/styles/globals.css` 中定义
* 主标题 (Selected Works): 3.5rem, font-weight: 700
* 区域标题 (About Me, Let's Connect): 3xl-4xl (responsive)
* 正文: base-lg (responsive)

### 圆角规范
* **标签/按钮**: `rounded-full` (完全圆角，用于 tags、pills、CTA 按钮)
* **卡片/图片容器**: `rounded-2xl` (较大圆角，用于项目图片容器、内容卡片)
* **小型容器/图标容器**: `rounded-xl` (中等圆角，用于联系方式卡片、图标背景)
* **对话框**: `rounded-lg` (标准圆角，用于弹窗)

---

## 交互设计规范

### 弹簧交互效果
所有主要区域标题均使用统一的弹簧动画效果：
* **应用范围**: "Selected Works", "About Me", "Let's Connect" 等主标题
* **效果**: 鼠标悬停时字符旋转并上移
* **参数**: 
  ```typescript
  whileHover={{ rotate: -8, y: -5 }}
  transition={{ type: "spring", stiffness: 300, damping: 10 }}
  ```
* **实现方式**: 将文字拆分为单个字符，每个字符包裹在 `motion.span` 中，添加 `data-interactive="true"` 属性
* **重要**: 标题的入场动画 (whileInView) 必须放在外层包裹的 `motion.div` 上，而非直接放在包含弹簧字符的 `h2` 上，以避免 transition 冲突导致弹簧效果失效

### 导航栏设计
* **布局**: 
  * Logo 左对齐
  * 导航菜单居中（通过 absolute positioning + left-1/2 + -translate-x-1/2）
  * 语言切换按钮右对齐
* **交互效果**:
  * 黄色背景使用弹簧动画在激活的导航项之间平滑移动
  * 弹簧参数: `type: "spring", stiffness: 500, damping: 30`
* **高亮逻辑**:
  * 根据当前页面和滚动位置自动高亮对应导航项
  * About Me 页面高亮 "About"
  * Contact 页面高亮 "Contact"
  * 项目详情页高亮 "Works"

### 项目标签设计
* **垂直位置调整**: 标签内文字已向上提升 2px (通过 `py-1.5` 实现)
* **边距**: px-4 py-1.5
* **圆角**: rounded-full

### 自定义光标
* 使用 SimpleCursor 组件
* 所有交互元素需添加 `data-interactive="true"` 属性

---

## 页面结构

### 主要页面
1. **Splash Screen** (开屏动画)
   * 文字排版: "Portfolio" 和 "2025" 分行，"Albert" 和 "Qiu" 分行
   
2. **Home Page** (主页)
   * Selected Works 区域
   * About Me 预览区域
   * Let's Connect 联系区域

3. **About Me Page** (关于页面)
   * 完整的个人介绍和背景信息

4. **Contact Page** (联系页面)
   * "Let's Work Together" 标题
   * 联系方式和社交媒体链接

5. **Project Detail Pages** (项目详情页)
   * NeuroDrive
   * Hui Robot
   * Skysafe Heros
   * StrideGuard

---

## 资源管理规范

### 资源作用域原则
⚠️ **重要**: 项目级图片资源必须严格限定在其所属路由内，避免在重新 build 时被错误提升为全局资源。

### 文件组织
* **项目级资源**: 仅在对应的项目详情组件中导入和使用
* **全局资源**: 仅限于在多个页面共用的资源（如 HomePage 的项目预览图）
* **已清理**: 删除了13个未使用的 NeuroDrive 相关组件和 imports 文件，包含大量项目级图片资源和巨大 SVG

### 导入规范
* **Raster Images**: 使用 `figma:asset` scheme (无路径前缀)
  ```typescript
  import img from "figma:asset/abc123.png"
  ```
* **SVGs**: 使用相对路径从 `/imports` 目录导入
  ```typescript
  import svgPaths from "./imports/svg-xxxxx"
  ```

---

## 动画规范

### 页面切换动画
```typescript
initial={{ opacity: 0, y: 20 }}
animate={{ opacity: 1, y: 0 }}
exit={{ opacity: 0 }}
transition={{ duration: 0.3, ease: "easeInOut" }}
```

### 滚动触发动画
```typescript
initial={{ opacity: 0, y: 40 }}
whileInView={{ opacity: 1, y: 0 }}
viewport={{ once: true }}
transition={{ duration: 0.6, delay: index * 0.1 }}
```

### 按钮悬停动画
```typescript
whileHover={{ scale: 1.05 }}
whileTap={{ scale: 0.95 }}
```

---

## 响应式设计

### 断点
* 移动端: 默认
* 平板: md: (768px+)
* 桌面: lg: (1024px+)

### 响应式类使用示例
* 字体大小: `text-base md:text-lg`
* 间距: `px-6 md:px-12 lg:px-32`
* 布局: `grid-cols-1 md:grid-cols-2`

---

## 开发注意事项

### 技术栈
* React + TypeScript
* Motion (Framer Motion)
* Tailwind CSS v4
* 双语支持 (LanguageContext)

### 保护文件
以下文件不可修改:
* `/src/app/components/figma/ImageWithFallback.tsx`

### 代码规范
* 所有交互元素添加 `data-interactive="true"`
* 使用 `fast_apply_tool` 进行代码编辑
* 保持组件职责单一，复杂功能拆分为独立组件
* 优先使用 flexbox 和 grid 进行布局，避免不必要的绝对定位

---

## 最近更新历史

### 2024 年度优化
1. ✅ 修改开屏动画文字排版
2. ✅ 调整项目标签文字垂直位置 (向上 2px)
3. ✅ 重新布局导航栏 (菜单居中，语言切换右对齐)
4. ✅ 添加主题色文字选中效果
5. ✅ 统一所有主标题的弹簧交互效果
6. ✅ 清理资源作用域，删除未使用组件和资源文件
7. ✅ 统一圆角规范 (标签 rounded-full, 卡片 rounded-2xl, 小容器 rounded-xl, 对话框 rounded-lg)
8. ✅ 放大加载进度条模块，优化视觉效果
9. ✅ Click to Enter 按钮居中屏幕
10. ✅ 修复 About Me / Let's Connect 弹簧交互 (分离 whileInView 和弹簧 transition)

---

## 求职改版（商业分析 + Digital Solutions）补充规范

### 定位与身份（Lens）
* 统一定位："I turn business needs into digital solutions that ship." / 「把业务需求，变成能落地的数字化方案」
* 三个身份：`ba` 商业 / 系统分析师、`dse` 数字化解决方案工程师、`aipm` AI 产品经理；`all` = 只是看看
* `LensContext.tsx`：`useLens()` / `useLensT().tl(key)`——先查 `${key}.${lens}`，查不到回退到 `${key}`；空字符串表示该身份下隐藏此条
* 开屏 = 身份选择（不再自动进入），选择后出现 `LensIntro` 全屏介绍；身份存于 sessionStorage `aq_lens`
* 随身份变化：Hero 标题 / 状态 / 关键数字、项目顺序与描述、推荐简历、About 的 How I work / 经历要点 / 技能顺序 / 课程
* 所有文案事实来自三份简历，不编造数字

### 简历
* `resume.ts`：`RESUMES`（ba / dse / ai），PDF 副本在 `src/app/assets/resumes/`（AI 版使用通用文件名，不暴露公司名）
* `ResumeMenu.tsx`：Radix 下拉，按身份把推荐简历排第一；Header / Hero / About 复用，Contact 页为三张卡片
* LinkedIn：https://www.linkedin.com/in/albert-qiu-7024a9440/ ；电话 +852 6759 9932；求职城市仅写香港

### 首页结构
Hero（含「Viewing as」分段控件）→ Solutions in Practice（Mochi / VANTA / 求职教育网站）→ Design Foundations（4 个设计作品两列 + Other Work）→ About 预览 → Let's Connect

### 项目路由 id 与标签色
* `mochi`：bg-blue-200 text-blue-950，真实封面 `assets/mochi/cover.jpg`，专属详情页 `MochiIslandDetail.tsx`（宣传片 + 章节 + 功能走查 + Behind the build）
* `vanta`：bg-cyan-200 text-cyan-950，代码绘制封面，通用模板 `SolutionCaseDetail.tsx`
* `careeredu`：bg-emerald-200 text-emerald-950，状态 Planned
* 设计基础：`project3` / `neurodrive` / `hui` / `project4`，卡片为 Need / Solution / Validation，Validation 标签为中性描边

### 资源
* Mochi 视频与截图只在 `MochiIslandDetail.tsx` 导入；网页版视频 `assets/mochi/mochi-island-web.mp4`（约 6 MB，由原 22.8 MB 文件转码），原始文件不被引用
* #DBFE02 只用于：状态呼吸点（已发布）、主 CTA、选中态

### 字体补充
* 元信息行使用 `.font-meta`（JetBrains Mono），小字号 + 40–60% 白

---

## 待优化项目

暂无

---

**最后更新**: 2026年