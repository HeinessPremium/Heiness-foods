import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "1.25rem",
      screens: {
        lg: "1080px",
        xl: "1080px",
      },
    },
    extend: {
      colors: {
        ink: "#171F19",
        canvas: "#FFFFFF",
        tint: "#FFF8EC",
        brand: {
          green: "#0E4D34",
          "green-dark": "#0A3A28",
          "green-soft": "#E1F0E7",
          orange: "#E8622C",
          "orange-soft": "#FCE3D4",
          yellow: "#F6A821",
          "yellow-soft": "#FDECC8",
          red: "#D94F3D",
          cream: "#FFF9EE",
        },
        border: "rgba(14,77,52,0.12)",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      borderRadius: {
        xl2: "1.25rem",
      },
      keyframes: {
        "fade-in": {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        "slide-up": {
          from: { transform: "translateY(16px)", opacity: "0" },
          to: { transform: "translateY(0)", opacity: "1" },
        },
        "sheet-in-bottom": {
          from: { transform: "translateY(100%)" },
          to: { transform: "translateY(0)" },
        },
        "sheet-in-right": {
          from: { transform: "translateX(100%)" },
          to: { transform: "translateX(0)" },
        },
        "pulse-once": {
          "0%": { transform: "scale(1)" },
          "40%": { transform: "scale(1.28)" },
          "100%": { transform: "scale(1)" },
        },
        "check-draw": {
          from: { strokeDashoffset: "48" },
          to: { strokeDashoffset: "0" },
        },
      },
      animation: {
        "fade-in": "fade-in 0.25s ease-out",
        "slide-up": "slide-up 0.35s cubic-bezier(0.22,0.9,0.3,1)",
        "sheet-in-bottom": "sheet-in-bottom 0.32s cubic-bezier(0.22,0.9,0.3,1)",
        "sheet-in-right": "sheet-in-right 0.32s cubic-bezier(0.22,0.9,0.3,1)",
        "pulse-once": "pulse-once 0.4s ease-out",
        "check-draw": "check-draw 0.6s ease-out 0.1s forwards",
      },
    },
  },
  plugins: [],
};

export default config;
