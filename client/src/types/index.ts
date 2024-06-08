export type AlbumType = {
  id: string;
  name: string;
  artists: {
    id: string;
    name: string;
  }[];
  images: {
    url: string;
  }[];
  release_date: string;
  duration_ms: number;
  preview_url: string;
};

export type ArtistType = {
  id: string;
  name: string;
  images: {
    url: string;
  }[];
};
