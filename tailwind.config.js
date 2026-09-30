/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      // ─────────────────────────────────────────────
      // COULEURS LEADORA : 4 familles
      // Utilisation : bg-ink, text-gold, border-stone-line, etc.
      // ─────────────────────────────────────────────
      colors: {
        // NOIR
        ink: {
          DEFAULT: '#0B0D10', // header, footer, fonds sombres, texte principal
          soft: '#1C1D20',    // fond du hero quand la photo ne charge pas
          muted: '#35343A',   // bandeaux gris anthracite
        },
        // CRÈME
        cream: {
          DEFAULT: '#F7F5F0', // fond général des pages
          light: '#FAF9F7',   // fond des cartes Match/Realty et des formulaires
          dark: '#EFEBE3',    // sections alternées, fond d'image en attente
        },
        // DORÉ
        gold: {
          DEFAULT: '#D4AD6E', // boutons principaux, icônes
          light: '#E4C897',   // survol des boutons + grand mot « LEADORA » du hero
          dark: '#86672F',    // petits textes dorés sur fond clair (numéros 01, 02…)
          pale: '#F1E6D3',    // choix sélectionné dans le questionnaire
        },
        // GRIS
        stone: {
          DEFAULT: '#6B6A66', // paragraphes, textes secondaires
          line: '#D9D6D0',    // bordures des cartes et des champs
        },
      },

      // POLICES
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'], // « LEADORA », « LEADORA Match »…
        sans: ['Inter', 'system-ui', 'sans-serif'],          // tout le reste
      },

      letterSpacing: {
        brand: '0.28em', // petits titres en majuscules espacées
      },

      maxWidth: {
        site: '1320px', // largeur max du contenu (desktop)
      },

      // Animation d'apparition du hero
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.7s ease-out both',
      },
    },
  },
  plugins: [],
};