import React, { useState, useEffect, useCallback } from "react";
import GenreDropdown from "./GenreDropdown";
import ProgressionDropdown from "./ProgressionDropdown";
import ChordQualitySelector from "./ChordQualitySelector";
import BpmSelector from "./BpmSelector";
import KeySelector from "./KeySelector"; // Import the KeySelector component
import { progressions } from "../constants/constants";
import {
  spiceChordProgression,
  provideChordInfo,
} from "../utils/chordUtilities";

const ChordProgressionGenerator = () => {
  const [genre, setGenre] = useState("Jazz");
  const [selectedProgressionId, setSelectedProgressionId] = useState(1);
  const [isExtendedChords, setIsExtendedChords] = useState(true);
  const [isSeventhChords, setIsSeventhChords] = useState(true);
  const [selectedBPM, setSelectedBPM] = useState(100);
  const [selectedKey, setSelectedKey] = useState("C"); // State for selected key
  const [processedProgression, setProcessedProgression] = useState([]);

  // Effect to reset progressionId when genre changes
  useEffect(() => {
    setSelectedProgressionId(1);
  }, [genre]);

  const updateChordProgression = useCallback(() => {
    const foundProgression = progressions.progressions
      .find((p) => p.genre === genre)
      ?.chordProgressions.find(
        (prog) => prog.id === selectedProgressionId
      )?.chords;
    if (foundProgression) {
      const processed = spiceChordProgression(
        foundProgression,
        genre,
        isExtendedChords,
        isSeventhChords
      );
      const translated = provideChordInfo(processed, selectedKey); // Use selectedKey
      setProcessedProgression(translated);
    }
  }, [
    genre,
    selectedProgressionId,
    isExtendedChords,
    isSeventhChords,
    selectedKey,
  ]);

  useEffect(() => {
    updateChordProgression();
  }, [updateChordProgression]);

  return (
    <div>
      <h1>Chord Progression Generator</h1>
      <GenreDropdown selectedGenre={genre} setSelectedGenre={setGenre} />
      <ProgressionDropdown
        genre={genre}
        selectedProgressionId={selectedProgressionId}
        setSelectedProgressionId={setSelectedProgressionId}
      />
      <ChordQualitySelector
        setIsExtendedChords={setIsExtendedChords}
        setIsSeventhChords={setIsSeventhChords}
      />
      <BpmSelector selectedBPM={selectedBPM} setSelectedBPM={setSelectedBPM} />
      <KeySelector
        selectedKey={selectedKey}
        setSelectedKey={setSelectedKey}
      />{" "}
      <div>
        <h2>Chord Progression (Key of {selectedKey})</h2>
        <ul>
          {processedProgression.map((chord) => (
            <li key={chord.id}>
              Chord: {chord.chord}, Quality: {chord.quality}, Name:{" "}
              {chord.chordName}, MIDI Keys: {chord.midiKeys.join(", ")}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ChordProgressionGenerator;
