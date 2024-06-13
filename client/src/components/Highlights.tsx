import { useEffect, useState } from "react";
import HighlightAlbumCard from "./HighlightAlbumCard";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { AlbumType } from "../types";

const Highlights = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { data, isLoading } = useQuery({
    queryKey: ["highlight-albums"],
    queryFn: () => axios.get("/api/albums/new-releases"),
  });
  const albums = data?.data;

  useEffect(() => {
    let interval: Timer;
    if (albums?.length > 0) {
      interval = setInterval(() => {
        setCurrentIndex((currentIndex + 1) % albums.length);
      }, 5000);
    }
    return () => clearInterval(interval);
  }, [currentIndex]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="relative">
      <div className="horizontal-scroll">
        <div
          className="flex snap-x transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {albums.length > 0 &&
            albums.map((album: AlbumType) => (
              <HighlightAlbumCard key={album.id} album={album} />
            ))}
        </div>
      </div>
      <div className="flex gap-2">
        {albums.map((_: AlbumType, i: number) => (
          <span
            key={i + 1}
            className="mt-3 h-[5px] w-[5px] cursor-pointer rounded-full bg-tertiary-1 transition duration-300 ease-in-out dark:bg-[#C2C2C2]"
            style={
              currentIndex === i
                ? { opacity: 1, width: "40px" }
                : { opacity: 0.3 }
            }
            onClick={() => setCurrentIndex(i)}
          ></span>
        ))}
      </div>
    </div>
  );
};

export default Highlights;
