import { Orders } from '../../data/orders'

export default function OrdersAdmin() {
  const orders = Orders.list()

  return (
    <>
      <h3 className="mb-3">Órdenes</h3>
      {orders.length === 0 ? (
        <p>No hay órdenes aún.</p>
      ) : (
        <div className="table-responsive">
          <table className="table table-striped align-middle">
            <thead>
              <tr>
                <th>Id</th>
                <th>Fecha</th>
                <th>Cliente</th>
                <th>Email</th>
                <th>Total</th>
                <th>Items</th>
              </tr>
            </thead>
            <tbody>
              {orders.map(o => (
                <tr key={o.id}>
                  <td>{o.id}</td>
                  <td>{new Date(o.createdAt).toLocaleString()}</td>
                  <td>{o.buyer.name}</td>
                  <td>{o.buyer.email}</td>
                  <td>${o.total.toLocaleString('es-CL')}</td>
                  <td>
                    <ul className="m-0">
                      {o.items.map(i => (
                        <li key={i.id}>{i.name} × {i.qty}</li>
                      ))}
                    </ul>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  )
}
