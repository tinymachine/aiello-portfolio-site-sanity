# aiello-portfolio-site-sanity

## Framework

This site is built with [Astro](https://astro.build) using both Astro-native and [Svelte](https://svelte.dev/) components (thanks to Astro's [islands architecture](https://docs.astro.build/en/concepts/islands/)).

## CMS

This site integrates [Sanity](https://www.sanity.io/) for content management (including image hosting, with on-the-fly, URL-based [transformations](https://www.sanity.io/docs/image-urls)). Sanity is configured to trigger a Vercel-generated web hook trigger so that when any updates are made, Vercel will re-deploy.

## Site Hosting

Whenever commits are pushed to GitHub or changes are made in Sanity, [Vercel][vercel] automatically builds and deploys a new version of the site across its worldwide [edge network][edge] (for [free][free]!).

[vercel]: https://vercel.com/home
[edge]: https://vercel.com/docs/edge-network/overview
[free]: https://vercel.com/pricing

## Code Formatting and Linting

This project is configured to use [Prettier][prettier] for formatting code and [ESLint][eslint] for [linting][lint] code. [Husky][husky] is used to provide a git pre-commit hook which calls [`lint-staged`][lint-staged] to run both Prettier and ESLint on any files being committed at the time of the commit. These tools help maintain (and enforce) code quality and consistency.

[prettier]: https://prettier.io/
[eslint]: https://eslint.org/
[lint]: https://en.wikipedia.org/wiki/Lint_(software)
[husky]: https://typicode.github.io/husky/
[lint-staged]: https://www.npmjs.com/package/lint-staged

## Commands

These should be run from the root of the project:

| Command   | Action                                             |
| :-------- | :------------------------------------------------- |
| `dev`     | Start local dev server                             |
| `build`   | Build production site to `./dist/`                 |
| `preview` | Preview build locally before deploying             |
| `prepare` | npm runs this after `npm install`, to set up husky |
