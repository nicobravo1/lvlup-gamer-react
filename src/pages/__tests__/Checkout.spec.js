// src/pages/__tests__/Checkout.spec.js
import React, { useRef, useEffect } from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { MemoryRouter, Routes, Route } from 'react-router-dom'
import { CartProvider, useCart } from '../../context/CartContext.jsx'
import { AuthProvider } from '../../context/AuthContext.jsx'
import Checkout from '../Checkout.jsx'
import { Orders } from '../../data/orders.js'

// Seed del carrito que corre SOLO una vez (post-render)
function SeedCartOnce() {
  const { add } = useCart()
  const didRun = useRef(false)
  useEffect(() => {
    if (!didRun.current) {
      add({ id: 'p1', name: 'Headset', price: 10000 }, 2) // total 20000
      didRun.current = true
    }
  }, [add])
  return null
}

// Monta rutas reales + providers
function renderWithRoutes(initialRoute = '/checkout') {
  return render(
    <AuthProvider>
      <CartProvider>
        <MemoryRouter initialEntries={[initialRoute]}>
          <SeedCartOnce />
          <Routes>
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/compra-exitosa" element={<div data-testid="success-page">OK</div>} />
            <Route path="/compra-fallida" element={<div data-testid="failure-page">FAIL</div>} />
          </Routes>
        </MemoryRouter>
      </CartProvider>
    </AuthProvider>
  )
}

describe('Checkout page', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('flujo feliz: crea orden y navega a /compra-exitosa', () => {
    spyOn(Orders, 'create').and.callThrough()

    renderWithRoutes('/checkout')

    fireEvent.change(screen.getByLabelText(/Nombre/i), { target: { value: 'Nico' } })
    fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'nico@demo.cl' } })
    fireEvent.change(screen.getByLabelText(/Dirección/i), { target: { value: 'Av 123' } })

    fireEvent.click(screen.getByRole('button', { name: /confirmar compra/i }))

    expect(screen.getByTestId('success-page')).toBeTruthy()
    expect(Orders.create).toHaveBeenCalled()
  })

  it('flujo de error: si Orders.create falla, navega a /compra-fallida', () => {
    spyOn(Orders, 'create').and.callFake(() => { throw new Error('boom') })

    renderWithRoutes('/checkout')

    fireEvent.change(screen.getByLabelText(/Nombre/i), { target: { value: 'Nico' } })
    fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'nico@demo.cl' } })
    fireEvent.change(screen.getByLabelText(/Dirección/i), { target: { value: 'Av 123' } })

    fireEvent.click(screen.getByRole('button', { name: /confirmar compra/i }))

    expect(screen.getByTestId('failure-page')).toBeTruthy()
  })
})
