import useFetchData from "../hooks/useFetchData";
import ArtistCard from "./ArtistCard";
import GenreCard from "./GenreCard";

type PropsType = {
  title: string;
  type: string;
};

const SongsCards = ({ title, type }: PropsType) => {
  let data, Card;
  switch (type) {
    case "genre":
      Card = GenreCard;
      data = useFetchData("/api/albums/genres");
      break;
    case "artist":
      Card = ArtistCard;
      data = useFetchData("/api/artists/top");
      break;
    default:
      Card = GenreCard;
      data = useFetchData("/api/albums/genres");
      break;
  }
  console.log(type, data);

  return (
    <div className="flex flex-col gap-2">
      <h1 className="text-2xl font-bold">{title}</h1>
      <div className="horizontal-scroll flex gap-8">
        {data.map((item, i) => (
          <Card item={item} key={i + 1} />
        ))}
      </div>
    </div>
  );
};
export default SongsCards;
