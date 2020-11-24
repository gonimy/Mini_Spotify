import React from "react";

export const Song = ({ currSong }) => {
  return (
    <div className="song-container">
      <img src={currSong.cover}></img>
      <h2>{currSong.name}</h2>
      <h3>{currSong.artist}</h3>
    </div>
  );
};
