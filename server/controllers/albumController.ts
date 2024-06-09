import axios from "axios";
import type { Response } from "express";
import SPOTIFY_BASE_URL, {
	ALBUM_URL,
	NEW_ALBUM_RELEASES_URL,
	SPOTIFY_SEARCH_URL,
} from "../constants/api-urls";
import type { AuthenticatedRequest } from "../types/requests";
import type { AlbumType } from "../../client/src/types";

export const getAlbums = async (req: AuthenticatedRequest, res: Response) => {
	const { token } = req;

	axios
		.get(ALBUM_URL, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
			params: {
				type: "album",
				limit: 20,
			},
		})
		.then((response) => {
			res.json(response.data.albums.items);
		})
		.catch((error) => {
			console.error(error.message);
			res
				.status(500)
				.json({ error: "An error occurred while fetching the albums!!!" });
		});
};

export const getNewReleases = async (
	req: AuthenticatedRequest,
	res: Response
) => {
	const { token } = req;

	axios
		.get(NEW_ALBUM_RELEASES_URL, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
			params: {
				limit: 5,
			},
		})
		.then((response) => {
			res.json(response.data.albums.items);
		})
		.catch((error) => {
			console.error(error.message);
			res
				.status(500)
				.json({ error: "An error occurred while fetching the albums!!!" });
		});
};

export const getGenres = async (req: AuthenticatedRequest, res: Response) => {
	const { token } = req;

	const genres = ["pop", "rock", "jazz", "classical", "hip-hop"];

	try {
		const genrePromises = genres.map(async (genre) => {
			const response = await axios.get(`${SPOTIFY_BASE_URL}/recommendations`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
				params: {
					seed_genres: genre,
					limit: 10,
				},
			});

			return {
				genre,
				tracks: response.data.tracks,
			};
		});

		const recommendationsByGenre = await Promise.all(genrePromises);

		res.json(recommendationsByGenre);
	} catch (error: any) {
		console.error(error.message);
		res
			.status(500)
			.json({ error: "An error occurred while fetching the genres!!!" });
	}
	res.send("Genres sent");
};

export const getGenreAlbums = async (
	req: AuthenticatedRequest,
	res: Response
) => {
	const { token } = req;
	const genre = req.params.name;

	try {
		const response = await axios.get(`${SPOTIFY_BASE_URL}/recommendations`, {
			params: {
				seed_genres: genre,
				limit: 20,
			},
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
		const albums = response.data.tracks.filter(
			(album: AlbumType) => album.preview_url
		);
		res.json(albums);
	} catch (error: any) {
		console.error(error.message);
		res
			.status(500)
			.json({ error: "An error occurred while fetching the genre albums!!!" });
	}
	res.send("Genres sent");
};

export const getAlbum = async (req: AuthenticatedRequest, res: Response) => {
	const {
		token,
		params: { id },
	} = req;

	try {
		const response = await axios.get(`${ALBUM_URL}/${id}`, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
		console.log(response.data);
		res.json(response.data);
	} catch (error: any) {
		console.error(error.message);
		res
			.status(500)
			.json({ error: "An error occurred while fetching the album!!!" });
	}
};

export const getAlbumsSearch = async (
	req: AuthenticatedRequest,
	res: Response
) => {
	const { token } = req;
	const { q } = req.params;

	try {
		const response = await axios.get(`${SPOTIFY_SEARCH_URL}`, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
			params: {
				q: q,
				type: "album",
				limit: 20,
			},
		});
		res.json(response.data);
	} catch (error: any) {
		console.error(error.message);
		res
			.status(500)
			.json({ error: "An error occurred while fetching the albums!!!" });
	}
};
