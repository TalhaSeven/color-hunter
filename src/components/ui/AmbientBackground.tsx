"use client";

import { motion } from "framer-motion";

interface AmbientBackgroundProps {
  accentColor: string;
}

export default function AmbientBackground({
  accentColor,
}: AmbientBackgroundProps) {
  return (
    <div
      className="fixed inset-0 overflow-hidden pointer-events-none"
      style={{ zIndex: 0 }}
    >
      {/* Ambient blob 1 — top-left */}
      <motion.div
        className="absolute rounded-full"
        animate={{ backgroundColor: accentColor }}
        transition={{ duration: 2, ease: "easeInOut" }}
        style={{
          width: 600,
          height: 600,
          top: -200,
          left: -200,
          filter: "blur(120px)",
          opacity: 0.12,
        }}
      />

      {/* Ambient blob 2 — bottom-right */}
      <motion.div
        className="absolute rounded-full"
        animate={{ backgroundColor: accentColor }}
        transition={{ duration: 2, ease: "easeInOut" }}
        style={{
          width: 600,
          height: 600,
          bottom: -200,
          right: -200,
          filter: "blur(120px)",
          opacity: 0.12,
        }}
      />
    </div>
  );
}
