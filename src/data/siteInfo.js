import forestrySettings from '../../.forestry/settings.yml'
const { public_path } = forestrySettings

// Add Cloudinary image optimizations
// ref: https://cloudinary.com/documentation/image_optimization#how_to_optimize_image_sizing
const imagePath = public_path + `/f_auto,q_auto`

export { imagePath }