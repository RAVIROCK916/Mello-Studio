import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import useAlbumsStore from "@/store/albumsStore";
import { AlbumType } from "@/types";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect } from "react";
import { FaPlay } from "react-icons/fa";
import { useLocation, useParams } from "react-router-dom";

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
  console.log("dsfdsf", artist);

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
    setCurrent(albums[0]);
  };

  const albums = artist_albums.data?.data.tracks;

  if (artist_albums.isLoading) {
    return <div>Loading...</div>;
  }
  if (artist_albums.error) {
    return <div>Error: {artist_albums.error.message}</div>;
  }

  return (
    <div className="flex-1">
      <div className="mb-4 flex gap-8">
        <figure className="w-60 overflow-hidden rounded-md">
          <img
            src={artist?.images[0].url}
            alt="artist"
            className="object-cover"
          />
        </figure>
        <div className="flex flex-col items-start justify-end gap-4 font-bold">
          <div className="space-y-2">
            <h1 className="text-6xl text-black">{artist.name}</h1>
            <p className="font-semibold">{artist.followers.total} followers</p>
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
      <Table>
        <TableBody className="font-semibold">
          {albums?.map((album: Album, idx: number) => (
            <TableRow
              key={album.id}
              className="cursor-pointer"
              onClick={() => setCurrent(album)}
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
              <TableCell className="opacity-40">
                {album.album.release_date}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
export default Artist;
