import { Link } from 'react-router-dom'

export default function Dashboard() {
  return (
    <>
      <h2 className="mb-3">Panel Administrativo</h2>
      <div className="d-grid d-md-block gap-2">
        <Link to="/admin/productos" className="btn btn-dark me-2">Productos</Link>
        <Link to="/admin/ordenes" className="btn btn-outline-dark">Órdenes</Link>
      </div>
    </>
  )
}
