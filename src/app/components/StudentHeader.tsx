import { motion, LayoutGroup, AnimatePresence } from 'motion/react';
import { Menu, X, Globe } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { useLanguage } from './LanguageContext';

interface StudentHeaderProps {
  onLogoClick?: () => void;
  onNavigate?: (sectionId: string) => void;
  isHomePage?: boolean;
  currentPage?: 'splash' | 'home' | 'project' | 'about-me' | 'contact-page';
}

export function StudentHeader({ onLogoClick, onNavigate, isHomePage = false, currentPage }: StudentHeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [bgPosition, setBgPosition] = useState({ left: 0, width: 0 });
  const { language, setLanguage, t } = useLanguage();
  const buttonRefs = useRef<{ [key: string]: HTMLButtonElement | null }>({});
  const containerRef = useRef<HTMLDivElement | null>(null);

  // 计算黄色背景的位置和宽度
  const navItems = [
    { labelKey: 'nav.work', id: 'works' },
    { labelKey: 'nav.about', id: 'about' },
    { labelKey: 'nav.contact', id: 'contact' },
  ];
  
  const activeIndex = navItems.findIndex(item => item.id === activeSection);
  const showBackground = activeIndex !== -1;

  // 计算黄色背景的位置
  useEffect(() => {
    if (activeSection && buttonRefs.current[activeSection] && containerRef.current) {
      const button = buttonRefs.current[activeSection];
      const container = containerRef.current;
      const buttonRect = button.getBoundingClientRect();
      const containerRect = container.getBoundingClientRect();
      
      setBgPosition({
        left: buttonRect.left - containerRect.left,
        width: buttonRect.width,
      });
    }
  }, [activeSection, language]); // 重新计算当 activeSection 或 language 改变时

  const handleNavClick = (id: string) => {
    if (onNavigate) {
      onNavigate(id);
    }
    setIsMenuOpen(false);
  };

  // 显示导航菜单的条件：在首页、项目详情页、About Me 页面或 Contact 页面
  const showNav = isHomePage || currentPage === 'project' || currentPage === 'about-me' || currentPage === 'contact-page';

  const handleLogoClick = () => {
    if (onLogoClick) {
      onLogoClick();
    }
  };

  // 检测当前页面和滚动位置，高亮对应的导航项
  useEffect(() => {
    // 根据当前页面设置高亮
    if (currentPage === 'about-me') {
      setActiveSection('about');
      return;
    }
    if (currentPage === 'contact-page') {
      setActiveSection('contact');
      return;
    }
    
    // 在项目详情页时，高亮 works
    if (currentPage === 'project') {
      setActiveSection('works');
      return;
    }
    
    // 在首页时，根据滚动位置设置高亮
    if (currentPage !== 'home') {
      setActiveSection('');
      return;
    }

    const handleScroll = () => {
      const sections = ['works', 'about', 'contact'];
      const scrollPosition = window.scrollY + 200; // 添加偏移量

      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(sectionId);
            return;
          }
        }
      }
      
      // 如果在最顶部，默认高亮 works
      if (window.scrollY < 200) {
        setActiveSection('works');
      }
    };

    handleScroll(); // 初始检查
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [currentPage]);

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'zh' : 'en');
  };

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50 bg-black/50 backdrop-blur-sm border-b border-white/10"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <nav className="container mx-auto px-6 py-5">
        <div className="flex items-center justify-between">
          {/* 左侧：Logo */}
          <motion.button
            onClick={handleLogoClick}
            className="text-white text-3xl cursor-pointer bg-transparent border-0 p-0 font-bold tracking-wider"
            whileHover={{ scale: 1.05 }}
            data-interactive="true"
          >
            <span className="font-bold not-italic no-underline text-[24px] text-[rgb(255,255,0)]">{language === 'zh' ? '邱皓惟' : 'Albert  Qiu'}</span>
          </motion.button>

          {/* 中间：导航菜单 */}
          {showNav && (
            <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 items-center justify-center">
              {/* 导航菜单项 - 整体边框容器 */}
              <div className="relative flex items-center gap-1 p-1 rounded-full border border-white/20 bg-white/5" ref={containerRef}>
                {/* 单个黄色背景，通过位置移动 */}
                {showBackground && (
                  <motion.div
                    className="absolute bg-[#DBFE02] rounded-full"
                    initial={false}
                    animate={{
                      left: `${bgPosition.left}px`,
                      width: `${bgPosition.width}px`,
                      height: 'calc(100% - 8px)',
                      top: '4px',
                    }}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                )}
                {navItems.map((item) => (
                  <motion.button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className={`relative flex-1 transition-all text-lg px-4 py-2 rounded-full z-10 font-semibold ${
                      activeSection === item.id
                        ? 'text-black'
                        : 'text-white/60 hover:text-white/90'
                    }`}
                    data-interactive="true"
                    ref={(ref) => (buttonRefs.current[item.id] = ref)}
                  >
                    {t(item.labelKey)}
                  </motion.button>
                ))}
              </div>
            </div>
          )}

          {/* 右侧：语言切换 */}
          {showNav && (
            <div className="hidden md:flex items-center gap-3">
              {/* 语言切换按钮 */}
              <motion.button
                onClick={toggleLanguage}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors text-white/80 hover:text-white border border-white/20"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                data-interactive="true"
                aria-label="Toggle language"
              >
                <Globe size={18} />
                <span style={{ fontSize: '1rem' }}>
                  {language === 'en' ? '中' : 'EN'}
                </span>
              </motion.button>
            </div>
          )}

          {showNav && (
            <button
              className="md:hidden text-white"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              data-interactive="true"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          )}
        </div>

        {showNav && isMenuOpen && (
          <motion.div
            className="md:hidden mt-6 space-y-4 max-h-[calc(100vh-6rem)] overflow-y-auto pb-4"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
          >
            {[
              { labelKey: 'nav.work', id: 'works' },
              { labelKey: 'nav.about', id: 'about' },
              { labelKey: 'nav.contact', id: 'contact' },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`block w-full text-left text-lg px-4 py-2 rounded-full transition-all font-semibold ${
                  activeSection === item.id
                    ? 'text-black bg-[#DBFE02]'
                    : 'text-white/60 hover:text-white/90 hover:bg-white/10'
                }`}
                data-interactive="true"
              >
                {t(item.labelKey)}
              </button>
            ))}
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-white/20 text-white/80"
              data-interactive="true"
              aria-label="Toggle language"
            >
              <Globe size={16} />
              {language === 'en' ? '中文' : 'English'}
            </button>
          </motion.div>
        )}
      </nav>
    </motion.header>
  );
}