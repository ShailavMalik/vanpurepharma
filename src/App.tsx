import { Navigate, Route, Routes } from 'react-router-dom'
import { Layout } from './components/layout/Layout'
import { featuredProduct, productPath } from './data/products'
import { AboutPage } from './pages/AboutPage'
import { HomePage } from './pages/HomePage'
import { IngredientsPage } from './pages/IngredientsPage'
import { NotFoundPage } from './pages/NotFoundPage'
import { ProductPage } from './pages/ProductPage'

export function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="products" element={<Navigate to={productPath(featuredProduct)} replace />} />
        <Route path="products/:slug" element={<ProductPage />} />
        <Route path="products/:slug/ingredients" element={<IngredientsPage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}
