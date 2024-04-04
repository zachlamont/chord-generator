import React, { useEffect, useRef, useCallback } from "react";
import * as Tone from "tone";
import { SAMPLER_INSTRUMENTS } from "../constants/constants";

const ChordPlayer = ({
  processedProgression,
  isPlaying,
  togglePlayback,
  bpm,
  selectedInstrument,
  setActiveChordIndex,
  setPlayChordImmediately, // Use this to expose playChordImmediately function
}) => {
  const samplerRef = useRef(null);

  // New function to play a chord immediately
  const playChordImmediately = useCallback((midiKeys) => {
    if (samplerRef.current) {
      midiKeys.forEach((midiKey) => {
        const note = Tone.Frequency(midiKey, "midi").toNote();
        samplerRef.current.triggerAttackRelease(note, "1m"); // Play each note for 1 measure
      });
    }
  }, []);

  useEffect(() => {
    // Initialize Tone.Sampler with selected instrument samples
    samplerRef.current = new Tone.Sampler(
      SAMPLER_INSTRUMENTS[selectedInstrument].samples,
      {
        baseUrl: `/Samples/${selectedInstrument}/`,
        onload: () => console.log(`${selectedInstrument} samples loaded`),
      }
    ).toDestination();

    // Schedule the chord progression playback
    processedProgression.forEach((chord, index) => {
      Tone.Transport.schedule((time) => {
        chord.midiKeys.forEach((midiKey) => {
          const note = Tone.Frequency(midiKey, "midi").toNote();
          samplerRef.current.triggerAttackRelease(
            note,
            chord.chordDuration,
            time
          );
        });
        setActiveChordIndex(index);
      }, chord.time);
    });

    // Configure looping of the progression
    Tone.Transport.loop = true;
    Tone.Transport.loopStart = 0;
    Tone.Transport.loopEnd = `${processedProgression.length}m`;
    Tone.Transport.bpm.value = bpm;

    // Expose the playChordImmediately function to the parent component
    setPlayChordImmediately(() => playChordImmediately);

    return () => {
      samplerRef.current?.dispose();
      Tone.Transport.cancel(0);
    };
  }, [
    processedProgression,
    bpm,
    selectedInstrument,
    setActiveChordIndex,
    setPlayChordImmediately,
  ]);

  useEffect(() => {
    if (isPlaying) {
      Tone.Transport.start();
    } else {
      Tone.Transport.pause();
    }
  }, [isPlaying]);

  return (
    <div>
      <button onClick={togglePlayback}>{isPlaying ? "Pause" : "Play"}</button>
    </div>
  );
};

export default ChordPlayer;
