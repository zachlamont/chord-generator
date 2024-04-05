export const keys = [
  "C",
  "C#",
  "D",
  "Eb",
  "E",
  "F",
  "F#",
  "G",
  "Ab",
  "A",
  "Bb",
  "B",
];

export const qualities = [
  "5",
  "6",
  "7",
  "9",
  "11",
  "13",
  "69",
  "major",
  "minor",
  "dim",
  "dim7",
  "sus2",
  "sus4",
  "7sus4",
  "aug",
  "7b5",
  "aug7",
  "9b5",
  "aug9",
  "7b9",
  "7sharp9",
  "9sharp11",
  "maj7",
  "maj7b5",
  "maj7sharp5",
  "maj9",
  "maj11",
  "maj13",
  "m6",
  "m69",
  "m7",
  "m7b5",
  "m9",
  "m11",
  "mmaj7",
  "mmaj7b5",
  "mmaj9",
  "mmaj11",
  "add9",
  "madd9",
];

export const chords = {
  5: {
    intervals: ["0", "5"],
    midiKeys: [60, 67],
  },
  6: {
    intervals: ["0", "3", "5", "6"],
    midiKeys: [60, 64, 67, 69],
  },
  7: {
    intervals: ["0", "3", "5", "b7"],
    midiKeys: [60, 64, 67, 70],
  },
  9: {
    intervals: ["0", "3", "5", "b7", "9"],
    midiKeys: [60, 64, 67, 70, 74],
  },
  11: {
    intervals: ["0", "3", "5", "b7", "9", "11"],
    midiKeys: [60, 64, 67, 70, 74, 77],
  },
  13: {
    intervals: ["0", "3", "5", "b7", "9", "11", "13"],
    midiKeys: [60, 64, 67, 70, 74, 77, 81],
  },
  69: {
    intervals: ["0", "3", "5", "6", "9"],
    midiKeys: [60, 64, 67, 69, 74],
  },
  major: {
    intervals: ["0", "3", "5"],
    midiKeys: [60, 64, 67],
  },
  minor: {
    intervals: ["0", "b3", "5"],
    midiKeys: [60, 63, 67],
  },
  dim: {
    intervals: ["0", "b3", "b5"],
    midiKeys: [60, 63, 66],
  },
  dim7: {
    intervals: ["0", "b3", "b5", "6"],
    midiKeys: [60, 63, 66, 69],
  },
  sus2: {
    intervals: ["0", "2", "5"],
    midiKeys: [60, 62, 67],
  },
  sus4: {
    intervals: ["0", "4", "5"],
    midiKeys: [60, 65, 67],
  },
  "7sus4": {
    intervals: ["0", "4", "5", "b7"],
    midiKeys: [60, 65, 67, 70],
  },
  aug: {
    intervals: ["0", "3", "#5"],
    midiKeys: [60, 64, 68],
  },
  "7b5": {
    intervals: ["0", "3", "b5", "b7"],
    midiKeys: [60, 64, 66, 70],
  },
  aug7: {
    intervals: ["0", "3", "#5", "b7"],
    midiKeys: [60, 64, 68, 70],
  },
  "9b5": {
    intervals: ["0", "3", "b5", "b7", "9"],
    midiKeys: [60, 64, 66, 70, 74],
  },
  aug9: {
    intervals: ["0", "3", "#5", "b7", "9"],
    midiKeys: [60, 64, 68, 70, 74],
  },
  "7b9": {
    intervals: ["0", "3", "5", "b7", "b9"],
    midiKeys: [60, 64, 67, 70, 73],
  },
  "7sharp9": {
    intervals: ["0", "3", "5", "b7", "#9"],
    midiKeys: [60, 64, 67, 70, 75],
  },
  "9sharp11": {
    intervals: ["0", "3", "5", "b7", "9", "#11"],
    midiKeys: [60, 64, 67, 70, 74, 78],
  },
  maj7: {
    intervals: ["0", "3", "5", "7"],
    midiKeys: [60, 64, 67, 71],
  },
  maj7b5: {
    intervals: ["0", "3", "b5", "7"],
    midiKeys: [60, 64, 66, 71],
  },
  maj7sharp5: {
    intervals: ["0", "3", "#5", "7"],
    midiKeys: [60, 64, 68, 71],
  },
  maj9: {
    intervals: ["0", "3", "5", "7", "9"],
    midiKeys: [60, 64, 67, 71, 74],
  },
  maj11: {
    intervals: ["0", "5", "7", "9", "11"],
    midiKeys: [60, 67, 71, 74, 77],
  },
  maj13: {
    intervals: ["0", "3", "5", "7", "9", "13"],
    midiKeys: [60, 64, 67, 71, 74, 81],
  },
  m6: {
    intervals: ["0", "b3", "5", "6"],
    midiKeys: [60, 63, 67, 69],
  },
  m69: {
    intervals: ["0", "b3", "5", "6", "9"],
    midiKeys: [60, 63, 67, 69, 74],
  },
  m7: {
    intervals: ["0", "b3", "5", "b7"],
    midiKeys: [60, 63, 67, 70],
  },
  m7b5: {
    intervals: ["0", "b3", "b5", "b7"],
    midiKeys: [60, 63, 66, 70],
  },
  m9: {
    intervals: ["0", "b3", "5", "b7", "9"],
    midiKeys: [60, 63, 67, 70, 74],
  },
  m11: {
    intervals: ["0", "b3", "5", "b7", "9", "11"],
    midiKeys: [60, 63, 67, 70, 74, 77],
  },
  mmaj7: {
    intervals: ["0", "b3", "5", "7"],
    midiKeys: [60, 63, 67, 71],
  },
  mmaj7b5: {
    intervals: ["0", "b3", "b5", "7"],
    midiKeys: [60, 63, 66, 71],
  },
  mmaj9: {
    intervals: ["0", "b3", "5", "7", "9"],
    midiKeys: [60, 63, 67, 71, 74],
  },
  mmaj11: {
    intervals: ["0", "b3", "5", "7", "9", "11"],
    midiKeys: [60, 63, 67, 71, 74, 77],
  },
  add9: {
    intervals: ["0", "3", "5", "9"],
    midiKeys: [60, 64, 67, 74],
  },
  madd9: {
    intervals: ["0", "b3", "5", "9"],
    midiKeys: [60, 63, 67, 74],
  },
};

