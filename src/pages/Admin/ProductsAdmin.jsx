// src/pages/Admin/ProductsAdmin.jsx
import { useEffect, useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import {
  fetchProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from '../../api/client'

const EMPTY_FORM = {
  id: null,
  name: '',
  description: '',
  price: 0,
  stock: 0,
  image_url: '',
}

export default function ProductsAdmin() {
  const { user } = useAuth() // usamos el token y el rol del usuario
  const [list, setList] = useState([])
  const [form, setForm] = useState(EMPTY_FORM)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState(null)

  // Cargar productos desde la API al montar
  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true)
        const data = await fetchProducts()
        setList(data)
      } catch (err) {
        console.error(err)
        setError('No se pudieron cargar los productos.')
      } finally {
        setLoading(false)
      }
    }

    load()
  }, [])

  const onChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({
      ...prev,
      [name]:
        name === 'price' || name === 'stock'
          ? Number(value)
          : value,
    }))
  }

  const resetForm = () => setForm(EMPTY_FORM)

  const onEdit = (producto) => {
    setForm({
      id: producto.id,
      name: producto.name || '',
      description: producto.description || '',
      price: producto.price ?? 0,
      stock: producto.stock ?? 0,
      image_url: producto.image_url || '',
    })
  }

  const onDelete = async (id) => {
    if (!user?.token) {
      alert('No hay sesión válida.')
      return
    }
    if (!window.confirm('¿Seguro que quieres eliminar este producto?')) return

    try {
      await deleteProduct(id, user.token)
      setList((prev) => prev.filter((p) => p.id !== id))
    } catch (err) {
      console.error(err)
      alert(err.message || 'Error al eliminar producto')
    }
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    if (!user?.token) {
      alert('No hay sesión válida.')
      return
    }

    try {
      setSaving(true)
      setError(null)

      const payload = {
        name: form.name,
        description: form.description,
        price: form.price,
        stock: form.stock,
        image_url: form.image_url,
      }

      if (!form.id) {
        // Crear
        const created = await createProduct(payload, user.token)
        setList((prev) => [...prev, created])
      } else {
        // Actualizar
        const updated = await updateProduct(form.id, payload, user.token)
        setList((prev) =>
          prev.map((p) => (p.id === updated.id ? updated : p))
        )
      }

      resetForm()
    } catch (err) {
      console.error(err)
      setError(err.message || 'Error guardando producto')
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return <p className="text-center mt-5">Cargando productos...</p>
  }

  return (
    <div className="container py-4">
      <h2 className="mb-4 fw-bold">Administrar productos</h2>

      {error && <div className="alert alert-danger">{error}</div>}

      <div className="row g-4">
        {/* Formulario */}
        <div className="col-md-5">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title mb-3">
                {form.id ? 'Editar producto' : 'Nuevo producto'}
              </h5>

              <form onSubmit={onSubmit}>
                <div className="mb-3">
                  <label className="form-label">Nombre</label>
                  <input
                    name="name"
                    className="form-control"
                    value={form.name}
                    onChange={onChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Descripción</label>
                  <textarea
                    name="description"
                    className="form-control"
                    value={form.description}
                    onChange={onChange}
                    rows={2}
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Precio</label>
                  <input
                    name="price"
                    type="number"
                    min="0"
                    step="1000"
                    className="form-control"
                    value={form.price}
                    onChange={onChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Stock</label>
                  <input
                    name="stock"
                    type="number"
                    min="0"
                    className="form-control"
                    value={form.stock}
                    onChange={onChange}
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">URL de imagen</label>
                  <input
                    name="image_url"
                    className="form-control"
                    value={form.image_url}
                    onChange={onChange}
                  />
                </div>

                <div className="d-flex gap-2">
                  <button
                    type="submit"
                    className="btn btn-dark"
                    disabled={saving}
                  >
                    {saving
                      ? 'Guardando...'
                      : form.id
                      ? 'Actualizar'
                      : 'Crear'}
                  </button>
                  {form.id && (
                    <button
                      type="button"
                      className="btn btn-outline-secondary"
                      onClick={resetForm}
                    >
                      Cancelar edición
                    </button>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* Lista */}
        <div className="col-md-7">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title mb-3">Listado actual</h5>
              {list.length === 0 ? (
                <p>No hay productos.</p>
              ) : (
                <ul className="list-group">
                  {list.map((p) => (
                    <li
                      key={p.id}
                      className="list-group-item d-flex justify-content-between align-items-center"
                    >
                      <div>
                        <strong>{p.name}</strong> — $
                        {Number(p.price || 0).toLocaleString('es-CL')}
                        <div className="small text-muted">
                          Stock: {p.stock ?? 0}
                        </div>
                      </div>
                      <div className="d-flex gap-2">
                        <button
                          className="btn btn-sm btn-outline-primary"
                          onClick={() => onEdit(p)}
                        >
                          Editar
                        </button>
                        <button
                          className="btn btn-sm btn-outline-danger"
                          onClick={() => onDelete(p.id)}
                        >
                          Eliminar
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
