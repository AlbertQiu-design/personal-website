import { motion } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";
import { useLanguage } from "./LanguageContext";
import { Lens, LENSES } from "./LensContext";

interface SplashScreenProps {
  onEnter: (lens: Lens) => void;
}

/** 首次进入：首页压暗虚化，亮色区只放「你正在寻找」和三个身份 */
export function SplashScreen({ onEnter }: SplashScreenProps) {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const { t } = useLanguage();
  const enteredRef = useRef(false);

  const choose = useCallback(
    (lens: Lens) => {
      if (enteredRef.current) return;
      enteredRef.current = true;
      setIsTransitioning(true);
      window.setTimeout(() => onEnter(lens), 420);
    },
    [onEnter],
  );

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  return (
    <motion.div
      className="fixed inset-0 z-[60]"
      initial={{ opacity: 0 }}
      animate={{ opacity: isTransitioning ? 0 : 1 }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
      style={{ pointerEvents: isTransitioning ? "none" : "auto" }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="splash-prompt"
      data-splash-overlay="true"
    >
      {/* 顶栏高度：桌面 83px，窄屏 77px。模糊层从顶栏下沿开始，避免把导航高亮涂成溢出的圆。 */}
      <div className="absolute inset-x-0 bottom-0 top-[77px] bg-black/50 backdrop-blur-lg md:top-[83px]" aria-hidden="true" />

      <div className="relative z-10 flex min-h-screen items-center justify-center px-6 py-16">
        <motion.div
          className="w-full"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
        >
          <h2
            id="splash-prompt"
            className="mb-8 text-center text-4xl leading-tight text-white md:mb-10 md:text-6xl"
            style={{ fontWeight: 700 }}
          >
            {t("splash.prompt")}
          </h2>

          <div className="mx-auto flex w-full max-w-md flex-col gap-3">
            {LENSES.map((lens, i) => (
              <motion.button
                key={lens}
                type="button"
                onClick={() => choose(lens)}
                className="w-full rounded-full border border-white/45 bg-[#161616] px-5 py-2.5 text-center text-lg font-semibold text-white transition-colors duration-200 hover:bg-[#242424] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 md:px-6 md:py-3 md:text-xl"
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.08 + i * 0.06 }}
                whileTap={{ scale: 0.98 }}
                data-interactive="true"
                data-splash-lens={lens}
              >
                <span className="block whitespace-nowrap leading-none tracking-tight">
                  {t(`lens.${lens}`)}
                </span>
              </motion.button>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
