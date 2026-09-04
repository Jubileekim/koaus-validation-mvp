import { useEffect, useState } from 'react'
import { Link } from 'react-router'
import {
  deletePost,
  getPosts,
} from '../services/postApi.js'
import { useTranslation } from '../contexts/LocaleContext.jsx'
import '../styles/editorial.css'

function formatDate(dateString, locale) {
  if (!dateString) return ''

  return new Intl.DateTimeFormat(
    locale === 'ko' ? 'ko-KR' : 'en-US',
    {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    },
  ).format(new Date(dateString))
}

export default function EditorialPage() {
  const { locale } = useTranslation()

  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [loadError, setLoadError] = useState(false)

  const [deleteTarget, setDeleteTarget] = useState(null)
  const [deletePassword, setDeletePassword] = useState('')
  const [deleteError, setDeleteError] = useState('')
  const [deleting, setDeleting] = useState(false)

  const copy =
    locale === 'ko'
      ? {
          eyebrow: 'KOAUS 에디토리얼',
          hero1: '한국을,',
          hero2: '조금 다르게.',
          description:
            '한국의 일상과 공간, 제품 그리고 지금 만들어지고 있는 새로운 문화를 기록합니다.',
          write: '글쓰기',
          workspace: '에디터 워크스페이스',
          workspaceSub: 'KOAUS에 새로운 이야기를 발행하세요',
          latest: '최신 이야기',
          story: '개의 이야기',
          loading: '이야기를 불러오는 중...',
          loadError: '이야기를 불러올 수 없습니다.',
          retry: '다시 시도',
          empty: '아직 발행된 이야기가 없습니다.',
          firstStory: '첫 글 작성하기',
          featured: '추천 이야기',
          read: '읽기 →',
          readStory: '이야기 읽기 ↗',
          by: '글',
          delete: '삭제',
          deleteTitle: '글을 삭제할까요?',
          deleteDescription:
            '이 글을 발행할 때 설정한 비밀번호를 입력하세요.',
          password: '비밀번호',
          passwordPlaceholder: '글 비밀번호 입력',
          passwordRequired: '비밀번호를 입력해 주세요.',
          cancel: '취소',
          deleteStory: '글 삭제',
          deleting: '삭제 중...',
          close: '닫기',
        }
      : {
          eyebrow: 'KOAUS EDITORIAL',
          hero1: 'Korea,',
          hero2: 'beyond the obvious.',
          description:
            'Stories, places, products and cultural shifts shaping everyday life in Korea.',
          write: 'Write a story',
          workspace: 'Editor workspace',
          workspaceSub: 'Publish directly to KOAUS',
          latest: 'Latest Stories',
          story: 'stories',
          loading: 'Loading stories...',
          loadError: 'Unable to load stories from the server.',
          retry: 'Try again',
          empty: 'No stories have been published yet.',
          firstStory: 'Publish the first story',
          featured: 'Featured',
          read: 'Read →',
          readStory: 'Read story ↗',
          by: 'By',
          delete: 'Delete',
          deleteTitle: 'Delete story?',
          deleteDescription:
            'Enter the password you used when publishing this story.',
          password: 'Password',
          passwordPlaceholder: 'Enter story password',
          passwordRequired: 'Password is required.',
          cancel: 'Cancel',
          deleteStory: 'Delete story',
          deleting: 'Deleting...',
          close: 'Close',
        }

  const getTitle = (post) => {
    if (locale === 'ko') {
      return post.titleKo || post.title
    }

    return post.title
  }

  const getContent = (post) => {
    if (locale === 'ko') {
      return post.contentKo || post.content
    }

    return post.content
  }

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

  const openDeleteModal = (post) => {
    setDeleteTarget(post)
    setDeletePassword('')
    setDeleteError('')
  }

  const closeDeleteModal = () => {
    if (deleting) return

    setDeleteTarget(null)
    setDeletePassword('')
    setDeleteError('')
  }

  const handleDelete = async (event) => {
    event.preventDefault()

    if (!deleteTarget) return

    if (!deletePassword) {
      setDeleteError(copy.passwordRequired)
      return
    }

    try {
      setDeleting(true)
      setDeleteError('')

      await deletePost(
        deleteTarget.id,
        deletePassword,
      )

      setPosts((currentPosts) =>
        currentPosts.filter(
          (post) =>
            post.id !== deleteTarget.id,
        ),
      )

      setDeleteTarget(null)
      setDeletePassword('')
    } catch (error) {
      console.error(
        'Failed to delete post:',
        error,
      )

      setDeleteError(
        error.message ||
          'Failed to delete story.',
      )
    } finally {
      setDeleting(false)
    }
  }

  const featuredPost = posts[0]
  const otherPosts = posts.slice(1)

  return (
    <main className="editorial-page">
      <section className="editorial-hero">
        <div className="shell editorial-hero__inner">
          <div>
            <p className="editorial-eyebrow">
              {copy.eyebrow}
            </p>

            <h1>
              {copy.hero1}
              <br />
              {copy.hero2}
            </h1>

            <p className="editorial-hero__description">
              {copy.description}
            </p>
          </div>

          <div className="editorial-hero__actions">
            <Link
              className="editorial-write-button"
              to="/editorial/write"
            >
              <span>{copy.write}</span>
              <strong>＋</strong>
            </Link>

            <p>
              {copy.workspace}
              <br />
              {copy.workspaceSub}
            </p>
          </div>
        </div>
      </section>

      <section className="shell editorial-content">
        <div className="editorial-section-heading">
          <div>
            <span>01</span>
            <h2>{copy.latest}</h2>
          </div>

          <p>
            {posts.length} {copy.story}
          </p>
        </div>

        {loading ? (
          <div className="editorial-status">
            {copy.loading}
          </div>
        ) : null}

        {loadError ? (
          <div
            className="editorial-status"
            role="alert"
          >
            <p>{copy.loadError}</p>

            <button
              className="button button--dark"
              type="button"
              onClick={loadPosts}
            >
              {copy.retry}
            </button>
          </div>
        ) : null}

        {!loading &&
        !loadError &&
        posts.length === 0 ? (
          <div className="editorial-empty">
            <p>{copy.empty}</p>

            <Link
              className="editorial-write-button editorial-write-button--empty"
              to="/editorial/write"
            >
              <span>{copy.firstStory}</span>
              <strong>＋</strong>
            </Link>
          </div>
        ) : null}

        {!loading &&
        !loadError &&
        featuredPost ? (
          <>
            <article className="editorial-featured">
              <Link
                className="editorial-card-hitarea"
                to={`/editorial/${featuredPost.id}`}
                aria-label={getTitle(featuredPost)}
              />

              <button
                className="editorial-delete-button"
                type="button"
                onClick={() =>
                  openDeleteModal(featuredPost)
                }
              >
                {copy.delete}
              </button>

              {featuredPost.imageUrl ? (
                <div className="editorial-featured__image">
                  <img
                    src={featuredPost.imageUrl}
                    alt=""
                  />
                </div>
              ) : null}

              <div className="editorial-featured__body">
                <div className="editorial-meta">
                  <span>
                    {featuredPost.type}
                  </span>

                  <span>
                    {formatDate(
                      featuredPost.createdAt,
                      locale,
                    )}
                  </span>

                  <span>
                    {copy.featured}
                  </span>
                </div>

                <h2>
                  {getTitle(featuredPost)}
                </h2>

                <p className="editorial-featured__summary">
                  {getContent(featuredPost).length > 240
                    ? `${getContent(
                        featuredPost,
                      ).slice(0, 240)}...`
                    : getContent(featuredPost)}
                </p>

                <div className="editorial-featured__footer">
                  <span>
                    {featuredPost.editor
                      ? `${copy.by} ${featuredPost.editor.name}`
                      : `${copy.by} KOAUS Editorial`}
                  </span>

                  <strong>
                    {copy.readStory}
                  </strong>
                </div>
              </div>
            </article>

            {otherPosts.length > 0 ? (
              <div className="editorial-grid">
                {otherPosts.map(
                  (post, index) => (
                    <article
                      className="editorial-card"
                      key={post.id}
                    >
                      <Link
                        className="editorial-card-hitarea"
                        to={`/editorial/${post.id}`}
                        aria-label={getTitle(post)}
                      />

                      <button
                        className="editorial-delete-button"
                        type="button"
                        onClick={() =>
                          openDeleteModal(post)
                        }
                      >
                        {copy.delete}
                      </button>

                      {post.imageUrl ? (
                        <div className="editorial-card__image">
                          <img
                            src={post.imageUrl}
                            alt=""
                          />
                        </div>
                      ) : null}

                      <div className="editorial-card__content">
                        <div className="editorial-card__number">
                          {String(
                            index + 2,
                          ).padStart(2, '0')}
                        </div>

                        <div className="editorial-meta">
                          <span>
                            {post.type}
                          </span>

                          <span>
                            {formatDate(
                              post.createdAt,
                              locale,
                            )}
                          </span>
                        </div>

                        <h3>
                          {getTitle(post)}
                        </h3>

                        <p>
                          {getContent(post).length > 150
                            ? `${getContent(
                                post,
                              ).slice(0, 150)}...`
                            : getContent(post)}
                        </p>

                        <div className="editorial-card__bottom">
                          <span>
                            {post.editor
                              ? `${copy.by} ${post.editor.name}`
                              : `${copy.by} KOAUS Editorial`}
                          </span>

                          <strong>
                            {copy.read}
                          </strong>
                        </div>
                      </div>
                    </article>
                  ),
                )}
              </div>
            ) : null}
          </>
        ) : null}
      </section>

      {deleteTarget ? (
        <div
          className="editorial-modal-backdrop"
          onMouseDown={(event) => {
            if (
              event.target ===
              event.currentTarget
            ) {
              closeDeleteModal()
            }
          }}
        >
          <section
            className="editorial-delete-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="delete-story-title"
          >
            <div className="editorial-delete-modal__top">
              <p>KOAUS EDITOR</p>

              <button
                type="button"
                onClick={closeDeleteModal}
                aria-label={copy.close}
              >
                ×
              </button>
            </div>

            <h2 id="delete-story-title">
              {copy.deleteTitle}
            </h2>

            <p className="editorial-delete-modal__story">
              {getTitle(deleteTarget)}
            </p>

            <p className="editorial-delete-modal__description">
              {copy.deleteDescription}
            </p>

            <form onSubmit={handleDelete}>
              <label htmlFor="delete-password">
                {copy.password}
              </label>

              <input
                id="delete-password"
                type="password"
                autoFocus
                value={deletePassword}
                onChange={(event) => {
                  setDeletePassword(
                    event.target.value,
                  )

                  setDeleteError('')
                }}
                placeholder={
                  copy.passwordPlaceholder
                }
              />

              {deleteError ? (
                <p
                  className="editorial-delete-modal__error"
                  role="alert"
                >
                  {deleteError}
                </p>
              ) : null}

              <div className="editorial-delete-modal__actions">
                <button
                  type="button"
                  onClick={closeDeleteModal}
                  disabled={deleting}
                >
                  {copy.cancel}
                </button>

                <button
                  className="is-danger"
                  type="submit"
                  disabled={deleting}
                >
                  {deleting
                    ? copy.deleting
                    : copy.deleteStory}
                </button>
              </div>
            </form>
          </section>
        </div>
      ) : null}
    </main>
  )
}