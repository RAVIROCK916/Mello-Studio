import { Router } from "express";
import {
	getAlbum,
	getAlbums,
	getNewReleases,
} from "../controllers/albumController";

const router = Router();

router.route("/").get(getAlbums);
router.route("/new-releases").get(getNewReleases);
router.route("/:id").get(getAlbum);

export default router;
