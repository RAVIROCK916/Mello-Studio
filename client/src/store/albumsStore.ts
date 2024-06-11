import { produce } from "immer";
import { create } from "zustand";
import { AlbumType } from "@/types";

interface Album extends AlbumType {
  album: {
    name: string;
    images: {
      url: string;
    }[];
    artists: {
      id: string;
      name: string;
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
  playPrev: () => void;
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
        if (state.queue.currSong + 1 < state.queue.songs.length) {
          state.queue.currSong = state.queue.currSong + 1;
          state.current = state.queue.songs[state.queue.currSong];
        }
      }),
    );
  },
  playPrev: () => {
    set(
      produce((state) => {
        if (state.queue.currSong - 1 >= 0) {
          state.queue.currSong = state.queue.currSong - 1;
          state.current = state.queue.songs[state.queue.currSong];
        }
      }),
    );
  },
  setCurrent: (album: Album) => {
    set((state) => ({
      current: album,
      next: state.queue.songs[1] || null,
    }));
  },
  addToQueue: (albums: Album[]) => {
    const albumsWithPreview = albums.filter((album) => album.preview_url);
    set(
      produce((state) => {
        state.current = albumsWithPreview[0];
        state.queue.songs = albumsWithPreview;
        state.queue.currSong = 0;
      }),
    );
  },
}));

export default useAlbumsStore;
