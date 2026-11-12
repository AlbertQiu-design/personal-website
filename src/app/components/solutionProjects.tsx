import { useLanguage } from './LanguageContext';
import type { Lens } from './LensContext';
import { ImageWithFallback } from './figma/ImageWithFallback';
// 首页卡片 + Mochi 详情页共用的封面（首页预览属于允许的全局资源）
// 由 src/imports/____.png 压缩而来（1944×809，JPG）
import mochiCover from '../assets/mochi/cover.jpg';

export type SolutionId = 'mochi' | 'vanta' | 'careeredu';
export type SolutionStatus = 'shipped' | 'tested' | 'planned';

export interface SolutionProject {
  id: SolutionId;
  status: SolutionStatus;
  tagClass: string;
  accentText: string;
  glow: string;
  cover?: string;
}

export const SOLUTION_PROJECTS: Record<SolutionId, SolutionProject> = {
  mochi: {
    id: 'mochi',
    status: 'shipped',
    tagClass: 'bg-blue-200 text-blue-950',
    accentText: 'text-blue-300',
    glow: 'from-blue-400/25',
    cover: mochiCover,
  },
  vanta: {
    id: 'vanta',
    status: 'tested',
    tagClass: 'bg-cyan-200 text-cyan-950',
    accentText: 'text-cyan-200',
    glow: 'from-cyan-300/20',
  },
  careeredu: {
    id: 'careeredu',
    status: 'planned',
    tagClass: 'bg-emerald-200 text-emerald-950',
    accentText: 'text-emerald-200',
    glow: 'from-emerald-300/20',
  },
};

/** 按身份排序 */
export const SOLUTION_ORDER: Record<Lens, SolutionId[]> = {
  all: ['mochi', 'vanta', 'careeredu'],
  ba: ['mochi', 'vanta', 'careeredu'],
  dse: ['vanta', 'mochi', 'careeredu'],
  aipm: ['mochi', 'careeredu', 'vanta'],
};

export const ALL_SOLUTION_IDS: SolutionId[] = ['mochi', 'vanta', 'careeredu'];

const NOISE =
  "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)' opacity='0.55'/></svg>\")";

function Motif({ id }: { id: SolutionId }) {
  if (id === 'vanta') {
    // 视野扇形 + 方位刻度环 + 碰撞预警点
    return (
      <svg viewBox="0 0 400 300" className="absolute inset-0 w-full h-full" preserveAspectRatio="xMidYMid slice" aria-hidden>
        <g transform="translate(270 150)">
          {Array.from({ length: 36 }).map((_, i) => (
            <line
              key={i}
              x1="0"
              y1={-96}
              x2="0"
              y2={i % 9 === 0 ? -84 : -90}
              stroke="#a5f3fc"
              strokeOpacity={i % 9 === 0 ? 0.7 : 0.3}
              transform={`rotate(${i * 10})`}
            />
          ))}
          <circle r="96" fill="none" stroke="#a5f3fc" strokeOpacity="0.25" />
          <circle r="60" fill="none" stroke="#a5f3fc" strokeOpacity="0.12" />
          <path d="M0 0 L-70 -62 A 94 94 0 0 1 70 -62 Z" fill="#a5f3fc" opacity="0.14" />
          <path d="M0 0 L-70 -62 M0 0 L70 -62" stroke="#a5f3fc" strokeOpacity="0.5" />
          <circle cx="34" cy="-58" r="5" fill="#fda4af" />
          <circle cx="34" cy="-58" r="5" fill="none" stroke="#fda4af" className="aq-ping-svg" />
          <path d="M-14 6 Q0 -10 16 4 Q0 14 -14 6 Z M-14 6 L-24 0 L-24 12 Z" fill="#a5f3fc" opacity="0.9" />
        </g>
      </svg>
    );
  }
  const bars = [38, 56, 48, 82, 74, 110, 128, 160];
  return (
    <svg viewBox="0 0 400 300" className="absolute inset-0 w-full h-full" preserveAspectRatio="xMidYMid slice" aria-hidden>
      {[60, 110, 160, 210].map((y) => (
        <line key={y} x1="0" x2="400" y1={y} y2={y} stroke="#a7f3d0" strokeOpacity="0.12" />
      ))}
      {bars.map((h, i) => (
        <rect key={i} x={170 + i * 26} y={230 - h} width="14" height={h} rx="3" fill="#a7f3d0" opacity={0.2 + i * 0.07} />
      ))}
      <polyline
        points={bars.map((h, i) => `${177 + i * 26},${222 - h}`).join(' ')}
        fill="none"
        stroke="#a7f3d0"
        strokeWidth="1.5"
        strokeDasharray="4 4"
      />
    </svg>
  );
}

