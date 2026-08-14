import { useEffect, useId, useState } from 'react'
import { saveCollaborationRequest } from '../../services/collaborationStorage.js'
import { useTranslation } from '../../contexts/LocaleContext.jsx'
import '../../styles/collaboration.css'

const EMPTY_TYPES = []

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

function validateForm(form, collaborationTypes, t) {
  const errors = {}
  if (!form.collaborationType) {
    errors.collaborationType = t('errors.collabType')
  } else if (!collaborationTypes.includes(form.collaborationType)) {
    errors.collaborationType = t('errors.collabType')
  }

  const quantity = String(form.estimatedQuantity).trim()
  if (quantity) {
    const parsed = Number(quantity)
    if (!Number.isFinite(parsed) || parsed < 1) {
      errors.estimatedQuantity = t('errors.quantity')
    }
  }

  if (!form.message.trim()) {
    errors.message = t('errors.message')
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
  const { t } = useTranslation()
  const titleId = useId()
  const [form, setForm] = useState(EMPTY_FORM)
  const [errors, setErrors] = useState({})
  const [success, setSuccess] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  const collaborationTypes = Array.isArray(product?.collaborationTypes)
    ? product.collaborationTypes
    : EMPTY_TYPES

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
    setSubmitting(false)
  }, [isOpen, product?.id])

  useEffect(() => {
    if (!isOpen) return
    setErrors((current) => {
      if (Object.keys(current).length === 0) return current
      return validateForm(form, collaborationTypes, t)
    })
  }, [t, isOpen, form, collaborationTypes])

  if (!isOpen || !product || !creator) return null

  const updateField = (field, value) => {
    setForm((current) => ({ ...current, [field]: value }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    if (submitting) return

    const nextErrors = validateForm(form, collaborationTypes, t)
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) return

    setSubmitting(true)
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
    if (!saved) {
      setSubmitting(false)
      return
    }

    setErrors({})
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
          aria-label={t('collab.close')}
        >
          ×
        </button>

        {success ? (
          <div className="collab-success">
            <h2 id={titleId}>{t('collab.successTitle')}</h2>
            <p>{t('collab.success1')}</p>
            <p>{t('collab.success2')}</p>
            <button className="button button--dark" type="button" onClick={onClose}>
              {t('collab.done')}
            </button>
          </div>
        ) : (
          <>
            <h2 id={titleId}>{t('collab.heading')}</h2>
            <p className="collab-lead">{t('collab.lead')}</p>

            <div className="collab-product">
              <span>{product.brand}</span>
              <strong>{product.name}</strong>
            </div>

            <form className="collab-form" onSubmit={handleSubmit} noValidate>
              <label className="collab-field">
                <span>{t('collab.type')}</span>
                <select
                  value={form.collaborationType}
                  onChange={(event) =>
                    updateField('collaborationType', event.target.value)
                  }
                >
                  <option value="">{t('collab.selectType')}</option>
                  {collaborationTypes.map((type) => (
                    <option key={type} value={type}>
                      {t(`collabType.${type}`)}
                    </option>
                  ))}
                </select>
                {errors.collaborationType ? (
                  <em>{errors.collaborationType}</em>
                ) : null}
              </label>

              <label className="collab-field">
                <span>{t('collab.quantity')}</span>
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
                <span>{t('collab.message')}</span>
                <textarea
                  rows="5"
                  value={form.message}
                  onChange={(event) => updateField('message', event.target.value)}
                  placeholder={t('collab.messagePlaceholder')}
                />
                {errors.message ? <em>{errors.message}</em> : null}
              </label>

              <button
                className="button button--dark"
                type="submit"
                disabled={submitting}
              >
                {submitting ? t('common.saving') : t('collab.submit')}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  )
}
