import { Fragment, useState } from 'react';
import { CertificateGrid, CertificateLightbox, CERTIFICATES } from './AwardCertificates';
import { motion } from 'motion/react';
import { Mail, Linkedin, Award, Briefcase, GraduationCap, MessageCircle, Trophy, ChevronDown, Compass, Crosshair, Cpu, Rocket, Languages } from 'lucide-react';
import * as Accordion from '@radix-ui/react-accordion';
import { LINKEDIN_URL, CONTACT_EMAIL } from './resume';
import { SpringText } from './SpringText';
import { ResumeMenu } from './ResumeMenu';
import { useLensT, Lens } from './LensContext';
import { useLanguage } from './LanguageContext';
import profileImage from 'figma:asset/fde09790ec64109f7318444b19ec124073d2c1cb.png';
import westlakeLogo from 'figma:asset/419df92fffcc33117869b100bf1f0336fbd9445c.png';
import zjuLogo from 'figma:asset/6c1e1669599ee2d50095705844305606a2ebe2d5.png';
import asianGamesLogo from 'figma:asset/1b4b18a399d4f8d4c8001da56c2c254e307a146b.png';
import svgPaths from '../imports/svg-dg1br66ol8';
import BlenderLogo from '../imports/Blender1';
import keyshotLogo from 'figma:asset/b9bd4ed1eb3ea82f659829182a04bbaed02e6393.png';
import rhinoLogo from 'figma:asset/88710290d25c3a00ae1407c2aaa849a9b3ef0824.png';
import aiLogo from 'figma:asset/de4f4e0e98388afc3e3324de9c1ffe542980fa93.png';
import psLogo from 'figma:asset/549336eb160c9c7f71d270be2015718b997f0f32.png';
import processingLogo from 'figma:asset/34793c6fb23c8a253374f7087224cbe1ec720738.png';
import arduinoLogo from 'figma:asset/44d67a02ed2a5fbaa7a533654c07b32cd06ae71f.png';

interface AboutMePageProps {
  onNavigateToContact?: () => void;
}

// 经历时间线（数据驱动）
const EXPERIENCES: { id: string; logo?: string; monogram?: string }[] = [
  { id: 'mcj', monogram: 'MCJ' },
  { id: 'westlake', logo: westlakeLogo },
  { id: 'zju', logo: zjuLogo },
  { id: 'asiangames', logo: asianGamesLogo },
];

// 技能分组（按身份排序）
type SkillGroup = 'analysis' | 'build' | 'design' | 'aitools';
const SKILL_ORDER: Record<Lens, SkillGroup[]> = {
  all: ['analysis', 'build', 'design'],
  ba: ['analysis', 'design', 'build'],
  dse: ['build', 'analysis', 'design'],
  aipm: ['aitools', 'analysis', 'design'],
};
const SKILLS: Record<SkillGroup, { en: string[]; zh: string[] }> = {
  analysis: {
    en: ['Requirements analysis', 'Process mapping', 'Specifications', 'Test-data analysis', 'Excel (pivot tables)', 'Solution briefs', 'PRDs', 'Design thinking'],
    zh: ['需求分析', '流程梳理', '规格说明', '测试数据分析', 'Excel（数据透视表）', '方案简报', 'PRD', '设计思维'],
  },
  build: {
    en: ['Python', 'Swift', 'HTML / CSS / JS', 'Ollama (local deployment)', 'Cursor / Codex', 'ESP32 · Web Serial'],
    zh: ['Python', 'Swift', 'HTML / CSS / JS', 'Ollama（本地部署）', 'Cursor / Codex', 'ESP32 · Web Serial'],
  },
  design: {
    en: ['Figma', 'Axure', 'User flows', 'Prototyping', 'Usability testing', 'Interaction design'],
    zh: ['Figma', 'Axure', '用户流程', '原型设计', '可用性测试', '交互设计'],
  },
  aitools: {
    en: ['Cursor / Codex (coding)', 'Figma Make (prototypes)', 'Seedance (AI video)', 'Ollama (local models)'],
    zh: ['Cursor / Codex（编程）', 'Figma Make（原型）', 'Seedance（AI 视频）', 'Ollama（本地模型）'],
  },
};

