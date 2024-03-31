import React, { useState, useEffect, useCallback } from "react";
import * as Tone from "tone";
import GenreDropdown from "./GenreDropdown";
import ProgressionDropdown from "./ProgressionDropdown";
import ChordQualitySelector from "./ChordQualitySelector";
import BpmSelector from "./BpmSelector";
import KeySelector from "./KeySelector";
import ChordPlayer from "./ChordPlayer";
import { progressions } from "../constants/constants";
import {
  spiceChordProgression,
  provideChordInfo,
} from "../utils/chordUtilities";
import ChordVisualiser from "./ChordVisualiser";

const ChordProgressionGenerator = () => {
  const [genre, setGenre] = useState("Jazz");
  const [selectedProgressionId, setSelectedProgressionId] = useState(1);
  const [isExtendedChords, setIsExtendedChords] = useState(true);
  const [isSeventhChords, setIsSeventhChords] = useState(true);
  const [selectedBPM, setSelectedBPM] = useState(100);
  const [selectedKey, setSelectedKey] = useState("C");
  const [processedProgression, setProcessedProgression] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false); // State to control playback

  // Toggle playback control
  const togglePlayback = async () => {
    await Tone.start(); // Start Tone.js in response to user gesture
    if (!isPlaying) {
      Tone.Transport.start();
    } else {
      Tone.Transport.pause();
    }
    setIsPlaying(!isPlaying);
  };

  const handleChordUpdate = (chordId, newQuality) => {
    // Create a copy of the current progression to avoid direct state mutation
    let updatedProgression = [...processedProgression];

    // Find the chord that needs updating
    const chordToUpdateIndex = updatedProgression.findIndex(
      (chord) => chord.id === chordId
    );

    if (chordToUpdateIndex !== -1) {
      // Update the quality of the found chord
      updatedProgression[chordToUpdateIndex] = {
        ...updatedProgression[chordToUpdateIndex],
        quality: newQuality,
      };

      // Recalculate the chord information for the entire progression to ensure consistency
      // Especially important if chord qualities affect other chords or if future functionality depends on overall progression
      // Set `preserveTime` to true to maintain existing chord timings
      updatedProgression = provideChordInfo(
        updatedProgression,
        selectedKey,
        true
      );
    }

    // Update the state with the new, recalculated progression
    setProcessedProgression(updatedProgression);
  };

  const handleChordRootChange = (chordId, newRoot) => {
    // Find and update the specific chord with the new root note
    const updatedProgression = processedProgression.map((chord) =>
      chord.id === chordId ? { ...chord, newRootNote: newRoot } : chord
    );

    // Recalculate the chord details with the new root information
    const newProgression = provideChordInfo(
      updatedProgression,
      selectedKey,
      true
    );

    // Update the state with the newly calculated progression
    setProcessedProgression(newProgression);
  };

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
      const translated = provideChordInfo(processed, selectedKey);
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
      <KeySelector selectedKey={selectedKey} setSelectedKey={setSelectedKey} />
      {/* Pass processedProgression and playback control function to ChordPlayer */}
      <ChordPlayer
        processedProgression={processedProgression}
        isPlaying={isPlaying}
        togglePlayback={togglePlayback}
        bpm={selectedBPM} // Pass the selectedBPM as props to ChordPlayer
      />
      <ChordVisualiser
        processedProgression={processedProgression}
        updateChordQuality={handleChordUpdate}
        updateChordRoot={handleChordRootChange} // Make sure this is correctly passed
      />

      <div>
        <h2>Chord Progression (Key of {selectedKey})</h2>
        <ul>
          {processedProgression.map((chord) => (
            <li key={chord.id}>
              ID: {chord.id}, Chord: {chord.chord}, Root: {chord.rootNoteName},
              Quality: {chord.quality}, Name: {chord.chordName}, MIDI Keys:{" "}
              {chord.midiKeys.join(", ")}, Duration: {chord.chordDuration},
              Time:{chord.time}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ChordProgressionGenerator;
