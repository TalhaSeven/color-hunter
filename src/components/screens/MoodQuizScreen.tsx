"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { quizQuestions, resolveMood } from "@/data/quizData";
import type { MoodId } from "@/data/quizData";

interface MoodQuizScreenProps {
  onSelect: (moodId: MoodId) => void;
}

export default function MoodQuizScreen({ onSelect }: MoodQuizScreenProps) {
  const t = useTranslations();
  const [step, setStep] = useState(0); // 0 = Q1, 1 = Q2
  const [answers, setAnswers] = useState<string[]>([]);

  const currentQuestion = quizQuestions[step];
  const isLastStep = step === quizQuestions.length - 1;

  const handleOptionSelect = (optionId: string) => {
    const nextAnswers = [...answers, optionId];

    if (isLastStep) {
      const moodId = resolveMood(nextAnswers[0], nextAnswers[1]);
      onSelect(moodId);
    } else {
      setAnswers(nextAnswers);
      setStep((s) => s + 1);
    }
  };

  const handleBack = () => {
    if (step > 0) {
      setStep((s) => s - 1);
      setAnswers((a) => a.slice(0, -1));
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
      className="flex flex-col items-center justify-center min-h-[100dvh] px-5 py-10"
      style={{ gap: 32 }}
    >
      {/* Step indicator */}
      <div className="flex" style={{ gap: 6 }}>
        {quizQuestions.map((_, i) => (
          <div
            key={i}
            style={{
              width: i === step ? 20 : 8,
              height: 4,
              borderRadius: 2,
              background:
                i <= step ? "var(--color-gold)" : "rgba(255,255,255,0.15)",
              transition: "all 0.4s",
            }}
          />
        ))}
      </div>

      {/* Question */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentQuestion.id}
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -30 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          className="flex flex-col items-center text-center"
          style={{ gap: 28, width: "100%", maxWidth: 440 }}
        >
          <div className="screen-label">{t("mood.stepLabel")}</div>

          <h2 className="screen-title" style={{ maxWidth: 320 }}>
            {t(currentQuestion.titleKey as Parameters<typeof t>[0])}
          </h2>

          {/* Options */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                currentQuestion.options.length === 3
                  ? "1fr 1fr 1fr"
                  : "1fr 1fr",
              gap: 12,
              width: "100%",
            }}
          >
            {currentQuestion.options.map((option, i) => (
              <motion.button
                key={option.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: i * 0.07 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleOptionSelect(option.id)}
                className="cursor-pointer"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 10,
                  padding: "20px 12px",
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: 20,
                  cursor: "pointer",
                  transition: "all 0.25s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "rgba(255,255,255,0.07)";
                  e.currentTarget.style.borderColor = "rgba(201,168,76,0.4)";
                  e.currentTarget.style.transform = "translateY(-3px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "rgba(255,255,255,0.03)";
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                <span style={{ fontSize: 28 }}>{option.emoji}</span>
                <span
                  style={{
                    fontSize: 12,
                    color: "var(--color-text-dim)",
                    lineHeight: 1.4,
                    textAlign: "center",
                  }}
                >
                  {t(option.labelKey as Parameters<typeof t>[0])}
                </span>
              </motion.button>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Back button for step 2 */}
      {step > 0 && (
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={handleBack}
          style={{
            background: "none",
            border: "none",
            color: "var(--color-text-muted)",
            fontSize: 13,
            cursor: "pointer",
            letterSpacing: 1,
          }}
        >
          ← {t("navigation.backButton")}
        </motion.button>
      )}
    </motion.div>
  );
}
