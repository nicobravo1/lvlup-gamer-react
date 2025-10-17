
export default function ProductCard({ id, title, price, image, addToCart }) {
  const format = (v) =>
    v.toLocaleString("es-CL", { style: "currency", currency: "CLP" });

  const handleAdd = () => {
    
    const product = { id, name: title, price, image };
    addToCart(product);
  };

  return (
    <div className="col">
      <div className="card h-100 shadow-sm">
        <img
          src={image}
          className="card-img-top"
          alt={title}
          onError={(e) => {
            e.currentTarget.src = "/img/placeholder.png";
          }}
        />
        <div className="card-body d-flex flex-column">
          <h6 className="card-title mb-2">{title}</h6>
          <p className="text-muted mb-3">{format(price)}</p>
          <button className="btn btn-primary mt-auto" onClick={handleAdd}>
            Agregar al carrito
          </button>
        </div>
      </div>
    </div>
  );
}
