
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class', // Enable dark mode with class
  theme: {
    extend: {
      colors: {
        // Futuristic color palette - Dark mode
        'neo-black': '#09090b',
        'neo-dark': '#18181b',
        'neo-blue': '#0ea5e9',
        'neo-indigo': '#6366f1',
        'neo-violet': '#8b5cf6',
        'neo-purple': '#a855f7',
        'neo-teal': '#14b8a6',
        'neo-gray': {
          100: '#f4f4f5',
          200: '#e4e4e7',
          300: '#d4d4d8',
          400: '#a1a1aa',
          500: '#71717a',
          600: '#52525b',
          700: '#3f3f46',
          800: '#27272a',
          900: '#18181b',
        },
        // Light mode colors - Saffron/Orange theme
        'light': {
          'bg': '#fff9f0',
          'card': '#ffffff',
          'primary': '#f97316', // orange-500
          'secondary': '#fdba74', // orange-300
          'accent': '#ffedd5', // orange-100
          'text': '#1e293b', // slate-800
          'muted': '#64748b', // slate-500
        },
        // Saffron color theme
        'saffron': {
          50: '#fff9ed',
          100: '#ffefd0',
          200: '#fedea4',
          300: '#fdc46d',
          400: '#fba136',
          500: '#f87812',
          600: '#e35a09',
          700: '#bc400b',
          800: '#953411',
          900: '#792b12',
        },
      },
      fontFamily: {
        'sans': ['Inter', 'ui-sans-serif', 'system-ui'],
        'mono': ['JetBrains Mono', 'monospace'],
      },
      animation: {
        'fade-in': 'fadeIn 0.7s ease-out forwards',
        'slide-in': 'slideIn 0.7s ease-out forwards',
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'morph': 'morph 8s ease-in-out infinite alternate',
        'blur-in': 'blurIn 1s ease-out forwards',
        'scale-in': 'scaleIn 0.5s ease-out forwards',
        'shimmer': 'shimmer 2s linear infinite',
      },
      transitionProperty: {
        'height': 'height',
        'spacing': 'margin, padding',
        'width': 'width',
        'transform': 'transform',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideIn: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 5px rgba(139, 92, 246, 0.5)' },
          '100%': { boxShadow: '0 0 20px rgba(139, 92, 246, 0.8), 0 0 30px rgba(139, 92, 246, 0.6)' },
        },
        morph: {
          '0%': { borderRadius: '60% 40% 30% 70%/60% 30% 70% 40%' },
          '50%': { borderRadius: '30% 60% 70% 40%/50% 60% 30% 60%' },
          '100%': { borderRadius: '60% 40% 30% 70%/60% 30% 70% 40%' },
        },
        blurIn: {
          '0%': { filter: 'blur(10px)', opacity: '0' },
          '100%': { filter: 'blur(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.9)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-500px 0' },
          '100%': { backgroundPosition: '500px 0' },
        },
      },
      backgroundImage: {
        'neo-grid': 'radial-gradient(rgba(139, 92, 246, 0.15) 2px, transparent 2px)',
        'neo-gradient': 'linear-gradient(to right bottom, rgba(139, 92, 246, 0.2), rgba(20, 184, 166, 0.2))',
        'neo-glow': 'radial-gradient(circle at 50% 50%, rgba(139, 92, 246, 0.3), transparent 50%)',
        'grid-white': 'linear-gradient(to right, rgba(255, 255, 255, 0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(255, 255, 255, 0.05) 1px, transparent 1px)',
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'gradient-shine': 'linear-gradient(45deg, transparent 45%, rgba(139, 92, 246, 0.3) 50%, transparent 55%)',
        // Saffron/Orange gradients for light mode
        'saffron-gradient': 'linear-gradient(to right, #f97316, #fb923c)',
        'saffron-soft': 'linear-gradient(to right, #ffedd5, #fed7aa)',
        'saffron-vibrant': 'linear-gradient(to right bottom, #f97316, #ef4444)',
        'saffron-pastel': 'linear-gradient(to right, #fef3c7, #fde68a)',
      },
      backgroundSize: {
        'grid-white': '40px 40px',
        'neo-grid': '30px 30px',
      },
      boxShadow: {
        'neo': '0 0 20px rgba(139, 92, 246, 0.3)',
        'neo-button': '0 0 15px rgba(139, 92, 246, 0.5)',
        'neo-card': '0 5px 15px rgba(0, 0, 0, 0.1), 0 0 5px rgba(139, 92, 246, 0.2)',
        'light-card': '0 4px 12px rgba(0, 0, 0, 0.05)',
        // Saffron/Orange shadows
        'saffron': '0 4px 14px rgba(249, 115, 22, 0.25)',
        'saffron-glow': '0 0 20px rgba(249, 115, 22, 0.4)',
        'saffron-button': '0 2px 8px rgba(249, 115, 22, 0.3)',
      },
    },
  },
  plugins: [
    function ({ addVariant }) {
      // Add a 'light' variant for light mode styling
      addVariant('light', '.light &');
    },
  ],
};
