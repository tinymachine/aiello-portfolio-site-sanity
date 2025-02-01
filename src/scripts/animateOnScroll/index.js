/**
 * Animate elements as they scroll into the viewport.
 * Import the `animateOnScroll()` function and execute it
 * when the DOM has loaded (e.g. in the `onMount()` hook
 * in Svelte components, or after the DOMContentLoaded
 * event in Astro components). Apply it to elements
 * by adding the `data-animateonscroll` attribute and
 * set it to:
 *
 * - `slideup-fadein`
 * - `fadein`
 */

import './styles.css'

// Function to start observing elements
export const animateOnScroll = (selector = '[data-animateonscroll]') => {
  // Initialize the intersection observer
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const val = entry.target.getAttribute('data-animateonscroll')

          if (val.includes('fadein')) {
            entry.target.style.opacity = 1
          }
          if (val.includes('slideup')) {
            entry.target.style.transform = 'translateY(0)'
          }

          observer.unobserve(entry.target)
        }
      })
    },
    {
      threshold: 0.25, // Trigger when this proportion of the element is visible
    }
  )

  // Observe elements
  const elements = document.querySelectorAll(selector)
  elements.forEach((element) => observer.observe(element))
}
