import { apiRequest } from './api.js'

export function getComments(postId) {
  return apiRequest(`/api/posts/${postId}/comments`)
}

export function createComment(postId, content) {
  return apiRequest(`/api/posts/${postId}/comments`, {
    method: 'POST',
    body: { content },
  })
}

export function deleteComment(commentId) {
  return apiRequest(`/api/comments/${commentId}`, {
    method: 'DELETE',
  })
}
