import products from '../data/products.json'
import ProductCard from '../components/ProductCard'

export default function Offers() {
  const items = products.filter(p => p.offer === true)

  return (
    <>
      <h2 className="mb-3">Ofertas</h2>
      <div className="row row-cols-1 row-cols-md-4 g-4">
        {items.map(p => (
          <ProductCard key={p.id} {...p} />
        ))}
      </div>
    </>
  )
}
