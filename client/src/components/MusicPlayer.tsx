import React, { useRef, useState } from "react";

const MusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef: React.RefObject<HTMLAudioElement> = useRef(null);

  const handlePlayPause = () => {
    if (isPlaying) {
      audioRef.current?.pause();
    } else {
      audioRef.current?.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const seekTime = (Number(e.target.value) / 100) * duration;
    if (audioRef.current) {
      audioRef.current.currentTime = seekTime;
    }
    setCurrentTime(seekTime);
  };
  return (
    <div className="fixed bottom-0 left-0 w-screen border-t border-t-secondary-1 bg-gradient-to-r from-secondary-2 to-white p-8">
      MusicPlayer
      <audio
        ref={audioRef}
        src="path/to/your/song.mp3"
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
      ></audio>
      <div className="controls">
        <button onClick={handlePlayPause}>
          {isPlaying ? "Pause" : "Play"}
        </button>
        <input
          type="range"
          value={(currentTime / duration) * 100}
          onChange={handleSeek}
        />
        <span>
          {Math.floor(currentTime)} / {Math.floor(duration)}
        </span>
      </div>
    </div>
  );
};
export default MusicPlayer;
