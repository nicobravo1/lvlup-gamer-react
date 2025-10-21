// src/test/utils.jsx
import { render } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { CartProvider } from '../context/CartContext'
import { AuthProvider } from '../context/AuthContext'

/**
 * Renderiza una UI envuelta con Router + Auth + Cart.
 * Puedes pasar la ruta inicial con { route: '/categorias?cat=...' }.
 */
export function renderWithProviders(ui, { route = '/' } = {}) {
  return render(
    <AuthProvider>
      <CartProvider>
        <MemoryRouter initialEntries={[route]}>
          {ui}
        </MemoryRouter>
      </CartProvider>
    </AuthProvider>
  )
}
