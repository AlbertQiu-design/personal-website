import { useState, useEffect, useCallback } from "react";
import { SimpleCursor } from "./components/SimpleCursor";
import { StudentHeader } from "./components/StudentHeader";
import { SplashScreen } from "./components/SplashScreen";
import { HomePage } from "./components/HomePage";
import { ProjectDetail } from "./components/ProjectDetail";
import { AboutMePage } from "./components/AboutMePage";
import { ContactPage } from "./components/ContactPage";
import { StudentFooter } from "./components/StudentFooter";
import { PageLoader } from "./components/PageLoader";
import { Toaster } from "./components/ui/sonner";
import { LanguageProvider } from "./components/LanguageContext";
import { AnimatePresence, motion } from "motion/react";
import { DocumentMeta } from "./components/DocumentMeta";
import { LensProvider, useLens, Lens } from "./components/LensContext";
import { LensIntro } from "./components/LensIntro";

// 开屏只在每个浏览器会话首次访问时播放
const SPLASH_KEY = "aq_splash_seen";
const hasSeenSplash = () => {
  try {
    return sessionStorage.getItem(SPLASH_KEY) === "1";
  } catch {
    return false;
  }
};
const markSplashSeen = () => {
  try {
    sessionStorage.setItem(SPLASH_KEY, "1");
  } catch {
    /* 隐私模式等情况下忽略 */
  }
};

function AppContent() {
  const [skipIntro] = useState(hasSeenSplash);
  const [isLoading, setIsLoading] = useState(!skipIntro);
  const [currentPage, setCurrentPage] = useState<
    "splash" | "home" | "project" | "about-me" | "contact-page"
  >(skipIntro ? "home" : "splash");
  const [currentProject, setCurrentProject] =
    useState<string>("");
  const [pendingScroll, setPendingScroll] =
    useState<string>("");
  const { setLens } = useLens();
  // 选择身份后的全屏介绍（每个会话只在选择时出现一次）
  const [introLens, setIntroLens] = useState<Exclude<Lens, "all"> | null>(null);
  const closeIntro = useCallback(() => setIntroLens(null), []);

  // 处理加载完成
  const handleLoadComplete = () => {
    setIsLoading(false);
  };

  // 滚动到顶部当页面切换时
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage, currentProject]);

  // 处理待定的滚动
  useEffect(() => {
    if (pendingScroll && currentPage === "home") {
      // 等待页面渲染完成
      setTimeout(() => {
        const element = document.getElementById(pendingScroll);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
        setPendingScroll("");
      }, 100);
    }
  }, [pendingScroll, currentPage]);

  const handleProjectClick = (projectId: string) => {
    setCurrentProject(projectId);
    setCurrentPage("project");
    window.scrollTo(0, 0); // 滚动到顶部
  };

  const handleBackToHome = () => {
    markSplashSeen();
    setCurrentPage("home");
    setCurrentProject("");
    window.scrollTo(0, 0); // 总是滚动到顶部
  };

  const handleEnterSite = (lens: Lens) => {
    markSplashSeen();
    setLens(lens);
    if (lens !== "all") setIntroLens(lens);
    setCurrentPage("home");
  };

  const handleNavigateToSection = (sectionId: string) => {
    // 如果点击的是 About，跳转到 AboutMePage
    if (sectionId === "about") {
      markSplashSeen();
      setCurrentPage("about-me");
      setCurrentProject("");
      return;
    }

    // 如果点击的是 Contact，跳转到 ContactPage
    if (sectionId === "contact") {
      markSplashSeen();
      setCurrentPage("contact-page");
      setCurrentProject("");
      return;
    }

    if (currentPage === "splash") {
      // 从 splash 页面导航，先进入 home，然后滚动
      markSplashSeen();
      setPendingScroll(sectionId);
      setCurrentPage("home");
    } else if (currentPage === "home") {
      // 已经在 home 页面，直接滚动
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      // 从其他页面（project、about-me 或 contact-page）导航到 home 的某个部分
      setPendingScroll(sectionId);
      setCurrentPage("home");
      setCurrentProject(""); // 确保清除当前项目状态
    }
  };

  const handleNavigateToAboutPage = () => {
    setCurrentPage("about-me");
    setCurrentProject("");
  };

  const handleNavigateToContactPage = () => {
    setCurrentPage("contact-page");
    setCurrentProject("");
  };

  // 显示加载器
  if (isLoading) {
    return (
      <>
        <PageLoader onLoadComplete={handleLoadComplete} />
      </>
    );
  }

  // 如果在开屏页面，显示 Header 和 SplashScreen
  if (currentPage === "splash") {
    return (
      <>
        <div className="min-h-screen cursor-none bg-black">
          <SimpleCursor />
          <StudentHeader
            onLogoClick={handleBackToHome}
            onNavigate={handleNavigateToSection}
            isHomePage={true}
            currentPage={currentPage}
          />
          <SplashScreen onEnter={handleEnterSite} />
          <Toaster />
        </div>
      </>
    );
  }

  return (
    <>
      <div className="min-h-screen cursor-none bg-black">
        <SimpleCursor />
        <StudentHeader
          onLogoClick={handleBackToHome}
          onNavigate={handleNavigateToSection}
          isHomePage={
            currentPage === "home" ||
            currentPage === "contact-page"
          }
          currentPage={currentPage}
        />

        <AnimatePresence mode="wait">
          {currentPage === "home" ? (
            <motion.div
              key="home"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <HomePage
                onProjectClick={handleProjectClick}
                onNavigateToAbout={handleNavigateToAboutPage}
                onNavigateToContact={
                  handleNavigateToContactPage
                }
              />
            </motion.div>
          ) : currentPage === "about-me" ? (
            <motion.div
              key="about-me"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <AboutMePage
                onNavigateToContact={
                  handleNavigateToContactPage
                }
              />
            </motion.div>
          ) : currentPage === "contact-page" ? (
            <motion.div
              key="contact-page"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <ContactPage />
            </motion.div>
          ) : currentPage === "project" ? (
            <motion.div
              key="project"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <ProjectDetail
                projectId={currentProject}
                onProjectClick={handleProjectClick}
                onLogoClick={handleBackToHome}
                onNavigate={handleNavigateToSection}
              />
            </motion.div>
          ) : null}
        </AnimatePresence>

        <StudentFooter onNavigate={handleNavigateToSection} />
        <AnimatePresence>
          {introLens && (
            <LensIntro key="lens-intro" lens={introLens} onDone={closeIntro} />
          )}
        </AnimatePresence>
        <Toaster />
      </div>
    </>
  );
}
export default function App() {
  // 单一 LanguageProvider：开屏 → 首页切换时不会重置语言
  return (
    <LanguageProvider>
      <LensProvider>
        <DocumentMeta />
        <AppContent />
      </LensProvider>
    </LanguageProvider>
  );
}
