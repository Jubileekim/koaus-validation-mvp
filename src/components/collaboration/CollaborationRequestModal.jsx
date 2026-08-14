import { useEffect, useId, useState } from 'react'
import { saveCollaborationRequest } from '../../services/collaborationStorage.js'
import '../../styles/collaboration.css'

const EMPTY_FORM = {
  collaborationType: '',
  estimatedQuantity: '',
  message: '',
}

function createRequestId() {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID()
  }
  return `req-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`
}

function validateForm(form, collaborationTypes) {
  const errors = {}
  if (!form.collaborationType) {
    errors.collaborationType = 'Please select a collaboration type.'
  } else if (!collaborationTypes.includes(form.collaborationType)) {
    errors.collaborationType = 'Please select a collaboration type.'
  }

  const quantity = String(form.estimatedQuantity).trim()
  if (quantity) {
    const parsed = Number(quantity)
    if (!Number.isFinite(parsed) || parsed < 1) {
      errors.estimatedQuantity = 'Quantity must be at least 1.'
    }
  }

  if (!form.message.trim()) {
    errors.message = 'Please enter a message.'
  }

  return errors
}

export default function CollaborationRequestModal({
  product,
  creator,
  isOpen,
  onClose,
  onSuccess,
}) {
  const titleId = useId()
  const [form, setForm] = useState(EMPTY_FORM)
  const [errors, setErrors] = useState({})
  const [success, setSuccess] = useState(false)

  const collaborationTypes = Array.isArray(product?.collaborationTypes)
    ? product.collaborationTypes
    : []

  useEffect(() => {
    if (!isOpen) return undefined

    const onKeyDown = (event) => {
      if (event.key === 'Escape') onClose()
    }

    document.addEventListener('keydown', onKeyDown)
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = previousOverflow
    }
  }, [isOpen, onClose])

  useEffect(() => {
    if (!isOpen) return
    setForm(EMPTY_FORM)
    setErrors({})
    setSuccess(false)
  }, [isOpen, product?.id])

  if (!isOpen || !product || !creator) return null

  const updateField = (field, value) => {
    setForm((current) => ({ ...current, [field]: value }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const nextErrors = validateForm(form, collaborationTypes)
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) return

    const quantity = String(form.estimatedQuantity).trim()
    const request = {
      id: createRequestId(),
      productId: product.id,
      productName: product.name,
      brand: product.brand,
      creatorEmail: creator.email,
      creatorName: creator.creatorName,
      collaborationType: form.collaborationType,
      estimatedQuantity: quantity ? Number(quantity) : null,
      message: form.message.trim(),
      status: 'submitted',
      createdAt: new Date().toISOString(),
    }

    const saved = saveCollaborationRequest(request)
    if (!saved) return

    setSuccess(true)
    onSuccess?.(request)
  }

  const handleBackdropClick = (event) => {
    if (event.target === event.currentTarget) onClose()
  }

  return (
    <div className="collab-backdrop" onClick={handleBackdropClick}>
      <div
        className="collab-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
      >
        <button
          className="collab-close"
          type="button"
          onClick={onClose}
          aria-label="Close collaboration request"
        >
          ×
        </button>

        {success ? (
          <div className="collab-success">
            <h2 id={titleId}>✓ Request received</h2>
            <p>Your collaboration request has been saved.</p>
            <p>
              KoaUS will review the request and follow up with pricing and
              collaboration terms.
            </p>
            <button className="button button--dark" type="button" onClick={onClose}>
              Done
            </button>
          </div>
        ) : (
          <>
            <h2 id={titleId}>Request Collaboration</h2>
            <p className="collab-lead">
              Send your collaboration interest to this Korean brand.
            </p>

            <div className="collab-product">
              <span>{product.brand}</span>
              <strong>{product.name}</strong>
            </div>

            <form className="collab-form" onSubmit={handleSubmit} noValidate>
              <label className="collab-field">
                <span>Collaboration Type *</span>
                <select
                  value={form.collaborationType}
                  onChange={(event) =>
                    updateField('collaborationType', event.target.value)
                  }
                >
                  <option value="">Select collaboration type</option>
                  {collaborationTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
                {errors.collaborationType ? (
                  <em>{errors.collaborationType}</em>
                ) : null}
              </label>

              <label className="collab-field">
                <span>Estimated Quantity</span>
                <input
                  type="number"
                  min="1"
                  step="1"
                  inputMode="numeric"
                  value={form.estimatedQuantity}
                  onChange={(event) =>
                    updateField('estimatedQuantity', event.target.value)
                  }
                  placeholder="50"
                />
                {errors.estimatedQuantity ? (
                  <em>{errors.estimatedQuantity}</em>
                ) : null}
              </label>

              <label className="collab-field">
                <span>Message *</span>
                <textarea
                  rows="5"
                  value={form.message}
                  onChange={(event) => updateField('message', event.target.value)}
                  placeholder="Tell the brand how you'd like to collaborate..."
                />
                {errors.message ? <em>{errors.message}</em> : null}
              </label>

              <button className="button button--dark" type="submit">
                Submit Request
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  )
}
