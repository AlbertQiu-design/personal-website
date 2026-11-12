import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { InteractiveImage } from './InteractiveImage';
import { X } from 'lucide-react';

interface Project {
  id: number;
  title: string;
  category: string;
  description: string;
  image: string;
  color: string;
}

const projects: Project[] = [
  {
    id: 1,
    title: 'NeuroDrive',
    category: 'HCI Design',
    description: '智能外骨骼系统，为帕金森患者提供精准运动辅助',
    image: 'https://images.unsplash.com/photo-1609921212029-bb5a28e60960?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2JpbGUlMjBhcHAlMjBkZXNpZ258ZW58MXx8fHwxNzYxNTMwMDMzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    color: '#DBFE02'
  },
  {
    id: 2,
    title: '校园共享平台',
    category: 'Service Design',
    description: '连接学生的闲置物品交换平台',
    image: 'https://images.unsplash.com/photo-1760548425425-e42e77fa38f1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWIlMjBpbnRlcmZhY2UlMjBkZXNpZ258ZW58MXx8fHwxNzYxNTAyMzQyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    color: '#FF6B9D'
  },
  {
    id: 3,
    title: '情绪追踪日记',
    category: 'App Design',
    description: '帮助年轻人管理情绪的温暖应用',
    image: 'https://images.unsplash.com/photo-1586717799252-bd134ad00e26?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1aSUyMHV4JTIwZGVzaWdufGVufDF8fHx8MTc2MTQ5NTEwOHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    color: '#FFB84D'
  },
  {
    id: 4,
    title: '可持续生活指南',
    category: 'Product Design',
    description: '让环保变得简单有趣的生活方式应用',
    image: 'https://images.unsplash.com/photo-1699568542323-ff98aca8ea6a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhYnN0cmFjdCUyMGFydCUyMGNvbG9yZnVsfGVufDF8fHx8MTc2MTQ5Njk3MXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    color: '#00D9A5'
  },
  {
    id: 5,
    title: '音乐社交网络',
    category: 'UX Design',
    description: '基于音乐品味的新型社交平台',
    image: 'https://images.unsplash.com/photo-1586734073732-fd664fbd85c8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcmVhdGl2ZSUyMHBob3RvZ3JhcGh5fGVufDF8fHx8MTc2MTUwNjE0NXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    color: '#9D4EDD'
  },
  {
    id: 6,
    title: '学习计时器',
    category: 'App Design',
    description: '结合番茄工作法的专注学习工具',
    image: 'https://images.unsplash.com/photo-1667266543254-505cf5b16ec4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9kdWN0JTIwZGVzaWduJTIwbW9ja3VwfGVufDF8fHx8MTc2MTQ4MTM3MHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    color: '#4CC9F0'
  },
];

export function StudentPortfolio() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <section id="works" className="py-20 px-6 bg-white">
      <div className="container mx-auto max-w-7xl">
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-5xl md:text-7xl tracking-tight mb-4">作品集</h2>
          <p className="text-xl text-gray-600">一些我在大学期间完成的设计项目 ✨</p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              onClick={() => setSelectedProject(project)}
              className="group cursor-pointer"
              data-interactive="true"
            >
              <div className="relative rounded-3xl overflow-hidden aspect-[4/5] mb-4">
                <InteractiveImage
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full"
                />
                <div 
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: `linear-gradient(to top, ${project.color}CC, transparent)` }}
                />
              </div>
              
              <div className="space-y-2">
                <p className="text-sm text-gray-500">{project.category}</p>
                <h3 className="text-2xl tracking-tight">{project.title}</h3>
                <p className="text-gray-600">{project.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

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
                className="relative max-w-5xl w-full bg-white rounded-3xl overflow-hidden"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={() => setSelectedProject(null)}
                  className="absolute top-6 right-6 z-10 w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-xl hover:scale-110 transition-transform"
                  data-interactive="true"
                >
                  <X size={24} />
                </button>

                <div className="aspect-video relative">
                  <img
                    src={selectedProject.image}
                    alt={selectedProject.title}
                    className="w-full h-full object-cover"
                  />
                  <div 
                    className="absolute inset-0"
                    style={{ background: `linear-gradient(to top, ${selectedProject.color}66, transparent)` }}
                  />
                </div>

                <div className="p-12">
                  <p className="text-gray-500 mb-2">{selectedProject.category}</p>
                  <h3 className="text-4xl tracking-tight mb-4">{selectedProject.title}</h3>
                  <p className="text-xl text-gray-600 mb-8">{selectedProject.description}</p>
                  
                  <div className="grid grid-cols-3 gap-6 py-6 border-y border-gray-200">
                    <div>
                      <p className="text-sm text-gray-500 mb-1">角色</p>
                      <p>主设计师</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-1">工具</p>
                      <p>Figma, Blender</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-1">时间</p>
                      <p>2024-2025</p>
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
