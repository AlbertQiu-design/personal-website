import { useEffect } from 'react';
import { motion } from 'motion/react';
import { useLanguage } from './LanguageContext';
import { Lens } from './LensContext';
import { SpringText } from './SpringText';

interface LensIntroProps {
  lens: Exclude<Lens, 'all'>;
  onDone: () => void;
}

/** 选择身份后的全屏介绍，约 2.2 秒后上滑消失，点击或按键可跳过 */
export function LensIntro({ lens, onDone }: LensIntroProps) {
  const { t } = useLanguage();

  useEffect(() => {
    const timer = setTimeout(onDone, 2400);
    const onKey = () => onDone();
    window.addEventListener('keydown', onKey);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('keydown', onKey);
    };
  }, [onDone]);

  return (
    <motion.div
      className="fixed inset-0 z-[70] bg-black flex items-center px-6 md:px-12 lg:px-32 cursor-pointer"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ y: '-100%', transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1] } }}
      transition={{ duration: 0.3 }}
      onClick={onDone}
      data-interactive="true"
    >
      <div className="max-w-5xl">
        <motion.p
          className="font-meta text-xs md:text-sm uppercase tracking-[0.25em] text-[#DBFE02] mb-5 flex items-center gap-2"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <span className="w-2 h-2 rounded-full bg-[#DBFE02]" />
          {t('lens.viewing')}
        </motion.p>
        <motion.h2
          className="text-white text-5xl md:text-7xl lg:text-8xl leading-[0.95] tracking-tight"
          style={{ fontWeight: 700 }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        >
          <SpringText text={t(`lens.${lens}`)} />
        </motion.h2>
        <motion.p
          className="mt-6 md:mt-8 text-white/70 text-lg md:text-2xl max-w-3xl leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35 }}
        >
          {t(`lens.intro.${lens}`)}
        </motion.p>
        <motion.div
          className="mt-8 flex flex-wrap gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.55 }}
        >
          {t(`lens.kw.${lens}`)
            .split(' · ')
            .map((k) => (
              <span key={k} className="rounded-xl border border-white/20 px-3 py-1.5 text-sm text-white/80">
                {k}
              </span>
            ))}
        </motion.div>
        <motion.div
          className="mt-12 h-px bg-white/10 relative overflow-hidden max-w-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <motion.div
            className="absolute inset-y-0 left-0 bg-[#DBFE02]"
            initial={{ width: '0%' }}
            animate={{ width: '100%' }}
            transition={{ duration: 2.2, ease: 'linear', delay: 0.2 }}
          />
        </motion.div>
        <p className="mt-3 font-meta text-[11px] text-white/35">{t('lens.tapToContinue')}</p>
      </div>
    </motion.div>
  );
}
