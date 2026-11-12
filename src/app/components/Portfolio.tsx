import { useState } from 'react';
import { Badge } from './ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from './ui/dialog';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { ExternalLink } from 'lucide-react';

interface Project {
  id: number;
  title: string;
  category: string;
  description: string;
  fullDescription: string;
  image: string;
  tags: string[];
  role: string;
  duration: string;
  tools: string[];
}

const projects: Project[] = [
  {
    id: 1,
    title: '智能家居 App',
    category: '移动应用',
    description: '为智能家居设备打造的直观控制中心',
    fullDescription: '这是一个综合性的智能家居控制应用，允许用户通过单一界面管理所有智能设备。设计重点在于简化复杂的设备控制流程，提供清晰的视觉反馈和直观的交互方式。',
    image: 'https://images.unsplash.com/photo-1609921212029-bb5a28e60960?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2JpbGUlMjBhcHAlMjBkZXNpZ258ZW58MXx8fHwxNzYxNTMwMDMzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    tags: ['UI/UX', 'iOS', 'Android'],
    role: '产品设计师',
    duration: '3个月',
    tools: ['Figma', 'Principle', 'After Effects']
  },
  {
    id: 2,
    title: '企业协作平台',
    category: 'Web应用',
    description: '提升团队效率的协作工具',
    fullDescription: '为现代团队设计的综合性协作平台，集成项目管理、文档协作和实时通讯功能。设计理念是创建一个统一的工作空间，减少工具切换，提高团队协作效率。',
    image: 'https://images.unsplash.com/photo-1760548425425-e42e77fa38f1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWIlMjBpbnRlcmZhY2UlMjBkZXNpZ258ZW58MXx8fHwxNzYxNTAyMzQyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    tags: ['UI/UX', 'SaaS', 'Dashboard'],
    role: '主设计师',
    duration: '6个月',
    tools: ['Figma', 'Figjam', 'Protopie']
  },
  {
    id: 3,
    title: '咖啡品牌视觉系统',
    category: '品牌设计',
    description: '从logo到包装的完整品牌体验',
    fullDescription: '为一家精品咖啡品牌打造的完整视觉识别系统，包括品牌标识、色彩系统、字体规范以及包装设计。设计灵感来自咖啡的起源和制作工艺。',
    image: 'https://images.unsplash.com/photo-1548094990-c16ca90f1f0d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxicmFuZGluZyUyMGRlc2lnbnxlbnwxfHx8fDE3NjE0ODE5OTF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    tags: ['品牌', 'VI', '包装'],
    role: '品牌设计师',
    duration: '2个月',
    tools: ['Illustrator', 'Photoshop', 'InDesign']
  },
  {
    id: 4,
    title: '健身追踪应用',
    category: '移动应用',
    description: '激励用户保持健康生活方式',
    fullDescription: '一款帮助用户设定健身目标、追踪进度并保持动力的应用。界面设计强调数据可视化和成就感，使用户能够清晰地看到自己的进步。',
    image: 'https://images.unsplash.com/photo-1586717799252-bd134ad00e26?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1aSUyMHV4JTIwZGVzaWdufGVufDF8fHx8MTc2MTQ5NTEwOHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    tags: ['UI/UX', 'Mobile', '数据可视化'],
    role: '产品设计师',
    duration: '4个月',
    tools: ['Figma', 'Sketch', 'Principle']
  },
  {
    id: 5,
    title: '电商平台重设计',
    category: 'Web应用',
    description: '优化购物体验和转化率',
    fullDescription: '对现有电商平台进行全面重设计，重点优化用户购物流程和产品展示。通过用户研究和A/B测试，成功提升了30%的转化率。',
    image: 'https://images.unsplash.com/photo-1667266543254-505cf5b16ec4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9kdWN0JTIwZGVzaWduJTIwbW9ja3VwfGVufDF8fHx8MTc2MTQ4MTM3MHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    tags: ['UI/UX', '电商', '响应式'],
    role: '主设计师',
    duration: '5个月',
    tools: ['Figma', 'Maze', 'Optimal Workshop']
  },
  {
    id: 6,
    title: '金融数据仪表板',
    category: 'Dashboard',
    description: '复杂数据的清晰呈现',
    fullDescription: '为金融专业人士设计的数据分析仪表板，将复杂的金融数据转化为易于理解的可视化图表。设计重点在于信息层级和快速数据获取。',
    image: 'https://images.unsplash.com/photo-1760548425425-e42e77fa38f1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWIlMjBpbnRlcmZhY2UlMjBkZXNpZ258ZW58MXx8fHwxNzYxNTAyMzQyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    tags: ['UI/UX', '数据可视化', 'B2B'],
    role: '产品设计师',
    duration: '4个月',
    tools: ['Figma', 'D3.js', 'Protopie']
  }
];

export function Portfolio() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <section id="works" className="py-20 px-6 bg-muted/30">
      <div className="container mx-auto max-w-6xl">
        <div className="space-y-4 mb-12">
          <h2 className="text-4xl tracking-tight">精选作品</h2>
          <p className="text-muted-foreground max-w-2xl">
            以下是我近期参与的部分项目，涵盖移动应用、Web应用和品牌设计等多个领域。
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <div
              key={project.id}
              onClick={() => setSelectedProject(project)}
              className="group cursor-pointer bg-card rounded-xl overflow-hidden border border-border hover:shadow-lg transition-all duration-300"
            >
              <div className="aspect-[4/3] overflow-hidden bg-muted">
                <ImageWithFallback
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-6 space-y-3">
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">{project.category}</p>
                  <h3 className="tracking-tight">{project.title}</h3>
                </div>
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2 pt-2">
                  {project.tags.map((tag) => (
                    <Badge key={tag} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <Dialog open={!!selectedProject} onOpenChange={() => setSelectedProject(null)}>
          <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
            {selectedProject && (
              <>
                <DialogHeader>
                  <DialogTitle className="text-3xl">{selectedProject.title}</DialogTitle>
                  <DialogDescription>{selectedProject.category}</DialogDescription>
                </DialogHeader>
                
                <div className="space-y-6 mt-6">
                  <div className="aspect-video rounded-lg overflow-hidden bg-muted">
                    <ImageWithFallback
                      src={selectedProject.image}
                      alt={selectedProject.title}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="space-y-4">
                    <div>
                      <h4 className="mb-2">项目概述</h4>
                      <p className="text-muted-foreground">{selectedProject.fullDescription}</p>
                    </div>

                    <div className="grid grid-cols-3 gap-4 py-4 border-y border-border">
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">角色</p>
                        <p>{selectedProject.role}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">周期</p>
                        <p>{selectedProject.duration}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">类型</p>
                        <p>{selectedProject.category}</p>
                      </div>
                    </div>

                    <div>
                      <h4 className="mb-2">设计工具</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedProject.tools.map((tool) => (
                          <Badge key={tool} variant="outline">
                            {tool}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="mb-2">技能标签</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedProject.tags.map((tag) => (
                          <Badge key={tag}>
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
}
