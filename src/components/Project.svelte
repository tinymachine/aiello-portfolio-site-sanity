<script>
  import ProjectModal from './ProjectModal.svelte'
  import { getSrcset } from '../scripts/getSrcset.js'
  import { IMG_GLOBAL_URL_PARAMS, MAX_DPR } from '../config'
  import { onMount } from 'svelte'
  // import { fadeInImages } from '../scripts/imgFadeIn'
  import '../scripts/imgFadeIn/styles.css'

  export let project
  export let projectTypeLabel

  const { projectType, colorAccentRgb, title, featuredStill } = project

  const IMG_MAX_WIDTH = 744
  let isOpen = false

  const open = (e) => {
    e.preventDefault()
    isOpen = true
  }

  const close = () => {
    isOpen = false
  }

  // Initialize the intersection observer
  const observerOptions = {
    threshold: 0.5, // Trigger when at least 10% of the element is visible
  }

  onMount(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = 1
          if (entry.target.hasAttribute('data-slideup-fadein')) {
            entry.target.style.transform = 'translateY(0)'
          }
          // Optional: stop observing after animation
          observer.unobserve(entry.target)
        }
      })
    }, observerOptions)

    // Function to start observing elements
    function observeElements(selector = '[data-slideup-fadein],[data-fadein]') {
      const elements = document.querySelectorAll(selector)
      elements.forEach((element) => observer.observe(element))
    }

    observeElements()
  })
</script>

<article>
  <button
    on:click={open}
    class="bleed-r"
  >
    <div>
      <img
        class="still"
        src={featuredStill.url +
          `?w=${IMG_MAX_WIDTH * MAX_DPR}${IMG_GLOBAL_URL_PARAMS}`}
        srcset={getSrcset({
          url: featuredStill.url,
          min: 300,
          max: IMG_MAX_WIDTH * MAX_DPR,
          step: 200,
          additionalParams: IMG_GLOBAL_URL_PARAMS,
        })}
        sizes={`(max-width: 48rem) 90vw, ${IMG_MAX_WIDTH}px`}
        width={IMG_MAX_WIDTH}
        height={Math.round(IMG_MAX_WIDTH / featuredStill.aspect)}
        alt=""
        loading="lazy"
        data-slideup-fadein
      />
    </div>

    <h4
      style={`
        --color-accent: ${colorAccentRgb ? colorAccentRgb : 'var(--color-default)'};
        color: var(--color-accent);
      `}
      data-fadein
    >
      {title}

      <span class="type">
        <span aria-hidden="true">/</span>
        {projectType}
      </span>
    </h4>
  </button>
</article>

<ProjectModal
  {isOpen}
  onDismiss={close}
  {project}
  {projectTypeLabel}
/>

<style lang="scss">
  button {
    -webkit-appearance: none;
    appearance: none;
    background: none;
    border: none;
    font-size: inherit;
    font-family: inherit;
    letter-spacing: inherit;
    text-align: inherit;
    display: block;
    padding: 0;
    cursor: pointer;

    h4 {
      font-weight: normal;
      font-size: 0.875em;
      margin: 0;
      padding: 0;
      color: var(--color-strong);
      will-change: opacity;
      display: inline;
      position: relative;
    }

    h4::after {
      content: '';
      position: absolute;
      left: 0;
      bottom: -0.2em;
      width: 0;
      height: 2px;
      opacity: 0.1;
      background-color: var(--color-accent);
      transition: all 0.5s ease-in-out;
    }

    &:hover h4::after {
      opacity: 0.375;
      width: 100%;
    }
  }

  article {
    margin-bottom: clamp(2.5em, 7.5vw, 7.5em);
  }

  .type {
    white-space: nowrap;
    opacity: 0.7;
  }

  [data-slideup-fadein] {
    opacity: 0;
    transform: translateY(4em);
    transition:
      opacity 2s ease-out,
      transform 1.5s cubic-bezier(0.25, 1, 0.5, 1);
  }
  [data-fadein] {
    opacity: 0;
    transition: 1s opacity 0.5s ease-out;
  }
</style>
