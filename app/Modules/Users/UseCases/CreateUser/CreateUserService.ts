import User from 'App/Modules/Users/Models/User'

export default async function CreateUserService(email: string) {
  return await User.firstOrCreate({ email })
}
