import { schema, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CompleteAccountValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    name: schema.string({ trim: true }),
    password: schema.string({ trim: true }, [rules.minLength(8)]),
  })

  public messages = {
    'name.required': 'Name is required',
    'password.required': 'Password is required',
    'password.minLength': 'Password should be at least 8 characters long',
  }
}
