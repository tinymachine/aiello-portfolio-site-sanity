const getSrcset = ({
  url,
  min = 400,
  max = 3600,
  step = 200,
  additionalParams = '',
}) => {
  const imageUrls = []
  for (let w = min; w <= max + step; w += step) {
    imageUrls.push(`${url}?w=${w}${additionalParams} ${w}w`)
  }
  return imageUrls.join(',\n')
}

export { getSrcset }
