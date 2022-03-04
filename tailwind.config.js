module.exports = {
    content: [
      "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
        extend: {
            backgroundImage: {
                'clay': 'url(/src/images/clay.jpg)',
                'earthy': 'url(/src/images/earthy.jpg)',
                'desk': 'url(/src/images/desk.jpg)',
                'white-texture': 'url(/src/images/white-texture.jpg)',
                'menu-icon': 'url(/src/images/menu.png)',
                'multiply-icon': 'url(/src/images/multiply.png)',
                'gray-lines': 'url(/src/images/gray-lines.jpg)',
                'jimi': 'url(/src/images/jimi.jpg)',
                'kurt': 'url(/src/images/kurt.jpg)',
                'audience': 'url(/src/images/audience.jpg)',
                'mayer': 'url(/src/images/mayer.jpg)'
            },
    
            fontFamily: {
                'poppins': 'Poppins',
                'yantramanav': 'Yantramanav'
            },
    
            backgroundColor: theme => ({
    
                ...theme('colors'),
         
                'clay-color': '#f08c6e',
                'earthy-color': '#ca8572',
                'wood-color': '#c98f62',
                'plant-color': '#557b41',
                'dark-gray-color': '#232429',
                'jimi-color': '#f6af3b',
                'kurt-color': '#010101',
                'mayer-color': '#3426ad'
            }),
    
            textColor: theme => theme('colors'),
            textColor: {
    
                'clay-color': '#f08c6e',
                'earthy-color': '#ca8572',
                'wood-color': '#c98f62',
                'plant-color': '#557b41',
                'dark-gray-color': '#232429',
                'jimi-color': '#f6af3b',
                'kurt-color': '#010101',
                'mayer-color': '#3426ad'
            },
    
            borderColor: theme => ({
    
                ...theme('colors'),
                 DEFAULT: theme('colors.gray.300', 'currentColor'),
         
                'clay-color': '#f08c6e',
                'earthy-color': '#ca8572',
                'wood-color': '#c98f62',
                'plant-color': '#557b41',
                'dark-gray-color': '#232429',
                'jimi-color': '#f6af3b',
                'kurt-color': '#010101',
                'mayer-color': '#3426ad'
            }),
    
            height: {
                100: '28rem'
            },
    
            minHeight: {
                '1/2': '50%'
            }
        },
      },
    plugins: [],
  }