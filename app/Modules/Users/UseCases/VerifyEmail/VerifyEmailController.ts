import Route from '@ioc:Adonis/Core/Route'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Modules/Users/Models/User'

export default async function VerifyEmailController({ request, response }: HttpContextContract) {
  if (!request.hasValidSignature()) return response.badRequest()

  const { email } = request.qs()

  // if there is no email return badRequest
  if (!email) return response.badRequest()

  const user = await User.findBy('email', email)

  // if user already has a password return badRequest
  if (user?.password) return response.badRequest()

  const signedUrl = Route.builder()
    .qs({ email })
    .prefixUrl('http://localhost:3333')
    .makeSigned('/users/complete-account', { expiresIn: '30min' })

  return response.ok({ url: signedUrl })
}
