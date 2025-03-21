"use server"

import { prisma } from "@/src/lib/prisma"
import { revalidatePath } from "next/cache"

export async function deleteUser(formData : FormData) {

  const data = Number(formData.get("id"))

  console.log(data)

  try {
    await prisma.user.deleteMany({
      where: {
        id: data
      }
    })
    revalidatePath("/manager/dashboard/user")
  } catch (error) {
    console.log(error)
  }
}