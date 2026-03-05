"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

export default function InstallPrompt() {
  const t = useTranslations("pwa");
  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);
  const [showIOSPrompt, setShowIOSPrompt] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem("install-dismissed")) {
      setDismissed(true);
      return;
    }
    if (window.matchMedia("(display-mode: standalone)").matches) return;

    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };
    window.addEventListener("beforeinstallprompt", handler);

    const isIOS =
      /iPad|iPhone|iPod/.test(navigator.userAgent) &&
      !(window as unknown as { MSStream?: unknown }).MSStream;
    if (isIOS && !window.matchMedia("(display-mode: standalone)").matches)
      setShowIOSPrompt(true);

    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;
    await deferredPrompt.prompt();
    await deferredPrompt.userChoice;
    setDeferredPrompt(null);
    handleDismiss();
  };

  const handleDismiss = () => {
    setDismissed(true);
    sessionStorage.setItem("install-dismissed", "true");
  };

  const showBanner = !dismissed && (deferredPrompt || showIOSPrompt);

  return (
    <AnimatePresence>
      {showBanner && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeOut", delay: 2 }}
          className="fixed bottom-4 left-4 right-4 z-50"
        >
          <div
            className="flex items-center shadow-2xl max-w-md mx-auto"
            style={{
              gap: 12,
              padding: 16,
              borderRadius: 16,
              background: "rgba(20,20,20,0.95)",
              backdropFilter: "blur(12px)",
              border: "1px solid rgba(255,255,255,0.1)",
            }}
          >
            <div className="shrink-0" style={{ fontSize: 24 }}>
              🔍
            </div>
            <div className="flex-1 min-w-0">
              <p
                style={{
                  fontSize: 13,
                  lineHeight: 1.5,
                  color: "var(--color-text)",
                }}
              >
                {deferredPrompt ? t("installTitle") : t("iosHint")}
              </p>
            </div>
            {deferredPrompt && (
              <button
                onClick={handleInstall}
                className="btn-gold shrink-0"
                style={{ padding: "8px 16px", fontSize: 13 }}
              >
                {t("installButton")}
              </button>
            )}
            <button
              onClick={handleDismiss}
              aria-label={t("dismiss")}
              className="shrink-0 cursor-pointer"
              style={{
                padding: 4,
                color: "var(--color-text-dim)",
                background: "none",
                border: "none",
                transition: "color 0.2s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "var(--color-text)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "var(--color-text-dim)";
              }}
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
