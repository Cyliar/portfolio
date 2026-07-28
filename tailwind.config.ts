import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      screens: {
        rail: '880px',
      },
      colors: {
        ink: '#0A0F1E',
        'ink-2': '#131B33',
        'ink-3': '#1B1440',
        paper: '#E8ECFB',
        'paper-2': '#8B93B8',
        signal: '#7C5CFF',
        pulse: '#22D3EE',
        glass: 'rgba(255,255,255,0.05)',
        'glass-border': 'rgba(255,255,255,0.12)',
      },
      fontFamily: {
        display: ['"Bricolage Grotesque"', 'system-ui', 'sans-serif'],
        body: ['"IBM Plex Sans"', 'system-ui', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'ui-monospace', 'monospace'],
      },
      keyframes: {
        pulseGlow: {
          '0%': { boxShadow: '0 0 0 0 rgba(34,211,238,0.45)' },
          '70%': { boxShadow: '0 0 0 9px rgba(34,211,238,0)' },
          '100%': { boxShadow: '0 0 0 0 rgba(34,211,238,0)' },
        },
      },
      animation: {
        'ping-slow': 'pulseGlow 2.6s ease-out infinite',
      },
    },
  },
  plugins: [],
} satisfies Config
