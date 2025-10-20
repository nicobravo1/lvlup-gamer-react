import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function RequireAdmin({ children }) {
  const { user } = useAuth()
  const isAdmin = !!user && user.email.endsWith('@demo.cl') // regla simple
  return isAdmin ? children : <Navigate to="/login" replace />
}
