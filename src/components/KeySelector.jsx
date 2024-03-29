import React from "react";

// Assuming keys array is imported or defined here
const keys = ["C", "C#", "D", "Eb", "E", "F", "F#", "G", "Ab", "A", "Bb", "B"];

const KeySelector = ({ selectedKey, setSelectedKey }) => {
  return (
    <div>
      <label htmlFor="key-selector">Select Key: </label>
      <select
        id="key-selector"
        value={selectedKey}
        onChange={(e) => setSelectedKey(e.target.value)}
      >
        {keys.map((key) => (
          <option key={key} value={key}>
            {key}
          </option>
        ))}
      </select>
    </div>
  );
};

export default KeySelector;
