export function getSafeReturnTo(candidate, fallback = '/') {
  if (typeof candidate !== 'string' || !candidate) {
    return fallback
  }

  if (!candidate.startsWith('/')) {
    return fallback
  }

  if (candidate.startsWith('//') || candidate.includes('://')) {
    return fallback
  }

  if (
    candidate === '/login' ||
    candidate === '/signup' ||
    candidate.startsWith('/login?') ||
    candidate.startsWith('/signup?')
  ) {
    return fallback
  }

  return candidate
}

export function resolveAuthReturnTo(location, fallback = '/') {
  const fromState = location?.state?.from
  const fromQuery = new URLSearchParams(location?.search || '').get(
    'returnTo',
  )

  return getSafeReturnTo(fromState || fromQuery, fallback)
}
