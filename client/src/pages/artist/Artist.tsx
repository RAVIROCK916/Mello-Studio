import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { AlbumType } from "@/types";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";

const Artist = () => {
  const { id } = useParams();
  const l = useLocation();
  useEffect(() => {
    console.log(l.state);
  });
  const { data, isLoading, error } = useQuery({
    queryKey: ["artist", id],
    queryFn: () => axios.get(`/api/artists/${id}/albums`),
  });
  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error: {error.message}</div>;
  }
  const artist = data?.data;
  const albums = artist.items;

  return (
    <div className="flex-1">
      <div>
        <h1 className="text-4xl font-bold text-white">{artist.name}</h1>
        <figure>{/* <img src={artist?.images[0].url} alt="" /> */}</figure>
      </div>
      <Table>
        <TableBody className="font-semibold">
          {albums?.map((album: AlbumType, idx: number) => (
            <TableRow key={album.id}>
              <TableCell>{idx + 1}</TableCell>
              <TableCell>
                <div className="w-max overflow-hidden rounded-md">
                  <img src={album.images[0].url} width={40} alt="" />
                </div>
              </TableCell>
              <TableCell>{album.name}</TableCell>
              <TableCell className="opacity-40">
                {album.artists.map((artist) => artist.name).join(", ")}
              </TableCell>
              <TableCell className="opacity-40">{album.release_date}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
export default Artist;
