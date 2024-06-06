import { Link } from "react-router-dom";
import { AlbumType } from "../types";

type Props = {
  item: {
    genre: string;
    tracks: {
      album: AlbumType;
    }[];
  };
};

const GenreCard = ({ item }: Props) => {
  return (
    <Link to={`/dashboard/genres/${item.genre}`}>
      <div
        className="relative size-48 overflow-hidden rounded-md bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${item.tracks[0].album.images[0].url})`,
        }}
      >
        <h1 className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-20 px-4 py-2 text-3xl font-bold text-white transition-colors duration-[3000] hover:bg-opacity-40">
          {item.genre}
        </h1>
      </div>
    </Link>
  );
};
export default GenreCard;
