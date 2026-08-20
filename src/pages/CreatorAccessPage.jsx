import { useEffect, useMemo, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router'
import Header from '../components/layout/Header.jsx'
import Button from '../components/ui/Button.jsx'
import FormField from '../components/ui/FormField.jsx'
import {
  getCreatorProfile,
  hasCreatorAccess,
  removeCreatorProfile,
  saveCreatorProfile,
} from '../services/creatorStorage.js'
import { useTranslation } from '../contexts/LocaleContext.jsx'
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

const FOLLOWER_RANGES = [
  ['Under 10K', 'creator.rangeUnder10'],
  ['10K–50K', 'creator.range10'],
  ['50K–100K', 'creator.range50'],
  ['100K–500K', 'creator.range100'],
  ['500K+', 'creator.range500'],
]

const CONTENT_CATEGORIES = ['Beauty', 'Fashion', 'Lifestyle', 'Food', 'Wellness', 'Other']

function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
}

function isValidHttpUrl(value) {
  try {
    const url = new URL(value)
    return url.protocol === 'http:' || url.protocol === 'https:'
  } catch {
    return false
  }
}

function getSafeRedirect(redirect) {
  if (!redirect) return '/marketplace'
  if (redirect.startsWith('/') && !redirect.startsWith('//')) return redirect
  return '/marketplace'
}

function validateForm(form, t) {
  const errors = {}
  if (!form.email.trim()) {
    errors.email = t('errors.emailRequired')
  } else if (!isValidEmail(form.email.trim())) {
    errors.email = t('errors.emailInvalid')
  }
  if (!form.creatorName.trim()) {
    errors.creatorName = t('errors.creatorName')
  }
  if (!form.platform) {
    errors.platform = t('errors.platform')
  }
  if (!form.profileUrl.trim()) {
    errors.profileUrl = t('errors.profileUrl')
  } else if (!isValidHttpUrl(form.profileUrl.trim())) {
    errors.profileUrl = t('errors.profileUrlInvalid')
  }
  if (!form.followerRange) {
    errors.followerRange = t('errors.followerRange')
  }
  if (!form.category) {
    errors.category = t('errors.contentCategory')
  }
  return errors
}

