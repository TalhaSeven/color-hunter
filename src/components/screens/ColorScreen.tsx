"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";
import { ColorOption } from "@/types";

interface ColorScreenProps {
  colors: ColorOption[];
  accentColor: string;
  onSelect: (hex: string) => void;
  onBack: () => void;
}

export default function ColorScreen({ colors, accentColor, onSelect, onBack }: ColorScreenProps) {
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
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
      transition={{ duration: 1, ease: [0.19, 1, 0.22, 1] }}
      className="flex flex-col min-h-[100dvh] pt-24 pb-24 px-6 lg:px-20 relative z-10"
    >
      <div className="max-w-4xl mx-auto w-full h-full flex flex-col">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.19, 1, 0.22, 1] }}
          className="mb-16 shrink-0"
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="h-[1px] w-8" style={{ background: accentColor }} />
            <div className="screen-label font-bold !tracking-[8px]" style={{ color: accentColor }}>{t("stepLabel")}</div>
          </div>
          <h2 className="screen-title text-left !text-4xl md:!text-6xl">{t("title")}</h2>
        </motion.div>

        {/* Ambient Splints / Color Strips */}
        <div className="flex-1 flex flex-col gap-3 min-h-[40vh] max-h-[60vh]">
          {colors.map((color, i) => {
            const isSelected = selected === color.hex;
            const notSelectedButActive = selected !== null && !isSelected;
            
            return (
              <motion.button
                key={color.hex}
                initial={{ opacity: 0, scaleX: 0.8 }}
                animate={{ 
                  opacity: notSelectedButActive ? 0.3 : 1, 
                  scaleX: 1,
                  flexGrow: isSelected ? 3 : 1 
                }}
                transition={{ duration: 0.6, delay: i * 0.1, ease: [0.19, 1, 0.22, 1] }}
                onClick={() => setSelected(color.hex)}
                aria-label={getColorName(color.hex)}
                className="group relative cursor-pointer w-full overflow-hidden text-left"
                style={{
                  background: color.hex,
                  transformOrigin: i % 2 === 0 ? "left" : "right"
                }}
              >
                {/* Inner shadow/vignette for depth */}
                <div 
                  className="absolute inset-0 opacity-40 mix-blend-multiply bg-linear-to-r from-black/80 via-transparent to-black/80"
                />
                
                {/* Active glow */}
                <div 
                  className="absolute inset-0 transition-opacity duration-700" 
                  style={{ 
                    background: `linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)`,
                    opacity: isSelected ? 1 : 0 
                  }}
                />

                {/* Color Name Typography */}
                <div className="relative z-10 h-full flex items-center px-8 lg:px-16 mix-blend-exclusion">
                  <span
                    className={`font-cinzel text-white tracking-[4px] uppercase transition-all duration-600 ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:opacity-100 group-hover:tracking-[6px] ${isSelected ? 'text-[clamp(24px,4vw,40px)] opacity-100' : 'text-[clamp(16px,2vw,24px)] opacity-60'}`}
                  >
                    {getColorName(color.hex)}
                  </span>
                </div>
              </motion.button>
            );
          })}
        </div>
        
        {/* Navigation Actions */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-16 flex justify-between items-center shrink-0"
        >
          <button
            onClick={onBack}
            className="group flex items-center gap-2 cursor-pointer px-6 py-3.5 bg-white/[0.02] border border-white/[0.08] text-text-dim font-cinzel text-[13px] tracking-[2px] uppercase transition-all duration-300 ease-[cubic-bezier(0.19,1,0.22,1)] hover:bg-white/[0.06] hover:text-text"
            style={{ borderLeft: `2px solid ${accentColor}` }}
          >
            ← {t("backButton")}
          </button>
          <button
            onClick={handleContinue}
            disabled={!selected}
            className="btn-gold group"
            style={{ 
              borderColor: selected ? selected : "rgba(212, 175, 55, 0.4)",
              color: selected ? "#fff" : "var(--color-gold-light)"
            }}
          >
            <span className="flex items-center gap-3 relative z-10">
              {t("continueButton")}
              <span className="transition-transform duration-300 group-hover:translate-x-2">→</span>
            </span>
            {selected && (
               <div 
                 className="absolute inset-0 opacity-20 transition-opacity duration-300 group-hover:opacity-40" 
                 style={{ background: selected }}
               />
            )}
          </button>
        </motion.div>
      </div>
    </motion.div>
  );
}
