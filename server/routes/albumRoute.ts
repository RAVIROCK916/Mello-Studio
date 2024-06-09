import { Router } from "express";
import {
	getAlbum,
	getAlbums,
	getAlbumsSearch,
	getGenreAlbums,
	getGenres,
	getNewReleases,
} from "../controllers/albumController";

const router = Router();

router.route("/").get(getAlbums);
router.route("/new-releases").get(getNewReleases);
router.route("/genres").get(getGenres);
router.route("/genres/:name").get(getGenreAlbums);
router.route("/:id").get(getAlbum);
router.route("/search/:q").get(getAlbumsSearch);

export default router;
