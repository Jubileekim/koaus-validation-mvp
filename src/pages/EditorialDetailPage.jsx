import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router'
import { getPostById } from '../services/postApi.js'
import { getProductById } from '../services/productApi.js'
import { useTranslation } from '../contexts/LocaleContext.jsx'
import '../styles/editorial.css'

function ShopProductBlock({ productId, locale }) {
  const [product, setProduct] = useState(null)

  useEffect(() => {
    async function loadProduct() {
      try {
        const data = await getProductById(productId)
        setProduct(data)
      } catch (error) {
        console.error(
          'Failed to load editorial product:',
          error,
        )
      }
    }

    loadProduct()
  }, [productId])

  if (!product) return null

  const name =
    locale === 'ko'
      ? product.nameKo || product.name
      : product.name

  const tagline =
    product.tagline &&
    typeof product.tagline === 'object'
      ? product.tagline[locale] ||
        product.tagline.en ||
        ''
      : ''

  const image =
    product.images?.main ||
    product.imageUrl ||
    ''

  return (
    <aside className="editorial-shop-block">
      {image ? (
        <Link
          className="editorial-shop-block__image"
          to={`/products/${product.id}`}
        >
          <img src={image} alt={name} />
        </Link>
      ) : null}

      <div className="editorial-shop-block__copy">
        <p className="editorial-shop-block__eyebrow">
          {locale === 'ko'
            ? 'SHOP THE STORY'
            : 'SHOP THE STORY'}
        </p>

        <p className="editorial-shop-block__brand">
          {product.brand}
        </p>

        <h3>{name}</h3>

        {tagline ? <p>{tagline}</p> : null}

        <div className="editorial-shop-block__bottom">
          <strong>
            ${product.retailPrice}
          </strong>

          <Link to={`/products/${product.id}`}>
            {locale === 'ko'
              ? '상품 보기 →'
              : 'View product →'}
          </Link>
        </div>
      </div>
    </aside>
  )
}

function ArticleBody({ content, locale }) {
  const blocks = content
    .split(/\n\s*\n/)
    .map((block) => block.trim())
    .filter(Boolean)

  return (
    <div className="editorial-detail__body">
      {blocks.map((block, index) => {
        const productMatch = block.match(
          /^\[\[PRODUCT:([a-zA-Z0-9-]+)\]\]$/,
        )

        if (productMatch) {
          return (
            <ShopProductBlock
              key={`${productMatch[1]}-${index}`}
              productId={productMatch[1]}
              locale={locale}
            />
          )
        }

        if (block.startsWith('### ')) {
          return (
            <h3 key={index}>
              {block.replace(/^### /, '')}
            </h3>
          )
        }

        if (block.startsWith('## ')) {
          return (
            <h2 key={index}>
              {block.replace(/^## /, '')}
            </h2>
          )
        }

        if (block.startsWith('> ')) {
          return (
            <blockquote key={index}>
              {block.replace(/^> /, '')}
            </blockquote>
          )
        }

        const lines = block.split('\n')

        if (
          lines.length > 1 &&
          lines.every((line) =>
            line.startsWith('- '),
          )
        ) {
          return (
            <ul key={index}>
              {lines.map((line) => (
                <li key={line}>
                  {line.replace(/^- /, '')}
                </li>
              ))}
            </ul>
          )
        }

        return <p key={index}>{block}</p>
      })}
    </div>
  )
}

export default function EditorialDetailPage() {
  const { postId } = useParams()
  const { locale } = useTranslation()

  const [post, setPost] = useState(null)
  const [loading, setLoading] = useState(true)
  const [loadError, setLoadError] = useState(false)

  const copy =
    locale === 'ko'
      ? {
          back: '← 에디토리얼로 돌아가기',
          edit: '글 수정',
          loading: '이야기를 불러오는 중...',
          error: '이야기를 불러올 수 없습니다.',
          retry: '다시 시도',
          notFound: '이야기를 찾을 수 없습니다.',
          article: '아티클',
          reel: '릴',
          by: '글',
        }
      : {
          back: '← Back to Editorial',
          edit: 'Edit story',
          loading: 'Loading story...',
          error: 'Unable to load story.',
          retry: 'Try again',
          notFound: 'Story not found.',
          article: 'ARTICLE',
          reel: 'REEL',
          by: 'By',
        }

  const loadPost = async () => {
    try {
      setLoading(true)
      setLoadError(false)

      const data = await getPostById(postId)

      setPost(data)
    } catch (error) {
      console.error(
        'Failed to load post:',
        error,
      )

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
      <main className="editorial-detail">
        <div className="shell">
          <p>{copy.loading}</p>
        </div>
      </main>
    )
  }

  if (loadError) {
    return (
      <main className="editorial-detail">
        <div className="shell">
          <h1>{copy.error}</h1>

          <button
            className="button button--dark"
            type="button"
            onClick={loadPost}
          >
            {copy.retry}
          </button>
        </div>
      </main>
    )
  }

  if (!post) {
    return (
      <main className="editorial-detail">
        <div className="shell">
          <h1>{copy.notFound}</h1>
        </div>
      </main>
    )
  }

  const title =
    locale === 'ko'
      ? post.titleKo || post.title
      : post.title

  const content =
    locale === 'ko'
      ? post.contentKo || post.content
      : post.content

  return (
    <main className="editorial-detail">
      <div className="shell editorial-detail__shell">
        <div className="editorial-detail__nav">
          <Link
            className="editorial-detail__back"
            to="/editorial"
          >
            {copy.back}
          </Link>

          <Link
            className="editorial-detail__edit"
            to={`/editorial/${post.id}/edit`}
          >
            {copy.edit} →
          </Link>
        </div>

        <article>
          <div className="editorial-meta">
            <span>
              {post.type === 'REEL'
                ? copy.reel
                : copy.article}
            </span>
          </div>

          <h1>{title}</h1>

          {post.editor ? (
            <p className="editorial-detail__author">
              {copy.by} {post.editor.name}
            </p>
          ) : null}

          {post.type === 'REEL' &&
          post.videoUrl ? (
            <video
              className="editorial-detail__video"
              controls
              playsInline
              preload="metadata"
            >
              <source src={post.videoUrl} />
            </video>
          ) : post.imageUrl ? (
            <div className="editorial-detail__image">
              <img
                src={post.imageUrl}
                alt={title}
              />
            </div>
          ) : null}

          <ArticleBody
            content={content}
            locale={locale}
          />
        </article>
      </div>
    </main>
  )
}