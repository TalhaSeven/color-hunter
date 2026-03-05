export interface ColorOption {
  hex: string;
  name: string;
}

export interface Mood {
  id: 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G' | 'H';
  emoji: string;
  colors: ColorOption[];
  numbers: number[];
  accentColor: string;
}

export interface EsmaBase {
  number: number;
  name: string;
  arabic: string;
}

export type AppStep = 0 | 1 | 2 | 3 | 4;

export interface AppState {
  currentStep: AppStep;
  selectedMood: 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G' | 'H' | null;
  selectedColor: string | null;
  selectedNumber: number | null;
  revealedEsma: EsmaBase | null;
}

export type AppAction =
  | { type: 'NEXT_STEP' }
  | { type: 'PREV_STEP' }
  | { type: 'SET_MOOD'; payload: 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G' | 'H' }
  | { type: 'SET_COLOR'; payload: string }
  | { type: 'SET_NUMBER'; payload: number; esma: EsmaBase }
  | { type: 'RESET' };
