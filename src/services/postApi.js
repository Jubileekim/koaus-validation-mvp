import { apiRequest, ApiError, API_URL } from './api.js'

export async function getPosts() {
  return apiRequest('/api/posts')
}

export async function getPostById(postId) {
  try {
    return await apiRequest(`/api/posts/${postId}`)
  } catch (error) {
    if (error instanceof ApiError && error.status === 404) {
      return null
    }
    throw error
  }
}

export async function createPost(postData) {
  return apiRequest('/api/posts', {
    method: 'POST',
    body: postData,
  })
}

export async function updatePost(postId, postData) {
  return apiRequest(`/api/posts/${postId}`, {
    method: 'PATCH',
    body: postData,
  })
}

export async function deletePost(postId) {
  return apiRequest(`/api/posts/${postId}`, {
    method: 'DELETE',
  })
}

export { API_URL }
