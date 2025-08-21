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
        primary: "#C3FF4B",
        primaryDark: "#C3FF4B",
        danger: "#dc3545",
        warning: "#ff6700",
        success: "#28a745",
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
      keyframes: {
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "fade-down": {
          "0%": { opacity: "0", transform: "translateY(-10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "slide-in-left": {
          "0%": { opacity: "0", transform: "translateX(-20px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        "slide-up": {
          "0%": { transform: "translateY(100%)" },
          "100%": { transform: "translateY(0)" },
        },
        float: {
          "0%, 100%": {
            transform: "translateY(0px) rotate(0deg)",
          },
          "50%": {
            transform: "translateY(-20px) rotate(5deg)",
          },
        },
        "float-delayed": {
          "0%, 100%": {
            transform: "translateY(0px) rotate(0deg)",
          },
          "50%": {
            transform: "translateY(-30px) rotate(-5deg)",
          },
        },
        "spin-slow": {
          from: {
            transform: "rotate(0deg)",
          },
          to: {
            transform: "rotate(360deg)",
          },
        },
      },
      animation: {
        "fade-in-slow": "fade-in 2s ease-out forwards",
        "fade-in": "fade-in 0.5s ease-out",
        "fade-down": "fade-down 0.7s ease-out",
        "slide-in-left": "slide-in-left 0.6s ease-out",
        "slide-up": "slide-up 0.2s ease-out",
        float: "float 6s ease-in-out infinite",
        "float-delayed": "float-delayed 8s ease-in-out infinite 2s",
        "spin-slow": "spin-slow 8s linear infinite",
      },
    },
  },
  plugins: [],
} satisfies Config
