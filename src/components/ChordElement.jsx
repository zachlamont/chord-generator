import React from "react";
import { qualities } from "../constants/constants"; // Ensure the correct path
import { keys } from "../constants/constants"; // Ensure this path matches where your keys are defined

const ChordElement = ({ chord, updateChordQuality, updateChordRoot }) => {
  const handleChangeQuality = (event) => {
    updateChordQuality(chord.id, event.target.value);
  };

  const handleChangeRoot = (event) => {
    updateChordRoot(chord.id, event.target.value);
  };

  return (
    <div
      style={{ marginBottom: "10px", padding: "5px", border: "1px solid #ccc" }}
    >
      <div>ID: {chord.id}</div>
      <div>Chord: {chord.chord}</div>
      <div>
        Root:
        <select value={chord.rootNoteName} onChange={handleChangeRoot}>
          {keys.map((note) => (
            <option key={note} value={note}>
              {note}
            </option>
          ))}
        </select>
      </div>
      <div>
        Quality:
        <select
          value={chord.quality}
          onChange={handleChangeQuality}
          style={{ marginLeft: "5px" }}
        >
          {qualities.map((quality) => (
            <option key={quality} value={quality}>
              {quality}
            </option>
          ))}
        </select>
      </div>
      <div>Name: {chord.chordName}</div>
      <div>MIDI Keys: {chord.midiKeys.join(", ")}</div>
      <div>Duration: {chord.chordDuration}</div>
      <div>Time: {chord.time}</div>
    </div>
  );
};

export default ChordElement;
