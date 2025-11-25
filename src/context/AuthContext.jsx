// src/context/AuthContext.jsx
import { createContext, useContext, useEffect, useState } from 'react'

export const AuthContext = createContext(null)
const STORAGE_KEY = 'lvlup_user'

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [authError, setAuthError] = useState(null)

  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL

  const saveUser = (u) => {
    if (u) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(u))
    } else {
      localStorage.removeItem(STORAGE_KEY)
    }
    setUser(u)
  }

  // Al cargar la app: intentar recuperar sesión previa llamando a /me
  useEffect(() => {
    const init = async () => {
      try {
        const saved = localStorage.getItem(STORAGE_KEY)
        if (!saved) {
          setLoading(false)
          return
        }

        const parsed = JSON.parse(saved)
        if (!parsed?.token) {
          saveUser(null)
          setLoading(false)
          return
        }

        const res = await fetch(`${apiBaseUrl}/me`, {
          headers: { Authorization: `Bearer ${parsed.token}` },
        })

        if (!res.ok) {
          saveUser(null)
          setLoading(false)
          return
        }

        const profile = await res.json()
        saveUser({ ...profile, token: parsed.token })
      } catch (err) {
        console.error('Error inicializando auth:', err)
        saveUser(null)
      } finally {
        setLoading(false)
      }
    }

    init()
  }, [apiBaseUrl])

  // LOGIN contra backend
  const login = async (email, password) => {
    setAuthError(null)

    const res = await fetch(`${apiBaseUrl}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    })

    if (!res.ok) {
      let message = 'Error al iniciar sesión'
      try {
        const data = await res.json()
        if (data?.error) message = data.error
      } catch (_) {}
      setAuthError(message)
      throw new Error(message)
    }

    const data = await res.json()
    const { token, user: profile } = data

    const fullUser = { ...profile, token }
    saveUser(fullUser)
    return fullUser
  }

  // REGISTER contra backend
  const register = async (name, email, password) => {
    setAuthError(null)

    const res = await fetch(`${apiBaseUrl}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password }),
    })

    if (!res.ok) {
      let message = 'Error al registrarse'
      try {
        const data = await res.json()
        if (data?.error) message = data.error
      } catch (_) {}
      setAuthError(message)
      throw new Error(message)
    }

    const data = await res.json()
    const { token, user: profile } = data

    const fullUser = { ...profile, token }
    saveUser(fullUser)
    return fullUser
  }

  const logout = () => {
    saveUser(null)
  }

  const value = { user, loading, authError, login, register, logout }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  return useContext(AuthContext)
}


