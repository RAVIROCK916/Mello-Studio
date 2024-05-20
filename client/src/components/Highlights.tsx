import useFetchAlbums from "../hooks/useFetchAlbums";
import HighlightAlbumCard from "./HighlightAlbumCard";

const Highlights = () => {
  const albums = useFetchAlbums("/api/albums/new-releases");
  // const artists = albums.map(album => {
  //   useFetchAlbums(`/api/artists/${album.artists[0]}`);

  // })
  console.log(albums);

  if (!albums) {
    return <div>Loading...</div>;
  }

  return (
    <div className="highlight-card overflow-scroll">
      <div className="flex gap-4">
        {albums.length > 0 &&
          albums.map((album: any) => (
            <HighlightAlbumCard album={album} key={album.id} />
          ))}
      </div>
    </div>
  );
};

export default Highlights;
