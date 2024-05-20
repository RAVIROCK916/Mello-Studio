import fetchAlbums from "../utils/fetchAlbums";
import { useEffect, useState } from "react";

const useFetchAlbums = (url: string) => {
  const [albums, setAlbums] = useState([]);

  const fetchData = async () => {
    const data = await fetchAlbums(url);
    setAlbums(data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return albums;
};

export default useFetchAlbums;
