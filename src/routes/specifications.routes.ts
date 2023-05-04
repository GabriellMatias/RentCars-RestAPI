import { Router } from 'express'
import { CreateSpecificationController } from '../modules/cars/useCases/createSpecification/CreateSpecificationController'

const specificationRoutes = Router()
const createSpecificationController = new CreateSpecificationController()

specificationRoutes.post('/', createSpecificationController.handle)
specificationRoutes.get('/', (request, response) => {
  // const specificationsList = specificationsRepository.list()

  return response.status(200).send()
})

export { specificationRoutes }
