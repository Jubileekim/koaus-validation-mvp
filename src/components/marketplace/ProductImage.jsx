import { useEffect, useRef, useState } from 'react'

export default function ProductImage({
  src,
  alt = '',
  className,
  fallback = null,
  onFail,
}) {
  const imageRef = useRef(null)
  const [currentSrc, setCurrentSrc] = useState(src)
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)

  if (src !== currentSrc) {
    setCurrentSrc(src)
    setIsLoading(Boolean(src))
    setHasError(!src)
  }

  useEffect(() => {
    const node = imageRef.current
    if (node?.complete && node.naturalWidth > 0) {
      setIsLoading(false)
    }
  }, [src])

  const handleLoad = () => {
    setIsLoading(false)
  }

  const handleError = () => {
    setIsLoading(false)
    setHasError(true)
    onFail?.(src)
  }

  if (!src || hasError) return fallback

  return (
    <span className="product-image" aria-busy={isLoading}>
      {isLoading ? (
        <span className="product-image__skeleton" aria-hidden="true" />
      ) : null}
      <img
        ref={imageRef}
        src={src}
        alt={alt}
        className={[className, isLoading ? 'product-image__media--loading' : null]
          .filter(Boolean)
          .join(' ')}
        onLoad={handleLoad}
        onError={handleError}
      />
    </span>
  )
}
