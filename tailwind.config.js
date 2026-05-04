/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./src/**/*.{html,ts}'],
  theme: {
    extend: {
      screens: {
        desk: '940px',
      },
      colors: {
        // ── Surfaces ──────────────────────────────────────────────────────────
        background:                    '#000000',
        surface:                       '#0a0a0a',
        'surface-dim':                 '#111111',
        'surface-bright':              '#1a1a1a',
        'surface-container-lowest':    '#000000',
        'surface-container-low':       '#0a0a0a',
        'surface-container':           '#111111',
        'surface-container-high':      '#1a1a1a',
        'surface-container-highest':   '#222222',

        // ── Type ──────────────────────────────────────────────────────────────
        'on-surface':          '#ffffff',
        'on-surface-variant':  '#a3a3a3',
        outline:               '#737373',
        'outline-variant':     '#2a2a2a',

        // ── Borders ───────────────────────────────────────────────────────────
        border:       '#1a1a1a',
        'border-mid': '#2a2a2a',
        'border-hi':  '#404040',

        // ── Kept as semantic aliases (used widely in templates) ───────────────
        // neon → white (primary interactive highlight)
        neon:         '#ffffff',
        'neon-bright': '#e5e5e5',
        'neon-dim':    '#a3a3a3',
        primary:       '#ffffff',
        dark:          '#000000',

        // ── Legacy supporting palette (mapped to greys) ───────────────────────
        'indigo-deep':  '#222222',
        'indigo-mid':   '#333333',
        'indigo-soft':  '#666666',
        'violet-deep':  '#111111',
        amber: { DEFAULT: '#e5e5e5', soft: '#a3a3a3' },

        // ── Step colours (greyscale) ───────────────────────────────────────────
        step: {
          1: '#ffffff',
          2: '#d4d4d4',
          3: '#a3a3a3',
          4: '#737373',
        },

        // ── Module colours (greyscale shades per module) ──────────────────────
        module: {
          rag:    '#e5e5e5',
          mem:    '#d4d4d4',
          router: '#a3a3a3',
          eval:   '#737373',
          kernel: '#525252',
          trace:  '#404040',
        },
      },

      fontFamily: {
        display:  ['"Space Grotesk"', 'system-ui', 'sans-serif'],
        sans:     ['"Space Grotesk"', 'system-ui', 'sans-serif'],
        body:     ['"IBM Plex Mono"', 'ui-monospace', 'monospace'],
        mono:     ['"IBM Plex Mono"', 'ui-monospace', 'monospace'],
        editorial:['"Space Grotesk"', 'system-ui', 'sans-serif'],
      },

      backgroundImage: {
        'dotted-grid':
          'radial-gradient(rgba(255,255,255,0.06) 1px, transparent 1px)',
        'dotted-grid-dim':
          'radial-gradient(rgba(255,255,255,0.03) 1px, transparent 1px)',
        'spectrum-headline': 'linear-gradient(90deg, #ffffff 0%, #a3a3a3 100%)',
        'spectrum-warm':     'linear-gradient(90deg, #e5e5e5 0%, #737373 100%)',
      },
      backgroundSize: {
        'dotted-grid': '24px 24px',
      },

      fontSize: {
        'label-caps': ['11px', { lineHeight: '1', letterSpacing: '0.12em', fontWeight: '600' }],
        'label-mono': ['13px', { lineHeight: '1', letterSpacing: '0.05em', fontWeight: '500' }],
        'body-md':    ['15px', { lineHeight: '1.6', fontWeight: '400' }],
        'body-lg':    ['17px', { lineHeight: '1.65', fontWeight: '400' }],
        h3:      ['22px',  { lineHeight: '1.3', letterSpacing: '-0.01em', fontWeight: '600' }],
        h2:      ['30px',  { lineHeight: '1.2', letterSpacing: '-0.02em', fontWeight: '700' }],
        h1:      ['46px',  { lineHeight: '1.08', letterSpacing: '-0.03em', fontWeight: '700' }],
        display: ['62px',  { lineHeight: '1.04', letterSpacing: '-0.03em', fontWeight: '700' }],
      },

      borderRadius: {
        DEFAULT: '0.375rem',
        sm:   '0.25rem',
        md:   '0.5rem',
        lg:   '0.75rem',
        xl:   '1rem',
        '2xl':'1.5rem',
        full: '9999px',
      },

      spacing: {
        gutter:             '20px',
        'card-padding':     '24px',
        'container-margin': '32px',
      },
      maxWidth: {
        'container-max': '1440px',
      },

      animation: {
        'fade-in': 'fadeIn 0.5s ease-out forwards',
        'fade-up': 'fadeUp 0.6s ease-out forwards',
        shimmer:   'shimmer 2s linear infinite',
        marquee:   'marquee 40s linear infinite',
        'flow-dash': 'flowDash 2.4s linear infinite',
        'float':   'float 6s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%':   { opacity: '0', transform: 'translateY(6px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeUp: {
          '0%':   { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        shimmer: {
          '0%':   { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
        marquee: {
          '0%':   { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        flowDash: {
          '0%':   { strokeDashoffset: '24' },
          '100%': { strokeDashoffset: '0' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%':      { transform: 'translateY(-10px)' },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    function ({ addBase, theme }) {
      addBase({
        '.prose': {
          '--tw-prose-body':        theme('colors.on-surface-variant'),
          '--tw-prose-headings':    theme('colors.on-surface'),
          '--tw-prose-lead':        theme('colors.on-surface-variant'),
          '--tw-prose-links':       theme('colors.on-surface'),
          '--tw-prose-bold':        theme('colors.on-surface'),
          '--tw-prose-counters':    theme('colors.outline'),
          '--tw-prose-bullets':     theme('colors.outline'),
          '--tw-prose-hr':          theme('colors.border-mid'),
          '--tw-prose-quotes':      theme('colors.on-surface'),
          '--tw-prose-quote-borders': theme('colors.border-hi'),
          '--tw-prose-code':        theme('colors.on-surface'),
          '--tw-prose-pre-code':    theme('colors.on-surface'),
          '--tw-prose-pre-bg':      theme('colors.surface-dim'),
          '--tw-prose-th-borders':  theme('colors.border-mid'),
          '--tw-prose-td-borders':  theme('colors.border'),
        },
      });
    },
  ],
};
