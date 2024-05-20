import { Router } from "express";
import { getArtist, getArtists } from "../controllers/artistController";

const router = Router();

router.route("/").get(getArtists);
router.route("/:id").get(getArtist);

export default router;
