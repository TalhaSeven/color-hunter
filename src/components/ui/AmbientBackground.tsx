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
      aria-hidden="true"
    >
      {/* Deep atmosphere base layer */}
      <div 
        className="absolute inset-0 opacity-40 mix-blend-screen"
        style={{
          background: `radial-gradient(circle at 50% 50%, ${accentColor}15 0%, transparent 70%)`
        }}
      />

      {/* Primary animating ambient blob */}
      <motion.div
        className="absolute rounded-[40%_60%_70%_30%/40%_50%_60%_50%]"
        animate={{ backgroundColor: accentColor }}
        transition={{ duration: 3, ease: "easeInOut" }}
        style={{
          width: "120vw",
          height: "120vh",
          top: "-10vh",
          left: "-10vw",
          filter: "blur(140px)",
          opacity: 0.15,
          animation: "ambient-rotate 40s linear infinite alternate",
          transformOrigin: "center center",
        }}
      />

      {/* Secondary accent blob for complex intersections */}
      <motion.div
        className="absolute rounded-[60%_40%_30%_70%/60%_30%_70%_40%]"
        animate={{ backgroundColor: accentColor }}
        transition={{ duration: 3, ease: "easeInOut" }}
        style={{
          width: "90vw",
          height: "110vh",
          bottom: "-20vh",
          right: "-15vw",
          filter: "blur(120px)",
          opacity: 0.1,
          animation: "ambient-rotate 35s linear infinite reverse",
          transformOrigin: "40% 60%",
          mixBlendMode: "color-dodge",
        }}
      />
      
      {/* Sharp celestial accent line */}
      <div 
        className="absolute w-[1px] h-[150vh] -top-[25vh] left-[15%] opacity-20"
        style={{
          background: `linear-gradient(to bottom, transparent, ${accentColor}, transparent)`,
          transform: "rotate(15deg)"
        }}
      />
    </div>
  );
}
