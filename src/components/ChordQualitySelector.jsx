import React from 'react';

const ChordQualitySelector = ({ setIsSeventhChords, setIsExtendedChords }) => {
  const handleSelectQuality = (quality) => {
    switch (quality) {
      case 'none':
        setIsSeventhChords(false);
        setIsExtendedChords(false);
        break;
      case '7ths':
        setIsSeventhChords(true);
        setIsExtendedChords(false);
        break;
      case 'extended':
        setIsSeventhChords(true);
        setIsExtendedChords(true);
        break;
      default:
        break;
    }
  };

  return (
    <div>
      <button onClick={() => handleSelectQuality('none')}>Basic</button>
      <button onClick={() => handleSelectQuality('7ths')}>7ths</button>
      <button onClick={() => handleSelectQuality('extended')}>Extended Chords</button>
    </div>
  );
};

export default ChordQualitySelector;
