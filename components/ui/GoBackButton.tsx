'use client'
import { useRouter } from 'next/navigation'

export default function GoBackButton() {
  const router = useRouter()
  return (
    <button
          onClick={() => router.back()}
          className='bg-violet-600 w-full text-white rounded lg:w-auto px-10 py-3 text-center font-semibold 
          cursor-pointer hover:bg-violet-500'
      >
        Volver a productos
      </button>
  )
}
