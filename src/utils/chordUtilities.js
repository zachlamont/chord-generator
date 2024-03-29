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

  return progression.map((chord, index) => {
    const quality = spiceFunction(chord, isExtendedChords, isSeventhChords);
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

// Accepts a roman numeral e.g. 'I', 'ii', 'iii', etc. and returns the scale degree (1 for I, 2 for ii, etc.)
export function romanNumeralToScaleDegree(chord) {
  const numerals = ["I", "ii", "iii", "IV", "V", "vi", "vii"];
  const index = numerals.findIndex(
    (numeral) => numeral.toLowerCase() === chord.toLowerCase()
  );
  return index + 1;
}

// Accepts a scale degree e.g. '2' and outputs the root note (e.g. 'D') based on the key selected by the user.
export function getRootNoteName(key, scaleDegree) {
  const keyIndex = keys.indexOf(key);
  const noteIndex = (keyIndex + scaleDegree - 1) % keys.length;
  return keys[noteIndex];
}

//Takes the output of the spiceChordProgression function e.g. [{id: 1, chord: 'ii', quality: 'minor'},{id: 2, chord: 'V', quality: '7'},{id: 3, chord: 'I', quality: 'maj9'}]
// For each chord, returns an object e.g. {id: 3, chord: 'I', quality: 'maj9', midiKeys: [60, 64, 67, 71, 74], chordName: 'C maj9'}
export function provideChordInfo(progressionWithQualities, key) {
  const interval = calculateTransposeInterval(key);

  return progressionWithQualities.map((entry) => {
    const { id, chord, quality } = entry;
    let midiKeys = chords[quality]?.midiKeys || [];
    midiKeys = transposeMidiKeys(midiKeys, interval);

    const scaleDegree = romanNumeralToScaleDegree(chord);
    const rootNoteName = getRootNoteName(key, scaleDegree);
    const chordName = `${rootNoteName} ${quality}`; // Combine root note and quality

    // Example duration of 1 bar ("1m" in Tone.js notation)
    const chordDuration = "1m";

    // Include chordDuration in the returned object
    return { id, chord, quality, midiKeys, chordName, chordDuration };
  });
}
