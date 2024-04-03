import React from "react";

const MidiInstrumentDropdown = ({
  midiInputs,
  selectedMidiInput,
  setSelectedMidiInput,
}) => {
  const handleChange = (event) => {
    const selectedInput = midiInputs.find(
      (input) => input.id === event.target.value
    );
    setSelectedMidiInput(selectedInput);
  };

  

  return (
    <div>
      <label htmlFor="midi-input-select">MIDI Input:</label>
      <select
        id="midi-input-select"
        value={selectedMidiInput?.id || ""}
        onChange={handleChange}
      >
        <option value="">Select MIDI Input</option>
        {midiInputs.map((input) => (
          <option key={input.id} value={input.id}>
            {input.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default MidiInstrumentDropdown;
