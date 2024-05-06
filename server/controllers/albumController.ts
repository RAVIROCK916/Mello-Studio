import axios from "axios";
import type { NextFunction, Request, Response } from "express";

const { X_RapidAPI_Key, X_RapidAPI_Host } = import.meta.env;

export const getAlbums = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
  console.log("Get");
  
	const options = {
		method: "GET",
		url: "https://spotify23.p.rapidapi.com/search/",
		params: {
			q: "<REQUIRED>",
			type: "multi",
			offset: "0",
			limit: "10",
			numberOfTopResults: "5",
		},
		headers: {
			"X-RapidAPI-Key":
				X_RapidAPI_Key || "5c1f0caa36msha37e443dff4fe3cp101b2djsnf7e9a75b7f45",
			"X-RapidAPI-Host": X_RapidAPI_Host || "spotify23.p.rapidapi.com",
		},
	};

	try {
		const response = await axios.request(options);
		const data = await response.data;
		// console.log("data", data);
		return "data";
	} catch (error) {
		console.error(error);
	}
	res.send("Hello World!");
};
