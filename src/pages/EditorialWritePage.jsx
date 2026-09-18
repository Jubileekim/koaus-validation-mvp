import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router'
import { createPost } from '../services/postApi.js'
import { useAuth } from '../contexts/AuthContext.jsx'
import '../styles/editorial-write.css'

const EDITOR_ID = 'editor-koaus-01'

export default function EditorialWritePage() {
  const navigate = useNavigate()
  const { isAuthenticated, isLoading: authLoading } = useAuth()

  const [type, setType] = useState('ARTICLE')
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')

  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState('')

  useEffect(() => {
    if (authLoading) {
      return
    }

    if (!isAuthenticated) {
      navigate('/login', {
        replace: true,
        state: { from: '/editorial/write' },
      })
    }
  }, [authLoading, isAuthenticated, navigate])

  const titleValid = title.trim().length > 0
  const contentValid = content.trim().length > 0
  const isValid = titleValid && contentValid

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (!isAuthenticated || !isValid || submitting) {
      return
    }

    try {
      setSubmitting(true)
      setSubmitError('')

      const createdPost = await createPost({
        title: title.trim(),
        content: content.trim(),
        type,
        editorId: EDITOR_ID,
      })

      navigate(`/editorial/${createdPost.id}`)
    } catch (error) {
      console.error('Failed to create post:', error)

      setSubmitError(
        error.message || 'Failed to publish story.',
      )
    } finally {
      setSubmitting(false)
    }
  }

  if (authLoading || !isAuthenticated) {
    return (
      <main className="ew-page">
        <div className="shell ew-shell">
          Checking session...
        </div>
      </main>
    )
  }

  return (
    <main className="ew-page">
      <div className="shell ew-shell">
        <div className="ew-topbar">
          <Link
            className="ew-back"
            to="/editorial"
          >
            ← Back to Editorial
          </Link>

          <span>KOAUS EDITOR</span>
        </div>

        <header className="ew-header">
          <p className="ew-eyebrow">
            EDITOR WORKSPACE
          </p>

          <h1>
            Write something
            <br />
            worth sharing.
          </h1>

          <p className="ew-intro">
            Publish stories about Korean culture,
            places, products and emerging trends.
          </p>
        </header>

        <form
          className="ew-form"
          onSubmit={handleSubmit}
        >
          <div className="ew-field">
            <div className="ew-field__label">
              <span>01</span>
              <label htmlFor="post-type">
                Format
              </label>
            </div>

            <div className="ew-field__control">
              <select
                id="post-type"
                value={type}
                onChange={(event) =>
                  setType(event.target.value)
                }
              >
                <option value="ARTICLE">
                  Article
                </option>

                <option value="REEL">
                  Reel
                </option>
              </select>
            </div>
          </div>

          <div className="ew-field">
            <div className="ew-field__label">
              <span>02</span>
              <label htmlFor="post-title">
                Title
              </label>
            </div>

            <div className="ew-field__control">
              <input
                id="post-title"
                type="text"
                value={title}
                onChange={(event) =>
                  setTitle(event.target.value)
                }
                placeholder="Give your story a title"
              />
            </div>
          </div>

          <div className="ew-field ew-field--story">
            <div className="ew-field__label">
              <span>03</span>
              <label htmlFor="post-content">
                Story
              </label>
            </div>

            <div className="ew-field__control">
              <textarea
                id="post-content"
                rows="12"
                value={content}
                onChange={(event) =>
                  setContent(event.target.value)
                }
                placeholder="Start writing your story..."
              />
            </div>
          </div>

          {submitError ? (
            <p
              className="ew-submit-error"
              role="alert"
            >
              {submitError}
            </p>
          ) : null}

          <footer className="ew-footer">
            <div className="ew-status">
              <span
                className={
                  titleValid
                    ? 'is-complete'
                    : ''
                }
              >
                Title
              </span>

              <span
                className={
                  contentValid
                    ? 'is-complete'
                    : ''
                }
              >
                Story
              </span>
            </div>

            <button
              className="ew-submit"
              type="submit"
              disabled={!isValid || submitting}
            >
              {submitting
                ? 'Publishing...'
                : 'Publish story ↗'}
            </button>
          </footer>
        </form>
      </div>
    </main>
  )
}
