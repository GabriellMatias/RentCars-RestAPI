import { Router } from 'express'
import { CategoriesRepository } from '../modules/cars/repositories/categoriesRepository'

import { createCategoryController } from '../modules/cars/useCases/createCategory'

const categoriesRoutes = Router()
/** Agora posso utilizar o repositorio do postgres para utilizar qualquer
 * banco de dados
 */
const categoriesRepository = new CategoriesRepository()

categoriesRoutes.post('/', (request, response) => {
  return createCategoryController.handle(request, response)
})

categoriesRoutes.get('/', (request, response) => {
  const categoriesList = categoriesRepository.list()

  return response.status(200).send({ categoriesList })
})

export { categoriesRoutes }
