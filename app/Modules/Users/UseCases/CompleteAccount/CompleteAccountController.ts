import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Modules/Users/Models/User'
import CompleteAccountService from 'App/Modules/Users/UseCases/CompleteAccount/CompleteAccountService'
import CompleteAccountValidator from 'App/Modules/Users/UseCases/CompleteAccount/CompleteAccountValidator'

export default async function CreatePasswordController({
  auth,
  request,
  response,
}: HttpContextContract) {
  if (!request.hasValidSignature()) return response.badRequest()

  const { email } = request.qs()

  // if there is no email return badRequest
  if (!email) return response.badRequest()

  const user = (await User.findBy('email', email))!

  // if user already has a password return badRequest
  if (user?.password) return response.badRequest()

  const { name, password } = await request.validate(CompleteAccountValidator)

  await CompleteAccountService(user, name, password)

  const { token } = await auth.use('api').generate(user!)

  return response.ok({ token, ...user.serialize() })
}
