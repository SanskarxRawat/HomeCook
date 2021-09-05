module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily:{
        homeheader:['Barrio'],
        navigation:['Permanent Marker'],
        homeContent:['Kaushan Script']
      },
      backgroundImage:(theme)=>({
        'login':"url('/public/images/login.jpg')",
      }),
    
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
