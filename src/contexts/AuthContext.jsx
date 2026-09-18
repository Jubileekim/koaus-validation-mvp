import {
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react'
import {
  getMe,
  login as loginRequest,
  logout as logoutRequest,
  signup as signupRequest,
} from '../services/authApi.js'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  async function refreshUser() {
    setError(null)
    const data = await getMe()
    const nextUser = data?.user ?? null
    setUser(nextUser)
    return nextUser
  }

  useEffect(() => {
    let cancelled = false

    async function restoreSession() {
      try {
        const data = await getMe()
        if (!cancelled) {
          setUser(data?.user ?? null)
          setError(null)
        }
      } catch (err) {
        if (!cancelled) {
          setUser(null)
          setError(err)
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false)
        }
      }
    }

    restoreSession()

    return () => {
      cancelled = true
    }
  }, [])

  async function signup(credentials) {
    setError(null)

    try {
      const data = await signupRequest(credentials)
      const nextUser = data?.user ?? null
      setUser(nextUser)
      return nextUser
    } catch (err) {
      setError(err)
      throw err
    }
  }

  async function login(credentials) {
    setError(null)

    try {
      const data = await loginRequest(credentials)
      const nextUser = data?.user ?? null
      setUser(nextUser)
      return nextUser
    } catch (err) {
      setError(err)
      throw err
    }
  }

  async function logout() {
    setError(null)

    try {
      await logoutRequest()
      setUser(null)
    } catch (err) {
      setError(err)
      throw err
    }
  }

  const value = {
    user,
    isAuthenticated: Boolean(user),
    isLoading,
    error,
    signup,
    login,
    logout,
    refreshUser,
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }

  return context
}
