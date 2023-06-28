import { Router } from 'express'
import { CreateSpecificationController } from '../modules/cars/useCases/createSpecification/CreateSpecificationController'
import { ensureAuthenticated } from '../middleware/ensureAuthenticated'
import 'reflect-metadata'

const specificationRoutes = Router()
const createSpecificationController = new CreateSpecificationController()

specificationRoutes.use(ensureAuthenticated)
specificationRoutes.post('/', createSpecificationController.handle)
specificationRoutes.get('/', (request, response) => {
  // const specificationsList = specificationsRepository.list()

  return response.status(200).send()
})

export { specificationRoutes }
