import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { AlbumType } from "@/types";
import { getDuration } from "@/utils/getDuration";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { IoTimeOutline } from "react-icons/io5";
import { useParams } from "react-router-dom";

interface Album extends AlbumType {
  album: {
    images: {
      url: string;
    }[];
  };
  duration_ms: number;
}

const Genre = () => {
  const { genre } = useParams();
  const { data } = useQuery({
    queryKey: ["genres"],
    queryFn: () => axios.get(`/api/albums/genres/${genre}`),
  });
  const albums = data?.data.tracks;
  console.log(data);
  return (
    <div className="flex-1">
      <div className="mb-4 h-48 rounded-md bg-indigo-200">
        <h1 className="text-8xl font-bold text-white">{genre}</h1>
      </div>
      <Table>
        <TableBody className="font-semibold">
          {albums?.map((album: Album, idx: number) => (
            <TableRow key={album.id} className="cursor-pointer">
              <TableCell className="opacity-50">{idx + 1}</TableCell>
              <TableCell>
                <div className="w-max overflow-hidden rounded-md">
                  <img src={album.album.images[0].url} width={40} alt="" />
                </div>
              </TableCell>
              <TableCell>{album.name}</TableCell>
              <TableCell className="opacity-40">
                {album.artists[0].name}
              </TableCell>
              <TableCell className="opacity-50">
                <IoTimeOutline className="inline" />
                {getDuration(album.duration_ms)}
              </TableCell>
              <TableCell>...</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
export default Genre;
