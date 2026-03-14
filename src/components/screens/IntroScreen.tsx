"use client";

import { motion, useReducedMotion } from "motion/react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import JourneyHistory from "@/components/ui/JourneyHistory";
import type { JourneyRecord } from "@/hooks/useJourneyHistory";

interface IntroScreenProps {
  onStart: () => void;
  journeys: JourneyRecord[];
  onClearHistory: () => void;
}

export default function IntroScreen({
  onStart,
  journeys,
  onClearHistory,
}: IntroScreenProps) {
  const t = useTranslations("intro");
  const tPrivacy = useTranslations("privacy");
  const prefersReduced = useReducedMotion();
  const steps = [
    t("steps.mood"),
    t("steps.color"),
    t("steps.number"),
    t("steps.esma"),
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
      transition={{ duration: 1.2, ease: [0.19, 1, 0.22, 1] }}
      className="relative flex flex-col min-h-[100dvh] pt-32 pb-24 px-6 lg:px-20 z-10"
    >
      {/* Absolute decorative typography */}
      <motion.div
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 0.05, x: 0 }}
        transition={{ duration: 2, ease: "easeOut" }}
        className="absolute top-[5%] -left-[5%] pointer-events-none select-none whitespace-nowrap font-cinzel font-[800] leading-[0.8] text-gold text-[clamp(120px,30vw,300px)]"
      >
        HUNT
      </motion.div>

      <div className="relative z-10 max-w-4xl mx-auto w-full flex-1 flex flex-col justify-center my-auto">
        {/* Geometric compositional element instead of regular badge */}
        <motion.div
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.19, 1, 0.22, 1] }}
          className="origin-top mb-12 w-px h-20 bg-linear-to-b from-gold to-transparent"
        />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="screen-label mb-6 inline-block"
        >
          {t("badge")}
        </motion.div>

        {/* Ethereal Maximalist Title */}
        <motion.h1
          initial={{ opacity: 0, y: !prefersReduced ? 40 : 0 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5, ease: [0.19, 1, 0.22, 1] }}
          className="leading-[0.9] tracking-tighter flex flex-col font-cinzel text-[clamp(50px,12vw,110px)] font-medium -ml-1 drop-shadow-[0_20px_40px_rgba(0,0,0,0.5)]"
        >
          <div className="pb-2"><span className="text-gradient-gold">{t("title").split(" ")[0]}</span></div>
          <div className="pl-[8%]"><span className="text-metallic italic">{t("title").split(" ").slice(1).join(" ")}</span></div>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, filter: "blur(5px)" }}
          animate={{ opacity: 1, filter: "blur(0px)" }}
          transition={{ duration: 1, delay: 0.8, ease: "easeOut" }}
          className="mt-10 mb-14 max-w-[480px] text-base leading-[1.8] text-text-dim tracking-[0.2px]"
        >
          {t("description")}
        </motion.p>

        {/* Start Button & Steps Row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="flex flex-col sm:flex-row items-start sm:items-center gap-10"
        >
          <button
            onClick={onStart}
            className="btn-gold group relative ml-2.5"
          >
            <span className="relative z-10 flex items-center gap-3">
              {t("startButton")}
              <span className="transition-transform duration-300 group-hover:translate-x-2">→</span>
            </span>
          </button>

          {/* Minimal Steps indicator */}
          <div className="flex flex-col gap-2 border-l border-white/10 pl-5">
            {steps.map((label, idx) => (
              <div 
                key={label}
                className="flex items-center gap-3 text-xs tracking-[2px] uppercase text-text-muted"
              >
                <span className="text-gold-dark opacity-50">0{idx + 1}</span>
                {label}
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Journey History Area - in normal flow below content */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="relative z-10 max-w-md mt-10 px-6 lg:px-20"
      >
        <JourneyHistory journeys={journeys} onClear={onClearHistory} />
      </motion.div>

      {/* Privacy Policy link */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="relative z-10 mt-8 px-6 lg:px-20"
      >
        <Link
          href="/privacy"
          className="text-xs tracking-[1px] text-text-muted opacity-60 hover:opacity-100 transition-opacity duration-300"
        >
          {tPrivacy("title")}
        </Link>
      </motion.div>
    </motion.div>
  );
}
