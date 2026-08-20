export function productInitials(name) {
  return String(name || '')
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0])
    .join('')
    .toUpperCase()
}

export function imagesFor(productId) {
  const base = `/assets/products/${productId}`
  return {
    main: `${base}/main.webp`,
    gallery: [
      `${base}/main.webp`,
      `${base}/lifestyle-01.webp`,
      `${base}/detail-01.webp`,
    ],
  }
}

export function getProductGallery(product) {
  const images = product?.images
  if (!images || typeof images !== 'object') return []

  const list = []
  if (images.main) list.push(images.main)
  if (Array.isArray(images.gallery)) {
    images.gallery.forEach((src) => {
      if (src && !list.includes(src)) list.push(src)
    })
  }
  return list
}

export function getLifestyleImage(product) {
  const gallery = getProductGallery(product)
  return gallery[1] || ''
}

const CATEGORY_TAGS = new Set([
  'Beauty',
  'Fashion',
  'Wellness',
  'Food',
  'Lifestyle',
  'Stationery',
  'Other',
])

export function displayFitTag(t, value) {
  if (CATEGORY_TAGS.has(value)) return t(`category.${value}`)
  return value
}
