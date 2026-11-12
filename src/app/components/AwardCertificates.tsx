import { useEffect, useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { motion } from 'motion/react';
import { ChevronLeft, ChevronRight, X, Maximize2 } from 'lucide-react';
import { useLanguage } from './LanguageContext';
import { ImageWithFallback } from './figma/ImageWithFallback';
// 获奖证书（NeuroDrive）—— About 页与 NeuroDrive 详情页共用
import museGold from '../assets/awards/muse-gold-2025.jpg';
import nySilver from '../assets/awards/ny-product-silver-2025.jpg';
import londonSilver from '../assets/awards/london-silver-2025.jpg';

export type CertificateId = 'muse' | 'nyproduct' | 'london';

export const CERTIFICATES: { id: CertificateId; src: string; level: 'gold' | 'silver' }[] = [
  { id: 'muse', src: museGold, level: 'gold' },
  { id: 'nyproduct', src: nySilver, level: 'silver' },
  { id: 'london', src: londonSilver, level: 'silver' },
];

const LEVEL_TEXT = { gold: 'text-[#FFD700]', silver: 'text-[#D4D4D4]' };

interface LightboxProps {
  index: number | null;
  onIndexChange: (i: number | null) => void;
}

/** 证书大图查看（受控），支持左右切换与键盘方向键 */
export function CertificateLightbox({ index, onIndexChange }: LightboxProps) {
  const { t } = useLanguage();
  const open = index !== null;
  const cert = index !== null ? CERTIFICATES[index] : null;
  const go = (d: number) => index !== null && onIndexChange((index + d + CERTIFICATES.length) % CERTIFICATES.length);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') go(1);
      if (e.key === 'ArrowLeft') go(-1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  });

  return (
    <Dialog.Root open={open} onOpenChange={(o) => !o && onIndexChange(null)}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-[80] bg-black/85 backdrop-blur-sm data-[state=open]:animate-in data-[state=open]:fade-in-0" />
        <Dialog.Content className="fixed inset-0 z-[81] flex items-center justify-center p-4 md:p-10 outline-none" aria-describedby={undefined}>
          {cert && (
            <div className="relative flex flex-col items-center gap-4 max-h-full">
              <Dialog.Title className="sr-only">{t(`about.awards.${cert.id}`)}</Dialog.Title>
              <motion.div
                key={cert.id}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.25 }}
                className="rounded-lg overflow-hidden bg-white shadow-2xl"
              >
                <ImageWithFallback
                  src={cert.src}
                  alt={`${t(`about.awards.${cert.id}`)} — NeuroDrive certificate`}
                  className="block max-h-[78vh] w-auto object-contain"
                />
              </motion.div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => go(-1)}
                  className="w-10 h-10 rounded-full border border-white/20 text-white/80 hover:bg-white/10 flex items-center justify-center"
                  aria-label="Previous"
                  data-interactive="true"
                >
                  <ChevronLeft size={18} />
                </button>
                <div className="text-center min-w-[12rem]">
                  <p className={`font-meta text-xs ${LEVEL_TEXT[cert.level]}`}>{t(`about.awards.${cert.id}`).split(' - ')[0]} · 2025</p>
                  <p className="text-white text-sm md:text-base">{t(`about.awards.${cert.id}`).split(' - ')[1]}</p>
                </div>
                <button
                  onClick={() => go(1)}
                  className="w-10 h-10 rounded-full border border-white/20 text-white/80 hover:bg-white/10 flex items-center justify-center"
                  aria-label="Next"
                  data-interactive="true"
                >
                  <ChevronRight size={18} />
                </button>
              </div>
              <Dialog.Close
                className="absolute -top-2 -right-2 md:top-0 md:-right-14 w-10 h-10 rounded-full bg-white text-black flex items-center justify-center"
                aria-label="Close"
                data-interactive="true"
              >
                <X size={18} />
              </Dialog.Close>
            </div>
          )}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

interface GridProps {
  onOpen: (i: number) => void;
  className?: string;
}

/** 证书缩略图（竖版 A4 比例） */
export function CertificateGrid({ onOpen, className = '' }: GridProps) {
  const { t } = useLanguage();
  return (
    <div className={`grid grid-cols-3 gap-3 md:gap-4 ${className}`}>
      {CERTIFICATES.map((c, i) => (
        <motion.button
          key={c.id}
          onClick={() => onOpen(i)}
          className="group text-left"
          whileHover={{ y: -4 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          data-interactive="true"
        >
          <div className="relative rounded-xl overflow-hidden bg-white aspect-[565/799] border border-white/10">
            <ImageWithFallback
              src={c.src}
              alt={`${t(`about.awards.${c.id}`)} certificate`}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center">
              <Maximize2 className="text-white opacity-0 group-hover:opacity-100 transition-opacity" size={22} />
            </div>
          </div>
          <p className={`mt-2 font-meta text-[11px] ${LEVEL_TEXT[c.level]}`}>{t(`about.awards.${c.id}`).split(' - ')[0]}</p>
          <p className="text-white/70 text-xs md:text-sm leading-snug">{t(`about.awards.${c.id}`).split(' - ')[1]}</p>
        </motion.button>
      ))}
    </div>
  );
}

/** 自带状态的组合：缩略图 + 大图 */
export function AwardCertificates({ className = '' }: { className?: string }) {
  const [index, setIndex] = useState<number | null>(null);
  return (
    <>
      <CertificateGrid onOpen={setIndex} className={className} />
      <CertificateLightbox index={index} onIndexChange={setIndex} />
    </>
  );
}
