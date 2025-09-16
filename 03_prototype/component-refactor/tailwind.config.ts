import type { Config } from "tailwindcss"

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // background: "var(--background)",
        // foreground: "var(--foreground)",
        primary: "#7289DA",
        primaryDark: "#4E5D94",
        danger: "#F47B67",
        warning: "#F8A532",
        success: "#48B784",
        back: "#36393F",
        gray: {
          10: "#1A1A1A",
          20: "#333333",
          30: "#4D4D4D",
          40: "#666666",
          50: "#808080",
          60: "#999999",
          70: "#B3B3B3",
          80: "#CCCCCC",
          90: "#E6E6E6",
        },
      },
    },
  },
  plugins: [],
} satisfies Config
