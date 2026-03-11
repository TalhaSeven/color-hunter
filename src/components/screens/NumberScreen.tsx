"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";

interface NumberScreenProps {
  numbers: number[];
  accentColor: string;
  onSelect: (num: number) => void;
  onBack: () => void;
}

export default function NumberScreen({
  numbers,
  accentColor,
  onSelect,
  onBack,
}: NumberScreenProps) {
  const t = useTranslations("number");
  const prefersReduced = useReducedMotion();
  const [selected, setSelected] = useState<number | null>(null);

  const handleReveal = () => {
    if (selected !== null) onSelect(selected);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
      transition={{ duration: 1, ease: [0.19, 1, 0.22, 1] }}
      className="flex flex-col min-h-[100dvh] pt-24 pb-24 px-6 lg:px-20 relative z-10"
    >
      <div className="max-w-4xl mx-auto w-full h-full flex flex-col items-center">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.19, 1, 0.22, 1] }}
          className="mb-8 w-full shrink-0"
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="h-[1px] w-8" style={{ background: accentColor }} />
            <div className="screen-label font-bold !tracking-[8px]" style={{ color: accentColor }}>{t("stepLabel")}</div>
          </div>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <h2 className="screen-title text-left !text-4xl md:!text-6xl">{t("title")}</h2>
            
            <p
              className="text-left md:text-right max-w-xs"
              style={{
                fontSize: 14,
                color: "var(--color-text-dim)",
                fontFamily: "var(--font-cinzel)",
                letterSpacing: 1,
              }}
            >
              {t("hint")}
            </p>
          </div>
        </motion.div>

        {/* Scattered Constellation Layout */}
        <div className="flex-1 w-full flex items-center justify-center min-h-[45vh] relative py-10 mt-10 mb-10">
          {/* Subtle connection lines behind nodes */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.15]" style={{ stroke: accentColor, strokeWidth: 0.5 }}>
            <motion.path 
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 3, delay: 0.5, ease: "easeInOut" }}
              d="M 20% 40% Q 40% 20% 60% 30% T 80% 60% Q 60% 80% 30% 70% T 20% 40%" 
              fill="none" 
            />
          </svg>

          <div
            className="flex flex-wrap justify-center items-center relative z-10"
            style={{ gap: "2rem", maxWidth: 600 }}
          >
            {numbers.map((num, i) => {
              const isSelected = selected === num;
              // Irregular offsets to create scattered look
              const offsetY = i % 2 === 0 ? -30 : 30;
              const offsetX = i % 3 === 0 ? 15 : i % 3 === 1 ? -15 : 0;
              
              return (
                <motion.button
                  key={num}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ 
                    duration: 0.8, 
                    delay: 0.3 + i * 0.1, 
                    type: "spring", stiffness: 100 
                  }}
                  onClick={() => setSelected(num)}
                  aria-label={String(num)}
                  className="group relative flex items-center justify-center cursor-pointer overflow-hidden backdrop-blur-sm"
                  style={{
                    width: isSelected ? 90 : 76,
                    height: isSelected ? 90 : 76,
                    transform: `translate(${offsetX}px, ${offsetY}px)`,
                    clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)", // Hexagon shape
                    background: isSelected ? accentColor : "rgba(0,0,0,0.4)",
                    border: "none", // Using inner element for border due to clip-path
                    color: isSelected ? "#000" : "var(--color-text)",
                    transition: "all 0.5s cubic-bezier(0.19, 1, 0.22, 1)",
                    zIndex: isSelected ? 20 : 10,
                  }}
                >
                  {/* Hexagon Border */}
                  <div 
                    className="absolute inset-[1px] transition-colors duration-500" 
                    style={{ 
                      clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
                      background: isSelected ? accentColor : "var(--color-bg)",
                      border: "none"
                    }} 
                  />
                  
                  {/* Hexagon inner background glow */}
                  <div 
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{ 
                      background: `radial-gradient(circle at center, ${accentColor} 0%, transparent 70%)`,
                      mixBlendMode: "screen"
                    }}
                  />

                  {/* Number Content */}
                  <span 
                    className="relative z-10 transition-all duration-300"
                    style={{
                      fontFamily: "var(--font-cinzel)",
                      fontSize: 26,
                      fontWeight: 600,
                      color: isSelected ? "#000" : "var(--color-text)",
                      textShadow: isSelected ? "none" : `0 0 10px ${accentColor}`,
                    }}
                  >
                    {num}
                  </span>

                  {/* Selection Glow Ring behind Hexagon */}
                  {isSelected && (
                    <motion.div 
                      layoutId="selectedGlow"
                      className="absolute inset-[-20px] -z-10 blur-xl"
                      style={{ background: accentColor, opacity: 0.4 }}
                    />
                  )}
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* Navigation Actions */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-4 w-full flex justify-between items-center shrink-0"
        >
          <button
            onClick={onBack}
            className="group flex items-center gap-2 cursor-pointer"
            style={{
              padding: "14px 24px",
              background: "rgba(255,255,255,0.02)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderLeft: `2px solid ${accentColor}`,
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
            onClick={handleReveal}
            disabled={selected === null}
            className="btn-gold group"
            style={{ 
              borderColor: selected ? accentColor : "rgba(212, 175, 55, 0.4)"
            }}
          >
            <span className="flex items-center gap-3 relative z-10" style={{ color: selected ? "#fff" : "var(--color-gold-light)"}}>
              {t("continueButton")}
              <span className="transition-transform duration-300 group-hover:rotate-90">✧</span>
            </span>
            {selected && (
               <div 
                 className="absolute inset-0 opacity-30 transition-opacity duration-300 group-hover:opacity-50" 
                 style={{ background: accentColor }}
               />
            )}
          </button>
        </motion.div>
      </div>
    </motion.div>
  );
}
