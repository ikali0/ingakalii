import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
  	container: {
  		center: true,
  		padding: '2rem',
  		screens: {
  			'2xl': '1200px'
  		}
  	},
  	screens: {
  		xs: '400px',
  		sm: '640px',
  		md: '768px',
  		lg: '1024px',
  		xl: '1280px',
  		'2xl': '1536px'
  	},
  	extend: {
  		spacing: {
  			section: '6rem',
  			'section-sm': '4rem',
  			container: '2rem',
  			'container-lg': '3rem',
  			card: '1.5rem',
  			'card-sm': '1rem',
  			element: '0.75rem',
  			'element-sm': '0.5rem'
  		},
  		fontSize: {
  			'display-xl': [
  				'4.5rem',
  				{
  					lineHeight: '1',
  					letterSpacing: '-0.02em',
  					fontWeight: '700'
  				}
  			],
  			'display-lg': [
  				'3.5rem',
  				{
  					lineHeight: '1.1',
  					letterSpacing: '-0.02em',
  					fontWeight: '600'
  				}
  			],
  			'display-md': [
  				'2.5rem',
  				{
  					lineHeight: '1.15',
  					letterSpacing: '-0.015em',
  					fontWeight: '600'
  				}
  			],
  			'display-sm': [
  				'1.875rem',
  				{
  					lineHeight: '1.2',
  					letterSpacing: '-0.01em',
  					fontWeight: '600'
  				}
  			],
  			heading: [
  				'1.5rem',
  				{
  					lineHeight: '1.3',
  					letterSpacing: '-0.01em',
  					fontWeight: '600'
  				}
  			],
  			subheading: [
  				'1.125rem',
  				{
  					lineHeight: '1.4',
  					fontWeight: '500'
  				}
  			],
  			'body-lg': [
  				'1.125rem',
  				{
  					lineHeight: '1.625'
  				}
  			],
  			body: [
  				'1rem',
  				{
  					lineHeight: '1.625'
  				}
  			],
  			'body-sm': [
  				'0.875rem',
  				{
  					lineHeight: '1.5'
  				}
  			],
  			caption: [
  				'0.75rem',
  				{
  					lineHeight: '1.5'
  				}
  			],
  			overline: [
  				'0.6875rem',
  				{
  					lineHeight: '1.4',
  					letterSpacing: '0.15em',
  					fontWeight: '600'
  				}
  			]
  		},
  		colors: {
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			neural: {
  				DEFAULT: 'hsl(var(--neural))',
  				foreground: 'hsl(var(--neural-foreground))'
  			},
  			sidebar: {
  				DEFAULT: 'hsl(var(--sidebar-background))',
  				foreground: 'hsl(var(--sidebar-foreground))',
  				primary: 'hsl(var(--sidebar-primary))',
  				'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
  				accent: 'hsl(var(--sidebar-accent))',
  				'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
  				border: 'hsl(var(--sidebar-border))',
  				ring: 'hsl(var(--sidebar-ring))'
  			}
  		},
  		fontFamily: {
  			display: [
  				'Playfair Display',
  				'Georgia',
  				'serif'
  			],
  			body: [
  				'Inter',
  				'system-ui',
  				'sans-serif'
  			],
  			sans: [
  				'Lato',
  				'ui-sans-serif',
  				'system-ui',
  				'sans-serif',
  				'Apple Color Emoji',
  				'Segoe UI Emoji',
  				'Segoe UI Symbol',
  				'Noto Color Emoji'
  			],
  			serif: [
  				'Source Serif Pro',
  				'ui-serif',
  				'Georgia',
  				'Cambria',
  				'Times New Roman',
  				'Times',
  				'serif'
  			],
  			mono: [
  				'Geist Mono',
  				'ui-monospace',
  				'SFMono-Regular',
  				'Menlo',
  				'Monaco',
  				'Consolas',
  				'Liberation Mono',
  				'Courier New',
  				'monospace'
  			]
  		},
  		boxShadow: {
  			soft: 'var(--shadow-soft)',
  			card: 'var(--shadow-card)',
  			elevated: 'var(--shadow-elevated)'
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		keyframes: {
  			'accordion-down': {
  				from: {
  					height: '0'
  				},
  				to: {
  					height: 'var(--radix-accordion-content-height)'
  				}
  			},
  			'accordion-up': {
  				from: {
  					height: 'var(--radix-accordion-content-height)'
  				},
  				to: {
  					height: '0'
  				}
  			},
  			'pulse-glow': {
  				'0%, 100%': {
  					boxShadow: '0 4px 0 0 hsl(var(--primary) / 0.3), 0 0 15px hsl(var(--primary) / 0.2)'
  				},
  				'50%': {
  					boxShadow: '0 4px 0 0 hsl(var(--primary) / 0.4), 0 0 25px hsl(var(--primary) / 0.4)'
  				}
  			}
  		},
  		animation: {
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up': 'accordion-up 0.2s ease-out',
  			'pulse-glow': 'pulse-glow 2s ease-in-out infinite'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
