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
        { id: 1, chords: ["ii", "V", "I"] },
        { id: 2, chords: ["I", "vi", "ii", "V"] },
        { id: 3, chords: ["iii", "VI", "ii", "V", "I"] },
        { id: 4, chords: ["ii", "V", "iii", "VI"] },
      ],
    },
  ],
};
