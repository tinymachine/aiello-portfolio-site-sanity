<script>
  export let targetId

  let buttonEl
  let isButtonBelowMidline = true

  const scrollToTarget = (e) => {
    e.preventDefault() // don't update URL hash

    isButtonBelowMidline
      ? document.getElementById(targetId).scrollIntoView()
      : document.body.scrollIntoView()
  }

  const updateButtonPosition = () => {
    const buttonOffset = buttonEl.getBoundingClientRect()
    isButtonBelowMidline = buttonOffset.y > window.innerHeight / 2
  }
</script>

<a
  href={`#${targetId}`}
  class={isButtonBelowMidline ? '' : 'reverse'}
  bind:this={buttonEl}
  on:click={scrollToTarget}
  aria-label={isButtonBelowMidline ? 'Scroll to content' : 'Scroll to top'}
>
  <img src="/img/chevron-down.svg" alt="" />
</a>

<svelte:window on:scroll|passive={updateButtonPosition} />

<style lang="scss">
  a {
    margin-right: calc(0.5 * var(--margin-body-h));
    width: var(--scroll-button-diameter);
    height: var(--scroll-button-diameter);
    border-radius: 999px;
    background-color: rgba(255, 255, 255, 0);
    display: inline-flex;
    position: relative;
    transition: all 0.5s;
    background-color: rgba(255, 255, 255, 0.0625);

    &:hover,
    &:focus {
      background-color: rgba(255, 255, 255, 0.08);
    }

    img {
      position: absolute;
      top: 54%;
      left: 50%;
      transform: translate(-50%, -50%);
      transition: transform 1s;
    }

    &.reverse {
      // hardcoded! keep in sync with reverseClassName!
      img {
        top: 48%;
        transform: translate(-50%, -50%) scaleY(-1);
      }
    }
  }
</style>
