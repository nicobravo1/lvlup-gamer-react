// src/context/__tests__/CartContext.spec.jsx
import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { CartProvider, useCart } from '../../context/CartContext'
import { MemoryRouter } from 'react-router-dom'

// Pequeño componente "probe" para interactuar con el contexto en el test
function CartProbe() {
  const { items, total, add, remove, clear } = useCart()
  return (
    <div>
      <div data-testid="count">{items.length}</div>
      <div data-testid="total">{total}</div>

      <button onClick={() => add({ id: 'p1', name: 'Producto X', price: 1000 }, 1)}>add-p1</button>
      <button onClick={() => add({ id: 'p1', name: 'Producto X', price: 1000 }, 2)}>add-p1x2</button>
      <button onClick={() => add({ id: 'p2', name: 'Prod Y', price: 500 }, 3)}>add-p2x3</button>
      <button onClick={() => remove('p1')}>remove-p1</button>
      <button onClick={() => clear()}>clear</button>
    </div>
  )
}

describe('CartContext', () => {
  const setup = () =>
    render(
      <CartProvider>
        <MemoryRouter>
          <CartProbe />
        </MemoryRouter>
      </CartProvider>
    )

  it('agrega items y acumula cantidades correctamente', () => {
    setup()
    fireEvent.click(screen.getByText('add-p1'))     // p1 x1 → total 1000
    fireEvent.click(screen.getByText('add-p1x2'))   // p1 +2 → p1 x3 → total 3000
    fireEvent.click(screen.getByText('add-p2x3'))   // p2 x3 (500) → +1500 → total 4500

    expect(screen.getByTestId('count').textContent).toBe('2')
    expect(screen.getByTestId('total').textContent).toBe('4500')
  })

  it('remove elimina por id y clear vacía todo', () => {
    setup()
    fireEvent.click(screen.getByText('add-p1'))
    fireEvent.click(screen.getByText('add-p2x3'))

    fireEvent.click(screen.getByText('remove-p1')) // quita p1
    expect(screen.getByTestId('count').textContent).toBe('1')

    fireEvent.click(screen.getByText('clear'))     // vacía
    expect(screen.getByTestId('count').textContent).toBe('0')
    expect(screen.getByTestId('total').textContent).toBe('0')
  })
})
