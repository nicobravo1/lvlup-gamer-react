import { useMemo } from 'react'
import { useLocation } from 'react-router-dom'
import products from '../data/products.json'
import ProductCard from '../components/ProductCard'

function useQuery() {
  return new URLSearchParams(useLocation().search)
}

export default function Categories() {
  const q = useQuery()
  const cat = q.get('cat')
  const search = (q.get('search') || '').toLowerCase()

  const items = useMemo(() => {
    let list = [...products]
    if (cat) list = list.filter(p => p.category === cat)
    if (search) list = list.filter(p => p.name.toLowerCase().includes(search))
    return list
  }, [cat, search])

  return (
    <>
      <h2 className="mb-3">Categorías {cat && <small className="text-muted">/ {cat}</small>}</h2>
      {search && <p className="text-muted">Búsqueda: “{search}”</p>}
      <div className="row row-cols-1 row-cols-md-4 g-4">
        {items.map(p => <ProductCard key={p.id} {...p} />)}
      </div>
    </>
  )
}
