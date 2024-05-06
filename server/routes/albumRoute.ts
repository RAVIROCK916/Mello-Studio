import express from "express"
import { getAlbums } from "../controllers/albumController";

const router = express.Router();

router.route("/").get(getAlbums)

export default router;