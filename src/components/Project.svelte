<script>
  import ProjectModal from './ProjectModal.svelte'
  import { imagePath } from '../settings/siteInfo'

  export let project
  export let projectTypeLabel

  const { projectType, colorAccent, title, featuredStill } = project

  const cloudinaryFeaturedStillTransforms = '/c_limit,w_1280' // `c_limit` = shrink to fit

  let isOpen = false

  const open = (e) => {
    e.preventDefault()
    isOpen = true
  }

  const close = () => {
    isOpen = false
  }
</script>

<article>
  <button on:click={open} class="bleed-r">
    <div>
      <img
        class="still"
        src={imagePath + cloudinaryFeaturedStillTransforms + featuredStill}
        alt=""
      />
    </div>

    <h4 style={`color: ${colorAccent || 'var(--color-default'}`}>
      {title}

      <span class="type">
        <span aria-hidden="true">/</span>
        {projectType}
      </span>
    </h4>
  </button>
</article>

<ProjectModal {isOpen} onDismiss={close} {project} {projectTypeLabel} />

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
    will-change: opacity;
    opacity: 0.85;
    transition: opacity 0.5s ease-out;
    cursor: pointer;

    &:hover {
      opacity: 1;
    }
  }

  h4 {
    font-weight: normal;
    font-size: 0.875em;
    margin: 0;
    padding: 0;
    color: var(--color-strong);
    transition: opacity 0.5s linear;
  }

  article {
    margin-bottom: 3.5em;
  }

  .type {
    white-space: nowrap;
    opacity: 0.7;
  }
</style>
