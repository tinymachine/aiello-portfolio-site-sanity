/**
 * Get image width, height, and aspect ratio for an array of image URLs.
 */

import probeImageSize from 'probe-image-size' // doesn't download image fully

const getDimsFromImageURLs = async (urls) => {
  const dimsForImages = urls.map(async (url) => {
    const result = await probeImageSize(url)

    return {
      width: result.width,
      height: result.height,
      aspect: (result.width / result.height)
    }
  })

  return await Promise.all(dimsForImages)
}

export default getDimsFromImageURLs