import { Route, Routes } from 'react-router'
import LandingPage from './pages/LandingPage.jsx'
import MarketplacePage from './pages/MarketplacePage.jsx'
import ProductDetailPage from './pages/ProductDetailPage.jsx'
import CreatorAccessPage from './pages/CreatorAccessPage.jsx'
import BrandsPage from './pages/BrandsPage.jsx'
import NotFoundPage from './pages/NotFoundPage.jsx'
import RootLayout from './components/layout/RootLayout.jsx'
import EditorialPage from './pages/EditorialPage.jsx'
import EditorialDetailPage from './pages/EditorialDetailPage.jsx'

export default function App() {
  return (
    <Routes>
      {/* 랜딩 페이지는 기존 구조 유지 */}
      <Route path="/" element={<LandingPage />} />

      {/* 나머지 페이지는 공통 Header / Footer 사용 */}
      <Route element={<RootLayout />}>
        <Route path="/marketplace" element={<MarketplacePage />} />
        <Route path="/products/:productId" element={<ProductDetailPage />} />
        <Route path="/creator-access" element={<CreatorAccessPage />} />
        <Route path="/brands" element={<BrandsPage />} />
        <Route path="*" element={<NotFoundPage />} />
        <Route path="/editorial" element={<EditorialPage />}/>
        <Route path="/editorial/:postId" element={<EditorialDetailPage />}/>
      </Route>
    </Routes>
  )
}