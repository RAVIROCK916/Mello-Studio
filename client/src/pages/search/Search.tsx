import axios from "axios";
import { useSearchStore } from "@/store/searchStore";
import { AlbumType, ArtistType } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import useAlbumsStore from "@/store/albumsStore";
import SongsCards from "@/components/SongsCards";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import useDebounce from "@/hooks/useDebounce";

const Search = () => {
  const { search } = useSearchStore();
  const { addToQueue } = useAlbumsStore();
  const [currTab, setCurrTab] = useState("albums");
  const navigate = useNavigate();

  interface Album extends AlbumType {
    album: {
      name: string;
      artists: {
        id: string;
        name: string;
      }[];
      images: {
        url: string;
      }[];
      release_date: string;
    };
  }

  let albums: Album[] = [],
    artists: ArtistType[] = [];

  const debouncedSearch = useDebounce(search, 1000);

  const { data: newReleases } = useQuery({
    queryKey: ["trending-albums-search", ""],
    queryFn: () => axios.get(`/api/albums/new-releases`),
    enabled: search.trim() === "",
  });

  const { data: searchResults } = useQuery({
    queryKey: ["albums-search", debouncedSearch],
    queryFn: () => axios.get(`/api/albums/search/${debouncedSearch}`),
    enabled: debouncedSearch.trim().length > 0,
  });

  const { data: artistResults } = useQuery({
    queryKey: ["artists-search", debouncedSearch],
    queryFn: () => axios.get(`/api/artists/search/${debouncedSearch}`),
    enabled: debouncedSearch.trim().length > 0,
  });

  albums =
    search.trim() === ""
      ? newReleases?.data
      : searchResults?.data?.tracks?.items;

  artists = artistResults?.data.artists.items;

  return (
    <div className="flex-1">
      {albums &&
        (search.trim() === "" ? (
          <div>
            <SongsCards title="Trending Searches" type="album" />
          </div>
        ) : (
          <Tabs
            defaultValue="albums"
            className="mx-auto max-w-6xl"
            value={currTab}
          >
            <TabsList className="w-full">
              <TabsTrigger
                value="albums"
                className="w-full"
                onClick={() => setCurrTab("albums")}
              >
                Albums
              </TabsTrigger>
              <TabsTrigger
                value="artists"
                className="w-full"
                onClick={() => setCurrTab("artists")}
              >
                Artists
              </TabsTrigger>
            </TabsList>
            <TabsContent value="albums">
              <Table>
                <TableBody className="font-semibold">
                  {albums.map((album: Album, idx: number) => (
                    <TableRow
                      key={album.id}
                      className="cursor-pointer"
                      onClick={() => {
                        addToQueue(albums.slice(idx));
                        navigate("/dashboard/queue");
                      }}
                    >
                      <TableCell className="flex items-center gap-6">
                        <div className="w-max overflow-hidden rounded-lg">
                          <img
                            src={album.album.images[0].url}
                            alt=""
                            width={50}
                          />
                        </div>
                        <p>{album.name}</p>
                      </TableCell>
                      {/* <TableCell>{album.name}</TableCell> */}
                      <TableCell className="opacity-60">
                        {album.artists.map((artist) => artist.name).join(", ")}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TabsContent>
            <TabsContent value="artists" className="mt-6 space-y-6">
              {artists?.length > 0 &&
                artists.map((artist) => (
                  <Link
                    to={`/dashboard/artist/${artist.id}`}
                    key={artist.id}
                    className="flex items-center gap-8"
                  >
                    <div className="size-20 overflow-hidden rounded-full">
                      {artist.images?.length > 0 && (
                        <img src={artist.images[0].url} alt="" />
                      )}
                    </div>
                    <div>
                      <h4 className="font-semibold">{artist.name}</h4>
                      <p className="opacity-60">{artist.type}</p>
                    </div>
                  </Link>
                ))}
            </TabsContent>
          </Tabs>
        ))}
    </div>
  );
};
export default Search;
