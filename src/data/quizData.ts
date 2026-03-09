export type MoodId = 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G' | 'H';

export interface QuizOption {
    id: string;
    emoji: string;
    labelKey: string;
}

export interface QuizQuestion {
    id: string;
    titleKey: string;
    options: QuizOption[];
}

export const quizQuestions: QuizQuestion[] = [
    {
        id: 'q1',
        titleKey: 'q1.title',
        options: [
            { id: 'high', emoji: '⚡', labelKey: 'q1.high' },
            { id: 'mid', emoji: '🌤', labelKey: 'q1.mid' },
            { id: 'low', emoji: '🌙', labelKey: 'q1.low' },
        ],
    },
    {
        id: 'q2',
        titleKey: 'q2.title',
        options: [
            { id: 'love', emoji: '💛', labelKey: 'q2.love' },
            { id: 'power', emoji: '🔥', labelKey: 'q2.power' },
            { id: 'peace', emoji: '🌿', labelKey: 'q2.peace' },
            { id: 'chaos', emoji: '🌊', labelKey: 'q2.chaos' },
        ],
    },
];

// Mapping: q1Answer_q2Answer → MoodId
export const quizMapping: Record<string, MoodId> = {
    'high_love': 'D', // Duygusal · Sevgi Dolu
    'high_power': 'A', // Dengeli · Canlı
    'high_peace': 'B', // Sakin · Odaklanmış
    'high_chaos': 'F', // Endişeli · Tedirgin
    'mid_love': 'D', // Duygusal
    'mid_power': 'C', // Derin · Zarif
    'mid_peace': 'B', // Sakin
    'mid_chaos': 'E', // Hüzünlü · Kırılgan
    'low_love': 'E', // Hüzünlü → sevgi taşıyor ama yorgun
    'low_power': 'G', // Yorgun · Tükenmiş
    'low_peace': 'H', // Umutlu · Teslimiyetli
    'low_chaos': 'G', // Yorgun · Bunalmış
};

export function resolveMood(q1: string, q2: string): MoodId {
    return quizMapping[`${q1}_${q2}`] ?? 'B';
}
