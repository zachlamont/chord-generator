import React, { useState, useEffect, useCallback } from "react";
import * as Tone from "tone";
import { WebMidi } from "webmidi";
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
  adjustChordOctave,
} from "../utils/chordUtilities";
import ChordVisualiser from "./ChordVisualiser";
import InstrumentDropdown from "./InstrumentDropdown";
import MidiInstrumentDropdown from "./MidiInstrumentDropdown";
import PianoKeyboard from "./PianoKeyboard";

const ChordProgressionGenerator = () => {
  const [genre, setGenre] = useState("Jazz");
  const [selectedProgressionId, setSelectedProgressionId] = useState(1);
  const [isExtendedChords, setIsExtendedChords] = useState(false);
  const [isSeventhChords, setIsSeventhChords] = useState(true);
  const [selectedBPM, setSelectedBPM] = useState(100);
  const [selectedKey, setSelectedKey] = useState("C");
  const [processedProgression, setProcessedProgression] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false); // State to control playback
  const [selectedInstrument, setSelectedInstrument] = useState("piano");
  const [activeChordIndex, setActiveChordIndex] = useState(null); // Add state to track active chord
  const [midiInputs, setMidiInputs] = useState([]);
  const [selectedMidiInput, setSelectedMidiInput] = useState(null);
  const [playChordImmediately, setPlayChordImmediately] = useState(null);

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

  const handleChordUpdate = (chordId, newQuality, selectedInstrument) => {
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
      updatedProgression = adjustChordOctave(
        updatedProgression,
        selectedInstrument
      ); // Apply octave adjustment here
    }

    // Update the state with the new, recalculated progression
    setProcessedProgression(updatedProgression);
  };

  // Assuming you have a handler for key selection changes
  const handleKeyChange = (newKey, selectedInstrument) => {
    setSelectedKey(newKey); // Update the key state

    // Recalculate chord progression for the new key
    let recalculatedProgression = provideChordInfo(
      processedProgression,
      newKey,
      true
    );
    recalculatedProgression = adjustChordOctave(
      recalculatedProgression,
      selectedInstrument
    ); // Adjust octaves as needed

    setProcessedProgression(recalculatedProgression); // Update the progression state with adjustments
  };

  const handleChordRootChange = (chordId, newRoot, selectedInstrument) => {
    // Find and update the specific chord with the new root note
    let updatedProgression = processedProgression.map((chord) =>
      chord.id === chordId ? { ...chord, newRootNote: newRoot } : chord
    );

    // Recalculate the chord details with the new root information
    const newProgression = provideChordInfo(
      updatedProgression,
      selectedKey,
      true
    );
    updatedProgression = adjustChordOctave(newProgression, selectedInstrument); // Apply octave adjustment here

    // Update the state with the newly calculated progression
    setProcessedProgression(updatedProgression);
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
      let translated = provideChordInfo(processed, selectedKey);
      let updatedProgression = adjustChordOctave(
        translated,
        selectedInstrument
      ); // Ensure octave adjustment is applied
      setProcessedProgression(updatedProgression);
    }
  }, [
    genre,
    selectedProgressionId,
    isExtendedChords,
    isSeventhChords,
    selectedKey,
    selectedInstrument,
  ]);

  useEffect(() => {
    updateChordProgression();
  }, [updateChordProgression]);

  useEffect(() => {
    WebMidi.enable()
      .then(() => {
        setMidiInputs(WebMidi.inputs);

        // Optionally, auto-select the first input or restore a saved preference
      })
      .catch((err) => console.error("WebMidi could not be enabled.", err));
  }, []);

  return (
    <div>
      <h1>Chord Progression Generator</h1>
      <MidiInstrumentDropdown
        midiInputs={midiInputs}
        selectedMidiInput={selectedMidiInput}
        setSelectedMidiInput={setSelectedMidiInput}
      />
      <GenreDropdown selectedGenre={genre} setSelectedGenre={setGenre} />
      <ProgressionDropdown
        genre={genre}
        selectedProgressionId={selectedProgressionId}
        setSelectedProgressionId={setSelectedProgressionId}
      />
      <InstrumentDropdown
        selectedInstrument={selectedInstrument}
        setSelectedInstrument={setSelectedInstrument}
      />
      <ChordQualitySelector
        isExtendedChords={isExtendedChords}
        isSeventhChords={isSeventhChords}
        setIsExtendedChords={setIsExtendedChords}
        setIsSeventhChords={setIsSeventhChords}
      />
      <BpmSelector selectedBPM={selectedBPM} setSelectedBPM={setSelectedBPM} />
      <KeySelector selectedKey={selectedKey} setSelectedKey={handleKeyChange} />
      {/* Pass processedProgression and playback control function to ChordPlayer */}
      <ChordPlayer
        processedProgression={processedProgression}
        isPlaying={isPlaying}
        togglePlayback={togglePlayback}
        bpm={selectedBPM} // Pass the selectedBPM as props to ChordPlayer
        selectedInstrument={selectedInstrument}
        setActiveChordIndex={setActiveChordIndex} // Pass function to update active chord index
        setPlayChordImmediately={setPlayChordImmediately} // Pass a prop to receive the playChordImmediately function
      />
      <ChordVisualiser
        processedProgression={processedProgression}
        updateChordQuality={handleChordUpdate}
        updateChordRoot={handleChordRootChange} // Make sure this is correctly passed
        activeChordIndex={activeChordIndex}
        playChordImmediately={playChordImmediately} // Pass playChordImmediately function down to ChordVisualiser
        setActiveChordIndex={setActiveChordIndex}
      />
      <PianoKeyboard
        processedProgression={processedProgression}
        activeChordIndex={activeChordIndex}
        selectedInstrument={selectedInstrument}
        selectedMidiInput={selectedMidiInput}
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
