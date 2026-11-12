import { motion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';

export function ArtisticAbout() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const x = useTransform(scrollYProgress, [0, 1], [-100, 100]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 0]);

  const skills = [
    'UI/UX 设计',
    '用户研究',
    '原型设计',
    '视觉设计',
    '交互设计',
    '品牌设计',
    'Design System',
    '动效设计',
  ];

  return (
    <section id="about" ref={containerRef} className="py-32 px-6 bg-black text-white overflow-hidden">
      <div className="container mx-auto max-w-7xl">
        <div className="grid md:grid-cols-2 gap-20 items-center">
          {/* Left Side - Content */}
          <motion.div
            className="space-y-12"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="space-y-6">
              <motion.h2
                className="text-6xl md:text-7xl tracking-tighter"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                关于我
              </motion.h2>
              
              <motion.div
                className="w-32 h-1 bg-white"
                initial={{ width: 0 }}
                whileInView={{ width: 128 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.4 }}
              />
            </div>

            <motion.div
              className="space-y-6 text-lg text-gray-300 leading-relaxed"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <p>
                我是一名充满热情的产品设计师，拥有5年以上的设计经验。我相信好的设计不仅要美观，更要解决实际问题。
              </p>
              <p>
                通过深入的用户研究和数据分析，我致力于创造简洁、直观且令人愉悦的产品体验。将复杂的业务需求转化为优雅的设计解决方案是我的专长。
              </p>
            </motion.div>

            <motion.div
              className="pt-8"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <p className="text-sm text-gray-500 mb-4">核心技能</p>
              <div className="flex flex-wrap gap-3">
                {skills.map((skill, index) => (
                  <motion.span
                    key={skill}
                    className="px-4 py-2 border border-white/20 rounded-full hover:bg-white hover:text-black transition-colors cursor-default"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.8 + index * 0.05 }}
                    whileHover={{ scale: 1.05 }}
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Right Side - Visual Element */}
          <motion.div
            className="relative h-[600px]"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              className="absolute inset-0 rounded-3xl overflow-hidden"
              style={{ x }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-purple-600 via-pink-500 to-blue-600 opacity-80" />
              <motion.div
                className="absolute top-1/4 left-1/4 w-64 h-64 bg-white/10 rounded-full blur-3xl"
                animate={{
                  scale: [1, 1.2, 1],
                  x: [0, 50, 0],
                  y: [0, 30, 0],
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />
              <motion.div
                className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-white/10 rounded-full blur-3xl"
                animate={{
                  scale: [1, 1.3, 1],
                  x: [0, -30, 0],
                  y: [0, 50, 0],
                }}
                transition={{
                  duration: 10,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />
            </motion.div>

            {/* Stats */}
            <div className="absolute inset-0 flex flex-col justify-center items-center text-center space-y-8 z-10">
              {[
                { number: '5+', label: '年经验' },
                { number: '50+', label: '完成项目' },
                { number: '100%', label: '客户满意度' },
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 1 + index * 0.2 }}
                >
                  <div className="text-6xl tracking-tighter mb-2">{stat.number}</div>
                  <div className="text-sm text-gray-300">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
