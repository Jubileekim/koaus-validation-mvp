import { useEffect, useState } from 'react'
import {
  Link,
  useNavigate,
  useParams,
} from 'react-router'
import {
  getPostById,
  updatePost,
} from '../services/postApi.js'
import { useAuth } from '../contexts/AuthContext.jsx'
import { canEditPost } from '../utils/postAuth.js'
import '../styles/editorial-write.css'

export default function EditorialEditPage() {
  const { postId } = useParams()
  const navigate = useNavigate()
  const { user, isAuthenticated, isLoading: authLoading } = useAuth()

  const [post, setPost] = useState(null)
  const [type, setType] = useState('ARTICLE')
  const [title, setTitle] = useState('')
  const [titleKo, setTitleKo] = useState('')
  const [content, setContent] = useState('')
  const [contentKo, setContentKo] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [videoUrl, setVideoUrl] = useState('')

  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  const allowed = canEditPost(user, post)

  useEffect(() => {
    if (authLoading) {
      return
    }

    if (!isAuthenticated) {
      navigate('/login', {
        replace: true,
        state: { from: `/editorial/${postId}/edit` },
      })
      return
    }

    async function loadPost() {
      try {
        const data = await getPostById(postId)

        if (!data) {
          setError('Story not found.')
          setPost(null)
          return
        }

        setPost(data)
        setType(data.type || 'ARTICLE')
        setTitle(data.title || '')
        setTitleKo(data.titleKo || '')
        setContent(data.content || '')
        setContentKo(data.contentKo || '')
        setImageUrl(data.imageUrl || '')
        setVideoUrl(data.videoUrl || '')
      } catch (loadError) {
        console.error(loadError)
        setError('Failed to load story.')
      } finally {
        setLoading(false)
      }
    }

    loadPost()
  }, [postId, authLoading, isAuthenticated, navigate])

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (!allowed) {
      setError('You do not have permission to edit this story.')
      return
    }

    try {
      setSaving(true)
      setError('')

      await updatePost(postId, {
        type,
        title,
        titleKo,
        content,
        contentKo,
        imageUrl,
        videoUrl,
      })

      navigate(`/editorial/${postId}`)
    } catch (saveError) {
      console.error(saveError)
      setError(
        saveError.message ||
          'Failed to update story.',
      )
    } finally {
      setSaving(false)
    }
  }

  if (authLoading || loading) {
    return (
      <main className="ew-page">
        <div className="shell ew-shell">
          Loading story...
        </div>
      </main>
    )
  }

  if (!isAuthenticated) {
    return (
      <main className="ew-page">
        <div className="shell ew-shell">
          Redirecting to login...
        </div>
      </main>
    )
  }

  if (!post || !allowed) {
    return (
      <main className="ew-page">
        <div className="shell ew-shell">
          <div className="ew-topbar">
            <Link
              className="ew-back"
              to={`/editorial/${postId}`}
            >
              ← Back to story
            </Link>
          </div>

          <header className="ew-header">
            <p className="ew-eyebrow">EDIT STORY</p>
            <h1>You cannot edit this story.</h1>
            <p className="ew-intro">
              Only the author or an admin can edit this story.
              Legacy stories without an owner can only be edited by admins.
            </p>
          </header>
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
            to={`/editorial/${postId}`}
          >
            ← Back to story
          </Link>

          <span>KOAUS EDITOR</span>
        </div>

        <header className="ew-header">
          <p className="ew-eyebrow">
            EDIT STORY
          </p>

          <h1>
            Refine the
            <br />
            story.
          </h1>

          <p className="ew-intro">
            Update your article and publish the latest version.
          </p>
        </header>

        <form
          className="ew-form"
          onSubmit={handleSubmit}
        >
          <div className="ew-field">
            <div className="ew-field__label">
              <span>01</span>
              <label>Format</label>
            </div>

            <div className="ew-field__control">
              <select
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
              <label>English title</label>
            </div>

            <div className="ew-field__control">
              <input
                value={title}
                onChange={(event) =>
                  setTitle(event.target.value)
                }
              />
            </div>
          </div>

          <div className="ew-field">
            <div className="ew-field__label">
              <span>03</span>
              <label>Korean title</label>
            </div>

            <div className="ew-field__control">
              <input
                value={titleKo}
                onChange={(event) =>
                  setTitleKo(event.target.value)
                }
              />
            </div>
          </div>

          <div className="ew-field ew-field--story">
            <div className="ew-field__label">
              <span>04</span>
              <label>English story</label>
            </div>

            <div className="ew-field__control">
              <textarea
                rows="18"
                value={content}
                onChange={(event) =>
                  setContent(event.target.value)
                }
              />
            </div>
          </div>

          <div className="ew-field ew-field--story">
            <div className="ew-field__label">
              <span>05</span>
              <label>Korean story</label>
            </div>

            <div className="ew-field__control">
              <textarea
                rows="18"
                value={contentKo}
                onChange={(event) =>
                  setContentKo(event.target.value)
                }
              />
            </div>
          </div>

          <div className="ew-field">
            <div className="ew-field__label">
              <span>06</span>
              <label>Image URL</label>
            </div>

            <div className="ew-field__control">
              <input
                value={imageUrl}
                onChange={(event) =>
                  setImageUrl(event.target.value)
                }
              />
            </div>
          </div>

          <div className="ew-field">
            <div className="ew-field__label">
              <span>07</span>
              <label>Video URL</label>
            </div>

            <div className="ew-field__control">
              <input
                value={videoUrl}
                onChange={(event) =>
                  setVideoUrl(event.target.value)
                }
              />
            </div>
          </div>

          {error ? (
            <p className="ew-submit-error">
              {error}
            </p>
          ) : null}

          <footer className="ew-footer">
            <div />

            <button
              className="ew-submit"
              type="submit"
              disabled={saving}
            >
              {saving
                ? 'Saving...'
                : 'Update story ↗'}
            </button>
          </footer>
        </form>
      </div>
    </main>
  )
}
