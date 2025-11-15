/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./*.html",
    "./meals/*.html",
    "./meals/*.js",
    "./*.js"
  ],
  theme: {
    extend: {
      // Sage & Gold Color System
      colors: {
        // Primary Palette
        sage: {
          DEFAULT: '#8B9D83',
          hover: '#7A8C74',
          light: '#A8B8A0',
          dark: '#6D7A66',
        },
        gold: {
          DEFAULT: '#B8956A',
          hover: '#A38660',
          soft: '#D4A574',
        },
        cream: {
          DEFAULT: '#FAF8F5',
          dark: '#F5F1EC',
        },

        // Text Colors
        charcoal: {
          DEFAULT: '#2D3436',
        },
        gray: {
          secondary: '#636E72',
        },

        // Semantic Colors
        success: '#7FA87F',
        warning: '#D4A574',
        error: '#C17B7B',
        info: '#8B9DC3',

        // Recipe Category Colors
        category: {
          breakfast: '#F4E4D7',
          lunch: '#E8F0E8',
          dinner: '#E8DFE0',
          dessert: '#F2E8DC',
        },
      },

      // Typography
      fontFamily: {
        playfair: ['Playfair Display', 'serif'],
        inter: ['Inter', 'sans-serif'],
      },
      fontSize: {
        'h1': ['36px', { lineHeight: '1.3', fontWeight: '600' }],
        'h2': ['28px', { lineHeight: '1.3', fontWeight: '600' }],
        'h3': ['22px', { lineHeight: '1.3', fontWeight: '600' }],
        'body-lg': ['18px', { lineHeight: '1.6', fontWeight: '400' }],
        'body': ['16px', { lineHeight: '1.6', fontWeight: '400' }],
        'body-sm': ['14px', { lineHeight: '1.6', fontWeight: '400' }],
        'caption': ['12px', { lineHeight: '1.4', fontWeight: '400' }],
      },

      // Spacing (base unit: 8px)
      spacing: {
        'xs': '4px',
        'sm': '8px',
        'md': '16px',
        'lg': '24px',
        'xl': '32px',
        '2xl': '48px',
        '3xl': '64px',
      },

      // Border Radius
      borderRadius: {
        'btn': '6px',
        'card': '8px',
        'input': '6px',
        'badge': '12px',
      },

      // Shadows (Elevation)
      boxShadow: {
        'card': '0 2px 8px rgba(45, 52, 54, 0.08)',
        'card-hover': '0 4px 16px rgba(45, 52, 54, 0.12)',
        'modal': '0 8px 32px rgba(45, 52, 54, 0.16)',
        'dropdown': '0 4px 12px rgba(45, 52, 54, 0.10)',
        'button': '0 2px 4px rgba(139, 157, 131, 0.2)',
        'fab': '0 4px 12px rgba(184, 149, 106, 0.4)',
      },

      // Container Widths
      maxWidth: {
        'mobile': '100%',
        'tablet': '720px',
        'desktop': '1200px',
        'wide': '1400px',
        'content': '800px',
      },
    },
  },
  plugins: [],
}

