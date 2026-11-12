import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Slider } from './ui/slider';
import { Settings, ChevronLeft, ChevronRight } from 'lucide-react';
import image1 from 'figma:asset/7ed9be81e62e82bbf6661594c4f10a617f3832d8.png';
import image2 from 'figma:asset/be6816d5573d145304212872dd5dce1ae4625814.png';
import image3 from 'figma:asset/1d2a2d7bcc209f86d891034d67e0d429d42cff55.png';
import image4 from 'figma:asset/730f69d65e07aa4187f57386c8a6fdcd87deaad7.png';
import image5 from 'figma:asset/2c914c1d7ccfea5af88734313935fb66f2edd150.png';

export function BackgroundCarousel() {
  const images = [image1, image2, image3, image4, image5];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [opacity, setOpacity] = useState(75); // 0-100
  const [speed, setSpeed] = useState(2.5); // 1-10 秒
  const [verticalOffset, setVerticalOffset] = useState(3); // -50 到 50，控制图片上下移动
  const [isExpanded, setIsExpanded] = useState(false); // 控制面板展开/收起状态

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        const nextIndex = (prevIndex + 1) % images.length;
        return nextIndex;
      });
    }, speed * 1000);

    return () => clearInterval(interval);
  }, [speed, images.length]);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => 
      (prevIndex + 1) % images.length
    );
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <>
      <div className="absolute inset-0 overflow-hidden">
        {images.map((image, index) => (
          <motion.div
            key={index}
            className="absolute inset-0"
            initial={false}
            animate={{ 
              opacity: index === currentIndex ? opacity / 100 : 0 
            }}
            transition={{ duration: 1, ease: "easeInOut" }}
          >
            <img
              src={image}
              alt=""
              className="w-full h-full object-contain"
              style={{ 
                objectPosition: 'center',
                transform: `translate(${index === 1 ? '1%' : '0'}, ${verticalOffset}%)`,
                transition: 'transform 0.3s ease-out'
              }}
            />
          </motion.div>
        ))}
      </div>

      {/* 左右切换按钮 - 手机端隐藏 */}
      <div className="hidden md:flex absolute inset-0 items-center justify-between px-8 z-50 pointer-events-none">
        <motion.button
          onClick={(e) => {
            e.stopPropagation();
            goToPrevious();
          }}
          className="bg-black/40 backdrop-blur-sm border border-white/20 rounded-full p-4 text-white hover:bg-black/60 transition-all pointer-events-auto"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          data-interactive="true"
          aria-label="Previous image"
        >
          <ChevronLeft size={24} />
        </motion.button>

        <motion.button
          onClick={(e) => {
            e.stopPropagation();
            goToNext();
          }}
          className="bg-black/40 backdrop-blur-sm border border-white/20 rounded-full p-4 text-white hover:bg-black/60 transition-all pointer-events-auto"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          data-interactive="true"
          aria-label="Next image"
        >
          <ChevronRight size={24} />
        </motion.button>
      </div>

      {/* 导航点指示器 */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-50 flex gap-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={(e) => {
              e.stopPropagation();
              goToSlide(index);
            }}
            className="group pointer-events-auto"
            data-interactive="true"
            aria-label={`Go to image ${index + 1}`}
          >
            <motion.div
              className="rounded-full transition-all"
              style={{
                width: index === currentIndex ? '32px' : '8px',
                height: '8px',
                backgroundColor: index === currentIndex ? '#DBFE02' : 'rgba(255, 255, 255, 0.4)',
              }}
              whileHover={{ 
                backgroundColor: index === currentIndex ? '#DBFE02' : 'rgba(255, 255, 255, 0.7)',
              }}
              transition={{ duration: 0.3 }}
            />
          </button>
        ))}
      </div>

      {/* 控制面板 - 可展开/收起 */}
      <div className="fixed bottom-8 right-8 z-20">
        <AnimatePresence mode="wait">
          {!isExpanded ? (
            // 收起状态 - 调试按钮
            <motion.button
              key="collapsed"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setIsExpanded(true)}
              className="bg-black/60 backdrop-blur-sm border border-white/20 rounded-full p-3 text-white hover:bg-black/80 transition-colors flex items-center justify-center"
              data-interactive="true"
              aria-label="调试面板"
            >
              <Settings size={18} />
            </motion.button>
          ) : (
            // 展开状态 - 完整滑块面板
            <motion.div
              key="expanded"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="bg-black/60 backdrop-blur-sm border border-white/20 rounded-lg p-6 space-y-6 w-64"
            >
              {/* 关闭按钮 */}
              <div className="flex items-center justify-between mb-4">
                <span className="text-white" style={{ fontSize: '0.875rem' }}>调试面板</span>
                <button
                  onClick={() => setIsExpanded(false)}
                  className="text-white/60 hover:text-white transition-colors"
                  data-interactive="true"
                  aria-label="关闭调试面板"
                >
                  <Settings size={18} />
                </button>
              </div>

              {/* 透明度滑块 */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-white/80" style={{ fontSize: '0.875rem' }}>
                    Opacity
                  </label>
                  <span className="text-[#DBFE02]" style={{ fontSize: '0.875rem' }}>
                    {opacity}%
                  </span>
                </div>
                <Slider
                  value={[opacity]}
                  onValueChange={(value) => setOpacity(value[0])}
                  min={0}
                  max={100}
                  step={1}
                  className="cursor-pointer"
                />
              </div>

              {/* 轮播速度滑块 */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-white/80" style={{ fontSize: '0.875rem' }}>
                    Speed
                  </label>
                  <span className="text-[#DBFE02]" style={{ fontSize: '0.875rem' }}>
                    {speed}s
                  </span>
                </div>
                <Slider
                  value={[speed]}
                  onValueChange={(value) => setSpeed(value[0])}
                  min={1}
                  max={10}
                  step={0.5}
                  className="cursor-pointer"
                />
              </div>

              {/* 垂直位置滑块 */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-white/80" style={{ fontSize: '0.875rem' }}>
                    Vertical Position
                  </label>
                  <span className="text-[#DBFE02]" style={{ fontSize: '0.875rem' }}>
                    {verticalOffset > 0 ? '+' : ''}{verticalOffset}%
                  </span>
                </div>
                <Slider
                  value={[verticalOffset]}
                  onValueChange={(value) => setVerticalOffset(value[0])}
                  min={-50}
                  max={50}
                  step={1}
                  className="cursor-pointer"
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}