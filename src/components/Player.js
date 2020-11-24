import React, { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
  faPause,
  faAngleLeft,
  faAngleRight,
} from "@fortawesome/free-solid-svg-icons";
import { playAudio } from "./util";
export const Player = ({
  currSong,
  isPlaying,
  setIsPlaying,
  setSongInfo,
  songInfo,
  audioRef,
  setCurrSong,
  songs,
  setSongs,
}) => {
  //useEffect
  useEffect(() => {
    const newSongs = songs.map((song) => {
      if (song.id === currSong.id) {
        return {
          ...song,
          active: true,
        };
      } else {
        return { ...song, active: false };
      }
    });
    setSongs(newSongs);
  }, [currSong]);

  const formateTime = (time) => {
    return (
      Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2)
    );
  };
  const playSongHandler = () => {
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(!isPlaying);
    } else {
      audioRef.current.play();
      setIsPlaying(!isPlaying);
    }
  };
  const dragHandler = (e) => {
    audioRef.current.currentTime = e.target.value;
    setSongInfo({ ...songInfo, currTime: e.target.value });
  };
  const skipTrackHandler = async (dir) => {
    let index = songs.findIndex((song) => song.id === currSong.id);
    if (dir === "skip-back") {
      if ((index - 1) % songs.length === -1) {
        await setCurrSong(songs[songs.length - 1]);
        playAudio(isPlaying, audioRef);
        return;
      }
      await setCurrSong(songs[(index - 1) % songs.length]);
    } else {
      await setCurrSong(songs[(index + 1) % songs.length]);
    }
    //   playAudio(isPlaying, audioRef);
    if (isPlaying) audioRef.current.play();
  };

  return (
    <div className="player-container">
      <div className="time-control">
        <p>{formateTime(songInfo.currTime)}</p>
        <input
          onChange={dragHandler}
          type="range"
          name=""
          min={0}
          max={songInfo.duration || 0}
          value={songInfo.currTime}
          id=""
        />
        <p>{songInfo.duration ? formateTime(songInfo.duration) : "0:00"}</p>
      </div>
      <div className="play-control">
        <FontAwesomeIcon
          onClick={() => skipTrackHandler("skip-back")}
          className="skip-back"
          size="2x"
          icon={faAngleLeft}
        />
        <FontAwesomeIcon
          className="play"
          size="2x"
          onClick={() => playSongHandler()}
          icon={!isPlaying ? faPlay : faPause}
        />
        <FontAwesomeIcon
          onClick={() => skipTrackHandler("skip-forward")}
          className="skip-forward"
          size="2x"
          icon={faAngleRight}
        />
      </div>
    </div>
  );
};
