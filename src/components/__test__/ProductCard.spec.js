import { screen, fireEvent } from '@testing-library/react'
import { renderWithProviders } from '../../test/utils.jsx'
import ProductCard from '../ProductCard.jsx'
import { useCart } from '../../context/CartContext.jsx'



// Muestra un vistazo del estado del carrito
function CartPeek() {
  const { items, total } = useCart()
  return (
    <div>
      <div data-testid="peek-count">{items.length}</div>
      <div data-testid="peek-total">{total}</div>
    </div>
  )
}

describe('ProductCard', () => {
  it('renderiza y al click "Agregar al carrito" suma el producto', () => {
    renderWithProviders(
      <>
        <ProductCard id="t1" name="Teclado Pro" price={19990} img="" offer />
        <CartPeek />
      </>
    )

    // Render básico
    expect(screen.getByText(/Teclado Pro/i)).toBeTruthy()

    // Estado del carrito antes
    expect(screen.getByTestId('peek-count').textContent).toBe('0')
    expect(screen.getByTestId('peek-total').textContent).toBe('0')

    // Click
    fireEvent.click(screen.getByRole('button', { name: /agregar al carrito/i }))

    // Estado del carrito después
    expect(screen.getByTestId('peek-count').textContent).toBe('1')
    expect(screen.getByTestId('peek-total').textContent).toBe('19990')
  })
})
