/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        orange: {
          neon: '#FF6B35',
          bright: '#FF8C42',
          deep: '#FF4500',
          glow: '#FF8C00',
          dark: '#CC5500',
          light: '#FFA366',
        },
        dark: {
          bg: '#0A0A0A',
          card: '#1A1A1A',
          surface: '#151515',
        },
      },
      fontFamily: {
        mono: ['Rajdhani', 'monospace'],
        tech: ['Orbitron', 'sans-serif'],
        gaming: ['Orbitron', 'sans-serif'],
      },
      animation: {
        'pulse-orange': 'pulse-orange 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow-orange': 'glow-orange 2s ease-in-out infinite alternate',
        'glow-orange-intense': 'glow-orange-intense 1.5s ease-in-out infinite alternate',
        'scanline': 'scanline 8s linear infinite',
        'glitch': 'glitch 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94) infinite',
        'shimmer': 'shimmer 3s ease-in-out infinite',
        'energy-pulse': 'energy-pulse 2s ease-in-out infinite',
        'float': 'float 3s ease-in-out infinite',
        'blink': 'blink 1s ease-in-out infinite',
        'arcade-glow': 'arcade-glow 2s ease-in-out infinite',
        'slide-in': 'slide-in 0.5s ease-out',
        'bounce-arcade': 'bounce-arcade 0.6s ease-in-out',
        'rotate-neon': 'rotate-neon 3s linear infinite',
      },
      keyframes: {
        'pulse-orange': {
          '0%, 100%': { opacity: 1, transform: 'scale(1)' },
          '50%': { opacity: 0.8, transform: 'scale(1.02)' },
        },
        'glow-orange': {
          '0%': { 
            boxShadow: '0 0 10px rgba(255, 107, 53, 0.5), 0 0 20px rgba(255, 107, 53, 0.3), 0 0 30px rgba(255, 107, 53, 0.2)',
          },
          '100%': { 
            boxShadow: '0 0 20px rgba(255, 107, 53, 0.8), 0 0 40px rgba(255, 107, 53, 0.6), 0 0 60px rgba(255, 107, 53, 0.4)',
          },
        },
        'glow-orange-intense': {
          '0%': { 
            boxShadow: '0 0 15px rgba(255, 107, 53, 0.8), 0 0 30px rgba(255, 107, 53, 0.6), 0 0 45px rgba(255, 107, 53, 0.4), inset 0 0 20px rgba(255, 107, 53, 0.1)',
          },
          '100%': { 
            boxShadow: '0 0 30px rgba(255, 107, 53, 1), 0 0 60px rgba(255, 107, 53, 0.8), 0 0 90px rgba(255, 107, 53, 0.6), inset 0 0 30px rgba(255, 107, 53, 0.2)',
          },
        },
        'scanline': {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100vh)' },
        },
        'glitch': {
          '0%': { transform: 'translate(0)' },
          '20%': { transform: 'translate(-2px, 2px)' },
          '40%': { transform: 'translate(-2px, -2px)' },
          '60%': { transform: 'translate(2px, 2px)' },
          '80%': { transform: 'translate(2px, -2px)' },
          '100%': { transform: 'translate(0)' },
        },
        'shimmer': {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        'energy-pulse': {
          '0%, 100%': { 
            opacity: 1,
            filter: 'brightness(1)',
          },
          '50%': { 
            opacity: 0.9,
            filter: 'brightness(1.2)',
          },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'blink': {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0.3 },
        },
        'arcade-glow': {
          '0%, 100%': { 
            boxShadow: '0 0 20px rgba(255, 107, 53, 0.8), 0 0 40px rgba(255, 107, 53, 0.6), 0 0 60px rgba(255, 107, 53, 0.4)',
          },
          '50%': { 
            boxShadow: '0 0 30px rgba(255, 107, 53, 1), 0 0 60px rgba(255, 107, 53, 0.8), 0 0 90px rgba(255, 107, 53, 0.6)',
          },
        },
        'slide-in': {
          '0%': { transform: 'translateX(-100%)', opacity: 0 },
          '100%': { transform: 'translateX(0)', opacity: 1 },
        },
        'bounce-arcade': {
          '0%, 100%': { transform: 'translateY(0) scale(1)' },
          '50%': { transform: 'translateY(-10px) scale(1.05)' },
        },
        'rotate-neon': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
      },
      backgroundImage: {
        'gradient-orange': 'linear-gradient(135deg, #FF6B35 0%, #FF8C42 50%, #FF4500 100%)',
        'gradient-orange-dark': 'linear-gradient(135deg, #CC5500 0%, #FF6B35 50%, #FF8C42 100%)',
        'gradient-gaming': 'linear-gradient(135deg, #0A0A0A 0%, #1A0A0A 25%, #0A0A0A 50%, #1A0A0A 75%, #0A0A0A 100%)',
      },
    },
  },
  plugins: [],
}
