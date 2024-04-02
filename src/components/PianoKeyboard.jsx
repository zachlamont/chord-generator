import React, { useEffect, useRef, useState } from "react";
import * as Tone from "tone";
import { SAMPLER_INSTRUMENTS } from "../constants/constants";

const PianoKeyboard = ({
  processedProgression,
  activeChordIndex,
  selectedInstrument,
}) => {
  const noteSamplerRef = useRef(null);
  const [activeNotes, setActiveNotes] = useState([]);
  const [isMouseDown, setIsMouseDown] = useState(false); // Track if the mouse is pressed down

  // Initialize the sampler for the selected instrument
  useEffect(() => {
    noteSamplerRef.current = new Tone.Sampler(
      SAMPLER_INSTRUMENTS[selectedInstrument].samples,
      {
        baseUrl: `/Samples/${selectedInstrument}/`,
        onload: () =>
          console.log(`${selectedInstrument} samples loaded for PianoKeyboard`),
      }
    ).toDestination();

    return () => noteSamplerRef.current?.dispose();
  }, [selectedInstrument]);

  // Function to play a note
  const playNote = (midiNumber) => {
    const note = Tone.Frequency(midiNumber, "midi").toNote();
    noteSamplerRef.current.triggerAttack(note, Tone.now());
    setActiveNotes((prev) => [...prev, midiNumber]);
  };

  // Function to stop a note
  const stopNote = (midiNumber) => {
    const note = Tone.Frequency(midiNumber, "midi").toNote();
    noteSamplerRef.current.triggerRelease(note, Tone.now());
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
