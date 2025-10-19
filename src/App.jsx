import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Cart from "./pages/Cart";

export default function App() {
  const [cart, setCart] = useState([]);

  // 🧩 Cargar carrito desde localStorage al iniciar
  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) setCart(JSON.parse(storedCart));
  }, []);

  // 💾 Guardar carrito en localStorage cuando cambie
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // ➕ Agregar producto
  const addToCart = (product) => {
    setCart((prev) => {
      const exists = prev.find((item) => item.id === product.id);
      if (exists) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  // ❌ Eliminar producto
  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  // 🗑 Vaciar carrito
  const clearCart = () => setCart([]);

  // 💰 Total de compra
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  // 🛒 Cantidad total de ítems
  const itemCount = cart.reduce((sum, i) => sum + i.quantity, 0);

  return (
    <>
      <Navbar itemCount={itemCount} />

      
      <main className="container-fluid py-4">
        <Routes>
          <Route path="/" element={<Home addToCart={addToCart} />} />
          <Route
            path="/cart"
            element={
              <Cart
                cart={cart}
                removeFromCart={removeFromCart}
                clearCart={clearCart}
                total={total}
              />
            }
          />
        </Routes>
      </main>
    </>
  );
}
