export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./src/**/**/*.{js,ts,jsx,tsx}",
    'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        homepage: "linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.4)), url('/img/home-background.jpg')",
      },
      spacing: {
        18: "4.5rem",
      },
      colors: {
        'black': '#212121',
        'whitegray': '#eeeeee',
        'green-accent': '#1d6d03',
        'green-variant': '#8ac775',
        'orange-accent': '#f2b963',
        'green-dark' : '#1e453e',
        'neutral-gray' : '#f0f2f6'
      },
      spacing: {
        18: '4.5rem',
        68: '17rem',
        88: '22rem'
      },
      maxWidth: {
        '8xl': '1536px'
      },
      animation: {
        'spin-slow': 'spin 30s linear infinite',
      },
      screens: {
        'xs': '380px',
        '3xl': '1620px'
      }
    },
  },
}
