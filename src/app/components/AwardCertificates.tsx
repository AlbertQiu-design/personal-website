import { useEffect, useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { motion } from 'motion/react';
import { ChevronLeft, ChevronRight, X, Maximize2 } from 'lucide-react';
import { useLanguage } from './LanguageContext';
import { ImageWithFallback } from './figma/ImageWithFallback';
// 获奖证书 —— About 页展示全部；NeuroDrive 详情只取该项目的三张
import museGold from '../assets/awards/muse-gold-2025.jpg';
import nySilver from '../assets/awards/ny-product-silver-2025.jpg';
import londonSilver from '../assets/awards/london-silver-2025.jpg';
import chinaDesign from '../assets/awards/china-design-third-2025.jpg';
import milanDesign from '../assets/awards/milan-design-week-third-2026.jpg';

export type CertificateId = 'muse' | 'nyproduct' | 'london' | 'chinadesign' | 'milan';
export type CertificateLevel = 'gold' | 'silver' | 'third';

export interface Certificate {
  id: CertificateId;
  src: string;
  level: CertificateLevel;
  year: string;
}

export const CERTIFICATES: Certificate[] = [
  { id: 'muse', src: museGold, level: 'gold', year: '2025' },
  { id: 'nyproduct', src: nySilver, level: 'silver', year: '2025' },
  { id: 'london', src: londonSilver, level: 'silver', year: '2025' },
  { id: 'chinadesign', src: chinaDesign, level: 'third', year: '2025' },
  { id: 'milan', src: milanDesign, level: 'third', year: '2026' },
];

const LEVEL_TEXT: Record<CertificateLevel, string> = {
  gold: 'text-[#FFD700]',
  silver: 'text-[#D4D4D4]',
  third: 'text-white/80',
};

function resolveCertificates(ids?: CertificateId[]) {
  if (!ids) return CERTIFICATES;
  return ids
    .map((id) => CERTIFICATES.find((c) => c.id === id))
    .filter((c): c is Certificate => Boolean(c));
}

interface LightboxProps {
  index: number | null;
  onIndexChange: (i: number | null) => void;
  items?: Certificate[];
}

/** 证书大图查看（受控），支持左右切换与键盘方向键 */
export function CertificateLightbox({ index, onIndexChange, items = CERTIFICATES }: LightboxProps) {
  const { t } = useLanguage();
  const open = index !== null;
  const cert = index !== null ? items[index] : null;
  const go = (d: number) => index !== null && onIndexChange((index + d + items.length) % items.length);

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
                  alt={`${t(`about.awards.${cert.id}`)} certificate`}
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
                <div className="text-center min-w-[12rem] max-w-xs">
                  <p className={`font-meta text-xs ${LEVEL_TEXT[cert.level]}`}>
                    {t(`about.awards.${cert.id}`).split(' - ')[0]} · {cert.year}
                  </p>
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
  items?: Certificate[];
}

/** 等高证书卡。五张时桌面排成一行，标题区高度固定，避免换行把卡片撑歪。 */
export function CertificateGrid({ onOpen, className = '', items = CERTIFICATES }: GridProps) {
  const { t } = useLanguage();
  const columns = items.length > 3
    ? 'grid-cols-2 md:grid-cols-3 lg:grid-cols-5'
    : 'grid-cols-3';
  return (
    <div className={`grid ${columns} gap-x-4 gap-y-6 items-start ${className}`}>
      {items.map((c, i) => {
        const [prize, name] = t(`about.awards.${c.id}`).split(' - ');
        return (
          <motion.button
            key={c.id}
            onClick={() => onOpen(i)}
            className="group flex h-full flex-col text-left"
            whileHover={{ y: -4 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            data-interactive="true"
          >
            <div className="relative aspect-[1130/1598] w-full overflow-hidden rounded-2xl border border-white/10 bg-white">
              <ImageWithFallback
                src={c.src}
                alt={`${t(`about.awards.${c.id}`)} certificate`}
                className="absolute inset-0 h-full w-full object-contain"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                <Maximize2 className="text-white opacity-0 group-hover:opacity-100 transition-opacity" size={22} />
              </div>
            </div>
            <div className="mt-3 h-16">
              <p className={`font-meta text-[11px] leading-4 ${LEVEL_TEXT[c.level]}`}>{prize}</p>
              <p className="mt-1 text-sm leading-snug text-white/75 line-clamp-2">{name}</p>
            </div>
          </motion.button>
        );
      })}
    </div>
  );
}

/** 自带状态的组合：缩略图 + 大图 */
export function AwardCertificates({ className = '', ids }: { className?: string; ids?: CertificateId[] }) {
  const [index, setIndex] = useState<number | null>(null);
  const items = resolveCertificates(ids);
  return (
    <>
      <CertificateGrid onOpen={setIndex} className={className} items={items} />
      <CertificateLightbox index={index} onIndexChange={setIndex} items={items} />
    </>
  );
}
