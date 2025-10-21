// src/components/__tests__/RequireAdmin.spec.js
import React from 'react'
import { render, screen } from '@testing-library/react'
import { MemoryRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from '../../context/AuthContext.jsx'
import RequireAdmin from '../RequireAdmin.jsx'

function AppRoutes() {
  return (
    <Routes>
      <Route
        path="/admin"
        element={
          <RequireAdmin>
            <div data-testid="admin-page">Admin OK</div>
          </RequireAdmin>
        }
      />
      <Route path="/login" element={<div data-testid="login-page">Login</div>} />
    </Routes>
  )
}

function renderAt(route = '/admin') {
  return render(
    <AuthProvider>
      <MemoryRouter initialEntries={[route]}>
        <AppRoutes />
      </MemoryRouter>
    </AuthProvider>
  )
}

describe('RequireAdmin', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('redirige a /login si no hay usuario', () => {
    renderAt('/admin')
    expect(screen.getByTestId('login-page')).toBeTruthy()
  })

  it('redirige a /login si el usuario no es admin', () => {
    localStorage.setItem('lvlup_user', JSON.stringify({
      name: 'Pepe',
      email: 'pepe@correo.com'
    }))
    renderAt('/admin')
    expect(screen.getByTestId('login-page')).toBeTruthy()
  })

  it('renderiza el contenido si el usuario es admin (@demo.cl)', () => {
    localStorage.setItem('lvlup_user', JSON.stringify({
      name: 'Admin',
      email: 'admin@demo.cl'
    }))
    renderAt('/admin')
    expect(screen.getByTestId('admin-page')).toBeTruthy()
  })
})
