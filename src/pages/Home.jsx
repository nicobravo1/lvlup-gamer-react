import { useEffect, useState } from "react";
import { fetchProducts } from "../api/client";
import ProductCard from "../components/ProductCard";
import Footer from "../components/Footer";
import SidebarSocial from "../components/SidebarSocial";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await fetchProducts(); // GET /api/v1/products
        setProducts(data);
      } catch (err) {
        console.error(err);
        setError("No se pudieron cargar los productos.");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  if (loading) {
    return (
      <>
        <SidebarSocial />
        <div className="container py-4">
          <p className="text-center mt-5">Cargando productos...</p>
        </div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <SidebarSocial />
        <div className="container py-4">
          <p className="text-center mt-5 text-danger">{error}</p>
        </div>
      </>
    );
  }

  return (
    <>
      {/* Sidebar fijo a la izquierda */}
      <SidebarSocial />

      {/* Contenido principal */}
      <div className="container py-4">
        <h2 className="mb-4 fw-bold">Productos</h2>

        <div className="row row-cols-1 row-cols-md-4 g-4">
          {products.map((p) => (
            <ProductCard
              key={p.id}
              id={p.id}
              name={p.name}
              price={p.price}
              // en Supabase el campo es image_url
              img={p.image_url}
            />
          ))}
        </div>

        {/* Footer centrado abajo */}
        <Footer />
      </div>
    </>
  );
}

