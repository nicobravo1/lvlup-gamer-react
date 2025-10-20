const KEY = 'lvlup_orders_v1'

const load = () => JSON.parse(localStorage.getItem(KEY) || '[]')
const save = (arr) => localStorage.setItem(KEY, JSON.stringify(arr))

export const Orders = {
  list: () => load(),
  create: (order) => {
    const all = load()
    const withId = { ...order, id: `o_${Date.now()}` }
    all.push(withId)
    save(all)
    return withId
  }
}
