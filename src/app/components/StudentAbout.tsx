import { motion } from 'motion/react';
import { Sparkles, Heart, Lightbulb } from 'lucide-react';

export function StudentAbout() {
  const skills = [
    'UI/UX',
    'Figma',
    '用户研究',
    '原型设计',
    'Blender',
    'Arduino',
    'HCI',
    '服务设计',
  ];

  const interests = [
    { icon: Sparkles, label: '可持续设计', color: '#00D9A5' },
    { icon: Heart, label: '无障碍设计', color: '#FF6B9D' },
    { icon: Lightbulb, label: '交互创新', color: '#FFB84D' },
  ];

  return (
    <section id="about" className="py-20 px-6 bg-gradient-to-br from-gray-50 to-white">
      <div className="container mx-auto max-w-6xl">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div>
              <h2 className="text-5xl md:text-6xl tracking-tight mb-6">
                Hi! 我是姜雨琦
              </h2>
              <div className="w-20 h-1 bg-black mb-8" />
            </div>

            <div className="space-y-4 text-lg text-gray-700 leading-relaxed">
              <p>
                我是一名交互设计专业的学生，对创造有温度、有意义的设计充满热情。
              </p>
              <p>
                我相信好的设计不仅要解决问题，更要让人感到愉悦和被关怀。通过深入了解用户需求，我努力将同理心融入每一个设计细节中。
              </p>
              <p>
                在课余时间，我喜欢尝试新的设计工具，参与设计比赛，也热衷于在设计社区分享自己的学习心得。
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500 mb-4">技能工具</p>
              <div className="flex flex-wrap gap-3">
                {skills.map((skill, index) => (
                  <motion.span
                    key={skill}
                    className="px-4 py-2 bg-white rounded-full border-2 border-black hover:bg-black hover:text-white transition-colors cursor-default"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05 }}
                    whileHover={{ scale: 1.05 }}
                    data-interactive="true"
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="bg-gradient-to-br from-purple-100 to-pink-100 rounded-3xl p-12 aspect-square flex items-center justify-center">
              <div className="text-center space-y-6">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                  className="text-8xl"
                >
                  ✨
                </motion.div>
                <p className="text-2xl">设计改变生活</p>
              </div>
            </div>

            <div className="space-y-4">
              <p className="text-sm text-gray-500">设计兴趣</p>
              {interests.map((interest, index) => (
                <motion.div
                  key={interest.label}
                  className="flex items-center gap-4 p-4 bg-white rounded-2xl border-2 border-gray-100 hover:border-gray-300 transition-colors"
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ x: 8 }}
                  data-interactive="true"
                >
                  <div 
                    className="w-12 h-12 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: interest.color + '20' }}
                  >
                    <interest.icon size={24} style={{ color: interest.color }} />
                  </div>
                  <span className="text-lg">{interest.label}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
