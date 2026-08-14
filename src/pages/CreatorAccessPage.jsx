import { useMemo, useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router'
import {
  getCreatorProfile,
  hasCreatorAccess,
  removeCreatorProfile,
  saveCreatorProfile,
} from '../services/creatorStorage.js'
import '../styles/marketplace.css'
import '../styles/creator-access.css'

const EMPTY_FORM = {
  email: '',
  creatorName: '',
  platform: '',
  profileUrl: '',
  followerRange: '',
  category: '',
  newsletterOptIn: false,
}

function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
}

function getSafeRedirect(redirect) {
  if (!redirect) return '/marketplace'
  if (redirect.startsWith('/') && !redirect.startsWith('//')) return redirect
  return '/marketplace'
}

function validateForm(form) {
  const errors = {}
  if (!form.email.trim()) {
    errors.email = 'Please enter your email.'
  } else if (!isValidEmail(form.email.trim())) {
    errors.email = 'Please enter a valid email address.'
  }
  if (!form.creatorName.trim()) {
    errors.creatorName = 'Please enter your creator name.'
  }
  if (!form.platform) {
    errors.platform = 'Please select your primary platform.'
  }
  if (!form.profileUrl.trim()) {
    errors.profileUrl = 'Please enter your creator profile URL.'
  }
  if (!form.followerRange) {
    errors.followerRange = 'Please select your follower range.'
  }
  if (!form.category) {
    errors.category = 'Please select your content category.'
  }
  return errors
}

export default function CreatorAccessPage() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const redirectTo = getSafeRedirect(searchParams.get('redirect'))

  const existingProfile = useMemo(() => getCreatorProfile(), [])
  const [form, setForm] = useState(EMPTY_FORM)
  const [errors, setErrors] = useState({})
  const [isActive, setIsActive] = useState(() => hasCreatorAccess())
  const [success, setSuccess] = useState(false)
  const [activeProfile, setActiveProfile] = useState(existingProfile)

  const updateField = (field, value) => {
    setForm((current) => ({ ...current, [field]: value }))
  }

  const handleReset = () => {
    removeCreatorProfile()
    setIsActive(false)
    setActiveProfile(null)
    setForm(EMPTY_FORM)
    setErrors({})
    setSuccess(false)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const nextErrors = validateForm(form)
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) return

    const profile = {
      email: form.email.trim(),
      creatorName: form.creatorName.trim(),
      platform: form.platform,
      profileUrl: form.profileUrl.trim(),
      followerRange: form.followerRange,
      category: form.category,
      newsletterOptIn: form.newsletterOptIn,
      accessGranted: true,
      createdAt: new Date().toISOString(),
    }

    saveCreatorProfile(profile)
    setActiveProfile(profile)
    setIsActive(true)
    setSuccess(true)

    window.setTimeout(() => {
      navigate(redirectTo)
    }, 900)
  }

  return (
    <div className="mp-page">
      <div className="mp-topbar">
        <div className="shell mp-topbar__inner">
          <Link className="wordmark" to="/" aria-label="Koaus home">
            koaus <span>/ creator access</span>
          </Link>
          <Link className="button button--ghost" to="/marketplace">
            Browse Marketplace
          </Link>
        </div>
      </div>

      <main className="shell ca-main">
        {success ? (
          <div className="ca-card ca-success">
            <p className="ca-eyebrow">CREATOR ACCESS</p>
            <h1>✓ Creator Access unlocked</h1>
            <p>Creator-only pricing is now available.</p>
          </div>
        ) : isActive && activeProfile ? (
          <div className="ca-card">
            <p className="ca-eyebrow">CREATOR ACCESS</p>
            <h1>Creator Access Active</h1>
            <ul className="ca-profile">
              <li>{activeProfile.creatorName}</li>
              <li>{activeProfile.platform}</li>
              <li>{activeProfile.followerRange}</li>
            </ul>
            <p className="ca-note">Your creator access is active.</p>
            <div className="ca-actions">
              <Link className="button button--dark" to="/marketplace">
                Browse Marketplace
              </Link>
              <button className="button button--ghost" type="button" onClick={handleReset}>
                Reset Creator Access
              </button>
            </div>
          </div>
        ) : (
          <div className="ca-card">
            <p className="ca-eyebrow">CREATOR ACCESS</p>
            <h1>Unlock creator-only pricing and collaborations.</h1>
            <p className="ca-lead">
              Get access to creator pricing, samples, and collaboration
              opportunities from curated Korean brands.
            </p>

            <form className="ca-form" onSubmit={handleSubmit} noValidate>
              <label className="ca-field">
                <span>Email *</span>
                <input
                  type="email"
                  value={form.email}
                  onChange={(event) => updateField('email', event.target.value)}
                  autoComplete="email"
                />
                {errors.email ? <em>{errors.email}</em> : null}
              </label>

              <label className="ca-field">
                <span>Creator Name *</span>
                <input
                  type="text"
                  value={form.creatorName}
                  onChange={(event) => updateField('creatorName', event.target.value)}
                  autoComplete="name"
                />
                {errors.creatorName ? <em>{errors.creatorName}</em> : null}
              </label>

              <label className="ca-field">
                <span>Primary Platform *</span>
                <select
                  value={form.platform}
                  onChange={(event) => updateField('platform', event.target.value)}
                >
                  <option value="">Select a platform</option>
                  <option value="TikTok">TikTok</option>
                  <option value="Instagram">Instagram</option>
                  <option value="YouTube">YouTube</option>
                </select>
                {errors.platform ? <em>{errors.platform}</em> : null}
              </label>

              <label className="ca-field">
                <span>Creator Profile URL *</span>
                <input
                  type="url"
                  value={form.profileUrl}
                  onChange={(event) => updateField('profileUrl', event.target.value)}
                  placeholder="https://"
                  autoComplete="url"
                />
                {errors.profileUrl ? <em>{errors.profileUrl}</em> : null}
              </label>

              <label className="ca-field">
                <span>Follower Range *</span>
                <select
                  value={form.followerRange}
                  onChange={(event) => updateField('followerRange', event.target.value)}
                >
                  <option value="">Select a range</option>
                  <option value="Under 10K">Under 10K</option>
                  <option value="10K–50K">10K–50K</option>
                  <option value="50K–100K">50K–100K</option>
                  <option value="100K–500K">100K–500K</option>
                  <option value="500K+">500K+</option>
                </select>
                {errors.followerRange ? <em>{errors.followerRange}</em> : null}
              </label>

              <label className="ca-field">
                <span>Content Category *</span>
                <select
                  value={form.category}
                  onChange={(event) => updateField('category', event.target.value)}
                >
                  <option value="">Select a category</option>
                  <option value="Beauty">Beauty</option>
                  <option value="Fashion">Fashion</option>
                  <option value="Lifestyle">Lifestyle</option>
                  <option value="Food">Food</option>
                  <option value="Wellness">Wellness</option>
                  <option value="Other">Other</option>
                </select>
                {errors.category ? <em>{errors.category}</em> : null}
              </label>

              <label className="ca-check">
                <input
                  type="checkbox"
                  checked={form.newsletterOptIn}
                  onChange={(event) =>
                    updateField('newsletterOptIn', event.target.checked)
                  }
                />
                <span>
                  Send me new Korean product drops and collaboration
                  opportunities.
                </span>
              </label>
              <p className="ca-pref">
                This only saves your preference on this device. No emails are
                sent in this MVP.
              </p>

              <button className="button button--dark" type="submit">
                Get Creator Access
              </button>
            </form>
          </div>
        )}
      </main>
    </div>
  )
}
