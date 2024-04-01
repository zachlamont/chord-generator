import React from "react";
import ChordElement from "./ChordElement"; // Ensure this is the correct path

const ChordVisualiser = ({
  processedProgression,
  updateChordQuality,
  updateChordRoot,
  activeChordIndex,
}) => {
  return (
    <div>
      {processedProgression.map((chord, index) => (
        <ChordElement
          key={chord.id}
          chord={chord}
          updateChordQuality={updateChordQuality}
          updateChordRoot={updateChordRoot}
          isActive={index === activeChordIndex} // Calculate if the chord is active based on index
        />
      ))}
    </div>
  );
};

export default ChordVisualiser;
