<script>
  import ProjectModal from './ProjectModal.svelte'
  import { getSrcset } from '../scripts/utils/getSrcset.js'
  import { IMG_GLOBAL_URL_PARAMS, MAX_DPR } from '../config'
  import { onMount } from 'svelte'
  import { fadeInImages } from '../scripts/imgFadeIn'
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

  onMount(() => {
    fadeInImages()
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
        data-fadein
      />
    </div>

    <h4
      style={`
        --color-accent: ${colorAccentRgb ? colorAccentRgb : 'var(--color-default)'};
        color: var(--color-accent);
      `}
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
    margin-bottom: 3.5em;
  }

  .type {
    white-space: nowrap;
    opacity: 0.7;
  }
</style>
