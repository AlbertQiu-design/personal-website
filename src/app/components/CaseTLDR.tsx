import { motion } from 'motion/react';
import { Target, User, Workflow, TrendingUp } from 'lucide-react';
import { useLanguage } from './LanguageContext';

interface CaseTLDRProps {
  /** 对应 LanguageContext 中的 tldr.<projectKey>.* */
  projectKey: string;
}

/** 详情页顶部的 TL;DR 卡片：Problem / My Role / Process / Impact */
export function CaseTLDR({ projectKey }: CaseTLDRProps) {
  const { t } = useLanguage();
  const cells = [
    { key: 'problem', icon: Target },
    { key: 'role', icon: User },
    { key: 'process', icon: Workflow },
    { key: 'impact', icon: TrendingUp },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="rounded-3xl border border-white/10 bg-zinc-950 p-2"
    >
      <div className="flex items-center justify-between px-4 md:px-5 pt-3 pb-3">
        <span className="font-meta text-xs uppercase tracking-[0.2em] text-[#DBFE02]">
          {t('tldr.label')}
        </span>
        <span className="font-meta text-xs text-white/40">{t(`project.${projectKey}.title`)}</span>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
        {cells.map(({ key, icon: Icon }) => (
          <div key={key} className="rounded-2xl bg-white/[0.04] border border-white/5 p-5 md:p-6">
            <div className="flex items-center gap-2 mb-3">
              <Icon size={16} className="text-white/50" />
              <span className="font-meta text-xs uppercase tracking-wider text-white/50">
                {t(`tldr.${key}`)}
              </span>
            </div>
            <p className="text-white/90 text-sm md:text-base leading-relaxed">
              {t(`tldr.${projectKey}.${key}`)}
            </p>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
