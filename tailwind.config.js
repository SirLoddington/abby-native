/** @type {import('tailwindcss').Config} */

const colors = require('tailwindcss/colors');
// const plugin = require('tailwindcss/plugin');
module.exports = {
  //NEW FOLDERS NEED TO BE ADDED TO CONTENT
  content: [
    './App.{js,jsx,ts,tsx}',
    './screens/**/*.{js,jsx,ts,tsx}',
    './components/**/*.{js,jsx,ts,tsx}'
  ],
  // assets: ["./fonts/"],
  theme: {
    colors: {
      ...colors,
      'background-black': {
        DEFAULT: '#0F0F19',
        light: '#16161C',
        80: '#333333'
      },
      blue: {
        DEFAULT: '#0065FF',
        shadowLight: 'rgb(0, 101, 255, 0.2)',
        light: '#2109E0',
        veryLight: '#E8F2FF',
        pale: '#00CFFF',
        dark: '#0035b0',
        veryDark: '#1F2937',
        link: '#0057FF',
        mark: '#076BEE',
        btnlight: '#0B56FF',
        btndark: '#074DED',
        nav: '#009BFE',
        new: '#0499FE',
        beta: '#0091FC',
        buttonhighlight: '#1414FF'
      },
      'highlight-blue': {
        DEFAULT: '#0076FF'
      },
      gray: {
        DEFAULT: '#707070',
        dark: '#1b1b25',
        light: '#FAFAFA',
        lighter: '#E7E7E7',
        underline: '#E5E7EB',
        charcoal: 'rgb(31, 42, 55, 0.9)'
      },
      black: { ...colors.black, DEFAULT: '#404040', docBlack: '#03031d' },
      red: {
        DEFAULT: '#E70000',
        triageRed: '#DC1414',
        shawdowLight: 'rgb(256, 56, 56, 0.2)',
        darkRed: '#B91C1C'
      },
      purple: {
        ending: '#5E5BE6',
        starting: '#BF5BF3',
        DEFAULT: '#7F00FF'
      },
      yellow: {
        DEFAULT: '#FFB21E',
        new: '#FFE600',
        highlight: '#FBC844'
      },
      green: {
        DEFAULT: '#06BA63',
        shawdowLight: 'rgb(59, 178, 115, 0.2)',
        light: '#3BB2731A',
        summary: '#169954'
      },
      pink: {
        DEFAULT: '#FF0F80'
      },
      orange: {
        DEFAULT: '#FF7800'
      }
    },

    letterSpacing: {
      tight: '-1.5px',
      littlertightish: '-0.75px',
      littlertight: '-0.5px',
      normal: '0',
      tiny: '0.12px',
      some: '0.24px',
      charlie: '0.5px',
      wide: '1.0px',
      widest: '2.2px',
      abbyLogo: '-0.15rem'
    },
    fontSize: {
      xxxs: '8px', // 0.5 * 16px
      xxs: '10px', // 0.625 * 16px
      xs: '12px', // 0.75 * 16px
      sm: '14px', // 0.875 * 16px
      base: '16px', // 1 * 16px
      lg: '16px', // 1 * 16px
      xl: '18px', // 1.125 * 16px
      mid: '22px', // 1.375 * 16px
      '2xl': '24px', // 1.5 * 16px
      '3xl': '30px', // 1.875 * 16px
      '3.5xl': '35.2px', // 2.2 * 16px
      '4xl': '44.8px', // 2.8 * 16px
      '5xl': '48px', // 3 * 16px
      '5.25xl': '56px', // given as pixel value
      '5.5xl': '60px', // given as pixel value
      '6xl': '64px', // 4 * 16px
      '7xl': '80px', // 5 * 16px
      '8xl': '96px', // 6 * 16px
      '9xl': '128px', // 8 * 16px
      '10xl': '160px', // 10 * 16px
      '11xl': '176px', // 11 * 16px
      '12xl': '192px', // 12 * 16px
      '13xl': '208px', // 13 * 16px
      '14xl': '224px' // 14 * 16px
    },
    borderRadius: {
      none: '0',
      sm: '0.125rem',
      DEFAULT: '0.25rem',
      md: '0.375rem',
      lg: '0.5rem',
      xl: '40px',
      '2xl': '1.875rem',
      full: '9999px',
      large: '2rem',
      mid: '1.25rem',
      charlie: '20px',
      base: '0.875rem',
      '2lg': '14px'
    },
    extend: {
      fontFamily: {
        geo: 'Georama_400Regular',
        sans: ['AvenirNext'],
        mono: ['AvenirNext'],
        comma: ['PT Sans'],
        doctor: ['Bai Jamjuree'],
        title: ['Poppins_400Regular'],
        userText: ['Spectral']
      },
      keyframes: {
        boomUp: {
          '0%, 100%': {
            transform: 'rotate(-10deg)',
            transformOrigin: 'center left'
          },
          '50%': { transform: 'rotate(10deg)', transformOrigin: 'center left' }
        },
        boomDown: {
          '0%, 100%': {
            transform: 'rotate(10deg)',
            transformOrigin: 'center right'
          },
          '50%': {
            transform: 'rotate(-10deg)',
            transformOrigin: 'center right'
          }
        }
      },
      animation: {
        boomUp: 'boomUp 200ms ease-in-out',
        boomDown: 'boomDown 200ms ease-in-out'
      },
      outline: {
        offsetlg: ['2px solid #E8E8E8', '30px']
      },
      inset: {
        '1/6': '16.666666667%',
        '1/12': '8.333333333%',
        '-1/12': '-8.333333333%',
        '-2/12': '16.66666667%',
        '-4/12': '-33.33333333%',
        '-1/10': '-10%',
        '-2/5': '-25%',
        '-dropdown': '-44rem',
        18: '4.5rem',
        68: '17rem'
      },
      margin: {
        '1/12': '8.33333333%',
        '2/12': '16.6666667%',
        '28%': '28%',
        '3/12': '25%',
        '4/12': '33.33333333%',
        '6/12': '50%',
        '1/24': '4.16666667%',
        '3/24': '12.5%',
        '1/5': '20%',
        '3/5': '60%',
        '4/5': '80%',
        1.5: '6px',
        full: '100%',
        '110%': '110%',
        '1/9': '11.11111111%',
        '-4/12': '-33.33333333%',
        '6.7rem': '6.7rem',
        dot: '-6px',
        34: '8.5rem'
      },
      maxWidth: {
        16: '16rem'
      },
      width: {
        '5/24': '20.83333333%',
        '7/24': '29.166666667%',
        '4/9': '44.44444444%',
        '5/9': '55.55555556%',
        '5/18': '27.77777778%',
        '5/6': '83.33333333%',
        '5/7': '71.42857143%',
        '3/8': '37.5%',
        '1/10': '10%',
        '3/10': '30%',
        '9/10': '90%',
        dropdown: '52rem',
        '3/5': '60%',
        300: '18.75rem',
        88: '22rem',
        92: '23rem',
        76: '19rem',
        68: '17rem',
        100: '26rem',
        '25rem': '25rem',
        '26rem': '26rem',
        '27rem': '27rem',
        '28rem': '28rem',
        29: '29rem',
        '30rem': '30rem',
        '31rem': '31rem',
        '32rem': '32rem',
        33: '33rem',
        '38rem': '38rem',
        '36rem': '36rem',
        '40rem': '40rem',
        42: '42rem',
        '48rem': '48rem'
      },
      padding: {
        '-20': '4rem',
        '-2': '-1rem',
        1.5: '6px'
      },
      lineHeight: {
        verylittle: '1.1',
        some: '1.58',
        charlie: '1.8',
        lg: '3rem',
        xl: '4rem',
        'xl+': '5rem',
        xxl: '5.5rem'
      },
      transitionDuration: {
        4000: '2000ms'
      },
      zIndex: {
        '-2': '-2'
      },
      height: {
        statistics: '33rem',
        'statistics-mobile': '30rem',
        '29rem': '29rem',
        model: '36rem',
        slides: '36rem',
        example: '32rem',
        'example-small': '20rem',
        88: '22rem',
        25: '25rem',
        '27rem': '27rem',
        poc: '28rem',
        initial: '26rem',
        22: '5.5rem',
        40: '40rem',
        '5/12': '41.6%',
        '7/12': '58.3%',
        screen: 'calc(var(--vh) * 100)'
      },
      maxHeight: {
        '10000px': '10000px',
        doubleScreen: '200vh'
      },
      // boxShadow: {
      //   '3xl': '0 3px 3px -1px rgba(255, 255, 255, 0.08)'
      // },
      opacity: {
        2: '0.04'
      },
      spacing: {
        '1/8': '12.5%',
        '1/4': '25%'
      },
      minWidth: {
        0: '0',
        5: '5rem',
        48: '48rem',
        '25rem': '25rem'
      },
      minHeight: {
        half: '50%',
        88: '22rem',
        '20rem': '20rem',
        '19rem': '19rem',
        '10rem': '10rem',
        10: '8rem',
        '29rem': '29rem',
        full: '65vh',
        screen: 'calc(var(--vh) * 100)'
      },
      scale: {
        85: '0.85'
      },
      borderWidth: {
        '1-5': '1.5px',
        3: '3px',
        3.5: '3.5px',
        5: '5px'
      },
      top: {
        200: '30rem',
        68: '17rem'
      },
      bottom: {
        '-200': '-36rem',
        1.5: '0.35rem'
      }
    }
  },
  plugins: []
};
