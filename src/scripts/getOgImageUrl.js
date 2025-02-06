export const getOgImageUrl = (
  source,
  { targetWidth = 1200, targetHeight = 630 }
) => {
  const getRectDims = ({ width, height, crop }) => {
    // compute the cropped image's area
    const croppedWidth = Math.floor(
      width * (1 - ((crop?.right || 0) + (crop?.left || 0)))
    )
    const croppedHeight = Math.floor(
      height * (1 - ((crop?.top || 0) + (crop?.bottom || 0)))
    )

    // compute the cropped image's position
    const left = Math.floor(width * (crop?.left || 0))
    const top = Math.floor(height * (crop?.top || 0))

    return {
      left,
      top,
      croppedWidth,
      croppedHeight,
    }
  }

  // Helper function to generate image URL with hotspot consideration
  const urlFor = (source) => {
    if (!source) return null

    const { left, top, croppedWidth, croppedHeight } = getRectDims(source)
    return `
      ${source.url}
      ?w=${targetWidth}
      &h=${targetHeight}
      &rect=${left},${top},${croppedWidth},${croppedHeight}
      &focalpoint=${source.hotspot?.x || 0.5},${source.hotspot?.y || 0.5}
      &fit=crop
      &crop=focalpoint
      &fm=jpg
      &q=95
    `.replace(/\s/g, '')
  }

  return urlFor(source)
}
