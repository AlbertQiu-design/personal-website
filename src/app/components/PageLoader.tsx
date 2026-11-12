import { motion } from 'motion/react';
import { useEffect, useState } from 'react';

interface PageLoaderProps {
  onLoadComplete: () => void;
}

export function PageLoader({ onLoadComplete }: PageLoaderProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // 模拟加载进度
    const duration = 1500; // 1.5秒（更快的加载）
    const interval = 20; // 每20ms更新一次
    const steps = duration / interval;
    const increment = 100 / steps;
    let currentProgress = 0;

    const timer = setInterval(() => {
      currentProgress += increment;
      if (currentProgress >= 100) {
        currentProgress = 100;
        clearInterval(timer);
        // 加载完成后等待200ms再淡出
        setTimeout(() => {
          onLoadComplete();
        }, 200);
      }
      setProgress(currentProgress);
    }, interval);

    return () => clearInterval(timer);
  }, [onLoadComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 z-[9999] bg-black flex items-center justify-center"
    >
      <div className="w-full max-w-lg px-8">
        {/* Logo/品牌名称 */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-6xl md:text-7xl text-white mb-3" style={{ fontWeight: 700 }}>Albert Qiu</h1>
          <p className="text-white/50 text-base md:text-lg">Loading Portfolio...</p>
        </motion.div>

        {/* 进度条 */}
        <div className="relative">
          {/* 背景条 */}
          <div className="w-full h-3 bg-white/10 rounded-full overflow-hidden">
            {/* 进度条 */}
            <motion.div
              className="h-full bg-[#DBFE02] rounded-full relative"
              initial={{ width: '0%' }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.1 }}
            >
              {/* 发光效果 */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
            </motion.div>
          </div>

          {/* 进度百分比 */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-center mt-8 text-[#DBFE02] text-3xl md:text-4xl"
            style={{ fontWeight: 700 }}
          >
            {Math.round(progress)}%
          </motion.div>
        </div>

        {/* 装饰性圆点 */}
        <div className="flex justify-center gap-3 mt-10">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-3 h-3 bg-[#DBFE02]/50 rounded-full"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: i * 0.2,
              }}
            />
          ))}
        </div>
      </div>

      <style>{`
        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
        .animate-shimmer {
          animation: shimmer 1.5s infinite;
        }
      `}</style>
    </motion.div>
  );
}