import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import neuroDriveImage from "figma:asset/66ee4590d81c99021579070db57242a695c17d06.png";
import huiRobotImage from "figma:asset/5d0cc51ab0372a92718c2f4fceb73616ea5bce93.png";
import project3Image from "figma:asset/01bff6e7095856d511866bba62dc688b3f40335a.png";
import project4Image from "figma:asset/3b53c3ac521b779f6ab723325dd1aa64a9c376d6.png";
import otherWorkImage1 from "figma:asset/61a7259bb71be2d3cb9914090819b87ef392df6b.png";
import otherWorkImage2 from "figma:asset/a3bef07b5dc1325323c3efafb5d90113a9e7dbcd.png";
import { ContactDialog } from "./ContactDialog";
import { useLensT } from "./LensContext";
import { SpringText } from "./SpringText";
import { SOLUTION_PROJECTS, SOLUTION_ORDER, ProjectCover } from "./solutionProjects";
import { ResumeMenu } from "./ResumeMenu";
import { LensSegmented } from "./LensSwitch";
import { ArrowDown, ArrowUpRight } from "lucide-react";

interface Foundation {
  id: string;
  image: string;
  year: string;
  tagClass: string;
}

interface HomePageProps {
  onProjectClick: (projectId: string) => void;
  onNavigateToAbout?: () => void;
  onNavigateToContact?: () => void;
}

// 设计基础：StrideGuard → NeuroDrive → Hui → Skysafe
const FOUNDATIONS: Foundation[] = [
  { id: "project3", image: project3Image, year: "2024", tagClass: "bg-purple-200 text-purple-900" },
  { id: "neurodrive", image: neuroDriveImage, year: "2025", tagClass: "bg-[#DBFE02] text-black" },
  { id: "hui", image: huiRobotImage, year: "2025", tagClass: "bg-sky-200 text-sky-900" },
  { id: "project4", image: project4Image, year: "2024", tagClass: "bg-orange-300 text-orange-950" },
];

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -12 },
};

