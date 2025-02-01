/**
 * Fade in (and de-blur) images once they've loaded.
 * Import the `fadeInImagesOnLoad()` script and execute it
 * when the DOM has loaded (e.g. in the `onMount()` hook
 * in Svelte components, or after the DOMContentLoaded
 * event in Astro components). Apply it to <img> elements
 * by adding the `data-fadein-onload` attribute.
 */

import './styles.css'

export const fadeInImagesOnLoad = () => {
  const FADEIN_DATA_ATTR = 'data-fadein-onload' // if updating, search and replace globally
  const imgsToFadeIn = document.querySelectorAll(`[${FADEIN_DATA_ATTR}]`)

  imgsToFadeIn.forEach((img) => {
    function handleLoad() {
      img.style.opacity = 1
      img.style.filter = 'blur(0)'
      img.removeEventListener('load', handleLoad)
    }

    img.addEventListener('load', handleLoad)

    // Fallback for cached images
    if (img.complete) {
      handleLoad()
    }
  })
}
