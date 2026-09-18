export function canEditPost(user, post) {
  if (!user || !post) return false
  if (user.role === 'ADMIN') return true
  if (post.authorUserId && post.authorUserId === user.id) {
    return true
  }
  return false
}
