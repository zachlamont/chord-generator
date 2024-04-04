import React from "react";
import { qualities, keys } from "../constants/constants";
import * as Tone from "tone";

const ChordElement = ({
  chord,
  updateChordQuality,
  updateChordRoot,
  isActive,
  playChordImmediately, // Function to play a chord immediately
  setActiveChordIndex, // Function to set the active chord index
}) => {
  const handleChangeQuality = (event) => {
    event.stopPropagation(); // Prevent click event from bubbling up
    updateChordQuality(chord.id, event.target.value);
  };

  const handleChangeRoot = (event) => {
    event.stopPropagation(); // Prevent click event from bubbling up
    updateChordRoot(chord.id, event.target.value);
  };

  const handleClick = () => {
    setActiveChordIndex(chord.id - 1); // Set this chord as the active one

    // Check if the Tone.Transport is currently playing
    if (Tone.Transport.state !== "started") {
      // Play the chord immediately using the passed function if Transport is not playing
      playChordImmediately(chord.midiKeys);
    } else {
      // If the Transport is playing, just set the position to this chord's time
      Tone.Transport.position = chord.time;
    }
  };

  const style = {
    marginBottom: "10px",
    padding: "5px",
    border: "1px solid #ccc",
    backgroundColor: isActive ? "#fffd90" : "transparent", // Highlight if active
    cursor: "pointer", // Indicate clickable
    transition: "background-color 0.3s ease", // Smooth transition
  };

  return (
    <div style={style}>
      <div onClick={handleClick}>
        {" "}
        {/* Add the click event listener to this div */}
        <div>ID: {chord.id}</div>
        <div>Chord: {chord.chord}</div>
        <div>Name: {chord.chordName}</div>
        <div>MIDI Keys: {chord.midiKeys.join(", ")}</div>
        <div>Duration: {chord.chordDuration}</div>
        <div>Time: {chord.time}</div>
      </div>
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
    </div>
  );
};

export default ChordElement;
