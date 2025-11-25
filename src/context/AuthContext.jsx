// src/context/AuthContext.jsx
import { createContext, useContext, useEffect, useState } from 'react'
import { supabase } from '../supabase/supabaseClient'

export const AuthContext = createContext(null)
const STORAGE_KEY = 'lvlup_user'

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      return saved ? JSON.parse(saved) : null
    } catch {
      return null
    }
  })
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

  // 🔄 Al montar la app, intentar recuperar sesión existente
  useEffect(() => {
    const init = async () => {
      try {
        const { data } = await supabase.auth.getSession()
        const session = data?.session
        if (!session?.access_token) {
          saveUser(null)
          return
        }

        const token = session.access_token

        const res = await fetch(`${apiBaseUrl}/me`, {
          headers: { Authorization: `Bearer ${token}` }
        })

        if (!res.ok) {
          saveUser(null)
          return
        }

        const profile = await res.json() // { id, email, role }
        saveUser({ ...profile, token })
      } catch (err) {
        console.error('Error inicializando auth:', err)
        saveUser(null)
      } finally {
        setLoading(false)
      }
    }

    init()
  }, [apiBaseUrl])

  // 🔐 Login con Supabase + backend /me
  const login = async (email, password) => {
    setAuthError(null)

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    })

    if (error) {
      console.error('Error login Supabase:', error)
      setAuthError(error.message)
      throw error
    }

    const token = data.session.access_token

    const res = await fetch(`${apiBaseUrl}/me`, {
      headers: { Authorization: `Bearer ${token}` }
    })

    if (!res.ok) {
      const text = await res.text()
      throw new Error('No se pudo obtener el perfil: ' + text)
    }

    const profile = await res.json()
    const fullUser = { ...profile, token } // {id,email,role,token}
    saveUser(fullUser)
    return fullUser
  }

  // 🆕 Registro de usuario (rol cliente)
  const register = async (name, email, password) => {
    setAuthError(null)

    const { data, error } = await supabase.auth.signUp({
      email,
      password
    })

    if (error) {
      console.error('Error registro Supabase:', error)
      setAuthError(error.message)
      throw error
    }

    const newUser = data.user
    if (newUser) {
      // Creamos el perfil en la tabla profiles con rol "cliente"
      const { error: profileError } = await supabase
        .from('profiles')
        .insert({
          id: newUser.id,
          email,
          role: 'cliente'
        })

      if (profileError) {
        console.error('Error creando perfil:', profileError)
      }
    }

    // Después del registro, hacemos login automático
    return login(email, password)
  }

  const logout = async () => {
    await supabase.auth.signOut()
    saveUser(null)
  }

  const value = { user, loading, authError, login, register, logout }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  return useContext(AuthContext)
}

