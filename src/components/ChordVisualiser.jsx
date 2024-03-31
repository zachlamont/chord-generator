import React from "react";
import ChordElement from "./ChordElement"; // Ensure this is the correct path

const ChordVisualiser = ({
  processedProgression,
  updateChordQuality,
  updateChordRoot,
}) => {
  return (
    <div>
      {processedProgression.map((chord) => (
        <ChordElement
          key={chord.id}
          chord={chord}
          updateChordQuality={updateChordQuality}
          updateChordRoot={updateChordRoot} // Ensure this is passed here
        />
      ))}
    </div>
  );
};

export default ChordVisualiser;
