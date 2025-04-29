import path from 'path';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons';
import { defineConfig } from 'vite';
import Sitemap from 'vite-plugin-sitemap';

export default defineConfig({
  plugins: [
    react(),
    svgr(),
    createSvgIconsPlugin({
      // 指定需要缓存的图标文件夹
      iconDirs: [path.resolve(process.cwd(), 'src/assets/svg')],
      // 指定symbolId格式
      symbolId: 'icon-[dir]-[name]',
    }),
    Sitemap({
      hostname: 'https://template.react-antd-console.site',
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@@': path.resolve(__dirname, './examples'),
    },
  },
  server: {
    host: true,
    port: 9527,
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
  esbuild: {
    target: 'chrome65',
  },
  build: {
    target: 'es2015',
    rollupOptions: {
      output: {
        manualChunks(id/* , { getModuleInfo } */) {
          const ret = resolveManualChunks(id, {
            react: ['node_modules/react'],
            vendor: ['node_modules/dayjs', 'node_modules/@ant', 'node_modules/antd'],
            'framer-motion': ['node_modules/framer-motion'],
            echarts: ['node_modules/echarts'],
            svg: [
              'src/assets/svg',
            ],
            common: [
              'main.tsx',
              'App.tsx',
              ['src/router/', '!/config/'],
              'src/layouts/',
              'src/http/',
              'src/lib/',
            ],
            pages: [
              'src/pages/',
            ],
          });
          return ret;
        },
      },
    },
  },
});

function resolveManualChunks(id: string, configs: Record<string, (string | string[])[]>): string | void {
  for (const key in configs) {
    const val = configs[key];
    for (let i = 0; i < val.length; i++) {
      const item = val[i];
      if (typeof item === 'string') {
        if (id.includes(item)) {
          return key;
        }
      } else {
        const condition = item.every(innerItem => {
          if (innerItem.startsWith('!')) {
            return !id.includes(innerItem.slice(1));
          } else {
            return id.includes(innerItem);
          }
        });
        if (condition) {
          return key;
        }
      }
    }
  }
}
