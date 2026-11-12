import { motion } from 'motion/react';

const CJK = /[\u3000-\u9fff\uff00-\uffef]/;

interface SpringTextProps {
  text: string;
  className?: string;
}

/**
 * 统一的弹簧字符效果：悬停时字符旋转并上移。
 * 注意：入场动画 (whileInView) 请放在外层 motion.div 上，避免 transition 冲突。
 * 按单词分组，保证换行只发生在单词之间。
 */
export function SpringText({ text, className = '' }: SpringTextProps) {
  const words = text.split(' ');
  return (
    <span className={className}>
      {words.map((word, wi) => (
        <span key={wi} className={CJK.test(word) ? 'inline' : 'inline-block whitespace-nowrap'}>
          {word.split('').map((char, ci) => (
            <motion.span
              key={ci}
              className="inline-block"
              whileHover={{ rotate: -8, y: -5 }}
              transition={{ type: 'spring', stiffness: 300, damping: 10 }}
              data-interactive="true"
            >
              {char}
            </motion.span>
          ))}
          {wi < words.length - 1 && <span className="inline-block">{'\u00A0'}</span>}
        </span>
      ))}
    </span>
  );
}
