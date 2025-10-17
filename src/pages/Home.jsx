import products from '../data/products.json' 
import ProductCard from '../components/ProductCard'


export default function Home({ addToCart }) {
  return (
    
    <div className="container py-4"> 
      <h2 className="mb-4">Productos</h2>
      
      
      <div className="row row-cols-1 row-cols-md-4 g-4"> 
        {products.map(p => (
          <ProductCard 
            key={p.id} 
            {...p} 
            addToCart={addToCart} 
          />
        ))}
      </div>
    </div>
  )
}