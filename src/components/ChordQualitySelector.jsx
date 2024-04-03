import React from "react";

const ChordQualitySelector = ({
  setIsSeventhChords,
  setIsExtendedChords,
  isSeventhChords,
  isExtendedChords,
}) => {
  const handleSelectQuality = (quality) => {
    switch (quality) {
      case "none":
        setIsSeventhChords(false);
        setIsExtendedChords(false);
        break;
      case "7ths":
        setIsSeventhChords(true);
        setIsExtendedChords(false);
        break;
      case "extended":
        setIsExtendedChords(true);
        // Keeping setIsSeventhChords(true) when 'extended' is selected to meet the last condition
        setIsSeventhChords(true);
        break;
      default:
        break;
    }
  };

  let selectedQuality = "none";
  if (isSeventhChords && !isExtendedChords) {
    selectedQuality = "7ths";
  } else if (isExtendedChords) {
    // Simplified to cover both isExtendedChords true scenarios
    selectedQuality = "extended";
  }

  return (
    <div>
      <button
        onClick={() => handleSelectQuality("none")}
        className={selectedQuality === "none" ? "selectedQuality" : ""}
      >
        Basic
      </button>
      <button
        onClick={() => handleSelectQuality("7ths")}
        className={selectedQuality === "7ths" ? "selectedQuality" : ""}
      >
        7ths
      </button>
      <button
        onClick={() => handleSelectQuality("extended")}
        className={selectedQuality === "extended" ? "selectedQuality" : ""}
      >
        Extended Chords
      </button>
    </div>
  );
};

export default ChordQualitySelector;
