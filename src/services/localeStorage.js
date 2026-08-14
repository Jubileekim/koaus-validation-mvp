const STORAGE_KEY = 'koaus_locale'
const SUPPORTED = ['en', 'ko']

function canUseStorage() {
  return typeof window !== 'undefined' && typeof window.localStorage !== 'undefined'
}

export function getStoredLocale() {
  if (!canUseStorage()) return 'en'
  try {
    const value = window.localStorage.getItem(STORAGE_KEY)
    return SUPPORTED.includes(value) ? value : 'en'
  } catch {
    return 'en'
  }
}

export function saveStoredLocale(locale) {
  if (!canUseStorage()) return
  try {
    window.localStorage.setItem(STORAGE_KEY, locale)
  } catch {
    // Ignore storage errors in private/restricted browsers.
  }
}
