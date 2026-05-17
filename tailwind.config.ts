import type { Config } from "tailwindcss"

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1.25rem",
        sm: "1.5rem",
        lg: "2rem",
      },
      screens: {
        "2xl": "1320px",
      },
    },
    extend: {
      colors: {
        sand: {
          50: "#FCF8F1",
          100: "#FBF6EE",
          200: "#F5EBDD",
          300: "#EDDCC4",
          400: "#E1C7A4",
          500: "#D3B086",
        },
        cream: {
          DEFAULT: "#F5EBDD",
          50: "#FBF6EE",
          100: "#F5EBDD",
          200: "#EDDCC4",
          300: "#E1C7A4",
          400: "#D3B086",
        },
        terracotta: {
          50: "#FBEFE9",
          100: "#F4D7C8",
          200: "#E9B59E",
          300: "#DC9173",
          400: "#CB7654",
          500: "#B5654A",
          600: "#985039",
          700: "#7A3F2D",
          800: "#5C3022",
          900: "#3F2118",
        },
        copper: {
          50: "#F8EEE3",
          100: "#EFD8BD",
          200: "#E3BD93",
          300: "#D4A26A",
          400: "#C28C5C",
          500: "#A8743F",
          600: "#875B30",
          700: "#664324",
          800: "#462D17",
        },
        sage: {
          50: "#F1F2EC",
          100: "#DEE2D2",
          200: "#C2C9AF",
          300: "#A6B08A",
          400: "#8B9670",
          500: "#717B58",
        },
        ink: {
          DEFAULT: "#2B2118",
          soft: "#3D3127",
          muted: "#6B5A4B",
        },
        background: "#FBF6EE",
        foreground: "#2B2118",
        muted: {
          DEFAULT: "#EDDCC4",
          foreground: "#6B5A4B",
        },
        border: "#E1C7A4",
        input: "#E1C7A4",
        ring: "#B5654A",
        primary: {
          DEFAULT: "#B5654A",
          foreground: "#FBF6EE",
        },
        secondary: {
          DEFAULT: "#F5EBDD",
          foreground: "#2B2118",
        },
        accent: {
          DEFAULT: "#C28C5C",
          foreground: "#2B2118",
        },
        destructive: {
          DEFAULT: "#A23E2B",
          foreground: "#FBF6EE",
        },
      },
      fontFamily: {
        sans: ["var(--font-jost)", "ui-sans-serif", "system-ui", "sans-serif"],
        serif: [
          "var(--font-cormorant)",
          "ui-serif",
          "Georgia",
          "serif",
        ],
      },
      borderRadius: {
        xl: "1rem",
        "2xl": "1.25rem",
        "3xl": "1.75rem",
      },
      boxShadow: {
        warm:
          "0 20px 40px -20px rgba(101, 60, 32, 0.25), 0 4px 12px -6px rgba(101, 60, 32, 0.12)",
        "warm-lg":
          "0 30px 60px -25px rgba(101, 60, 32, 0.35), 0 10px 22px -10px rgba(101, 60, 32, 0.18)",
        soft: "0 6px 18px -8px rgba(101, 60, 32, 0.18)",
      },
      keyframes: {
        "fade-in-up": {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "soft-pulse": {
          "0%, 100%": { transform: "scale(1)", opacity: "1" },
          "50%": { transform: "scale(1.08)", opacity: "0.85" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      animation: {
        "fade-in-up": "fade-in-up 0.8s ease-out both",
        "fade-in": "fade-in 0.8s ease-out both",
        "soft-pulse": "soft-pulse 2.4s ease-in-out infinite",
        marquee: "marquee 35s linear infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
export default config
