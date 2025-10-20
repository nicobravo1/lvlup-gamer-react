import { createContext, useContext, useMemo, useState } from 'react'

const CartCtx = createContext(null)

export function CartProvider({ children }) {
  const [items, setItems] = useState([]) // {id,name,price,qty}

  const add = (product, qty = 1) => {
    setItems(prev => {
      const f = prev.find(i => i.id === product.id)
      if (f) return prev.map(i => i.id === product.id ? { ...i, qty: i.qty + qty } : i)
      return [...prev, { id: product.id, name: product.name, price: product.price, qty }]
    })
  }
  const remove = (id) => setItems(prev => prev.filter(i => i.id !== id))
  const clear = () => setItems([])
  const total = useMemo(() => items.reduce((a, i) => a + i.price * i.qty, 0), [items])

  return (
    <CartCtx.Provider value={{ items, add, remove, clear, total }}>
      {children}
    </CartCtx.Provider>
  )
}

export const useCart = () => useContext(CartCtx)
