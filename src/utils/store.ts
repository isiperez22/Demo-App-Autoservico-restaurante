import { create } from 'zustand';
import { OrderProducts } from '../types';
import { Products } from '@prisma/client';

interface Store {
  order: OrderProducts[]
  addToOrder: (product: Products) => void
  increaseQuantity: (id: Products['id']) => void
  decreaseQuantity: (id: Products['id']) => void
  removeProductOrder: (id: Products['id']) => void,
  clearOrder: () => void
}

export const useStore = create<Store>((set, get) => ({
  order: [],
  addToOrder: (product) => {

    const { id, name, price, image } = product

    let order: OrderProducts[] = []

    if (get().order.find(item => item.id === id)) {
      order = get().order.map(item => item.id === id ? {
        ...item,
        quantity: item.quantity + 1,
        subtotal: (item.quantity + 1) * item.price
      } : item)
    } else {
      order = [...get().order, {
        id,
        name,
        price,
        image,
        quantity: 1,
        subtotal: 1 * price
      }]
    }
    set(() => ({
      order
    }))
  },
  increaseQuantity: (id) => {
    const order = get().order.map(item => item.id === id ? {
      ...item,
      quantity: item.quantity + 1,
      subtotal: (item.quantity + 1) * item.price
    } :
      item
    )
    set(() => ({
      order
    }))
  },
  decreaseQuantity: (id) => {
    const order = get().order.map(item => item.id === id ? {
      ...item, 
      quantity: item.quantity - 1,
      subtotal: (item.quantity - 1) * item.price
    }: item)

    order.filter(item => item.quantity > 0)
    
    set(() => ({
      order
    }))
  },
  removeProductOrder: (id) => {
    const order = get().order.filter(item => item.id !== id)

    set(() => ({
      order
    }))
  },
  clearOrder: () =>{
    set(() => ({
      order: []
    }))
  }
}))