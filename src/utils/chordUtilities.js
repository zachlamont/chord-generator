import { keys, chords } from "../constants/constants"; // Adjust path as needed

// Accepts an individual chord e.g. 'ii' and outputs a chord quality e.g. 'm11'
export function spiceChordJazz(
  chord,
  isExtendedChords = true,
  isSeventhChords = true
) {
  // Define potential qualities for each chord role
  const baseQualities = ["major", "minor"];
  const seventhQualities = ["7", "maj7", "m7", "m7b5"];
  const extendedQualities = [
    "9",
    "11",
    "13",
    "69",
    "7b9",
    "7sharp9",
    "9sharp11",
    "maj9",
    "maj11",
    "maj13",
    "m9",
    "m11",
  ];

  // Choose the appropriate qualities based on flags
  let possibleQualities = [...baseQualities];
  if (isSeventhChords) {
    possibleQualities.push(...seventhQualities);
  }
  if (isExtendedChords) {
    possibleQualities.push(...extendedQualities);
  }

  // Randomly select a quality from the possible options
  const selectQuality = (qualities) => {
    const index = Math.floor(Math.random() * qualities.length);
    return qualities[index];
  };

  // Special handling for chord roles with specific tendencies
  switch (chord) {
    case "V":
      // Dominant chords in jazz often use alterations and extensions
      possibleQualities = possibleQualities.filter((quality) =>
        ["major", "7", "9", "13", "7b9", "7sharp9", "9sharp11"].includes(
          quality
        )
      );
      break;
    case "ii":
    case "vi":
      // Minor chords can use 'minor' or various 'm7' qualities
      possibleQualities = possibleQualities.filter((quality) =>
        ["minor", "m7", "m9", "m11"].includes(quality)
      );
      break;
    case "I":
    case "IV":
      // Major chords might use 'major', 'maj7', or various 'maj' extensions
      possibleQualities = possibleQualities.filter((quality) =>
        ["major", "maj7", "maj9", "maj11", "maj13"].includes(quality)
      );
      break;
    case "iii":
      // The 'iii' chord in jazz, typically minor, can use extensions similar to 'vi'
      possibleQualities = possibleQualities.filter((quality) =>
        ["minor", "m7", "m9", "m11"].includes(quality)
      );
      break;
    case "III":
      // 'III' might be used for a secondary dominant or in a modal context,
      // so let's treat it with options similar to a 'V' but more restricted
      possibleQualities = possibleQualities.filter(
        (quality) => ["major", "7", "9"].includes(quality) // Simplified for demonstration
      );
      break;

    default:
      // Default to filtering for 'major' or 'minor' if not seventh or extended
      possibleQualities = possibleQualities.filter((quality) =>
        baseQualities.includes(quality)
      );
  }

  return selectQuality(possibleQualities);
}
export function spiceChordPop(
  chord,
  isExtendedChords = false,
  isSeventhChords = true
) {
  // Pop-specific logic for spicing up chords
}

//Accepts a chord progression e.g. ["ii", "V", "I"] and user preferences and outputs and array e.g. [{id: 1, chord: 'ii', quality: 'minor'},{id: 2, chord: 'V', quality: '7'},{id: 3, chord: 'I', quality: 'maj9'}]

export function spiceChordProgression(
  progression,
  genre,
  isExtendedChords = true,
  isSeventhChords = true
) {
  // Mapping genre to corresponding spiceChord function
  const genreToSpiceFunction = {
    Jazz: spiceChordJazz,
    // Placeholder for future genre functions
    // "Pop": spiceChordPop,
    // "R&B": spiceChordRnB,
  };

  // Selecting the appropriate spice function based on the genre
  const spiceFunction =
    genreToSpiceFunction[genre] || genreToSpiceFunction["Jazz"]; // Default to Jazz if genre not found

  return progression.map((item, index) => {
    // Check if the input item is an object with 'chord' and 'quality' properties
    const chord = typeof item === "object" ? item.chord : item;
    const providedQuality = typeof item === "object" ? item.quality : null;

    // Use provided quality if available; otherwise, determine quality using the spice function
    const quality =
      providedQuality ||
      spiceFunction(chord, isExtendedChords, isSeventhChords);

    return {
      id: index + 1,
      chord: chord,
      quality: quality,
    };
  });
}

