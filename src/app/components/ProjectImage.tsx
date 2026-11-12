import { useState, useEffect } from 'react';
import { motion } from 'motion/react';

interface ProjectImageProps {
  src: string;
  alt: string;
  index?: number;
}

export function ProjectImage({ src, alt, index = 0 }: ProjectImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [shouldLoad, setShouldLoad] = useState(index === 0);

  const isFirstImage = index === 0;

  // 顺序加载逻辑：每张图片延迟加载
  useEffect(() => {
    if (index > 0) {
      const delay = index * 300; // 每张图片延迟300ms
      const timer = setTimeout(() => {
        setShouldLoad(true);
      }, delay);
      return () => clearTimeout(timer);
    }
  }, [index]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={isFirstImage ? { opacity: 1 } : undefined}
      whileInView={!isFirstImage ? { opacity: 1 } : undefined}
      viewport={!isFirstImage ? { once: true, margin: "200px" } : undefined}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      className="relative w-full"
    >
      {/* 实际图片 - 始终渲染以撑开容器 */}
      <img
        src={shouldLoad ? src : ''}
        alt={alt}
        className={`w-full h-auto block transition-opacity duration-500 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
        onLoad={() => setIsLoaded(true)}
        loading={isFirstImage ? 'eager' : 'lazy'}
      />

      {/* 加载指示器 - 在图片位置显示 */}
      {!isLoaded && shouldLoad && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-900/20">
          <div className="w-10 h-10 border-3 border-[#DBFE02] border-t-transparent rounded-full animate-spin" />
        </div>
      )}

      {/* 占位符 - 在图片未开始加载时显示 */}
      {!shouldLoad && (
        <div className="w-full bg-gray-900/10" style={{ aspectRatio: '16/9', minHeight: '400px' }}>
          <div className="w-full h-full flex items-center justify-center">
            <div className="w-8 h-8 border-2 border-gray-600 border-t-transparent rounded-full animate-spin opacity-50" />
          </div>
        </div>
      )}
    </motion.div>
  );
}