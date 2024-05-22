import { AlbumType } from "../types";
import { Link } from "react-router-dom";

type Props = {
  item: {
    id: string;
    name: string;
    tracks: {
      album: AlbumType;
    }[];
    images: {
      url: string;
    }[];
    followers: {
      href: string;
      total: number;
    };
  };
};

const ArtistCard = ({ item }: Props) => {
  return (
    <div className="flex flex-col gap-2">
      <Link to="/dashboard/genres">
        <div
          className="size-48 overflow-hidden rounded-md bg-cover bg-center bg-no-repeat brightness-90 transition duration-[3000] hover:brightness-75"
          style={{
            backgroundImage: `url(${item.images[1].url})`,
          }}
        ></div>
      </Link>
      <h1 className="font-bold">{item.name}</h1>
    </div>
  );
};
export default ArtistCard;