export function StatusPill({ status, onImage = false }: { status: SolutionStatus; onImage?: boolean }) {
  const { t } = useLanguage();
  return (
    <span
      className={`inline-flex items-center gap-2 font-meta text-xs ${
        onImage ? 'rounded-lg bg-black/55 backdrop-blur-sm px-2.5 py-1 text-white/85' : 'text-white/60'
      }`}
    >
      {status === 'planned' ? (
        <span className="w-2 h-2 rounded-full border border-white/50" />
      ) : (
        <span className="relative flex w-2 h-2">
          {status === 'shipped' && <span className="absolute inset-0 rounded-full bg-[#DBFE02] aq-breathe" />}
          <span className={`relative w-2 h-2 rounded-full ${status === 'shipped' ? 'bg-[#DBFE02]' : 'bg-cyan-300'}`} />
        </span>
      )}
      {t(`card.status.${status}`)}
    </span>
  );
}

interface ProjectCoverProps {
  project: SolutionProject;
  index?: number;
  className?: string;
  large?: boolean;
  /** 封面图的 object-position（Mochi 卡片需要偏左以露出图标和字标） */
  imagePosition?: string;
}

export function ProjectCover({ project, index, className = '', large = false, imagePosition = 'object-[40%_50%]' }: ProjectCoverProps) {
  const { t } = useLanguage();
  const pad = large ? 'p-6 md:p-10' : 'p-4 md:p-5';

  if (project.cover) {
    return (
      <div className={`relative overflow-hidden bg-sky-100 ${className}`}>
        <ImageWithFallback
          src={project.cover}
          alt={`${t(`project.${project.id}.title`)} cover`}
          className={`absolute inset-0 w-full h-full object-cover ${imagePosition}`}
        />
        <div className={`absolute inset-x-0 top-0 flex items-center justify-between ${pad}`}>
          {index !== undefined ? (
            <span className="rounded-lg bg-black/55 backdrop-blur-sm px-2.5 py-1 font-meta text-xs text-white/85">
              {String(index + 1).padStart(2, '0')} / 03
            </span>
          ) : (
            <span />
          )}
          <StatusPill status={project.status} onImage />
        </div>
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden bg-zinc-950 ${className}`}>
      <div className={`absolute inset-0 bg-gradient-to-br ${project.glow} via-zinc-950 to-black`} />
      <Motif id={project.id} />
      <div className="absolute inset-0 mix-blend-overlay opacity-40 pointer-events-none" style={{ backgroundImage: NOISE }} />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
      <div className={`absolute inset-0 flex flex-col justify-between ${pad}`}>
        <div className="flex items-center justify-between font-meta text-xs text-white/60">
          <span>{index !== undefined ? `${String(index + 1).padStart(2, '0')} / 03` : ''}</span>
          <StatusPill status={project.status} />
        </div>
        <h3
          className={`text-white leading-[0.95] tracking-tight ${large ? 'text-4xl md:text-7xl' : 'text-3xl md:text-4xl'}`}
          style={{ fontWeight: 700 }}
        >
          {t(`project.${project.id}.title`)}
        </h3>
      </div>
    </div>
  );
}
