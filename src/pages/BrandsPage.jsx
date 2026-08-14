import { useState } from 'react'
import { Link } from 'react-router'
import { saveBrandInquiry } from '../services/brandInquiryStorage.js'
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

const US_PRESENCE = ['Not launched', 'Testing the market', 'Already selling']

const COLLAB_OPTIONS = [
  'Group Buy',
  'Affiliate',
  'UGC',
  'Sponsored Content',
  'Product Seeding',
]

const WHY_ITEMS = [
  {
    title: 'Creator Discovery',
    body: 'U.S. creators can discover curated Korean products that are open to collaboration.',
  },
  {
    title: 'Creator-only Terms',
    body: 'Pricing and collaboration terms are shared through Creator Access.',
  },
  {
    title: 'Qualified Collaboration',
    body: 'Creators can submit collaboration interest for products they want to work with.',
  },
]

const STEPS = [
  {
    num: '01',
    title: 'List Your Product',
    body: 'Share basic brand and product information.',
  },
  {
    num: '02',
    title: 'Get Discovered',
    body: 'Approved creators discover your product and creator-only collaboration terms.',
  },
  {
    num: '03',
    title: 'Receive Collaboration Interest',
    body: 'KoaUS reviews creator requests and helps move qualified opportunities forward.',
  },
]

