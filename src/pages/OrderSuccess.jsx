import { Link } from 'react-router-dom'

export default function OrderSuccess() {
  return (
    <div className="text-center py-5">
      <h2>¡Compra exitosa! 🎉</h2>
      <p>Tu pedido se ha procesado correctamente.</p>
      <Link to="/" className="btn btn-dark mt-3">Volver al inicio</Link>
    </div>
  )
}
