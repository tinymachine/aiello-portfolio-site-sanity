<script>
  import ProjectModal from './ProjectModal.svelte'

  export let project
  export let projectTypeLabel

  const { projectType, colorAccent, title, featuredStill } = project

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
  <button
    on:click={open}
    class="bleed-r"
  >
    <div>
      <img
        class="still"
        src={featuredStill.asset.url + '?w=1280'}
        alt=""
      />
    </div>

    <h4
      style={`
        --color-accent: ${colorAccent ? `rgb(${colorAccent.rgb.r} ${colorAccent.rgb.g} ${colorAccent.rgb.b} / ${colorAccent.rgb.a});` : 'var(--color-default)'};
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
