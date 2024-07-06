// import { warn } from "console";
// import { text } from "stream/consumers";
import type { Config } from "tailwindcss";

const config = {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	future: {
		hoverOnlyWhenSupported: true,
	},
	theme: {
		container: {
			center: true,
			padding: "2rem",
			screens: {
				"2xl": "1400px",
			},
		},
		extend: {
			fontFamily: {
				plate: "var(--plate-font)",
			},
			backgroundColour: {
				plate: "var(--plate)",
			},
			colors: {
				search: "var(--search)",
				border: "var(--border)",
				input: "var(--input)",
				ring: "var(--ring)",
				background: "var(--background)",
				foreground: "var(--foreground)",
				major: "var(--major)",
				warning: "var(--warning)",
				success: "var(--success)",
				plate: "var(--plate)",
				"plate-text": "var(--plate-text)",
				"header-footer-bg": "var(--header-footer-bg)",
				primary: {
					DEFAULT: "var(--primary)",
					foreground: "var(--primary-foreground)",
				},
				secondary: {
					DEFAULT: "var(--secondary)",
					foreground: "var(--secondary-foreground)",
				},
				destructive: {
					DEFAULT: "var(--destructive)",
					foreground: "var(--destructive-foreground)",
				},
				muted: {
					DEFAULT: "var(--muted)",
					foreground: "var(--muted-foreground)",
				},
				accent: {
					DEFAULT: "var(--accent)",
					foreground: "var(--accent-foreground)",
				},
				popover: {
					DEFAULT: "var(--popover)",
					foreground: "var(--popover-foreground)",
				},
				card: {
					DEFAULT: "var(--card)",
					foreground: "var(--card-foreground)",
				},
			},
			borderRadius: {
				lg: "var(--radius)",
				md: "calc(var(--radius) - 2px)",
				sm: "calc(var(--radius) - 4px)",
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
				rumbleAnimation: {
					"0%, 100%": { transform: "translateX(-50%) rotate(0)" },
					"25%": {
						transform: "translateX(-50%) translateY(-0.5px) rotate(-0.5deg)",
					},
					"50%": {
						transform: "translateX(-50%) translateY(0.5px) rotate(0.5deg)",
					},
					"75%": {
						transform: "translateX(-50%) translateY(-0.5px) rotate(-0.5deg)",
					},
				},
			},
			animation: {
				"accordion-down": "accordion-down 0.2s ease-out",
				"accordion-up": "accordion-up 0.2s ease-out",
				rumble: "rumbleAnimation 0.7s ease-in-out infinite",
			},
		},
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;
