import type { Config } from "tailwindcss";

const config: Config = {
	darkMode: ["class"],
	content: [
		"./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			fontFamily: {
				sans: ["gg sans", "Whitney", "Helvetica Neue", "Helvetica", "Arial", "sans-serif"],
				display: ["Ginto Nord", "Whitney", "Helvetica Neue", "Helvetica", "Arial", "sans-serif"],
				mono: ["Consolas", "Andale Mono WT", "Andale Mono", "Lucida Console", "Lucida Sans Typewriter", "DejaVu Sans Mono", "Bitstream Vera Sans Mono", "Liberation Mono", "Nimbus Mono L", "Monaco", "Courier New", "Courier", "monospace"],
				abcgintodiscord: ["Abcgintodiscord", "sans-serif"],
			},
			colors: {
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				chart: {
					'1': 'hsl(var(--chart-1))',
					'2': 'hsl(var(--chart-2))',
					'3': 'hsl(var(--chart-3))',
					'4': 'hsl(var(--chart-4))',
					'5': 'hsl(var(--chart-5))'
				},
				// Discord specific colors using app prefix
				app: {
					blurple: "rgb(var(--app-blurple))",
					green: "rgb(var(--app-green))",
					yellow: "rgb(var(--app-yellow))",
					fuchsia: "rgb(var(--app-fuchsia))",
					red: "rgb(var(--app-red))",
					white: "#FFFFFF",
					black: "#000000",
					// Background colors
					"bg-primary": "rgb(var(--app-bg-primary))",
					"bg-secondary": "rgb(var(--app-bg-secondary))",
					"bg-tertiary": "rgb(var(--app-bg-tertiary))",
					// Text colors
					"text-normal": "rgb(var(--app-text-normal))",
					"text-muted": "rgb(var(--app-text-muted))",
					"text-link": "rgb(var(--app-text-link))",
					// Interactive colors
					"interactive-normal": "rgb(var(--app-interactive-normal))",
					"interactive-hover": "rgb(var(--app-interactive-hover))",
					"interactive-active": "rgb(var(--app-interactive-active))",
					// Border colors
					"border-light": "rgb(var(--app-border-light))",
					"border-dark": "rgb(var(--app-border-dark))",
				},
			},
			borderRadius: {
				lg: "var(--radius)",
				md: "calc(var(--radius) - 2px)",
				sm: "calc(var(--radius) - 4px)"
			},
			keyframes: {
				"accordion-down": {
					from: {
						height: "0",
					},
					to: {
						height: "var(--radix-accordion-content-height)",
					},
				},
				"accordion-up": {
					from: {
						height: "var(--radix-accordion-content-height)",
					},
					to: {
						height: "0",
					},
				},
			},
			animation: {
				"accordion-down": "accordion-down 0.2s ease-out",
				"accordion-up": "accordion-up 0.2s ease-out",
			},
			backgroundImage: {
				"footer-bg-image": "url('/images/footer_background.png')",
			},
			gridTemplateColumns: {
				"footer-grid-cols": "1fr 1fr 1fr auto auto auto auto",
				"footer-grid-cols-lg": "1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr",
				"footer-grid-cols-2xl": "1fr 1fr 1fr 1fr 90px 90px 90px 90px 90px 90px 90px 90px",
			},
		},
	},
	plugins: [require("tailwindcss-animate")],
};
export default config;
