import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  server: {
    proxy: {
      '/api': 'https://server-t4sa.onrender.com/',
        // historyApiFallback: true,
    }
  },
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg', 'robots.txt', 'apple-touch-icon.png'],
      manifest: {
        name : "Cine Flow",
        short_name: "Cinema",
        theme_color: "#020c1b",
        background_color: "#173d77",
        start_url: "/",
        display: "standalone",
        orientation: "portrait",
        icons: [
            {
                src: "/icons/icon.png",
                sizes: "192x192",
                type: "image/png"
              },
              {
                src: "/icons/icon(1).png",
                sizes: "512x512",
                type: "image/png"
              }
        ]
    },
      workbox: {
        runtimeCaching: [
          {
            urlPattern: ({ request }) => request.destination === 'document',
            handler: 'NetworkFirst',
            options: {
              cacheName: 'documents',
            },
          },
          {
            urlPattern: ({ request }) => request.destination === 'script',
            handler: 'NetworkFirst',
            options: {
              cacheName: 'scripts',
            },
          },
          {
            urlPattern: ({ request }) => request.destination === 'style',
            handler: 'NetworkFirst',
            options: {
              cacheName: 'styles',
            },
          },
          {
            urlPattern: ({ request }) => request.destination === 'image',
            handler: 'CacheFirst',
            options: {
              cacheName: 'images',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 30 * 24 * 60 * 60,
              },
            },
          },
        ],
      },
    }),
  ],
});