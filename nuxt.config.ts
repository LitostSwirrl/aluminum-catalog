export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },

  app: {
    baseURL: '/aluminum-catalog/',
    head: {
      title: 'Aluminum Extrusion Art Catalog',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          name: 'description',
          content: 'A curated research catalog of 100 artworks exploring aluminum extrusion and related conceptual territories.',
        },
      ],
      link: [
        {
          rel: 'preconnect',
          href: 'https://fonts.googleapis.com',
        },
        {
          rel: 'preconnect',
          href: 'https://fonts.gstatic.com',
          crossorigin: '',
        },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&family=Inter:wght@300;400;500;600&display=swap',
        },
      ],
    },
  },

  modules: ['@nuxtjs/tailwindcss'],

  typescript: {
    strict: true,
  },

  vite: {
    optimizeDeps: {
      include: ['d3-force', 'd3-selection', 'd3-scale', 'd3-zoom', 'd3-drag'],
    },
  },

  nitro: {
    preset: 'github-pages',
  },
});
