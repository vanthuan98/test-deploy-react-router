import { reactRouter } from '@react-router/dev/vite';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';
import { VitePWA } from 'vite-plugin-pwa';
import { visualizer } from 'rollup-plugin-visualizer';

export default defineConfig(({ mode }) => {
  const isDev = mode === 'development';
  return {
    plugins: [
      tailwindcss(),
      reactRouter(),
      tsconfigPaths(),
      ...(isDev
        ? [
            visualizer({
              filename: 'bundle-size.html',
              open: true,
              gzipSize: true,
              brotliSize: true,
              template: 'treemap',
            }),
          ]
        : []),
      VitePWA({
        registerType: 'autoUpdate',
        injectRegister: null,
        includeAssets: ['favicon.ico'],
        devOptions: {
          enabled: true,
        },
        manifest: {
          name: 'Vocab PWA',
          short_name: 'Vocab',
          start_url: '/',
          scope: '/',
          display: 'standalone',
          orientation: 'portrait',
          description: 'Vocab PWA',
          background_color: 'white',
          theme_color: 'white',
          icons: [
            { src: 'icon.svg', sizes: 'any', type: 'image/svg+xml' },
            {
              src: 'favicon.ico',
              sizes: '48x48 32x32 16x16',
              type: 'image/x-icon',
            },
          ],
        },
        workbox: {
          navigateFallback: '/',
          globPatterns: [],
          globDirectory: isDev ? 'public' : 'build/client',
        },
      }),
    ],
  };
});
