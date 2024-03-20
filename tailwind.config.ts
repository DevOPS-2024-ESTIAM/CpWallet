import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
    colors: {
      primary: {
        50: '#070F2B',
        100: '#1B1A55',
        200: '#535C91',
        300: '#ffff',
      },
      secondary: {
        50: '#F2C063',
        100: '#BF984E',
        200: '#EFC75E',
        300: '#BF6D24',
      },
    },
  },

  plugins: [],
};
export default config;
