import type { Config } from "tailwindcss"
import tailwindcssAnimate from "tailwindcss-animate"

const plumColors: Record<number, string> = {};
for (let i = 0; i < 26; i++) {
	plumColors[i] = `hsl(var(--plum-${i}-hsl) / <alpha-value>)`;
}

const config: Config = {
	darkMode: ["class"],
	content: [
		"./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	safelist: [
		"mb-7",
		"bg-[linear-gradient(135deg,#8547c6_25%,#b845c1_62%,#ab5d8a_95%)]",
		"max-w-[51px]",
		"md:max-w-none",
		"row-start-1",
		"col-start-3",
		"row-end-2",
		"col-end-4",
		"md:row-start-1",
		"md:col-start-3",
		"md:row-end-2",
		"md:col-end-4",
	],
	theme: {
		extend: {
			screens: {
				'2xl': '1440px',
				'3xl': '1920px',
			},
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
				abcgintonormal: ['"ABC Ginto Normal"', 'sans-serif'],
				abcgintonormalbold: ['"ABCGintoNormal-Bold"', 'sans-serif'],
				abcgintodiscord: ['"Abcgintodiscord"', 'sans-serif'],
				abcgintodiscordnord: ['"Abcgintodiscordnord"', 'sans-serif'],
				abcgintonordextrabold: ['"Abcgintonord 800"', 'sans-serif'],
				ggsans: ['"Ggsans"', 'sans-serif'],
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
					"blurple-hover": "rgba(var(--app-blurple-hover))",
					black: "rgba(var(--app-black))",
					white: "rgba(var(--app-white))",
					"dark-charcoal": "rgba(var(--app-dark-charcoal))",
					"dark-button-hover": "rgba(var(--app-dark-button-hover))",
					"button-hover": "rgba(var(--app-button-hover))",
					greyple: "rgba(var(--app-greyple))",
					"spring-green": "rgba(var(--app-spring-green))",
					"dim-grey": "rgba(var(--app-dim-grey))",
					"off-white": "rgba(var(--app-off-white))",
					"dark-off-white": "rgba(var(--app-dark-off-white))",
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
					"brand-360": "var(--brand-360)",
					"brand-400": "var(--brand-400)",
					"brand-500": "var(--brand-500)",
					"brand-560": "var(--brand-560)",
					"brand-600": "var(--brand-600)",
					"status-danger": "var(--status-danger)",

					// Background colors
					"bg-primary": "rgba(var(--app-bg-primary))",
					"bg-secondary": "rgba(var(--app-bg-secondary))",
					"bg-secondary-alt": "var(--app-bg-secondary-alt)",
					"bg-tertiary": "rgba(var(--app-bg-tertiary))",
					"bg-tertiary-2": "var(--app-bg-tertiary-2)",
					"bg-brand-experiment": "var(--brand-experiment)",
					"bg-brand-experiment-560": "var(--brand-experiment-560)",
					"bg-base-lower": "var(--app-background-base-lower)",
					"bg-modifier-selected": "var(--app-background-modifier-selected)",
					"bg-floating": "var(--app-background-floating)",
					"bg-input": "var(--app-input-background)",
					"bg-input-2": "var(--app-input-background-2)",
					"bg-button-hover": "var(--app-button-background-hover)",
					"bg-button-2": "var(--app-button-background-2)",
					"bg-button-2-hover": "var(--app-button-background-2-hover)",
					"bg-button-secondary": "var(--app-button-secondary-background)",
					"bg-button-filled-brand": "var(--app-button-filled-brand-background)",
					"bg-button-filled-brand-active": "var(--app-button-filled-brand-background-active)",
					"bg-button-filled-brand-hover": "var(--app-button-filled-brand-background-hover)",
					"bg-checkbox-default": "var(--app-checkbox-background-default)",
					"bg-checkbox-checked": "var(--app-checkbox-background-checked)",

					// Text colors
					"text-normal": "rgba(var(--app-text-normal))",
					"text-normal-2": "var(--app-text-normal-2)",
					"text-normal-3": "var(--app-text-normal-3)",
					"text-muted": "rgba(var(--app-text-muted))",
					"text-muted-2": "var(--app-text-muted-2)",
					"text-muted-3": "var(--app-text-muted-3)",
					"text-link": "rgba(var(--app-text-link))",
					"text-link-2": "var(--app-text-link-2)",
					"text-danger": "var(--app-text-danger)",
					"header-primary": "var(--app-header-primary)",
					"header-secondary": "var(--app-header-secondary)",
					"header-secondary-2": "var(--app-header-secondary-2)",

					// Interactive colors
					"interactive-normal": "rgba(var(--app-interactive-normal))",
					"interactive-normal-2": "var(--app-interactive-normal-2)",
					"interactive-hover": "rgba(var(--app-interactive-hover))",
					"interactive-active": "rgba(var(--app-interactive-active))",

					// Border colors
					"border-light": "rgba(var(--app-border-light))",
					"border-dark": "rgba(var(--app-border-dark))",
					"border-subtle": "var(--app-border-subtle)",
					"border-input": "var(--app-input-border)",
					"border-button-filled-brand": "var(--app-button-filled-brand-border)",
					"border-checkbox-default": "var(--app-checkbox-border-default)",
					"border-checkbox-checked": "var(--app-checkbox-border-checked)",
				},
				plum: plumColors,
			},
			borderRadius: {
				lg: "var(--radius)",
				md: "calc(var(--radius) - 2px)",
				sm: "calc(var(--radius) - 4px)"
			},
			boxShadow: {
				'app-high': '0px 12px 24px 0px var(--app-shadow-high)',
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
					'0%': { opacity: '0', transform: 'translateY(50px)' },
					'25%': { opacity: '1' },
					'75%': { opacity: '1', transform: 'translateY(-10px)' },
					'100%': { opacity: '1', transform: 'translateY(0)' },
				},
				"fadeInDown": {
					"0%": { opacity: '0', transform: 'translateY(-20px) translateZ(-20px) scaleZ(2)' },
					"100%": { opacity: '1', transform: 'translateY(0px) translateZ(0px) scaleZ(1)' },
				},
				"opacityIn": {
					from: { opacity: "0" },
					to: { opacity: "1" },
				},
				"opacityOut": {
					from: { opacity: "1" },
					to: { opacity: "0" },
				},
				rotate20: {
					'0%, 100%': { transform: 'translate3d(0px, 0px, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg)', },
					'50%': { transform: 'translate3d(0px, 0px, 0px) scale3d(1.1, 1.1, 1) rotateX(0deg) rotateY(0deg) rotateZ(10deg) skew(0deg, 10deg)', },
				},
				rotate20Smooth: {
					'0%': { transform: 'translate3d(0px, 0px, 0px) scale3d(1,1,1) rotateZ(0deg)', },
					'25%': { transform: 'translate3d(-19px, -5px, 0px) scale3d(1.1,1.1,1) rotateZ(12deg)', },
					'50%': { transform: 'translate3d(0px, 8px, 0px) scale3d(0.9,0.9,1) rotateZ(23deg)', },
					'65%': { transform: 'translate3d(-5px, 15px, 0px) scale3d(1,1,1) rotateZ(15deg)', },
					'85%': { transform: 'translate3d(0px, 8px, 0px) scale3d(1,1,1) rotateZ(6deg)', },
					'100%': { transform: 'translate3d(0px, 0px, 0px) scale3d(1,1,1) rotateZ(0deg)', },
				},
				rotate20SmoothReverse: {
					'0%': { transform: 'translate3d(0px, 0px, 0px) scale3d(1,1,1) rotateZ(0deg)', },
					'20%': { transform: 'translate3d(5px, -10px, 0px) scale3d(1,1,1) rotateZ(-12deg)', },
					'45%': { transform: 'translate3d(10px, -20px, 0px) scale3d(1.2,1.2,1) rotateZ(-23deg)', },
					'60%': { transform: 'translate3d(10px, -20px, 0px) scale3d(1.15,1.15,1) rotateZ(-15deg)', },
					'80%': { transform: 'translate3d(5px, -10px, 0px) scale3d(1.1,1.1,1) rotateZ(-6deg)', },
					'100%': { transform: 'translate3d(0px, 0px, 0px) scale3d(1,1,1) rotateZ(0deg)', },
				},
				transformYPulse: {
					'0%': { transform: 'translate3d(0px, 0px, 0px)' },
					'50%': { transform: 'translate3d(0px, -10px, 0px)' },
					'100%': { transform: 'translate3d(0px, 0px, 0px)' },
				},
				widthPulse: {
					'0%': { width: '100%', filter: 'blur(0px)' },
					'30%': { width: '50%', filter: 'blur(0.5px)' },
					'70%': { width: '105%', filter: 'blur(0.5px)' },
					'100%': { width: '100%', filter: 'blur(0px)' },
				},
				"expand-down": {
					"0%": { height: "0px", opacity: "0" },
					"5%": { opacity: "1" },
					"100%": { height: "var(--expand-height)", opacity: "1" },
				},
				"expand-up": {
					"0%": { height: "var(--expand-height)", opacity: "1" },
					"90%": { opacity: "1" },
					"91%": { opacity: "0" },
					"100%": { height: "0px", opacity: "0" },
				},
				"shake": {
					"0%, 100%": { transform: 'translateX(0)' },
					"10%, 30%, 50%, 70%, 90%": { transform: 'translateX(-5px)' },
					"20%, 40%, 60%, 80%": { transform: 'translateX(5px)' },
				},
				"spinnerWanderingCubes": {
					"25%": { transform: 'translateX(22px) rotate(-90deg) scale(0.5)' },
					"50%": { transform: 'translateX(22px) translateY(22px) rotate(-180deg)' },
					"75%": { transform: 'translateX(0) translateY(22px) rotate(-270deg) scale(0.5)' },
					"to": { transform: 'rotate(-1turn)' },
				},
			},
			animation: {
				"accordion-down": "accordion-down 0.2s ease-out",
				"accordion-up": "accordion-up 0.2s ease-out",
				"fade-in-up-custom": "fadeInUpCustom 0.75s ease-in-out forwards",
				"fade-in-down": "fadeInDown 0.170s ease-in-out",
				"rotate-20": "rotate20 5s ease-in-out infinite",
				"rotate-20-smooth": "rotate20Smooth 25s ease-in-out infinite",
				"rotate-20-smooth-reverse": "rotate20SmoothReverse 25s ease-in-out infinite",
				"transform-y-pulse": "transformYPulse 5s ease-in-out infinite",
				"width-pulse": "widthPulse 5s ease-in-out infinite",
				"expand-down": "expand-down 0.5s ease-in-out forwards",
				"expand-up": "expand-up 0.5s ease-in-out forwards",
				"opacity-in": "opacityIn 0.5s ease-out forwards",
				"opacity-out": "opacityOut 0s ease-out forwards",
				"shake": "shake 0.5s",
				"spinner-wandering-cubes": "spinnerWanderingCubes 1.8s ease-in-out infinite",
			},
			animationDuration: {
				'7s': '7000ms',
			},
			animationDelay: {
				'900': '900ms',
				'm900': '-900ms',
			},
			transitionDuration: {
				170: '170ms',
				250: '250ms',
				350: '350ms',
				400: '400ms',
				1800: '1800ms',
			},
			transitionDelay: {
				'900': '900ms',
				'm900': '-900ms',
			},
			backgroundImage: {
				"home-image": "url('/images/home/home_hero_image.webp')",
				"home-hero-bg-image": "url('/images/background/home_hero_bg.webp')",
				"home-crown-bg-image": "url('/images/background/home_crown_bg_2025.webp')",
				"home-trophy-bg-image": "url('/images/background/home_trophy_bg_2025.webp')",
				"home-texture-2-bg-image": "url('/images/background/home_texture_bg_2.webp')",
				"home-texture-3-bg-image": "url('/images/background/home_texture_bg_3.webp')",
				"home-texture-4-bg-image": "url('/images/background/home_texture_bg_4.webp')",
				"home-texture-5-bg-image": "url('/images/background/home_texture_bg_5.webp')",
				"home-texture-6-bg-image": "url('/images/background/home_texture_bg_6.webp')",
				"home-texture-7-bg-image": "url('/images/background/home_texture_bg_7.webp')",
				"home-line-bg-image": "url('/images/background/home_line_bg_2025.png')",
				"footer-bg-image": "url('/images/background/footer_bg.png')",
				"download-bg-image": "url('/images/background/BG-downloads.webp')",
				"download-banner-bg-image": "url('/images/background/Background_(3).png')",
				"nitro-bg-image": "linear-gradient(#0000, #ec91f5 86%, #ec91f5), url('/images/background/nitro_Section.svg')",
				"nitro-banner-bg-image": "url('/images/background/nitro_Group 482478.svg'), linear-gradient(135deg, #8547c6 10%, #b845c1 50%, #ab5d8a)",
			},
			backgroundSize: {
				'auto-90p': 'auto 90%',
				'auto-100p': 'auto 100%',
				'0p': '0%',
				'25p': '25%',
				'31p': '31%',
				'33p': '33%',
				'50p': '50%',
				'75p': '75%',
				'90p': '90%',
				'90p-auto': '90%, auto',
				'910p': '91%',
				'93p': '93%',
				'95p': '95%',
				'95.5p': '95.5%',
				'96p': '96%',
				'100p': '100%',
				'110p': '110%',
				'250p': '250%',
				'24px': '24px',
				'32px': '32px',
				'1000px': '1000px',
				'1200px': '1200px',
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
