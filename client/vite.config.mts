import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { TanStackRouterVite } from '@tanstack/router-vite-plugin';
import { checker } from 'vite-plugin-checker';

export default defineConfig({
  plugins: [react(), TanStackRouterVite(),
  checker({
    overlay: {
      initialIsOpen: false,
    },
    typescript: {
      tsconfigPath: './tsconfig.json',
    },
  })
  ],
  resolve: {
    alias: {
      '@': '/src',
    },
  },
});
