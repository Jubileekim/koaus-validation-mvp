import { useEffect, useState } from 'react'
import { Link } from 'react-router'
import LanguageToggle from '../components/layout/LanguageToggle.jsx'
import { saveBrandInquiry } from '../services/brandInquiryStorage.js'
import { useTranslation } from '../contexts/LocaleContext.jsx'
import '../styles/marketplace.css'
import '../styles/brands.css'

const EMPTY_FORM = {
  brandName: '',
  contactEmail: '',
  website: '',
  productName: '',
  category: '',
  currentUSPresence: '',
  collaborationInterests: [],
  message: '',
}

const CATEGORIES = [
  'Beauty',
  'Fashion',
  'Wellness',
  'Food',
  'Lifestyle',
  'Stationery',
  'Other',
]

const US_PRESENCE = [
  ['Not launched', 'brands.presenceNone'],
  ['Testing the market', 'brands.presenceTesting'],
  ['Already selling', 'brands.presenceSelling'],
]

const COLLAB_OPTIONS = [
  'Group Buy',
  'Affiliate',
  'UGC',
  'Sponsored Content',
  'Product Seeding',
]

const WHY_ITEMS = [
  { title: 'brands.why1Title', body: 'brands.why1Body' },
  { title: 'brands.why2Title', body: 'brands.why2Body' },
  { title: 'brands.why3Title', body: 'brands.why3Body' },
]

const STEPS = [
  { num: '01', title: 'brands.step1Title', body: 'brands.step1Body' },
  { num: '02', title: 'brands.step2Title', body: 'brands.step2Body' },
  { num: '03', title: 'brands.step3Title', body: 'brands.step3Body' },
]

const METRICS = [
  { value: '24', label: 'brands.m1' },
  { value: '6', label: 'brands.m2' },
  { value: '3', label: 'brands.m3' },
  { value: '12', label: 'brands.m4' },
]

function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
}

function createInquiryId() {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID()
  }
  return `inq-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`
}

function validateForm(form, t) {
  const errors = {}
  if (!form.brandName.trim()) {
    errors.brandName = t('errors.brandName')
  }
  if (!form.contactEmail.trim()) {
    errors.contactEmail = t('errors.emailRequired')
  } else if (!isValidEmail(form.contactEmail.trim())) {
    errors.contactEmail = t('errors.emailInvalid')
  }
  if (!form.productName.trim()) {
    errors.productName = t('errors.productName')
  }
  if (!form.category) {
    errors.category = t('errors.category')
  }
  return errors
}

