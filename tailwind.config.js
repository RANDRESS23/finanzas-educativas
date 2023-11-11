/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        sushi: {
          50: "#f5faeb",
          100: "#e8f4d3",
          200: "#d2eaac",
          300: "#b5da7c",
          400: "#98c952",
          500: "#79ad34",
          600: "#5e8a26",
          700: "#496a21",
          800: "#3b551f",
          900: "#34491e",
          950: "#19270c",
        },
        "boston-blue": {
          50: "#ebffff",
          100: "#cdfbff",
          200: "#a1f5ff",
          300: "#60ebff",
          400: "#18d7f8",
          500: "#00bade",
          600: "#008aae",
          700: "#087596",
          800: "#105f7a",
          900: "#124f67",
          950: "#053347",
        },
      },
      animation: {
        typing: "typing 3s steps(40) infinite",
        enter: "enter .2s ease-out forwards",
        leave: "leave .2s ease-out forwards",
      },
      keyframes: {
        typing: {
          "0%": {
            width: "0",
          },
          "100%": {
            width: "100%",
          },
        },
        enter: {
          "0%": {
            transform: "scale(.9)",
            opacity: "0",
          },
          "100%": {
            transform: "scale(1)",
            opacity: "1",
          },
        },
        leave: {
          "100%": {
            transform: "scale(0.9)",
            opacity: "0",
          },
          "0%": {
            transform: "scale(1)",
            opacity: "1",
          },
        },
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
