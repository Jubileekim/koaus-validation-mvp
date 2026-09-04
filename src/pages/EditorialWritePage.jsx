import { useState } from 'react'
import { Link, useNavigate } from 'react-router'
import { createPost } from '../services/postApi.js'
import '../styles/editorial-write.css'

const EDITOR_ID = 'editor-koaus-01'

export default function EditorialWritePage() {
  const navigate = useNavigate()

  const [type, setType] = useState('ARTICLE')
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [password, setPassword] = useState('')

  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState('')

  const titleValid = title.trim().length > 0
  const contentValid = content.trim().length > 0
  const passwordValid = password.length >= 6

  const isValid =
    titleValid &&
    contentValid &&
    passwordValid

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (!isValid || submitting) {
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
        password,
      })

      navigate('/editorial')
    } catch (error) {
      console.error('Failed to create post:', error)

      setSubmitError(
        error.message || 'Failed to publish story.',
      )
    } finally {
      setSubmitting(false)
    }
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

          <div className="ew-field">
            <div className="ew-field__label">
              <span>04</span>
              <label htmlFor="post-password">
                Password
              </label>
            </div>

            <div className="ew-field__control">
              <input
                id="post-password"
                type="password"
                value={password}
                autoComplete="new-password"
                onChange={(event) =>
                  setPassword(event.target.value)
                }
                placeholder="At least 6 characters"
              />

              <p className="ew-help">
                This password is required later
                to edit or delete this story.
              </p>

              {password.length > 0 &&
              !passwordValid ? (
                <p
                  className="ew-error"
                  role="alert"
                >
                  Password must be at least
                  6 characters.
                </p>
              ) : null}
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

              <span
                className={
                  passwordValid
                    ? 'is-complete'
                    : ''
                }
              >
                Password
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