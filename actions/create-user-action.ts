'use server'

import { prisma } from "@/src/lib/prisma"
import { UserSchema } from "@/src/schema"
import bcrypt from "bcrypt";


export async function createUser(data: unknown) {

  const saltRounds = 10

  const result = UserSchema.safeParse(data)

  console.log(result)

  if(!result.success){
    return {
      errors: result.error.issues
    }
  }

  try {

    const hashedPassword = await bcrypt.hash(result.data.password, saltRounds)

    await prisma.user.create({
      data: {
        username: result.data.username,
        password: hashedPassword,
        email: 'test@test.com'
      }
    })
  } catch (error) {
    console.log(error)
  }
}