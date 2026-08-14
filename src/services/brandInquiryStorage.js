const STORAGE_KEY = 'koaus_brand_inquiries'

function canUseStorage() {
  return typeof window !== 'undefined' && typeof window.localStorage !== 'undefined'
}

export function getBrandInquiries() {
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

export function saveBrandInquiry(inquiry) {
  if (!canUseStorage()) return false
  try {
    const inquiries = getBrandInquiries()
    inquiries.push(inquiry)
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(inquiries))
    return true
  } catch {
    return false
  }
}

export function removeBrandInquiry(id) {
  if (!canUseStorage()) return
  try {
    const next = getBrandInquiries().filter((item) => item.id !== id)
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
  } catch {
    // Ignore storage errors in private/restricted browsers.
  }
}
