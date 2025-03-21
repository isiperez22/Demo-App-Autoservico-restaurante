"use client"
import { useState } from 'react'
import { IoBagOutline } from 'react-icons/io5'
import ModalOrder from './ModalOrder'

export default function ButtonModalOrder() {

  const [show, setShow] = useState(false)

  return (
    <div className='w-full flex justify-center'>
      <button
        onClick = {() => setShow(!show)}
        className='flex flex-row items-center gap-2 fixed bottom-6 w-1/3 justify-center text-white font-bold p-3 rounded-3xl bg-violet-600 hover:bg-violet-500 
                      transition-colors ease-in-out duration-300'>
        <IoBagOutline size={24} /> Completar y pagar pedido
      </button>

      <ModalOrder
        show={show}
        setShow={setShow}
      />
    </div>

  )
}
