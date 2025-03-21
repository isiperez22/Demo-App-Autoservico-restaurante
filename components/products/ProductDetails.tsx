import { OrderProducts } from '@/src/types'
import { getImagePath } from '@/src/utils'
import { useStore } from '@/src/utils/store'
import Image from 'next/image'
import { useEffect } from 'react'

type ProductDetailsProps = {
  product: OrderProducts
}

export default function ProductDetails({ product }: ProductDetailsProps) {

  const increaseQuantity = useStore(state=>state.increaseQuantity)
  const decreaseQuantity = useStore(state => state.decreaseQuantity)
  const removeProductOrder = useStore(state => state.removeProductOrder)

  useEffect(() => {
    if (product.quantity === 0) {
      removeProductOrder(product.id)
    }
  }, [product.id, product.quantity, removeProductOrder])

  return (
    <section className='flex flex-col '>
      <div className=' px-5 py-3 flex flex-row items-center justify-between'>
        <div className='flex flex-row justify-start items-center gap-5'>
          <Image
            width={75}
            height={75}
            quality={100}
            src={getImagePath(product.image)}
            alt={product.name}
          />
          <p>{product.name}</p>
        </div>
        <div className='flex flex-row justify-end items-center gap-2 sm:gap-5'>
          <button 
          onClick={() => decreaseQuantity(product.id)}
          className='w-5 h-5 rounded-full text-lg bg-[#252525] p-4 
                            flex items-center justify-center'>
            -
          </button>
          <p className='font-semibold'>x{product.quantity}</p>
          <button 
            onClick={() => increaseQuantity(product.id)}
            className='w-5 h-5 rounded-full text-lg bg-[#252525] p-4 
                            flex items-center justify-center'>
            +
          </button>
        </div>
      </div>
    </section>
  )
}
