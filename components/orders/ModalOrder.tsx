'use client'
import { useStore } from '@/src/utils/store'
import React, { Dispatch, SetStateAction, useMemo } from 'react'
import { RxCross1 } from 'react-icons/rx'
import ProductDetails from '../products/ProductDetails'
import { toEuro } from '@/src/utils'
import { createOrder } from '@/actions/create-order-action'
import { OrderSchema } from '@/src/schema'
import { toast } from 'react-toastify'

type ModalOrderProps = {
  show: boolean,
  setShow: Dispatch<SetStateAction<boolean>>
}

export default function ModalOrder({ show, setShow }: ModalOrderProps) {

  const order = useStore(state => state.order)
  const clearOrder = useStore(state => state.clearOrder)
  const total = useMemo(() => order.reduce((acumulador, item) => acumulador + item.subtotal, 0), [order])

  const handleCreateOrder = async (formData: FormData) => {
    const data = {
      name: formData.get('name'),
      total,
      order
    }

    const result = OrderSchema.safeParse(data)
    
    if(!result.success){
      result.error.issues.forEach(issue => {
        toast.error(issue.message)
      })
      return
    }

    if(order.length === 0) return

    const response = await createOrder(data)
    if(response?.errors){
      response.errors.forEach(issue => {
        toast.error(issue.message)
      })
      return
    }
    toast.success('Orden creada con exito')
    setShow(!show)
    clearOrder()
  }
  return (
    <>
      {show && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <section className="bg-[#1f1f1f] rounded-3xl mx-5 xs:text-base lg:text-xl shadow-lg w-full lg:w-2/3">
            <div className='p-5'>
              <div className="text-3xl flex flex-row w-full justify-between">
                <h1 className="font-bold">Revisar orden y pagar</h1>
                <button onClick={() => setShow(!show)} className="text-slate-500">
                  <RxCross1 />
                </button>
              </div>
              <div className='mt-10'>
                {order.length === 0 ? <p className='text-center'>El carraito esta vacio</p> : (
                  order.map(product => (
                    <ProductDetails
                      key={product.id}
                      product={product}
                    />
                  ))
                )}
                <p className='text-right text-3xl font-black'>
                  Total a pagar: {toEuro(total)}
                </p>
              </div>
            </div>
            <form action={handleCreateOrder}>
              <div className='mx-10 mt-5'>
                <input 
                  type='text' 
                  placeholder='Tu nombre' 
                  className='w-full p-3 rounded-md bg-[#1f1f1f] border-2'
                  name='name'
                  />
              </div>
              <input
                type='submit'
                className='w-full text-center bg-violet-600 hover:bg-violet-500 transition-colors ease-in-out duration-300
                           p-5 mt-5 uppercase rounded-b-3xl font-semibold cursor-pointer disabled:bg-gray-400'
                value='Completar orden'
                disabled={order.length === 0}
              />              
            </form>
          </section>
        </div>
      )}
    </>
  )
}
