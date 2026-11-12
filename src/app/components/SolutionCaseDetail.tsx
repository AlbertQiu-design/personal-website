import { motion } from 'motion/react';
import { ArrowLeft, Clock } from 'lucide-react';
import { useLanguage } from './LanguageContext';
import { useLensT } from './LensContext';
import { SOLUTION_PROJECTS, SolutionId, ProjectCover } from './solutionProjects';
import { SpringText } from './SpringText';

interface SolutionCaseDetailProps {
  projectId: SolutionId;
  onNavigate?: (sectionId: string) => void;
}

const SECTIONS = ['context', 'requirements', 'workflow', 'architecture', 'validation', 'outcome', 'next'];

/**
 * BA 视角的通用案例模板：Context / Requirements / Workflow & States / Solution Architecture / Validation / Outcome / Next
 * 有内容的章节读取 case.<projectId>.<section>，没有的显示「Drafting」与引导问句。
 */
export function SolutionCaseDetail({ projectId, onNavigate }: SolutionCaseDetailProps) {
  const { t, raw } = useLanguage();
  const { tl } = useLensT();
  const project = SOLUTION_PROJECTS[projectId];
  const base = `project.${projectId}`;
  const planned = project.status === 'planned';

  const meta = [
    { label: t('card.role'), value: t(`${base}.role`) },
    { label: t('card.stage'), value: t(`${base}.stage`) },
    { label: t('card.period'), value: t(`${base}.period`) },
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="pt-28 md:pt-32 px-6 md:px-12 lg:px-32 pb-20">
        <div className="max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <ProjectCover project={project} large className="rounded-3xl aspect-[4/3] md:aspect-[21/9]" />
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 mt-10 md:mt-16">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="lg:col-span-5"
            >
              <div className="flex flex-wrap gap-2 mb-6">
                {t(`${base}.category`).split(' & ').map((tag) => (
                  <span key={tag} className={`px-4 py-1.5 rounded-xl text-sm font-medium ${project.tagClass}`}>
                    {tag}
                  </span>
                ))}
              </div>
              <h1 className="text-3xl md:text-5xl leading-tight mb-6" style={{ fontWeight: 700 }}>
                <SpringText text={t(`${base}.title`)} />
              </h1>
              <p className="text-white/70 text-base md:text-lg leading-relaxed mb-8">{tl(`${base}.description`)}</p>
              <dl className="divide-y divide-white/10 border-y border-white/10 font-meta text-sm">
                {meta.map((m) => (
                  <div key={m.label} className="flex justify-between gap-4 py-3">
                    <dt className="text-white/40">{m.label}</dt>
                    <dd className="text-white/80 text-right">{m.value}</dd>
                  </div>
                ))}
              </dl>

              {planned && (
                <div className="mt-8 rounded-2xl border border-white/15 bg-white/[0.04] p-6">
                  <div className="flex items-center gap-2 text-white mb-2">
                    <Clock size={16} />
                    <span className="font-medium">{t('case.planned')}</span>
                  </div>
                  <p className="text-white/60 text-sm leading-relaxed">{t('case.comingSoonDesc')}</p>
                </div>
              )}
            </motion.div>

            <div className="lg:col-span-7">
              <ol className="space-y-2">
                {SECTIONS.map((key, i) => {
                  const content = raw(`case.${projectId}.${key}`);
                  return (
                    <motion.li
                      key={key}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: i * 0.05 }}
                      className={`grid grid-cols-[2.5rem_1fr_auto] items-start gap-4 rounded-2xl border p-5 md:p-6 transition-colors ${
                        content ? 'border-white/15 bg-white/[0.05]' : 'border-white/10 bg-white/[0.02]'
                      }`}
                    >
                      <span className="font-meta text-sm text-white/30 pt-0.5">{String(i + 1).padStart(2, '0')}</span>
                      <div>
                        <h3 className="text-lg md:text-xl text-white mb-1">{t(`case.${key}`)}</h3>
                        <p className={content ? 'text-white/80 text-sm md:text-base leading-relaxed' : 'text-white/40 text-sm md:text-base'}>
                          {content || t(`case.${key}.q`)}
                        </p>
                      </div>
                      {!content && (
                        <span className="font-meta text-[11px] uppercase tracking-wider text-white/30 border border-white/10 rounded-xl px-2.5 py-1 whitespace-nowrap">
                          {t('case.drafting')}
                        </span>
                      )}
                    </motion.li>
                  );
                })}
              </ol>
            </div>
          </div>

          <div className="flex justify-center pt-16">
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
