import React, { useEffect, useCallback } from "react";
import * as Tone from "tone";

const ChordPlayer = ({
  processedProgression,
  isPlaying,
  togglePlayback,
  bpm,
  setActiveChordIndex,
  setPlayChordImmediately,
  sampler, // Receive the sampler instance via props
}) => {
  // Effect for playing chords based on progression, responding to bpm changes, etc.
  useEffect(() => {
    if (!sampler) return; // Ensure there's a sampler instance available

    // Setup transport bpm and progression scheduling
    Tone.Transport.bpm.value = bpm;
    processedProgression.forEach((chord, index) => {
      Tone.Transport.schedule((time) => {
        chord.midiKeys.forEach((midiKey) => {
          const note = Tone.Frequency(midiKey, "midi").toNote();
          sampler.triggerAttackRelease(note, chord.chordDuration, time);
        });
        setActiveChordIndex(index);
      }, chord.time);
    });

    // Setup transport looping
    Tone.Transport.loop = true;
    Tone.Transport.loopStart = 0;
    Tone.Transport.loopEnd = `${processedProgression.length}m`;

    // Cleanup: Cancel scheduled events on cleanup
    return () => Tone.Transport.cancel(0);
  }, [processedProgression, bpm, setActiveChordIndex, sampler]);

  // Handle play/pause changes
  useEffect(() => {
    if (isPlaying) {
      Tone.Transport.start();
    } else {
      Tone.Transport.pause();
    }
  }, [isPlaying]);

  // Define playChordImmediately function
  const playChordImmediately = useCallback(
    (midiKeys) => {
      if (!sampler) return; // Ensure there's a sampler instance available
      midiKeys.forEach((midiKey) => {
        const note = Tone.Frequency(midiKey, "midi").toNote();
        sampler.triggerAttackRelease(note, "1m"); // Example duration
      });
    },
    [sampler]
  );

  // Expose playChordImmediately function via useState hook or similar mechanism
  useEffect(() => {
    setPlayChordImmediately(() => playChordImmediately);
  }, [playChordImmediately, setPlayChordImmediately]);

  return (
    <div>
      <button onClick={togglePlayback}>{isPlaying ? "Pause" : "Play"}</button>
    </div>
  );
};

export default ChordPlayer;
