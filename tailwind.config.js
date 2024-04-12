/** @type {import('tailwindcss').Config} */
export const content = ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"];
export const theme = {
  extend: {},
  // colors: {
  //   // 'primary': '#FF7715'
  // },
};
export const plugins = [
  // eslint-disable-next-line no-undef
  require('postcss-import'),
  // eslint-disable-next-line no-undef
  require('tailwindcss'),
  // eslint-disable-next-line no-undef
  require('autoprefixer'),
];

