import { useEffect, useState } from 'react'
import { Link } from 'react-router'
import { getPosts } from '../services/postApi.js'

export default function EditorialPage() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [loadError, setLoadError] = useState(false)

  const loadPosts = async () => {
    try {
      setLoading(true)
      setLoadError(false)

      const data = await getPosts()

      setPosts(Array.isArray(data) ? data : [])
    } catch (error) {
      console.error('Failed to load posts:', error)
      setLoadError(true)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadPosts()
  }, [])

  return (
    <main className="shell">
      <section>
        <p>KOAUS EDITORIAL</p>

        <h1>Stories from Korea</h1>

        <p>
          Culture, lifestyle and emerging trends
          curated for a global audience.
        </p>
      </section>

      {loading ? (
        <p>Loading stories...</p>
      ) : null}

      {loadError ? (
        <div role="alert">
          <p>Unable to load stories from the server.</p>

          <button
            className="button button--dark"
            type="button"
            onClick={loadPosts}
          >
            Try again
          </button>
        </div>
      ) : null}

      {!loading && !loadError && posts.length === 0 ? (
        <p>No stories published yet.</p>
      ) : null}

      {!loading && !loadError && posts.length > 0 ? (
        <div>
          {posts.map((post) => (
            <article key={post.id}>
              <p>{post.type}</p>

              <h2>{post.title}</h2>

              <p>
                {post.content.length > 180
                  ? `${post.content.slice(0, 180)}...`
                  : post.content}
              </p>

              {post.editor ? (
                <p>By {post.editor.name}</p>
              ) : null}

              <Link to={`/editorial/${post.id}`}>
                Read story →
              </Link>
            </article>
          ))}
        </div>
      ) : null}
    </main>
  )
}