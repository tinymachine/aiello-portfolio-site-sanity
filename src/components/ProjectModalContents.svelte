<script>
  import VimeoPlayer from './VimeoPlayer.svelte'
  import ProjectModalGallery from './ProjectModalGallery.svelte'
  import { onMount } from 'svelte';

  export let project
  export let projectTypeLabel
  export let modalDismissEnabled

  const {
    title,
    director,
    clips,
    stills,
    colorAccent
  } = project

  const getAccentColor = () => colorAccent || 'var(--color-strong)'

  const getDirectorLabel = () =>
    `Director${
      (director.includes('and') || director.includes(','))
      ? 's'
      : ''
    }`
  
  let bpAnchor
  let bpAnchorMounted = false

  onMount(() => {
    bpAnchorMounted = true
  })
</script>


<header>
  <h3 style={`color: ${getAccentColor()}`}>
    {title}
  </h3>

  <h4>
    <span style={`color: ${getAccentColor()}`}>
      {projectTypeLabel}
    </span>
    {#if director}
      <br>
      {getDirectorLabel()}: {director}
    {/if}
  </h4>
</header>

<main class="content" bind:this={bpAnchor}>
  <div class="content-inner">

    {#if clips}
      <section class="clips">

        {#each clips as clip}
          <div class="clip bleed">
            <VimeoPlayer
              url={clip}
              title={`${title} video clip`}
            />
          </div>
        {/each}

      </section>
    {/if}

    {#if stills}
      <ProjectModalGallery
        {stills}
        {bpAnchor}
        {bpAnchorMounted}
        bind:modalDismissEnabled
      />
    {/if}

  </div>
</main>



<style lang="scss">
  header {
    padding-left: 2rem;
    margin-bottom: 2rem;
    position: sticky;
    z-index: 1;
    top: 0;
    mix-blend-mode: screen;
  
    h3 {
      padding: 0;
      margin-bottom: 0;
    }
  
    h4 {
      font-weight: 400;
      font-size: 0.8125em;
      letter-spacing: 0.05ch;
    }
  }
  
  .content {
    z-index: 1;
    background-color: var(--color-modal-bg);
    box-shadow: 0 -1rem 1rem var(--color-modal-bg);
    width: 100vw;
  }
  
  .content-inner {
    max-width: min(170vh, var(--max-element-width));
    margin: 0 auto;
  }
  
  .clip {
    max-width: min(170vh, var(--max-element-width));
    margin: 
      0
      auto
      clamp(2rem, calc(1rem + 3vw), 4rem);
  }
</style>