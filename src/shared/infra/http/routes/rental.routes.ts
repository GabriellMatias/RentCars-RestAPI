import { CreateRentalController } from '@modules/rentals/useCases/createRental/createRentalController'
import { Router } from 'express'
import { ensureAuthenticated } from '../middleware/ensureAuthenticated'
import { DevolutionRentalController } from '@modules/rentals/useCases/devolutionRental/devolutionRentalController'
import { ListRentalsByUserController } from '@modules/rentals/useCases/listRentalsByUser/listRentalsByUserController'

const listRentalsByUserController = new ListRentalsByUserController()
const devolutionRentalController = new DevolutionRentalController()
const createRentalController = new CreateRentalController()
export const rentalRoutes = Router()

rentalRoutes.post(
  '/devolution/:id',
  ensureAuthenticated,
  devolutionRentalController.handle,
)
rentalRoutes.get(
  '/user',
  ensureAuthenticated,
  listRentalsByUserController.handle,
)
rentalRoutes.post('/', ensureAuthenticated, createRentalController.handle)
