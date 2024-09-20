import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import useAlbumsStore from "@/store/albumsStore";
import { getDuration } from "@/utils/getDuration";
import { IoTimeOutline } from "react-icons/io5";

const Queue = () => {
  const { current, queue, addToQueue } = useAlbumsStore((state) => ({
    current: state.current,
    queue: state.queue,
    addToQueue: state.addToQueue,
  }));

  let album = current?.album;

  return (
    <div className="flex-1">
      <div className="mb-4 flex gap-8">
        <figure className="w-60 overflow-hidden rounded-md">
          <img
            src={album?.images[0].url}
            alt="artist"
            className="w-full object-cover"
          />
        </figure>
        <div className="flex flex-col items-start justify-end gap-4 font-bold">
          <div className="space-y-2">
            <h1 className="text-4xl opacity-20">Queue</h1>
            <h1 className="line-clamp-1 text-7xl text-black dark:text-neutral-50">
              {album?.name}
            </h1>
            <p className="text-2xl">
              {album?.artists.map((artist) => artist.name).join(", ")}
            </p>
          </div>
        </div>
      </div>
      <Table>
        <TableBody className="font-semibold">
          {queue.songs.map((album, idx) => (
            <TableRow
              key={album.id}
              onClick={() => addToQueue(queue.songs.slice(idx))}
            >
              <TableCell>{idx + 1}</TableCell>
              <TableCell>
                <div className="w-max overflow-hidden rounded-md">
                  <img src={album.album.images[0].url} width={40} alt="" />
                </div>
              </TableCell>
              <TableCell>{album.name}</TableCell>
              <TableCell className="opacity-50">
                {album.artists.map((artist) => artist.name).join(", ")}
              </TableCell>
              <TableCell className="opacity-50">{album.release_date}</TableCell>
              <TableCell className="opacity-50">
                <IoTimeOutline className="mr-1 inline align-text-bottom" />
                {getDuration(album.duration_ms)}
              </TableCell>
              <TableCell className="my-auto">...</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
export default Queue;
