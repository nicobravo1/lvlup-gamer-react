import { useEffect, useState } from 'react'
import seed from '../../data/products.json'

const KEY = 'lvlup_products_v1'

const load = () => {
  const raw = localStorage.getItem(KEY)
  return raw ? JSON.parse(raw) : seed
}
const save = (list) => localStorage.setItem(KEY, JSON.stringify(list))

export default function ProductsAdmin() {
  const [list, setList] = useState(load())
  const [form, setForm] = useState({ id:'', name:'', price:0, category:'', img:'', offer:false })

  useEffect(() => { save(list) }, [list])

  const onChange = e => {
    const { name, value, type, checked } = e.target
    setForm(f => ({ ...f, [name]: type === 'checkbox' ? checked : value }))
  }

  const create = () => {
    const id = form.id || `p_${Date.now()}`
    const price = Number(form.price)
    setList(prev => [...prev, { ...form, id, price }])
    setForm({ id:'', name:'', price:0, category:'', img:'', offer:false })
  }

  const remove = (id) => setList(prev => prev.filter(p => p.id !== id))

  return (
    <>
      <h3 className="mb-3">Productos</h3>
      <div className="row g-3">
        <div className="col-md-5">
          <div className="card p-3">
            <h5>Crear/Editar</h5>
            <input name="id" className="form-control mb-2" placeholder="id (opcional)" value={form.id} onChange={onChange}/>
            <input name="name" className="form-control mb-2" placeholder="Nombre" value={form.name} onChange={onChange}/>
            <input name="price" type="number" className="form-control mb-2" placeholder="Precio" value={form.price} onChange={onChange}/>
            <input name="category" className="form-control mb-2" placeholder="Categoría" value={form.category} onChange={onChange}/>
            <input name="img" className="form-control mb-2" placeholder="/img/headset.png" value={form.img} onChange={onChange}/>
            <div className="form-check mb-3">
              <input id="offer" name="offer" type="checkbox" className="form-check-input" checked={form.offer} onChange={onChange}/>
              <label className="form-check-label" htmlFor="offer">Oferta</label>
            </div>
            <button className="btn btn-dark" onClick={create}>Guardar</button>
            <p className="text-muted mt-2">* Se persiste en localStorage.</p>
          </div>
        </div>

        <div className="col-md-7">
          <ul className="list-group">
            {list.map(p => (
              <li key={p.id} className="list-group-item d-flex justify-content-between align-items-center">
                <div>
                  <strong>{p.name}</strong> — ${p.price.toLocaleString('es-CL')}
                  <div className="small text-muted">{p.category} {p.offer && '· Oferta'}</div>
                </div>
                <button className="btn btn-sm btn-outline-danger" onClick={() => remove(p.id)}>Eliminar</button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  )
}
