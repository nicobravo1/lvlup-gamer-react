import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'
import { Orders } from '../data/orders'

export default function Checkout() {
  const { items, total, clear } = useCart()
  const { user } = useAuth()
  const navigate = useNavigate()

  const [form, setForm] = useState({
    name: user?.name || '',
    email: user?.email || '',
    address: '',
    shipping: 'normal'
  })

  const onChange = (e) => setForm(f => ({ ...f, [e.target.name]: e.target.value }))

  const onSubmit = (e) => {
    e.preventDefault()
    if (items.length === 0) return

    try {
      Orders.create({
        buyer: form,
        items,
        total,
        createdAt: new Date().toISOString()
      })
      clear()
      navigate('/compra-exitosa')
    } catch (err) {
      console.error(err)
      navigate('/compra-fallida')
    }
  }

  if (items.length === 0) {
    return <p>Tu carrito está vacío. Agrega productos antes de pagar.</p>
  }

  return (
    <div className="row g-4">
      <div className="col-md-7">
        <h2>Checkout</h2>
        <form className="row g-3" onSubmit={onSubmit}>
          <div className="col-md-6">
            <label className="form-label">Nombre</label>
            <input
              name="name"
              className="form-control"
              value={form.name}
              onChange={onChange}
              required
            />
          </div>
          <div className="col-md-6">
            <label className="form-label">Email</label>
            <input
              name="email"
              type="email"
              className="form-control"
              value={form.email}
              onChange={onChange}
              required
            />
          </div>
          <div className="col-12">
            <label className="form-label">Dirección</label>
            <input
              name="address"
              className="form-control"
              value={form.address}
              onChange={onChange}
              required
            />
          </div>
          <div className="col-md-6">
            <label className="form-label">Tipo de Envío</label>
            <select
              name="shipping"
              className="form-select"
              value={form.shipping}
              onChange={onChange}
            >
              <option value="normal">Normal (3-5 días)</option>
              <option value="express">Express (24h)</option>
            </select>
          </div>

          <div className="col-12 d-flex justify-content-between align-items-center">
            <h5>Total: ${total.toLocaleString('es-CL')}</h5>
            <button className="btn btn-dark" type="submit">
              Confirmar compra
            </button>
          </div>
        </form>
      </div>

      <div className="col-md-5">
        <h4>Resumen</h4>
        <ul className="list-group mb-3">
          {items.map(i => (
            <li
              key={i.id}
              className="list-group-item d-flex justify-content-between"
            >
              <span>{i.name} × {i.qty}</span>
              <strong>${(i.price * i.qty).toLocaleString('es-CL')}</strong>
            </li>
          ))}
          <li className="list-group-item d-flex justify-content-between">
            <span>Total</span>
            <strong>${total.toLocaleString('es-CL')}</strong>
          </li>
        </ul>
      </div>
    </div>
  )
}
