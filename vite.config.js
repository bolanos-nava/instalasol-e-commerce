import { defineConfig } from 'vite';
import { config } from 'dotenv';
import { resolve } from 'path';
import react from '@vitejs/plugin-react';

config({ path: resolve(__dirname, '.env') });

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({
      include: /\.(jsx|tsx)$/,
      babel: {
        plugins: [
          [
            'babel-plugin-styled-components',
            {
              displayName: true,
              fileName: false,
            },
          ],
        ],
        babelrc: false,
        configFile: false,
      },
    }),
  ],
  server: { port: 3000 },
  base: process.env.BASE_URL,
});
