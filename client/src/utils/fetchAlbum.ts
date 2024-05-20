import axios from "axios";

export const fetchAlbum = (id: string) => {
  axios.get(`/api/albums/${id}`)

}

