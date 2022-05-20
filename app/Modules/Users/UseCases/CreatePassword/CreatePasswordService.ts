import User from '../../Models/User'

export default async function CreatePasswordService(user: User, password: string) {
  user!.password = password

  await user!.save()
}
