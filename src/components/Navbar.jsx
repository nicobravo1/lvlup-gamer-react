import { Link, NavLink } from "react-router-dom";

export default function Navbar({ itemCount }) {
  return (
    <nav className="navbar navbar-expand-lg bg-dark navbar-dark">
      {/* Cambié container por container-fluid para ancho completo */}
      <div className="container-fluid">
        <Link className="navbar-brand fw-semibold" to="/">
          LvlUp Gamer
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#nav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div id="nav" className="collapse navbar-collapse">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <NavLink className="nav-link" to="/">
                Inicio
              </NavLink>
            </li>
          </ul>

          {/* 🛒 Carrito a la derecha */}
          <ul className="navbar-nav ms-auto">
            <li className="nav-item position-relative">
              <NavLink className="nav-link" to="/cart">
                <i className="bi bi-cart3 me-1"></i>
                Carrito
                {itemCount > 0 && (
                  <span
                    className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
                    style={{ fontSize: "0.75rem" }}
                  >
                    {itemCount}
                  </span>
                )}
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
