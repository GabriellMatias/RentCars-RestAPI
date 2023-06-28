import { CreateSpecificationController } from '@modules/cars/useCases/createSpecification/CreateSpecificationController'
import { Router } from 'express'

import 'reflect-metadata'
import { ensureAuthenticated } from '../middleware/ensureAuthenticated'

const specificationRoutes = Router()
const createSpecificationController = new CreateSpecificationController()

specificationRoutes.use(ensureAuthenticated)
specificationRoutes.post('/', createSpecificationController.handle)
specificationRoutes.get('/', (request, response) => {
  // const specificationsList = specificationsRepository.list()

  return response.status(200).send()
})

export { specificationRoutes }
