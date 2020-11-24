import "./styles/app.scss";

import { Player } from "./components/Player";
import { Song } from "./components/Song";
import data from "./data";
import { useRef, useState } from "react";
import { Library } from "./components/Library";
import { Nav } from "./components/Nav";

function App() {
  const audioRef = useRef(null);

  const [songs, setSongs] = useState(data());
  const [currSong, setCurrSong] = useState(songs[6]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [songInfo, setSongInfo] = useState({
    currTime: 0,
    duration: 0,
  });
  const [libraryStatus, setLibraryStatus] = useState(false);
  const timeUpdateHandle = (e) => {
    const current = e.target.currentTime;
    const duration = e.target.duration;
    setSongInfo({ ...songInfo, currTime: current, duration });
  };
  const onEndedHandler = async () => {
    let index = songs.findIndex((song) => song.id === currSong.id);
    await setCurrSong(songs[(index + 1) % songs.length]);
    if (isPlaying) audioRef.current.play();
  };
  return (
    <div className={`App ${libraryStatus ? "library-active" : ""}`}>
      <Nav libraryStatus={libraryStatus} setLibraryStatus={setLibraryStatus} />
      <Song currSong={currSong} />
      <Player
        setSongInfo={setSongInfo}
        songInfo={songInfo}
        audioRef={audioRef}
        songs={songs}
        currSong={currSong}
        setSongs={setSongs}
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        setCurrSong={setCurrSong}
      />
      <Library
        libraryStatus={libraryStatus}
        isPlaying={isPlaying}
        songs={songs}
        audioRef={audioRef}
        setCurrSong={setCurrSong}
        setSongs={setSongs}
      />
      <audio
        onTimeUpdate={timeUpdateHandle}
        ref={audioRef}
        onLoadedMetadata={timeUpdateHandle}
        src={currSong.audio}
        onEnded={onEndedHandler}
      ></audio>
    </div>
  );
}

export default App;
