import { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, MessageCircle, Send } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

export function StudentContact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('消息已发送！期待与你交流 ✨');
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <section id="contact" className="py-20 px-6 bg-black text-white">
      <div className="container mx-auto max-w-6xl">
        <div className="grid md:grid-cols-2 gap-16">
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div>
              <h2 className="text-5xl md:text-6xl tracking-tight mb-6">
                联系我
              </h2>
              <div className="w-20 h-1 bg-[#DBFE02] mb-8" />
            </div>

            <p className="text-xl text-white/80 leading-relaxed">
              如果你对我的作品感兴趣，或者想要交流设计想法，欢迎随时联系我！
              <br />
              <span className="text-[#DBFE02]">Let's create something amazing together!</span>
            </p>

            <div className="space-y-6">
              <motion.div
                className="flex items-center gap-4"
                whileHover={{ x: 10 }}
                data-interactive="true"
              >
                <div className="w-14 h-14 bg-[#DBFE02] rounded-2xl flex items-center justify-center">
                  <Mail size={24} className="text-black" />
                </div>
                <div>
                  <p className="text-sm text-white/60">邮箱</p>
                  <p className="text-lg">jiangyuqi@design.edu</p>
                </div>
              </motion.div>

              <motion.div
                className="flex items-center gap-4"
                whileHover={{ x: 10 }}
                data-interactive="true"
              >
                <div className="w-14 h-14 bg-[#FF6B9D] rounded-2xl flex items-center justify-center">
                  <MessageCircle size={24} className="text-white" />
                </div>
                <div>
                  <p className="text-sm text-white/60">微信</p>
                  <p className="text-lg">DesignWithYuqi</p>
                </div>
              </motion.div>
            </div>

            <div className="pt-8 space-y-4">
              <p className="text-sm text-white/60">也可以在这里找到我</p>
              <div className="flex gap-4">
                {['Behance', 'Dribbble', 'Instagram', 'LinkedIn'].map((platform) => (
                  <motion.button
                    key={platform}
                    className="px-6 py-3 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    data-interactive="true"
                  >
                    {platform}
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <form onSubmit={handleSubmit} className="space-y-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <label className="block text-sm text-white/60 mb-3">你的名字</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-white/10 border-2 border-white/20 rounded-2xl px-6 py-4 outline-none focus:border-[#DBFE02] transition-colors text-white placeholder-white/40"
                  placeholder="张三"
                  required
                  data-interactive="true"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
              >
                <label className="block text-sm text-white/60 mb-3">邮箱地址</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-white/10 border-2 border-white/20 rounded-2xl px-6 py-4 outline-none focus:border-[#DBFE02] transition-colors text-white placeholder-white/40"
                  placeholder="your@email.com"
                  required
                  data-interactive="true"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                <label className="block text-sm text-white/60 mb-3">想说点什么</label>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full bg-white/10 border-2 border-white/20 rounded-2xl px-6 py-4 outline-none focus:border-[#DBFE02] transition-colors text-white placeholder-white/40 resize-none"
                  rows={5}
                  placeholder="分享你的想法..."
                  required
                  data-interactive="true"
                />
              </motion.div>

              <motion.button
                type="submit"
                className="w-full bg-[#DBFE02] text-black py-4 rounded-2xl flex items-center justify-center gap-3 hover:bg-[#c9ed00] transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                data-interactive="true"
              >
                发送消息
                <Send size={20} />
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
