import type { AlbumType } from "./../../client/src/types/index";
import axios from "axios";
import SPOTIFY_BASE_URL, { ARTIST_URL } from "../constants/api-urls";
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
	res.send("Artists sent");
};

export const getTopArtists = async (
	req: AuthenticatedRequest,
	res: Response
) => {
	const { token } = req;

	const getTrendingArtists = async (playlistId: string) => {
		const response = await axios.get(
			`${SPOTIFY_BASE_URL}/playlists/${playlistId}/tracks`,
			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
				params: {
					limit: 10, // Number of tracks to retrieve
				},
			}
		);

		// Extract artists from the playlist tracks
		const artists = response.data.items
			.map((item: { track: { artists: any } }) => item.track.artists)
			.flat();
		const uniqueArtistsIds = [
			...new Set(artists.map((artist: { id: string }) => artist.id)),
		];
		const artistsResponse = await axios.get(`${ARTIST_URL}`, {
			params: {
				ids: uniqueArtistsIds.join(","),
			},
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
		return artistsResponse.data.artists;
	};

	const playlistId = "37i9dQZEVXbMDoHDwVN2tF"; // Spotify's "Top 50 - Global" playlist ID

	try {
		const trendingArtists = await getTrendingArtists(playlistId);
		res.json(trendingArtists);
	} catch (error) {
		console.error(error);
		res.status(500).send("Error fetching top artists");
	}
	res.send("Top artists sent");
};

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

export const getArtistAlbums = async (
	req: AuthenticatedRequest,
	res: Response
) => {
	const {
		token,
		params: { id },
	} = req;

	try {
		const response = await axios.get(`${ARTIST_URL}/${id}/top-tracks`, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
			params: {
				// include_groups: ["album", "single", "compilation"],
				limit: 20,
			},
		});
		const albums = response.data.tracks.filter(
			(album: AlbumType) => album.preview_url
		);
		if (albums.length >= 5) {
			response.data.tracks = albums;
		} else {
			response.data.tracks = response.data.tracks;
		}
		res.json(response.data);
	} catch (error: any) {
		console.error(error.message);
		res
			.status(500)
			.json({ error: "An error occurred while fetching the artist albums!!!" });
	}
};