const HOW_ICONS = [Compass, Crosshair, Cpu, Rocket];

/** 把要点里的量化数字高亮为白色 */
function Highlight({ text }: { text: string }) {
  const parts = text.split(/(\d+\+|~?\d+%|约\s?\d+%|\d+ points|\d+ 分)/g);
  return (
    <>
      {parts.map((p, i) =>
        i % 2 === 1 ? (
          <span key={i} className="text-white font-semibold">{p}</span>
        ) : (
          <Fragment key={i}>{p}</Fragment>
        ),
      )}
    </>
  );
}

export function AboutMePage({ onNavigateToContact }: AboutMePageProps = {}) {
  const { t, tl, lens } = useLensT();
  const { language } = useLanguage();
  const isZh = language === 'zh';
  const [certIndex, setCertIndex] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-black text-white pt-24 md:pt-32 pb-12 md:pb-20 px-4 md:px-6">
      <div className="container mx-auto max-w-4xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-12 md:mb-16"
        >
          <h1 className="text-white mb-6" style={{ fontSize: '3.5rem', fontWeight: 700 }}>
            <SpringText text={t('about.title')} />
          </h1>
          <motion.div
            className="w-24 h-1 bg-[#DBFE02] mb-8"
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 96, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          />
          <p className="text-white/70 text-base md:text-xl leading-relaxed">{t('about.headerSubtitle')}</p>
        </motion.div>

        {/* Profile + bio */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 mb-12 md:mb-16"
        >
          <div>
            <div className="aspect-[3/4] bg-zinc-800 rounded-2xl overflow-hidden mb-4 md:mb-6">
              <img src={profileImage} alt={isZh ? '邱皓惟' : 'Albert Qiu'} className="w-full h-full object-cover object-center" />
            </div>
            <div className="flex gap-3 md:gap-4">
              <motion.a
                href={`mailto:${CONTACT_EMAIL}`}
                className="flex-1 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl px-3 md:px-4 py-2 md:py-3 flex items-center justify-center gap-2 transition-colors text-sm md:text-base"
                whileHover={{ scale: 1.02 }}
                data-interactive="true"
              >
                <Mail size={16} />
                <span>Email</span>
              </motion.a>
              <motion.a
                href={LINKEDIN_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl px-3 md:px-4 py-2 md:py-3 flex items-center justify-center gap-2 transition-colors text-sm md:text-base"
                whileHover={{ scale: 1.02 }}
                data-interactive="true"
              >
                <Linkedin size={16} />
                <span>LinkedIn</span>
              </motion.a>
            </div>
            <div className="mt-4 flex items-center gap-2 flex-wrap">
              <Languages size={16} className="text-white/40" />
              {['en', 'yue', 'zh'].map((l) => (
                <span key={l} className="rounded-xl border border-white/10 bg-white/[0.03] px-3 py-1 font-meta text-xs text-white/70">
                  {t(`about.lang.${l}`)}
                </span>
              ))}
            </div>
          </div>

          <div className="space-y-4 md:space-y-6">
            <div>
              <h3 className="text-[#DBFE02] mb-2 md:mb-3 text-lg md:text-xl">{t('about.subtitle')}</h3>
              <p className="text-white/70 leading-relaxed mb-3 md:mb-4 text-sm md:text-base">{tl('about.intro')}</p>
              <p className="text-white/70 leading-relaxed text-sm md:text-base">{t('about.intro2')}</p>
            </div>
            <div>
              <h3 className="text-[#DBFE02] mb-2 md:mb-3 text-lg md:text-xl">{t('about.designApproach')}</h3>
              <p className="text-white/70 leading-relaxed text-sm md:text-base">{tl('about.designApproachText')}</p>
            </div>
          </div>
        </motion.div>

        {/* How I work */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.25 }}
          className="mb-12 md:mb-16"
        >
          <div className="flex items-center justify-between gap-3 mb-4 md:mb-6">
            <div className="flex items-center gap-2 md:gap-3">
              <Compass className="text-[#DBFE02]" size={24} />
              <h2 className="text-xl md:text-2xl">{t('about.howIWork')}</h2>
            </div>
            {lens !== 'all' && (
              <span className="font-meta text-xs text-white/40">
                {t('nav.lens')} · {t(`lens.short.${lens}`)}
              </span>
            )}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {[1, 2, 3, 4].map((n) => {
              const Icon = HOW_ICONS[n - 1];
              return (
                <motion.div
                  key={`${lens}-${n}`}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: n * 0.05 }}
                  className="rounded-2xl border border-white/10 bg-white/5 p-5 flex flex-col"
                >
                  <div className="flex items-center justify-between mb-6">
                    <span className="font-meta text-xs text-white/40">0{n}</span>
                    <Icon size={18} className="text-white/60" />
                  </div>
                  <h3 className="text-lg text-white mb-2">{tl(`about.how.${n}.title`)}</h3>
                  <p className="text-white/60 text-sm leading-relaxed flex-1">{tl(`about.how.${n}.desc`)}</p>
                  <p className="mt-4 pt-3 border-t border-white/10 font-meta text-[11px] text-white/45">
                    <span className="text-white/30">{t('about.how.proof')} · </span>
                    {tl(`about.how.${n}.proof`)}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Experience */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mb-12 md:mb-16"
        >
          <div className="flex items-center gap-2 md:gap-3 mb-4 md:mb-6">
            <Briefcase className="text-[#DBFE02]" size={24} />
            <h2 className="text-xl md:text-2xl">{t('about.experience')}</h2>
          </div>
          <div className="space-y-4 md:space-y-6">
            {EXPERIENCES.map((exp) => {
              const base = `about.experience.${exp.id}`;
              const points = [1, 2, 3].map((n) => tl(`${base}.point${n}`)).filter((p) => p && !p.startsWith('about.'));
              return (
                <div
                  key={exp.id}
                  className="bg-white/5 border border-white/10 rounded-2xl p-4 md:p-8 relative overflow-hidden transition-all hover:scale-[1.01]"
                >
                  <div className="hidden lg:block absolute left-0 top-0 bottom-0 w-80 pointer-events-none">
                    <div className="absolute inset-0 bg-gradient-to-r from-white/10 via-white/5 to-transparent" />
                    {exp.logo ? (
                      <img src={exp.logo} alt="" className="absolute left-8 top-1/2 -translate-y-1/2 w-64 h-auto object-contain" />
                    ) : (
                      <span
                        className="absolute left-10 top-1/2 -translate-y-1/2 font-meta text-6xl tracking-tight text-white/80"
                        style={{ fontWeight: 600 }}
                      >
                        {exp.monogram}
                      </span>
                    )}
                  </div>
                  <div className="relative z-10 lg:pl-72">
                    <div className="mb-3 md:mb-4">
                      <h3 className="text-lg md:text-xl mb-1">{t(`${base}.company`)}</h3>
                      <p className="text-white/60 mb-2 text-sm md:text-base">{t(`${base}.title`)}</p>
                      <p className="font-meta text-white/45 text-xs md:text-sm">{t(`${base}.period`)}</p>
                    </div>
                    <ul className="space-y-2 text-white/70 text-xs md:text-sm leading-relaxed">
                      {points.map((p, i) => (
                        <li key={i} className="flex gap-2">
                          <span className="text-[#DBFE02] flex-shrink-0">•</span>
                          <span>
                            <Highlight text={p} />
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* Awards */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mb-12 md:mb-16"
        >
          <div className="flex items-center gap-2 md:gap-3 mb-4 md:mb-6">
            <Trophy className="text-[#DBFE02]" size={24} />
            <h2 className="text-xl md:text-2xl">{t('about.awards')}</h2>
          </div>
          <p className="font-meta text-xs uppercase tracking-[0.2em] text-white/40 mb-3">{t('about.awards.international')}</p>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-4">
            {[
              { k: 'muse', year: '2025', level: 'gold' },
              { k: 'nyproduct', year: '2025', level: 'silver' },
              { k: 'london', year: '2025', level: 'silver' },
              { k: 'hk', year: '2024', level: 'bronze' },
              { k: 'gcross', year: '2024', level: 'bronze' },
            ].map((award, i) => {
              const ring =
                award.level === 'gold'
                  ? 'border-[#FFD700]/40 from-[#FFD700]/15 text-[#FFD700]'
                  : award.level === 'silver'
                  ? 'border-[#C0C0C0]/35 from-[#C0C0C0]/12 text-[#D4D4D4]'
                  : 'border-[#CD7F32]/40 from-[#CD7F32]/15 text-[#E0A060]';
              const [prize, name] = t(`about.awards.${award.k}`).split(' - ');
              const certIdx = CERTIFICATES.findIndex((c) => c.id === award.k);
              return (
                <button
                  key={award.k}
                  type="button"
                  disabled={certIdx < 0}
                  onClick={() => certIdx >= 0 && setCertIndex(certIdx)}
                  className={`text-left rounded-2xl border bg-gradient-to-b to-transparent p-4 flex flex-col justify-between aspect-square transition-transform hover:-translate-y-1 disabled:cursor-default ${ring} ${
                    i === 4 ? 'col-span-2 md:col-span-1 aspect-auto md:aspect-square' : ''
                  }`}
                  data-interactive={certIdx >= 0 ? 'true' : undefined}
                >
                  <div className="flex items-center justify-between font-meta text-xs">
                    <span>{prize}</span>
                    <span className="text-white/40">{award.year}</span>
                  </div>
                  <div className="mt-6">
                    <p className="text-white text-sm md:text-base leading-snug">{name}</p>
                    {certIdx >= 0 && (
                      <p className="mt-2 font-meta text-[10px] text-white/45">NeuroDrive · {t('about.awards.viewCert')} ↗</p>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
          <p className="font-meta text-xs uppercase tracking-[0.2em] text-white/40 mt-8 mb-3">{t('about.awards.certificates')}</p>
          <CertificateGrid onOpen={setCertIndex} className="mb-6 max-w-xl" />
          <CertificateLightbox index={certIndex} onIndexChange={setCertIndex} />

          <Accordion.Root type="single" collapsible>
            <Accordion.Item value="more" className="rounded-2xl border border-white/10 bg-white/5 overflow-hidden">
              <Accordion.Header>
                <Accordion.Trigger
                  className="group w-full flex items-center justify-between px-5 py-4 text-left text-white/80 hover:text-white transition-colors"
                  data-interactive="true"
                >
                  <span className="text-sm md:text-base">
                    <span className="text-[#DBFE02] font-semibold mr-1">+3</span>
                    {t('about.awards.more')}
                  </span>
                  <ChevronDown size={18} className="transition-transform duration-300 group-data-[state=open]:rotate-180" />
                </Accordion.Trigger>
              </Accordion.Header>
              <Accordion.Content className="overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
                <ul className="px-5 pb-4 divide-y divide-white/10">
                  {['jinjiang', 'challenge', 'lanqiao'].map((k) => (
                    <li key={k} className="py-3 text-sm text-white/70">
                      {t(`about.awards.${k}`)}
                    </li>
                  ))}
                </ul>
              </Accordion.Content>
            </Accordion.Item>
          </Accordion.Root>
        </motion.div>

        {/* Education */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mb-12 md:mb-16"
        >
          <div className="flex items-center gap-2 md:gap-3 mb-4 md:mb-6">
            <GraduationCap className="text-[#DBFE02]" size={24} />
            <h2 className="text-xl md:text-2xl">{t('about.education')}</h2>
          </div>
          <div className="space-y-4 md:space-y-6">
            {[
              { deg: 'about.education.hkust.degree', school: 'about.education.hkust.school', period: 'about.education.hkust.period', desc: 'about.education.hkust.course' },
              { deg: 'about.education.degree', school: 'about.education.school', period: 'about.education.period', desc: 'about.education.description' },
            ].map((e) => (
              <div key={e.deg} className="bg-white/5 border border-white/10 rounded-2xl p-4 md:p-8">
                <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-2 mb-2 md:mb-3">
                  <div>
                    <h3 className="text-lg md:text-xl mb-1 md:mb-2">{t(e.deg)}</h3>
                    <p className="text-white/60 text-sm md:text-base">{t(e.school)}</p>
                  </div>
                  <span className="font-meta text-white/50 text-xs md:text-sm flex-shrink-0">{t(e.period)}</span>
                </div>
                <p className="text-white/70 text-sm md:text-base">{tl(e.desc)}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Skills */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mb-12 md:mb-16"
        >
          <div className="flex items-center gap-2 md:gap-3 mb-4 md:mb-6">
            <Award className="text-[#DBFE02]" size={24} />
            <h2 className="text-xl md:text-2xl">{t('about.skills')}</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-4 md:mb-6">
            {SKILL_ORDER[lens].map((g) => (
              <motion.div
                layout
                key={g}
                className="bg-white/5 border border-white/10 rounded-2xl p-6"
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              >
                <h3 className="text-[#DBFE02] mb-4 text-base md:text-lg">{t(`about.skills.${g}`)}</h3>
                <div className="flex flex-wrap gap-2">
                  {SKILLS[g][isZh ? 'zh' : 'en'].map((item) => (
                    <span key={item} className="rounded-xl border border-white/10 bg-black/40 px-3 py-1.5 text-sm text-white/80">
                      {item}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8">
            <h3 className="text-[#DBFE02] mb-4 md:mb-6 text-base md:text-lg">{t('about.skills.tools')}</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-5">
              {[
                { name: 'Figma', level: 5, logo: (
                  <svg className="w-10 h-10" fill="none" preserveAspectRatio="none" viewBox="0 0 58 57">
                    <path d={svgPaths.p23a58a80} fill="#0ACF83" />
                    <path d={svgPaths.p15918600} fill="#A259FF" />
                    <path d={svgPaths.p2b407d00} fill="#F24E1E" />
                    <path d={svgPaths.pc4dc780} fill="#FF7262" />
                    <path d={svgPaths.p5c83780} fill="#1ABCFE" />
                  </svg>
                ) },
                { name: 'Arduino', level: 4, logo: <img src={arduinoLogo} alt="Arduino Logo" className="w-full h-full object-contain" /> },
                { name: 'Processing', level: 4, logo: <img src={processingLogo} alt="Processing Logo" className="w-full h-full object-contain" /> },
                { name: 'Blender', level: 5, logo: <BlenderLogo /> },
                { name: 'Rhino', level: 5, logo: <img src={rhinoLogo} alt="Rhino Logo" className="w-full h-full object-contain" /> },
                { name: 'Keyshot', level: 4, logo: <img src={keyshotLogo} alt="Keyshot Logo" className="w-full h-full object-contain" /> },
                { name: 'Illustrator', level: 3, logo: <img src={aiLogo} alt="Illustrator Logo" className="w-full h-full object-contain" /> },
                { name: 'Photoshop', level: 3, logo: <img src={psLogo} alt="Photoshop Logo" className="w-full h-full object-contain" /> },
              ].map((tool) => (
                <div key={tool.name} className="flex items-center gap-4">
                  <div className="w-10 h-10 flex-shrink-0">{tool.logo}</div>
                  <div className="flex-1 flex justify-between items-center">
                    <span className="text-white/80 text-sm">{tool.name}</span>
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map((dot) => (
                        <div key={dot} className={`w-2 h-2 rounded-full ${dot <= tool.level ? 'bg-[#DBFE02]' : 'bg-white/20'}`} />
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="flex flex-wrap items-center justify-center gap-4"
        >
          <ResumeMenu variant="primary" align="center" label={t('about.downloadResume')} />
          <motion.button
            onClick={onNavigateToContact}
            className="inline-flex items-center gap-3 bg-white/5 border border-white/20 text-white px-7 py-3.5 rounded-xl transition-all hover:bg-white/10 text-base md:text-lg"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            data-interactive="true"
          >
            <MessageCircle size={20} />
            <span className="font-medium">{t('about.contactMe')}</span>
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
}
