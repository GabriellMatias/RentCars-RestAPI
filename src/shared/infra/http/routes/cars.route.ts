import { CreateCarController } from '@modules/cars/useCases/createCar/createCarController'
import { Router } from 'express'
import { ensureAuthenticated } from '../middleware/ensureAuthenticated'
import { ensureAdmin } from '../middleware/ensureAdmin'
import { ListAvailableCarsController } from '@modules/cars/useCases/listCars/ListAvailableCarController'

const createCarController = new CreateCarController()
const listAvailableCarsController = new ListAvailableCarsController()

export const carsRoutes = Router()
carsRoutes.post(
  '/',
  ensureAuthenticated,
  ensureAdmin,
  createCarController.handle,
)
carsRoutes.get('/available', listAvailableCarsController.handle)
