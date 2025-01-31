import { defineConfig } from 'astro/config'
import svelte from '@astrojs/svelte'
import sanity from '@sanity/astro'

// https://astro.build/config
export default defineConfig({
  integrations: [
    svelte(),
    sanity({
      projectId: 'oqzk4lvk',
      dataset: 'production',
      useCdn: false, // See note on using the CDN
      apiVersion: '2024-07-24',
    }),
  ],
})
