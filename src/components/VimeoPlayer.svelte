<script>
  export let url
  export let title = "Video"
  export let autoplay = false

  // Get ID from Vimeo URL, which has ID at the end, e.g.
  // https://vimeo.com/manage/videos/644686119
  // (but also allow for ID alone being stored in place of URL)
  const id = url.toString().includes('/') // check if it's an URL
    ? url
      .split("/") // get URL tokens between slashes
      .filter(token => token) // remove empty tokens (if trailing slash)
      .pop() // return last non-empty token
    : url
</script>

<div style="
  padding:56.25% 0 0 0;
  position:relative;
">
  <iframe
    {title}
    src={
      `https://player.vimeo.com/video/${id}`
      + `${id.toString().includes('?') ? '&' : '?'}autoplay=${autoplay ? '1' : '0'}`
      + `&playsinline=0`
    }
    style="
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    "
    frameborder="0"
    allow="autoplay; fullscreen; picture-in-picture"
    allowfullscreen
  ></iframe>
</div>