import { useCallback, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router'
import ProductCard from '../marketplace/ProductCard.jsx'
import { useTranslation } from '../../contexts/LocaleContext.jsx'

function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

function Chevron({ direction }) {
  const isPrev = direction === 'prev'
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" focusable="false">
      <path
        d={isPrev ? 'M14.5 5.5 8 12l6.5 6.5' : 'M9.5 5.5 16 12l-6.5 6.5'}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default function FeaturedProductsCarousel({
  products,
  ctaLabel,
  ctaLink = '/marketplace',
}) {
  const { t } = useTranslation()
  const trackRef = useRef(null)
  const [index, setIndex] = useState(0)
  const [atStart, setAtStart] = useState(true)
  const [atEnd, setAtEnd] = useState(false)

  const syncFromScroll = useCallback(() => {
    const track = trackRef.current
    const slide = track?.querySelector('.landing-mp__slide')
    if (!track || !slide) return

    const styles = getComputedStyle(track)
    const gap = Number.parseFloat(styles.columnGap || styles.gap) || 0
    const step = slide.getBoundingClientRect().width + gap
    const maxScroll = Math.max(0, track.scrollWidth - track.clientWidth)
    const start = track.scrollLeft <= 4
    const end = track.scrollLeft >= maxScroll - 4
    const nextIndex = Math.min(
      products.length - 1,
      Math.max(0, Math.round(track.scrollLeft / Math.max(step, 1))),
    )

    setAtStart(start)
    setAtEnd(end || maxScroll <= 4)
    setIndex(end ? products.length - 1 : nextIndex)
  }, [products.length])

  useEffect(() => {
    const track = trackRef.current
    if (!track) return undefined

    syncFromScroll()
    track.addEventListener('scroll', syncFromScroll, { passive: true })
    window.addEventListener('resize', syncFromScroll)

    const observer = typeof ResizeObserver === 'function' ? new ResizeObserver(syncFromScroll) : null
    observer?.observe(track)

    return () => {
      track.removeEventListener('scroll', syncFromScroll)
      window.removeEventListener('resize', syncFromScroll)
      observer?.disconnect()
    }
  }, [syncFromScroll])

  const scrollByCard = (direction) => {
    const track = trackRef.current
    const slide = track?.querySelector('.landing-mp__slide')
    if (!track || !slide) return

    const styles = getComputedStyle(track)
    const gap = Number.parseFloat(styles.columnGap || styles.gap) || 0
    const step = slide.getBoundingClientRect().width + gap
    const maxScroll = Math.max(0, track.scrollWidth - track.clientWidth)
    const next = Math.min(maxScroll, Math.max(0, track.scrollLeft + direction * step))

    track.scrollTo({
      left: next,
      behavior: prefersReducedMotion() ? 'auto' : 'smooth',
    })
  }

  const handleKeyDown = (event) => {
    if (event.key === 'ArrowLeft') {
      event.preventDefault()
      if (!atStart) scrollByCard(-1)
    }
    if (event.key === 'ArrowRight') {
      event.preventDefault()
      if (!atEnd) scrollByCard(1)
    }
  }

  if (!products.length) return null

  const status = t('preview.status', {
    current: index + 1,
    total: products.length,
  })

  return (
    <div
      className="landing-mp__carousel"
      role="region"
      aria-roledescription="carousel"
      aria-label={t('preview.carouselAria')}
      onKeyDown={handleKeyDown}
    >
      <div ref={trackRef} id="landing-mp-track" className="landing-mp__track" tabIndex={-1}>
        {products.map((product) => (
          <div className="landing-mp__slide" key={product.id}>
            <ProductCard product={product} />
          </div>
        ))}
      </div>

      <div className="landing-mp__bar">
        <div className="landing-mp__nav">
          <button
            type="button"
            className="landing-mp__nav-btn"
            onClick={() => scrollByCard(-1)}
            disabled={atStart}
            aria-label={t('preview.prevAria')}
            aria-controls="landing-mp-track"
          >
            <Chevron direction="prev" />
          </button>
          <p className="landing-mp__status" aria-live="polite">
            {status}
          </p>
          <button
            type="button"
            className="landing-mp__nav-btn"
            onClick={() => scrollByCard(1)}
            disabled={atEnd}
            aria-label={t('preview.nextAria')}
            aria-controls="landing-mp-track"
          >
            <Chevron direction="next" />
          </button>
        </div>

        <Link className="button button--dark" to={ctaLink}>
          {ctaLabel}
        </Link>
      </div>
    </div>
  )
}
