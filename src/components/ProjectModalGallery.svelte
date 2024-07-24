<script>
  import BiggerPicture from 'bigger-picture/src/bigger-picture.js'
  import { imagePath } from '../settings/siteInfo'
  import { onMount } from 'svelte'

  import 'bigger-picture/dist/bigger-picture.css'

  export let stills
  export let stillsDims
  export let bpAnchor
  export let bpAnchorMounted
  export let modalDismissEnabled

  const cloudinaryStillTransforms = '/c_limit,w_1800' // `c_limit` = shrink to fit

  let bp
  let isMounted
  let thumbThatLaunchedModal

  onMount(() => {
    isMounted = true
  })

  $: if (bpAnchorMounted && isMounted) {
    // initialize BP only when parent modal and self are mounted,
    // lest the target won't yet exist in the DOM
    bp = BiggerPicture({
      target: bpAnchor,
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
        scale: 1,
        onOpen: () => {
          // change the aria-label on the BP modal's close button (default: 'Close')
          const bpModalCloseButton = document.querySelector('button.bp-x')
          bpModalCloseButton.setAttribute(
            'aria-label',
            'Close image zoom modal'
          )

          // set focus on BP modal's close button
          bpModalCloseButton && bpModalCloseButton.focus()

          // remember the launching modal to restore focus after closing
          thumbThatLaunchedModal = e.currentTarget
        },
        onClose: () => {
          modalDismissEnabled = true
          setTimeout(() => {
            thumbThatLaunchedModal.focus()
          }, 50) // added setTimeout to override Vimeo player taking over focus
        },
      })
    }
  }

  const getStillIndex = (i) => `${i + 1} of ${stills.length}`
</script>

<section class="stills">
  <div class="still-thumbs" id="images">
    {#each stills as still, i}
      <a
        href={imagePath + cloudinaryStillTransforms + still}
        data-img={imagePath + cloudinaryStillTransforms + still}
        data-thumb={imagePath + cloudinaryStillTransforms + still}
        data-width={stillsDims[i].maxWidth}
        data-height={stillsDims[i].maxHeight}
        data-alt={`Still ${getStillIndex(i)}`}
        on:click={openGallery}
      >
        <img
          src={imagePath + cloudinaryStillTransforms + still}
          alt={`Still thumbnail ${getStillIndex(i)}`}
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

  // darken BP's scrim so modal contents don't appear beneath
  :global(.bp-wrap > div:first-child) {
    background: rgb(0, 0, 0);
  }

  // align image count (e.g. '1 / 16') with modal header
  :global(.bp-count) {
    margin-top: var(--margin-body-top);
    margin-left: var(--modal-h-margin);
    font-size: 0.8125em;
  }

  // align X button with modal's X button
  :global(.bp-controls button.bp-x) {
    top: calc(var(--margin-body-top) + 0.5px);
    right: calc(var(--modal-h-margin));
    border-radius: 999px;
    width: 48px;
    height: 48px;
    background-color: rgb(0, 0, 0, 0.25);
  }

  // change icon from X to opposing arrows
  :global(.bp-x::before) {
    content: url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjIiIGhlaWdodD0iMjIiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0xMC4wNzEgMTEuOTI4SDEuOTI4djIuNDNoMy45OTdMLjI5MyAxOS45ODVsMS43MTYgMS43MjIgNS42MzQtNS42MzR2My45OTdoMi40Mjh2LTguMTQzWm02LjAwMy00LjI4NSA1LjYzMi01LjYzLTEuNzEtMS43MjEtNS42NCA1LjYzNFYxLjkzaC0yLjQyOHY4LjE0Mmg4LjE0M1Y3LjY0M2gtMy45OTdaIiBmaWxsPSIjZmZmIi8+PC9zdmc+');
    width: 22px;
    top: 13px;
    left: 13px;
  }
</style>
