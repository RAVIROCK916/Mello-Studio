import axios from "axios";
import type { NextFunction, Response } from "express";

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;

interface AuthenticatedRequest extends Request {
	token?: string;
}

const authAccess = async (
	req: AuthenticatedRequest,
	res: Response,
	next: NextFunction
) => {
	const spotify_token_url = "https://accounts.spotify.com/api/token";

	try {
		const response = await axios.post(
			spotify_token_url,
			{
				grant_type: "client_credentials",
				client_id: CLIENT_ID,
				client_secret: CLIENT_SECRET,
			},
			{
				headers: {
					"Content-Type": "application/x-www-form-urlencoded",
				},
			}
		);

		req.token = response.data.access_token;
	} catch (error) {
		console.error("Error exchanging code for access token:", error);
		res.status(500).send("Error exchanging code for access token");
	}
	next();
};

export default authAccess;
