import { useState } from "react";
import useFetchAlbums from "../hooks/useFetchAlbums";
import HighlightAlbumCard from "./HighlightAlbumCard";

const Highlights = () => {
  const albums = useFetchAlbums("/api/albums/new-releases");
  const [currIndex, setCurrIndex] = useState(0);

  if (!albums) {
    return <div>Loading...</div>;
  }

  return (
    <div className="relative">
      <div className="horizontal-scroll overflow-scroll">
        <div className="flex gap-4 ">
          {albums.length > 0 &&
            albums.map((album: any) => (
              <HighlightAlbumCard album={album} key={album.id} />
            ))}
          {/* <div className="absolute -right-6 bottom-full top-0 flex rotate-90">
            {albums.map((_, i) => (
              <span
                key={i + 1}
                className="h-2 w-2 rounded-full bg-tertiary-1"
              ></span>
            ))}
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default Highlights;
