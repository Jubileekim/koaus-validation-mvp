import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router'
import { useAuth } from '../../contexts/AuthContext.jsx'
import { ApiError } from '../../services/api.js'
import {
  createComment,
  deleteComment,
  getComments,
} from '../../services/commentApi.js'
import { getSafeReturnTo } from '../../utils/authRedirect.js'
import '../../styles/editorial-comments.css'

const MAX_COMMENT_LENGTH = 1000

function formatCommentDate(value) {
  const date = new Date(value)

  if (Number.isNaN(date.getTime())) {
    return ''
  }

  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(date)
}

function canDeleteComment(comment, user) {
  if (!user || !comment?.user) {
    return false
  }

  return (
    comment.user.id === user.id || user.role === 'ADMIN'
  )
}

export default function CommentSection({ postId }) {
  const navigate = useNavigate()
  const location = useLocation()
  const {
    user,
    isAuthenticated,
    isLoading: authLoading,
    refreshUser,
  } = useAuth()

  const [comments, setComments] = useState([])
  const [loading, setLoading] = useState(true)
  const [loadError, setLoadError] = useState('')
  const [content, setContent] = useState('')
  const [formError, setFormError] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [deletingId, setDeletingId] = useState(null)

  const returnFrom = getSafeReturnTo(
    `${location.pathname}${location.search}`,
  )

  useEffect(() => {
    let cancelled = false

    async function loadComments() {
      if (!postId) {
        return
      }

      try {
        if (!cancelled) {
          setLoading(true)
          setLoadError('')
        }

        const data = await getComments(postId)

        if (!cancelled) {
          setComments(Array.isArray(data) ? data : [])
        }
      } catch (error) {
        console.error('Failed to load comments:', error)

        if (!cancelled) {
          setLoadError('Unable to load comments.')
          setComments([])
        }
      } finally {
        if (!cancelled) {
          setLoading(false)
        }
      }
    }

    loadComments()

    return () => {
      cancelled = true
    }
  }, [postId])

  async function reloadComments() {
    if (!postId) {
      return
    }

    try {
      setLoading(true)
      setLoadError('')
      const data = await getComments(postId)
      setComments(Array.isArray(data) ? data : [])
    } catch (error) {
      console.error('Failed to load comments:', error)
      setLoadError('Unable to load comments.')
      setComments([])
    } finally {
      setLoading(false)
    }
  }

  function goToLogin() {
    navigate('/login', {
      state: { from: returnFrom },
    })
  }

  async function handleAuthRequired(message) {
    setFormError(
      message || 'Please log in to continue.',
    )

    try {
      await refreshUser()
    } catch (error) {
      console.error('Failed to refresh auth state:', error)
    }
  }

  async function handleSubmit(event) {
    event.preventDefault()

    if (submitting) {
      return
    }

    const trimmed = content.trim()

    if (!trimmed) {
      setFormError('Comment cannot be empty.')
      return
    }

    if (trimmed.length > MAX_COMMENT_LENGTH) {
      setFormError(
        `Comment must be ${MAX_COMMENT_LENGTH} characters or fewer.`,
      )
      return
    }

    try {
      setSubmitting(true)
      setFormError('')

      const created = await createComment(postId, trimmed)
      setComments((current) => [...current, created])
      setContent('')
    } catch (error) {
      if (error instanceof ApiError && error.status === 401) {
        await handleAuthRequired(
          'Your session has expired. Please log in to comment.',
        )
        return
      }

      setFormError(
        error.message || 'Failed to post comment.',
      )
    } finally {
      setSubmitting(false)
    }
  }

  async function handleDelete(comment) {
    if (deletingId || !comment?.id) {
      return
    }

    const confirmed = window.confirm('Delete this comment?')

    if (!confirmed) {
      return
    }

    try {
      setDeletingId(comment.id)
      setFormError('')
      await deleteComment(comment.id)
      setComments((current) =>
        current.filter((item) => item.id !== comment.id),
      )
    } catch (error) {
      if (error instanceof ApiError) {
        if (error.status === 401) {
          await handleAuthRequired(
            'Your session has expired. Please log in again.',
          )
          return
        }

        if (error.status === 403) {
          setFormError(
            "You don't have permission to delete this comment.",
          )
          return
        }

        if (error.status === 404) {
          setComments((current) =>
            current.filter((item) => item.id !== comment.id),
          )
          return
        }
      }

      setFormError(
        error.message || 'Failed to delete comment.',
      )
    } finally {
      setDeletingId(null)
    }
  }

  return (
    <section
      className="editorial-comments"
      aria-labelledby="editorial-comments-heading"
    >
      <div className="editorial-comments__header">
        <p className="editorial-comments__eyebrow">
          Conversation
        </p>
        <h2 id="editorial-comments-heading">Comments</h2>
        <p className="editorial-comments__lead">
          Share your thoughts on this story.
        </p>
      </div>

      {loading ? (
        <p className="editorial-comments__status">
          Loading comments...
        </p>
      ) : null}

      {!loading && loadError ? (
        <div>
          <p className="editorial-comments__error" role="alert">
            {loadError}
          </p>
          <div className="editorial-comments__actions">
            <button
              className="button button--dark"
              type="button"
              onClick={reloadComments}
            >
              Retry
            </button>
          </div>
        </div>
      ) : null}

      {!loading && !loadError && comments.length === 0 ? (
        <p className="editorial-comments__empty">
          No comments yet. Be the first to join the conversation.
        </p>
      ) : null}

      {!loading && !loadError && comments.length > 0 ? (
        <ul className="editorial-comments__list">
          {comments.map((comment) => (
            <li
              key={comment.id}
              className="editorial-comments__item"
            >
              <div className="editorial-comments__item-top">
                <p className="editorial-comments__author">
                  {comment.user?.displayName || 'KOAUS reader'}
                </p>
                <p className="editorial-comments__date">
                  {formatCommentDate(comment.createdAt)}
                </p>
              </div>

              <p className="editorial-comments__content">
                {comment.content}
              </p>

              {canDeleteComment(comment, user) ? (
                <button
                  className="editorial-comments__delete"
                  type="button"
                  onClick={() => handleDelete(comment)}
                  disabled={deletingId === comment.id}
                >
                  {deletingId === comment.id
                    ? 'Deleting…'
                    : 'Delete'}
                </button>
              ) : null}
            </li>
          ))}
        </ul>
      ) : null}

      {formError ? (
        <p className="editorial-comments__form-error" role="alert">
          {formError}
          {formError.toLowerCase().includes('log in') ? (
            <>
              {' '}
              <button
                className="editorial-comments__delete"
                type="button"
                onClick={goToLogin}
              >
                Log in
              </button>
            </>
          ) : null}
        </p>
      ) : null}

      {!authLoading && !isAuthenticated ? (
        <div className="editorial-comments__login-prompt">
          <p>Log in to join the conversation.</p>
          <button
            className="button button--dark"
            type="button"
            onClick={goToLogin}
          >
            Log in
          </button>
          <p>
            Don&apos;t have an account?{' '}
            <Link
              to="/signup"
              state={{ from: returnFrom }}
            >
              Sign up
            </Link>
          </p>
        </div>
      ) : null}

      {!authLoading && isAuthenticated ? (
        <form
          className="editorial-comments__form"
          onSubmit={handleSubmit}
        >
          <label htmlFor="editorial-comment-input">
            <span>Join the conversation</span>
            <textarea
              id="editorial-comment-input"
              name="comment"
              value={content}
              maxLength={MAX_COMMENT_LENGTH}
              onChange={(event) => setContent(event.target.value)}
              disabled={submitting}
              placeholder="Share your thoughts..."
            />
          </label>

          <div className="editorial-comments__form-meta">
            <span className="editorial-comments__count">
              {content.length}/{MAX_COMMENT_LENGTH}
            </span>
            <button
              className="button button--dark"
              type="submit"
              disabled={submitting || !content.trim()}
            >
              {submitting ? 'Posting…' : 'Post comment'}
            </button>
          </div>
        </form>
      ) : null}
    </section>
  )
}
