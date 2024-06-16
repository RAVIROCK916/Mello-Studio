import TableLoader from "@/components/loaders/TableLoader";
import { Skeleton } from "@/components/ui/skeleton";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import useAlbumsStore from "@/store/albumsStore";
import { AlbumType } from "@/types";
import { getDuration } from "@/utils/getDuration";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { FaPlay } from "react-icons/fa";
import { IoTimeOutline } from "react-icons/io5";
import { useParams } from "react-router-dom";

const Artist = () => {
  const { id } = useParams();

  interface Album extends AlbumType {
    album: {
      images: {
        url: string;
      }[];
      release_date: string;
    };
  }

  const artistData = useQuery({
    queryKey: ["artist", id],
    queryFn: () => axios.get(`/api/artists/${id}`),
  });

  const artist = artistData.data?.data;

  const { setCurrent, addToQueue } = useAlbumsStore((state) => ({
    current: state.current,
    setCurrent: state.setCurrent,
    addToQueue: state.addToQueue,
  }));

  const artist_albums = useQuery({
    queryKey: ["artist-albums", id],
    queryFn: () => axios.get(`/api/artists/${id}/albums`),
  });

  const addPlaylist = () => {
    addToQueue(albums);
  };

  const albums = artist_albums.data?.data.tracks;
  console.log(albums);

  if (artist_albums.error) {
    return <div>Error: {artist_albums.error.message}</div>;
  }

  return (
    <div className="flex-1">
      {artist ? (
        <div className="mb-4 flex gap-8">
          <figure className="overflow-hidden rounded-md">
            <img
              src={artist?.images[0].url}
              alt="artist"
              className="w-60 object-cover"
            />
          </figure>
          <div className="flex flex-col items-start justify-end gap-4 font-bold">
            <div className="space-y-2">
              <h1 className="text-6xl text-black dark:text-neutral-50">
                {artist.name}
              </h1>
              <p className="font-semibold">
                {artist.followers.total.toLocaleString()} followers
              </p>
            </div>
            <button
              className="flex items-center justify-between gap-2 rounded-md bg-primary-2 px-6 py-2 text-neutral-50 transition-colors hover:bg-primary-2/90"
              onClick={addPlaylist}
            >
              <p>Play</p>
              <FaPlay className="size-4" />
            </button>
          </div>
        </div>
      ) : (
        <>
          <Skeleton className="mb-4 size-60" />
        </>
      )}
      <Table>
        <TableBody className="font-semibold">
          {albums?.length > 0 ? (
            albums?.map((album: Album, idx: number) => (
              <TableRow
                key={album.id}
                className="cursor-pointer"
                onClick={() => addToQueue(albums.slice(idx))}
              >
                <TableCell>{idx + 1}</TableCell>
                <TableCell>
                  <div className="w-max overflow-hidden rounded-md">
                    <img src={album.album.images[0].url} width={40} alt="" />
                  </div>
                </TableCell>
                <TableCell>{album.name}</TableCell>
                <TableCell className="opacity-40">
                  {album.artists.map((artist) => artist.name).join(", ")}
                </TableCell>
                <TableCell className="opacity-50">
                  <IoTimeOutline className="mr-1 inline align-text-bottom" />
                  {getDuration(album.duration_ms)}
                </TableCell>
                <TableCell className="opacity-40">
                  {album.album.release_date}
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableLoader />
          )}
        </TableBody>
      </Table>
    </div>
  );
};
export default Artist;
