<script>
  import { DialogOverlay, DialogContent } from 'svelte-accessible-dialog'
  import { fade } from 'svelte/transition'
  import { quadInOut } from 'svelte/easing'
  import ProjectModalContents from './ProjectModalContents.svelte'

  export let isOpen
  export let onDismiss
  export let project
  export let projectTypeLabel

  let modalDismissEnabled = true

  const handleDismiss = () => {
    modalDismissEnabled && onDismiss()
  }
</script>

<DialogOverlay
  {isOpen}
  onDismiss={handleDismiss}
  style="z-index: 10; background: transparent; overflow: visible;"
>
  {#if isOpen}
    <div
      class="fader"
      transition:fade|global={{ duration: 400, easing: quadInOut }}
    >
      <DialogContent
        style="
          width: 100vw;
          height: 100%;
          margin: 0 auto;
          padding: var(--margin-body-top) 0 6rem;
          overflow-y: scroll;
          background-color: var(--color-modal-bg);
        "
      >
        <div class="modal__close">
          <button
            aria-label="Close project detail modal"
            class="modal__close__button"
            on:click={onDismiss}
          >
            <img
              src="/img/close-button.svg"
              width="36"
              height="36"
              alt=""
              title="Press Esc to close"
            />
          </button>
        </div>

        <ProjectModalContents
          {project}
          {projectTypeLabel}
          bind:modalDismissEnabled
        />
      </DialogContent>
    </div>
  {/if}
</DialogOverlay>

<style lang="scss">
  .fader {
    height: 100%;
  }

  .modal__close {
    position: fixed;
    top: 0rem;
    right: 0rem;
    z-index: 2;

    button {
      padding: var(--margin-body-top) var(--modal-h-margin);
      border: none;
      background-color: transparent;
      opacity: 0.5;
      transition: opacity 0.25s ease-in-out;
      cursor: pointer;

      &:focus {
        outline: none; // focus ring handled on the close button image below
      }

      &:hover,
      &:focus {
        opacity: 0.75;
      }

      img {
        width: 2.25rem;
      }

      &:focus-visible img {
        outline: var(--focus-outline-shorthand);
        outline-offset: var(--focus-outline-offset);
        border-radius: 999px;
      }
    }
  }
</style>
