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
};

export type ArtistType = {
  id: string;
  name: string;
  images: {
    url: string;
  }[];
};