import React, { useState } from "react";
import { SAMPLER_INSTRUMENTS } from "../constants/constants";

const InstrumentDropdown = ({ selectedInstrument, setSelectedInstrument }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Convert SAMPLER_INSTRUMENTS object to an array of { key, name }
  const instrumentOptions = Object.entries(SAMPLER_INSTRUMENTS).map(
    ([key, value]) => ({
      key,
      name: value.name,
    })
  );

  // Find the currently selected instrument's name
  const selectedInstrumentName =
    instrumentOptions.find(
      (instrument) => instrument.key === selectedInstrument
    )?.name || "Select an Instrument"; // Fallback in case nothing is selected

  const handleChange = (key) => {
    setSelectedInstrument(key);
    setDropdownOpen(false); // Close dropdown
  };

  return (
    <div className="relative inline-block text-left">
      <div>
        <button
          type="button"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          id="options-menu"
          onClick={() => setDropdownOpen(!dropdownOpen)}
        >
          {selectedInstrumentName}
          <svg
            className="w-2.5 h-2.5 ml-3" // Changed `ms-3` to `ml-3` for Tailwind margin left utility class.
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 10 6"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round" // Changed to camelCase for JSX compatibility.
              strokeLinejoin="round" // Changed to camelCase for JSX compatibility.
              strokeWidth="2" // Changed to camelCase for JSX compatibility.
              d="m1 1 4 4 4-4"
            />
          </svg>
        </button>
      </div>

      {/* Dropdown menu, show/hide based on menu state. */}
      {dropdownOpen && (
        <div
          className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 focus:outline-none"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="options-menu"
        >
          <div className="py-1" role="none">
            {instrumentOptions.map((instrument) => (
              <a
                key={instrument.key}
                href="#"
                className="text-blue-700 block px-4 py-2 text-sm hover:bg-gray-100"
                role="menuitem"
                onClick={(e) => {
                  e.preventDefault(); // Prevent the link from navigating
                  handleChange(instrument.key);
                }}
              >
                {instrument.name}
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default InstrumentDropdown;
