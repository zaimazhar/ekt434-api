module.exports = {
  purge: [
    'index.html',
    'app.js',
    'css/*'
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      'rubik': ['Rubik', 'sans-serif'],
      'nunitosans': ['"Nunito Sans"', 'sans-serif'],
      'ubuntu': ['Ubuntu', 'sans-serif']
    },
    extend: {
        animation: {
          'wiggle': 'wiggle 1s ease-in-out infinite',
          'spin-slow': 'spin 6s linear infinite',
          'scale': 'scale 3s linear infinite',
          'word': 'displayWord 1s linear'
        },
        keyframes: {
         wiggle: {
           '0%, 100%': { transform: 'rotate(-3deg)' },
           '50%': { transform: 'rotate(3deg)' },
         },
         scale: {
           '0%, 100%': { transform: 'scale(1)'},  
           '70%': { transform: 'scale(0.95)' },
           '50%': { transform: 'scale(0.9)' }
         },
         displayWord: {
          '0%': { color: 'white', 'font-size': '10px' }, 
          '100%': { color: 'black' }
         }
        }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
