import { backgroundBlurriness } from 'three/tsl';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        Porsche: ['PorscheNext', 'sans-serif'], 
        SignPainter: ['SignPainter', 'sans-serif'], 
      },
      borderRadius: {
        componentContainerRadius: 'var(--component-container-radius)', 
      },
      colors:{
        backgroundContainer: 'var(--background-container)',
        backgroundComponentContainer: 'var(--background-component-container)'
      }
    },
  },
  plugins: [],
}