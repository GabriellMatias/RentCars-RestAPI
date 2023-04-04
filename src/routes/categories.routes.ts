import { importCategoryController } from './../modules/cars/useCases/importCategorie/index'
import { Router } from 'express'
import { CategoriesRepository } from '../modules/cars/repositories/categoriesRepository'
import multer from 'multer'

import { createCategoryController } from '../modules/cars/useCases/createCategory'

const upload = multer({ dest: './tmp' })

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

categoriesRoutes.post('/import', upload.single('file'), (request, response) => {
  return importCategoryController.handle(request, response)
})

export { categoriesRoutes }
