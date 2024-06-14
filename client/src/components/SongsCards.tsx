import { useQuery } from "@tanstack/react-query";
import ArtistCard from "./ArtistCard";
import GenreCard from "./GenreCard";
import axios from "axios";
import AlbumCard from "./AlbumCard";
import GenreCardLoader from "./loaders/GenreCardLoader";
import ArtistCardLoader from "./loaders/ArtistCardLoader";

type PropsType = {
  title: string;
  type: string;
};

const SongsCards = ({ title, type }: PropsType) => {
  let query, Card, Loader;
  switch (type) {
    case "genre":
      Card = GenreCard;
      Loader = GenreCardLoader;
      query = useQuery({
        queryKey: ["album-genres"],
        queryFn: () => axios.get("/api/albums/genres"),
      });
      break;
    case "artist":
      Card = ArtistCard;
      Loader = ArtistCardLoader;
      query = useQuery({
        queryKey: ["album-artists"],
        queryFn: () => axios.get("/api/artists/top"),
      });
      break;
    case "album":
      Card = AlbumCard;
      Loader = GenreCardLoader;
      query = useQuery({
        queryKey: ["albums"],
        queryFn: () => axios.get("/api/albums/new-releases"),
      });
      break;
    default:
      Card = GenreCard;
      Loader = GenreCardLoader;
      query = useQuery({
        queryKey: ["album-genres"],
        queryFn: () => axios.get("/api/albums/genres"),
      });
      break;
  }
  const { data, isLoading } = query;

  return (
    <div className="flex flex-col gap-2">
      <h1 className="text-2xl font-bold dark:text-neutral-100">{title}</h1>
      <div className="horizontal-scroll flex gap-8">
        {isLoading ? (
          <Loader />
        ) : (
          data?.data.map((item: any, idx: number) => (
            <Card item={item} key={idx + 1} />
          ))
        )}
      </div>
    </div>
  );
};
export default SongsCards;
