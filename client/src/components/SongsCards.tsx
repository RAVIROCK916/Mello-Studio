import { useQuery } from "@tanstack/react-query";
import ArtistCard from "./ArtistCard";
import GenreCard from "./GenreCard";
import axios from "axios";

type PropsType = {
  title: string;
  type: string;
};

const SongsCards = ({ title, type }: PropsType) => {
  let query, Card;
  switch (type) {
    case "genre":
      Card = GenreCard;
      query = useQuery({
        queryKey: ["album-genres"],
        queryFn: () => axios.get("/api/albums/genres"),
      });
      break;
    case "artist":
      Card = ArtistCard;
      query = useQuery({
        queryKey: ["album-artists"],
        queryFn: () => axios.get("/api/artists/top"),
      });
      break;
    default:
      Card = GenreCard;
      query = useQuery({
        queryKey: ["album-genres"],
        queryFn: () => axios.get("/api/albums/genres"),
      });
      break;
  }
  const { data } = query;

  return (
    <div className="flex flex-col gap-2">
      <h1 className="text-2xl font-bold">{title}</h1>
      <div className="horizontal-scroll flex gap-8">
        {data?.data.map((item: any, i: number) => (
          <Card item={item} key={i + 1} />
        ))}
      </div>
    </div>
  );
};
export default SongsCards;
