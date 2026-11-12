import { motion } from 'motion/react';
import { useLanguage } from './LanguageContext';
import { CaseTLDR } from './CaseTLDR';
import { ArrowLeft } from 'lucide-react';
import { ProjectImage } from './ProjectImage';
import img311 from "figma:asset/5d0cc51ab0372a92718c2f4fceb73616ea5bce93.png";
import img321 from "figma:asset/214caea60d1ad06ba83907dc478f3bbf04eb5b44.png";
import img331 from "figma:asset/e00e4878403bc6c89e6c2f70eeb6ba72405cece9.png";
import img341 from "figma:asset/5963fad258b19ef4af8b2c18e3db4df8e1621a9e.png";
import img351 from "figma:asset/5984e8ab7356e2342f29dc977fe7528fdc0ccdfc.png";
import img361 from "figma:asset/212d5e9a32b5df406f8ab3df4c858eeee57725f6.png";
import img371 from "figma:asset/fa967e6b9b7c9e6024dd589c7d07902d82305430.png";
import img381 from "figma:asset/f3f61a5dd664c72988d2e83bac13082fc5eac220.png";
import img391 from "figma:asset/9b29feff801adc265389e9dff491617586baa7e3.png";
import img3101 from "figma:asset/982743cdeddd734c2e508fd4f0a5faaa3053cc3b.png";

interface RobotHuiDetailProps {
  onNavigate?: (sectionId: string) => void;
}

export function RobotHuiDetail({ onNavigate }: RobotHuiDetailProps) {
  const { language } = useLanguage();

  const handleBackToWork = () => {
    if (onNavigate) {
      onNavigate('works');
    }
  };

  const images = [
    { src: img311, alt: "Family Emotional Future Assistant - Overview" },
    { src: img321, alt: "Family Emotional Future Assistant - Research" },
    { src: img331, alt: "Family Emotional Future Assistant - Analysis" },
    { src: img341, alt: "Family Emotional Future Assistant - User Journey" },
    { src: img351, alt: "Family Emotional Future Assistant - Product Design" },
    { src: img361, alt: "Family Emotional Future Assistant - Features" },
    { src: img371, alt: "Family Emotional Future Assistant - App Interface" },
    { src: img381, alt: "Family Emotional Future Assistant - User Experience" },
    { src: img391, alt: "Family Emotional Future Assistant - Interaction Design" },
    { src: img3101, alt: "Family Emotional Future Assistant - Impact" },
  ];

  return (
    <div className="min-h-screen bg-black">
      {/* 图片展示区 */}
      <div className="pt-32 px-6 pb-20">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* TL;DR 卡片 */}
          <CaseTLDR projectKey="hui" />
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
