import Env from '@ioc:Adonis/Core/Env'
import Route from '@ioc:Adonis/Core/Route'
import Mail from '@ioc:Adonis/Addons/Mail'
import CreateUserService from 'App/Modules/Users/UseCases/CreateUser/CreateUserService'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import CreateUserValidator from 'App/Modules/Users/UseCases/CreateUser/CreateUserValidator'

export default async function CreateUserController({ request, response }: HttpContextContract) {
  const { email } = await request.validate(CreateUserValidator)

  const user = await CreateUserService(email)

  if (user.password) return response.badRequest({ message: 'Email already taken' })

  const signedUrl = Route.builder()
    .qs({ email })
    .prefixUrl('http://localhost:3333')
    .makeSigned('/users/verify-email', { expiresIn: '30min' })

  await Mail.sendLater((message) => {
    message
      .from('contact@daedalus.com')
      .to(email)
      .subject('Welcome Onboard!')
      .htmlView('emails/welcome', { url: `${Env.get('CLIENT_VERIFY_EMAIL_URL')}?url=${signedUrl}` })
  })

  return response.created()
}
