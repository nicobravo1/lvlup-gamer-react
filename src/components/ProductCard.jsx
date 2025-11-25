import { useState } from "react";
import ProductModal from "./ProductModal";

export default function ProductCard({ id, name, price, img }) {

  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="col">
        <div className="card h-100 product-card-hover">

          <img
            src={img}
            className="card-img-top product-img"
            alt={name}
            onClick={() => setIsOpen(true)}
            style={{ cursor: "pointer" }}
          />

          <div className="card-body text-center">
            <h5>{name}</h5>
            <p className="fw-bold fs-5">${price.toLocaleString("es-CL")}</p>
          </div>
        </div>
      </div>

      {isOpen && (
        <ProductModal
          product={{ id, name, price, img }}
          onClose={() => setIsOpen(false)}
        />
      )}
    </>
  );
}

