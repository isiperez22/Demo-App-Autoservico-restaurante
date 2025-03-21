"use server"

import { prisma } from "@/src/lib/prisma"
import { ProductSchema } from "@/src/schema"

export async function createProdcut(data: unknown) {
  const result = ProductSchema.safeParse(data)

  if(!result.success) {
    return {
      errors: result.error.issues
    }
  }

  await prisma.products.create({
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
}