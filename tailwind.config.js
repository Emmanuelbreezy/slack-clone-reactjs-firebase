module.exports = {
    purge: [],
    theme: {
      extend: {
        colors:{
          background:{
            primary: 'var(--bg-background-primary)',
            secondary: 'var(--bg-background-secondary)',
            accent:    'var(--bg-background-accent)'
          },
          copy:{
            primary: 'var(--text-copy-primary)',
            secondary: 'var(--text-copy-hover)'
          }
          
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
  