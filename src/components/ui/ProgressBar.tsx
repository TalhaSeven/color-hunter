"use client";

import { motion } from "motion/react";
import { useTranslations } from "next-intl";

interface ProgressBarProps {
  currentStep: number;
}

export default function ProgressBar({ currentStep }: ProgressBarProps) {
  const t = useTranslations("navigation");
  const progress = currentStep * 25;

  return (
    <div
      className="fixed top-0 left-0 right-0"
      style={{ height: 2, background: "rgba(255,255,255,0.06)", zIndex: 100 }}
      role="progressbar"
      aria-valuenow={progress}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label={t("progressLabel", { percent: progress })}
    >
      <motion.div
        style={{
          height: "100%",
          background:
            "linear-gradient(90deg, var(--color-gold), var(--color-gold-light))",
        }}
        initial={{ width: "0%" }}
        animate={{ width: `${progress}%` }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      />
    </div>
  );
}
