import axios from "axios";

const {X_RapidAPI_Key, X_RapidAPI_Host} = import.meta.env;

const options = {
	method: "GET",
	url: 'https://spotify23.p.rapidapi.com/search/',
  params: {
    q: '<REQUIRED>',
    type: 'multi',
    offset: '0',
    limit: '10',
    numberOfTopResults: '5'
  },
	headers: {
		"X-RapidAPI-Key": X_RapidAPI_Key || "5c1f0caa36msha37e443dff4fe3cp101b2djsnf7e9a75b7f45",
		"X-RapidAPI-Host": X_RapidAPI_Host || "spotify23.p.rapidapi.com",
	},
};

export const fetchAPI = async () => {
	try {
		const response = await axios.request(options);
    const data = await response.data
		return data;
	} catch (error) {
		console.error(error);
	}
};
