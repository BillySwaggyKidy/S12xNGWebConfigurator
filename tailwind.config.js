/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'media',
  content: [
    './app/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        myfont: ["MyFont","sans-serif"]
      },
      backgroundImage: {
        'authentification': "url('/app/assets/images/auth-background.jpg')",
        'admin': "url('/app/assets/images/admin-background.jpg')"
      },
      keyframes: {
        'fade-in-center' : {
          '0%': {
            opacity: '0',
          },
          '100%': {
              opacity: '1',
          },
        },
        'fade-out-center' : {
          '0%': {
            opacity: '1',
          },
          '100%': {
              opacity: '0',
          },
        },
        'fade-in-down': {
            '0%': {
                opacity: '0',
                transform: 'translateY(-10px)'
            },
            '100%': {
                opacity: '1',
                transform: 'translateY(0)'
            },
        },
        'fade-out-down': {
            '0%': {
                opacity: '1',
                transform: 'translateY(0px)'
            },
            '100%': {
                opacity: '0',
                transform: 'translateY(10px)'
            },
        },
        'fade-in-up': {
            '0%': {
                opacity: '0',
                transform: 'translateY(10px)'
            },
            '100%': {
                opacity: '1',
                transform: 'translateY(0)'
            },
        },
        'fade-out-up': {
            '0%': {
                opacity: '1',
                transform: 'translateY(0px)'
            },
            '100%': {
                opacity: '0',
                transform: 'translateY(10px)'
            },
        },
        'reverse-spin': {
          from: {
            transform: 'rotate(360deg)'
          },
        }
      },
      animation: {
          'fade-in-center': 'fade-in-center 0.2s ease-out',
          'fade-out-center': 'fade-out-center 0.1s ease-out',
          'fade-in-down': 'fade-in-down 0.1s ease-out',
          'fade-out-down': 'fade-out-down 0.1s ease-out',
          'fade-in-up': 'fade-in-up 0.1s ease-out',
          'fade-out-up': 'fade-out-up 0.1s ease-out',
          'reverse-spin': 'reverse-spin 1s linear infinite'
      }
    },
  },
  plugins: [],
}
