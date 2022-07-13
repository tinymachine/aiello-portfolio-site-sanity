<script>
  import BiggerPicture from 'bigger-picture/src/bigger-picture.js'
  import { imagePath } from '../settings/siteInfo'
  import { onMount } from 'svelte'
  
  import 'bigger-picture/dist/bigger-picture.css'

  export let stills
  export let bpAnchor
  export let bpAnchorMounted
  export let modalDismissEnabled

  const cloudinaryStillTransforms = '/c_limit,w_1800' // `c_limit` = shrink to fit

  let bp
  let isMounted

  onMount(() => {
    isMounted = true
  })
  
  $: if (bpAnchorMounted && isMounted) {
    // initialize BP only when parent modal and self are mounted,
    // lest the target won't yet exist in the DOM
    bp = BiggerPicture({
      target: bpAnchor
    })
  }

  const openGallery = (e) => {
    if (bp) {
      e.preventDefault()
      modalDismissEnabled = false // prevent project modal from closing when hitting Esc

      bp.open({
        items: bpAnchor.querySelectorAll('#images a'),
        el: e.currentTarget,
        intro: 'fadeup',
        onClose: () => { modalDismissEnabled = true }
      })
    }
  }
</script>



<section class="stills">
  <div class="still-thumbs" id="images">
    {#each stills as still}
      <a  
        href={
          imagePath +
          cloudinaryStillTransforms +
          still
        }
        data-img={
          imagePath +
          cloudinaryStillTransforms +
          still
        }
        data-thumb={
          imagePath +
          cloudinaryStillTransforms +
          still
        }
        data-width="1920"
        data-height="1080"
        data-alt=""
        on:click={openGallery}
      >
        <img
          src={
            imagePath +
            cloudinaryStillTransforms +
            still
          }
          alt=""
          loading="lazy" 
        />
      </a>
    {/each}
  </div>
</section>



<style lang="scss">
  .still-thumbs {
    display: flex;
    flex-wrap: wrap;
    gap: clamp(0.5rem, 4vw, 1.5rem);
  
    a {
      display: block;
      width: calc(50% - clamp(0.25rem, 2vw, 0.75rem));
    }

    img {
      width: 100%;
      display: block;
    }
  }
</style>