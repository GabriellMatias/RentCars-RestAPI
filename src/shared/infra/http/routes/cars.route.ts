import { CreateCarController } from '@modules/cars/useCases/createCar/createCarController'
import { Router } from 'express'

const createCarController = new CreateCarController()

export const carsRoutes = Router()
carsRoutes.post('/', createCarController.handle)
