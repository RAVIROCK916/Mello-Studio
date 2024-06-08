import { produce } from "immer";
import { create } from "zustand";
import { AlbumType } from "@/types";

interface Album extends AlbumType {
  album: {
    images: {
      url: string;
    }[];
  };
}

export interface AlbumsState {
  current: Album | null;
  next: Album | null;
  setCurrent: (album: Album) => void;
  queue: {
    currSong: number;
    size: number;
    songs: Album[];
  };
  playNext: () => void;
  addToQueue: (albums: Album[]) => void;
}

const useAlbumsStore = create<AlbumsState>((set) => ({
  current: null,
  next: null,
  queue: {
    currSong: 0,
    size: 20,
    songs: [],
  },
  playNext: () => {
    set(
      produce((state) => {
        if (state.queue.currSong + 1 < state.queue.size) {
          state.queue.currSong = state.queue.currSong + 1;
          state.current = state.queue.songs[state.queue.currSong];
        }
      }),
    );
  },
  setCurrent: (album: Album) => {
    set((state) => ({
      current: album,
      next: state.queue.songs[0] || null,
    }));
  },
  addToQueue: (albums: Album[]) => {
    set(
      produce((state) => {
        state.queue.songs.push(albums);
      }),
    );
  },
}));

export default useAlbumsStore;
