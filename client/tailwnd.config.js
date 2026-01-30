/** @type {import('tailwindcss').Config} */
export default {
    content: [
      "./index.html",
      "./src/**/*.{js,jsx,ts,tsx}"
    ],
    theme: {
      extend: {
        fontFamily: {
          display: ['Raleway', 'sans-serif'],
          body: ['Raleway', 'sans-serif']
        },
        fontWeight: {
          extralight: 200,
          light: 300,
          normal: 400,
          medium: 500,
          semibold: 600,
          bold: 700,
          extrabold: 800,
          black: 900
        },
        colors: {
          verdoscuro: '#1E431D',
          verdolight: '#8CA576',
          beigeLight: '#D8D1C1',
          beigeMedium: '#D9BD9C',
          marrone: '#A68365',
          white: '#FFFFFF',
          black: '#000000'
        }
      }
    },
    plugins: [],
  }
  