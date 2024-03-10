import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import sass from 'sass';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // loading the env variables here
  const env = loadEnv(mode, process.cwd(), '');

  // in the return of the callback fn of the defineConfig method we return an object.
  return {
    // the define key defines global variables to be used in the Vite app
    define: {
      'process.env.BASE_URL': JSON.stringify(env.BASE_URL),
      'process.env.FIREBASE_API_KEY': JSON.stringify(env.FIREBASE_API_KEY),
    },
    // the plugins key defines the plugins you want to use in your Vite app
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
    css: {
      preprocessorOptions: {
        scss: {
          implementation: sass,
        },
      },
    },
    server: { port: 3000 },
    base: env.BASE_URL,
  };
});
