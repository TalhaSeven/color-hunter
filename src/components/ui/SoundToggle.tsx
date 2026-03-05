"use client";

import { motion } from "framer-motion";

interface SoundToggleProps {
  enabled: boolean;
  onToggle: () => void;
}

export default function SoundToggle({ enabled, onToggle }: SoundToggleProps) {
  return (
    <motion.button
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3, delay: 0.5 }}
      onClick={onToggle}
      aria-label={enabled ? "Sound off" : "Sound on"}
      title={enabled ? "Sesi kapat" : "Ambiyans sesi aç"}
      className="fixed z-50 flex items-center justify-center rounded-full cursor-pointer"
      style={{
        bottom: 80,
        right: 20,
        width: 40,
        height: 40,
        background: enabled
          ? "rgba(201,168,76,0.15)"
          : "rgba(255,255,255,0.05)",
        border: enabled
          ? "1px solid rgba(201,168,76,0.4)"
          : "1px solid rgba(255,255,255,0.1)",
        color: enabled ? "var(--color-gold)" : "var(--color-text-dim)",
        fontSize: 18,
        transition: "all 0.3s",
      }}
      whileTap={{ scale: 0.9 }}
    >
      {enabled ? "♪" : "♩"}

      {/* Pulse ring when enabled */}
      {enabled && (
        <motion.span
          className="absolute inset-0 rounded-full"
          style={{
            border: "1px solid rgba(201,168,76,0.5)",
          }}
          animate={{ scale: [1, 1.6], opacity: [0.6, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeOut" }}
        />
      )}
    </motion.button>
  );
}
