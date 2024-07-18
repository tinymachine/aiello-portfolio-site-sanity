import js from '@eslint/js'
import eslintPluginAstro from 'eslint-plugin-astro'
import eslintPluginSvelte from 'eslint-plugin-svelte'
import prettier from 'eslint-config-prettier'
import globals from 'globals'

export default [
  js.configs.recommended,
  ...eslintPluginAstro.configs.recommended,
  ...eslintPluginSvelte.configs['flat/recommended'],
  prettier,
  {
    languageOptions: {
      globals: {
        // get ESLint to recognize browser globals like `document` and `window`
        ...globals.browser,
      },
    },
    rules: {
      // override/add rules settings here, such as:
      // "astro/no-set-html-directive": "error"
    },
  },
]
