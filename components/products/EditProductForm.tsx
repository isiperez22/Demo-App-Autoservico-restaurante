"use client"
import { updateProduct } from '@/actions/update-product-action'
import { ProductSchema } from '@/src/schema'
import { useParams, useRouter } from 'next/navigation'
import React from 'react'
import { toast } from 'react-toastify'


export default function EditProductForm({ children }: { children: React.ReactNode }) {

  const router = useRouter()
  const params = useParams()
  const id = Number(params.id)

  const handleSubmit = async (formData: FormData) => {
    const data = {
      name: formData.get('name'),
      price: formData.get('price'),
      categoryId: formData.get('categoryId'),
      lastUserChange: Number(formData.get('lastUserChange')),
      image: formData.get('image')
    }

    const result = ProductSchema.safeParse(data)
    if(!result.success){
      result.error.issues.forEach(issue => {
        toast.error(issue.message)
      })
      return
    }

    const response = await updateProduct(result.data, id)
    if(response?.errors) {
      response.errors.forEach(error => {
        toast.error(error.message)
      })
      return
    }

    toast.success("Producto actualizado")
    router.push('/manager/dashboard/inventary')
  }

  return (
    <div className='bg-white mt-10 rounded-3xl shadow-2xl max-w-3xl mx-auto'>
      <form
        className='space-y-5'
        action={handleSubmit}
      >
        {children}

        <button
          className='mt-10 font-semibold text-white uppercase bg-violet-600 p-3 rounded-b-3xl w-full hover:bg-violet-500'
        >
          Editar producto
        </button>
      </form>
    </div>
  )
}
