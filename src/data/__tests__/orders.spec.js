// src/data/__tests__/orders.spec.js
import { Orders } from '../orders.js'

describe('Orders helper', () => {
  let store

  beforeEach(() => {
    // Mock de localStorage en memoria para NO tocar tu storage real
    store = {}
    spyOn(window.localStorage, 'getItem').and.callFake((k) => {
      return Object.prototype.hasOwnProperty.call(store, k) ? store[k] : null
    })
    spyOn(window.localStorage, 'setItem').and.callFake((k, v) => {
      store[k] = String(v)
    })
  })

  it('create guarda una orden con id y list la devuelve', () => {
    const data = {
      buyer: { name: 'Nico', email: 'nico@demo.cl', address: 'Av 123' },
      items: [{ id: 'p1', name: 'Headset', price: 10000, qty: 2 }],
      total: 20000,
      createdAt: '2025-10-21T00:00:00.000Z'
    }

    const created = Orders.create(data)

    // Debe devolver un objeto con id (usamos prefijo típico "o_")
    expect(created).toBeTruthy()
    expect(created.id).toMatch(/^o_/)

    // Y quedar persistido en el storage mockeado
    const all = Orders.list()
    expect(Array.isArray(all)).toBeTrue()
    expect(all.length).toBe(1)
    expect(all[0].id).toBe(created.id)
    expect(all[0].total).toBe(20000)
  })
})