export default function CreatorAccessPage() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const redirectTo = getSafeRedirect(searchParams.get('redirect'))

  const existingProfile = useMemo(() => getCreatorProfile(), [])
  const [form, setForm] = useState(EMPTY_FORM)
  const [errors, setErrors] = useState({})
  const [isActive, setIsActive] = useState(() => hasCreatorAccess())
  const [success, setSuccess] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [saveFailed, setSaveFailed] = useState(false)
  const [activeProfile, setActiveProfile] = useState(existingProfile)

  useEffect(() => {
    setErrors((current) => {
      if (Object.keys(current).length === 0) return current
      return validateForm(form, t)
    })
  }, [t, form])

  const updateField = (field, value) => {
    setSaveFailed(false)
    setForm((current) => ({ ...current, [field]: value }))
  }

  const handleReset = () => {
    removeCreatorProfile()
    setIsActive(false)
    setActiveProfile(null)
    setForm(EMPTY_FORM)
    setErrors({})
    setSuccess(false)
    setSubmitting(false)
    setSaveFailed(false)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    if (submitting) return

    const nextErrors = validateForm(form, t)
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) return

    setSaveFailed(false)
    setSubmitting(true)
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

    const saved = saveCreatorProfile(profile)
    if (!saved) {
      setSubmitting(false)
      setSaveFailed(true)
      return
    }

    setActiveProfile(profile)
    setIsActive(true)
    setSuccess(true)
    setErrors({})

    window.setTimeout(() => {
      navigate(redirectTo)
    }, 900)
  }

  const followerLabel =
    FOLLOWER_RANGES.find(([value]) => value === activeProfile?.followerRange)?.[1]

  return (
    <div className="mp-page">
      <Header />

      <main className="shell ca-main">
        {success ? (
          <div className="ca-card ca-success">
            <p className="ca-eyebrow">{t('creator.eyebrow')}</p>
            <h1>{t('creator.successTitle')}</h1>
            <p>{t('creator.successBody')}</p>
          </div>
        ) : isActive && activeProfile ? (
          <div className="ca-card">
            <p className="ca-eyebrow">{t('creator.eyebrow')}</p>
            <h1>{t('creator.activeTitle')}</h1>
            <ul className="ca-profile">
              <li>{activeProfile.creatorName}</li>
              <li>{activeProfile.platform}</li>
              <li>{followerLabel ? t(followerLabel) : activeProfile.followerRange}</li>
            </ul>
            <p className="ca-note">{t('creator.activeNote')}</p>
            <div className="ca-actions">
              <Button to="/marketplace">{t('nav.browseMarketplace')}</Button>
              <Button variant="ghost" type="button" onClick={handleReset}>
                {t('creator.reset')}
              </Button>
            </div>
          </div>
        ) : (
          <div className="ca-card">
            <p className="ca-eyebrow">{t('creator.eyebrow')}</p>
            <h1>{t('creator.title')}</h1>
            <p className="ca-lead">{t('creator.lead')}</p>

            <form className="ca-form" onSubmit={handleSubmit} noValidate>
              <FormField
                className="ca-field"
                label={t('creator.email')}
                type="email"
                value={form.email}
                onChange={(event) => updateField('email', event.target.value)}
                autoComplete="email"
                error={errors.email}
              />

              <FormField
                className="ca-field"
                label={t('creator.name')}
                type="text"
                value={form.creatorName}
                onChange={(event) => updateField('creatorName', event.target.value)}
                autoComplete="name"
                error={errors.creatorName}
              />

              <FormField
                className="ca-field"
                as="select"
                label={t('creator.platform')}
                value={form.platform}
                onChange={(event) => updateField('platform', event.target.value)}
                error={errors.platform}
              >
                <option value="">{t('creator.selectPlatform')}</option>
                <option value="TikTok">TikTok</option>
                <option value="Instagram">Instagram</option>
                <option value="YouTube">YouTube</option>
              </FormField>

              <FormField
                className="ca-field"
                label={t('creator.url')}
                type="url"
                value={form.profileUrl}
                onChange={(event) => updateField('profileUrl', event.target.value)}
                placeholder="https://"
                autoComplete="url"
                error={errors.profileUrl}
              />

              <FormField
                className="ca-field"
                as="select"
                label={t('creator.followers')}
                value={form.followerRange}
                onChange={(event) => updateField('followerRange', event.target.value)}
                error={errors.followerRange}
              >
                <option value="">{t('creator.selectRange')}</option>
                {FOLLOWER_RANGES.map(([value, key]) => (
                  <option key={value} value={value}>
                    {t(key)}
                  </option>
                ))}
              </FormField>

              <FormField
                className="ca-field"
                as="select"
                label={t('creator.category')}
                value={form.category}
                onChange={(event) => updateField('category', event.target.value)}
                error={errors.category}
              >
                <option value="">{t('creator.selectCategory')}</option>
                {CONTENT_CATEGORIES.map((category) => (
                  <option key={category} value={category}>
                    {t(`category.${category}`)}
                  </option>
                ))}
              </FormField>

              <label className="ca-check">
                <input
                  type="checkbox"
                  checked={form.newsletterOptIn}
                  onChange={(event) =>
                    updateField('newsletterOptIn', event.target.checked)
                  }
                />
                <span>{t('creator.newsletter')}</span>
              </label>
              <p className="ca-pref">{t('creator.pref')}</p>

              {saveFailed ? (
                <p className="form-save-error" role="alert">
                  {t('errors.storageSave')}
                </p>
              ) : null}

              <Button type="submit" disabled={submitting}>
                {submitting ? t('common.saving') : t('creator.submit')}
              </Button>
            </form>
          </div>
        )}
      </main>
    </div>
  )
}
