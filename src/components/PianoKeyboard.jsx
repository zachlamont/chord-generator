import React, { useState, useEffect } from "react";
import * as Tone from "tone";

const PianoKeyboard = ({
  processedProgression,
  activeChordIndex,
  selectedMidiInput,
  sampler, // Receive the sampler instance via props
}) => {
  const [activeNotes, setActiveNotes] = useState([]);
  const [isMouseDown, setIsMouseDown] = useState(false); // Track if the mouse is pressed down

  // MIDI input handling
  useEffect(() => {
    const handleNoteOn = (e) => {
      playNote(e.note.number);
    };

    const handleNoteOff = (e) => {
      stopNote(e.note.number);
    };

    if (selectedMidiInput) {
      selectedMidiInput.addListener("noteon", "all", handleNoteOn);
      selectedMidiInput.addListener("noteoff", "all", handleNoteOff);
    }

    return () => {
      if (selectedMidiInput) {
        selectedMidiInput.removeListener("noteon", "all", handleNoteOn);
        selectedMidiInput.removeListener("noteoff", "all", handleNoteOff);
      }
    };
  }, [selectedMidiInput]);

  // Function to play a note
  const playNote = (midiNumber) => {
    if (!sampler) return; // Ensure there's a sampler instance available
    const note = Tone.Frequency(midiNumber, "midi").toNote();
    sampler.triggerAttack(note, Tone.now());
    setActiveNotes((prev) => [...prev, midiNumber]);
  };

  // Function to stop a note
  const stopNote = (midiNumber) => {
    if (!sampler) return; // Ensure there's a sampler instance available
    const note = Tone.Frequency(midiNumber, "midi").toNote();
    sampler.triggerRelease(note, Tone.now());
    setActiveNotes((prev) => prev.filter((note) => note !== midiNumber));
  };

  // Determine if a MIDI note is an accidental (sharp/flat)
  const isAccidentalKey = (midiNote) => {
    const accidentals = [1, 3, 6, 8, 10];
    return accidentals.includes((midiNote - 48) % 12);
  };

  const activeChordMidiKeys =
    processedProgression[activeChordIndex]?.midiKeys || [];

  // Render piano keys
  const renderKeys = () => {
    let keys = [];
    let lastNaturalKeyOffset = 0;
    const midiNotesRange = Array.from({ length: 37 }, (_, i) => 48 + i);

    midiNotesRange.forEach((midiNote) => {
      const isAccidental = isAccidentalKey(midiNote);
      const isActiveChordNote = activeChordMidiKeys.includes(midiNote);
      const isCurrentlyActive = activeNotes.includes(midiNote);
      const keyClass = `key ${isAccidental ? "accidental" : "natural"} ${
        isActiveChordNote || isCurrentlyActive ? "active" : ""
      }`;

      keys.push(
        <div
          key={midiNote}
          className={keyClass}
          style={isAccidental ? { left: `${lastNaturalKeyOffset - 10}px` } : {}}
          onMouseDown={() => {
            setIsMouseDown(true);
            playNote(midiNote);
          }}
          onMouseUp={() => {
            setIsMouseDown(false);
            stopNote(midiNote);
          }}
          onMouseEnter={() => {
            if (isMouseDown) playNote(midiNote);
          }}
          onMouseLeave={() => stopNote(midiNote)}
        ></div>
      );

      if (!isAccidental) {
        lastNaturalKeyOffset += 22;
      }
    });

    return keys;
  };

  // Listen for global mouse up events to handle cases where the mouse is released outside of a key
  useEffect(() => {
    const handleMouseUp = () => setIsMouseDown(false);
    window.addEventListener("mouseup", handleMouseUp);

    return () => window.removeEventListener("mouseup", handleMouseUp);
  }, []);

  return (
    <div className="piano" onMouseLeave={() => setIsMouseDown(false)}>
      {renderKeys()}
    </div>
  );
};

export default PianoKeyboard;
