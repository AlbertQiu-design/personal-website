import { ProjectRecommendations } from './ProjectRecommendations';
import { ProjectNavigation } from './ProjectNavigation';
import { SkysafeHerosDetail } from './SkysafeHerosDetail';
import { StrideGuardDetail } from './StrideGuardDetail';
import { NeuroDriveDetail } from './NeuroDriveDetail';
import { RobotHuiDetail } from './RobotHuiDetail';
import { MochiIslandDetail } from './MochiIslandDetail';
import { VantaDetail } from './VantaDetail';
import { CareerEduDetail } from './CareerEduDetail';
import { useLanguage } from './LanguageContext';

interface ProjectDetailProps {
  projectId: string;
  onProjectClick: (projectId: string) => void;
  onLogoClick?: () => void;
  onNavigate?: (sectionId: string) => void;
}

export function ProjectDetail({ projectId, onProjectClick, onLogoClick, onNavigate }: ProjectDetailProps) {
  const { t } = useLanguage();
  
  // Solutions in Practice —— Mochi（真实素材）/ VANTA / 求职教育网站
  const buildingPages: Record<string, typeof MochiIslandDetail> = {
    mochi: MochiIslandDetail,
    vanta: VantaDetail,
    careeredu: CareerEduDetail,
  };
  const BuildingPage = buildingPages[projectId];
  if (BuildingPage) {
    return (
      <main>
        <BuildingPage onNavigate={onNavigate} />
        <ProjectNavigation currentProjectId={projectId} onProjectClick={onProjectClick} />
        <ProjectRecommendations currentProjectId={projectId} onProjectClick={onProjectClick} />
      </main>
    );
  }

  // NeuroDrive 项目
  if (projectId === 'neurodrive') {
    return (
      <main>
        <NeuroDriveDetail onNavigate={onNavigate} />
        <ProjectNavigation currentProjectId={projectId} onProjectClick={onProjectClick} />
        <ProjectRecommendations currentProjectId={projectId} onProjectClick={onProjectClick} />
      </main>
    );
  }

  // Desktop Robot HUI 项目
  if (projectId === 'hui') {
    return (
      <main>
        <RobotHuiDetail onNavigate={onNavigate} />
        <ProjectNavigation currentProjectId={projectId} onProjectClick={onProjectClick} />
        <ProjectRecommendations currentProjectId={projectId} onProjectClick={onProjectClick} />
      </main>
    );
  }

  // SKYSAFE HEROS 项目
  if (projectId === 'project4') {
    return (
      <main>
        <SkysafeHerosDetail onNavigate={onNavigate} />
        <ProjectNavigation currentProjectId={projectId} onProjectClick={onProjectClick} />
        <ProjectRecommendations currentProjectId={projectId} onProjectClick={onProjectClick} />
      </main>
    );
  }

  // StrideGuard 项目
  if (projectId === 'project3') {
    return (
      <main>
        <StrideGuardDetail onNavigate={onNavigate} />
        <ProjectNavigation currentProjectId={projectId} onProjectClick={onProjectClick} />
        <ProjectRecommendations currentProjectId={projectId} onProjectClick={onProjectClick} />
      </main>
    );
  }

  // 其他项目的占位符
  return (
    <main className="min-h-screen bg-black">
      <div className="flex items-center justify-center min-h-[70vh] pt-32">
        <div className="text-center">
          <h1 className="text-white mb-4" style={{ fontSize: '3rem', fontWeight: 600 }}>
            {t('common.comingSoon')}
          </h1>
          <p className="text-white/60" style={{ fontSize: '1.25rem' }}>
            {t('common.loading')}
          </p>
        </div>
      </div>
      <ProjectNavigation currentProjectId={projectId} onProjectClick={onProjectClick} />
      <ProjectRecommendations currentProjectId={projectId} onProjectClick={onProjectClick} />
    </main>
  );
}