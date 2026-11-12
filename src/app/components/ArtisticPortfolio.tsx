import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Masonry from 'react-responsive-masonry';
import { InteractiveImage } from './InteractiveImage';
import { X } from 'lucide-react';

interface Project {
  id: number;
  title: string;
  category: string;
  description: string;
  image: string;
  height: 'tall' | 'medium' | 'short';
}

const projects: Project[] = [
  {
    id: 1,
    title: '智能家居 App',
    category: '移动应用',
    description: '为智能家居设备打造的直观控制中心',
    image: 'https://images.unsplash.com/photo-1609921212029-bb5a28e60960?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2JpbGUlMjBhcHAlMjBkZXNpZ258ZW58MXx8fHwxNzYxNTMwMDMzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    height: 'tall'
  },
  {
    id: 2,
    title: '企业协作平台',
    category: 'Web应用',
    description: '提升团队效率的协作工具',
    image: 'https://images.unsplash.com/photo-1760548425425-e42e77fa38f1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWIlMjBpbnRlcmZhY2UlMjBkZXNpZ258ZW58MXx8fHwxNzYxNTAyMzQyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    height: 'short'
  },
  {
    id: 3,
    title: '咖啡品牌视觉系统',
    category: '品牌设计',
    description: '从logo到包装的完整品牌体验',
    image: 'https://images.unsplash.com/photo-1548094990-c16ca90f1f0d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxicmFuZGluZyUyMGRlc2lnbnxlbnwxfHx8fDE3NjE0ODE5OTF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    height: 'medium'
  },
  {
    id: 4,
    title: '抽象艺术实验',
    category: '视觉探索',
    description: '色彩与形态的实验性设计',
    image: 'https://images.unsplash.com/photo-1699568542323-ff98aca8ea6a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhYnN0cmFjdCUyMGFydCUyMGNvbG9yZnVsfGVufDF8fHx8MTc2MTQ5Njk3MXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    height: 'short'
  },
  {
    id: 5,
    title: '创意摄影作品',
    category: '摄影',
    description: '捕捉光影的艺术',
    image: 'https://images.unsplash.com/photo-1586734073732-fd664fbd85c8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcmVhdGl2ZSUyMHBob3RvZ3JhcGh5fGVufDF8fHx8MTc2MTUwNjE0NXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    height: 'tall'
  },
  {
    id: 6,
    title: '建筑空间设计',
    category: '空间设计',
    description: '极简主义建筑美学',
    image: 'https://images.unsplash.com/photo-1534094830444-3a1e21f7e3e7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaW5pbWFsaXN0JTIwYXJjaGl0ZWN0dXJlfGVufDF8fHx8MTc2MTQ4Njk1N3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    height: 'medium'
  },
  {
    id: 7,
    title: '健身追踪应用',
    category: '移动应用',
    description: '激励用户保持健康生活方式',
    image: 'https://images.unsplash.com/photo-1586717799252-bd134ad00e26?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1aSUyMHV4JTIwZGVzaWdufGVufDF8fHx8MTc2MTQ5NTEwOHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    height: 'short'
  },
  {
    id: 8,
    title: '电商平台重设计',
    category: 'Web应用',
    description: '优化购物体验和转化率',
    image: 'https://images.unsplash.com/photo-1667266543254-505cf5b16ec4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9kdWN0JTIwZGVzaWduJTIwbW9ja3VwfGVufDF8fHx8MTc2MTQ4MTM3MHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    height: 'tall'
  },
];

export function ArtisticPortfolio() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const getHeightClass = (height: string) => {
    switch (height) {
      case 'tall':
        return 'h-[500px]';
      case 'medium':
        return 'h-[350px]';
      case 'short':
        return 'h-[250px]';
      default:
        return 'h-[350px]';
    }
  };

  return (
    <section id="works" className="py-32 px-6 bg-white">
      <div className="container mx-auto max-w-7xl">
        {/* Section Title */}
        <motion.div
          className="mb-20"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-6xl md:text-8xl tracking-tighter mb-6">
            精选作品
          </h2>
          <motion.div
            className="w-32 h-1 bg-black"
            initial={{ width: 0 }}
            whileInView={{ width: 128 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
          />
        </motion.div>

        {/* Masonry Grid */}
        <Masonry columnsCount={3} gutter="24px">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="relative group"
            >
              <InteractiveImage
                src={project.image}
                alt={project.title}
                className={`${getHeightClass(project.height)} rounded-2xl`}
                onClick={() => setSelectedProject(project)}
              />
              
              {/* Text Overlay */}
              <motion.div
                className="absolute inset-0 p-6 flex flex-col justify-end bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"
                initial={false}
              >
                <p className="text-white/70 text-sm mb-2">{project.category}</p>
                <h3 className="text-white text-2xl tracking-tight mb-2">{project.title}</h3>
                <p className="text-white/80 text-sm">{project.description}</p>
              </motion.div>
            </motion.div>
          ))}
        </Masonry>

        {/* Project Detail Modal */}
        <AnimatePresence>
          {selectedProject && (
            <motion.div
              className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/90"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
            >
              <motion.div
                className="relative max-w-6xl w-full bg-white rounded-3xl overflow-hidden"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ type: 'spring', damping: 25 }}
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={() => setSelectedProject(null)}
                  className="absolute top-6 right-6 z-10 w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
                >
                  <X size={24} />
                </button>

                <div className="grid md:grid-cols-2 gap-0">
                  <div className="aspect-square md:aspect-auto">
                    <img
                      src={selectedProject.image}
                      alt={selectedProject.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  <div className="p-12 flex flex-col justify-center">
                    <p className="text-gray-500 mb-4">{selectedProject.category}</p>
                    <h3 className="text-5xl tracking-tight mb-6">{selectedProject.title}</h3>
                    <p className="text-gray-600 text-lg leading-relaxed mb-8">
                      {selectedProject.description}
                    </p>
                    
                    <div className="space-y-4">
                      <div>
                        <p className="text-sm text-gray-500 mb-1">角色</p>
                        <p>产品设计师</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 mb-1">工具</p>
                        <p>Figma, Principle, After Effects</p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
