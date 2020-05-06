module.exports = {
  important: true, //optional
  purge: {
    enabled: process.env.NODE_ENV === 'production',
    content: ['./pages/**/*.{js,jsx,ts,tsx}', './components/**/*.{js,jsx,ts,tsx}'],
    options: {
      whitelist: [],
    },
  },
  theme: {
    colors: {
      primary: '#A4C7E3',
      secondary: '#7D98AD',
    },
    extend: {},
  },
  variants: {},
  plugins: [],
  corePlugins: {
    outline: false,
  },
}
