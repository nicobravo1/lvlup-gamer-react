import { Link, NavLink } from 'react-router-dom'

export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg bg-dark navbar-dark">
      <div className="container">
        <Link className="navbar-brand fw-semibold" to="/">LvlUp Gamer</Link>

        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#nav">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div id="nav" className="collapse navbar-collapse">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <NavLink className="nav-link" to="/">Inicio</NavLink>
            </li>
            {/* Más secciones cuando las creemos:
            <li className="nav-item"><NavLink className="nav-link" to="/cart">Carrito</NavLink></li>
            <li className="nav-item"><NavLink className="nav-link" to="/login">Ingresar</NavLink></li>
            */}
          </ul>
        </div>
      </div>
    </nav>
  )
}
