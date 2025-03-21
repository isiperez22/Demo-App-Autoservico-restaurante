"use server"
import { signIn } from "@/src/lib/auth"
import { UserSchema } from "@/src/schema"



export async function loginUser(formData: FormData) {
  const data = {
    username: formData.get('username'),
    password: formData.get('password')
  }

  const result = UserSchema.safeParse(data)

  if (!result.success) {
    return {
      errors: result.error.issues
    }
  }

  try {

    const res = await signIn("credentials", {
      redirect: false,
      username: data.username,
      password: data.password
    })

    console.log(res)
    if(!res || res.error) {
      return {errors: [res?.error || "Error en la autenticación"]}
    }

    return {success: true}

  } catch (error) {
    if (error instanceof Error) {
      return {
        errors: [{ message: error.message }]
      };
    }
    return {
      errors: [{ message: "Error desconocido durante la autenticación" }]
    };
  }
}