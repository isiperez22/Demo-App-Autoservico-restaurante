'use client'
import { Products } from '@prisma/client'
import React from 'react'
import Image from 'next/image'
import { getImagePath, toEuro } from '@/src/utils'
import { useStore } from '@/src/utils/store'

type CardProductsProps = {
  product: Products
}


export default function CardProducts({product} : CardProductsProps) {

  const addToOrder = useStore(state => state.addToOrder)
  
  const imagePath = getImagePath(product.image)

  return (
    <div className='flex flex-col rounded-2xl mt-5'>
      <Image
        width={200}
        height={200}
        quality={100}
        src={imagePath}
        alt={product.name}
        className='rounded-t-2xl w-full mx-0'
      />
      <div className='space-y-2 px-5 py-3 bg-[#252525]'>
        <h2
          className='text-2xl font-black'
        >
          {product.name}
        </h2>
        <p className='font-bold text-2xl'>
          {toEuro(product.price)}
        </p>
      </div>
      <button
        onClick={() => addToOrder(product)}
        className='px-4 py-2 font-bold bg-violet-600 w-full rounded-b-2xl hover:bg-violet-700 transition-colors ease-in-out duration-300'
      >
        Añadir al carrito
      </button>
    </div>
    
  )
}
