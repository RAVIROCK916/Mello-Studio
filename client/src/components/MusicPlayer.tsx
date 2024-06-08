import React, { useRef, useState } from "react";
import { FaVolumeMute } from "react-icons/fa";
import { FaPause, FaPlay, FaVolumeLow } from "react-icons/fa6";
import { BsFillSkipEndFill, BsFillSkipStartFill } from "react-icons/bs";
import { HiFastForward, HiRewind } from "react-icons/hi";

import { Slider } from "./ui/slider";
import { Progress } from "./ui/progress";
import useAlbumsStore from "@/store/albumsStore";

const MusicPlayer = () => {
  const [volume, setVolume] = useState(50);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef: React.RefObject<HTMLAudioElement> = useRef(null);

  const { currentAlbum, queue, playNext } = useAlbumsStore((state) => ({
    currentAlbum: state.current,
    queue: state.queue,
    playNext: state.playNext,
  }));

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
      setIsPlaying(true);
    }
  };
  const handleRewind = () => {
    if (audioRef.current && audioRef.current.duration - 5 > 0) {
      audioRef.current.currentTime -= 5;
    } else if (audioRef.current) {
      audioRef.current.currentTime = 0;
    }
  };
  const handleForward = () => {
    if (
      audioRef.current &&
      audioRef.current.currentTime + 5 < audioRef.current.duration
    ) {
      audioRef.current.currentTime += 5;
    }
  };

  const handleEnded = () => {
    setIsPlaying(false);
    playNext();
    if (currentAlbum) setIsPlaying(true);
  };

  const handleVolume = (value: number[]) => {
    setVolume(value[0]);
    if (audioRef.current) {
      audioRef.current.volume = value[0] / 100;
    }
  };
  const handleMute = () => {
    setIsMuted(!isMuted);
    if (audioRef.current) {
      if (!isMuted) {
        audioRef.current.muted = true;
        setVolume(0);
      } else {
        audioRef.current.muted = false;
        setVolume(70);
      }
    }
  };

  return (
    currentAlbum && (
      <div className="fixed bottom-0 left-0 flex w-screen items-center justify-between border-t border-t-secondary-1 bg-opacity-80 bg-gradient-to-r from-secondary-2 to-neutral-50 px-8 py-5 *:flex-1">
        <audio
          ref={audioRef}
          src={currentAlbum?.preview_url}
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
          onEnded={handleEnded}
          className="hidden"
          autoPlay
        ></audio>
        {/* album title and info */}
        <div className="flex items-end gap-3">
          <div className="size-12 overflow-hidden rounded-sm">
            <img src={currentAlbum?.album.images[0].url} alt="" />
          </div>
          <div>
            <p className="text-lg font-bold">{currentAlbum?.name}</p>
            <p className="text-xs font-semibold text-neutral-500">
              {currentAlbum?.artists.map((artist) => artist.name).join(", ")}
            </p>
          </div>
        </div>
        {/* progress bar and controls */}
        <div className="flex flex-col items-center justify-between gap-3">
          <div>
            <Progress
              value={(currentTime / duration) * 100}
              max={100}
              className="w-[500px]"
            />
          </div>
          <div className="flex items-center gap-4">
            <BsFillSkipStartFill className="cursor-pointer text-xl" />
            <HiRewind
              className="cursor-pointer text-xl"
              onClick={handleRewind}
            />
            <div
              className="relative flex size-7 cursor-pointer items-center justify-center rounded-full bg-black"
              onClick={handlePlayPause}
            >
              {isPlaying && currentAlbum ? (
                <FaPause className="size-3.5 text-white" />
              ) : (
                <FaPlay
                  className="absolute left-[54%] top-[50%] size-3 -translate-x-1/2 -translate-y-1/2 text-white"
                  onClick={handlePlayPause}
                />
              )}
            </div>
            <HiFastForward
              className="cursor-pointer text-xl"
              onClick={handleForward}
            />
            <BsFillSkipEndFill className="cursor-pointer text-xl" />
          </div>
        </div>
        {/* volume slider */}
        <div className="flex items-center justify-end gap-2">
          {isMuted ? (
            <FaVolumeMute
              className="text-md cursor-pointer"
              onClick={handleMute}
            />
          ) : (
            <FaVolumeLow
              className="text-md cursor-pointer"
              onClick={handleMute}
            />
          )}
          <Slider
            className="w-20 cursor-pointer"
            value={[volume]}
            onValueChange={handleVolume}
          />
        </div>
      </div>
    )
  );
};
export default MusicPlayer;
