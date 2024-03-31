import React, { useEffect, useRef } from "react";
import * as Tone from "tone";

const ChordPlayer = ({ processedProgression, isPlaying, togglePlayback }) => {
  const partRef = useRef(null);
  const samplerRef = useRef(null);

  useEffect(() => {
    // Dispose of existing part and sampler if they exist
    if (partRef.current) {
      partRef.current.stop();
      partRef.current.dispose();
    }
    if (samplerRef.current) {
      samplerRef.current.dispose();
    }

    // Initialize the sampler and part only once - when the component mounts
    const newSampler = new Tone.Sampler(
      {
        A1: "A1.mp3",
        A2: "A2.mp3",
      },
      {
        baseUrl: "https://tonejs.github.io/audio/casio/",
        onload: () => {
          // Function to handle playing chords
          const playChord = (time, { note, dur }) => {
            if (Array.isArray(note)) {
              // If 'note' is an array, iterate over each note and play it
              note.forEach((singleNote) => {
                newSampler.triggerAttackRelease(
                  Tone.Frequency(singleNote, "midi"),
                  dur,
                  time
                );
              });
            } else {
              // If 'note' is a single value, play it directly
              newSampler.triggerAttackRelease(
                Tone.Frequency(note, "midi"),
                dur,
                time
              );
            }
          };

          // Map each chord to a part event
          const partNotes = processedProgression.map((chord) => ({
            time: chord.time,
            note: chord.midiKeys, // This is an array of MIDI note numbers
            dur: chord.chordDuration,
          }));

          const newPart = new Tone.Part(playChord, partNotes);
          newPart.start(0);

          // Update refs
          partRef.current = newPart;
          samplerRef.current = newSampler;

          // Set loop properties
          Tone.Transport.loop = true;
          // Assuming each chord has a duration of "1m" and starts at "0m", "1m", "2m", etc.
          Tone.Transport.loopEnd = `${processedProgression.length}m`;

          return () => {
            newPart.stop();
            newPart.dispose();
            newSampler.dispose();
          };
        },
      }
    ).toDestination();

    // Removed setIsPlaying and togglePlayback from inside useEffect
  }, [processedProgression]); // Dependency on processedProgression

  useEffect(() => {
    // Start or pause the transport based on isPlaying state
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
