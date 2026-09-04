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
import '../styles/editorial-write.css'

export default function EditorialEditPage() {
  const { postId } = useParams()
  const navigate = useNavigate()

  const [type, setType] = useState('ARTICLE')
  const [title, setTitle] = useState('')
  const [titleKo, setTitleKo] = useState('')
  const [content, setContent] = useState('')
  const [contentKo, setContentKo] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [videoUrl, setVideoUrl] = useState('')
  const [password, setPassword] = useState('')

  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    async function loadPost() {
      try {
        const post = await getPostById(postId)

        if (!post) {
          setError('Story not found.')
          return
        }

        setType(post.type || 'ARTICLE')
        setTitle(post.title || '')
        setTitleKo(post.titleKo || '')
        setContent(post.content || '')
        setContentKo(post.contentKo || '')
        setImageUrl(post.imageUrl || '')
        setVideoUrl(post.videoUrl || '')
      } catch (loadError) {
        console.error(loadError)
        setError('Failed to load story.')
      } finally {
        setLoading(false)
      }
    }

    loadPost()
  }, [postId])

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (!password) {
      setError('Password is required.')
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
        password,
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

  if (loading) {
    return (
      <main className="ew-page">
        <div className="shell ew-shell">
          Loading story...
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
            Update the article and enter the
            password used when it was published.
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

          <div className="ew-field">
            <div className="ew-field__label">
              <span>08</span>
              <label>Password</label>
            </div>

            <div className="ew-field__control">
              <input
                type="password"
                value={password}
                onChange={(event) =>
                  setPassword(event.target.value)
                }
                placeholder="Story password"
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