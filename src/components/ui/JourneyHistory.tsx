"use client";

import { useSyncExternalStore } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";
import { JourneyRecord } from "@/hooks/useJourneyHistory";

interface JourneyHistoryProps {
  journeys: JourneyRecord[];
  onClear: () => void;
}

function timeAgo(dateStr: string, locale: string): string {
  const ms = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(ms / 60000);
  const hours = Math.floor(ms / 3600000);
  const days = Math.floor(ms / 86400000);

  if (locale === "tr") {
    if (mins < 60) return `${mins} dk önce`;
    if (hours < 24) return `${hours} sa önce`;
    return `${days} gün önce`;
  }
  if (locale === "de") {
    if (mins < 60) return `vor ${mins} Min.`;
    if (hours < 24) return `vor ${hours} Std.`;
    return `vor ${days} Tag(en)`;
  }
  if (locale === "es") {
    if (mins < 60) return `hace ${mins} min`;
    if (hours < 24) return `hace ${hours} h`;
    return `hace ${days} día(s)`;
  }
  // en
  if (mins < 60) return `${mins}m ago`;
  if (hours < 24) return `${hours}h ago`;
  return `${days}d ago`;
}

export default function JourneyHistory({
  journeys,
  onClear,
}: JourneyHistoryProps) {
  const t = useTranslations("history");
  const locale = useLocale();
  const isHydrated = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );

  if (!isHydrated || journeys.length === 0) return null;

  const recent = journeys.slice(0, 3);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.6 }}
      className="w-full"
      style={{ maxWidth: 480 }}
    >
      {/* Header */}
      <div
        className="flex items-center justify-between"
        style={{ marginBottom: 12 }}
      >
        <span
          style={{
            fontSize: 10,
            letterSpacing: 3,
            color: "var(--color-gold)",
            textTransform: "uppercase",
            opacity: 0.7,
          }}
        >
          {t("title")}
        </span>
        <button
          onClick={onClear}
          style={{
            fontSize: 10,
            color: "var(--color-text-muted)",
            background: "none",
            border: "none",
            cursor: "pointer",
            letterSpacing: 1,
          }}
        >
          {t("clear")}
        </button>
      </div>

      {/* Cards */}
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        <AnimatePresence>
          {recent.map((j, i) => (
            <motion.div
              key={j.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              transition={{ delay: i * 0.05 }}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                padding: "12px 16px",
                background: "rgba(255,255,255,0.025)",
                border: "1px solid rgba(255,255,255,0.07)",
                borderRadius: 14,
                borderLeft: `3px solid ${j.color}`,
              }}
            >
              {/* Mood emoji */}
              <span style={{ fontSize: 20, flexShrink: 0 }}>{j.moodEmoji}</span>

              {/* Info */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <div
                  style={{
                    fontSize: 13,
                    color: "var(--color-text)",
                    fontFamily: "var(--font-playfair)",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {j.esmaName}
                </div>
                <div
                  style={{
                    fontSize: 11,
                    color: "var(--color-text-muted)",
                    marginTop: 2,
                  }}
                >
                  {j.esmaArabic} · {j.moodName}
                </div>
              </div>

              {/* Color dot + time */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-end",
                  gap: 4,
                  flexShrink: 0,
                }}
              >
                <div
                  style={{
                    width: 10,
                    height: 10,
                    borderRadius: "50%",
                    background: j.color,
                    boxShadow: `0 0 8px ${j.color}66`,
                  }}
                />
                <span
                  style={{ fontSize: 10, color: "var(--color-text-muted)" }}
                >
                  {isHydrated ? timeAgo(j.date, locale) : ""}
                </span>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
