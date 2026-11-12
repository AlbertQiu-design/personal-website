import { motion } from 'motion/react';
import { useLanguage } from './LanguageContext';
import { CaseTLDR } from './CaseTLDR';
import { ArrowLeft } from 'lucide-react';
import { ProjectImage } from './ProjectImage';
import heroImage from 'figma:asset/01bff6e7095856d511866bba62dc688b3f40335a.png';
import researchImage from 'figma:asset/58029ff6e11e4ba048c90a575e8428900f8c2a02.png';
import interviewImage from 'figma:asset/6ae79a7f8410481bdfab93d193b15472bcce8a24.png';
import userFlowImage from 'figma:asset/21481aaaee8cb1cb8ba3bbf0a30531efd29a7da2.png';
import technologyImage from 'figma:asset/35ccba5a2f82c46928a7487440af7394625811de.png';
import personaImage from 'figma:asset/c882150babd329a9536314cb0ecf3b5af83d5988.png';
import designProcessImage from 'figma:asset/6e2bfd84ebcbe0e6089f50720ba2441c8b50cd9a.png';
import prototypeImage from 'figma:asset/821df6e85fcca1cb3c4a9fb2b2447bfc2f59de22.png';
import uiFeedbackImage from 'figma:asset/0026aba19c30624b47b1c08ed16f7de4430a30c9.png';

interface StrideGuardDetailProps {
  onNavigate?: (sectionId: string) => void;
}

export function StrideGuardDetail({ onNavigate }: StrideGuardDetailProps) {
  const { language } = useLanguage();

  const handleBackToWork = () => {
    if (onNavigate) {
      onNavigate('works');
    }
  };

  const images = [
    { src: heroImage, alt: "StrideGuard - AI-powered wearable assistant for runners" },
    { src: researchImage, alt: "StrideGuard - Marathon Training Inspiration & Market Research" },
    { src: interviewImage, alt: "StrideGuard - Research & Interview Insights" },
    { src: personaImage, alt: "StrideGuard - Persona Research & Value Proposition" },
    { src: userFlowImage, alt: "StrideGuard - User Flow & Device Interaction" },
    { src: technologyImage, alt: "StrideGuard - Technology Exploration & Testing" },
    { src: designProcessImage, alt: "StrideGuard - Product Design Process" },
    { src: prototypeImage, alt: "StrideGuard - Running System Prototype" },
    { src: uiFeedbackImage, alt: "StrideGuard - UI for AR & Feedback System" },
  ];

  return (
    <div className="min-h-screen bg-black">
      {/* 图片展示区 */}
      <div className="pt-32 px-6 pb-20">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* TL;DR 卡片 */}
          <CaseTLDR projectKey="project3" />
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
            className="flex justify-center pt-8"
          >
            <button
              onClick={handleBackToWork}
              className="group flex items-center gap-3 px-8 py-4 bg-[#DBFE02] text-black rounded-full transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-[#DBFE02]/50"
            >
              <ArrowLeft className="w-5 h-5 transition-transform duration-300 group-hover:-translate-x-1" />
              <span className="text-lg">
                {language === 'zh' ? '返回作品集' : 'Back to Work'}
              </span>
            </button>
          </motion.div>
        </div>
      </div>
    </div>
  );
}