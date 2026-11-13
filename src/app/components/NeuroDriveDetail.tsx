import { motion } from 'motion/react';
import { useLanguage } from './LanguageContext';
import { CaseTLDR } from './CaseTLDR';
import { AwardCertificates } from './AwardCertificates';
import { ArrowLeft } from 'lucide-react';
import { ProjectImage } from './ProjectImage';
import img111 from "figma:asset/7dcf889bfcaba602b9933dab8685915e58d70c3d.png";
import img121 from "figma:asset/8d2c01c55413f825d7ff53bb5ad9828cce5731d8.png";
import img131 from "figma:asset/57eaecd30a593864617aaa9994b0f6f885ea4197.png";
import img141 from "figma:asset/6128c390db4727ba296b11c98551eb62d3c28a55.png";
import img151 from "figma:asset/db9b5de0973b668b96dc67eddd3a20e847b62868.png";
import img161 from "figma:asset/5614a35f4b4af564018c9166de419bf4e9100055.png";
import img171 from "figma:asset/ea8631120c606319bef90e3f6633caf138a989ef.png";
import img181 from "figma:asset/a4df28fa46092aaa6407cc22a69ec86eddd9236b.png";
import img191 from "figma:asset/929072d8d2ea85418ff8688e59bc0d2530bdcd25.png";

interface NeuroDriveDetailProps {
  onNavigate?: (sectionId: string) => void;
}

export function NeuroDriveDetail({ onNavigate }: NeuroDriveDetailProps) {
  const { language, t } = useLanguage();

  const handleBackToWork = () => {
    if (onNavigate) {
      onNavigate('works');
    }
  };

  const images = [
    { src: img111, alt: "NeuroDrive - HCI Design & Service Design" },
    { src: img121, alt: "Background & Research" },
    { src: img131, alt: "Field Research & Ideation" },
    { src: img141, alt: "Prototype & Test 1.0" },
    { src: img151, alt: "Prototype & Test 2.0" },
    { src: img161, alt: "Product Concept & Sketch" },
    { src: img171, alt: "Function And Verification" },
    { src: img181, alt: "User Usage And Interaction Patterns" },
    { src: img191, alt: "Service Blueprint & Brand Concept" },
  ];

  return (
    <div className="min-h-screen bg-black">
      {/* 图片展示区 */}
      <div className="pt-32 px-4 md:px-6 pb-20">
        <div className="max-w-7xl mx-auto space-y-8 md:space-y-12">
          {/* TL;DR 卡片 */}
          <CaseTLDR projectKey="neurodrive" />
          {/* 获奖证书 */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="rounded-3xl border border-white/10 bg-zinc-950 p-5 md:p-8 grid grid-cols-1 md:grid-cols-12 gap-6 items-center"
          >
            <div className="md:col-span-4">
              <p className="font-meta text-xs uppercase tracking-[0.2em] text-[#DBFE02] mb-3">
                {t('project.recognition')}
              </p>
              <p className="text-white text-xl md:text-2xl leading-snug" style={{ fontWeight: 700 }}>
                {t('project.neurodrive.awardsTitle')}
              </p>
              <p className="text-white/50 text-sm mt-2">MUSE · New York Product Design · London Design</p>
            </div>
            <AwardCertificates className="md:col-span-8" ids={['muse', 'nyproduct', 'london']} />
          </motion.div>
          {/* 渲染所有图片 */}
          {images.map((image, index) => (
            <ProjectImage
              key={index}
              src={image.src}
              alt={image.alt}
              index={index}
            />
          ))}

          {/* 回到Work页面按钮 */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex justify-center pt-8 md:pt-16"
          >
            <button
              onClick={handleBackToWork}
              className="group flex items-center gap-3 px-8 py-4 bg-[#DBFE02] text-black rounded-full transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-[#DBFE02]/50"
            >
              <ArrowLeft className="w-5 h-5 transition-transform duration-300 group-hover:-translate-x-1" />
              <span className="text-lg font-medium">
                {language === 'zh' ? '返回作品集' : 'Back to Work'}
              </span>
            </button>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
