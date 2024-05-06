import express, { type Request, type Response } from "express";
import router from "./routes/albumRoute";

const app = express();

const port = 4000;

app.use("/api/albums", router);

app.listen(port, () => console.log("Listening on", port));
