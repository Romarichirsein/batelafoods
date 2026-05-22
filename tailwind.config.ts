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
                "neon-red": "#bf0e15",
                "neon-red-dark": "#990B11",
                "neon-red-light": "#e8363d",
                "neon-green": "#006b37",
                "neon-green-dark": "#004B26",
                "neon-green-light": "#00a854",
                "gold": "#d4a857",
                "gold-dark": "#b8922e",
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
                "glass": "0 8px 32px rgba(0, 0, 0, 0.06)",
                "glass-lg": "0 16px 48px rgba(0, 0, 0, 0.1)",
                "glass-xl": "0 24px 64px rgba(0, 0, 0, 0.12)",
                "neon-red": "0 0 20px rgba(191, 14, 21, 0.3), 0 0 40px rgba(191, 14, 21, 0.1)",
                "neon-red-sm": "0 0 10px rgba(191, 14, 21, 0.2)",
                "neon-green": "0 0 20px rgba(0, 107, 55, 0.3), 0 0 40px rgba(0, 107, 55, 0.1)",
                "neon-green-sm": "0 0 10px rgba(0, 107, 55, 0.2)",
                "premium": "0 20px 60px rgba(0, 0, 0, 0.08), 0 4px 16px rgba(0, 0, 0, 0.04)",
                "premium-hover": "0 28px 80px rgba(0, 0, 0, 0.12), 0 8px 24px rgba(0, 0, 0, 0.06)",
                "card-hover": "0 20px 40px rgba(191, 14, 21, 0.08), 0 8px 16px rgba(0, 0, 0, 0.06)",
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
                "fade-in-up": {
                    from: { opacity: "0", transform: "translateY(30px)" },
                    to: { opacity: "1", transform: "translateY(0)" },
                },
                "slide-in-left": {
                    from: { opacity: "0", transform: "translateX(-30px)" },
                    to: { opacity: "1", transform: "translateX(0)" },
                },
                "slide-in-right": {
                    from: { opacity: "0", transform: "translateX(30px)" },
                    to: { opacity: "1", transform: "translateX(0)" },
                },
                "scale-in": {
                    from: { opacity: "0", transform: "scale(0.95)" },
                    to: { opacity: "1", transform: "scale(1)" },
                },
                "float": {
                    "0%, 100%": { transform: "translateY(0)" },
                    "50%": { transform: "translateY(-20px)" },
                },
                "shimmer": {
                    "0%": { backgroundPosition: "-200% 0" },
                    "100%": { backgroundPosition: "200% 0" },
                },
                "pulse-glow": {
                    "0%, 100%": { opacity: "0.4" },
                    "50%": { opacity: "0.8" },
                },
                "gradient-shift": {
                    "0%": { backgroundPosition: "0% 50%" },
                    "50%": { backgroundPosition: "100% 50%" },
                    "100%": { backgroundPosition: "0% 50%" },
                },
            },
            animation: {
                "accordion-down": "accordion-down 0.2s ease-out",
                "accordion-up": "accordion-up 0.2s ease-out",
                "fade-in-up": "fade-in-up 0.6s ease-out forwards",
                "slide-in-left": "slide-in-left 0.6s ease-out forwards",
                "slide-in-right": "slide-in-right 0.6s ease-out forwards",
                "scale-in": "scale-in 0.5s ease-out forwards",
                "float": "float 6s ease-in-out infinite",
                "shimmer": "shimmer 3s ease-in-out infinite",
                "pulse-glow": "pulse-glow 4s ease-in-out infinite",
                "gradient-shift": "gradient-shift 8s ease infinite",
            },
        },
    },
    plugins: [animate],
};

export default config;
