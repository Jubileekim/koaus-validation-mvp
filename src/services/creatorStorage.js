const STORAGE_KEY = 'koaus_creator'

function canUseStorage() {
  return typeof window !== 'undefined' && typeof window.localStorage !== 'undefined'
}

export function getCreatorProfile() {
  if (!canUseStorage()) return null
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw)
    return parsed && typeof parsed === 'object' ? parsed : null
  } catch {
    return null
  }
}

export function saveCreatorProfile(profile) {
  if (!canUseStorage()) return false
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(profile))
    return true
  } catch {
    return false
  }
}

export function removeCreatorProfile() {
  if (!canUseStorage()) return
  try {
    window.localStorage.removeItem(STORAGE_KEY)
  } catch {
    // Ignore storage errors in private/restricted browsers.
  }
}

export function hasCreatorAccess() {
  const profile = getCreatorProfile()
  return Boolean(profile?.accessGranted === true)
}
