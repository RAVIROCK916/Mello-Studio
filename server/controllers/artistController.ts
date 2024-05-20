import axios from "axios";
import { ARTIST_URL } from "../constants/api-urls";
import type { AuthenticatedRequest } from "../types/requests";
import type { Response } from "express";

interface ArtistsRequest extends AuthenticatedRequest {
  query: {
    ids: string;
  };
}

export const getArtists = async (req: ArtistsRequest, res: Response) => {
  const { token } = req;
  
  try {
    const response = await axios.get(`${ARTIST_URL}`, {
      params: req.query,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    res.json(response.data.artists);
  } catch (error: any) {
    console.error(error.message);
    res
      .status(500)
      .json({ error: "An error occurred while fetching the artists!!!" });
  }
  res.send("Artists sent")
}

export const getArtist = async (req: AuthenticatedRequest, res: Response) => {
	const {
		token,
		params: { id },
	} = req;
	try {
		const response = await axios.get(`${ARTIST_URL}/${id}`, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
		res.json(response.data);
	} catch (error: any) {
		console.error(error.message);
		res
			.status(500)
			.json({ error: "An error occurred while fetching the artist!!!" });
	}
};

