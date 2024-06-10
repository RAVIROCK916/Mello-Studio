type Props = {
  item: {
    id: string;
    name: string;
    images: {
      url: string;
    }[];
    artists: {
      name: string;
    }[];
  };
};

const AlbumCard = ({ item }: Props) => {
  return (
    <div className="w-48">
      <div className="size-48 overflow-hidden rounded-md">
        <img src={item.images[0].url} alt="" className="" />
      </div>
      <h3 className="truncate font-semibold">{item.name}</h3>
      <p className="text-sm font-medium text-neutral-500">
        {item.artists[0].name}
      </p>
    </div>
  );
};
export default AlbumCard;