export const progressions = {
  progressions: [
    {
      genre: "Pop",
      chordProgressions: [
        { id: 1, chords: ["I", "V", "vi", "IV"] },
        { id: 2, chords: ["vi", "IV", "I", "V"] },
        { id: 3, chords: ["I", "IV", "V", "IV"] },
        { id: 4, chords: ["I", "V", "IV", "V"] },
      ],
    },
    {
      genre: "R&B",
      chordProgressions: [
        { id: 1, chords: ["ii", "V", "I", "VI"] },
        { id: 2, chords: ["I", "iii", "IV", "ii"] },
        { id: 3, chords: ["vi", "IV", "I", "V"] },
        { id: 4, chords: ["I", "VI", "ii", "V"] },
      ],
    },
    {
      genre: "Folk",
      chordProgressions: [
        { id: 1, chords: ["I", "IV", "V", "I"] },
        { id: 2, chords: ["I", "V", "vi", "iii", "IV", "I", "IV", "V"] },
        { id: 3, chords: ["I", "ii", "IV", "V"] },
        { id: 4, chords: ["I", "IV", "I", "V"] },
      ],
    },
    {
      genre: "Ambient",
      chordProgressions: [
        { id: 1, chords: ["I", "ii", "III", "IV"] },
        { id: 2, chords: ["I", "IV", "I", "IV"] },
        { id: 3, chords: ["I", "vi", "IV", "V"] },
        { id: 4, chords: ["ii", "IV", "I", "maj7"] },
      ],
    },
    {
      genre: "Jazz",
      chordProgressions: [
        {
          id: 1,
          chords: [
            { chord: "ii", quality: "minor" },
            { chord: "V", quality: "7" },
            { chord: "I", quality: "maj9" },
          ],
        },
        { id: 2, chords: ["I", "vi", "ii", "V"] },
        { id: 3, chords: ["iii", "VI", "ii", "V", "I"] },
        { id: 4, chords: ["ii", "V", "iii", "VI"] },
      ],
    },
  ],
};

