/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: 'class',
    content: [
        './index.html',
        './js/**/*.js'
    ],
    theme: {
        extend: {
            colors: {
                plum: '#3D143D',
                plumDark: '#2A0E2A',
                plumDeep: '#401040',
                gold: '#D4AF37',
                goldBright: '#F9E27B',
                goldDeep: '#8A6D3B',
                goldBronze: '#73552C',
                obsidian: '#3D143D',
                charcoal: '#2A0E2A',
                platinum: '#D4AF37',
                goldLight: '#F9E27B',
                roseGold: '#D4AF37',
                boneWhite: '#FDFDFB',
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
                fashion: ['Montserrat', 'sans-serif'],
                'serif-lux': ['Playfair Display', 'serif'],
                mag: ['Montserrat', 'sans-serif'],
            },
            backgroundImage: {
                'brand-gold': 'linear-gradient(135deg, #73552C 0%, #8A6D3B 28%, #F9E27B 52%, #D4AF37 78%, #73552C 100%)',
                'brand-plum': 'radial-gradient(ellipse at 50% 40%, #4A1A4A 0%, #3D143D 55%, #2A0E2A 100%)',
            },
            animation: {
                'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                shimmer: 'shimmer 2s infinite',
            },
            keyframes: {
                shimmer: {
                    '0%': { transform: 'translateX(-100%)' },
                    '100%': { transform: 'translateX(100%)' },
                },
            },
        },
    },
    plugins: [],
};
