/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			colors: {
				primary: {
					1: "#E21376",
					2: "#45BED5",
				},
				secondary: {
					1: "#E21376",
					2: "#FFDFEE",
				},
				"black-variant": {
					1: "#000000",
					2: "#262626",
				},
			},
		},
	},
	plugins: [require("@tailwindcss/typography")],
};
