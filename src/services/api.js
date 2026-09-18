const API_URL =
  import.meta.env.VITE_API_URL || 'http://localhost:3000'

export { API_URL }

export class ApiError extends Error {
  constructor({ status, message, data = null }) {
    super(message)
    this.name = 'ApiError'
    this.status = status
    this.data = data
  }
}

export async function apiRequest(path, options = {}) {
  const {
    method = 'GET',
    body,
    headers = {},
    ...rest
  } = options

  const response = await fetch(`${API_URL}${path}`, {
    method,
    credentials: 'include',
    headers: {
      ...(body !== undefined
        ? { 'Content-Type': 'application/json' }
        : {}),
      ...headers,
    },
    body:
      body !== undefined ? JSON.stringify(body) : undefined,
    ...rest,
  })

  if (response.status === 204) {
    return null
  }

  const contentType = response.headers.get('content-type') || ''
  const isJson = contentType.includes('application/json')
  let data = null

  if (isJson) {
    try {
      data = await response.json()
    } catch {
      data = null
    }
  }

  if (!response.ok) {
    throw new ApiError({
      status: response.status,
      message:
        data?.message ||
        `Request failed with status ${response.status}`,
      data,
    })
  }

  return data
}
