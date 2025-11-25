import products from "../data/products.json";
import ProductCard from "../components/ProductCard";
import Footer from "../components/Footer";
import SidebarSocial from "../components/SidebarSocial";

export default function Home() {
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
              img={p.img}
            />
          ))}
        </div>

        {/* Footer centrado abajo */}
        <Footer />
      </div>
    </>
  );
}
