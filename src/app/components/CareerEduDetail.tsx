import { SolutionCaseDetail } from './SolutionCaseDetail';
import { useLanguage } from './LanguageContext';
// 项目级图片只在本路由导入。封面另在 solutionProjects 中引用，供首页卡片共用。
import jobs from '../assets/academy/cover.jpg';
import onboarding from '../assets/academy/onboarding.jpg';
import filters from '../assets/academy/filters.jpg';
import pasteJd from '../assets/academy/paste-jd.jpg';
import uploadCv from '../assets/academy/upload-cv.jpg';
import learn from '../assets/academy/learn.jpg';
import lesson from '../assets/academy/lesson.jpg';
import analyze from '../assets/academy/analyze.jpg';

interface CareerEduDetailProps {
  onNavigate?: (sectionId: string) => void;
}

const SHOTS = [
  { src: onboarding, key: 'academy.shot.onboarding' },
  { src: jobs, key: 'academy.shot.jobs' },
  { src: filters, key: 'academy.shot.filters' },
  { src: pasteJd, key: 'academy.shot.jd' },
  { src: uploadCv, key: 'academy.shot.cv' },
  { src: learn, key: 'academy.shot.learn' },
  { src: lesson, key: 'academy.shot.lesson' },
  { src: analyze, key: 'academy.shot.analyze' },
];

function AcademyWalkthrough() {
  const { t } = useLanguage();
  return (
    <div className="flex flex-col gap-8 md:gap-10">
      {SHOTS.map((shot) => (
        <figure key={shot.key}>
          <img
            src={shot.src}
            alt={t(`${shot.key}.alt`)}
            className="w-full rounded-3xl bg-white"
          />
          <figcaption className="mt-3 text-sm leading-relaxed text-white/55 md:text-base">
            {t(`${shot.key}.caption`)}
          </figcaption>
        </figure>
      ))}
    </div>
  );
}

export function CareerEduDetail({ onNavigate }: CareerEduDetailProps) {
  return <SolutionCaseDetail projectId="careeredu" onNavigate={onNavigate} leading={<AcademyWalkthrough />} />;
}
