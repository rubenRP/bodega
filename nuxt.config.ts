import messages from "./i18n/es";

export default defineNuxtConfig({
  modules: ["nuxt-vitest", "@nuxtjs/i18n", "@pinia/nuxt"],
  css: [
    "vuetify/lib/styles/main.sass",
    "@fortawesome/fontawesome-svg-core/styles.css",
    "~/assets/styles/main.scss",
  ],
  build: {
    transpile: ["vuetify"],
  },
  vite: {
    define: {
      "process.env.DEBUG": false,
    },
  },
  i18n: {
    vueI18n: {
      locale: "es",
      fallbackLocale: "en",
      messages: messages,
    },
  },
});