export default function BrandsPage() {
  const { t } = useTranslation()
  const [form, setForm] = useState(EMPTY_FORM)
  const [errors, setErrors] = useState({})
  const [success, setSuccess] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    setErrors((current) => {
      if (Object.keys(current).length === 0) return current
      return validateForm(form, t)
    })
  }, [t, form])

  const updateField = (field, value) => {
    setForm((current) => ({ ...current, [field]: value }))
  }

  const toggleInterest = (option) => {
    setForm((current) => {
      const selected = current.collaborationInterests.includes(option)
      return {
        ...current,
        collaborationInterests: selected
          ? current.collaborationInterests.filter((item) => item !== option)
          : [...current.collaborationInterests, option],
      }
    })
  }

  const resetForm = () => {
    setForm(EMPTY_FORM)
    setErrors({})
    setSuccess(false)
    setSubmitting(false)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    if (submitting) return

    const nextErrors = validateForm(form, t)
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) return

    setSubmitting(true)
    const inquiry = {
      id: createInquiryId(),
      brandName: form.brandName.trim(),
      contactEmail: form.contactEmail.trim(),
      website: form.website.trim(),
      productName: form.productName.trim(),
      category: form.category,
      currentUSPresence: form.currentUSPresence,
      collaborationInterests: [...form.collaborationInterests],
      message: form.message.trim(),
      status: 'submitted',
      createdAt: new Date().toISOString(),
    }

    const saved = saveBrandInquiry(inquiry)
    setSubmitting(false)
    if (!saved) return
    setSuccess(true)
    setErrors({})
  }

  return (
    <div className="mp-page">
      <div className="mp-topbar">
        <div className="shell mp-topbar__inner">
          <Link className="wordmark" to="/" aria-label={t('nav.homeAria')}>
            koaus <span>/ brands</span>
          </Link>
          <div className="mp-topbar__actions">
            <LanguageToggle />
            <Link className="button button--ghost" to="/marketplace">
              {t('nav.browseMarketplace')}
            </Link>
          </div>
        </div>
      </div>

      <main>
        <section className="shell br-hero">
          <p className="br-eyebrow">{t('brands.eyebrow')}</p>
          <h1>{t('brands.title')}</h1>
          <p className="br-lead">{t('brands.lead')}</p>
          <div className="br-hero__actions">
            <a className="button button--dark" href="#list-your-product">
              {t('brands.list')}
            </a>
            <Link className="button button--ghost" to="/marketplace">
              {t('nav.browseMarketplace')}
            </Link>
          </div>
        </section>

        <section className="shell br-section">
          <header className="br-section__head">
            <p className="br-eyebrow">{t('brands.why')}</p>
            <h2>{t('brands.whyTitle')}</h2>
          </header>
          <div className="br-grid br-grid--3">
            {WHY_ITEMS.map((item) => (
              <article className="br-card" key={item.title}>
                <h3>{t(item.title)}</h3>
                <p>{t(item.body)}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="shell br-section">
          <header className="br-section__head">
            <p className="br-eyebrow">{t('brands.network')}</p>
            <h2>{t('brands.networkTitle')}</h2>
            <p>{t('brands.networkBody')}</p>
          </header>

          <div className="br-grid br-grid--3">
            <article className="br-card">
              <h3>{t('brands.platforms')}</h3>
              <div className="br-chips">
                <span>TikTok</span>
                <span>Instagram</span>
                <span>YouTube</span>
              </div>
            </article>
            <article className="br-card">
              <h3>{t('brands.categories')}</h3>
              <div className="br-chips">
                <span>{t('category.Beauty')}</span>
                <span>{t('category.Lifestyle')}</span>
                <span>{t('category.Fashion')}</span>
                <span>{t('category.Wellness')}</span>
                <span>{t('category.Food')}</span>
                <span>{t('category.Other')}</span>
              </div>
            </article>
            <article className="br-card">
              <h3>{t('brands.tiers')}</h3>
              <div className="br-chips">
                <span>{t('brands.nano')}</span>
                <span>{t('brands.micro')}</span>
                <span>{t('brands.mid')}</span>
              </div>
            </article>
          </div>

          <div className="br-grid br-grid--4">
            {METRICS.map((metric) => (
              <article className="br-card br-metric" key={metric.label}>
                <strong>{metric.value}</strong>
                <span>{t(metric.label)}</span>
              </article>
            ))}
          </div>
          <p className="br-disclaimer">{t('brands.disclaimer')}</p>
        </section>

        <section className="shell br-section">
          <header className="br-section__head">
            <p className="br-eyebrow">{t('brands.how')}</p>
            <h2>{t('brands.howTitle')}</h2>
          </header>
          <div className="br-grid br-grid--3">
            {STEPS.map((step) => (
              <article className="br-card" key={step.num}>
                <p className="br-step">{step.num}</p>
                <h3>{t(step.title)}</h3>
                <p>{t(step.body)}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="shell br-section br-inquiry" id="list-your-product">
          <div className="br-form-card">
            {success ? (
              <div className="br-success">
                <p className="br-eyebrow">{t('brands.successKicker')}</p>
                <h2>{t('brands.successTitle')}</h2>
                <p>{t('brands.success1')}</p>
                <p>{t('brands.success2')}</p>
                <div className="br-success__actions">
                  <Link className="button button--dark" to="/marketplace">
                    {t('brands.browseCreators')}
                  </Link>
                  <button
                    className="button button--ghost"
                    type="button"
                    onClick={resetForm}
                  >
                    {t('brands.another')}
                  </button>
                </div>
              </div>
            ) : (
              <>
                <p className="br-eyebrow">{t('brands.formKicker')}</p>
                <h2>{t('brands.formTitle')}</h2>
                <p className="br-form-lead">{t('brands.formLead')}</p>

                <form className="br-form" onSubmit={handleSubmit} noValidate>
                  <label className="br-field">
                    <span>{t('brands.brandName')}</span>
                    <input
                      type="text"
                      value={form.brandName}
                      onChange={(event) =>
                        updateField('brandName', event.target.value)
                      }
                      autoComplete="organization"
                    />
                    {errors.brandName ? <em>{errors.brandName}</em> : null}
                  </label>

                  <label className="br-field">
                    <span>{t('brands.contactEmail')}</span>
                    <input
                      type="email"
                      value={form.contactEmail}
                      onChange={(event) =>
                        updateField('contactEmail', event.target.value)
                      }
                      autoComplete="email"
                    />
                    {errors.contactEmail ? <em>{errors.contactEmail}</em> : null}
                  </label>

                  <label className="br-field">
                    <span>{t('brands.website')}</span>
                    <input
                      type="text"
                      value={form.website}
                      onChange={(event) =>
                        updateField('website', event.target.value)
                      }
                      placeholder={t('brands.websitePh')}
                      autoComplete="url"
                    />
                  </label>

                  <label className="br-field">
                    <span>{t('brands.productName')}</span>
                    <input
                      type="text"
                      value={form.productName}
                      onChange={(event) =>
                        updateField('productName', event.target.value)
                      }
                    />
                    {errors.productName ? <em>{errors.productName}</em> : null}
                  </label>

                  <label className="br-field">
                    <span>{t('brands.productCategory')}</span>
                    <select
                      value={form.category}
                      onChange={(event) =>
                        updateField('category', event.target.value)
                      }
                    >
                      <option value="">{t('brands.selectCategory')}</option>
                      {CATEGORIES.map((category) => (
                        <option key={category} value={category}>
                          {t(`category.${category}`)}
                        </option>
                      ))}
                    </select>
                    {errors.category ? <em>{errors.category}</em> : null}
                  </label>

                  <label className="br-field">
                    <span>{t('brands.usPresence')}</span>
                    <select
                      value={form.currentUSPresence}
                      onChange={(event) =>
                        updateField('currentUSPresence', event.target.value)
                      }
                    >
                      <option value="">{t('brands.selectOption')}</option>
                      {US_PRESENCE.map(([value, key]) => (
                        <option key={value} value={value}>
                          {t(key)}
                        </option>
                      ))}
                    </select>
                  </label>

                  <fieldset className="br-fieldset">
                    <legend>{t('brands.interested')}</legend>
                    <div className="br-checks">
                      {COLLAB_OPTIONS.map((option) => (
                        <label className="br-check" key={option}>
                          <input
                            type="checkbox"
                            checked={form.collaborationInterests.includes(option)}
                            onChange={() => toggleInterest(option)}
                          />
                          <span>{t(`collabType.${option}`)}</span>
                        </label>
                      ))}
                    </div>
                  </fieldset>

                  <label className="br-field">
                    <span>{t('brands.message')}</span>
                    <textarea
                      rows="5"
                      value={form.message}
                      onChange={(event) =>
                        updateField('message', event.target.value)
                      }
                      placeholder={t('brands.messagePh')}
                    />
                  </label>

                  <button
                    className="button button--dark"
                    type="submit"
                    disabled={submitting}
                  >
                    {submitting ? t('common.submitting') : t('brands.submit')}
                  </button>
                </form>
              </>
            )}
          </div>
        </section>
      </main>
    </div>
  )
}
