import { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Play, Laptop, ShieldCheck, Download } from 'lucide-react';
import { useLanguage } from './LanguageContext';
import { useLensT, Lens } from './LensContext';
import { SpringText } from './SpringText';
import { StatusPill, SOLUTION_PROJECTS } from './solutionProjects';
import { ImageWithFallback } from './figma/ImageWithFallback';
// —— 项目级资源：只在本路由内导入（资源作用域原则）——
import mochiVideo from '../assets/mochi/mochi-island-web.mp4';
import problemImg from '../assets/mochi/problem.jpg';
import glanceImg from '../assets/mochi/glance.jpg';
import approveImg from '../assets/mochi/approve.jpg';
import fedImg from '../assets/mochi/fed.jpg';
import recapImg from '../assets/mochi/recap.jpg';
import customizeImg from '../assets/mochi/customize.jpg';

interface MochiIslandDetailProps {
  onNavigate?: (sectionId: string) => void;
}

// 宣传片章节（秒）
const CHAPTERS = [0, 8, 12, 20, 28, 44, 52, 58];

const FEATURES = [
  { key: 'problem', img: problemImg },
  { key: 'glance', img: glanceImg },
  { key: 'approve', img: approveImg },
  { key: 'fed', img: fedImg },
  { key: 'recap', img: recapImg },
  { key: 'customize', img: customizeImg },
];

const BUILD_ORDER: Record<Lens, string[]> = {
  all: ['requirements', 'states', 'integration'],
  ba: ['requirements', 'states', 'integration'],
  dse: ['integration', 'states', 'requirements'],
  aipm: ['states', 'requirements', 'integration'],
};
const BUILD_SOURCE: Record<string, string> = {
  requirements: 'BA résumé',
  states: 'AI résumé',
  integration: 'DSE résumé',
};

const fmt = (s: number) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;

