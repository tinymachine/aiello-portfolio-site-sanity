import js from '@eslint/js'
import eslintPluginAstro from 'eslint-plugin-astro'
import prettier from 'eslint-config-prettier'

export default [
  js.configs.recommended,
  ...eslintPluginAstro.configs.recommended,
  prettier,
  {
    rules: {
      // override/add rules settings here, such as:
      // "astro/no-set-html-directive": "error"
    },
  },
]
