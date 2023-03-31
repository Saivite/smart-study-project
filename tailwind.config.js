/** @type {import('tailwindcss').Config} */
module.exports = {
  //it will check all the components in pages, components folder and remove the clases and stylings you are using
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      maxWidth: {
        "8xl": "1920px",
      },
    },
  },
  plugins: [],
};
