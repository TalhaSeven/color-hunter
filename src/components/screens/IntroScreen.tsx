"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";
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
  const prefersReduced = useReducedMotion();
  const steps = [
    t("steps.mood"),
    t("steps.color"),
    t("steps.number"),
    t("steps.esma"),
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: prefersReduced ? 0 : 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: prefersReduced ? 0 : -20 }}
      transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
      className="flex flex-col items-center justify-center min-h-dvh px-5 py-10 text-center"
      style={{ gap: "24px" }}
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="flex items-center justify-center rounded-full"
        style={{
          width: 80,
          height: 80,
          border: "1.5px solid var(--color-gold)",
          background: "rgba(201, 168, 76, 0.08)",
          fontSize: 32,
        }}
      >
        🔍
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.2 }}
        className="screen-label"
      >
        {t("badge")}
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.25 }}
        className="text-gradient-gold leading-[1.1]"
        style={{
          fontFamily: "var(--font-amiri)",
          fontSize: "clamp(36px, 8vw, 64px)",
        }}
      >
        {t("title")}
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.35 }}
        style={{
          maxWidth: 380,
          fontSize: 15,
          lineHeight: 1.8,
          color: "var(--color-text-dim)",
        }}
      >
        {t("description")}
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.45 }}
        className="flex flex-wrap justify-center"
        style={{ gap: 8, maxWidth: 440 }}
      >
        {steps.map((label) => (
          <span
            key={label}
            className="rounded-full"
            style={{
              background: "rgba(201, 168, 76, 0.1)",
              border: "1px solid rgba(201, 168, 76, 0.2)",
              padding: "6px 14px",
              fontSize: 12,
              color: "var(--color-gold)",
              letterSpacing: 0.5,
            }}
          >
            {label}
          </span>
        ))}
      </motion.div>

      <motion.button
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.55 }}
        whileTap={{ scale: 0.95 }}
        onClick={onStart}
        className="btn-gold cursor-pointer"
        style={{
          marginTop: 8,
          padding: "16px 48px",
          fontSize: 15,
          letterSpacing: 1,
          textTransform: "uppercase" as const,
        }}
      >
        {t("startButton")}
      </motion.button>

      {/* Journey History */}
      <JourneyHistory journeys={journeys} onClear={onClearHistory} />
    </motion.div>
  );
}
