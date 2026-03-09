"use client";

import { useReducer, useMemo, useEffect, useRef, useSyncExternalStore } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { track } from "@vercel/analytics";
import { AppState, AppAction, AppStep } from "@/types";
import { moods } from "@/data/moods";
import { esmaData } from "@/data/esmaData";
import { useJourneyHistory } from "@/hooks/useJourneyHistory";
import { useAmbientSound } from "@/hooks/useAmbientSound";

import AmbientBackground from "@/components/ui/AmbientBackground";
import ProgressBar from "@/components/ui/ProgressBar";
import InstallPrompt from "@/components/ui/InstallPrompt";
import LanguageSwitcher from "@/components/ui/LanguageSwitcher";
import SoundToggle from "@/components/ui/SoundToggle";
import IntroScreen from "@/components/screens/IntroScreen";
import MoodScreen from "@/components/screens/MoodScreen";
import ColorScreen from "@/components/screens/ColorScreen";
import NumberScreen from "@/components/screens/NumberScreen";
import EsmaScreen from "@/components/screens/EsmaScreen";
import type { MoodId } from "@/data/quizData";

const initialState: AppState = {
  currentStep: 0,
  selectedMood: null,
  selectedColor: null,
  selectedNumber: null,
  revealedEsma: null,
};

const APP_STEPS = [0, 1, 2, 3, 4] as const;

function toAppStep(value: number): AppStep {
  const bounded = Math.min(4, Math.max(0, Math.round(value)));
  return APP_STEPS[bounded];
}

const APP_STATE_KEY = "inner_hunt_app_state";

function parseSavedState(raw: string | null): AppState {
  if (!raw) return initialState;

  try {
    const parsed = JSON.parse(raw) as Partial<AppState>;
    const safeStep =
      typeof parsed.currentStep === "number" &&
      parsed.currentStep >= 0 &&
      parsed.currentStep <= 4
        ? parsed.currentStep
        : 0;
    const safeMood = moods.some((m) => m.id === parsed.selectedMood)
      ? parsed.selectedMood ?? null
      : null;
    const safeNumber =
      typeof parsed.selectedNumber === "number" ? parsed.selectedNumber : null;
    const safeEsma = safeNumber ? esmaData[safeNumber] ?? null : null;

    return {
      currentStep: toAppStep(safeStep),
      selectedMood: safeMood,
      selectedColor:
        typeof parsed.selectedColor === "string" ? parsed.selectedColor : null,
      selectedNumber: safeNumber,
      revealedEsma: safeEsma,
    };
  } catch {
    return initialState;
  }
}

function reducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case "NEXT_STEP":
      return {
        ...state,
        currentStep: toAppStep(state.currentStep + 1),
      };
    case "PREV_STEP":
      return {
        ...state,
        currentStep: toAppStep(state.currentStep - 1),
      };
    case "SET_MOOD":
      return {
        ...state,
        selectedMood: action.payload,
        currentStep: 2,
      };
    case "SET_COLOR":
      return {
        ...state,
        selectedColor: action.payload,
        currentStep: 3,
      };
    case "SET_NUMBER":
      return {
        ...state,
        selectedNumber: action.payload,
        revealedEsma: action.esma,
        currentStep: 4,
      };
    case "RESET":
      return initialState;
    default:
      return state;
  }
}

