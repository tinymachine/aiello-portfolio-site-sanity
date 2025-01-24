export const fadeInImages = () => {
  const FADEIN_DATA_ATTR = 'data-fadein' // if updating, search and replace globally
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
