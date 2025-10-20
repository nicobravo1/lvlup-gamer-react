import { useCart } from '../context/CartContext'
import { Link } from 'react-router-dom'   // 🔹 Import para usar el enlace a Checkout

export default function Cart() {
  const { items, remove, clear, total } = useCart()

  // Si el carrito está vacío
  if (items.length === 0)
    return <p>🛒 El carrito está vacío.</p>

  return (
    <>
      <h2 className="mb-3">Tu Carrito</h2>

      <ul className="list-group mb-3">
        {items.map(i => (
          <li
            key={i.id}
            className="list-group-item d-flex justify-content-between align-items-center"
          >
            <div>
              <strong>{i.name}</strong> × {i.qty}
            </div>
            <div className="d-flex align-items-center gap-2">
              <span>${(i.price * i.qty).toLocaleString('es-CL')}</span>
              <button
                className="btn btn-sm btn-outline-danger"
                onClick={() => remove(i.id)}
              >
                Quitar
              </button>
            </div>
          </li>
        ))}
      </ul>

      <div className="d-flex justify-content-between align-items-center">
        <h4>Total: ${total.toLocaleString('es-CL')}</h4>

        <div className="d-flex gap-2">
          <button className="btn btn-outline-secondary" onClick={clear}>
            Vaciar carrito
          </button>

          {/* 🔹 Enlace funcional al Checkout */}
          <Link className="btn btn-dark" to="/checkout">
            Ir a pagar
          </Link>
        </div>
      </div>
    </>
  )
}


