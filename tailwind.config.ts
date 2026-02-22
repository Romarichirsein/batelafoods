import type { Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";
import animate from "tailwindcss-animate";

const config: Config = {
    darkMode: ["class"],
    content: [
        "./pages/**/*.{ts,tsx}",
        "./components/**/*.{ts,tsx}",
        "./app/**/*.{ts,tsx}",
        "./lib/**/*.{ts,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                heading: ["var(--font-montserrat)", ...fontFamily.sans],
                body: ["var(--font-open-sans)", ...fontFamily.sans],
                sans: ["var(--font-open-sans)", ...fontFamily.sans],
            },
            colors: {
                "neon-red": "#c1272d",
                "neon-red-dark": "#9e1f24",
                "neon-green": "#009245",
                "neon-green-dark": "#006837",
                border: "hsl(var(--border))",
                input: "hsl(var(--input))",
                ring: "hsl(var(--ring))",
                background: "hsl(var(--background))",
                foreground: "hsl(var(--foreground))",
                primary: {
                    DEFAULT: "hsl(var(--primary))",
                    foreground: "hsl(var(--primary-foreground))",
                },
                secondary: {
                    DEFAULT: "hsl(var(--secondary))",
                    foreground: "hsl(var(--secondary-foreground))",
                },
                destructive: {
                    DEFAULT: "hsl(var(--destructive))",
                    foreground: "hsl(var(--destructive-foreground))",
                },
                muted: {
                    DEFAULT: "hsl(var(--muted))",
                    foreground: "hsl(var(--muted-foreground))",
                },
                accent: {
                    DEFAULT: "hsl(var(--accent))",
                    foreground: "hsl(var(--accent-foreground))",
                },
                card: {
                    DEFAULT: "hsl(var(--card))",
                    foreground: "hsl(var(--card-foreground))",
                },
            },
            borderRadius: {
                lg: "var(--radius)",
                md: "calc(var(--radius) - 2px)",
                sm: "calc(var(--radius) - 4px)",
            },
            boxShadow: {
                "neon-red": "0 0 20px rgba(193, 39, 45, 0.5), 0 0 40px rgba(193, 39, 45, 0.2)",
                "neon-red-sm": "0 0 10px rgba(193, 39, 45, 0.4)",
                "neon-green": "0 0 20px rgba(0, 146, 69, 0.5), 0 0 40px rgba(0, 146, 69, 0.2)",
                "neon-green-sm": "0 0 10px rgba(0, 146, 69, 0.4)",
            },
            keyframes: {
                "accordion-down": {
                    from: { height: "0" },
                    to: { height: "var(--radix-accordion-content-height)" },
                },
                "accordion-up": {
                    from: { height: "var(--radix-accordion-content-height)" },
                    to: { height: "0" },
                },
                "neon-pulse-red": {
                    "0%, 100%": { boxShadow: "0 0 15px rgba(193,39,45,0.4)" },
                    "50%": { boxShadow: "0 0 30px rgba(193,39,45,0.8), 0 0 60px rgba(193,39,45,0.3)" },
                },
                "neon-pulse-green": {
                    "0%, 100%": { boxShadow: "0 0 15px rgba(0,146,69,0.4)" },
                    "50%": { boxShadow: "0 0 30px rgba(0,146,69,0.8), 0 0 60px rgba(0,146,69,0.3)" },
                },
                "fade-in-up": {
                    from: { opacity: "0", transform: "translateY(30px)" },
                    to: { opacity: "1", transform: "translateY(0)" },
                },
                "slide-in-left": {
                    from: { opacity: "0", transform: "translateX(-30px)" },
                    to: { opacity: "1", transform: "translateX(0)" },
                },
                "float": {
                    "0%, 100%": { transform: "translateY(0)" },
                    "50%": { transform: "translateY(-20px)" },
                },
            },
            animation: {
                "accordion-down": "accordion-down 0.2s ease-out",
                "accordion-up": "accordion-up 0.2s ease-out",
                "neon-pulse-red": "neon-pulse-red 2s ease-in-out infinite",
                "neon-pulse-green": "neon-pulse-green 2s ease-in-out infinite",
                "fade-in-up": "fade-in-up 0.6s ease-out forwards",
                "slide-in-left": "slide-in-left 0.6s ease-out forwards",
                "float": "float 6s ease-in-out infinite",
            },
        },
    },
    plugins: [animate],
};

export default config;
