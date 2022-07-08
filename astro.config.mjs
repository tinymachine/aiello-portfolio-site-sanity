import { defineConfig } from 'astro/config';
import svelte from '@astrojs/svelte'
import yaml from '@rollup/plugin-yaml'

// https://astro.build/config
export default defineConfig({
  integrations: [svelte()],
  vite: {
    plugins: [yaml()]
  }  
});
