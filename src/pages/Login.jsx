import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { useNavigate, Link } from 'react-router-dom'

export default function Login() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState({ email: '', password: '' })

  const onChange = (e) => setForm(f => ({ ...f, [e.target.name]: e.target.value }))
  const onSubmit = (e) => {
    e.preventDefault()
    login(form.email, form.password)          // guarda en localStorage y en contexto
    navigate('/')                              // vuelve al Home
  }

  return (
    <div className="col-md-6 mx-auto">
      <h2 className="mb-3">Iniciar Sesión</h2>
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
        <button className="btn btn-dark w-100">Entrar</button>
      </form>
      <p className="mt-3 text-center">
        ¿No tienes cuenta? <Link to="/registro">Crear cuenta</Link>
      </p>
    </div>
  )
}