export default function ColorHunterApp() {
  const [state, dispatch] = useReducer(
    reducer,
    initialState,
    () =>
      typeof window === "undefined"
        ? initialState
        : parseSavedState(sessionStorage.getItem(APP_STATE_KEY)),
  );
  const isHydrated = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );
  const hasSkippedInitialJourneySave = useRef(false);
  const tMood = useTranslations("mood");
  const tNav = useTranslations("navigation");

  const { journeys, saveJourney, clearHistory } = useJourneyHistory();
  const renderedState = isHydrated ? state : initialState;
  const renderedJourneys = isHydrated ? journeys : [];

  // Sound mode: calm tone on intro, rain on esma reveal
  const soundMode = renderedState.currentStep === 4 ? "rain" : "tone";
  const { enabled: soundEnabled, toggle: toggleSound } =
    useAmbientSound(soundMode);

  const currentMood = useMemo(
    () => moods.find((m) => m.id === renderedState.selectedMood),
    [renderedState.selectedMood],
  );

  const accentColor = currentMood?.accentColor ?? "#c9a84c";

  const handleStart = () => dispatch({ type: "NEXT_STEP" });

  const handleMoodSelect = (moodId: MoodId) => {
    track("mood_selected", { mood: moodId });
    dispatch({ type: "SET_MOOD", payload: moodId });
  };

  const handleColorSelect = (hex: string) =>
    dispatch({ type: "SET_COLOR", payload: hex });

  const handleNumberSelect = (num: number) => {
    const esma = esmaData[num];
    if (esma) {
      track("esma_revealed", {
        esma_name: esma.name,
        esma_number: esma.number,
        mood: state.selectedMood ?? "",
      });
      dispatch({ type: "SET_NUMBER", payload: num, esma });
    }
  };

  const handleReset = () => {
    track("journey_restarted");
    dispatch({ type: "RESET" });
  };

  const handleBack = () => dispatch({ type: "PREV_STEP" });

  const translatedMoodName = currentMood
    ? tMood(`moods.${currentMood.id}.name`)
    : "";

  useEffect(() => {
    if (!hasSkippedInitialJourneySave.current) {
      hasSkippedInitialJourneySave.current = true;
      return;
    }

    if (
      state.currentStep === 4 &&
      state.revealedEsma &&
      state.selectedMood &&
      currentMood &&
      state.selectedColor
    ) {
      saveJourney({
        mood: state.selectedMood,
        moodEmoji: currentMood.emoji,
        moodName: translatedMoodName,
        esmaName: state.revealedEsma.name,
        esmaArabic: state.revealedEsma.arabic,
        esmaNumber: state.revealedEsma.number,
        color: state.selectedColor,
      });
    }
    // Only run when we enter step 4.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.currentStep]);

  useEffect(() => {
    sessionStorage.setItem(APP_STATE_KEY, JSON.stringify(state));
  }, [state]);

  return (
    <main className="relative w-full min-h-dvh overflow-hidden" aria-label="Inner Hunt">
      <AmbientBackground accentColor={accentColor} />
      <ProgressBar currentStep={renderedState.currentStep} />
      <LanguageSwitcher />
      <SoundToggle enabled={isHydrated ? soundEnabled : false} onToggle={toggleSound} />

      {/* Back button */}
      <AnimatePresence>
        {renderedState.currentStep > 0 && (
          <motion.button
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={{ duration: 0.3 }}
            onClick={handleBack}
            className="fixed z-50 rounded-full flex items-center justify-center cursor-pointer"
            style={{
              top: 20,
              left: 20,
              width: 40,
              height: 40,
              background: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(255,255,255,0.1)",
              color: "var(--color-text-dim)",
              fontSize: 18,
              transition: "all 0.2s",
            }}
            aria-label={tNav("backButton")}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(255,255,255,0.12)";
              e.currentTarget.style.color = "var(--color-text)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "rgba(255,255,255,0.06)";
              e.currentTarget.style.color = "var(--color-text-dim)";
            }}
          >
            ←
          </motion.button>
        )}
      </AnimatePresence>

      {/* Screens */}
      <AnimatePresence mode="wait">
        {renderedState.currentStep === 0 && (
          <IntroScreen
            key="intro"
            onStart={handleStart}
            journeys={renderedJourneys}
            onClearHistory={clearHistory}
          />
        )}
        {renderedState.currentStep === 1 && <MoodScreen key="mood" onSelect={handleMoodSelect} />}
        {renderedState.currentStep === 2 && currentMood && (
          <ColorScreen
            key="color"
            colors={currentMood.colors}
            accentColor={currentMood.accentColor}
            onSelect={handleColorSelect}
          />
        )}
        {renderedState.currentStep === 3 && currentMood && (
          <NumberScreen
            key="number"
            numbers={currentMood.numbers}
            accentColor={currentMood.accentColor}
            onSelect={handleNumberSelect}
          />
        )}
        {renderedState.currentStep === 4 &&
          renderedState.revealedEsma &&
          currentMood && (
          <EsmaScreen
            key="esma"
            esma={renderedState.revealedEsma}
            selectedColor={renderedState.selectedColor ?? accentColor}
            accentColor={accentColor}
            moodName={translatedMoodName}
            moodEmoji={currentMood.emoji}
            onReset={handleReset}
          />
        )}
      </AnimatePresence>

      <InstallPrompt />
    </main>
  );
}
