/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: "#030712",
                secondary: "#0f172a",
                tertiary: "#1e293b",
                accent: "#10b981",
                "accent-light": "#34d399",
                "accent-dark": "#059669",
                cyan: "#06b6d4",
                blue: "#3b82f6",
                amber: "#f59e0b",
                "text-primary": "#f8fafc",
                "text-secondary": "#94a3b8",
            },
            fontFamily: {
                sans: ["Inter", "sans-serif"],
                heading: ["Space Grotesk", "sans-serif"],
                mono: ["JetBrains Mono", "monospace"],
            },
            animation: {
                'fade-in': 'fadeIn 1s ease-out forwards',
                'slide-up': 'slideUp 1s ease-out forwards',
                'slide-in-left': 'slideInLeft 1s ease-out forwards',
                'slide-in-right': 'slideInRight 1s ease-out forwards',
                'scale-in': 'scaleIn 0.8s ease-out forwards',
                'pulse-glow': 'pulseGlow 3s ease-in-out infinite',
                'float': 'float 6s ease-in-out infinite',
                'spin-slow': 'spin 12s linear infinite',
                'bounce-slow': 'bounce 3s ease-in-out infinite',
            },
            keyframes: {
                fadeIn: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
                slideUp: {
                    '0%': { opacity: '0', transform: 'translateY(60px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
                slideInLeft: {
                    '0%': { opacity: '0', transform: 'translateX(-60px)' },
                    '100%': { opacity: '1', transform: 'translateX(0)' },
                },
                slideInRight: {
                    '0%': { opacity: '0', transform: 'translateX(60px)' },
                    '100%': { opacity: '1', transform: 'translateX(0)' },
                },
                scaleIn: {
                    '0%': { opacity: '0', transform: 'scale(0.85)' },
                    '100%': { opacity: '1', transform: 'scale(1)' },
                },
                pulseGlow: {
                    '0%, 100%': { boxShadow: '0 0 20px rgba(16, 185, 129, 0.3)' },
                    '50%': { boxShadow: '0 0 50px rgba(16, 185, 129, 0.6)' },
                },
                float: {
                    '0%, 100%': { transform: 'translateY(0) rotate(0deg)' },
                    '50%': { transform: 'translateY(-25px) rotate(2deg)' },
                }
            },
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
                'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
            },
        },
    },
    plugins: [],
}
