import React from "react";

const GenreDropdown = ({ selectedGenre, setSelectedGenre }) => {
  const genres = ["Pop", "R&B", "Ambient", "Folk", "Jazz"]; // Define your genres here

  const handleChange = (event) => {
    setSelectedGenre(event.target.value);
  };

  return (
    <select value={selectedGenre} onChange={handleChange}>
      {genres.map((genre) => (
        <option key={genre} value={genre}>
          {genre}
        </option>
      ))}
    </select>
  );
};

export default GenreDropdown;
