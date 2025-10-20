import { Link } from 'react-router-dom'

export default function OrderFailure() {
  return (
    <div className="text-center py-5">
      <h2>Ocurrió un problema 😕</h2>
      <p>No pudimos procesar tu pago. Intenta nuevamente.</p>
      <Link to="/checkout" className="btn btn-outline-dark mt-3">
        Volver al checkout
      </Link>
    </div>
  )
}
