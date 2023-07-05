import { CreateCarController } from '@modules/cars/useCases/createCar/createCarController'
import { Router } from 'express'
import { ensureAuthenticated } from '../middleware/ensureAuthenticated'
import { ensureAdmin } from '../middleware/ensureAdmin'
import { ListAvailableCarsController } from '@modules/cars/useCases/listCars/ListAvailableCarController'
import { CreateCarSpecificationController } from '@modules/cars/useCases/createCarSpecification/createCarSpecificationController'
import { UploadCarImageController } from '@modules/cars/useCases/uploadCarImage/uploadCarImageController'
import uploadConfig from '@config/upload'
import multer from 'multer'

const createCarController = new CreateCarController()
const listAvailableCarsController = new ListAvailableCarsController()
const createCarSpecificationController = new CreateCarSpecificationController()
const uploadCarImageController = new UploadCarImageController()

const uploadCarsImage = multer(uploadConfig.upload('./tmp/cars'))
export const carsRoutes = Router()
carsRoutes.post(
  '/',
  ensureAuthenticated,
  ensureAdmin,
  createCarController.handle,
)

carsRoutes.get('/available', listAvailableCarsController.handle)

carsRoutes.post(
  '/specifications/:id',
  ensureAuthenticated,
  ensureAdmin,
  createCarSpecificationController.handle,
)
carsRoutes.post(
  '/images/:id',
  ensureAuthenticated,
  ensureAdmin,
  uploadCarsImage.array('images'),
  uploadCarImageController.handle,
)
