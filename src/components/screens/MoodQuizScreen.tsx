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
  const t = useTranslations("quiz");
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
      className="flex flex-col items-center justify-center min-h-[100dvh] px-5 py-10 gap-8"
    >
      {/* Step indicator */}
      <div className="flex gap-1.5">
        {quizQuestions.map((_, i) => (
          <div
            key={i}
            className="h-1 rounded-sm transition-all duration-400"
            style={{
              width: i === step ? 20 : 8,
              background:
                i <= step ? "var(--color-gold)" : "rgba(255,255,255,0.15)",
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
          className="flex flex-col items-center text-center gap-7 w-full max-w-[440px]"
        >
          <div className="screen-label">{t("mood.stepLabel")}</div>

          <h2 className="screen-title max-w-[320px]">
            {t(currentQuestion.titleKey)}
          </h2>

          {/* Options */}
          <div
            className="grid w-full gap-3"
            style={{
              gridTemplateColumns:
                currentQuestion.options.length === 3
                  ? "1fr 1fr 1fr"
                  : "1fr 1fr",
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
                className="cursor-pointer flex flex-col items-center gap-2.5 px-3 py-5 bg-white/[0.03] border border-white/[0.08] rounded-[20px] transition-all duration-250 hover:bg-white/[0.07] hover:border-gold/40 hover:-translate-y-[3px]"
              >
                <span className="text-[28px]">{option.emoji}</span>
                <span className="text-xs text-text-dim leading-[1.4] text-center">
                  {t(option.labelKey)}
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
          className="bg-transparent border-none text-text-muted text-[13px] cursor-pointer tracking-[1px]"
        >
          ← {t("navigation.backButton")}
        </motion.button>
      )}
    </motion.div>
  );
}
