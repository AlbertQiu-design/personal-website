import { Briefcase, GraduationCap, Award } from 'lucide-react';
import { Badge } from './ui/badge';

export function About() {
  const skills = [
    'UI/UX 设计',
    '用户研究',
    '原型设计',
    '视觉设计',
    '交互设计',
    '品牌设计',
    'Design System',
    '数据可视化',
    '响应式设计',
    '可用性测试'
  ];

  const experience = [
    {
      icon: Briefcase,
      title: '高级产品设计师',
      company: '创新科技公司',
      period: '2022 - 至今',
      description: '负责公司核心产品的设计工作，领导设计团队完成多个重要项目。'
    },
    {
      icon: Briefcase,
      title: '产品设计师',
      company: '数字解决方案公司',
      period: '2019 - 2022',
      description: '参与多个客户项目，从移动应用到Web平台的完整设计流程。'
    },
    {
      icon: GraduationCap,
      title: '视觉传达设计',
      company: '中央美术学院',
      period: '2015 - 2019',
      description: '获得设计学学士学位，专注于数字媒体设计方向。'
    }
  ];

  return (
    <section id="about" className="py-20 px-6">
      <div className="container mx-auto max-w-6xl">
        <div className="grid md:grid-cols-2 gap-12">
          <div className="space-y-6">
            <div className="space-y-4">
              <h2 className="text-4xl tracking-tight">关于我</h2>
              <p className="text-muted-foreground">
                我是一名充满热情的产品设计师，拥有5年以上的设计经验。我相信好的设计不仅要美观，更要解决实际问题，为用户创造价值。
              </p>
              <p className="text-muted-foreground">
                我的设计理念是以用户为中心，通过深入的用户研究和数据分析，创造简洁、直观且令人愉悦的产品体验。我善于将复杂的业务需求转化为优雅的设计解决方案。
              </p>
            </div>

            <div className="space-y-3">
              <h3>核心技能</h3>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <Badge key={skill} variant="secondary">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="pt-4">
              <div className="flex items-center gap-2 text-primary">
                <Award size={20} />
                <span>Red Dot Design Award 2023</span>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3>工作经历</h3>
            <div className="space-y-6">
              {experience.map((item, index) => (
                <div key={index} className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <item.icon size={20} className="text-primary" />
                    </div>
                  </div>
                  <div className="space-y-1 flex-1">
                    <h4>{item.title}</h4>
                    <p className="text-sm text-muted-foreground">{item.company}</p>
                    <p className="text-sm text-muted-foreground">{item.period}</p>
                    <p className="text-sm text-muted-foreground pt-1">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
