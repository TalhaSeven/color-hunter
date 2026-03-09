"use client";

import { useState, useRef, useEffect, useTransition } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";
import { useRouter, usePathname } from "@/i18n/routing";
import { routing } from "@/i18n/routing";

const languages = [
  { code: "tr" as const, label: "TR", flag: "🇹🇷" },
  { code: "en" as const, label: "EN", flag: "🇬🇧" },
  { code: "de" as const, label: "DE", flag: "🇩🇪" },
  { code: "es" as const, label: "ES", flag: "🇪🇸" },
] as const;

export default function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const t = useTranslations("langSwitcher");
  const [isPending, startTransition] = useTransition();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const current =
    languages.find((l) => l.code === locale) ??
    languages.find((l) => l.code === routing.defaultLocale) ??
    languages[0];

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (!(e.target instanceof Node)) return;
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    };

    const onEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };

    document.addEventListener("mousedown", handler);
    document.addEventListener("keydown", onEscape);
    return () => {
      document.removeEventListener("mousedown", handler);
      document.removeEventListener("keydown", onEscape);
    };
  }, []);

  const handleChange = (newLocale: "tr" | "en" | "de" | "es") => {
    startTransition(() => {
      router.replace(pathname, { locale: newLocale });
    });
    setOpen(false);
  };

  return (
    <nav
      ref={ref}
      className="fixed z-50"
      style={{ top: 20, right: 20 }}
      aria-label={t("label")}
    >
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center rounded-full cursor-pointer"
        aria-expanded={open}
        style={{
          gap: 6,
          padding: "8px 14px",
          background: "rgba(255,255,255,0.06)",
          border: "1px solid rgba(255,255,255,0.1)",
          fontSize: 13,
          color: "var(--color-text-dim)",
          transition: "all 0.2s",
          opacity: isPending ? 0.6 : 1,
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = "rgba(255,255,255,0.1)";
          e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = "rgba(255,255,255,0.06)";
          e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)";
        }}
      >
        <span>{current.flag}</span>
        <span>{current.label}</span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 overflow-hidden"
            style={{
              marginTop: 8,
              background: "rgba(24, 24, 24, 0.95)",
              backdropFilter: "blur(20px)",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: 14,
              minWidth: 160,
            }}
          >
            {languages.map((loc) => (
              <button
                key={loc.code}
                onClick={() => handleChange(loc.code)}
                disabled={isPending}
                aria-current={locale === loc.code ? "true" : undefined}
                className="flex items-center w-full text-left cursor-pointer"
                style={{
                  gap: 10,
                  padding: "12px 16px",
                  fontSize: 13,
                  color:
                    locale === loc.code
                      ? "var(--color-gold)"
                      : "var(--color-text-dim)",
                  background:
                    locale === loc.code
                      ? "rgba(201, 168, 76, 0.08)"
                      : "transparent",
                  border: "none",
                  transition: "background 0.15s",
                }}
                onMouseEnter={(e) => {
                  if (locale !== loc.code)
                    e.currentTarget.style.background = "rgba(255,255,255,0.05)";
                }}
                onMouseLeave={(e) => {
                  if (locale !== loc.code)
                    e.currentTarget.style.background = "transparent";
                }}
              >
                <span style={{ fontSize: 18 }}>{loc.flag}</span>
                <span>{t(loc.code)}</span>
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
