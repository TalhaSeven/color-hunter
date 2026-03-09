"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";
import { ColorOption } from "@/types";

interface ColorScreenProps {
  colors: ColorOption[];
  accentColor: string;
  onSelect: (hex: string) => void;
}

export default function ColorScreen({ colors, onSelect }: ColorScreenProps) {
  const t = useTranslations("color");
  const prefersReduced = useReducedMotion();
  const [selected, setSelected] = useState<string | null>(null);

  const handleContinue = () => {
    if (selected) onSelect(selected);
  };

  const getColorName = (hex: string): string => {
    try {
      return t(`names.${hex}`);
    } catch {
      return hex;
    }
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

      <div
        className="flex flex-wrap justify-center"
        style={{ gap: 16, maxWidth: 500 }}
      >
        {colors.map((color, i) => {
          const isSelected = selected === color.hex;
          return (
            <motion.button
              key={color.hex}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.35, delay: i * 0.07 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setSelected(color.hex)}
              aria-label={getColorName(color.hex)}
              className="relative cursor-pointer shrink-0"
              style={{
                width: 72,
                height: 72,
                borderRadius: "50%",
                background: color.hex,
                border: isSelected
                  ? "3px solid white"
                  : "3px solid transparent",
                transition:
                  "transform 0.3s, box-shadow 0.3s, border-color 0.3s",
                transform: isSelected ? "scale(1.18)" : "scale(1)",
                boxShadow: isSelected ? `0 0 30px -4px ${color.hex}` : "none",
                color: color.hex,
              }}
              onMouseEnter={(e) => {
                if (!isSelected)
                  e.currentTarget.style.transform = "scale(1.12)";
              }}
              onMouseLeave={(e) => {
                if (!isSelected) e.currentTarget.style.transform = "scale(1)";
              }}
            >
              <span
                className="absolute left-1/2 whitespace-nowrap pointer-events-none"
                style={{
                  bottom: -22,
                  transform: "translateX(-50%)",
                  fontSize: 10,
                  color: "var(--color-text-dim)",
                  letterSpacing: 0.3,
                  opacity: isSelected ? 1 : 0,
                  transition: "opacity 0.2s",
                }}
              >
                {getColorName(color.hex)}
              </span>
            </motion.button>
          );
        })}
      </div>

      <div style={{ height: 4 }} />

      <button
        onClick={handleContinue}
        disabled={!selected}
        className="btn-gold"
      >
        {t("continueButton")}
      </button>
    </motion.div>
  );
}
