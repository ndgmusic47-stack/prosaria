import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        navy:    { DEFAULT: '#050d1a', mid: '#0a1628', light: '#0f2040', deep: '#020810' },
        blue:    { neon: '#3b82f6', bright: '#60a5fa', glow: '#1d4ed8', dim: '#1e3a5f' },
        silver:  { DEFAULT: '#e8edf5', dim: '#94a3b8', faint: '#475569' },
        prosaria:'#f0f4ff',
      },
      fontFamily: {
        serif: ['var(--font-serif)', 'Georgia', 'serif'],
        sans:  ['var(--font-sans)',  'system-ui', 'sans-serif'],
      },
      fontSize: {
        'display-2xl': ['clamp(3rem,8vw,6rem)',    {lineHeight:'1.0',letterSpacing:'-0.03em'}],
        'display-xl':  ['clamp(2.5rem,6vw,4.5rem)',{lineHeight:'1.05',letterSpacing:'-0.025em'}],
        'display-lg':  ['clamp(2rem,4vw,3.25rem)', {lineHeight:'1.1',letterSpacing:'-0.02em'}],
        'display-md':  ['clamp(1.5rem,3vw,2.25rem)',{lineHeight:'1.2',letterSpacing:'-0.015em'}],
        'display-sm':  ['clamp(1.25rem,2vw,1.75rem)',{lineHeight:'1.3',letterSpacing:'-0.01em'}],
        'body-lg':     ['1.125rem',{lineHeight:'1.75'}],
        'body-md':     ['1rem',    {lineHeight:'1.7'}],
        'body-sm':     ['0.9375rem',{lineHeight:'1.65'}],
        'label':       ['0.75rem', {lineHeight:'1.4',letterSpacing:'0.08em'}],
      },
      maxWidth: { site: '1280px' },
      backgroundImage: {
        'blue-gradient': 'linear-gradient(135deg, #050d1a 0%, #0a1628 50%, #0f2040 100%)',
        'blue-glow-radial': 'radial-gradient(ellipse at 50% 0%, rgba(59,130,246,0.15) 0%, transparent 70%)',
      },
    },
  },
  plugins: [],
}
export default config
