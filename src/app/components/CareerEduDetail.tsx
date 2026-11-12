import { SolutionCaseDetail } from './SolutionCaseDetail';

// 项目级图片资源以后只在本文件中导入（资源作用域原则）
interface CareerEduDetailProps {
  onNavigate?: (sectionId: string) => void;
}

export function CareerEduDetail({ onNavigate }: CareerEduDetailProps) {
  return <SolutionCaseDetail projectId="careeredu" onNavigate={onNavigate} />;
}
