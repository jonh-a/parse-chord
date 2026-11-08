export interface ChordT {
  name: string
  notes?: string[]
  inversion?: number | null
  rootNote?: string
  bassNote?: string | null
  quality?: string;
};

export interface ChordType { 
  structure: number[]; 
  key: 'major' | 'minor' | 'neither',
  duplicate?: boolean,
};

export interface GuitarChord {
  tuning: string[];
  notes: (number | null)[];
  capo?: number,
};