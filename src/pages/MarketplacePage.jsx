import { useEffect, useMemo, useState } from 'react'
import MarketplaceHeader from '../components/marketplace/MarketplaceHeader.jsx'
import ProductSearch from '../components/marketplace/ProductSearch.jsx'
import ProductFilters from '../components/marketplace/ProductFilters.jsx'
import ProductSort from '../components/marketplace/ProductSort.jsx'
import ProductCard from '../components/marketplace/ProductCard.jsx'
import EmptyState from '../components/marketplace/EmptyState.jsx'
import { getProducts } from '../services/productApi.js'
import { useTranslation } from '../contexts/LocaleContext.jsx'
import '../styles/marketplace.css'

function getVisibleProducts(products, search, category, sort) {
  const query = search.trim().toLowerCase()

  const filtered = products.filter((product) => {
    const matchesCategory =
      category === 'All' || product.category === category

    const searchableText = [
      product.name,
      product.nameKo,
      product.brand,
    ]
      .filter(Boolean)
      .join(' ')
      .toLowerCase()

    const matchesSearch =
      query.length === 0 || searchableText.includes(query)

    return matchesCategory && matchesSearch
  })

  const sorted = [...filtered]

  if (sort === 'price-asc') {
    sorted.sort(
      (a, b) =>
        Number(a.retailPrice || 0) -
        Number(b.retailPrice || 0),
    )
  } else if (sort === 'price-desc') {
    sorted.sort(
      (a, b) =>
        Number(b.retailPrice || 0) -
        Number(a.retailPrice || 0),
    )
  } else if (sort === 'margin') {
    sorted.sort(
      (a, b) =>
        Number(b.creatorMargin || 0) -
        Number(a.creatorMargin || 0),
    )
  }

  return sorted
}

export default function MarketplacePage() {
  const { t } = useTranslation()

  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [loadError, setLoadError] = useState(false)

  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('All')
  const [sort, setSort] = useState('newest')

  const loadProducts = async () => {
    try {
      setLoading(true)
      setLoadError(false)

      const data = await getProducts()

      setProducts(Array.isArray(data) ? data : [])
    } catch (error) {
      console.error('Failed to load products:', error)
      setLoadError(true)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadProducts()
  }, [])

  const visibleProducts = useMemo(
    () =>
      getVisibleProducts(
        products,
        search,
        category,
        sort,
      ),
    [products, search, category, sort],
  )

  const clearFilters = () => {
    setSearch('')
    setCategory('All')
  }

  const countLabel =
    visibleProducts.length === 1
      ? t('marketplace.countOne')
      : t('marketplace.countMany', {
          n: visibleProducts.length,
        })

  return (
    <main className="shell mp-main">
      <MarketplaceHeader />

      <div className="mp-toolbar">
        <ProductSearch
          value={search}
          onChange={setSearch}
        />

        <ProductSort
          value={sort}
          onChange={setSort}
        />
      </div>

      <ProductFilters
        value={category}
        onChange={setCategory}
      />

      {loading ? (
        <p className="mp-count">Loading products...</p>
      ) : null}

      {loadError ? (
        <div role="alert">
          <p>Unable to load products from the server.</p>

          <button
            className="button button--dark"
            type="button"
            onClick={loadProducts}
          >
            Try again
          </button>
        </div>
      ) : null}

      {!loading && !loadError ? (
        <>
          <p className="mp-count">{countLabel}</p>

          {visibleProducts.length === 0 ? (
            <EmptyState onClear={clearFilters} />
          ) : (
            <div className="mp-grid">
              {visibleProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                />
              ))}
            </div>
          )}
        </>
      ) : null}
    </main>
  )
}