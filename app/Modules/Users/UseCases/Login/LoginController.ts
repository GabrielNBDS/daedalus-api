import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import LoginValidator from 'App/Modules/Users/UseCases/Login/LoginValidator'

export default async function LoginController({ auth, request, response }: HttpContextContract) {
  const { email, password } = await request.validate(LoginValidator)

  const { token } = await auth.attempt(email, password)

  return response.ok({ token })
}
