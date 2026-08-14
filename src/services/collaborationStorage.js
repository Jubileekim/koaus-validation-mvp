const STORAGE_KEY = 'koaus_collaboration_requests'

function canUseStorage() {
  return typeof window !== 'undefined' && typeof window.localStorage !== 'undefined'
}

export function getCollaborationRequests() {
  if (!canUseStorage()) return []
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

export function saveCollaborationRequest(request) {
  if (!canUseStorage()) return false
  try {
    const requests = getCollaborationRequests()
    requests.push(request)
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(requests))
    return true
  } catch {
    return false
  }
}

export function removeCollaborationRequest(requestId) {
  if (!canUseStorage()) return
  try {
    const next = getCollaborationRequests().filter((item) => item.id !== requestId)
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
  } catch {
    // Ignore storage errors in private/restricted browsers.
  }
}

export function getRequestsByCreator(email) {
  if (!email) return []
  const normalized = String(email).trim().toLowerCase()
  if (!normalized) return []
  return getCollaborationRequests().filter(
    (item) => String(item.creatorEmail || '').trim().toLowerCase() === normalized,
  )
}
