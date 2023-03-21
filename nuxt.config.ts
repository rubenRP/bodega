import messages from "./i18n/es";

export default defineNuxtConfig({
  modules: ["nuxt-vitest", "@nuxtjs/i18n", "@pinia/nuxt"],
  css: [
    "@fortawesome/fontawesome-svg-core/styles.css",
    "~/assets/styles/main.scss",
  ],
  i18n: {
    vueI18n: {
      locale: "es",
      fallbackLocale: "en",
      messages: messages,
    },
  },
});