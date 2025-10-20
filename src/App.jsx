import { Routes, Route, Navigate } from 'react-router-dom'
import Navbar from './components/Navbar'

// Páginas principales
import Home from './pages/Home'
import Categories from './pages/Categories'
import Offers from './pages/Offers'
import Cart from './pages/Cart'
import Nosotros from './pages/Nosotros'
import Blog from './pages/Blog'
import Contacto from './pages/Contacto'

// Autenticación
import Login from './pages/Login'
import Register from './pages/Register'

// Checkout y resultado de compra
import Checkout from './pages/Checkout'
import OrderSuccess from './pages/OrderSuccess'
import OrderFailure from './pages/OrderFailure'

// Panel administrativo
import Dashboard from './pages/Admin/Dashboard'
import ProductsAdmin from './pages/Admin/ProductsAdmin'
import OrdersAdmin from './pages/Admin/OrdersAdmin'

// Protección de rutas admin
import RequireAdmin from './components/RequireAdmin'

// Contextos globales
import { CartProvider } from './context/CartContext'
import { AuthProvider } from './context/AuthContext'

export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Navbar />
        <main className="container my-4">
          <Routes>
            {/* Páginas principales */}
            <Route path="/" element={<Home />} />
            <Route path="/categorias" element={<Categories />} />
            <Route path="/ofertas" element={<Offers />} />
            <Route path="/carrito" element={<Cart />} />
            <Route path="/nosotros" element={<Nosotros />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/contacto" element={<Contacto />} />

            {/* Autenticación */}
            <Route path="/login" element={<Login />} />
            <Route path="/registro" element={<Register />} />

            {/* Checkout */}
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/compra-exitosa" element={<OrderSuccess />} />
            <Route path="/compra-fallida" element={<OrderFailure />} />

            {/* Panel administrativo (protegido) */}
            <Route
              path="/admin"
              element={
                <RequireAdmin>
                  <Dashboard />
                </RequireAdmin>
              }
            />
            <Route
              path="/admin/productos"
              element={
                <RequireAdmin>
                  <ProductsAdmin />
                </RequireAdmin>
              }
            />
            <Route
              path="/admin/ordenes"
              element={
                <RequireAdmin>
                  <OrdersAdmin />
                </RequireAdmin>
              }
            />

            {/* Fallback */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>

        <footer className="text-center text-muted py-4 border-top">
          © {new Date().getFullYear()} LVLUP Gamer
        </footer>
      </CartProvider>
    </AuthProvider>
  )
}






