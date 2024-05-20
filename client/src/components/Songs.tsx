const Songs = () => {
  interface AlbumCardProps {
    title: string;
    artist: string;
    coverArt: string;
    releaseYear: number;
  }
  return (
    <div>
      <h2>Songs</h2>
      <div className="relative flex h-60 w-60 flex-col items-center rounded-lg border border-gray-300">
        <img
          src="https://via.placeholder.com/150"
          alt="Album Cover"
          className="h-full w-full object-cover"
        />
        <div className="absolute bottom-0 left-0 right-0 flex items-center justify-between bg-black-variant-2/70 px-4 py-2 text-black-variant-2">
          <h3>Album Title</h3>
          <p>Artist Name</p>
          <p>Release Year: 2023</p>
        </div>
      </div>
    </div>
  );
};
export default Songs;
