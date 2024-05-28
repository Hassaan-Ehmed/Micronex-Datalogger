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
  './node_modules/@nextui-org/theme/dist/components/(button|snippet|code|input).js'],
  
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
      light : {
        colors: {
          primary: {
            DEFAULT: "#FF0000",
            foreground: "#000000",
          },
          secondary: {
            DEFAULT: "#FFFFFF",
            foreground: "#000000",
          },

          focus: "#BEF264",
        },
      },
    },
  })],
}

