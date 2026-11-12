import { useState } from 'react';
import { motion } from 'motion/react';
import { Send, Mail, MapPin } from 'lucide-react';
import { MagneticButton } from './MagneticButton';
import { toast } from 'sonner@2.0.3';

export function ArtisticContact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('消息已发送！我会尽快回复您。');
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <section id="contact" className="py-32 px-6 bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container mx-auto max-w-7xl">
        <div className="grid md:grid-cols-2 gap-20">
          {/* Left Side - Info */}
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
                transition={{ duration: 0.8 }}
              >
                让我们
                <br />
                一起创造
              </motion.h2>
              
              <motion.div
                className="w-32 h-1 bg-black"
                initial={{ width: 0 }}
                whileInView={{ width: 128 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.3 }}
              />
            </div>

            <motion.p
              className="text-xl text-gray-600 leading-relaxed"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              对我的作品感兴趣？想要合作或只是打个招呼？
              <br />
              我随时欢迎新的挑战和机会。
            </motion.p>

            <motion.div
              className="space-y-6 pt-8"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <div className="flex items-center gap-4 group">
                <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Mail size={20} className="text-white" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">邮箱</p>
                  <p className="text-lg">zhang.design@example.com</p>
                </div>
              </div>

              <div className="flex items-center gap-4 group">
                <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                  <MapPin size={20} className="text-white" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">位置</p>
                  <p className="text-lg">中国 北京</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="pt-8 space-y-4"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <p className="text-sm text-gray-500">社交媒体</p>
              <div className="flex gap-4">
                {['Dribbble', 'Behance', 'LinkedIn', 'Twitter'].map((platform, index) => (
                  <MagneticButton
                    key={platform}
                    className="px-6 py-3 bg-black text-white rounded-full hover:bg-gray-800 transition-colors"
                  >
                    {platform}
                  </MagneticButton>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Right Side - Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <form onSubmit={handleSubmit} className="space-y-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <label className="block text-sm text-gray-500 mb-3">您的姓名</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-transparent border-b-2 border-gray-300 pb-3 outline-none focus:border-black transition-colors text-lg"
                  placeholder="张三"
                  required
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <label className="block text-sm text-gray-500 mb-3">邮箱地址</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-transparent border-b-2 border-gray-300 pb-3 outline-none focus:border-black transition-colors text-lg"
                  placeholder="your@email.com"
                  required
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <label className="block text-sm text-gray-500 mb-3">您的消息</label>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full bg-transparent border-b-2 border-gray-300 pb-3 outline-none focus:border-black transition-colors text-lg resize-none"
                  rows={4}
                  placeholder="告诉我您的想法..."
                  required
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                <MagneticButton
                  className="w-full bg-black text-white py-6 rounded-full flex items-center justify-center gap-3 hover:bg-gray-800 transition-colors text-lg"
                >
                  发送消息
                  <Send size={20} />
                </MagneticButton>
              </motion.div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
