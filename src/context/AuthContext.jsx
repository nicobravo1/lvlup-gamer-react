import { createContext, useContext, useState, useEffect } from 'react'

const AuthCtx = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)

  // Cargar usuario si existe en localStorage
  useEffect(() => {
    const saved = localStorage.getItem('lvlup_user')
    if (saved) setUser(JSON.parse(saved))
  }, [])

  const login = (email, password) => {
    // simulación simple
    const u = { email, name: email.split('@')[0] }
    localStorage.setItem('lvlup_user', JSON.stringify(u))
    setUser(u)
  }

  const register = (name, email, password) => {
    const u = { name, email }
    localStorage.setItem('lvlup_user', JSON.stringify(u))
    setUser(u)
  }

  const logout = () => {
    localStorage.removeItem('lvlup_user')
    setUser(null)
  }

  return (
    <AuthCtx.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthCtx.Provider>
  )
}

export const useAuth = () => useContext(AuthCtx)
