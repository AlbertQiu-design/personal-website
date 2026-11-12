import { SolutionCaseDetail } from './SolutionCaseDetail';

// 项目级图片资源以后只在本文件中导入（资源作用域原则）
interface VantaDetailProps {
  onNavigate?: (sectionId: string) => void;
}

export function VantaDetail({ onNavigate }: VantaDetailProps) {
  return <SolutionCaseDetail projectId="vanta" onNavigate={onNavigate} />;
}
