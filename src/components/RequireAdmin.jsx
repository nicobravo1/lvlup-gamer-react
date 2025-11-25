import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function RequireAdmin({ children }) {
  const { user, loading } = useAuth()

  if (loading) return <p className="text-center mt-5">Cargando sesión...</p>

  const isAdmin = user?.role === 'admin'
  return isAdmin ? children : <Navigate to="/login" replace />
}
