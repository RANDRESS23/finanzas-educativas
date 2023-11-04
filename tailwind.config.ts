import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        sushi: {
          "50": "#f5faeb",
          "100": "#e8f4d3",
          "200": "#d2eaac",
          "300": "#b5da7c",
          "400": "#98c952",
          "500": "#79ad34",
          "600": "#5e8a26",
          "700": "#496a21",
          "800": "#3b551f",
          "900": "#34491e",
          "950": "#19270c",
        },
        "boston-blue": {
          "50": "#ebffff",
          "100": "#cdfbff",
          "200": "#a1f5ff",
          "300": "#60ebff",
          "400": "#18d7f8",
          "500": "#00bade",
          "600": "#008aae",
          "700": "#087596",
          "800": "#105f7a",
          "900": "#124f67",
          "950": "#053347",
        },
      },
      animation: {
        typing:
          "typing 3s steps(40) infinite, blink-caret 0.75s step-end infinite;",
      },
      keyframes: {
        typing: { "0%": { width: "0" }, "100%": { width: "100%" } },
        "blink-caret": { "0%": {}, "100%": { "border-color": "transparent" } },
      },
    },
  },
  plugins: [],
};
export default config;
