import React, { useCallback, useState } from "react";
import { Midi } from "@tonejs/midi";

const MidiExport = ({ processedProgression, selectedBPM }) => {
  const handleExport = useCallback(() => {
    const midi = new Midi();
    midi.header.setTempo(selectedBPM);
    const track = midi.addTrack();
    const beatsPerMeasure = 4;

    processedProgression.forEach((chord) => {
      const startTime =
        ((parseFloat(chord.time.replace("m", "")) * 60) / selectedBPM) * 4; // Assuming 4/4 time
      const duration = (60 / selectedBPM) * beatsPerMeasure;

      chord.midiKeys.forEach((midiKey) => {
        track.addNote({
          midi: midiKey,
          time: startTime,
          duration: duration,
        });
      });
    });

    const midiArray = new Uint8Array(midi.toArray());
    const blob = new Blob([midiArray], { type: "audio/midi" });
    const url = URL.createObjectURL(blob);

    // Generate a file name based on the chord names
    const fileName =
      processedProgression.map((chord) => chord.chordName).join("_") + ".midi";

    // Create a temporary anchor element and programmatically click it to trigger the download
    const a = document.createElement("a");
    document.body.appendChild(a);
    a.style = "display: none";
    a.href = url;
    a.download = fileName;
    a.click();
    window.URL.revokeObjectURL(url); // Clean up
    a.remove();
  }, [processedProgression, selectedBPM]);

  return (
    <button onClick={handleExport} className="btn-export">
      Export MIDI
    </button>
  );
};

export default MidiExport;
