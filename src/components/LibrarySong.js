import React from "react";
import { playAudio } from "./util";

export const LibrarySong = ({
  currSong,
  setCurrSong,
  songs,
  id,
  isPlaying,
  audioRef,
  setSongs,
}) => {
  const onSelectSong = () => {
    const selectedSong = songs.filter((state) => state.id === id);
    setCurrSong(selectedSong[0]);
    const newSongs = songs.map((song) => {
      if (song.id === id) {
        return {
          ...song,
          active: true,
        };
      } else {
        return { ...song, active: false };
      }
    });
    setSongs(newSongs);
    playAudio(isPlaying, audioRef);
    audioRef.current.play();
  };

  return (
    <div
      onClick={onSelectSong}
      className={`library-song ${currSong.active ? "selected" : " "}`}
    >
      <img src={currSong.cover} />
      <div className="song-desc">
        <h3>{currSong.name}</h3>
        <h4>{currSong.artist}</h4>
      </div>
    </div>
  );
};
