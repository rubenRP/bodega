export default defineNuxtConfig({
  modules: [
    "nuxt-vitest",
    "@nuxtjs/i18n",
    "@pinia/nuxt",
    "@nuxtjs/supabase",
    "@vite-pwa/nuxt",
  ],
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
    vueI18n: "./i18n.config.ts",
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
  pwa: {
    strategies: "injectManifest",
    srcDir: "src",
    mode: "development",
    filename: "sw.ts",
    base: "/",
    includeAssets: ["/favicon.png"],
    manifest: {
      name: "Bodega",
      short_name: "Bodega",
      description: "Your digital wine cellar",
      theme_color: "#ffffff",
      start_url: "/",
      display: "standalone",
      background_color: "#ffffff",
      icons: [
        {
          src: "/icon-192.png",
          sizes: "192x192",
          type: "image/png",
        },
        {
          src: "/icon-512.png",
          sizes: "512x512",
          type: "image/png",
        },
      ],
    },
  },
});
