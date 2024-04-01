import React from "react";
import { SAMPLER_INSTRUMENTS } from "../constants/constants";

const InstrumentDropdown = ({ selectedInstrument, setSelectedInstrument }) => {
  // Convert the SAMPLER_INSTRUMENTS object into an array of objects
  // Each object will have 'key' (instrument identifier) and 'name' (display name) properties
  const instrumentOptions = Object.entries(SAMPLER_INSTRUMENTS).map(
    ([key, value]) => ({
      key,
      name: value.name,
    })
  );

  const handleChange = (event) => {
    setSelectedInstrument(event.target.value);
  };

  return (
    <div>
      <label htmlFor="instrument-select">Choose an instrument:</label>
      <select
        id="instrument-select"
        value={selectedInstrument}
        onChange={handleChange}
      >
        {instrumentOptions.map((instrument) => (
          <option key={instrument.key} value={instrument.key}>
            {instrument.name} {/* Display the friendly name */}
          </option>
        ))}
      </select>
    </div>
  );
};

export default InstrumentDropdown;
