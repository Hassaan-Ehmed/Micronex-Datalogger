const {nextui} = require("@nextui-org/theme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",

    // this line should be add on
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",

    
  // single component styles
  "./node_modules/@nextui-org/theme/dist/components/button.js",
  
  // or you can use a glob pattern (multiple component styles)
  './node_modules/@nextui-org/theme/dist/components/(button|snippet|code|input).js',



],

  
  theme: {
    screens: {

      // Mobile Devices
      'SM320' : '320px',
      'MM375' : '375px',
      'LM425' : '425px',

      'tablet': '768px',
      // => @media (min-width: 640px) { ... }

      'laptop': '1024px',
      // => @media (min-width: 1024px) { ... }

      'desktop': '1280px',
      // => @media (min-width: 1280px) { ... }
    },
  },
  darkMode: "class",
  plugins: [nextui({
    themes: {
      "purple-dark": {
        // extend: "dark", // <- inherit default values from dark theme
        colors: {
          background: "#0D001A",
          foreground: "#ffffff",
          primary: {
            50: "#3B096C",
            100: "#520F83",
            200: "#7318A2",
            300: "#9823C2",
            400: "#c031e2",
            500: "#DD62ED",
            600: "#F182F6",
            700: "#FCADF9",
            800: "#FDD5F9",
            900: "#FEECFE",
            DEFAULT: "#0f172a",
            foreground: "#ffffff",
          },
          focus: "#F182F6",
        },
        layout: {
          disabledOpacity: "0.3",
          radius: {
            small: "4px",
            medium: "6px",
            large: "8px",
          },
          borderWidth: {
            small: "1px",
            medium: "2px",
            large: "3px",
          },
        },
      },


      // light : {
      //   colors: {
      //     primary: {
      //       DEFAULT: "#FF0000",
      //       foreground: "#000000",
      //     },
      //     secondary: {
      //       DEFAULT: "#FFFFFF",
      //       foreground: "#000000",
      //     },

      //     focus: "#BEF264",
      //   },
      // },
    },
  })],
}

