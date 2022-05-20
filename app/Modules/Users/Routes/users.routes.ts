import Route from '@ioc:Adonis/Core/Route'
import CreateUserController from 'App/Modules/Users/UseCases/CreateUser/CreateUserController'
import CreatePasswordController from 'App/Modules/Users/UseCases/CreatePassword/CreatePasswordController'
import VerifyEmailController from 'App/Modules/Users/UseCases/VerifyEmail/VerifyEmailController'

Route.post('/users', CreateUserController)
Route.get('/users/verify-email', VerifyEmailController)
Route.patch('/users/create-password', CreatePasswordController)
