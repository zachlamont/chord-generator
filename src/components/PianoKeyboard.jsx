import React from "react";

const PianoKeyboard = ({ processedProgression, activeChordIndex }) => {
  // MIDI note numbers for C3 to C6, adjusting for natural and accidental notes
  const midiNotesRange = Array.from({ length: 37 }, (_, i) => 48 + i);
  const activeChordMidiKeys =
    processedProgression[activeChordIndex]?.midiKeys || [];

  // Identify if a given MIDI note is accidental (sharp/flat)
  const isAccidentalKey = (midiNote) => {
    // MIDI numbers for accidentals within an octave, repeating pattern
    const accidentals = [1, 3, 6, 8, 10]; // Relative to C in any octave (C=0, C#=1, D=2, etc.)
    return accidentals.includes((midiNote - 48) % 12);
  };

  // Render keys with correct positioning
  const renderKeys = () => {
    let keys = [];
    let lastNaturalKeyOffset = 0; // Track the offset to position black keys correctly

    midiNotesRange.forEach((midiNote) => {
      const isAccidental = isAccidentalKey(midiNote);
      const isActive = activeChordMidiKeys.includes(midiNote);

      if (isAccidental) {
        keys.push(
          <div
            key={midiNote}
            className={`key accidental ${isActive ? "active" : ""}`}
            style={{ left: `${lastNaturalKeyOffset - 10}px` }} // Adjust left offset for black keys
          ></div>
        );
      } else {
        keys.push(
          <div
            key={midiNote}
            className={`key natural ${isActive ? "active" : ""}`}
          ></div>
        );
        lastNaturalKeyOffset += 22; // Increment offset after each white key
      }
    });

    return keys;
  };

  return <div className="piano">{renderKeys()}</div>;
};

export default PianoKeyboard;
