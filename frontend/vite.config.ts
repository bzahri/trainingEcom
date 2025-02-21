import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    rollupOptions: {
      input: '/src/main.js',  // Remplace par ton fichier d'entrée
    },
  },
});
