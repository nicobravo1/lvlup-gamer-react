import { useCart } from '../context/CartContext'

export default function ProductCard({ id, name, price, img }) {
  const { add } = useCart()

  return (
    <div className="col">
      <div className="card h-100">
        <img src={img || '/img/placeholder.png'} className="card-img-top" alt={name} />
        <div className="card-body d-flex flex-column">
          <h5 className="card-title">{name}</h5>
          <p className="mt-auto mb-2 fw-bold">${price.toLocaleString('es-CL')}</p>
          <button className="btn btn-dark" onClick={() => add({ id, name, price }, 1)}>
            Agregar al carrito
          </button>
        </div>
      </div>
    </div>
  )
}
