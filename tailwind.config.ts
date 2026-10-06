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
        // Display scale, retuned for a condensed face: larger sizes, tighter
        // leading, far less negative tracking than the previous serif needed.
        'display-2xl': ['clamp(2.75rem,7.5vw,6.5rem)', {lineHeight:'0.92',letterSpacing:'0'}],
        'display-xl':  ['clamp(2.25rem,5.5vw,4.5rem)', {lineHeight:'0.98',letterSpacing:'0'}],
        'display-lg':  ['clamp(2rem,4.5vw,3.5rem)',    {lineHeight:'1.02',letterSpacing:'0'}],
        'display-md':  ['clamp(1.6rem,3.2vw,2.5rem)',  {lineHeight:'1.08',letterSpacing:'0'}],
        'display-sm':  ['clamp(1.25rem,2.2vw,1.75rem)',{lineHeight:'1.2', letterSpacing:'0'}],
        // Body: calm and readable at 17-18px with comfortable leading.
        'body-lg':     ['clamp(1.125rem,2vw,1.3125rem)',{lineHeight:'1.65'}],
        'body-md':     ['1.125rem',                     {lineHeight:'1.7'}],
        'body-sm':     ['1.0625rem',                    {lineHeight:'1.65'}],
        'label':       ['0.75rem',                      {lineHeight:'1.4',letterSpacing:'0.08em'}],
      },
      maxWidth: { site:'1280px' },
      spacing: { section:'7.5rem','section-sm':'4rem' },
    },
  },
  plugins: [],
}
export default config
