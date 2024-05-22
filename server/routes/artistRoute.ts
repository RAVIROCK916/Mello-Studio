import { Router } from "express";
import {
	getArtist,
	getArtists,
	getTopArtists,
} from "../controllers/artistController";

const router = Router();

router.route("/").get(getArtists);
router.route("/top").get(getTopArtists);
router.route("/:id").get(getArtist);

export default router;
