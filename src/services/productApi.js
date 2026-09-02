const API_URL =
  import.meta.env.VITE_API_URL || 'http://localhost:3000'

export async function getProducts() {
  const response = await fetch(`${API_URL}/api/products`)

  if (!response.ok) {
    throw new Error('Failed to load products')
  }

  return response.json()
}

export async function getProductById(productId) {
  const response = await fetch(
    `${API_URL}/api/products/${productId}`,
  )

  if (response.status === 404) {
    return null
  }

  if (!response.ok) {
    throw new Error('Failed to load product')
  }

  return response.json()
}