import { useEffect, useState, useRef } from 'react';
import { motion } from 'motion/react';

interface Particle {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  size: number;
}

export function SimpleCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [particles, setParticles] = useState<Particle[]>([]);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const particleIdRef = useRef(0);
  const lastMousePosRef = useRef({ x: 0, y: 0 });
  const animationFrameRef = useRef<number>();
  const rafRef = useRef<number>();

  // 检测是否为触屏设备
  useEffect(() => {
    const checkTouchDevice = () => {
      return (
        'ontouchstart' in window ||
        navigator.maxTouchPoints > 0 ||
        window.matchMedia('(pointer: coarse)').matches
      );
    };
    
    setIsTouchDevice(checkTouchDevice());
  }, []);

  useEffect(() => {
    // 如果是触屏设备，不添加事件监听
    if (isTouchDevice) {
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      // 使用 requestAnimationFrame 优化性能
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
      
      rafRef.current = requestAnimationFrame(() => {
        setMousePosition({ x: e.clientX, y: e.clientY });
        
        const target = e.target as HTMLElement;
        setIsHovering(
          target.tagName === 'BUTTON' ||
          target.tagName === 'A' ||
          target.closest('button') !== null ||
          target.closest('a') !== null ||
          target.getAttribute('data-interactive') === 'true'
        );

        // 计算移动距离
        const dx = e.clientX - lastMousePosRef.current.x;
        const dy = e.clientY - lastMousePosRef.current.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        // 鼠标移动时生成粒子 - 减少粒子数量提升性能
        if (distance > 10) { // 从5增加到10，减少粒子生成频率
          const numParticles = Math.min(Math.floor(distance / 15), 2); // 减少粒子数量
          
          for (let i = 0; i < numParticles; i++) {
            const t = i / numParticles;
            const px = lastMousePosRef.current.x + dx * t;
            const py = lastMousePosRef.current.y + dy * t;
            
            const newParticle: Particle = {
              id: particleIdRef.current++,
              x: px,
              y: py,
              vx: (Math.random() - 0.5) * 1.5,
              vy: (Math.random() - 0.5) * 1.5,
              life: 1,
              maxLife: 1,
              size: Math.random() * 4 + 2,
            };
            
            setParticles(prev => [...prev, newParticle].slice(-30)); // 从50减少到30
          }
        }

        lastMousePosRef.current = { x: e.clientX, y: e.clientY };
      });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [isTouchDevice]);

  // 动画循环更新粒子
  useEffect(() => {
    // 如果是触屏设备，不启动动画循环
    if (isTouchDevice) {
      return;
    }

    const animate = () => {
      setParticles(prev => {
        return prev
          .map(p => ({
            ...p,
            x: p.x + p.vx,
            y: p.y + p.vy,
            life: p.life - 0.015,
            vx: p.vx * 0.98,
            vy: p.vy * 0.98,
          }))
          .filter(p => p.life > 0);
      });
      
      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animationFrameRef.current = requestAnimationFrame(animate);
    
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isTouchDevice]);

  // 如果是触屏设备，不渲染光标
  if (isTouchDevice) {
    return null;
  }

  return (
    <>
      {/* 粒子效果 */}
      {particles.map(particle => (
        <div
          key={particle.id}
          className="fixed rounded-full pointer-events-none z-[9998] mix-blend-difference"
          style={{
            left: particle.x - particle.size / 2,
            top: particle.y - particle.size / 2,
            width: particle.size,
            height: particle.size,
            backgroundColor: '#ffffff',
            opacity: particle.life * 0.8,
            transform: `scale(${particle.life})`,
          }}
        />
      ))}

      {/* 主光标 */}
      <motion.div
        className="fixed top-0 left-0 w-12 h-12 rounded-full border-2 border-white pointer-events-none z-[9999] mix-blend-difference"
        style={{ willChange: 'transform' }}
        animate={{
          x: mousePosition.x - 24,
          y: mousePosition.y - 24,
          scale: isHovering ? 1.5 : 1,
        }}
        transition={{
          type: 'tween',
          ease: 'linear',
          duration: 0,
          scale: {
            type: 'spring',
            stiffness: 400,
            damping: 30,
          }
        }}
      />

      {/* 内部光点 */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 rounded-full pointer-events-none z-[10000] mix-blend-difference"
        style={{
          backgroundColor: '#ffffff',
          willChange: 'transform',
        }}
        animate={{
          x: mousePosition.x - 4,
          y: mousePosition.y - 4,
        }}
        transition={{
          type: 'tween',
          ease: 'linear',
          duration: 0,
        }}
      />
    </>
  );
}