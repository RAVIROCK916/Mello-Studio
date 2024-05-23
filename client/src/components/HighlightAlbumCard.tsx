import { useQuery } from "@tanstack/react-query";
import { AlbumType, ArtistType } from "../types/index";
import axios from "axios";

type PropsType = {
  album: AlbumType;
};

const HighlightAlbumCard = ({ album }: PropsType) => {
  const artistIds = album.artists.map((artist) => artist.id);
  const fetchArtistsURL = "/api/artists?ids=" + artistIds.join(",");

  const { data } = useQuery({
    queryKey: ["get-artists", artistIds],
    queryFn: () => axios.get(fetchArtistsURL),
  });

  const artists = data?.data;

  return (
    <div className="flex h-64 min-w-full max-w-full flex-1 overflow-hidden rounded-md bg-tertiary-1 text-white">
      <div className="flex-1">
        <div className="flex h-full flex-col justify-between px-10 py-6">
          <span className="text-sm font-medium text-neutral-300/70">
            Trending New hits
          </span>
          <div className="my-6 space-y-4">
            <h2 className="relative text-6xl font-bold">{album.name}</h2>
            <p className="text-xl font-semibold">{album.artists[0].name}</p>
          </div>
          <div>
            <button className="rounded-full bg-gradient-to-br from-primary-1 to-primary-2 px-8 py-2.5 text-xs font-semibold transition-colors duration-[3000] ease-in-out hover:bg-gradient-to-bl">
              Listen Now
            </button>
          </div>
        </div>
      </div>
      <div className="flex flex-1 *:flex-1">
        <img
          src={album.images[0].url}
          className="object-cover grayscale"
          alt={album.name}
        />
        {artists?.length > 0 &&
          artists.map((artist: ArtistType) => (
            <img
              key={artist.id}
              src={artist.images[0].url}
              className="object-cover grayscale"
              alt="artist"
            />
          ))}
      </div>
    </div>
  );
};
export default HighlightAlbumCard;
