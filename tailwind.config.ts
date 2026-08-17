import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      screens: {
        // Bascule entre le menu mobile plein écran et la nav horizontale.
        nav: '860px',
      },
      colors: {
        void: '#05060B',
        surface: '#0B0D16',
        'surface-2': '#12162A',
        line: 'rgba(255,255,255,0.09)',
        'line-strong': 'rgba(255,255,255,0.18)',
        text: '#EEF1FF',
        muted: '#9AA3C7',
        'muted-2': '#6B7399',
        violet: '#7C5CFF',
        cyan: '#22D3EE',
        magenta: '#F472B6',
        amber: '#FFB86B',
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'system-ui', 'sans-serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      maxWidth: {
        shell: '1180px',
      },
      keyframes: {
        drift: {
          '0%, 100%': { transform: 'translate3d(0,0,0) scale(1)' },
          '33%': { transform: 'translate3d(6%,-8%,0) scale(1.12)' },
          '66%': { transform: 'translate3d(-7%,5%,0) scale(0.94)' },
        },
        marquee: {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-50%)' },
        },
        haloPulse: {
          '0%': { opacity: '0.55', transform: 'scale(1)' },
          '70%': { opacity: '0', transform: 'scale(1.35)' },
          '100%': { opacity: '0', transform: 'scale(1.35)' },
        },
        sheen: {
          '0%': { transform: 'translateX(-120%) skewX(-18deg)' },
          '100%': { transform: 'translateX(320%) skewX(-18deg)' },
        },
        scrollHint: {
          '0%': { transform: 'translateY(-60%)', opacity: '0' },
          '40%': { opacity: '1' },
          '100%': { transform: 'translateY(180%)', opacity: '0' },
        },
      },
      animation: {
        'drift-slow': 'drift 26s ease-in-out infinite',
        'drift-slower': 'drift 34s ease-in-out infinite',
        marquee: 'marquee 38s linear infinite',
        'halo-pulse': 'haloPulse 2.8s ease-out infinite',
        sheen: 'sheen 1.1s ease-out',
        'scroll-hint': 'scrollHint 2.2s ease-in-out infinite',
      },
    },
  },
  plugins: [],
} satisfies Config
