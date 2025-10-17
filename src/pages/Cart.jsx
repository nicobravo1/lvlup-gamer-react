
import React from "react";
import { Link } from "react-router-dom";

export default function Cart({ cart, removeFromCart, clearCart, total }) {
  const format = (v) =>
    v.toLocaleString("es-CL", { style: "currency", currency: "CLP" });

  return (
    <div className="container py-4">
      <h2 className="mb-4">🛒 Carrito de Compras</h2>

      {cart.length === 0 ? (
        <div className="text-center my-5">
          <p className="fs-5">Tu carrito está vacío.</p>
          <Link to="/" className="btn btn-primary">
            Volver a la tienda
          </Link>
        </div>
      ) : (
        <>
          <div className="table-responsive">
            <table className="table align-middle">
              <thead className="table-dark">
                <tr>
                  <th scope="col">Producto</th>
                  <th scope="col" style={{ width: "120px" }}>
                    Precio
                  </th>
                  <th scope="col" style={{ width: "120px" }}>
                    Cantidad
                  </th>
                  <th scope="col" style={{ width: "140px" }}>
                    Subtotal
                  </th>
                  <th scope="col" style={{ width: "80px" }}></th>
                </tr>
              </thead>
              <tbody>
                {cart.map((item) => (
                  <tr key={item.id}>
                    <td className="d-flex align-items-center">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="me-3 rounded"
                        style={{
                          width: "60px",
                          height: "60px",
                          objectFit: "cover",
                        }}
                        onError={(e) =>
                          (e.currentTarget.src = "/img/placeholder.png")
                        }
                      />
                      <div>
                        <strong>{item.name}</strong>
                      </div>
                    </td>
                    <td>{format(item.price)}</td>
                    <td>{item.quantity}</td>
                    <td>{format(item.price * item.quantity)}</td>
                    <td>
                      <button
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => removeFromCart(item.id)}
                      >
                        <i className="bi bi-trash3"></i>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="d-flex justify-content-between align-items-center mt-4">
            <button className="btn btn-outline-danger" onClick={clearCart}>
              <i className="bi bi-x-circle me-2"></i>Vaciar carrito
            </button>

            <div className="text-end">
              <h4 className="fw-bold">Total: {format(total)}</h4>
              <button className="btn btn-success mt-2" onClick={() => alert("💳 Próximamente checkout")}>
                Proceder al pago
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
