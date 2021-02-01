module.exports = {
    purge: [],
    darkMode: 'media',
    theme: {
      extend: {
        colors:{
          background:{
            scaffold: 'var(--sl-background-scaffold)',
            primary: 'var(--sl-background-primary)',
            secondary: 'var(--sl-background-secondary)',
            accent:    'var(--sl-background-accent)'
          },
          color:{
            primarySide: 'var(--sl-text-side-primary)',
            secondarySide: 'var(--sl-text-side-secondary)',
            primaryBody: 'var(--sl-text-body-primary)',
            secondaryBody: 'var(--sl-text-body-secondary)'
          },
        },
        borderColor:{
            primary: 'var(--sl-border-primary)',
            secondary: 'var(--sl-border-secondary)'
        },
        fontFamily: {
          'robo': ['Roboto'],
          'sansta': ['Sansita Swashed'],
        },
      },
    },
    variants: {},
    plugins: [
      require('@tailwindcss/custom-forms')
    ],
  }
  