import messages from "./i18n/es";

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
  i18n: {
    vueI18n: {
      locale: "es",
      fallbackLocale: "en",
      messages: messages,
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
