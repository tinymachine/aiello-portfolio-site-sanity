<script>
  import ProjectModal from './ProjectModal.svelte'
  import { imagePath } from '../settings/siteInfo'
  
  export let project
  export let projectTypeLabel

  const {
    projectType,
    colorAccent,
    title,
    featuredStill,
  } = project

  const cloudinaryFeaturedStillTransforms = '/c_limit,w_1280' // `c_limit` = shrink to fit

  let isOpen = false

  const open = (e) => { 
    e.preventDefault()
    isOpen = true
  }

  const close = () => { isOpen = false }
</script>



<article>
  <a role="button" href="#" on:click={open}><!-- TODO: find accessible way of handling href -->
    <div class="bleed-r">
      <img
        class="still bleed-r"
        src={imagePath + cloudinaryFeaturedStillTransforms + featuredStill}
        alt=""
      />
    </div>
      
    <h4 style={`color: ${ colorAccent || 'var(--color-default'}`}>
      {title} <!--  /* needs Markdown processing */ --> 

      {#if
        // Show projectType on home page for each except for features,
        // which share the same type
        projectType &&
        !projectType.toLowerCase().startsWith('feature')
      }
        <span class="type">
          <span aria-hidden="true">/</span>
          {projectType}
        </span>
      {/if}
    </h4>
  </a>
</article>

<ProjectModal 
  {isOpen}
  onDismiss={close}
  {project}
  {projectTypeLabel}
/>



<style lang="scss">
a {
  display: block;
  text-decoration: none;
  will-change: opacity;
  opacity: 0.85;
  transition: opacity 0.5s linear;
  text-decoration: none;
    
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