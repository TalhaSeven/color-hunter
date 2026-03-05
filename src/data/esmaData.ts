export interface EsmaBase {
    number: number;
    name: string;
    arabic: string;
}

export const esmaData: Record<number, EsmaBase> = {
    // Existing 25
    1: { number: 1, name: 'Er-Rahmân', arabic: 'الرَّحْمَن' },
    2: { number: 2, name: 'Er-Rahîm', arabic: 'الرَّحِيم' },
    3: { number: 3, name: 'El-Melik', arabic: 'الْمَلِك' },
    8: { number: 8, name: 'El-Azîz', arabic: 'الْعَزِيز' },
    10: { number: 10, name: 'El-Mütekebbir', arabic: 'الْمُتَكَبِّر' },
    13: { number: 13, name: 'El-Musavvir', arabic: 'الْمُصَوِّر' },
    15: { number: 15, name: 'El-Kahhâr', arabic: 'الْقَهَّار' },
    18: { number: 18, name: 'El-Fettâh', arabic: 'الْفَتَّاح' },
    19: { number: 19, name: 'El-Alîm', arabic: 'الْعَلِيم' },
    24: { number: 24, name: 'El-Muhyî', arabic: 'الْمُحْيِي' },
    29: { number: 29, name: 'El-Adl', arabic: 'الْعَدْل' },
    31: { number: 31, name: 'El-Latîf', arabic: 'اللَّطِيف' },
    33: { number: 33, name: 'El-Halîm', arabic: 'الْحَلِيم' },
    34: { number: 34, name: 'El-Gafûr', arabic: 'الْغَفُور' },
    35: { number: 35, name: 'Eş-Şekûr', arabic: 'الشَّكُور' },
    39: { number: 39, name: 'El-Mukît', arabic: 'الْمُقِيت' },
    47: { number: 47, name: 'El-Vedûd', arabic: 'الْوَدُود' },
    48: { number: 48, name: 'El-Mecîd', arabic: 'الْمَجِيد' },
    50: { number: 50, name: 'Eş-Şehîd', arabic: 'الشَّهِيد' },
    52: { number: 52, name: 'El-Hakk', arabic: 'الْحَقّ' },
    55: { number: 55, name: 'El-Metîn', arabic: 'الْمَتِين' },
    81: { number: 81, name: 'El-Müntakim', arabic: 'الْمُنْتَقِم' },
    83: { number: 83, name: 'Er-Raûf', arabic: 'الرَّؤُوف' },
    88: { number: 88, name: 'El-Ganiyy', arabic: 'الْغَنِيّ' },
    95: { number: 95, name: "El-Bedî'", arabic: 'الْبَدِيع' },

    // New 15 — for expanded mood system
    4: { number: 4, name: 'El-Kuddûs', arabic: 'الْقُدُّوس' },
    5: { number: 5, name: 'Es-Selâm', arabic: 'السَّلَام' },
    6: { number: 6, name: "El-Mü'min", arabic: 'الْمُؤْمِن' },
    7: { number: 7, name: 'El-Müheymin', arabic: 'الْمُهَيْمِن' },
    9: { number: 9, name: 'El-Cebbâr', arabic: 'الْجَبَّار' },
    11: { number: 11, name: 'El-Hâlık', arabic: 'الْخَالِق' },
    14: { number: 14, name: 'El-Gaffâr', arabic: 'الْغَفَّار' },
    16: { number: 16, name: 'El-Vehhâb', arabic: 'الْوَهَّاب' },
    17: { number: 17, name: 'Er-Rezzâk', arabic: 'الرَّزَّاق' },
    21: { number: 21, name: 'El-Bâsıt', arabic: 'الْبَاسِط' },
    23: { number: 23, name: "Er-Râfi'", arabic: 'الرَّافِع' },
    26: { number: 26, name: "Es-Semî'", arabic: 'السَّمِيع' },
    27: { number: 27, name: 'El-Basîr', arabic: 'الْبَصِير' },
    36: { number: 36, name: 'El-Aliyy', arabic: 'الْعَلِيّ' },
    99: { number: 99, name: 'Es-Sabûr', arabic: 'الصَّبُور' },
};
