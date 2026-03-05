"use client";

import { useCallback } from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { track } from "@vercel/analytics";
import { EsmaBase } from "@/types";

interface EsmaScreenProps {
  esma: EsmaBase;
  selectedColor: string;
  accentColor: string;
  moodName: string;
  moodEmoji: string;
  onReset: () => void;
}

export default function EsmaScreen({
  esma,
  selectedColor,
  accentColor,
  moodName,
  moodEmoji,
  onReset,
}: EsmaScreenProps) {
  const tEsma = useTranslations("esma");
  const tDetails = useTranslations("esmaDetails");
  const esmaColor = selectedColor || accentColor;

  const meaning = tDetails(`${esma.number}.meaning`);
  const tefekkur = tDetails(`${esma.number}.tefekkur`);

  const handleShare = useCallback(async () => {
    track("journey_shared", { esma_name: esma.name, esma_number: esma.number });
    const text = `✨ ${esma.name} — ${moodEmoji} ${moodName}\n"${meaning}"\n\n${tefekkur}\n\n— Color Hunter 🔍`;
    if (navigator.share) {
      try {
        await navigator.share({ title: `Color Hunter — ${esma.name}`, text });
      } catch {
        /* cancelled */
      }
    } else if (navigator.clipboard) {
      await navigator.clipboard.writeText(text);
      alert("Metin panoya kopyalandı!");
    }
  }, [esma.name, esma.number, meaning, tefekkur, moodEmoji, moodName]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
      className="flex flex-col items-center justify-center min-h-[100dvh] px-5 py-10 text-center"
      style={{ gap: 28 }}
    >
      {/* Mood badge */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="inline-flex items-center rounded-full"
        style={{
          gap: 8,
          padding: "8px 16px",
          fontSize: 13,
          border: "1px solid rgba(255,255,255,0.12)",
          background: "rgba(255,255,255,0.04)",
          color: "var(--color-text-dim)",
        }}
      >
        <div
          className="rounded-full"
          style={{ width: 8, height: 8, background: esmaColor }}
        />
        {moodEmoji} {moodName}
      </motion.div>

      {/* Esma circle */}
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
        className="flex flex-col items-center justify-center rounded-full mx-auto"
        style={
          {
            width: 180,
            height: 180,
            background: `radial-gradient(circle, ${esmaColor}22, ${esmaColor}08)`,
            border: `1.5px solid ${esmaColor}44`,
            animation: "pulse-glow 3s ease-in-out infinite",
            "--esma-color": esmaColor,
          } as React.CSSProperties
        }
      >
        <div
          style={{
            fontSize: 13,
            opacity: 0.6,
            letterSpacing: 2,
            marginBottom: 4,
            color: "var(--color-text)",
          }}
        >
          {tEsma("label", { number: esma.number })}
        </div>
        <span
          lang="ar"
          dir="rtl"
          aria-label={esma.name}
          style={{
            fontFamily: "var(--font-amiri)",
            fontSize: 36,
            lineHeight: 1.2,
            fontStyle: "italic",
            color: "var(--color-text)",
          }}
        >
          {esma.arabic}
        </span>
      </motion.div>

      {/* Esma name */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        style={{
          fontFamily: "var(--font-playfair)",
          fontSize: "clamp(24px, 6vw, 40px)",
          lineHeight: 1.2,
          background: "linear-gradient(135deg, #fff, var(--color-gold-light))",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
        }}
      >
        {esma.name}
      </motion.div>

      {/* Meaning */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        style={{
          fontSize: 17,
          color: "var(--color-text-dim)",
          fontStyle: "italic",
          fontFamily: "var(--font-amiri)",
        }}
      >
        {meaning}
      </motion.div>

      {/* Divider */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 0.55 }}
        style={{
          width: 60,
          height: 1,
          background: "var(--color-gold)",
          opacity: 0.4,
          margin: "4px auto",
        }}
      />

      {/* Tefekkür card */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.65 }}
        className="text-left"
        style={{
          maxWidth: 400,
          fontSize: 14,
          lineHeight: 1.9,
          color: "var(--color-text-dim)",
          background: "rgba(255,255,255,0.03)",
          border: "1px solid rgba(255,255,255,0.07)",
          borderRadius: 20,
          padding: "20px 24px",
        }}
      >
        <strong
          style={{
            color: "var(--color-gold)",
            display: "block",
            marginBottom: 6,
            fontSize: 11,
            letterSpacing: 2,
            textTransform: "uppercase" as const,
          }}
        >
          {tEsma("tefekkurTitle")}
        </strong>
        {tefekkur}
      </motion.div>

      {/* Action buttons */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="flex flex-wrap justify-center"
        style={{ gap: 12 }}
      >
        <button
          onClick={onReset}
          className="cursor-pointer"
          style={{
            padding: "13px 28px",
            background: "transparent",
            color: "var(--color-text)",
            border: "1.5px solid rgba(255,255,255,0.15)",
            borderRadius: 100,
            fontFamily: "var(--font-body)",
            fontSize: 14,
            transition: "all 0.2s",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = "rgba(255,255,255,0.35)";
            e.currentTarget.style.background = "rgba(255,255,255,0.05)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)";
            e.currentTarget.style.background = "transparent";
          }}
        >
          {tEsma("restartButton")}
        </button>
        <button
          onClick={handleShare}
          className="cursor-pointer"
          style={{
            padding: "13px 28px",
            background: "linear-gradient(135deg, var(--color-gold), #a07830)",
            color: "#0d0d0d",
            border: "none",
            borderRadius: 100,
            fontFamily: "var(--font-body)",
            fontSize: 14,
            fontWeight: 500,
            transition: "all 0.2s",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateY(-2px)";
            e.currentTarget.style.boxShadow = "0 8px 28px rgba(201,168,76,0.3)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow = "none";
          }}
        >
          {tEsma("shareButton")}
        </button>
      </motion.div>
    </motion.div>
  );
}
