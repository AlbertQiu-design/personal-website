import { motion, useInView, useScroll, useTransform } from 'motion/react';
import { useRef, ReactNode } from 'react';

interface ScrollAnimationProps {
  children: ReactNode;
  type?: 'fadeIn' | 'slideUp' | 'slideLeft' | 'slideRight' | 'scale' | 'blur' | 'rotate';
  delay?: number;
  duration?: number;
  className?: string;
  once?: boolean; // 是否只播放一次
}

export function ScrollAnimation({
  children,
  type = 'fadeIn',
  delay = 0,
  duration = 0.6,
  className = '',
  once = true,
}: ScrollAnimationProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { 
    once,
    margin: '-100px' // 元素进入视口100px时触发
  });

  // 不同类型的动画配置
  const animations = {
    fadeIn: {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
    },
    slideUp: {
      initial: { opacity: 0, y: 50 },
      animate: { opacity: 1, y: 0 },
    },
    slideLeft: {
      initial: { opacity: 0, x: 50 },
      animate: { opacity: 1, x: 0 },
    },
    slideRight: {
      initial: { opacity: 0, x: -50 },
      animate: { opacity: 1, x: 0 },
    },
    scale: {
      initial: { opacity: 0, scale: 0.8 },
      animate: { opacity: 1, scale: 1 },
    },
    blur: {
      initial: { opacity: 0, filter: 'blur(10px)' },
      animate: { opacity: 1, filter: 'blur(0px)' },
    },
    rotate: {
      initial: { opacity: 0, rotate: -10, scale: 0.9 },
      animate: { opacity: 1, rotate: 0, scale: 1 },
    },
  };

  const animation = animations[type];

  return (
    <motion.div
      ref={ref}
      initial={animation.initial}
      animate={isInView ? animation.animate : animation.initial}
      transition={{ 
        duration,
        delay,
        ease: [0.25, 0.1, 0.25, 1] // 自定义缓动曲线
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// 视差滚动组件
interface ParallaxProps {
  children: ReactNode;
  speed?: number; // 负数向下滚动，正数向上滚动
  className?: string;
}

export function Parallax({ children, speed = 0.5, className = '' }: ParallaxProps) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [-100 * speed, 100 * speed]);

  return (
    <div ref={ref} className={className}>
      <motion.div style={{ y }}>
        {children}
      </motion.div>
    </div>
  );
}

// 渐进式文字显示组件
interface RevealTextProps {
  text: string;
  className?: string;
  delay?: number;
}

export function RevealText({ text, className = '', delay = 0 }: RevealTextProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const words = text.split(' ');

  return (
    <span ref={ref} className={className}>
      {words.map((word, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{
            duration: 0.5,
            delay: delay + index * 0.05,
            ease: [0.25, 0.1, 0.25, 1],
          }}
          className="inline-block mr-[0.25em]"
        >
          {word}
        </motion.span>
      ))}
    </span>
  );
}

// 滚动进度指示器
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-[#DBFE02] origin-left z-50"
      style={{ scaleX }}
    />
  );
}

// 数字滚动计数器
interface CounterProps {
  from?: number;
  to: number;
  duration?: number;
  suffix?: string;
  prefix?: string;
  className?: string;
}

export function Counter({ from = 0, to, duration = 2, suffix = '', prefix = '', className = '' }: CounterProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const value = useTransform(
    scrollYProgress,
    [0, 0.5],
    [from, to]
  );

  return (
    <span ref={ref} className={className}>
      {isInView && (
        <motion.span>
          {prefix}
          <motion.span>{Math.round(value.get())}</motion.span>
          {suffix}
        </motion.span>
      )}
    </span>
  );
}

// 交错动画容器（用于列表项）
interface StaggerContainerProps {
  children: ReactNode;
  staggerDelay?: number;
  className?: string;
}

export function StaggerContainer({ children, staggerDelay = 0.1, className = '' }: StaggerContainerProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <div ref={ref} className={className}>
      {Array.isArray(children) ? (
        children.map((child, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{
              duration: 0.5,
              delay: index * staggerDelay,
              ease: [0.25, 0.1, 0.25, 1],
            }}
          >
            {child}
          </motion.div>
        ))
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{
            duration: 0.5,
            ease: [0.25, 0.1, 0.25, 1],
          }}
        >
          {children}
        </motion.div>
      )}
    </div>
  );
}
