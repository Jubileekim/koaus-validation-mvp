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

export default function SignupPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const { signup, isAuthenticated, isLoading } = useAuth()

  const [displayName, setDisplayName] = useState('')
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
    const trimmedName = displayName.trim()
    const trimmedEmail = email.trim()

    if (!trimmedName) {
      errors.displayName = 'Display name is required.'
    } else if (trimmedName.length > 50) {
      errors.displayName = 'Display name must be 50 characters or fewer.'
    }

    if (!trimmedEmail) {
      errors.email = 'Email is required.'
    } else if (!isValidEmail(trimmedEmail)) {
      errors.email = 'Enter a valid email address.'
    }

    if (!password) {
      errors.password = 'Password is required.'
    } else if (password.length < 8) {
      errors.password = 'Password must be at least 8 characters.'
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
      await signup({
        displayName: displayName.trim(),
        email: email.trim(),
        password,
      })
      navigate(returnTo, { replace: true })
    } catch (error) {
      setSubmitError(
        error.message || 'Failed to create account. Please try again.',
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
          <h1>Sign up</h1>
          <p className="auth-lead">
            Create an account to comment on KOAUS Editorial stories.
          </p>

          <form className="auth-form" onSubmit={handleSubmit} noValidate>
            {submitError ? (
              <p className="auth-error" role="alert">
                {submitError}
              </p>
            ) : null}

            <FormField
              label="Display name"
              type="text"
              name="displayName"
              autoComplete="name"
              value={displayName}
              onChange={(event) => setDisplayName(event.target.value)}
              error={fieldErrors.displayName}
              disabled={submitting}
            />

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
              autoComplete="new-password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              error={fieldErrors.password}
              disabled={submitting}
            />

            <div className="auth-actions">
              <Button type="submit" disabled={submitting}>
                {submitting ? 'Creating account…' : 'Create account'}
              </Button>

              <p className="auth-switch">
                Already have an account?{' '}
                <Link
                  to={{
                    pathname: '/login',
                    search: location.search || undefined,
                  }}
                  state={
                    location.state?.from
                      ? { from: location.state.from }
                      : undefined
                  }
                >
                  Log in
                </Link>
              </p>
            </div>
          </form>
        </section>
      </div>
    </main>
  )
}
