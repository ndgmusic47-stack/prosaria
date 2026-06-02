import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    screens: {
      'sm':  '640px',
      'md':  '768px',
      'lg':  '1024px',
      'xl':  '1280px',
      '2xl': '1536px',
    },
    extend: {
      colors: {
        navy:  { DEFAULT:'#050d1a', mid:'#0a1628', light:'#0f2040', deep:'#020810' },
        blue:  { neon:'#3b82f6', bright:'#60a5fa', glow:'#1d4ed8', dim:'#1e3a5f' },
        silver:{ DEFAULT:'#e8edf5', dim:'#94a3b8' },
      },
      fontFamily: {
        serif: ['var(--font-serif)','Georgia','serif'],
        sans:  ['var(--font-sans)','system-ui','sans-serif'],
      },
      fontSize: {
        'display-2xl': ['clamp(2.5rem,8vw,6rem)',   {lineHeight:'1.0', letterSpacing:'-0.03em'}],
        'display-xl':  ['clamp(2rem,5vw,4rem)',      {lineHeight:'1.05',letterSpacing:'-0.025em'}],
        'display-lg':  ['clamp(1.75rem,4vw,3rem)',   {lineHeight:'1.1', letterSpacing:'-0.02em'}],
        'display-md':  ['clamp(1.4rem,3vw,2.25rem)', {lineHeight:'1.2', letterSpacing:'-0.015em'}],
        'display-sm':  ['clamp(1.2rem,2vw,1.6rem)',  {lineHeight:'1.3', letterSpacing:'-0.01em'}],
        'body-lg':     ['clamp(1rem,2vw,1.125rem)',  {lineHeight:'1.75'}],
        'body-md':     ['1rem',                      {lineHeight:'1.7'}],
        'body-sm':     ['0.9375rem',                 {lineHeight:'1.65'}],
        'label':       ['0.75rem',                   {lineHeight:'1.4',letterSpacing:'0.08em'}],
      },
      maxWidth: { site:'1280px' },
      spacing: { section:'7.5rem','section-sm':'4rem' },
    },
  },
  plugins: [],
}
export default config
