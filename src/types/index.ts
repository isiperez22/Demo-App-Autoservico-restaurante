import { Order, Products, OrderProducts as OrderP } from "@prisma/client";


export type OrderProducts = Pick<Products, 'id' | 'name' | 'price' | 'image'> & {
  quantity: number
  subtotal: number
}

export type OrderWithProdcuts = Order & {
  orderProducts: (OrderP & {
    product: Products
  })[]
}