"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Mood } from "@/types";
import { moods } from "@/data/moods";
import type { MoodId } from "@/data/quizData";

interface MoodScreenProps {
  onSelect: (moodId: MoodId) => void;
  onBack: () => void;
}

export default function MoodScreen({ onSelect, onBack }: MoodScreenProps) {
  const t = useTranslations("mood");
  const prefersReduced = useReducedMotion();
  const [selected, setSelected] = useState<MoodId | null>(null);

  const handleContinue = () => {
    if (selected) onSelect(selected);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
      transition={{ duration: 1, ease: [0.19, 1, 0.22, 1] }}
      className="flex flex-col min-h-[100dvh] pt-24 pb-24 px-6 lg:px-20 relative z-10"
    >
      <div className="max-w-4xl mx-auto w-full">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.19, 1, 0.22, 1] }}
          className="mb-16"
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="h-[1px] w-8 bg-white/20" />
            <div className="screen-label font-bold !tracking-[8px]">{t("stepLabel")}</div>
          </div>
          <h2 className="screen-title text-left !text-4xl md:!text-6xl">{t("title")}</h2>
        </motion.div>

        {/* Masonry/Staggered List Layout */}
        <div className="flex flex-col gap-6 max-w-2xl relative">
          {moods.map((mood: Mood, i: number) => {
            const isSelected = selected === mood.id;
            const alignmentOffset = i % 2 === 0 ? "mr-auto" : "ml-auto"; // Stagger effect

            return (
              <motion.button
                key={mood.id}
                initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 + i * 0.1, ease: [0.19, 1, 0.22, 1] }}
                onClick={() => setSelected(mood.id)}
                aria-label={t(`moods.${mood.id}.name`)}
                className={`group text-left cursor-pointer relative overflow-hidden backdrop-blur-md w-full sm:w-[85%] ${alignmentOffset}`}
                style={{
                  background: isSelected ? "rgba(255,255,255,0.06)" : "rgba(255,255,255,0.015)",
                  border: "1px solid",
                  borderColor: isSelected ? mood.accentColor : "rgba(255,255,255,0.05)",
                  padding: "32px 40px",
                  transition: "all 0.5s cubic-bezier(0.19, 1, 0.22, 1)",
                  boxShadow: isSelected ? `0 0 60px -15px ${mood.accentColor}` : "none",
                }}
                onMouseEnter={(e) => {
                  if (!isSelected) {
                    e.currentTarget.style.borderColor = "rgba(255,255,255,0.3)";
                    e.currentTarget.style.background = "rgba(255,255,255,0.03)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isSelected) {
                    e.currentTarget.style.borderColor = "rgba(255,255,255,0.05)";
                    e.currentTarget.style.background = "rgba(255,255,255,0.015)";
                  }
                }}
              >
                {/* Massive bleeding background Emoji */}
                <div 
                  className="absolute -right-6 -bottom-10 opacity-[0.03] select-none pointer-events-none transition-all duration-700 ease-out group-hover:scale-110 group-hover:opacity-[0.08]"
                  style={{
                    fontSize: "200px",
                    lineHeight: 1,
                    filter: "grayscale(100%)",
                    transformOrigin: "bottom right",
                  }}
                >
                  {mood.emoji}
                </div>

                {/* Left accent bar on selection */}
                <div 
                  className="absolute left-0 top-0 bottom-0 w-[4px] transition-all duration-500"
                  style={{ 
                    background: mood.accentColor,
                    transform: isSelected ? "scaleY(1)" : "scaleY(0)",
                    transformOrigin: "center"
                  }}
                />

                <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div>
                    <div className="flex items-center gap-4 mb-2">
                       <span style={{ fontSize: 24 }}>{mood.emoji}</span>
                       <div style={{ fontFamily: "var(--font-cinzel)", fontSize: 22, fontWeight: 500, letterSpacing: "1px", color: isSelected ? "#fff" : "var(--color-text)" }}>
                         {t(`moods.${mood.id}.name`)}
                       </div>
                    </div>
                    
                    <div style={{ fontSize: 13, color: "var(--color-text-dim)", lineHeight: 1.6, letterSpacing: "0.5px" }}>
                      {t(`moods.${mood.id}.tags`)}
                    </div>
                  </div>

                  {/* Colors palette showcase */}
                  <div className="flex gap-2 shrink-0">
                    {mood.colors.map((c, idx) => (
                      <div
                        key={c.hex}
                        className="transition-transform duration-300 group-hover:scale-110"
                        style={{ 
                          width: 12, 
                          height: 32, 
                          backgroundColor: c.hex,
                          borderRadius: "100px",
                          transform: `translateY(${idx % 2 === 0 ? '4px' : '-4px'})`
                        }}
                      />
                    ))}
                  </div>
                </div>
              </motion.button>
            );
          })}
        </div>
        
        {/* Navigation Actions */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-20 flex justify-between items-center"
        >
          <button
            onClick={onBack}
            className="group flex items-center gap-2 cursor-pointer"
            style={{
              padding: "14px 24px",
              background: "rgba(255,255,255,0.02)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderLeft: "2px solid var(--color-gold)",
              color: "var(--color-text-dim)",
              fontFamily: "var(--font-cinzel)",
              fontSize: 13,
              letterSpacing: 2,
              textTransform: "uppercase" as const,
              transition: "all 0.3s cubic-bezier(0.19, 1, 0.22, 1)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(255,255,255,0.06)";
              e.currentTarget.style.color = "var(--color-text)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "rgba(255,255,255,0.02)";
              e.currentTarget.style.color = "var(--color-text-dim)";
            }}
          >
            ← {t("backButton")}
          </button>
          <button
            onClick={handleContinue}
            disabled={!selected}
            className="btn-gold group"
          >
            <span className="flex items-center gap-3">
              {t("continueButton")}
              <span className="transition-transform duration-300 group-hover:translate-x-2">→</span>
            </span>
          </button>
        </motion.div>
      </div>
    </motion.div>
  );
}
