import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router'
import { getPostById } from '../services/postApi.js'

export default function EditorialDetailPage() {
  const { postId } = useParams()

  const [post, setPost] = useState(null)
  const [loading, setLoading] = useState(true)
  const [loadError, setLoadError] = useState(false)

  const loadPost = async () => {
    try {
      setLoading(true)
      setLoadError(false)

      const data = await getPostById(postId)

      setPost(data)
    } catch (error) {
      console.error('Failed to load post:', error)
      setLoadError(true)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadPost()
  }, [postId])

  if (loading) {
    return (
      <main className="shell">
        <p>Loading story...</p>
      </main>
    )
  }

  if (loadError) {
    return (
      <main className="shell">
        <h1>Unable to load story</h1>

        <p>
          The story could not be loaded from the server.
        </p>

        <button
          className="button button--dark"
          type="button"
          onClick={loadPost}
        >
          Try again
        </button>
      </main>
    )
  }

  if (!post) {
    return (
      <main className="shell">
        <h1>Story not found</h1>

        <p>
          This story does not exist or may have been removed.
        </p>

        <Link
          className="button button--dark"
          to="/editorial"
        >
          Back to Editorial
        </Link>
      </main>
    )
  }

  return (
    <main className="shell">
      <Link to="/editorial">
        ← Back to Editorial
      </Link>

      <article>
        <p>{post.type}</p>

        <h1>{post.title}</h1>

        {post.editor ? (
          <p>By {post.editor.name}</p>
        ) : null}

        {post.imageUrl ? (
          <img
            src={post.imageUrl}
            alt=""
          />
        ) : null}

        {post.videoUrl ? (
          <video controls>
            <source src={post.videoUrl} />
          </video>
        ) : null}

        <div>
          <p>{post.content}</p>
        </div>
      </article>
    </main>
  )
}