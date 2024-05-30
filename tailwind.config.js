/** @type {import('tailwindcss').Config} */

export default {

  content : ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme : {
    extend: {
      backgroundImage: {
        'hero-pattern': "url(/h.webp)"
      }
    },
    // colors: {
    //   // 'primary': '#FF7715'
    // },
    
  },
  safelist: [
    "text-ctp-red",
    "text-ctp-green",
    "text-ctp-pink",
    "text-ctp-peach",
    "text-ctp-blue",
    "text-ctp-teal",
    "text-ctp-sky",
  ],
  plugins: [
    // eslint-disable-next-line no-undef
    require('postcss-import'),
    // eslint-disable-next-line no-undef
    require('tailwindcss'),
    // eslint-disable-next-line no-undef
    require('autoprefixer'),
    
    require("@catppuccin/tailwindcss")({
      prefix: "ctp",
      defaultFlavour: "mocha",
    }),
  ],
  

}
