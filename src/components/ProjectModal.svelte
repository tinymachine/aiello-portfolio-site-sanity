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
    <div class="fader" transition:fade="{{ duration: 400, easing: quadInOut }}">
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
            aria-label="Close"
            class="modal__close__button"
            on:click={onDismiss}
          >
            <img src="/img/close-button.svg" alt="" title="Press Esc to close" />
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
      padding: var(--margin-body-top);
      border: none;
      background-color: transparent;
      opacity: 0.5;
      transition: opacity 0.25s ease-in-out;
      cursor: pointer;

      &:focus {
        outline: none; /* TODO: Find a more a11y way of handling this, esp. in Safari desktop; 
                          Merely adding a `:focus-visible` declaration doesn't solve problem
                          of Safari highlighting the close button when launching a project modal
                          even when using mouse. */ 
      }

      &:hover,
      &:focus {
        opacity: 0.75;
      }

      img {
        width: 2.25rem;
      }
    }
  }
</style>