import React, { useEffect, useRef } from "react";
import * as Tone from "tone";
import { SAMPLER_INSTRUMENTS } from "../constants/constants";

const ChordPlayer = ({
  processedProgression,
  isPlaying,
  togglePlayback,
  bpm,
  selectedInstrument, // Include selectedInstrument in the props
}) => {
  const samplerRef = useRef(null);

  useEffect(() => {
    // Setup Tone.Transport with the selected BPM
    Tone.Transport.bpm.value = bpm;

    // If a sampler already exists, dispose of it to avoid duplicates
    if (samplerRef.current) {
      samplerRef.current.dispose();
    }
    console.log(selectedInstrument);
    // Initialize the sampler with the correct samples and base URL
    samplerRef.current = new Tone.Sampler(
      SAMPLER_INSTRUMENTS[selectedInstrument].samples,
      {
        baseUrl: `/Samples/${selectedInstrument}/`, // Simplified baseUrl
        onload: () => {
          console.log(`${selectedInstrument} samples loaded`);
          // Define the function to play chords
          const playChord = (time, { note, dur }) => {
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
          };

          // Clear previous schedule to avoid duplicates
          Tone.Transport.cancel(0);

          // Schedule chords for playback
          processedProgression.forEach(({ time, midiKeys, chordDuration }) => {
            midiKeys.forEach((midiKey) => {
              Tone.Transport.schedule((time) => {
                playChord(time, { note: [midiKey], dur: chordDuration });
              }, time);
            });
          });

          // Configure looping
          Tone.Transport.loop = true;
          Tone.Transport.loopStart = 0;
          Tone.Transport.loopEnd = `${processedProgression.length}m`;
        },
      }
    ).toDestination();
  }, [processedProgression, bpm, selectedInstrument]); // React to changes in the progression or BPM

  useEffect(() => {
    // Control playback
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
