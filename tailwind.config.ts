import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      animation: {
        typing:
          'typing 3s steps(40) infinite, blink-caret 0.75s step-end infinite;'
      },
      keyframes: {
        typing: { '0%': { width: '0' }, '100%': { width: '100%' } },
        'blink-caret': { '0%': {}, '100%': { 'border-color': 'transparent' } }
      }
    }
  },
  plugins: []
}
export default config