//Calcuate the number of semitones to transpose to the selected key
export function calculateTransposeInterval(key) {
  const baseIndex = keys.indexOf("C");
  const targetIndex = keys.indexOf(key);
  return targetIndex - baseIndex;
}

//Adjust the targeted midiKeys based on the transpose interval
export function transposeMidiKeys(midiKeys, interval) {
  return midiKeys.map((key) => key + interval);
}

function semitonesFromTonic(romanNumeral) {
  // Mapping Roman numerals (in lowercase for consistency) to their semitone offsets from the tonic in a major scale
  const semitoneMap = {
    i: 0, // Changed to lowercase
    ii: 2,
    iii: 4,
    iv: 5, // Changed to lowercase
    v: 7, // Changed to lowercase
    vi: 9,
    vii: 11,
  };

  // Convert the entire input to lowercase to ensure consistency
  const normalizedNumeral = romanNumeral.toLowerCase();

  // Return the semitone offset or 0 if not found
  return semitoneMap[normalizedNumeral] || 0;
}

export function getRootNoteName(key, semitones) {
  const keys = [
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
  const keyIndex = keys.indexOf(key);
  const noteIndex = (keyIndex + semitones) % keys.length;
  return keys[noteIndex];
}

function calculateSemitonesFromKey(key, newRootNote) {
  const keys = [
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

  const keyIndex = keys.indexOf(key);
  const newRootIndex = keys.indexOf(newRootNote);

  let semitones = newRootIndex - keyIndex;
  if (semitones < 0) {
    semitones += 12; // Ensure a positive semitone distance
  }

  return semitones;
}

//Takes the output of the spiceChordProgression function e.g. [{id: 1, chord: 'ii', quality: 'minor'},{id: 2, chord: 'V', quality: '7'},{id: 3, chord: 'I', quality: 'maj9'}]
// For each chord, returns an object e.g. {id: 3, chord: 'I', quality: 'maj9', midiKeys: [60, 64, 67, 71, 74], chordName: 'C maj9'}

export function provideChordInfo(
  progressionWithQualities,
  key,
  preserveTime = false
) {
  const keyTransposeInterval = calculateTransposeInterval(key);

  return progressionWithQualities.map((entry, index) => {
    const { id, chord, quality, newRootNote, time: existingTime } = entry;

    let midiKeys = chords[quality]?.midiKeys || [];
    midiKeys = transposeMidiKeys(midiKeys, keyTransposeInterval);

    const semitones = newRootNote
      ? calculateSemitonesFromKey(key, newRootNote)
      : semitonesFromTonic(chord);
    midiKeys = transposeMidiKeys(midiKeys, semitones);

    const rootNoteName = newRootNote || getRootNoteName(key, semitones);
    const chordName = `${rootNoteName} ${quality}`;
    const time = preserveTime && existingTime ? existingTime : `${index}m`;

    // Transpose down an octave if the lowest note is above 65
    if (Math.min(...midiKeys) > 65) {
      midiKeys = midiKeys.map((note) => note - 12);
    }

    return {
      id,
      chord,
      rootNoteName,
      quality,
      chordName,
      midiKeys,
      chordDuration: "1m",
      time,
    };
  });
}

export function adjustChordOctave(progression, selectedInstrument) {
  return progression.map((chord) => {
    let { midiKeys } = chord;
    // Adjust octave down as long as any note exceeds 65
    while (Math.min(...midiKeys) > 65) {
      midiKeys = midiKeys.map((note) => note - 12); // Shift all notes down an octave
    }
    // If the selected instrument is electric bass, lower each midiKey by an octave
    if (selectedInstrument === "electricBass") {
      midiKeys = midiKeys.map((note) => note - 12);
    }
    return { ...chord, midiKeys };
  });
}
