import { createSpecificationController } from './../modules/cars/useCases/createSpecification/index'
import { Router } from 'express'
import { SpecificationsRepository } from '../modules/cars/repositories/SpecificationsRepository'

const specificationRoutes = Router()
const specificationsRepository = new SpecificationsRepository()

specificationRoutes.post('/', (request, response) => {
  return createSpecificationController.handle(request, response)
})
specificationRoutes.get('/', (request, response) => {
  const specificationsList = specificationsRepository.list()

  return response.status(200).send({ specificationsList })
})

export { specificationRoutes }
