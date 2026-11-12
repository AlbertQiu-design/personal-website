import { motion } from "motion/react";
import { useState, useEffect, useRef } from "react";
import { BackgroundCarousel } from "./BackgroundCarousel";
import { useLanguage } from "./LanguageContext";
import { Lens, LENSES } from "./LensContext";
import { ArrowUpRight, ArrowRight } from "lucide-react";

interface SplashScreenProps {
  onEnter: (lens: Lens) => void;
}

const portfolioText = "PORTFOLIO";
const yearText = "2026";
const firstNameText = "ALBERT";
const lastNameText = "QIU";

const generateRandomIndices = (text: string, min: number, max: number) => {
  const count = Math.floor(Math.random() * (max - min + 1)) + min;
  const indices = new Set<number>();
  while (indices.size < count) {
    indices.add(Math.floor(Math.random() * text.length));
  }
  return Array.from(indices);
};

/** 开屏：跳字 + 「你正在寻找——」身份选择（取代自动进入） */
export function SplashScreen({ onEnter }: SplashScreenProps) {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const { t } = useLanguage();
  const enteredRef = useRef(false);

  const [b1, setB1] = useState<number[]>([]);
  const [b2, setB2] = useState<number[]>([]);
  const [b3, setB3] = useState<number[]>([]);
  const [b4, setB4] = useState<number[]>([]);

  useEffect(() => {
    const update = () => {
      setB1(generateRandomIndices(portfolioText, 2, 4));
      setB2(generateRandomIndices(yearText, 1, 2));
      setB3(generateRandomIndices(firstNameText, 2, 3));
      setB4(generateRandomIndices(lastNameText, 1, 2));
    };
    update();
    const interval = setInterval(update, 2000);
    return () => clearInterval(interval);
  }, []);

  const choose = (lens: Lens) => {
    if (enteredRef.current) return;
    enteredRef.current = true;
    setIsTransitioning(true);
    setTimeout(() => onEnter(lens), 700);
  };

  // Esc = 只是看看
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") choose("all");
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderBouncingText = (text: string, indices: number[]) =>
    text.split("").map((char, index) => {
      const bouncing = indices.includes(index);
      return (
        <motion.span
          key={index}
          className="inline-block"
          animate={bouncing ? { y: [0, -8, 0] } : { y: 0 }}
          transition={
            bouncing
              ? { y: { duration: 0.6, ease: "easeInOut" } }
              : { type: "spring", stiffness: 300, damping: 10 }
          }
          whileHover={{ rotate: -8, y: -5 }}
          data-interactive="true"
        >
          {char}
        </motion.span>
      );
    });

  return (
    <motion.div
      className="fixed inset-0 z-40 overflow-y-auto"
      initial={{ opacity: 1 }}
      animate={{ opacity: isTransitioning ? 0 : 1 }}
      transition={{ duration: 0.7, ease: "easeInOut" }}
      style={{ pointerEvents: isTransitioning ? "none" : "auto" }}
    >
      <div className="fixed inset-0 bg-black">
        <BackgroundCarousel />
      </div>
      <div className="fixed inset-0 bg-gradient-to-b from-black/30 via-black/55 to-black/30 pointer-events-none" />

      <div className="relative z-10 min-h-screen flex flex-col justify-between gap-8 px-6 md:px-12 pt-24 md:pt-28 pb-8 md:pb-10">
        <motion.h1
          className="text-[#DBFE02] leading-none flex flex-col items-start gap-1 md:gap-3 text-[clamp(2.5rem,8vw,7rem)]"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="block">{renderBouncingText(portfolioText, b1)}</span>
          <span className="block">{renderBouncingText(yearText, b2)}</span>
        </motion.h1>

        {/* 身份选择面板 */}
        <motion.div
          className="w-full max-w-5xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.35 }}
        >
          <p className="font-meta text-xs md:text-sm uppercase tracking-[0.25em] text-white/70 mb-4 text-center md:text-left">
            {t("splash.prompt")}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {LENSES.map((lens, i) => (
              <motion.button
                key={lens}
                onClick={() => choose(lens)}
                className="group relative text-left rounded-2xl border border-white/15 bg-black/55 backdrop-blur-md p-5 md:p-6 transition-colors duration-300 hover:bg-[#DBFE02] hover:border-[#DBFE02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#DBFE02] md:min-h-[200px] flex flex-col"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 + i * 0.08 }}
                whileTap={{ scale: 0.98 }}
                data-interactive="true"
              >
                <span className="font-meta text-xs text-white/45 group-hover:text-black/50 transition-colors">
                  0{i + 1}
                </span>
                <span
                  className="mt-3 md:mt-6 text-2xl md:text-[1.75rem] leading-tight text-white group-hover:text-black transition-colors pr-8"
                  style={{ fontWeight: 700 }}
                >
                  {t(`lens.${lens}`)}
                </span>
                <span className="mt-2 md:mt-auto md:pt-4 text-sm text-white/60 group-hover:text-black/70 transition-colors leading-relaxed pr-6">
                  {t(`lens.see.${lens}`)}
                </span>
                <span className="absolute top-5 right-5 text-white/60 group-hover:text-black transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1">
                  <ArrowUpRight size={22} />
                </span>
              </motion.button>
            ))}
          </div>
          <div className="mt-4 flex justify-center md:justify-start">
            <button
              onClick={() => choose("all")}
              className="group inline-flex items-center gap-2 px-2 py-1.5 text-white/60 hover:text-[#DBFE02] transition-colors"
              data-interactive="true"
            >
              {t("splash.browse")}
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </motion.div>

        <motion.h1
          className="text-[#DBFE02] leading-none flex flex-col items-end gap-1 md:gap-3 text-[clamp(2.5rem,8vw,7rem)]"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <span className="block">{renderBouncingText(firstNameText, b3)}</span>
          <span className="block">{renderBouncingText(lastNameText, b4)}</span>
        </motion.h1>
      </div>
    </motion.div>
  );
}
