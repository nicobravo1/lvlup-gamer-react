import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { useNavigate, Link } from 'react-router-dom'

export default function Login() {
  const { login, authError } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState({ email: '', password: '' })
  const [loading, setLoading] = useState(false)

  const onChange = (e) =>
    setForm(f => ({ ...f, [e.target.name]: e.target.value }))

  const onSubmit = async (e) => {
    e.preventDefault()
    try {
      setLoading(true)
      await login(form.email, form.password)   // ahora esperamos el login
      navigate('/')                            // vuelve al Home si salió bien
    } catch (err) {
      // ya se maneja un mensaje en authError, pero por si acaso:
      console.error(err)
      alert('Error al iniciar sesión: ' + (err.message || 'Revisa tus datos'))
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="col-md-6 mx-auto">
      <h2 className="mb-3">Iniciar Sesión</h2>

      {authError && (
        <div className="alert alert-danger">
          {authError}
        </div>
      )}

      <form onSubmit={onSubmit}>
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
          {loading ? 'Entrando...' : 'Entrar'}
        </button>
      </form>

      <p className="mt-3 text-center">
        ¿No tienes cuenta? <Link to="/registro">Crear cuenta</Link>
      </p>
    </div>
  )
}

