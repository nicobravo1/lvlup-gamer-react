// src/pages/__tests__/Categories.spec.js
import React from 'react'
import { screen } from '@testing-library/react'
import { renderWithProviders } from '../../test/utils.jsx'
import Categories from '../Categories.jsx'

describe('Categories page', () => {
  it('filtra por categoría (?cat=teclados)', () => {
    renderWithProviders(<Categories />, { route: '/categorias?cat=teclados' })

    // ✅ Asegura que aparece un teclado conocido
    expect(screen.getByText('Corsair K70 RGB Pro')).toBeTruthy()

    // ❌ Y que NO aparece un producto de otra categoría (ej. mouse)
    expect(screen.queryByText('Logitech G502 HERO')).toBeNull()

    // Opcional: verificar que hay al menos 1 card (h5) en pantalla
    const headings = screen.getAllByRole('heading', { level: 5 })
    expect(headings.length).toBeGreaterThan(0)
  })

  it('filtra por búsqueda (?search=logitech)', () => {
    renderWithProviders(<Categories />, { route: '/categorias?search=logitech' })

    // Toma todos los títulos de producto (h5) y cuenta los que contienen "logitech"
    const titles = screen.getAllByRole('heading', { level: 5 })
    const logi = titles.filter(h => /logitech/i.test(h.textContent ?? ''))

    // Debe haber al menos 1 resultado de Logitech
    expect(logi.length).toBeGreaterThan(0)

    // (Opcional) Asegura que un producto Logitech conocido está presente
    expect(
      screen.getByText('Logitech G Pro X TKL Lightspeed')
    ).toBeTruthy()
  })
})
