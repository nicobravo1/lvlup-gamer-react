import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { useNavigate, Link } from 'react-router-dom'

export default function Register() {
  const { register, authError } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState({ name: '', email: '', password: '' })
  const [loading, setLoading] = useState(false)

  const onChange = (e) =>
    setForm(f => ({ ...f, [e.target.name]: e.target.value }))

  const onSubmit = async (e) => {
    e.preventDefault()
    try {
      setLoading(true)
      await register(form.name, form.email, form.password) // crea usuario + perfil + login
      navigate('/')                                        // vuelve al Home ya logueado
    } catch (err) {
      console.error(err)
      alert('Error al registrarse: ' + (err.message || 'Intenta nuevamente'))
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="col-md-6 mx-auto">
      <h2 className="mb-3">Crear Cuenta</h2>

      {authError && (
        <div className="alert alert-danger">
          {authError}
        </div>
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
          />
        </div>
        <button
          className="btn btn-dark w-100"
          type="submit"
          disabled={loading}
        >
          {loading ? 'Creando cuenta...' : 'Registrarme'}
        </button>
      </form>

      <p className="mt-3 text-center">
        ¿Ya tienes cuenta? <Link to="/login">Inicia sesión</Link>
      </p>
    </div>
  )
}

