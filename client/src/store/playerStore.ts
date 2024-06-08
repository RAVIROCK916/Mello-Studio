import { create } from "zustand";

export const usePlayerStore = create((set) => ({
  player: null,
  setPlayer: (player) => set((state) => ({ player })),
}));
