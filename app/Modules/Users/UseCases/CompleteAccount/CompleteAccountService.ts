import User from '../../Models/User'

export default async function CompleteAccountService(user: User, name: string, password: string) {
  user!.name = name
  user!.password = password

  await user!.save()
}
