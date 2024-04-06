import React, { useState, useEffect } from "react";
import { progressions } from "../constants/constants"; // Adjust path as needed
import {
  spiceChordProgression,
  provideChordInfo,
} from "../utils/chordUtilities";

const JazzChordProgressionComponent = () => {
  const [processedProgression, setProcessedProgression] = useState([]);

  useEffect(() => {
    // Fetching the first jazz progression for demonstration; adjust as needed
    const jazzProgression = progressions.progressions.find(
      (p) => p.genre === "Jazz"
    ).chordProgressions[0].chords;

    // Process the jazz progression through the jazz chord enhancement functions
    const processed = spiceChordProgression(
      jazzProgression,
      "Jazz",
      true,
      true
    );

    const translated = provideChordInfo(processed, "C"); // Key of C

    setProcessedProgression(translated);
  }, []);

  return (
    <div>
      <h2>Jazz Chord Progression (Key of C)</h2>
      <ul>
        {processedProgression.map((chord) => (
          <li key={chord.id}>
            Chord: {chord.chord}, Quality: {chord.quality}, Name:{" "}
            {chord.chordName}, MIDI Keys: {chord.midiKeys.join(", ")}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default JazzChordProgressionComponent;
