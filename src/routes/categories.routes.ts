import { importCategoryController } from './../modules/cars/useCases/importCategorie/index'
import { Router } from 'express'

import multer from 'multer'

import createCategoryController from '../modules/cars/useCases/createCategory'
import { listCategoriesController } from '../modules/cars/useCases/listCategories'

const upload = multer({ dest: './tmp' })

const categoriesRoutes = Router()
/** Agora posso utilizar o repositorio do postgres para utilizar qualquer
 * banco de dados
 */

categoriesRoutes.post('/', (request: any, response) => {
  return createCategoryController().handle(request, response)
})

categoriesRoutes.get('/', (request, response) => {
  return listCategoriesController.handle(request, response)
})

categoriesRoutes.post('/import', upload.single('file'), (request, response) => {
  return importCategoryController.handle(request, response)
})

export { categoriesRoutes }
