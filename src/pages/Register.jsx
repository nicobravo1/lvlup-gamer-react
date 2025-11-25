import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { useNavigate, Link } from 'react-router-dom'

export default function Register() {
  const { register, authError } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState({ name: '', email: '', password: '' })
  const [submitting, setSubmitting] = useState(false)
  const [localError, setLocalError] = useState(null)

  const onChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }))

  const onSubmit = async (e) => {
    e.preventDefault()
    setLocalError(null)

    try {
      setSubmitting(true)
      await register(form.name, form.email, form.password)
      navigate('/') // queda logueado y vuelve al Home
    } catch (err) {
      console.error(err)
      setLocalError(err.message || 'Error al registrarse')
    } finally {
      setSubmitting(false)
    }
  }

  const errorMessage = localError || authError

  return (
    <div className="col-md-6 mx-auto">
      <h2 className="mb-3">Crear Cuenta</h2>

      {errorMessage && (
        <div className="alert alert-danger">{errorMessage}</div>
      )}

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
          <label className="form-label">Correo electrónico</label>
          <input
            name="email"
            type="email"
            className="form-control"
            value={form.email}
            onChange={onChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Contraseña</label>
          <input
            name="password"
            type="password"
            className="form-control"
            value={form.password}
            onChange={onChange}
            required
            minLength={6}
          />
        </div>
        <button className="btn btn-dark w-100" disabled={submitting}>
          {submitting ? 'Creando cuenta...' : 'Registrarme'}
        </button>
      </form>
      <p className="mt-3 text-center">
        ¿Ya tienes cuenta? <Link to="/login">Inicia sesión</Link>
      </p>
    </div>
  )
}

