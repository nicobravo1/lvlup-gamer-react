// src/context/AuthContext.jsx
import { createContext, useContext, useState } from 'react'

export const AuthContext = createContext(null) // 👈 exportamos el contexto
const STORAGE_KEY = 'lvlup_user'

export function AuthProvider({ children }) {
  // Inicialización SINCRÓNICA desde localStorage para evitar “flicker” de null
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      return saved ? JSON.parse(saved) : null
    } catch {
      return null
    }
  })

  const login = (email, password) => {
    // Simulación simple de login
    const u = { email, name: email.split('@')[0] }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(u))
    setUser(u)
  }

  const register = (name, email, password) => {
    const u = { name, email }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(u))
    setUser(u)
  }

  const logout = () => {
    localStorage.removeItem(STORAGE_KEY)
    setUser(null)
  }

  const value = { user, login, register, logout }
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  return useContext(AuthContext)
}
