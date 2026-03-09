"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";

interface NumberScreenProps {
  numbers: number[];
  accentColor: string;
  onSelect: (num: number) => void;
}

export default function NumberScreen({
  numbers,
  accentColor,
  onSelect,
}: NumberScreenProps) {
  const t = useTranslations("number");
  const prefersReduced = useReducedMotion();
  const [selected, setSelected] = useState<number | null>(null);

  const handleReveal = () => {
    if (selected !== null) onSelect(selected);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: prefersReduced ? 0 : 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: prefersReduced ? 0 : -20 }}
      transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
      className="flex flex-col items-center justify-center min-h-[100dvh] px-5 py-10"
      style={{ gap: 28 }}
    >
      <div className="screen-label">{t("stepLabel")}</div>
      <h2 className="screen-title">{t("title")}</h2>

      <p
        className="text-center"
        style={{
          fontSize: 13,
          color: "var(--color-text-dim)",
          fontStyle: "italic",
          marginTop: -12,
        }}
      >
        {t("hint")}
      </p>

      <div
        className="flex flex-wrap justify-center"
        style={{ gap: 12, maxWidth: 480 }}
      >
        {numbers.map((num, i) => {
          const isSelected = selected === num;
          return (
            <motion.button
              key={num}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.35, delay: i * 0.06 }}
              onClick={() => setSelected(num)}
              aria-label={String(num)}
              className="flex items-center justify-center rounded-full cursor-pointer"
              style={{
                width: 68,
                height: 68,
                fontFamily: "var(--font-amiri)",
                fontSize: 22,
                background: isSelected ? accentColor : "rgba(255,255,255,0.04)",
                border: isSelected
                  ? `1.5px solid ${accentColor}`
                  : "1.5px solid rgba(255,255,255,0.1)",
                color: isSelected ? "#0d0d0d" : "var(--color-text)",
                transition: "all 0.3s",
                transform: isSelected ? "scale(1.12)" : "scale(1)",
                boxShadow: isSelected ? `0 0 24px -4px ${accentColor}` : "none",
              }}
              onMouseEnter={(e) => {
                if (!isSelected) {
                  e.currentTarget.style.background = "rgba(255,255,255,0.09)";
                  e.currentTarget.style.borderColor = accentColor;
                  e.currentTarget.style.color = accentColor;
                  e.currentTarget.style.transform = "scale(1.08)";
                }
              }}
              onMouseLeave={(e) => {
                if (!isSelected) {
                  e.currentTarget.style.background = "rgba(255,255,255,0.04)";
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)";
                  e.currentTarget.style.color = "var(--color-text)";
                  e.currentTarget.style.transform = "scale(1)";
                }
              }}
            >
              {num}
            </motion.button>
          );
        })}
      </div>

      <button
        onClick={handleReveal}
        disabled={selected === null}
        className="btn-gold"
      >
        {t("continueButton")}
      </button>
    </motion.div>
  );
}
