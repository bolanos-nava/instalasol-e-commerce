import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    define: {
      'process.env.BASE_URL': JSON.stringify(env.BASE_URL),
    },
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
    base: env.BASE_URL,
  };
});
