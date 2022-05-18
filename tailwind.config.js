module.exports = {
	content: [
		"./pages/**/*.{js,ts,jsx,tsx}",
		"./components/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
		colors: {
			primary: "#0A455D",
			secondary: "#B82224",
			white: "#F9FEFF",
			"gray-light": "#EEF3F5",
			gray: "#6B7984",
			"gray-dark": "#4C4C4C",
			black: "#16181A",
		},
		fontFamily: {
			sans: ["Montserrat", "sans-serif"],
			serif: ["Baskerville", "serif"],
		},
		fontSize: {
			sm: "0.667rem",
			base: "1rem",
			lg: "1.5rem",
			xl: "2.25rem",
			"2xl": "3.375rem",
			"3xl": "5.063rem",
			"4xl": "7.594rem",
		},
		extend: {
			spacing: {
				400: "400px",
			},
		},
	},
	plugins: [],
};