const METRICS = [
  { value: '24', label: 'Demo Creator Profiles' },
  { value: '6', label: 'Categories' },
  { value: '3', label: 'Primary Platforms' },
  { value: '12', label: 'U.S. Markets' },
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

function validateForm(form) {
  const errors = {}
  if (!form.brandName.trim()) {
    errors.brandName = 'Please enter your brand name.'
  }
  if (!form.contactEmail.trim()) {
    errors.contactEmail = 'Please enter your email.'
  } else if (!isValidEmail(form.contactEmail.trim())) {
    errors.contactEmail = 'Please enter a valid email address.'
  }
  if (!form.productName.trim()) {
    errors.productName = 'Please enter your product name.'
  }
  if (!form.category) {
    errors.category = 'Please select a category.'
  }
  return errors
}

export default function BrandsPage() {
  const [form, setForm] = useState(EMPTY_FORM)
  const [errors, setErrors] = useState({})
  const [success, setSuccess] = useState(false)
  const [submitting, setSubmitting] = useState(false)

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

    const nextErrors = validateForm(form)
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
  }

  return (
    <div className="mp-page">
      <div className="mp-topbar">
        <div className="shell mp-topbar__inner">
          <Link className="wordmark" to="/" aria-label="Koaus home">
            koaus <span>/ brands</span>
          </Link>
          <Link className="button button--ghost" to="/marketplace">
            Browse Marketplace
          </Link>
        </div>
      </div>

      <main>
        <section className="shell br-hero">
          <p className="br-eyebrow">FOR KOREAN BRANDS</p>
          <h1>Put your products in front of U.S. creators.</h1>
          <p className="br-lead">
            Introduce Korean products to U.S. creators looking for group buys,
            affiliate partnerships, and UGC collaborations.
          </p>
          <div className="br-hero__actions">
            <a className="button button--dark" href="#list-your-product">
              List Your Product
            </a>
            <Link className="button button--ghost" to="/marketplace">
              Browse Marketplace
            </Link>
          </div>
        </section>

        <section className="shell br-section">
          <header className="br-section__head">
            <p className="br-eyebrow">WHY KOAUS</p>
            <h2>A marketplace built for creator collaboration.</h2>
          </header>
          <div className="br-grid br-grid--3">
            {WHY_ITEMS.map((item) => (
              <article className="br-card" key={item.title}>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="shell br-section">
          <header className="br-section__head">
            <p className="br-eyebrow">CREATOR NETWORK</p>
            <h2>A growing network of U.S. creators.</h2>
            <p>
              Creator profiles across beauty, lifestyle, fashion, wellness and
              other consumer categories.
            </p>
          </header>

          <div className="br-grid br-grid--3">
            <article className="br-card">
              <h3>Primary Platforms</h3>
              <div className="br-chips">
                <span>TikTok</span>
                <span>Instagram</span>
                <span>YouTube</span>
              </div>
            </article>
            <article className="br-card">
              <h3>Creator Categories</h3>
              <div className="br-chips">
                <span>Beauty</span>
                <span>Lifestyle</span>
                <span>Fashion</span>
                <span>Wellness</span>
                <span>Food</span>
                <span>Other</span>
              </div>
            </article>
            <article className="br-card">
              <h3>Creator Tiers</h3>
              <div className="br-chips">
                <span>Nano</span>
                <span>Micro</span>
                <span>Mid-tier</span>
              </div>
            </article>
          </div>

          <div className="br-grid br-grid--4">
            {METRICS.map((metric) => (
              <article className="br-card br-metric" key={metric.label}>
                <strong>{metric.value}</strong>
                <span>{metric.label}</span>
              </article>
            ))}
          </div>
          <p className="br-disclaimer">Demo data for MVP presentation.</p>
        </section>

        <section className="shell br-section">
          <header className="br-section__head">
            <p className="br-eyebrow">HOW IT WORKS</p>
            <h2>From product intro to collaboration interest.</h2>
          </header>
          <div className="br-grid br-grid--3">
            {STEPS.map((step) => (
              <article className="br-card" key={step.num}>
                <p className="br-step">{step.num}</p>
                <h3>{step.title}</h3>
                <p>{step.body}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="shell br-section br-inquiry" id="list-your-product">
          <div className="br-form-card">
            {success ? (
              <div className="br-success">
                <p className="br-eyebrow">BRAND INQUIRY</p>
                <h2>✓ Product Inquiry Submitted</h2>
                <p>Thanks for introducing your brand.</p>
                <p>Your inquiry has been saved for KoaUS review.</p>
                <div className="br-success__actions">
                  <Link className="button button--dark" to="/marketplace">
                    Browse Creator Marketplace
                  </Link>
                  <button
                    className="button button--ghost"
                    type="button"
                    onClick={resetForm}
                  >
                    Submit another product
                  </button>
                </div>
              </div>
            ) : (
              <>
                <p className="br-eyebrow">LIST YOUR PRODUCT</p>
                <h2>List Your Product</h2>
                <p className="br-form-lead">
                  Tell us about your brand and the product you'd like to
                  introduce to U.S. creators.
                </p>

                <form className="br-form" onSubmit={handleSubmit} noValidate>
                  <label className="br-field">
                    <span>Brand Name *</span>
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
                    <span>Contact Email *</span>
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
                    <span>Website / Instagram</span>
                    <input
                      type="text"
                      value={form.website}
                      onChange={(event) =>
                        updateField('website', event.target.value)
                      }
                      placeholder="https:// or @handle"
                      autoComplete="url"
                    />
                  </label>

                  <label className="br-field">
                    <span>Product Name *</span>
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
                    <span>Product Category *</span>
                    <select
                      value={form.category}
                      onChange={(event) =>
                        updateField('category', event.target.value)
                      }
                    >
                      <option value="">Select a category</option>
                      {CATEGORIES.map((category) => (
                        <option key={category} value={category}>
                          {category}
                        </option>
                      ))}
                    </select>
                    {errors.category ? <em>{errors.category}</em> : null}
                  </label>

                  <label className="br-field">
                    <span>Current U.S. Presence</span>
                    <select
                      value={form.currentUSPresence}
                      onChange={(event) =>
                        updateField('currentUSPresence', event.target.value)
                      }
                    >
                      <option value="">Select an option</option>
                      {US_PRESENCE.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </label>

                  <fieldset className="br-fieldset">
                    <legend>Interested In</legend>
                    <div className="br-checks">
                      {COLLAB_OPTIONS.map((option) => (
                        <label className="br-check" key={option}>
                          <input
                            type="checkbox"
                            checked={form.collaborationInterests.includes(option)}
                            onChange={() => toggleInterest(option)}
                          />
                          <span>{option}</span>
                        </label>
                      ))}
                    </div>
                  </fieldset>

                  <label className="br-field">
                    <span>Message</span>
                    <textarea
                      rows="5"
                      value={form.message}
                      onChange={(event) =>
                        updateField('message', event.target.value)
                      }
                      placeholder="Tell us about your product and what kind of creator collaboration you're looking for..."
                    />
                  </label>

                  <button
                    className="button button--dark"
                    type="submit"
                    disabled={submitting}
                  >
                    {submitting ? 'Submitting...' : 'Submit Product Inquiry'}
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
