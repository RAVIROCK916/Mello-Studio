import HighlightAlbumCard from "./HighlightAlbumCard";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { AlbumType } from "../types";

const Highlights = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["highlight-albums"],
    queryFn: () => axios.get("/api/albums/new-releases"),
  });

  const albums = data?.data;

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="relative">
      <div className="horizontal-scroll overflow-scroll">
        <div className="flex gap-4 snap-x">
          {albums.length > 0 &&
            albums.map((album: AlbumType) => (
              <HighlightAlbumCard album={album} key={album.id} />
            ))}
          {/* <div className="absolute -right-6 bottom-full top-0 flex rotate-90">
            {albums.map((_: AlbumType, i: number) => (
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
