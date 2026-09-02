import { Route, Routes } from 'react-router'

import LandingPage from './pages/LandingPage.jsx'
import MarketplacePage from './pages/MarketplacePage.jsx'
import ProductDetailPage from './pages/ProductDetailPage.jsx'

import EditorialPage from './pages/EditorialPage.jsx'
import EditorialDetailPage from './pages/EditorialDetailPage.jsx'
import EditorialWritePage from './pages/EditorialWritePage.jsx'
import EditorialEditPage from './pages/EditorialEditPage.jsx'

import CreatorAccessPage from './pages/CreatorAccessPage.jsx'
import BrandsPage from './pages/BrandsPage.jsx'
import NotFoundPage from './pages/NotFoundPage.jsx'

import RootLayout from './components/layout/RootLayout.jsx'

export default function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={<LandingPage />}
      />

      <Route element={<RootLayout />}>
        <Route
          path="/editorial"
          element={<EditorialPage />}
        />

        <Route
          path="/editorial/write"
          element={<EditorialWritePage />}
        />

        <Route
          path="/editorial/:postId/edit"
          element={<EditorialEditPage />}
        />

        <Route
          path="/editorial/:postId"
          element={<EditorialDetailPage />}
        />

        <Route
          path="/marketplace"
          element={<MarketplacePage />}
        />

        <Route
          path="/products/:productId"
          element={<ProductDetailPage />}
        />

        <Route
          path="/creator-access"
          element={<CreatorAccessPage />}
        />

        <Route
          path="/brands"
          element={<BrandsPage />}
        />

        <Route
          path="*"
          element={<NotFoundPage />}
        />
      </Route>
    </Routes>
  )
}