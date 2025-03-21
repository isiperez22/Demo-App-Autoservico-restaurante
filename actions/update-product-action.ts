"use server"

import { prisma } from "@/src/lib/prisma"
import { ProductSchema } from "@/src/schema"
import { revalidatePath } from "next/cache"

export async function updateProduct(data: unknown, id: number) {
  const result = ProductSchema.safeParse(data)

  if (!result.success) {
    return {
      errors: result.error.issues
    }
  }

  await prisma.products.update({
    where: {
      id
    },
    data: {
      name: result.data.name,
      price: parseFloat(Number(result.data.price).toFixed(2)),
      categoryId: Number(result.data.categoryId),
      lastUserChange: result.data.lastUserChange,
      image: result.data.image,
      available: true,
      description: ""
    }
  })

  revalidatePath('/manager/dahsboard/inventary')
}