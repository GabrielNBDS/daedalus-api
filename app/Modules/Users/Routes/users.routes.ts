import Route from '@ioc:Adonis/Core/Route'
import CreateUserController from 'App/Modules/Users/UseCases/CreateUser/CreateUserController'
import CompleteAccountController from 'App/Modules/Users/UseCases/CompleteAccount/CompleteAccountController'
import VerifyEmailController from 'App/Modules/Users/UseCases/VerifyEmail/VerifyEmailController'

Route.post('/users', CreateUserController)
Route.get('/users/verify-email', VerifyEmailController)
Route.patch('/users/complete-account', CompleteAccountController)
