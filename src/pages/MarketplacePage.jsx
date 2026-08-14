import { useMemo, useState } from 'react'
import { Link } from 'react-router'
import { PRODUCTS } from '../data/products.js'
import MarketplaceHeader from '../components/marketplace/MarketplaceHeader.jsx'
import ProductSearch from '../components/marketplace/ProductSearch.jsx'
import ProductFilters from '../components/marketplace/ProductFilters.jsx'
import ProductSort from '../components/marketplace/ProductSort.jsx'
import ProductCard from '../components/marketplace/ProductCard.jsx'
import EmptyState from '../components/marketplace/EmptyState.jsx'
import LanguageToggle from '../components/layout/LanguageToggle.jsx'
import { useTranslation } from '../contexts/LocaleContext.jsx'
import '../styles/marketplace.css'

function getVisibleProducts(products, search, category, sort) {
  const query = search.trim().toLowerCase()
  const filtered = products.filter((product) => {
    const matchesCategory = category === 'All' || product.category === category
    const matchesSearch =
      query.length === 0 ||
      product.name.toLowerCase().includes(query) ||
      product.brand.toLowerCase().includes(query)
    return matchesCategory && matchesSearch
  })

  const sorted = [...filtered]
  if (sort === 'price-asc') {
    sorted.sort((a, b) => a.retailPrice - b.retailPrice)
  } else if (sort === 'price-desc') {
    sorted.sort((a, b) => b.retailPrice - a.retailPrice)
  } else if (sort === 'margin') {
    sorted.sort((a, b) => b.creatorMargin - a.creatorMargin)
  }
  // Newest keeps catalog order (products.js lists newest first).

  return sorted
}

export default function MarketplacePage() {
  const { t } = useTranslation()
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('All')
  const [sort, setSort] = useState('newest')

  const visibleProducts = useMemo(
    () => getVisibleProducts(PRODUCTS, search, category, sort),
    [search, category, sort],
  )

  const clearFilters = () => {
    setSearch('')
    setCategory('All')
  }

  const countLabel =
    visibleProducts.length === 1
      ? t('marketplace.countOne')
      : t('marketplace.countMany', { n: visibleProducts.length })

  return (
    <div className="mp-page">
      <div className="mp-topbar">
        <div className="shell mp-topbar__inner">
          <Link className="wordmark" to="/" aria-label={t('nav.homeAria')}>
            koaus <span>/ marketplace</span>
          </Link>
          <div className="mp-topbar__actions">
            <LanguageToggle />
            <Link className="button button--ghost" to="/">
              {t('nav.backToKoaus')}
            </Link>
          </div>
        </div>
      </div>

      <main className="shell mp-main">
        <MarketplaceHeader />

        <div className="mp-toolbar">
          <ProductSearch value={search} onChange={setSearch} />
          <ProductSort value={sort} onChange={setSort} />
        </div>
        <ProductFilters value={category} onChange={setCategory} />

        <p className="mp-count">{countLabel}</p>

        {visibleProducts.length === 0 ? (
          <EmptyState onClear={clearFilters} />
        ) : (
          <div className="mp-grid">
            {visibleProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
