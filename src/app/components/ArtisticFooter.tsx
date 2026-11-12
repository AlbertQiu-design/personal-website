import { motion } from 'motion/react';
import { Heart } from 'lucide-react';

export function ArtisticFooter() {
  return (
    <footer className="py-12 px-6 bg-black text-white">
      <div className="container mx-auto max-w-7xl">
        <motion.div
          className="flex flex-col md:flex-row items-center justify-between gap-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-3 text-gray-400">
            <span>© 2025 张设计</span>
            <span>•</span>
            <span className="flex items-center gap-2">
              用 <Heart size={16} className="text-red-500 fill-red-500" /> 设计
            </span>
          </div>

          <div className="flex items-center gap-8">
            {['作品', '关于', '联系'].map((item) => (
              <motion.a
                key={item}
                href={`#${item === '作品' ? 'works' : item === '关于' ? 'about' : 'contact'}`}
                className="text-gray-400 hover:text-white transition-colors relative group"
                whileHover={{ scale: 1.05 }}
              >
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white group-hover:w-full transition-all duration-300" />
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
