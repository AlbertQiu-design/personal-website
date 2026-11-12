import { motion } from 'motion/react';
import neuroDriveImage from "figma:asset/5486086f3bd8599fe969382507e2a938f1cbfbd7.png";
import huiRobotImage from "figma:asset/5d0cc51ab0372a92718c2f4fceb73616ea5bce93.png";
import project3Image from "figma:asset/01bff6e7095856d511866bba62dc688b3f40335a.png";
import project4Image from "figma:asset/3b53c3ac521b779f6ab723325dd1aa64a9c376d6.png";
import { useLanguage } from './LanguageContext';

interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  image: string;
  year: string;
}

interface ProjectRecommendationsProps {
  currentProjectId: string;
  onProjectClick: (projectId: string) => void;
}

export function ProjectRecommendations({ currentProjectId, onProjectClick }: ProjectRecommendationsProps) {
  const allProjects: Project[] = [
    {
      id: "project3",
      title: "StrideGuard",
      category: "AI & HCI & Running Health & Footwear Design",
      description: "An AI-powered wearable assistant that detects hidden gait issues before they lead to injury.",
      image: project3Image,
      year: "2024",
    },
    {
      id: "neurodrive",
      title: "NeuroDrive",
      category: "HCI Design & Service Design & Product Design",
      description: "An intelligent exoskeletal system designed to support drivers with Parkinson's disease.",
      image: neuroDriveImage,
      year: "2025",
    },
    {
      id: "hui",
      title: "Family Emotional Future Assistant",
      category: "Service Design & Product Design & HCI",
      description: "An AI-powered emotional companion robot designed to strengthen family bonds through intelligent interaction and care.",
      image: huiRobotImage,
      year: "2025",
    },
    {
      id: "project4",
      title: "SKYSAFE HEROS",
      category: "Serious Games & Service Design & Interaction Design",
      description: "An aviation safety education model that children are willing to embrace through gamified experience.",
      image: project4Image,
      year: "2024",
    },
  ];

  // 过滤掉当前项目，只显示其他项目
  const recommendedProjects = allProjects.filter(project => project.id !== currentProjectId).slice(0, 3);

  const { t } = useLanguage();

  return (
    <section className="bg-zinc-950 px-6 py-20">
      <div className="max-w-7xl mx-auto">
        <motion.h2
          className="text-white mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ fontSize: "2.5rem", fontWeight: 600 }}
        >
          {t('common.moreProjects')}
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {recommendedProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group cursor-pointer"
              onClick={() => onProjectClick(project.id)}
              data-interactive="true"
            >
              <div className="relative overflow-hidden bg-zinc-900 rounded-2xl aspect-[4/3] mb-4">
                <img
                  src={project.image}
                  alt={t(`project.${project.id}.title`)}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <span className="text-white px-6 py-3 border-2 border-white rounded-full">
                    {t('button.viewProject')}
                  </span>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="text-white" style={{ fontSize: "1.25rem", fontWeight: 600 }}>
                    {t(`project.${project.id}.title`)}
                  </h3>
                  <span className="text-[#DBFE02]">{project.year}</span>
                </div>
                <p className="text-[#DBFE02] text-sm">{t(`project.${project.id}.category`).split(' & ').join(' · ')}</p>
                <p className="text-white/60 text-sm">{t(`project.${project.id}.description`)}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}