import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
        // Neon colors
        "neon-purple": "hsl(var(--neon-purple))",
        "neon-cyan": "hsl(var(--neon-cyan))",
        "neon-pink": "hsl(var(--neon-pink))",
        "neon-yellow": "hsl(var(--neon-yellow))",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "neon-pulse": {
          "0%, 100%": {
            boxShadow: "0 0 5px hsl(var(--neon-purple)), 0 0 10px hsl(var(--neon-purple)), 0 0 15px hsl(var(--neon-purple))"
          },
          "50%": {
            boxShadow: "0 0 10px hsl(var(--neon-purple)), 0 0 20px hsl(var(--neon-purple)), 0 0 30px hsl(var(--neon-purple))"
          }
        },
        "gradient-flow": {
          "0%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
          "100%": { backgroundPosition: "0% 50%" }
        },
        "float": {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" }
        },
        "glow": {
          "0%, 100%": { filter: "brightness(1) drop-shadow(0 0 5px hsl(var(--primary) / 0.5))" },
          "50%": { filter: "brightness(1.2) drop-shadow(0 0 20px hsl(var(--primary) / 0.8))" }
        },
        "holographic": {
          "0%": { backgroundPosition: "0% 0%" },
          "25%": { backgroundPosition: "100% 0%" },
          "50%": { backgroundPosition: "100% 100%" },
          "75%": { backgroundPosition: "0% 100%" },
          "100%": { backgroundPosition: "0% 0%" }
        },
        "pulse": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: ".5" }
        },
        "spin": {
          "to": { transform: "rotate(360deg)" }
        },
        "ping": {
          "75%, 100%": {
            transform: "scale(2)",
            opacity: "0"
          }
        },
        "bounce": {
          "0%, 100%": {
            transform: "translateY(-25%)",
            animationTimingFunction: "cubic-bezier(0.8, 0, 1, 1)"
          },
          "50%": {
            transform: "none",
            animationTimingFunction: "cubic-bezier(0, 0, 0.2, 1)"
          }
        }
      },
      animation: {
        "neon-pulse": "neon-pulse 2s infinite",
        "gradient-flow": "gradient-flow 4s ease infinite", 
        "float": "float 3s ease-in-out infinite",
        "glow": "glow 2s ease-in-out infinite",
        "holographic": "holographic 3s ease infinite",
        "pulse": "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "spin": "spin 1s linear infinite",
        "ping": "ping 1s cubic-bezier(0, 0, 0.2, 1) infinite",
        "bounce": "bounce 1s infinite",
      },
    },
  },
  plugins: [],
} satisfies Config;

export default config;