export function MochiIslandDetail({ onNavigate }: MochiIslandDetailProps) {
  const { t } = useLanguage();
  const { tl, lens } = useLensT();
  const project = SOLUTION_PROJECTS.mochi;
  const videoRef = useRef<HTMLVideoElement>(null);
  const [active, setActive] = useState(0);
  const [videoError, setVideoError] = useState(false);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const onTime = () => {
      const tNow = v.currentTime;
      let idx = 0;
      CHAPTERS.forEach((c, i) => {
        if (tNow >= c) idx = i;
      });
      setActive(idx);
    };
    v.addEventListener('timeupdate', onTime);
    return () => v.removeEventListener('timeupdate', onTime);
  }, []);

  const seek = (i: number) => {
    const v = videoRef.current;
    setActive(i);
    if (!v) return;
    v.currentTime = CHAPTERS[i];
    v.play().catch(() => {
      /* 浏览器拦截自动播放时只完成跳转 */
    });
  };

  const meta = [
    { label: t('card.role'), value: t('project.mochi.role') },
    { label: t('card.stage'), value: t('project.mochi.stage') },
    { label: t('card.period'), value: t('project.mochi.period') },
    { label: t('mochi.meta.stack'), value: t('mochi.meta.stackValue') },
    { label: t('mochi.meta.build'), value: t('mochi.meta.buildValue') },
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="pt-28 md:pt-32 px-6 md:px-12 lg:px-32 pb-20">
        <div className="max-w-7xl mx-auto">
          {/* 1. 封面横幅 */}
          <motion.div
            initial={{ opacity: 0, scale: 1.02 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="relative rounded-3xl overflow-hidden bg-sky-100 aspect-[4/3] sm:aspect-[1944/809]"
          >
            <ImageWithFallback
              src={project.cover}
              alt="Mochi Island — a white cat app icon floating beside the Mochi Island wordmark on a soft blue background"
              className="absolute inset-0 w-full h-full object-cover object-[38%_50%]"
            />
            <div className="absolute top-4 right-4 md:top-6 md:right-6">
              <StatusPill status="shipped" onImage />
            </div>
          </motion.div>

          {/* 2. 标题区 */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 mt-10 md:mt-16">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="lg:col-span-7"
            >
              <div className="flex flex-wrap gap-2 mb-6">
                {t('project.mochi.category')
                  .split(' & ')
                  .map((tag) => (
                    <span key={tag} className={`px-4 py-1.5 rounded-xl text-sm font-medium ${project.tagClass}`}>
                      {tag}
                    </span>
                  ))}
              </div>
              <h1 className="text-5xl md:text-7xl leading-[0.95] tracking-tight mb-6" style={{ fontWeight: 700 }}>
                <SpringText text={t('project.mochi.title')} />
              </h1>
              <p className="text-xl md:text-2xl text-sky-200 leading-snug mb-5 max-w-2xl">{t('mochi.tagline')}</p>
              <p className="text-white/65 text-base md:text-lg leading-relaxed max-w-2xl mb-6">
                {tl('project.mochi.description')}
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-xl border border-white/15 px-3 py-1.5 text-sm text-white/80">
                  <Laptop size={14} /> {t('mochi.badge.native')}
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-xl border border-white/15 px-3 py-1.5 text-sm text-white/80">
                  <ShieldCheck size={14} /> {t('mochi.badge.local')}
                </span>
              </div>
            </motion.div>
            <motion.dl
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:col-span-5 self-end divide-y divide-white/10 border-y border-white/10 font-meta text-sm"
            >
              {meta.map((m) => (
                <div key={m.label} className="flex justify-between gap-6 py-3">
                  <dt className="text-white/40 whitespace-nowrap">{m.label}</dt>
                  <dd className="text-white/85 text-right">{m.value}</dd>
                </div>
              ))}
            </motion.dl>
          </div>

          {/* 3. 宣传片 + 章节 */}
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="mt-16 md:mt-24"
          >
            <div className="flex items-end justify-between mb-5">
              <h2 className="text-2xl md:text-3xl" style={{ fontWeight: 700 }}>
                {t('mochi.video.title')}
              </h2>
              <span className="font-meta text-xs text-white/40">1:17 · EN</span>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
              <div className="lg:col-span-8 relative rounded-3xl overflow-hidden bg-zinc-900 aspect-video cursor-auto">
                {videoError ? (
                  <a
                    href={mochiVideo}
                    download="Mochi_Island.mp4"
                    className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-white/80"
                    data-interactive="true"
                  >
                    <ImageWithFallback src={project.cover} alt="" className="absolute inset-0 w-full h-full object-cover opacity-40" />
                    <Download className="relative" />
                    <span className="relative">{t('mochi.video.fallback')}</span>
                  </a>
                ) : (
                  <video
                    ref={videoRef}
                    src={mochiVideo}
                    poster={project.cover}
                    controls
                    playsInline
                    preload="metadata"
                    onError={() => setVideoError(true)}
                    className="absolute inset-0 w-full h-full object-contain bg-black"
                  />
                )}
              </div>
              <div className="lg:col-span-4 rounded-3xl border border-white/10 bg-white/[0.03] p-3 md:p-4">
                <p className="px-2 pb-2 font-meta text-[11px] uppercase tracking-[0.2em] text-white/40">
                  {t('mochi.chapters')}
                </p>
                <ol className="flex lg:flex-col gap-1 overflow-x-auto lg:overflow-visible -mx-1 px-1 pb-1 lg:pb-0">
                  {CHAPTERS.map((c, i) => (
                    <li key={c} className="flex-shrink-0">
                      <button
                        onClick={() => seek(i)}
                        className={`relative w-full flex items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-colors whitespace-nowrap ${
                          active === i ? 'bg-sky-300/15 text-white' : 'text-white/60 hover:bg-white/5 hover:text-white'
                        }`}
                        data-interactive="true"
                      >
                        <span
                          className={`absolute left-0 top-2 bottom-2 w-0.5 rounded-full transition-colors ${
                            active === i ? 'bg-sky-300' : 'bg-transparent'
                          }`}
                        />
                        <span className="font-meta text-xs text-white/40 w-9">{fmt(c)}</span>
                        <span className="text-sm md:text-base flex-1">{t(`mochi.ch.${i + 1}`)}</span>
                        {active === i && <Play size={12} className="text-sky-300 hidden lg:block" />}
                      </button>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </motion.section>

          {/* 4. 功能走查 */}
          <section className="mt-20 md:mt-28">
            <h2 className="text-2xl md:text-3xl mb-10 md:mb-14" style={{ fontWeight: 700 }}>
              {t('mochi.walkthrough')}
            </h2>
            <div className="space-y-14 md:space-y-24">
              {FEATURES.map((f, i) => (
                <motion.div
                  key={f.key}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ duration: 0.6 }}
                  className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-12 items-center"
                >
                  <div className={`md:col-span-7 ${i % 2 === 1 ? 'md:order-2' : ''}`}>
                    <div className="rounded-2xl overflow-hidden border border-white/10 bg-zinc-900 aspect-video">
                      <ImageWithFallback
                        src={f.img}
                        alt={t(`mochi.feature.${f.key}.title`)}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                  <div className={`md:col-span-5 ${i % 2 === 1 ? 'md:order-1' : ''}`}>
                    <div className="flex items-center gap-3 mb-4">
                      <span className="font-meta text-xs text-white/30">{String(i + 1).padStart(2, '0')}</span>
                      <span className="rounded-lg border border-sky-300/30 bg-sky-300/10 px-2 py-0.5 font-meta text-[11px] uppercase tracking-wider text-sky-200">
                        {t(`mochi.feature.${f.key}.tag`)}
                      </span>
                    </div>
                    <h3 className="text-2xl md:text-3xl leading-tight mb-3" style={{ fontWeight: 700 }}>
                      {t(`mochi.feature.${f.key}.title`)}
                    </h3>
                    <p className="text-white/65 text-base md:text-lg leading-relaxed">{t(`mochi.feature.${f.key}.body`)}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>

          {/* 5. Behind the build */}
          <section className="mt-20 md:mt-28">
            <h2 className="text-2xl md:text-3xl mb-8" style={{ fontWeight: 700 }}>
              {t('mochi.build')}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {BUILD_ORDER[lens].map((k, i) => (
                <motion.div
                  key={k}
                  layout
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 flex flex-col"
                >
                  <div className="flex items-center justify-between mb-6">
                    <span className="font-meta text-xs text-white/30">0{i + 1}</span>
                    <span className="font-meta text-[11px] text-white/35">{BUILD_SOURCE[k]}</span>
                  </div>
                  <h3 className="text-xl mb-3">{t(`mochi.build.${k}.title`)}</h3>
                  <p className="text-white/65 text-sm md:text-base leading-relaxed">{t(`mochi.build.${k}.body`)}</p>
                </motion.div>
              ))}
            </div>
          </section>

          <div className="flex justify-center pt-16 md:pt-20">
            <button
              onClick={() => onNavigate && onNavigate('works')}
              className="group flex items-center gap-3 px-8 py-4 bg-[#DBFE02] text-black rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-[#DBFE02]/30"
              data-interactive="true"
            >
              <ArrowLeft className="w-5 h-5 transition-transform duration-300 group-hover:-translate-x-1" />
              <span className="text-lg font-medium">{t('case.back')}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
