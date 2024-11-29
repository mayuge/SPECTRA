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
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: "#294680",
        primaryDark: "#233B6C",
        danger: "#bb2124",
        warning: "#ff6700",
        success: "#22bb33",
        gray10: "#1A1A1A",
        gray20: "#333333",
        gray30: "#4D4D4D",
        gray40: "#666666",
        gray50: "#808080",
        gray60: "#999999",
        gray70: "#B3B3B3",
        gray80: "#CCCCCC",
        gray90: "#E6E6E6",
      },
    },
  },
  plugins: [],
} satisfies Config