export function HomePage({ onProjectClick, onNavigateToAbout, onNavigateToContact }: HomePageProps) {
  const [isContactDialogOpen, setIsContactDialogOpen] = useState(false);
  const { t, tl, lens } = useLensT();
  const order = SOLUTION_ORDER[lens];

  return (
    <motion.div
      className="min-h-screen bg-black"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
    >
      {/* Hero */}
      <section className="relative px-6 md:px-12 lg:px-32 pt-32 md:pt-40 pb-16 md:pb-24 overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute -top-40 right-[-10%] w-[640px] h-[640px] rounded-full bg-[#DBFE02]/[0.07] blur-3xl"
        />
        <div className="relative max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-8 md:mb-10"
          >
            <div className="flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-2.5 rounded-xl border border-white/15 bg-white/[0.04] px-4 py-2 text-sm md:text-base text-white">
                <span className="relative flex w-2.5 h-2.5">
                  <span className="absolute inset-0 rounded-full bg-[#DBFE02] aq-breathe" />
                  <span className="relative w-2.5 h-2.5 rounded-full bg-[#DBFE02]" />
                </span>
                {tl("hero.status")}
              </span>
              <span className="font-meta text-xs md:text-sm text-white/50">{tl("hero.avail")}</span>
            </div>
            <LensSegmented />
          </motion.div>

          <AnimatePresence mode="wait">
            <motion.div key={lens} {...fadeUp} transition={{ duration: 0.45 }}>
              <h1
                className="text-white text-[2.6rem] leading-[1.03] sm:text-6xl md:text-7xl lg:text-[6rem] tracking-tight max-w-6xl"
                style={{ fontWeight: 700 }}
              >
                <SpringText text={tl("hero.title")} />
              </h1>
              <p className="mt-6 md:mt-8 max-w-2xl text-white/60 text-base md:text-xl leading-relaxed">
                {tl("hero.subtitle")}
              </p>
            </motion.div>
          </AnimatePresence>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mt-8 md:mt-10 flex flex-wrap gap-3"
          >
            <motion.button
              onClick={() => document.getElementById("works")?.scrollIntoView({ behavior: "smooth" })}
              className="inline-flex items-center gap-2 rounded-xl bg-[#DBFE02] px-6 md:px-7 py-3.5 text-black font-semibold text-base md:text-lg hover:bg-[#b8d402] transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              data-interactive="true"
            >
              {t("hero.viewWork")}
              <ArrowDown size={18} />
            </motion.button>
            <ResumeMenu variant="outline" />
          </motion.div>

          <dl className="mt-14 md:mt-20 grid grid-cols-1 sm:grid-cols-3 border-t border-white/10">
            {[1, 2, 3].map((n) => (
              <div
                key={n}
                className={`flex sm:flex-col items-baseline sm:items-start gap-4 sm:gap-2 py-5 sm:pt-6 sm:pb-0 border-b sm:border-b-0 border-white/10 ${
                  n > 1 ? "sm:border-l sm:pl-6 md:pl-8" : ""
                }`}
              >
                <dt className="order-2 font-meta text-xs md:text-sm text-white/50 leading-snug">{tl(`hero.stat${n}.label`)}</dt>
                <AnimatePresence mode="wait">
                  <motion.dd
                    key={`${lens}-v${n}`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3, delay: n * 0.05 }}
                    className="order-1 text-white text-3xl md:text-5xl tracking-tight whitespace-nowrap"
                    style={{ fontWeight: 700 }}
                  >
                    {tl(`hero.stat${n}.value`)}
                  </motion.dd>
                </AnimatePresence>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <div id="works">
        {/* Solutions in Practice */}
        <section className="px-6 md:px-12 lg:px-32 pt-12 md:pt-20 pb-12 md:pb-20">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8 md:mb-12">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-white mb-4" style={{ fontSize: "3.5rem", fontWeight: 700, lineHeight: 1.05 }}>
                  <SpringText text={t("home.solutions")} />
                </h2>
                <p className="text-white/60 text-base md:text-lg max-w-xl">{t("home.solutionsDesc")}</p>
              </motion.div>
              <span className="font-meta text-xs md:text-sm text-white/40">
                {t("nav.lens")} · {t(`lens.short.${lens}`)}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {order.map((id, index) => {
                const p = SOLUTION_PROJECTS[id];
                const planned = p.status === "planned";
                return (
                  <motion.div
                    key={id}
                    layout
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1, layout: { type: "spring", stiffness: 300, damping: 30 } }}
                    className={`group cursor-pointer flex flex-col ${planned ? "opacity-80 hover:opacity-100 transition-opacity" : ""}`}
                    onClick={() => onProjectClick(id)}
                    data-interactive="true"
                  >
                    <div className="relative rounded-2xl overflow-hidden mb-4">
                      <ProjectCover
                        project={p}
                        index={index}
                        className="aspect-[4/3] transition-transform duration-700 group-hover:scale-[1.03]"
                      />
                      <span className="absolute bottom-4 right-4 inline-flex items-center gap-1.5 rounded-xl bg-white text-black px-3 py-1.5 text-sm font-medium opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                        {planned ? t("card.status.planned") : t("card.preview")}
                        <ArrowUpRight size={14} />
                      </span>
                    </div>
                    {p.cover && (
                      <h3 className="text-white text-xl md:text-2xl mb-3" style={{ fontWeight: 700 }}>
                        {t(`project.${id}.title`)}
                      </h3>
                    )}
                    <div className="flex flex-wrap gap-2 mb-3">
                      {t(`project.${id}.category`)
                        .split(" & ")
                        .map((tag) => (
                          <span key={tag} className={`inline-block px-3 py-1 text-xs md:text-sm rounded-xl font-medium ${p.tagClass}`}>
                            {tag}
                          </span>
                        ))}
                    </div>
                    <p className="text-white/60 text-sm md:text-base leading-relaxed mb-4 flex-1">
                      {tl(`project.${id}.description`)}
                    </p>
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 border-t border-white/10 pt-3 font-meta text-xs text-white/60">
                      <span>
                        <span className="text-white/35">{t("card.role")}: </span>
                        {t(`project.${id}.role`)}
                      </span>
                      <span className={`ml-auto ${p.accentText}`}>{t(`project.${id}.period`)}</span>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Design Foundations */}
        <section className="px-6 md:px-12 lg:px-32 pt-12 md:pt-20 pb-12 md:pb-20">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-white mb-6" style={{ fontSize: "3.5rem", fontWeight: 700, lineHeight: 1.05 }}>
                <SpringText text={t("home.foundations")} />
              </h2>
            </motion.div>
            <motion.div
              className="w-24 h-1 bg-[#DBFE02] mb-6"
              initial={{ width: 0, opacity: 0 }}
              whileInView={{ width: 96, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            />
            <p className="text-white/60 text-base md:text-lg max-w-2xl mb-8 md:mb-14">{t("home.foundationsDesc")}</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-12">
              {FOUNDATIONS.map((f, index) => (
                <motion.div
                  key={f.id}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: (index % 2) * 0.1 }}
                  className="group cursor-pointer flex flex-col"
                  onClick={() => onProjectClick(f.id)}
                  data-interactive="true"
                >
                  <div className="relative overflow-hidden bg-zinc-900 rounded-2xl aspect-[16/10] mb-4">
                    <img
                      src={f.image}
                      alt={t(`project.${f.id}.title`)}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <span className="text-white px-6 py-3 border-2 border-white rounded-xl text-sm md:text-base">
                        {t("button.viewProject")}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between gap-4 mb-2">
                    <h3 className="text-white text-lg md:text-2xl flex-1 min-w-0">{t(`project.${f.id}.title`)}</h3>
                    <span className="font-meta text-xs md:text-sm text-white/50 flex-shrink-0">{f.year}</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {t(`project.${f.id}.category`)
                      .split(" & ")
                      .map((tag) => (
                        <span key={tag} className={`inline-block px-3 py-1 text-xs rounded-xl font-medium ${f.tagClass}`}>
                          {tag}
                        </span>
                      ))}
                  </div>
                  <dl className="space-y-2 border-t border-white/10 pt-3 text-sm md:text-base">
                    {[
                      { label: "card.need", key: "description" },
                      { label: "card.solution", key: "decision" },
                    ].map((row) => (
                      <div key={row.key} className="grid grid-cols-[5.5rem_1fr] gap-3">
                        <dt className="font-meta text-[11px] uppercase tracking-wider text-white/40 pt-1">{t(row.label)}</dt>
                        <dd className="text-white/75">{t(`project.${f.id}.${row.key}`)}</dd>
                      </div>
                    ))}
                    <div className="grid grid-cols-[5.5rem_1fr] gap-3 items-center">
                      <dt className="font-meta text-[11px] uppercase tracking-wider text-white/40">{t("card.validation")}</dt>
                      <dd>
                        <span className="inline-flex rounded-xl border border-white/20 px-2.5 py-1 font-meta text-xs text-white/80">
                          {t(`project.${f.id}.outcome`)}
                        </span>
                      </dd>
                    </div>
                  </dl>
                </motion.div>
              ))}
            </div>

            {/* Other Work */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mt-12 md:mt-16"
            >
              <div className="bg-zinc-900 rounded-2xl overflow-hidden mb-4">
                <img src={otherWorkImage1} alt="Other Work - Part 1" className="w-full h-auto object-cover" />
                <img src={otherWorkImage2} alt="Other Work - Part 2" className="w-full h-auto object-cover" />
              </div>
              <div className="flex items-center justify-between gap-4 mb-2">
                <h3 className="text-white text-lg md:text-2xl flex-1 min-w-0">{t("project.otherwork.title")}</h3>
                <span className="font-meta text-xs md:text-sm text-white/50 flex-shrink-0">2023–2024</span>
              </div>
              <p className="text-white/60 text-sm md:text-base max-w-3xl">{t("project.otherwork.description")}</p>
            </motion.div>
          </div>
        </section>
      </div>

      {/* About preview */}
      <section id="about" className="px-6 md:px-12 lg:px-32 py-12 md:py-20 bg-zinc-900">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 md:mb-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-white text-3xl md:text-4xl" style={{ fontWeight: 700 }}>
                <SpringText text={t("home.aboutMe")} />
              </h2>
            </motion.div>
            <motion.button
              onClick={onNavigateToAbout}
              className="text-[#DBFE02] hover:text-[#b8d402] transition-colors flex items-center gap-2 group text-base md:text-lg"
              whileHover={{ x: 5 }}
              data-interactive="true"
            >
              <span>{t("home.learnMore")}</span>
              <ArrowUpRight size={18} />
            </motion.button>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-4 text-white/70 text-base md:text-lg leading-relaxed"
          >
            <p>{t("home.aboutIntro")}</p>
            <p>{t("home.aboutIntro2")}</p>
          </motion.div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="px-6 md:px-12 lg:px-32 py-12 md:py-20">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-white mb-6 md:mb-8 text-3xl md:text-4xl" style={{ fontWeight: 700 }}>
              <SpringText text={t("home.letsConnect")} />
            </h2>
          </motion.div>
          <p className="text-white/60 mb-6 md:mb-8 text-base md:text-lg">{t("home.contactDescription")}</p>
          <motion.button
            onClick={onNavigateToContact}
            className="inline-block text-[#DBFE02] border-2 border-[#DBFE02] px-6 md:px-8 py-3 md:py-4 rounded-xl hover:bg-[#DBFE02] hover:text-black transition-all duration-300 text-base md:text-lg"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            data-interactive="true"
          >
            {t("home.getInTouch")}
          </motion.button>
        </div>
      </section>

      <ContactDialog open={isContactDialogOpen} onOpenChange={setIsContactDialogOpen} />
    </motion.div>
  );
}
