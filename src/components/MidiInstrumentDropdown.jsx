import React, { useState, useEffect, useRef } from "react";

const MidiInstrumentDropdown = ({
  midiInputs,
  selectedMidiInput,
  setSelectedMidiInput,
}) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleChange = (inputId) => {
    const selectedInput = midiInputs.find((input) => input.id === inputId);
    setSelectedMidiInput(selectedInput);
    setDropdownOpen(false); // Close dropdown after selection
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <div>
        <button
          type="button"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          id="midi-input-menu"
          onClick={() => setDropdownOpen(!dropdownOpen)}
        >
          {selectedMidiInput?.name || "Select MIDI Input"}
          <svg
            className="w-2.5 h-2.5 ml-3"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 10 6"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m1 1 4 4 4-4"
            />
          </svg>
        </button>
      </div>
      {dropdownOpen && (
        <div
          className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 focus:outline-none z-50" // Added z-50 for z-index
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="midi-input-menu"
        >
          <div className="py-1" role="none">
            {midiInputs.map((input) => (
              <a
                key={input.id}
                href="#"
                className="text-gray-700 block px-4 py-2 text-sm hover:bg-gray-100"
                role="menuitem"
                onClick={(e) => {
                  e.preventDefault();
                  handleChange(input.id);
                }}
              >
                {input.name}
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MidiInstrumentDropdown;
