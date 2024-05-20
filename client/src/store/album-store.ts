import { create } from "zustand";
import { fetchAPI } from "../utils/fetchData";

type Album = {
  id: number;
  title: string;
  artist: string;
  year: number;
  genre: string;
  cover: string;
}

type AlbumStore = {
  albums: Album[] | null;
  fetchAlbums: () => Promise<void>;
  setAlbums: (albums: Album[]) => void;
}

export const useAlbumStore = create<AlbumStore>((set) => ({
  albums: null,
  fetchAlbums: async () => {
    const data = await fetchAPI();
    console.log(data)
    return data;
  },
  setAlbums: (albums) => { set(() => ({ albums })) },
}));
