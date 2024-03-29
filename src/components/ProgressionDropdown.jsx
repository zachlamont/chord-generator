import React from "react";
import { progressions as allProgressions } from "../constants/constants"; // Adjust the import path as needed

const ProgressionDropdown = ({
  genre,
  selectedProgressionId,
  setSelectedProgressionId,
}) => {
  // Find progressions for the selected genre
  const genreProgressions =
    allProgressions.progressions.find((p) => p.genre === genre)
      ?.chordProgressions || [];

  const handleChange = (event) => {
    setSelectedProgressionId(Number(event.target.value));
  };

  return (
    <div>
      <label htmlFor="progression-select">Choose a progression:</label>
      <select
        id="progression-select"
        value={selectedProgressionId}
        onChange={handleChange}
      >
        {genreProgressions.map((prog) => (
          <option key={prog.id} value={prog.id}>
            {prog.chords.join(" ")} (ID: {prog.id})
          </option>
        ))}
      </select>
    </div>
  );
};

export default ProgressionDropdown;

/*Notes
Default Values: The ChordProgressionGenerator component initializes with a default genre and progression ID. These can be adjusted based on user interaction or other criteria.
Filtering Progressions: The genreProgressions variable filters the progressions constant to only include those matching the selected genre. This filtered list is passed to ProgressionDropdown.
Passing Props: ProgressionDropdown receives the filtered progressions, the selected progression ID, and a setter function for updating the selected progression ID. It uses these props to populate its dropdown menu and update the parent component's state when a selection is made.
ID Handling: Progression IDs are managed as numbers to ensure consistency in type, especially for comparison and state updates.
 */
