import { motion } from 'motion/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useLanguage } from './LanguageContext';

interface ProjectNavigationProps {
  currentProjectId: string;
  onProjectClick: (projectId: string) => void;
}

// 项目列表配置
// 顺序与首页一致：Solutions in Practice → Design Foundations
const PROJECTS = [
  { id: 'mochi', titleEn: 'Mochi Island', titleZh: 'Mochi Island' },
  { id: 'vanta', titleEn: 'VANTA · AI Vision Fish', titleZh: 'VANTA · AI 视觉机器鱼' },
  { id: 'careeredu', titleEn: 'AI Job-Search Academy', titleZh: 'AI 求职教育网站' },
  { id: 'project3', titleEn: 'StrideGuard', titleZh: 'StrideGuard' },
  { id: 'neurodrive', titleEn: 'NeuroDrive', titleZh: 'NeuroDrive' },
  { id: 'hui', titleEn: 'Family Emotional Future Assistant', titleZh: '家庭情感未来助手' },
  { id: 'project4', titleEn: 'SkySafe Heros', titleZh: 'SkySafe Heros' },
];

export function ProjectNavigation({ currentProjectId, onProjectClick }: ProjectNavigationProps) {
  const { language } = useLanguage();
  
  // 找到当前项目的索引
  const currentIndex = PROJECTS.findIndex(p => p.id === currentProjectId);
  
  // 计算上一个和下一个项目
  const prevProject = currentIndex > 0 ? PROJECTS[currentIndex - 1] : PROJECTS[PROJECTS.length - 1];
  const nextProject = currentIndex < PROJECTS.length - 1 ? PROJECTS[currentIndex + 1] : PROJECTS[0];
  
  const handleNavigation = (projectId: string) => {
    onProjectClick(projectId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="bg-black border-t border-white/10 py-8 md:py-12">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between max-w-6xl mx-auto">
          {/* 上一个项目 */}
          <motion.button
            onClick={() => handleNavigation(prevProject.id)}
            className="group flex items-center gap-2 md:gap-4 flex-1 text-left"
            whileHover={{ x: -5 }}
            transition={{ duration: 0.3 }}
            data-interactive="true"
          >
            <div className="flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-full border border-white/20 group-hover:border-[#DBFE02] group-hover:bg-[#DBFE02]/10 transition-all flex-shrink-0">
              <ChevronLeft className="text-white/60 group-hover:text-[#DBFE02] transition-colors" size={20} />
            </div>
            <div className="min-w-0">
              <p className="text-white/40 text-xs md:text-sm mb-0.5 md:mb-1">
                {language === 'zh' ? '上一个' : 'Previous'}
              </p>
              <p className="text-white group-hover:text-[#DBFE02] transition-colors font-medium text-sm md:text-base truncate">
                {language === 'zh' ? prevProject.titleZh : prevProject.titleEn}
              </p>
            </div>
          </motion.button>

          {/* 中间分隔符 - 在小屏幕上隐藏 */}
          <div className="hidden sm:flex items-center justify-center mx-4 md:mx-8">
            <div className="w-px h-12 md:h-16 bg-white/10"></div>
          </div>

          {/* 下一个项目 */}
          <motion.button
            onClick={() => handleNavigation(nextProject.id)}
            className="group flex items-center gap-2 md:gap-4 flex-1 text-right justify-end"
            whileHover={{ x: 5 }}
            transition={{ duration: 0.3 }}
            data-interactive="true"
          >
            <div className="min-w-0">
              <p className="text-white/40 text-xs md:text-sm mb-0.5 md:mb-1">
                {language === 'zh' ? '下一个' : 'Next'}
              </p>
              <p className="text-white group-hover:text-[#DBFE02] transition-colors font-medium text-sm md:text-base truncate">
                {language === 'zh' ? nextProject.titleZh : nextProject.titleEn}
              </p>
            </div>
            <div className="flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-full border border-white/20 group-hover:border-[#DBFE02] group-hover:bg-[#DBFE02]/10 transition-all flex-shrink-0">
              <ChevronRight className="text-white/60 group-hover:text-[#DBFE02] transition-colors" size={20} />
            </div>
          </motion.button>
        </div>

        {/* 项目指示器（点点） */}
        <div className="flex items-center justify-center gap-2 mt-8 md:mt-12">
          {PROJECTS.map((project, index) => (
            <button
              key={project.id}
              onClick={() => handleNavigation(project.id)}
              className="group relative"
              data-interactive="true"
            >
              <div
                className={`w-2 h-2 rounded-full transition-all ${
                  project.id === currentProjectId
                    ? 'bg-[#DBFE02] w-6 md:w-8'
                    : 'bg-white/20 hover:bg-white/40'
                }`}
              />
              {/* 工具提示 - 在小屏幕上简化 */}
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 md:px-3 py-1 bg-white/10 backdrop-blur-sm rounded-lg text-white text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                {language === 'zh' ? project.titleZh : project.titleEn}
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}