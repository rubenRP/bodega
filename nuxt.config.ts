export default defineNuxtConfig({
  modules: ["nuxt-vitest", "@nuxtjs/i18n", "@pinia/nuxt"],
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