export const SAMPLER_INSTRUMENTS = {
  piano: {
    name: "Piano",
    samples: {
      A1: "A1.mp3",
      A2: "A2.mp3",
      A3: "A3.mp3",
      A4: "A4.mp3",
      A5: "A5.mp3",
      A6: "A6.mp3",
      A7: "A7.mp3",
      "A#1": "As1.mp3",
      "A#2": "As2.mp3",
      "A#3": "As3.mp3",
      "A#4": "As4.mp3",
      "A#5": "As5.mp3",
      "A#6": "As6.mp3",
      "A#7": "As7.mp3",
      B1: "B1.mp3",
      B2: "B2.mp3",
      B3: "B3.mp3",
      B4: "B4.mp3",
      B5: "B5.mp3",
      B6: "B6.mp3",
      B7: "B7.mp3",
      C1: "C1.mp3",
      C2: "C2.mp3",
      C3: "C3.mp3",
      C4: "C4.mp3",
      C5: "C5.mp3",
      C6: "C6.mp3",
      C7: "C7.mp3",
      C8: "C8.mp3",
      "C#1": "Cs1.mp3",
      "C#2": "Cs2.mp3",
      "C#3": "Cs3.mp3",
      "C#4": "Cs4.mp3",
      "C#5": "Cs5.mp3",
      "C#6": "Cs6.mp3",
      "C#7": "Cs7.mp3",
      D1: "D1.mp3",
      D2: "D2.mp3",
      D3: "D3.mp3",
      D4: "D4.mp3",
      D5: "D5.mp3",
      D6: "D6.mp3",
      D7: "D7.mp3",
      "D#1": "Ds1.mp3",
      "D#2": "Ds2.mp3",
      "D#3": "Ds3.mp3",
      "D#4": "Ds4.mp3",
      "D#5": "Ds5.mp3",
      "D#6": "Ds6.mp3",
      "D#7": "Ds7.mp3",
      E1: "E1.mp3",
      E2: "E2.mp3",
      E3: "E3.mp3",
      E4: "E4.mp3",
      E5: "E5.mp3",
      E6: "E6.mp3",
      E7: "E7.mp3",
      F1: "F1.mp3",
      F2: "F2.mp3",
      F3: "F3.mp3",
      F4: "F4.mp3",
      F5: "F5.mp3",
      F6: "F6.mp3",
      F7: "F7.mp3",
      "F#1": "Fs1.mp3",
      "F#2": "Fs2.mp3",
      "F#3": "Fs3.mp3",
      "F#4": "Fs4.mp3",
      "F#5": "Fs5.mp3",
      "F#6": "Fs6.mp3",
      "F#7": "Fs7.mp3",
      G1: "G1.mp3",
      G2: "G2.mp3",
      G3: "G3.mp3",
      G4: "G4.mp3",
      G5: "G5.mp3",
      G6: "G6.mp3",
      G7: "G7.mp3",
      "G#1": "Gs1.mp3",
      "G#2": "Gs2.mp3",
      "G#3": "Gs3.mp3",
      "G#4": "Gs4.mp3",
      "G#5": "Gs5.mp3",
      "G#6": "Gs6.mp3",
      "G#7": "Gs7.mp3",
    },
  },
  electricGuitar: {
    name: "Electric Guitar",
    samples: {
      A2: "A2.mp3",
      A3: "A3.mp3",
      A4: "A4.mp3",
      A5: "A5.mp3",
      C3: "C3.mp3",
      C4: "C4.mp3",
      C5: "C5.mp3",
      C6: "C6.mp3",
      "C#2": "Cs2.mp3",
      "D#3": "Ds3.mp3",
      "D#4": "Ds4.mp3",
      "D#5": "Ds5.mp3",
      E2: "E2.mp3",
      "F#2": "Fs2.mp3",
      "F#3": "Fs3.mp3",
      "F#4": "Fs4.mp3",
      "F#5": "Fs5.mp3",
    },
    // Add more instruments and their samples as needed...
  },
  electricBass: {
    name: "Bass Guitar",
    samples: {
      "A#1": "As1.mp3",
      "A#2": "As2.mp3",
      "A#3": "As3.mp3",
      "A#4": "As4.mp3",
      "C#1": "Cs1.mp3",
      "C#2": "Cs2.mp3",
      "C#3": "Cs3.mp3",
      "C#4": "Cs4.mp3",
      "C#5": "Cs5.mp3",
      E1: "E1.mp3",
      E2: "E2.mp3",
      E3: "E3.mp3",
      E4: "E4.mp3",
      G1: "G1.mp3",
      G2: "G2.mp3",
      G3: "G3.mp3",
      G4: "G4.mp3",
    },
    // Add more instruments and their samples as needed...
  },
  nylonGuitar: {
    name: "Classical Guitar",
    samples: {
      "A2": "A2.mp3",
      "A3": "A3.mp3",
      "A4": "A4.mp3",
      "A5": "A5.mp3",
      "A#5": "As5.mp3",
      "B1": "B1.mp3",
      "B2": "B2.mp3",
      "B3": "B3.mp3",
      "B4": "B4.mp3",
      "C#3": "Cs3.mp3",
      "C#4": "Cs4.mp3",
      "C#5": "Cs5.mp3",
      "D2": "D2.mp3",
      "D3": "D3.mp3",
      "D5": "D5.mp3",
      "D#4": "Ds4.mp3",
      "E2": "E2.mp3",
      "E3": "E3.mp3",
      "E4": "E4.mp3",
      "E5": "E5.mp3",
      "F#2": "Fs2.mp3",
      "F#3": "Fs3.mp3",
      "F#4": "Fs4.mp3",
      "F#5": "Fs5.mp3",
      "G3": "G3.mp3",
      "G5": "G5.mp3",
      "G#2": "Gs2.mp3",
      "G#4": "Gs4.mp3",
      "G#5": "Gs5.mp3"
    }
    
    // Add more instruments and their samples as needed...
  },
};
