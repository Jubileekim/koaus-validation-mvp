import { Route, Routes } from 'react-router'
import LandingPage from './pages/LandingPage.jsx'
import MarketplacePage from './pages/MarketplacePage.jsx'
import ProductDetailPage from './pages/ProductDetailPage.jsx'
import CreatorAccessPage from './pages/CreatorAccessPage.jsx'
import BrandsPage from './pages/BrandsPage.jsx'
import NotFoundPage from './pages/NotFoundPage.jsx'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/marketplace" element={<MarketplacePage />} />
      <Route path="/products/:productId" element={<ProductDetailPage />} />
      <Route path="/creator-access" element={<CreatorAccessPage />} />
      <Route path="/brands" element={<BrandsPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  )
}
