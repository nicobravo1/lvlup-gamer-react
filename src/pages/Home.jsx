import React from "react";
import ProductCard from "../components/ProductCard";

export default function Home({ addToCart }) {
  const products = [
    { id: 1, title: "Teclado Mecánico RGB", price: 34990, image: "/img/keyboard.png" },
    { id: 2, title: "Mouse Gamer 6 botones", price: 19990, image: "/img/mouse.png" },
    { id: 3, title: "Auriculares Surround", price: 29990, image: "/img/headset.png" },
    { id: 4, title: "Pad XL Antideslizante", price: 12990, image: "/img/mousepad.png" },
  ];

  return (
    <div className="container py-4">
      <h2 className="mb-4">Productos</h2>
      <div className="row row-cols-1 row-cols-md-4 g-4">
        {products.map((p) => (
          <ProductCard key={p.id} {...p} addToCart={addToCart} />
        ))}
      </div>
    </div>
  );
}
