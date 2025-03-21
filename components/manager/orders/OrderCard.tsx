import { completeOrder } from '@/actions/complete-order-action'
import { OrderWithProdcuts } from '@/src/types'
import { toEuro } from '@/src/utils'
import React from 'react'

type OrderCardProps = {
  order: OrderWithProdcuts
}

export default function OrderCard({order}: OrderCardProps) {

  return (
    <section className='mt-10 bg-white shadow-lg rounded-3xl grid grid-rows-1'>
      <div className='text-xl mx-10 mt-5'>
        <p>Nombre: <span className='font-bold'>{order.name}</span></p>
      </div>
      <div className='mx-10'>
        <dl className='mt-6 space-y-4 '>
          {order.orderProducts.map(product => (
            <div
              key={product.id}
              className='flex flex-row justify-between border-b-2 border-gray-300 space-y-1 items-center'
            >
              <dt className='font-semibold'>x{product.quantity}</dt>
              <dd>{product.product.name}</dd>
            </div>
          ))}
          <div className='flex flex-row justify-between'>
            <dt className='text-xl'>Total a pagar: </dt>
            <dd className='text-xl font-semibold'>{toEuro(order.total)}</dd>
          </div>
        </dl>
      </div>
      <form action={completeOrder}>
        <input 
          type="hidden"
          value={order.id}
          name='order_id'
        />
        <button className='w-full bg-violet-600 text-white mt-5 uppercase text-center 
                          hover:bg-violet-500 p-3 font-bold rounded-b-3xl min-h-[1vh]'
        >
            Completar orden
        </button>
      </form>
    </section>
  )
}
