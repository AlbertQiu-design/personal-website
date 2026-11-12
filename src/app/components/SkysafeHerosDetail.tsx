import { motion } from 'motion/react';
import { useLanguage } from './LanguageContext';
import { CaseTLDR } from './CaseTLDR';
import { ArrowLeft } from 'lucide-react';
import { ProjectImage } from './ProjectImage';
import img411 from "figma:asset/cd785f41f1702fdf45456e39bb87e0c40fb4b99d.png";
import img421 from "figma:asset/85dc0db223b3625825b444844de5f68b02dd72f6.png";
import img431 from "figma:asset/788e9510abebd4da68c70cce7713a65aee52062a.png";
import img441 from "figma:asset/ddb8cd3b913875a9d8a5e60d9b07438014db5455.png";
import img451 from "figma:asset/9417c6d68585bb35e8b03b49481cd4cace863ab1.png";
import img461 from "figma:asset/4f7e782a76c465bbbbbd01639991e104cd4bc14f.png";
import img471 from "figma:asset/096baedb2a5155e91603b47a6bb95620aab65003.png";
import img481 from "figma:asset/9e06a1e510bf995d68e6ab81b49a497e6d42f06a.png";

interface SkysafeHerosDetailProps {
  onNavigate?: (sectionId: string) => void;
}

export function SkysafeHerosDetail({ onNavigate }: SkysafeHerosDetailProps) {
  const { language } = useLanguage();

  const handleBackToWork = () => {
    if (onNavigate) {
      onNavigate('works');
    }
  };

  const images = [
    { src: img411, alt: "SKYSAFE HEROS - Page 1" },
    { src: img421, alt: "SKYSAFE HEROS - Page 2" },
    { src: img431, alt: "SKYSAFE HEROS - Page 3" },
    { src: img441, alt: "SKYSAFE HEROS - Page 4" },
    { src: img451, alt: "SKYSAFE HEROS - Page 5" },
    { src: img461, alt: "SKYSAFE HEROS - Page 6" },
    { src: img471, alt: "SKYSAFE HEROS - Page 7" },
    { src: img481, alt: "SKYSAFE HEROS - Page 8" },
  ];

  return (
    <div className="min-h-screen bg-black">
      {/* 图片展示区 */}
      <div className="pt-32 px-6 pb-20">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* TL;DR 卡片 */}
          <CaseTLDR projectKey="project4" />
          {/* 渲染所有图片 */}
          {images.map((image, index) => (
            <ProjectImage
              key={index}
              src={image.src}
              alt={image.alt}
              index={index}
            />
          ))}

          {/* YouTube 视频 */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="w-full"
          >
            <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
              <iframe
                className="absolute top-0 left-0 w-full h-full rounded-lg"
                src="https://www.youtube.com/embed/6r3VnV7L77A"
                title="SKYSAFE HEROS Video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                style={{ border: 'none' }}
              />
            </div>
          </motion.div>

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
