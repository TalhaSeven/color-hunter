"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
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
  const prefersReduced = useReducedMotion();
  const [copied, setCopied] = useState(false);
  const esmaColor = selectedColor || accentColor;

  const meaning = tDetails(`${esma.number}.meaning`);
  const tefekkur = tDetails(`${esma.number}.tefekkur`);

  const handleShare = async () => {
    track("journey_shared", { esma_name: esma.name, esma_number: esma.number });
    const shareUrl = "https://innerhunt.com";
    const shareText = `✨ ${esma.name} — ${moodEmoji} ${moodName}\n"${meaning}"\n\n${tefekkur}\n\n📿 Zikir: ${esma.dhikrCount} defa`;
    const shareTitle = `Inner Hunt — ${esma.name}`;
    const copyText = `${shareText}\n\n— Inner Hunt 🔍\n${shareUrl}`;

    // Try native share first (mobile browsers, requires HTTPS)
    if (window.isSecureContext && navigator.share) {
      const shareData: ShareData = { title: shareTitle, text: shareText, url: shareUrl };
      try {
        if (!navigator.canShare || navigator.canShare(shareData)) {
          await navigator.share(shareData);
          return;
        }
      } catch {
        /* user cancelled or share failed, fall through to clipboard */
      }
    }

    // Try clipboard API
    try {
      await navigator.clipboard.writeText(copyText);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
      return;
    } catch {
      /* clipboard API failed (e.g. no HTTPS), try fallback */
    }

    // Legacy fallback using textarea + execCommand
    try {
      const textarea = document.createElement("textarea");
      textarea.value = copyText;
      textarea.style.position = "fixed";
      textarea.style.opacity = "0";
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      /* all methods failed */
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.5, ease: [0.19, 1, 0.22, 1] }}
      className="flex flex-col relative min-h-[100dvh] pt-24 pb-24 px-6 lg:px-20 z-10 overflow-x-hidden"
    >
      <div className="max-w-5xl mx-auto w-full h-full flex flex-col relative z-20">
        
        {/* Top Context Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 1, ease: [0.19, 1, 0.22, 1] }}
          className="flex justify-center mb-10"
        >
          <div className="inline-flex items-center gap-3 px-5 py-2" style={{ borderBottom: `1px solid ${esmaColor}40` }}>
            <span style={{ fontSize: 16 }}>{moodEmoji}</span>
            <span style={{ fontFamily: "var(--font-cinzel)", letterSpacing: 2, fontSize: 12, color: "var(--color-text-dim)", textTransform: "uppercase" }}>
              {moodName}
            </span>
            <div className="w-[1px] h-3 bg-white/20 mx-2" />
            <div style={{ width: 8, height: 8, background: esmaColor, borderRadius: '50%', boxShadow: `0 0 10px ${esmaColor}` }} />
          </div>
        </motion.div>

        {/* Ethereal Esma Reveal */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-16 lg:gap-8 my-10 lg:my-auto">
          
          {/* Left Side: The Name & Arabic */}
          <div className="flex-1 flex flex-col items-center lg:items-start text-center lg:text-left relative w-full">
            {/* Massive Ambient Number */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 0.03, scale: 1 }}
              transition={{ delay: 0.2, duration: 2, ease: "easeOut" }}
              className="absolute -top-20 -left-10 pointer-events-none select-none"
              style={{
                fontFamily: "var(--font-cinzel)",
                fontSize: "clamp(200px, 40vw, 400px)",
                fontWeight: 800,
                lineHeight: 0.7,
                color: esmaColor,
              }}
            >
              {esma.number}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, filter: "blur(10px)", x: -20 }}
              animate={{ opacity: 1, filter: "blur(0px)", x: 0 }}
              transition={{ delay: 0.6, duration: 1.5, ease: [0.19, 1, 0.22, 1] }}
              className="relative z-10"
            >
              {/* Geometric Label */}
              <div 
                className="mb-8"
                style={{
                  fontFamily: "var(--font-outfit)",
                  fontSize: 11,
                  letterSpacing: "8px",
                  color: esmaColor,
                  textTransform: "uppercase",
                }}
              >
                {tEsma("label", { number: esma.number })}
              </div>

              {/* Colossal Arabic Text */}
              <div
                lang="ar"
                dir="rtl"
                aria-label={esma.name}
                className="mb-4"
                style={{
                  fontFamily: "var(--font-amiri)",
                  fontSize: "clamp(70px, 12vw, 140px)",
                  lineHeight: 1.2,
                  color: "#fff",
                  textShadow: `0 0 40px ${esmaColor}50, 0 10px 20px rgba(0,0,0,0.8)`,
                  marginTop: 30, 
                }}
              >
                {esma.arabic}
              </div>

              {/* Latin Name */}
              <h1
                style={{
                  fontFamily: "var(--font-cinzel)",
                  fontSize: "clamp(40px, 8vw, 80px)",
                  fontWeight: 600,
                  letterSpacing: "-1px",
                  lineHeight: 1.1,
                  background: `linear-gradient(135deg, #fff 0%, ${esmaColor} 100%)`,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                {esma.name}
              </h1>

              {/* Decorative Divider */}
              <div className="flex items-center gap-4 mt-12 mb-8 justify-center lg:justify-start">
                <div className="h-[1px] w-24" style={{ background: `linear-gradient(90deg, transparent, ${esmaColor}80)` }} />
                <div className="w-2 h-2 rotate-45" style={{ background: esmaColor }} />
                <div className="h-[1px] w-24" style={{ background: `linear-gradient(270deg, transparent, ${esmaColor}80)` }} />
              </div>

              {/* Meaning */}
              <p
                className="max-w-xl mx-auto lg:mx-0"
                style={{
                  fontFamily: "var(--font-cinzel)",
                  fontSize: "clamp(18px, 3vw, 24px)",
                  color: "var(--color-text)",
                  lineHeight: 1.6,
                  textShadow: "0 2px 10px rgba(0,0,0,0.5)",
                }}
              >
                {meaning}
              </p>
            </motion.div>
          </div>

          {/* Right Side: Tefekkür & Meta */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 1.2, ease: [0.19, 1, 0.22, 1] }}
            className="flex-1 w-full max-w-lg relative flex flex-col gap-6"
          >
            {/* Tefekkür Card - Glassmorphism architecture */}
            <div
              className="relative overflow-hidden backdrop-blur-xl"
              style={{
                background: "linear-gradient(145deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.01) 100%)",
                border: "1px solid rgba(255,255,255,0.05)",
                borderTop: `1px solid ${esmaColor}40`,
                padding: "40px",
              }}
            >
              {/* Corner Accents */}
              <div className="absolute top-0 left-0 w-2 h-2" style={{ borderTop: `1px solid ${esmaColor}`, borderLeft: `1px solid ${esmaColor}`}} />
              <div className="absolute top-0 right-0 w-2 h-2" style={{ borderTop: `1px solid ${esmaColor}`, borderRight: `1px solid ${esmaColor}`}} />
              <div className="absolute bottom-0 left-0 w-2 h-2" style={{ borderBottom: `1px solid ${esmaColor}`, borderLeft: `1px solid ${esmaColor}`}} />
              <div className="absolute bottom-0 right-0 w-2 h-2" style={{ borderBottom: `1px solid ${esmaColor}`, borderRight: `1px solid ${esmaColor}`}} />

              <h3
                className="mb-6 flex items-center gap-3"
                style={{
                  fontFamily: "var(--font-cinzel)",
                  fontSize: 14,
                  letterSpacing: "4px",
                  color: esmaColor,
                  textTransform: "uppercase",
                }}
              >
                <span className="w-1.5 h-1.5 rounded-full" style={{ background: esmaColor }} />
                {tEsma("tefekkurTitle")}
              </h3>
              
              <div
                style={{
                  fontSize: 15,
                  lineHeight: 1.9,
                  color: "var(--color-text-dim)",
                  letterSpacing: "0.2px",
                }}
              >
                {tefekkur}
              </div>
            </div>

            {/* Dhikr Count Plaque */}
            <div
              className="flex items-center justify-between px-8 py-5 backdrop-blur-xl"
              style={{
                background: "rgba(0,0,0,0.4)",
                border: "1px solid rgba(255,255,255,0.03)",
                borderLeft: `2px solid ${esmaColor}`,
              }}
            >
              <div style={{ fontFamily: "var(--font-cinzel)", fontSize: 11, letterSpacing: 4, color: "var(--color-text-dim)", textTransform: "uppercase" }}>
                {tEsma("dhikrLabel")}
              </div>
              <div className="flex items-baseline gap-2">
                <span style={{ fontFamily: "var(--font-cinzel)", fontSize: 28, fontWeight: 600, color: "#fff" }}>
                  {esma.dhikrCount}
                </span>
                <span style={{ fontSize: 11, color: "var(--color-text-muted)" }}>{tEsma("dhikrUnit")}</span>
              </div>
            </div>

            {/* Actions Array */}
            <div className="flex flex-col sm:flex-row gap-4 mt-4">
              <button
                onClick={handleShare}
                className="flex-1 btn-gold group flex justify-center items-center gap-3"
                style={{ padding: "16px 24px", borderColor: esmaColor, color: "#fff", background: `linear-gradient(90deg, transparent, ${esmaColor}10)` }}
              >
                <span>{copied ? tEsma("copiedButton") : tEsma("shareButton")}</span>
                {!copied && <span className="transition-transform group-hover:scale-125">↑</span>}
              </button>
              
              <button
                onClick={onReset}
                className="flex-1 relative overflow-hidden group flex justify-center items-center"
                style={{
                  padding: "16px 24px",
                  background: "transparent",
                  color: "var(--color-text-dim)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  fontFamily: "var(--font-cinzel)",
                  fontSize: 15,
                  fontWeight: 600,
                  letterSpacing: 2,
                  transition: "all 0.3s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = "#fff";
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.3)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = "var(--color-text-dim)";
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)";
                }}
              >
                <div className="absolute inset-0 bg-white/5 translate-y-[100%] transition-transform duration-300 group-hover:translate-y-0" />
                <span className="relative z-10">{tEsma("restartButton")}</span>
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
