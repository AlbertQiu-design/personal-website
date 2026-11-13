import { motion } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";
import { useLanguage } from "./LanguageContext";
import { Lens, LENSES } from "./LensContext";
import { ArrowRight } from "lucide-react";

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
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") choose("all");
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [choose]);

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
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-lg"
        aria-hidden="true"
      />

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
                className="group rounded-2xl bg-white px-6 py-5 text-left text-black shadow-[0_24px_60px_rgba(0,0,0,0.45)] transition-colors duration-200 hover:bg-[#DBFE02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#DBFE02] focus-visible:ring-offset-2 focus-visible:ring-offset-black md:px-7 md:py-6"
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.08 + i * 0.06 }}
                whileTap={{ scale: 0.98 }}
                data-interactive="true"
                data-splash-lens={lens}
              >
                <span
                  className="block text-xl leading-snug tracking-tight md:text-2xl"
                  style={{ fontWeight: 700 }}
                >
                  {t(`lens.${lens}`)}
                </span>
              </motion.button>
            ))}
          </div>

          <div className="mt-5 flex justify-center">
            <button
              type="button"
              onClick={() => choose("all")}
              className="group inline-flex items-center gap-2 px-2 py-1.5 text-sm text-white/55 transition-colors hover:text-white"
              data-interactive="true"
            >
              {t("splash.browse")}
              <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
