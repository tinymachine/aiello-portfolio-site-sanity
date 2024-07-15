d# aiello-portfolio-site

This site is built with [Astro](https://astro.build) 1.0.0-beta using both Astro-native and [Svelte](https://svelte.dev/) components (thanks to Astro's [islands architecture](https://docs.astro.build/en/concepts/islands/)).

## Forestry CMS (defunct)

This site was configured to integrate with [Forestry CMS](https://tina.io/forestry/), an excellent CMS that integrated with GitHub to edit site contents by making commits to the site's repo. But the service was discontinuted in March 2023, so currently the site must be updated manually by manually updating the Markdown files — not a user-friendly experience.

## Netlify Hosting via CI/CD Pipeline

The site is configured to be deployed via a [CI/CD pipeline][cicd]. Whenever commits are pushed to GitHub, [Netlify][netlify] automatically builds and deploys a new version of the site across its worldwide [edge network][edge] (for [free][free]!).

[cicd]:https://www.netlify.com/blog/guide-to-ci-cd-automation-using-webhooks/
[netlify]:https://www.netlify.com/
[edge]:https://www.netlify.com/platform/core/edge/
[free]:https://www.netlify.com/pricing/

## Cloudinary Image Hosting

Most images on the site are hosted using [Cloudinary](https://cloudinary.com/), for its ability to optimize images and because it integrated well with Forestry CMS.

## Project Structure

These are the most important parts of the structure:

```
/
├── astro.config.mjs                  # Astro config
├── netlify.toml                      # Netlify deployment config
├── public                            # contents of this directory automatically served from site root
│   ├── admin                         # Forestry CMS control panel (defunct)
│   ├── fonts                         # custom web fonts
│   └── img                           # images and icons not handled by the CMS
└── src
    ├── components                    # both Astro and Svelte components that comprise the site
    ├── content           
    │   ├── Projects.md               # user-editable content for all projects
    │   └── About.md                  # user-editable content for About section
    ├── layout
    │   └── Layout.astro              # boilerplate site html
    ├── pages             
    │   └── index.astro               # site content (imports components)
    ├── scripts
    │   └── getDimsFromImageUrls.js   # fetches image dimensions and calculates aspect ratios
    ├── settings
    │   ├── Settings.md               # user-editable settings
    │   └── siteInfo.js               # other settings
    └── styles
        └── global.scss               # site CSS (uses Sass)
```

## Commands

All commands are run from the root of the project, from a terminal:

| Command               | Action                                       |
|:--------------------- |:-------------------------------------------- |
| `npm install`         | Install dependencies                         |
| `npm run dev`         | Start local dev server at `localhost:3000`   |
| `npm run build`       | Build production site to `./dist/`           |
| `npm run preview`     | Preview build locally before deploying       |
| `npm run cms-preview` | For use by Forestry CMS (defunct)            |
