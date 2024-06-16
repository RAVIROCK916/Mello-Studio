import TableLoader from "@/components/loaders/TableLoader";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import useAlbumsStore from "@/store/albumsStore";
import { AlbumType } from "@/types";
import { getDuration } from "@/utils/getDuration";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { FaPlay } from "react-icons/fa6";
import { IoTimeOutline } from "react-icons/io5";
import { useNavigate, useParams } from "react-router-dom";

interface Album extends AlbumType {
  album: {
    images: {
      url: string;
    }[];
    release_date: string;
  };
}

const Genre = () => {
  const navigate = useNavigate();
  const { genre } = useParams();
  const { data } = useQuery({
    queryKey: ["genre", genre],
    queryFn: () => axios.get(`/api/albums/genres/${genre}`),
  });
  const albums = data?.data;

  const { addToQueue } = useAlbumsStore((state) => ({
    current: state.current,
    setCurrent: state.setCurrent,
    addToQueue: state.addToQueue,
  }));

  const addPlaylist = () => {
    addToQueue(albums);
  };

  return (
    <div className="flex-1 dark:text-neutral-100">
      <div className="mb-4 flex h-48 flex-col items-start justify-between space-y-6 rounded-md bg-gradient-to-r from-indigo-200 px-6 py-4 uppercase dark:from-neutral-900 dark:text-neutral-900">
        <h1 className="text-8xl font-bold text-white dark:text-neutral-100">
          {genre}
        </h1>
        <button
          className="flex items-center justify-between gap-2 rounded-md bg-primary-2 px-6 py-2 text-white transition-colors hover:bg-primary-2/90 dark:bg-neutral-100 dark:text-neutral-900 dark:hover:bg-neutral-100/90"
          onClick={addPlaylist}
        >
          <p>Play</p>
          <FaPlay />
        </button>
      </div>
      <Table>
        <TableBody className="font-semibold">
          {albums ? (
            albums.map((album: Album, idx: number) => (
              <TableRow
                key={album.id}
                className="cursor-pointer"
                onClick={() => {
                  addToQueue(albums.slice(idx));
                  navigate("/dashboard/queue");
                }}
              >
                <TableCell>{idx + 1}</TableCell>
                <TableCell>
                  <div className="w-max overflow-hidden rounded-sm">
                    <img src={album.album.images[0].url} width={40} alt="" />
                  </div>
                </TableCell>
                <TableCell>{album.name}</TableCell>
                <TableCell className="opacity-50">
                  {album.artists[0].name}
                </TableCell>
                <TableCell className="opacity-50">
                  {album.album.release_date}
                </TableCell>
                <TableCell className="opacity-50">
                  <IoTimeOutline className="mr-1 inline align-text-bottom" />
                  {getDuration(album.duration_ms)}
                </TableCell>
                <TableCell className="my-auto">...</TableCell>
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
export default Genre;
