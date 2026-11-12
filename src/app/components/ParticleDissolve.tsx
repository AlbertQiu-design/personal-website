import { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  alpha: number;
  size: number;
  color: string;
}

interface ParticleDissolveProps {
  isActive: boolean;
  onComplete: () => void;
}

export function ParticleDissolve({ isActive, onComplete }: ParticleDissolveProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animationFrameRef = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // 设置 canvas 尺寸
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // 创建粒子
    const createParticles = () => {
      const particles: Particle[] = [];
      const particleCount = 250; // 增加粒子数量
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      
      // 从屏幕中心向外扩散
      for (let i = 0; i < particleCount; i++) {
        const angle = Math.random() * Math.PI * 2;
        const velocity = 3 + Math.random() * 6; // 增加速度变化范围
        const distance = Math.random() * 200; // 初始分散距离
        
        // 80% 黄绿色，20% 白色粒子
        const color = Math.random() > 0.2 ? '#DBFE02' : '#FFFFFF';
        
        particles.push({
          x: centerX + Math.cos(angle) * distance,
          y: centerY + Math.sin(angle) * distance,
          vx: Math.cos(angle) * velocity,
          vy: Math.sin(angle) * velocity,
          alpha: 1,
          size: 2 + Math.random() * 4, // 增加粒子大小变化
          color: color,
        });
      }
      
      return particles;
    };

    // 动画循环
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      let allParticlesGone = true;
      
      particlesRef.current.forEach((particle) => {
        // 更新粒子位置
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.alpha -= 0.012; // 稍微减慢消失速度，使效果更丝滑
        
        // 增加速度（加速消散）
        particle.vx *= 1.03;
        particle.vy *= 1.03;
        
        if (particle.alpha > 0) {
          allParticlesGone = false;
          
          // 绘制粒子
          ctx.save();
          ctx.globalAlpha = particle.alpha;
          ctx.fillStyle = particle.color;
          
          // 添加发光效果
          ctx.shadowBlur = 10;
          ctx.shadowColor = particle.color;
          
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        }
      });
      
      if (allParticlesGone) {
        // 所有粒子都消失了，触发完成回调
        cancelAnimationFrame(animationFrameRef.current!);
        onComplete();
      } else {
        animationFrameRef.current = requestAnimationFrame(animate);
      }
    };

    if (isActive) {
      // 激活时创建粒子并开始动画
      particlesRef.current = createParticles();
      animate();
    }

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isActive, onComplete]);

  if (!isActive) return null;

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-[100] pointer-events-none"
      style={{ background: 'transparent' }}
    />
  );
}