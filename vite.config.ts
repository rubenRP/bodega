import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  resolve: {
    alias: [{ find: '@', replacement: '/src' }],
  },
  server: {
    proxy: {
      '/serp': {
        target: 'https://serpapi.com',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/serp/, ''),
      },
    },
  },
  plugins: [
    vue(),
    VitePWA({
      mode: 'development',
      base: '/',
      srcDir: 'src',
      filename: 'sw.ts',
      includeAssets: ['/favicon.png'],
      strategies: 'injectManifest',
      manifest: {
        name: 'Bodega Project',
        short_name: 'Bodega',
        theme_color: '#ffffff',
        start_url: '/',
        display: 'standalone',
        background_color: '#ffffff',
        icons: [
          {
            src: 'icon-192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/icon-512.png',
            sizes: '512x512',
            type: 'image/png',
          },
          {
            src: 'icon-512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable',
          },
        ],
      },
    }),
  ],
})
