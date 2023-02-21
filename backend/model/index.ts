export const Station = {
    HBS: 'Braunschweig Hbf',
    HCAL: 'Calberlah',
    HDEH: 'Dedenhausen',
    HDOG: 'Dollbergen',
    HF: 'Fallersleben',
    HGI: 'Gifhorn',
    HH: 'Hannover Hbf',
    HHI: 'Hildesheim Hbf',
    HHEP: 'Hoheneggelsen',
    HIMS: 'Immensen-Arpke',
    HLER: 'Lehrte',
    HLFG: 'Leiferde',
    HBST: 'Lengede-Broistedt',
    HMRS: 'Meinersen',
    HWED: 'Weddel',
    HWOB: 'Wolfsburg',
    HWWI: 'Woltwiesche',
} as const;

export type Station = keyof typeof Station;

export type Line = 'RE30' | 'RE50';
