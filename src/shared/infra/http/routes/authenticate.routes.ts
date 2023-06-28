import { AuthenticateUserController } from '@modules/accounts/useCases/AuthenticateUser/AuthenticateUserController'
import { Router } from 'express'

import 'reflect-metadata'

const authenticateRoutes = Router()
const authenticateUserController = new AuthenticateUserController()

authenticateRoutes.post('/', authenticateUserController.handle)

export { authenticateRoutes }
