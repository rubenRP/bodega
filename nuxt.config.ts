export default defineNuxtConfig({
  modules: ["nuxt-vitest", "@nuxtjs/i18n", "@pinia/nuxt", "@nuxtjs/supabase"],
  css: [
    "@fortawesome/fontawesome-svg-core/styles.css",
    "~/assets/css/main.css",
  ],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  runtimeConfig: {
    public: {
      supabase: {
        url: process.env.SUPABASE_URL,
        key: process.env.SUPABASE_KEY,
      },
    },
  },
  app: {
    head: {
      title: "Bodega - Your digital wine cellar",
      meta: [
        {
          hid: "description",
          name: "description",
          content: "Your digital wine cellar",
        },
      ],
      link: [
        {
          rel: "icon",
          type: "image/png",
          href: "/favicon.png",
        },
      ],
    },
  },
});
