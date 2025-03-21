
import { OrderWithProdcuts } from '@/src/types'
import React from 'react'

type LatestOrderItemProps = {
  order : OrderWithProdcuts
}

export default function LatestOrderItem({order} : LatestOrderItemProps) {
  return (
    <div className='bg-[#252525] shadow-2xl p-5 space-y-5 rounded-lg'>
        <p className='text-lg font-semibold'>
          Cliente: {order.name}
        </p>
        <ul
          className='divide-y divide-gray-200 border-t border-gray-900 text-sm' 
          role='list'>
            {order.orderProducts.map(product => (
              <li
                key={product.id}
                className='flex py-6 text-lg'
              > 
                <p>{product.product.name} <span className='font-bold'>x{product.quantity}</span></p>
              </li>
            ))}
        </ul>
    </div>
  )
}
