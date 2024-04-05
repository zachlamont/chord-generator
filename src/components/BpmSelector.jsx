import React, { useEffect, useState } from "react";

const BpmSelector = ({ selectedBPM, setSelectedBPM }) => {
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    const handleMouseMove = (event) => {
      if (isDragging) {
        const change = event.movementY;
        setSelectedBPM((bpm) => {
          const newBpm = bpm - change; // Decrease if mouse moves up, increase if down
          return Math.min(160, Math.max(40, newBpm)); // Ensure BPM stays within 20-140
        });
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      // Add event listeners to the window when dragging starts
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    }

    // Cleanup function to remove event listeners
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, setSelectedBPM]); // Re-run the effect if isDragging changes

  const handleMouseDown = () => setIsDragging(true);

  return (
    <div
      onMouseDown={handleMouseDown}
      style={{
        cursor: isDragging ? "ns-resize" : "pointer",
        userSelect: "none",
        padding: "10px",
        border: "1px solid black",
        display: "inline-block",
      }}
    >
      <div>BPM: {selectedBPM}</div>
    </div>
  );
};

export default BpmSelector;
