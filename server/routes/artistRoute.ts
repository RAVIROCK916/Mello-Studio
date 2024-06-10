import { Router } from "express";
import {
	getArtist,
	getArtistAlbums,
	getArtists,
	getArtistsSearch,
	getTopArtists,
} from "../controllers/artistController";

const router = Router();

router.route("/").get(getArtists);
router.route("/top").get(getTopArtists);
router.route("/:id").get(getArtist);
router.route("/:id/albums").get(getArtistAlbums);
router.route("/search/:q").get(getArtistsSearch);

export default router;
