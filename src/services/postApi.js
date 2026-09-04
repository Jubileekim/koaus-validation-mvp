const API_URL =
  import.meta.env.VITE_API_URL || 'http://localhost:3000'

export async function getPosts() {
  const response = await fetch(`${API_URL}/api/posts`)

  if (!response.ok) {
    throw new Error('Failed to load posts')
  }

  return response.json()
}

export async function getPostById(postId) {
  const response = await fetch(
    `${API_URL}/api/posts/${postId}`,
  )

  if (response.status === 404) {
    return null
  }

  if (!response.ok) {
    throw new Error('Failed to load post')
  }

  return response.json()
}

export async function createPost(postData) {
  const response = await fetch(`${API_URL}/api/posts`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(postData),
  })

  const data = await response.json()

  if (!response.ok) {
    throw new Error(
      data.message || 'Failed to create post',
    )
  }

  return data
}

export async function updatePost(postId, postData) {
  const response = await fetch(
    `${API_URL}/api/posts/${postId}`,
    {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(postData),
    },
  )

  const data = await response.json()

  if (!response.ok) {
    throw new Error(
      data.message || 'Failed to update post',
    )
  }

  return data
}

export async function deletePost(postId, password) {
    const response = await fetch(
      `${API_URL}/api/posts/${postId}`,
      {
        method: 'DELETE',
        headers: {
          'x-post-password': password,
        },
      },
    )
  
    const data = await response.json()
  
    if (!response.ok) {
      throw new Error(
        data.message || 'Failed to delete post',
      )
    }
  
    return data
  }