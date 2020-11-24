import { library } from "@fortawesome/fontawesome-svg-core";
import React from "react";
import { LibrarySong } from "./LibrarySong";

export const Library = ({
  songs,
  setSongs,
  setCurrSong,
  audioRef,
  isPlaying,
  libraryStatus,
}) => {
  return (
    <>
      <div className={`library ${libraryStatus ? "active-library" : ""}`}>
        <h2>Library</h2>
        <div className="library-songs">
          {songs.map((song) => (
            <LibrarySong
              isPlaying={isPlaying}
              audioRef={audioRef}
              songs={songs}
              setCurrSong={setCurrSong}
              currSong={song}
              id={song.id}
              key={song.id}
              setSongs={setSongs}
            />
          ))}
        </div>
      </div>
    </>
  );
};
