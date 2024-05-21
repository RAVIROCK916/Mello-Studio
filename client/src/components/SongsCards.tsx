import useFetchData from "../hooks/useFetchData";
import GenreCard from "./GenreCard";

type PropsType = {
  title: string;
  type: string;
};

const SongsCards = ({ title, type }: PropsType) => {
  let albums, SongCard;
  switch (type) {
    case "genre":
      SongCard = GenreCard;
      albums = useFetchData("/api/albums/genres");
      break;
    default:
      SongCard = GenreCard;
      albums = useFetchData("/api/albums/genres");
      break;
  }
  console.log("albums", albums);

  return (
    <div className="flex flex-col gap-2">
      <h1 className="text-2xl font-bold">{title}</h1>
      <div className="horizontal-scroll flex gap-8">
        {albums.map((album, i) => (
          <SongCard album={album} key={i + 1} />
        ))}
      </div>
    </div>
  );
};
export default SongsCards;
