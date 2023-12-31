const { tailwindTransform } = require("postcss-lit");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: { files: ["src/**/*.ts"], transform: { ts: tailwindTransform } },
  theme: {
    extend: {},
  },
  plugins: [require("@tailwindcss/typography"), require("daisyui")],
  daisyui: {
    logs: false,
    themes: [
      "emerald",
    ],
  },
};
