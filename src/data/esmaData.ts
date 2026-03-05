export interface EsmaBase {
    number: number;
    name: string;
    arabic: string;
    dhikrCount: number;
}

export const esmaData: Record<number, EsmaBase> = {
    // Existing 25
    1: { number: 1, name: 'Er-Rahmân', arabic: 'الرَّحْمَن', dhikrCount: 298 },
    2: { number: 2, name: 'Er-Rahîm', arabic: 'الرَّحِيم', dhikrCount: 258 },
    3: { number: 3, name: 'El-Melik', arabic: 'الْمَلِك', dhikrCount: 90 },
    8: { number: 8, name: 'El-Azîz', arabic: 'الْعَزِيز', dhikrCount: 94 },
    10: { number: 10, name: 'El-Mütekebbir', arabic: 'الْمُتَكَبِّر', dhikrCount: 662 },
    13: { number: 13, name: 'El-Musavvir', arabic: 'الْمُصَوِّر', dhikrCount: 336 },
    15: { number: 15, name: 'El-Kahhâr', arabic: 'الْقَهَّار', dhikrCount: 306 },
    18: { number: 18, name: 'El-Fettâh', arabic: 'الْفَتَّاح', dhikrCount: 489 },
    19: { number: 19, name: 'El-Alîm', arabic: 'الْعَلِيم', dhikrCount: 150 },
    24: { number: 24, name: 'El-Muhyî', arabic: 'الْمُحْيِي', dhikrCount: 68 },
    29: { number: 29, name: 'El-Adl', arabic: 'الْعَدْل', dhikrCount: 104 },
    31: { number: 31, name: 'El-Latîf', arabic: 'اللَّطِيف', dhikrCount: 129 },
    33: { number: 33, name: 'El-Halîm', arabic: 'الْحَلِيم', dhikrCount: 88 },
    34: { number: 34, name: 'El-Gafûr', arabic: 'الْغَفُور', dhikrCount: 1286 },
    35: { number: 35, name: 'Eş-Şekûr', arabic: 'الشَّكُور', dhikrCount: 526 },
    39: { number: 39, name: 'El-Mukît', arabic: 'الْمُقِيت', dhikrCount: 550 },
    47: { number: 47, name: 'El-Vedûd', arabic: 'الْوَدُود', dhikrCount: 20 },
    48: { number: 48, name: 'El-Mecîd', arabic: 'الْمَجِيد', dhikrCount: 57 },
    50: { number: 50, name: 'Eş-Şehîd', arabic: 'الشَّهِيد', dhikrCount: 319 },
    52: { number: 52, name: 'El-Hakk', arabic: 'الْحَقّ', dhikrCount: 108 },
    55: { number: 55, name: 'El-Metîn', arabic: 'الْمَتِين', dhikrCount: 500 },
    81: { number: 81, name: 'El-Müntakim', arabic: 'الْمُنْتَقِم', dhikrCount: 630 },
    83: { number: 83, name: 'Er-Raûf', arabic: 'الرَّؤُوف', dhikrCount: 286 },
    88: { number: 88, name: 'El-Ganiyy', arabic: 'الْغَنِيّ', dhikrCount: 1060 },
    95: { number: 95, name: "El-Bedî'", arabic: 'الْبَدِيع', dhikrCount: 86 },

    // New 15 — for expanded mood system
    4: { number: 4, name: 'El-Kuddûs', arabic: 'الْقُدُّوس', dhikrCount: 170 },
    5: { number: 5, name: 'Es-Selâm', arabic: 'السَّلَام', dhikrCount: 131 },
    6: { number: 6, name: "El-Mü'min", arabic: 'الْمُؤْمِن', dhikrCount: 136 },
    7: { number: 7, name: 'El-Müheymin', arabic: 'الْمُهَيْمِن', dhikrCount: 145 },
    9: { number: 9, name: 'El-Cebbâr', arabic: 'الْجَبَّار', dhikrCount: 206 },
    11: { number: 11, name: 'El-Hâlık', arabic: 'الْخَالِق', dhikrCount: 731 },
    14: { number: 14, name: 'El-Gaffâr', arabic: 'الْغَفَّار', dhikrCount: 1281 },
    16: { number: 16, name: 'El-Vehhâb', arabic: 'الْوَهَّاب', dhikrCount: 14 },
    17: { number: 17, name: 'Er-Rezzâk', arabic: 'الرَّزَّاق', dhikrCount: 308 },
    21: { number: 21, name: 'El-Bâsıt', arabic: 'الْبَاسِط', dhikrCount: 72 },
    23: { number: 23, name: "Er-Râfi'", arabic: 'الرَّافِع', dhikrCount: 351 },
    26: { number: 26, name: "Es-Semî'", arabic: 'السَّمِيع', dhikrCount: 180 },
    27: { number: 27, name: 'El-Basîr', arabic: 'الْبَصِير', dhikrCount: 302 },
    36: { number: 36, name: 'El-Aliyy', arabic: 'الْعَلِيّ', dhikrCount: 110 },
    99: { number: 99, name: 'Es-Sabûr', arabic: 'الصَّبُور', dhikrCount: 298 },
};
