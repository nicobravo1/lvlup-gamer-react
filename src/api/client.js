// src/api/client.js
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

// GET /products (público)
export async function fetchProducts() {
  const res = await fetch(`${API_BASE_URL}/products`)
  if (!res.ok) throw new Error('Error cargando productos')
  return res.json()
}

// Helpers para llamadas que necesitan token
async function authFetch(path, options = {}, token) {
  const headers = {
    'Content-Type': 'application/json',
    ...(options.headers || {}),
  }

  if (token) {
    headers.Authorization = `Bearer ${token}`
  }

  const res = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers,
  })

  if (!res.ok) {
    let message = 'Error en la petición'
    try {
      const data = await res.json()
      if (data?.error) message = data.error
    } catch (_) {}
    throw new Error(message)
  }

  return res.status === 204 ? null : res.json()
}

// CRUD productos para admin
export function createProduct(producto, token) {
  return authFetch('/products', {
    method: 'POST',
    body: JSON.stringify(producto),
  }, token)
}

export function updateProduct(id, producto, token) {
  return authFetch(`/products/${id}`, {
    method: 'PUT',
    body: JSON.stringify(producto),
  }, token)
}

export function deleteProduct(id, token) {
  return authFetch(`/products/${id}`, {
    method: 'DELETE',
  }, token)
}
