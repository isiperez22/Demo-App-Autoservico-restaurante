import { auth } from "@/src/lib/auth"
import { prisma } from "@/src/lib/prisma"
import { redirect } from "next/navigation"
import ImageUpload from "./ImageUpload"
import { Products } from "@prisma/client"

async function getCategories() {
  return await prisma.category.findMany()
}

type ProductFormProps = {
  product?: Products
}

export default async function ProductForm({product} : ProductFormProps) {

  const categories = await getCategories()
  const session = await auth()
  if (!session) redirect("/manager/login")

  return (
    <div className='p-5 space-y-5 flex flex-col '>
      <div className="space-y-2">
        <label
          className="text-slate-800"
          htmlFor="name"
        >Nombre del producto:</label>
        <input
          id="name"
          type="text"
          name="name"
          className="block w-full p-3 bg-slate-100"
          defaultValue={product?.name}
        />
      </div>

      <div className="space-y-2">
        <label
          className="text-slate-800"
          htmlFor="price"
        >Precio del producto:</label>
        <input
          id="price"
          name="price"
          className="block w-full p-3 bg-slate-100"
          defaultValue={product?.price}
        />
      </div>

      <div className="space-y-2">
        <label
          className="text-slate-800"
          htmlFor="categoryId"
        >Categoría:</label>
        <select
          className="block w-full p-3 bg-slate-100"
          id="categoryId"
          name="categoryId"
          defaultValue={product?.categoryId}
        >
          <option defaultValue="">-- Seleccione --</option>
          {
            categories.map(category => (
              <option
                key={category.id}
                value={category.id}>{category.name}</option>
            ))
          }

        </select>
      </div>
      <ImageUpload 
        image={product?.image}
      />
      {session.user && <input hidden name="lastUserChange" defaultValue={Number(session.user.id)} />}
    </div>
  )
}
