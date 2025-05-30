import { defineConfig } from "vite";

export default defineConfig({
  root: './',
  build: {
    rollupOptions: {
      input: 'indexprincipal.html' 
    }
  }
});