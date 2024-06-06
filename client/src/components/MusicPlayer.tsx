import React, { useRef, useState } from "react";
import { FaPlayCircle, FaVolumeMute, FaVolumeUp } from "react-icons/fa";
import { FaPause, FaVolumeHigh, FaVolumeLow } from "react-icons/fa6";
import { BsFillSkipEndFill, BsFillSkipStartFill } from "react-icons/bs";
import { IoVolumeMedium } from "react-icons/io5";

import { Slider } from "./ui/slider";
import { Progress } from "./ui/progress";

const MusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
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
    <div className="fixed bottom-0 left-0 flex w-screen items-center justify-between border-t border-t-secondary-1 bg-opacity-80 bg-gradient-to-r from-secondary-2 to-neutral-50 px-8 py-5">
      {/* <div className="flex items-center justify-between"> */}
      <audio
        ref={audioRef}
        src="path/to/your/song.mp3"
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        className="hidden"
      ></audio>
      <div className="flex items-end gap-3">
        <div className="size-12 rounded-sm bg-black"></div>
        <div>
          <p className="text-lg font-bold">StarBoy</p>
          <p className="text-xs font-semibold text-neutral-500">The Weekend</p>
        </div>
      </div>
      <div className="flex flex-col items-center justify-between gap-3">
        <div>
          <Progress value={50} max={200} className="w-[500px]" />
        </div>
        <div className="flex items-center gap-6">
          <BsFillSkipStartFill className="cursor-pointer text-xl" />
          {isPlaying ? (
            <FaPlayCircle
              className="cursor-pointer text-2xl"
              onClick={handlePlayPause}
            />
          ) : (
            <FaPause
              className="cursor-pointer text-2xl"
              onClick={handlePlayPause}
            />
          )}
          <BsFillSkipEndFill className="cursor-pointer text-xl" />
        </div>
      </div>
      <div className="flex items-center gap-2">
        {isMuted ? (
          <FaVolumeMute
            className="text-md cursor-pointer"
            onClick={() => setIsMuted(false)}
          />
        ) : (
          <FaVolumeLow
            className="text-md cursor-pointer"
            onClick={() => setIsMuted(true)}
          />
        )}
        <Slider className="w-20 cursor-pointer" />
      </div>
      {/* </div> */}
    </div>
  );
};
export default MusicPlayer;
