"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Mood } from "@/types";
import { moods } from "@/data/moods";

interface MoodScreenProps {
  onSelect: (moodId: "A" | "B" | "C" | "D") => void;
}

export default function MoodScreen({ onSelect }: MoodScreenProps) {
  const t = useTranslations("mood");
  const [selected, setSelected] = useState<string | null>(null);

  const handleContinue = () => {
    if (selected) onSelect(selected as "A" | "B" | "C" | "D");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
      className="flex flex-col items-center justify-center min-h-[100dvh] px-5 py-10"
      style={{ gap: 28 }}
    >
      <div className="screen-label">{t("stepLabel")}</div>
      <h2 className="screen-title">{t("title")}</h2>

      <div
        className="grid mood-grid-responsive w-full"
        style={{ gridTemplateColumns: "1fr 1fr", gap: 14, maxWidth: 480 }}
      >
        {moods.map((mood: Mood, i: number) => {
          const isSelected = selected === mood.id;
          return (
            <motion.button
              key={mood.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setSelected(mood.id)}
              aria-label={t(`moods.${mood.id}.name`)}
              className="text-left cursor-pointer relative overflow-hidden"
              style={{
                background: "rgba(255,255,255,0.03)",
                border: isSelected
                  ? `1px solid ${mood.accentColor}`
                  : "1px solid rgba(255,255,255,0.08)",
                borderRadius: 20,
                padding: "24px 18px",
                transition: "all 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
                boxShadow: isSelected
                  ? `0 0 30px -5px ${mood.accentColor}`
                  : "none",
              }}
              onMouseEnter={(e) => {
                if (!isSelected) {
                  e.currentTarget.style.transform = "translateY(-3px)";
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.18)";
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                if (!isSelected)
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
              }}
            >
              <div style={{ fontSize: 32, marginBottom: 10 }}>{mood.emoji}</div>
              <div
                style={{
                  fontFamily: "var(--font-playfair)",
                  fontSize: 15,
                  marginBottom: 4,
                  color: "var(--color-text)",
                }}
              >
                {t(`moods.${mood.id}.name`)}
              </div>
              <div
                style={{
                  fontSize: 11,
                  color: "var(--color-text-dim)",
                  lineHeight: 1.6,
                }}
              >
                {t(`moods.${mood.id}.tags`)}
              </div>
              <div className="flex flex-wrap" style={{ gap: 5, marginTop: 12 }}>
                {mood.colors.map((c) => (
                  <div
                    key={c.hex}
                    className="rounded-full shrink-0"
                    style={{ width: 14, height: 14, backgroundColor: c.hex }}
                  />
                ))}
              </div>
            </motion.button>
          );
        })}
      </div>

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
