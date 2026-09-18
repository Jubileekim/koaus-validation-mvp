import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router'
import Button from '../components/ui/Button.jsx'
import FormField from '../components/ui/FormField.jsx'
import { useAuth } from '../contexts/AuthContext.jsx'
import { resolveAuthReturnTo } from '../utils/authRedirect.js'
import '../styles/auth.css'

function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
}

export default function LoginPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const { login, isAuthenticated, isLoading } = useAuth()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [fieldErrors, setFieldErrors] = useState({})
  const [submitError, setSubmitError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const returnTo = resolveAuthReturnTo(location)

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      navigate(returnTo, { replace: true })
    }
  }, [isAuthenticated, isLoading, navigate, returnTo])

  function validate() {
    const errors = {}

    if (!email.trim()) {
      errors.email = 'Email is required.'
    } else if (!isValidEmail(email.trim())) {
      errors.email = 'Enter a valid email address.'
    }

    if (!password) {
      errors.password = 'Password is required.'
    }

    setFieldErrors(errors)
    return Object.keys(errors).length === 0
  }

  async function handleSubmit(event) {
    event.preventDefault()

    if (submitting || !validate()) {
      return
    }

    try {
      setSubmitting(true)
      setSubmitError('')
      await login({
        email: email.trim(),
        password,
      })
      navigate(returnTo, { replace: true })
    } catch (error) {
      setSubmitError(
        error.message || 'Failed to log in. Please try again.',
      )
    } finally {
      setSubmitting(false)
    }
  }

  if (isLoading) {
    return (
      <main className="auth-page">
        <div className="auth-shell">
          <p className="auth-loading">Checking your session…</p>
        </div>
      </main>
    )
  }

  if (isAuthenticated) {
    return null
  }

  return (
    <main className="auth-page">
      <div className="auth-shell">
        <section className="auth-card">
          <p className="auth-eyebrow">Account</p>
          <h1>Log in</h1>
          <p className="auth-lead">
            Sign in to join the conversation on KOAUS Editorial.
          </p>

          <form className="auth-form" onSubmit={handleSubmit} noValidate>
            {submitError ? (
              <p className="auth-error" role="alert">
                {submitError}
              </p>
            ) : null}

            <FormField
              label="Email"
              type="email"
              name="email"
              autoComplete="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              error={fieldErrors.email}
              disabled={submitting}
            />

            <FormField
              label="Password"
              type="password"
              name="password"
              autoComplete="current-password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              error={fieldErrors.password}
              disabled={submitting}
            />

            <div className="auth-actions">
              <Button type="submit" disabled={submitting}>
                {submitting ? 'Logging in…' : 'Log in'}
              </Button>

              <p className="auth-switch">
                Don&apos;t have an account?{' '}
                <Link
                  to={{
                    pathname: '/signup',
                    search: location.search || undefined,
                  }}
                  state={
                    location.state?.from
                      ? { from: location.state.from }
                      : undefined
                  }
                >
                  Sign up
                </Link>
              </p>
            </div>
          </form>
        </section>
      </div>
    </main>
  )
}
