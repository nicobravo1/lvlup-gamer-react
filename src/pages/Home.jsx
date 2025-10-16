import products from '../data/products.json'
import ProductCard from '../components/ProductCard'

export default function Home() {
  return (
    <>
      <h1 className="h4 mb-3">Catálogo</h1>
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-3">
        {products.map(p => (
          <ProductCard key={p.id} title={p.title} price={p.price} image={p.image} />
        ))}
      </div>
    </>
  )
}
