import { CreateRentalController } from '@modules/rentals/useCases/createRental/createRentalController'
import { Router } from 'express'
import { ensureAuthenticated } from '../middleware/ensureAuthenticated'

const createRentalController = new CreateRentalController()
export const rentalRoutes = Router()

rentalRoutes.post('/', ensureAuthenticated, createRentalController.handle)
