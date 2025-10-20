import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'
import products from '../data/products.json'

export default function Navbar() {
  const navigate = useNavigate()
  const { total } = useCart()
  const { user, logout } = useAuth()
  const [q, setQ] = useState('')

  // 🔐 misma regla que en RequireAdmin
  const isAdmin = !!user && user.email?.toLowerCase().endsWith('@demo.cl')

  // categorías únicas desde products.json
  const categories = [...new Set(products.map(p => p.category))]

  const onSearch = (e) => {
    e.preventDefault()
    navigate(`/categorias?search=${encodeURIComponent(q)}`)
  }

  return (
    <nav className="navbar navbar-expand-lg bg-white border-bottom sticky-top shadow-sm">
      <div className="container">
        {/* 🖼️ Logo + Marca */}
        <Link className="navbar-brand d-flex align-items-center fw-bold" to="/">
          <img 
            src="/img/logo.png"
            alt="LVLUP Logo"
            width="42"
            height="42"
            className="me-2"
            style={{ objectFit: 'contain' }}
          />
          <span style={{ fontSize: '1.3rem', letterSpacing: '0.5px' }}>LVLUP</span>
        </Link>

        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#nav">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="nav">
          {/* 🔍 Buscador */}
          <form className="d-flex ms-lg-3 my-2 my-lg-0" role="search" onSubmit={onSearch}>
            <input
              className="form-control"
              type="search"
              placeholder="Buscar"
              value={q}
              onChange={(e) => setQ(e.target.value)}
            />
            <button className="btn btn-outline-success ms-2" type="submit">Buscar</button>
          </form>

          <ul className="navbar-nav ms-auto align-items-lg-center">
            <li className="nav-item">
              <NavLink className="nav-link" to="/">Home</NavLink>
            </li>

            {/* 🧩 Dropdown Categorías */}
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown">Categorías</a>
              <ul className="dropdown-menu">
                {categories.map((c) => (
                  <li key={c}>
                    <Link className="dropdown-item" to={`/categorias?cat=${c}`}>{c}</Link>
                  </li>
                ))}
              </ul>
            </li>

            <li className="nav-item">
              <NavLink className="nav-link" to="/ofertas">Ofertas</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/nosotros">Nosotros</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/blog">Blog</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/contacto">Contacto</NavLink>
            </li>

            {/* 🔧 Admin (solo si es admin) */}
            {isAdmin && (
              <li className="nav-item">
                <NavLink className="nav-link text-danger fw-semibold" to="/admin">Admin</NavLink>
              </li>
            )}

            {/* 🛒 Carrito */}
            <li className="nav-item ms-lg-3 my-2 my-lg-0">
              <Link className="btn btn-success fw-semibold" to="/carrito">
                🛒 Carrito ${total.toLocaleString('es-CL')}
              </Link>
            </li>

            {/* 👤 Sesión / Usuario */}
            {user ? (
              <>
                <li className="nav-item ms-lg-3 my-2 my-lg-0">
                  <span className="navbar-text">
                    👋 Hola, <strong>{user.name}</strong>
                  </span>
                </li>
                <li className="nav-item ms-lg-2">
                  <button className="btn btn-outline-danger" onClick={logout}>
                    Cerrar sesión
                  </button>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item ms-lg-2">
                  <Link className="btn btn-outline-primary" to="/login">
                    Iniciar Sesión
                  </Link>
                </li>
                <li className="nav-item ms-lg-2">
                  <Link className="btn btn-primary" to="/registro">
                    Crear Cuenta
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  )
}


