import type { Config } from 'tailwindcss';
import typography from '@tailwindcss/typography';

export default {
  content: [
    './components/**/*.{vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './composables/**/*.ts',
    './app.vue',
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ['Playfair Display', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        catalog: {
          bg: '#FAFAF8',
          surface: '#FFFFFF',
          border: '#E8E6E1',
          text: '#1A1A1A',
          muted: '#6B6B6B',
          accent: '#2D2D2D',
        },
        category: {
          'aluminum-extrusion': '#6366F1',
          'industrial-materials': '#475569',
          'modularity-systems': '#0EA5E9',
          'readymade-recontextualization': '#D946EF',
          'material-craft': '#D97706',
          'architecture-furniture': '#059669',
          'seriality-repetition': '#3B82F6',
          'material-biography': '#F43F5E',
        },
        connection: {
          'material-affinity': '#6366F1',
          'conceptual-parallel': '#8B5CF6',
          'direct-influence': '#EF4444',
          'formal-similarity': '#F59E0B',
          'shared-process': '#10B981',
          'same-movement': '#3B82F6',
          'response-to': '#EC4899',
        },
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: 'none',
            color: '#1A1A1A',
            a: {
              color: '#2D2D2D',
              textDecoration: 'underline',
              textUnderlineOffset: '3px',
              '&:hover': {
                color: '#6366F1',
              },
            },
          },
        },
      },
    },
  },
  plugins: [typography],
} satisfies Config;
