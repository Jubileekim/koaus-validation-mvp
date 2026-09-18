import { apiRequest } from './api.js'

export function signup({ email, password, displayName }) {
  return apiRequest('/api/auth/signup', {
    method: 'POST',
    body: { email, password, displayName },
  })
}

export function login({ email, password }) {
  return apiRequest('/api/auth/login', {
    method: 'POST',
    body: { email, password },
  })
}

export function logout() {
  return apiRequest('/api/auth/logout', {
    method: 'POST',
  })
}

export function getMe() {
  return apiRequest('/api/auth/me')
}
