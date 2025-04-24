import type { Config } from "tailwindcss"
import tailwindcssAnimate from 'tailwindcss-animate'

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
				primary: ['var(--font-primary)'],
				display: ['var(--font-display)'],
				code: ['var(--font-code)'],
				headline: ['var(--font-headline)'],
				'clan-body': ['var(--font-clan-body)'],
				'clan-signature': ['var(--font-clan-signature)'],
				'display-marketing': ['var(--font-display-marketing)'],
				'display-marketing-header': ['var(--font-display-marketing-header)'],
				/* sans: ["gg sans", "Whitney", "Helvetica Neue", "Helvetica", "Arial", "sans-serif"],
				display: ["Ginto Nord", "Whitney", "Helvetica Neue", "Helvetica", "Arial", "sans-serif"],
				mono: ["Consolas", "Andale Mono WT", "Andale Mono", "Lucida Console", "Lucida Sans Typewriter", "DejaVu Sans Mono", "Bitstream Vera Sans Mono", "Liberation Mono", "Nimbus Mono L", "Monaco", "Courier New", "Courier", "monospace"],*/
				abcgintonormal: ["ABC Ginto Normal", "sans-serif"],
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
					// Colors
					"not-quite-black": "rgba(var(--app-not-quite-black))",
					blurple: "rgba(var(--app-blurple))",
					black: "rgba(var(--app-black))",
					white: "rgba(var(--app-white))",
					"dark-charcoal": "rgba(var(--app-dark-charcoal))",
					"dark-button-hover": "rgba(var(--app-dark-button-hover))",
					"button-hover": "rgba(var(--app-button-hover))",
					greyple: "rgba(var(--app-greyple))",
					"spring-green": "rgba(var(--app-spring-green))",
					"dim-grey": "rgba(var(--app-dim-grey))",
					"off-white": "rgba(var(--app-off-white))",
					"dark-blurple": "rgba(var(--app-dark-blurple))",
					fuchsia: "rgba(var(--app-fuchsia))",
					yellow: "rgba(var(--app-yellow))",
					"mint-green": "rgba(var(--app-mint-green))",
					red: "rgba(var(--app-red))",
					"ekko-red": "rgba(var(--app-ekko-red))",
					"vivid-cerulean": "rgba(var(--app-vivid-cerulean))",
					orange: "rgba(var(--app-orange))",
					pink: "rgba(var(--app-pink))",
					"pinc-2": "rgba(var(--app-pinc-2))",
					green: "rgba(var(--app-green))",
					purple: "rgba(var(--app-purple))",
					"refresh-blue": "rgba(var(--app-refresh-blue))",
					"navy-blue": "rgba(var(--app-navy-blue))",
					"always-white": "rgba(var(--app-always-white))",

					// Background colors
					"bg-primary": "rgba(var(--app-bg-primary))",
					"bg-secondary": "rgba(var(--app-bg-secondary))",
					"bg-tertiary": "rgba(var(--app-bg-tertiary))",

					// Text colors
					"text-normal": "rgba(var(--app-text-normal))",
					"text-muted": "rgba(var(--app-text-muted))",
					"text-link": "rgba(var(--app-text-link))",

					// Interactive colors
					"interactive-normal": "rgba(var(--app-interactive-normal))",
					"interactive-hover": "rgba(var(--app-interactive-hover))",
					"interactive-active": "rgba(var(--app-interactive-active))",

					// Border colors
					"border-light": "rgba(var(--app-border-light))",
					"border-dark": "rgba(var(--app-border-dark))",
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
				fadeInUpCustom: {
					'0%': { opacity: "0", transform: 'translateY(50px)' },
					'25%': { opacity: "1" },
					'75%': { opacity: "1", transform: 'translateY(-10px)' },
					'100%': { opacity: "1", transform: 'translateY(0)' },
				},
			},
			animation: {
				"accordion-down": "accordion-down 0.2s ease-out",
				"accordion-up": "accordion-up 0.2s ease-out",
				"fade-in-up-custom": "fadeInUpCustom 0.75s ease-in-out forwards",
			},
			transitionDuration: {
				250: '250ms',
				400: '400ms',
			},
			backgroundImage: {
				"footer-bg-image": "url('/images/background/footer_background.png')",
			},
			gridTemplateColumns: {
				"footer-grid-cols": "1fr 1fr 1fr auto auto auto auto",
				"footer-grid-cols-lg": "1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr",
				"footer-grid-cols-2xl": "1fr 1fr 1fr 1fr 90px 90px 90px 90px 90px 90px 90px 90px",
			},
		},
	},
	plugins: [tailwindcssAnimate],
}
export default config
