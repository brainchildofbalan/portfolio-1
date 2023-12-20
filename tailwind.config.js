/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.{html,js}",],
  theme: {
    extend: {
      colors: {
        body: '#EAE9E6',
        primary: '#171612',
        secondary: '#CCEF92',
        // ...
      },
      container: {
        center: true,
        padding: 20,
        screens: {
          sm: '600px',
          md: '728px',
          lg: '984px',
          xl: '1240px',
          // '2xl': '1496px',
        },
      },
      fontFamily: {
        // 'sans': ['ui-sans-serif', 'system-ui',],
        // 'serif': ['ui-serif', 'Georgia',],
        // 'mono': ['ui-monospace', 'SFMono-Regular',],
        // 'display': ['Oswald',],
        // 'body': ['"Work Sans"', '"Playfair Display"',],
        'fly': ['"Playfair Display"', 'serif'],
        'work': ['"Work Sans"', 'sans-serif'],
      }
    }
  },
  plugins: [],
}