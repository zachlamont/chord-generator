import React, { useEffect, useRef } from "react";
import * as Tone from "tone";
import { SAMPLER_INSTRUMENTS } from "../constants/constants";

const ChordPlayer = ({
  processedProgression,
  isPlaying,
  togglePlayback,
  bpm,
  selectedInstrument, // Include selectedInstrument in the props
  setActiveChordIndex, // New prop for updating active chord index
}) => {
  const samplerRef = useRef(null);

  useEffect(() => {
    Tone.Transport.bpm.value = bpm;

    if (samplerRef.current) {
      samplerRef.current.dispose();
    }

    samplerRef.current = new Tone.Sampler(
      SAMPLER_INSTRUMENTS[selectedInstrument].samples,
      {
        baseUrl: `/Samples/${selectedInstrument}/`,
        onload: () => {
          // Define the function to play chords and trigger UI update
          const playChord = (time, { note, dur, index }) => {
            if (Array.isArray(note)) {
              note.forEach((singleNote) => {
                samplerRef.current.triggerAttackRelease(
                  Tone.Frequency(singleNote, "midi"),
                  dur,
                  time
                );
              });
            } else {
              samplerRef.current.triggerAttackRelease(
                Tone.Frequency(note, "midi"),
                dur,
                time
              );
            }
            setActiveChordIndex(index); // Update the active chord index
          };

          // Clear previous schedules
          Tone.Transport.cancel(0);

          // Schedule chords for playback and UI update
          processedProgression.forEach((chord, index) => {
            Tone.Transport.schedule((time) => {
              playChord(time, {
                note: chord.midiKeys,
                dur: chord.chordDuration,
                index,
              });
            }, chord.time);
          });

          Tone.Transport.loop = true;
          Tone.Transport.loopStart = 0;
          Tone.Transport.loopEnd = `${processedProgression.length}m`;
        },
      }
    ).toDestination();
  }, [processedProgression, bpm, selectedInstrument, setActiveChordIndex]); // Add setActiveChordIndex to dependency array

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
